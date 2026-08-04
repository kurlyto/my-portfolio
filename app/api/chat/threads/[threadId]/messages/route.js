import { NextResponse } from "next/server";
import crypto from "node:crypto";
import {
  getThread,
  touchThread,
  addMessage,
  getRecentHistory,
  isThreadUnlocked,
  createPendingVerification,
  getPendingVerification,
  getIdentitySession,
  setIdentitySession,
  clearIdentitySession,
  getUnlockedProfile,
  isIdentityRequested,
  markIdentityRequested,
  countMessages,
} from "@/app/lib/chat/db";
import { splitActionMarkers, paymentLinkFor, NATHAN_PHONE, NATHAN_PHONE_DISPLAY } from "@/app/lib/chat/payment";
import {
  clientIp,
  canSpendIdentityTurn,
  recordIdentityTurn,
  canStartAudit,
  recordAudit,
  IDENTITY_LIMIT_MESSAGE,
  AUDIT_LIMIT_MESSAGE,
} from "@/app/lib/chat/quota";
import { countPlans } from "@/app/lib/chat/plans";
import { redeemCode, getReleasedCodeForThread, markAnnounced } from "@/app/lib/chat/codes";
import { writeLead } from "@/app/lib/chat/lead-writer";
import { consumePendingGrants } from "@/app/lib/chat/grants";
import { runNateChatStreaming, NateChatError } from "@/app/lib/chat/nate-chat-runner";
import { IDENTITY_SYSTEM_PROMPT } from "@/app/lib/chat/identity-prompt";
import { sendVerificationEmail } from "@/app/lib/chat/mailer";

export const maxDuration = 200;

// Filet de securite : si Nate oublie d ecrire ---IDENTITE---, on force la
// collecte au-dela de ce nombre de messages sur le thread (user + assistant
// confondus). Sans ce garde, un prospect pourrait aller au bout du cadrage sans
// jamais laisser son email : le lead serait perdu alors meme qu on a paye tous
// les appels modele.
// Regle a 22 (~11 echanges). Historique du reglage : 18 coupait un cadrage sain
// en plein milieu ; 30 laissait Nate enchainer 18 messages sans jamais demander
// l identite (constate le 30/07 sur le parcours "coiffeuse a domicile"), soit
// autant de tours ou le prospect peut fermer la page et ou le lead est perdu.
// 22 laisse la place a un cadrage confortable tout en rattrapant avant que ca
// devienne couteux. La consigne de mission.md reste le mecanisme principal ;
// ceci n est qu un filet.
const FORCE_IDENTITY_AFTER = 22;

// Quand le filet se declenche, la bascule vers le prompt d identite (isole du
// funnel) produit un "Salut ! C'est quoi ton prenom ?" incongru apres 10
// echanges de cadrage. On annonce donc la transition nous-memes, une seule
// fois, sans appeler le modele.
const FORCED_IDENTITY_INTRO =
  "On a bien avancé sur ton projet. Avant d'aller plus loin et de te préparer ton dossier, " +
  "j'ai besoin de savoir à qui je parle : quel est ton prénom ?";

// Verrou anti-concurrence par thread : un visiteur ne peut avoir qu'une
// requete en vol a la fois sur son propre thread (memoire process, comme
// l'openspace admin devis_dentaire).
const busyThreads = new Set();

// Catalogue des agents deja construits. Le bloc ---AGENTS--- est rendu par le
// front (ChatPanel) comme une liste de cartes portrait + nom + role, au lieu
// d'un pave de texte : sur le canal web on peut se le permettre, contrairement
// a Telegram. Format d'une ligne : slug|Nom|Role
// Le slug doit correspondre a public/images/agents/<slug>.png ; si le fichier
// manque, la carte retombe sur l'initiale plutot que d'afficher une image
// cassee.
const AGENTS_CATALOG =
  "Voici les agents qu'on a déjà créés. Un de ces profils te parle, " +
  "ou tu préfères qu'on cadre ton propre besoin ?\n" +
  "---AGENTS---\n" +
  "camille|Camille|Emails, agenda, documents. Pilote les autres agents.\n" +
  "ousmane|Ousmane|Trouve des clients, relance, place les rendez-vous.\n" +
  "hugo|Hugo|Veille sur ton secteur et référencement de ton site.\n" +
  "lea|Léa|Rédige tes posts et construit ta stratégie de contenu.\n" +
  "kylian|Kylian|Surveille tes chiffres et t'alerte quand ça décroche.\n" +
  "alexis|Alexis|Classe tes factures et prépare tes déclarations.\n" +
  // Les libellés des 6 premiers boutons doivent rester "Camille", "Ousmane"...
  // a l'identique : mission.md s'appuie dessus pour reconnaitre qu'un visiteur
  // s'interesse a un agent precis et lui presenter sa fiche detaillee.
  "---BOUTONS---\nCamille\nOusmane\nHugo\nLéa\nKylian\nAlexis\n" +
  "J'ai une idée en tête\nAide-moi à cadrer mon besoin";

function sseEvent(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function verifyBaseUrl() {
  const url = process.env.CHAT_VERIFY_BASE_URL;
  if (!url) throw new Error("CHAT_VERIFY_BASE_URL manquant dans l'environnement");
  return url;
}

// Progression affichee dans le header du chat (barre "% du projet compris").
// Par paliers nets plutot qu'un pourcentage continu : ca evite d'indexer la
// barre sur un marqueur que Nate devrait ecrire lui-meme (fragile, on ne veut
// pas complexifier mission.md), tout se deduit de signaux deja en base.
// planJustWritten ecrase tout le reste et saute a 100 : Nathan veut que la
// barre reflete "le livrable existe", meme si des questions facultatives de
// fin de parcours n'ont pas eu de reponse et qu'un calcul par messages
// donnerait un palier plus bas.
function computeProgress({ messageCount, identityRequested, unlocked, planJustWritten }) {
  if (planJustWritten) return 100;

  if (unlocked) {
    if (messageCount >= 9) return 90;
    if (messageCount >= 7) return 80;
    if (messageCount >= 5) return 70;
    return 60;
  }

  if (identityRequested) return 45;

  if (messageCount >= 7) return 40;
  if (messageCount >= 5) return 35;
  if (messageCount >= 3) return 25;
  if (messageCount >= 2) return 15;
  return 5;
}

// Parse le bloc ---IDENTITE--- termine par Nate une fois prénom+email obtenus
// (voir identity-prompt.js), même format que le canal Telegram.
function parseIdentityBlock(reply) {
  const marker = "---IDENTITE---";
  const idx = reply.indexOf(marker);
  if (idx === -1) return { text: reply.trim(), identity: null };
  const text = reply.slice(0, idx).trim();
  const block = reply.slice(idx + marker.length);
  const firstName = /prenom:\s*(.+)/.exec(block)?.[1]?.trim();
  const email = /email:\s*(.+)/.exec(block)?.[1]?.trim();
  if (!firstName || !email) return { text, identity: null };
  return { text, identity: { firstName, email } };
}

export async function POST(request, { params }) {
  const { threadId } = await params;
  // visitorId : identifiant navigateur transmis par le chat, pour retenir la
  // personne au-dela de ce thread (voir known_visitors dans db.js).
  const { message, visitorId } = await request.json();

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message vide." }, { status: 400 });
  }

  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }

  if (busyThreads.has(threadId)) {
    return NextResponse.json({ error: "Une reponse est deja en cours." }, { status: 429 });
  }
  busyThreads.add(threadId);

  const trimmed = message.trim();
  const ip = clientIp(request);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event, data) => controller.enqueue(encoder.encode(sseEvent(event, data)));

      try {
        // "Voir les agents existants" reste libre, sans vérification, à
        // n'importe quel moment avant que l'utilisateur soit débloqué.
        if (!isThreadUnlocked(threadId) && trimmed === "Voir les agents existants") {
          addMessage(threadId, "USER", trimmed);
          addMessage(threadId, "ASSISTANT", AGENTS_CATALOG);
          send("done", { text: AGENTS_CATALOG, progress: 5 });
          return;
        }

        if (!isThreadUnlocked(threadId)) {
          // Lien de verification deja envoye, on attend le clic. Sans ce garde,
          // on repart dans handleIdentityTurn avec une session d identite
          // detruite (clearIdentitySession apres l envoi du mail) : Nate
          // redemande le prenom a l infini alors qu il l a deja. Constate le
          // 28/07/2026 (11 tours bloques en test). On repond un texte fixe,
          // sans appeler le modele.
          const pending = getPendingVerification(threadId);
          if (pending) {
            // Sortie de secours : le client dit ne pas avoir recu le mail.
            // On regenere un token et on renvoie, sans repasser par la collecte.
            if (/renvoy|renvoie|recu|recois|resend|pas recu|rien recu/i.test(trimmed)) {
              addMessage(threadId, "USER", trimmed);
              const newToken = createPendingVerification(
                threadId,
                pending.firstName,
                pending.email,
                null,
              );
              let resendText;
              try {
                await sendVerificationEmail({
                  to: pending.email,
                  firstName: pending.firstName,
                  verifyUrl: `${verifyBaseUrl()}/api/chat/verify?token=${newToken}`,
                });
                resendText =
                  `C'est reparti, je viens de te renvoyer le lien à ${pending.email}. ` +
                  `Pense à regarder dans tes spams.
---WEBMAIL---
${pending.email}`;
              } catch (err) {
                console.error("Renvoi email de verification echoue:", err);
                resendText = "L'envoi a encore échoué de mon côté, réessaie dans un instant.";
              }
              addMessage(threadId, "ASSISTANT", resendText);
              send("done", { text: resendText, progress: 45 });
              return;
            }

            addMessage(threadId, "USER", trimmed);
            const waitText =
              `Il me manque juste ta confirmation : clique sur le lien que je t'ai envoyé à ` +
              `${pending.email} et on reprend tout de suite là où on en était. Pense à vérifier ` +
              `tes spams. Si tu n'as rien reçu, dis-moi "renvoyer le lien".
` +
              `---WEBMAIL---
${pending.email}`;
            addMessage(threadId, "ASSISTANT", waitText);
            send("done", { text: waitText, progress: 45 });
            return;
          }

          // Quota anti-abus : tout ce qui precede la verification est ouvert a
          // un inconnu, donc c est la surface exposee. Au-dela de la limite on
          // repond un texte fixe, sans appeler le modele (aucun token
          // consomme) - c est tout l interet de bloquer ici.
          if (!canSpendIdentityTurn(ip)) {
            addMessage(threadId, "USER", trimmed);
            addMessage(threadId, "ASSISTANT", IDENTITY_LIMIT_MESSAGE);
            send("done", { text: IDENTITY_LIMIT_MESSAGE, progress: 5 });
            return;
          }
          recordIdentityTurn(ip);

          // Depuis le 30/07/2026 : le funnel tourne AVANT la verification.
          // Nate cadre le besoin en mode anonyme (mission.md) et reclame
          // l identite lui-meme via le marqueur ---IDENTITE--- une fois la
          // faisabilite confirmee. On ne bascule sur la collecte que la.
          // Filet de securite : s il oublie le marqueur, on force la collecte
          // au-dela de FORCE_IDENTITY_AFTER messages, sinon un prospect
          // pourrait aller au bout du cadrage sans jamais laisser d email.
          // Filet de securite : Nate n a pas ecrit ---IDENTITE--- alors que la
          // conversation s eternise. On annonce la transition en reliant au
          // cadrage deja fait, plutot que de basculer sans prevenir sur un
          // prompt isole qui redemarrerait par un "Salut !" incongru.
          if (!isIdentityRequested(threadId) && countMessages(threadId) >= FORCE_IDENTITY_AFTER) {
            markIdentityRequested(threadId);
            addMessage(threadId, "USER", trimmed);
            addMessage(threadId, "ASSISTANT", FORCED_IDENTITY_INTRO);
            send("done", { text: FORCED_IDENTITY_INTRO, progress: 45 });
            return;
          }

          if (isIdentityRequested(threadId)) {
            await handleIdentityTurn({ threadId, trimmed, thread, send, visitorId });
            return;
          }

          await handleFunnelTurn({ threadId, trimmed, thread, send, ip });
          return;
        }

        // Meme logique pour les audits : une fois le plafond atteint, on ne
        // relance plus le funnel du tout pour cette IP aujourd hui.
        if (!canStartAudit(ip)) {
          addMessage(threadId, "USER", trimmed);
          addMessage(threadId, "ASSISTANT", AUDIT_LIMIT_MESSAGE);
          send("done", { text: AUDIT_LIMIT_MESSAGE, progress: 60 });
          return;
        }

        await handleFunnelTurn({ threadId, trimmed, thread, send, ip });
      } catch (err) {
        const message =
          err instanceof NateChatError
            ? err.quotaExceeded
              ? "Nate est tres sollicite en ce moment, reessaie dans quelques minutes."
              : "Une erreur est survenue, reessaie."
            : "Une erreur inattendue est survenue.";
        send("error", { message });
      } finally {
        busyThreads.delete(threadId);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
  });
}

async function handleIdentityTurn({ threadId, trimmed, thread, send, visitorId }) {
  addMessage(threadId, "USER", trimmed);

  const existingSessionId = getIdentitySession(threadId);
  const sessionId = existingSessionId ?? crypto.randomUUID();
  const isFirstTurn = !existingSessionId;

  const result = await runNateChatStreaming({
    sessionId,
    message: trimmed,
    isFirstTurn,
    historyReplay: null,
    // Sans ce preferredAccount, la collecte repartait toujours du compte par
    // defaut : quand celui-ci est en quota (429), la bascule interne repartait
    // du meme compte et echouait, alors que le funnel, lui, avait deja bascule.
    // Symptome : "Une erreur est survenue" au moment de donner son email.
    // Constate le 30/07/2026, compte principal en limite hebdomadaire.
    preferredAccount: thread?.account,
    systemPrompt: IDENTITY_SYSTEM_PROMPT,
    allowedTools: "",
    onTextDelta: (text) => send("delta", { text }),
  });

  setIdentitySession(threadId, result.newSessionId ?? sessionId);
  // Retient le compte qui a effectivement repondu, pour que le tour suivant
  // (et le retour au funnel) reparte du bon.
  if (result.usedAccount && result.usedAccount !== thread?.account) {
    touchThread(threadId, thread?.sessionId ?? null, result.usedAccount);
  }

  const { text: replyText, identity } = parseIdentityBlock(result.reply);
  addMessage(threadId, "ASSISTANT", replyText || result.reply);

  if (!identity) {
    send("done", { text: replyText || result.reply, progress: 45 });
    return;
  }

  const token = createPendingVerification(
    threadId,
    identity.firstName,
    identity.email,
    null,
    visitorId,
  );
  clearIdentitySession(threadId);

  try {
    await sendVerificationEmail({
      to: identity.email,
      firstName: identity.firstName,
      verifyUrl: `${verifyBaseUrl()}/api/chat/verify?token=${token}`,
    });
  } catch (err) {
    console.error("Envoi email de verification echoue:", err);
    const errText = "L'envoi de l'email a échoué, réessaie dans un instant.";
    addMessage(threadId, "ASSISTANT", errText);
    send("done", { text: errText, progress: 45 });
    return;
  }

  // Le marqueur ---WEBMAIL--- fait afficher au front un raccourci vers la
  // messagerie du visiteur. Ouvrir sa boite est la seule action qui lui reste a
  // faire, et c'est le moment le plus fragile du parcours : autant lui epargner
  // de changer d'onglet a la main.
  const confirmText =
    `Je t'ai envoyé un lien à ${identity.email}. Clique dessus pour continuer ` +
    `(valable 30 minutes) — pense à vérifier tes spams si tu ne le vois pas.\n` +
    `---WEBMAIL---\n${identity.email}`;
  addMessage(threadId, "ASSISTANT", confirmText);
  send("done", { text: confirmText, progress: 45 });
}

// Un code gratuit ressemble a NATE-XXXX-XXXX. On le detecte dans le message du
// visiteur pour le valider NOUS-MEMES, en base, plutot que de laisser le modele
// juger : un LLM peut etre convaincu qu un code invente est valide, une requete
// SQL non. Nate est ensuite informe du resultat deja tranche.
const CODE_PATTERN = /NATE-[A-Z0-9]{4}-[A-Z0-9]{4}/i;

function extractCode(text) {
  return CODE_PATTERN.exec(text)?.[0] ?? null;
}

// Explications donnees a Nate selon le motif de refus, pour qu il reformule
// avec ses mots au lieu de reciter un message d erreur fige.
const CODE_REFUSAL_HINTS = {
  unknown: "ce code n existe pas (probablement une faute de frappe)",
  already_used: "ce code a deja ete utilise",
  wrong_email: "ce code appartient a une autre adresse email que la sienne",
  empty: "aucun code n a ete fourni",
};

// Assemble les faits etablis par le code pour ce tour precis. Renvoie null si
// rien de special, auquel cas le message du visiteur part tel quel.
function buildTurnFacts({ threadId, trimmed }) {
  const parts = [];
  const profile = getUnlockedProfile(threadId);

  // Le prenom et l email ont deja ete donnes et verifies avant le funnel : sans
  // ce rappel, Nate les redemande (observe en test) alors que le visiteur les a
  // deja fournis, ce qui donne l impression de ne pas avoir ete ecoute.
  if (profile) {
    parts.push(
      `Le visiteur s appelle ${profile.firstName} et son email verifie est ${profile.email}. ` +
        "Ne redemande jamais ces deux informations, tu les as deja.",
    );
  }

  // Applique d abord les autorisations que Nathan vient d accorder via Elon,
  // pour qu un code libere soit pris en compte des ce tour-ci.
  try {
    consumePendingGrants();
  } catch (err) {
    console.error("Consommation des autorisations de code echouee:", err);
  }

  const raw = extractCode(trimmed);
  if (raw) {
    const result = redeemCode({ rawCode: raw, email: profile?.email });
    if (result.ok) {
      parts.push(
        `Le visiteur a fourni un code gratuit VALIDE (${result.code}), il vient d etre consomme. ` +
          "Sa prestation est donc offerte : confirme-le lui chaleureusement, avec tes mots, dis que " +
          "Nathan va lancer la mise en place et qu il sera recontacte. Ne propose plus de paiement, " +
          "n affiche plus le marqueur ---PAIEMENT---.",
      );
      writeLead({
        kind: "code_redeemed",
        firstName: result.firstName,
        email: result.email,
        freeCode: result.code,
        threadId,
        channel: "web",
      });
    } else {
      parts.push(
        `Le visiteur a fourni un code gratuit REFUSE : ${CODE_REFUSAL_HINTS[result.reason] ?? "code invalide"}. ` +
          "Explique-le lui gentiment avec tes mots, sans le braquer, et propose-lui de reverifier le code " +
          "ou de continuer normalement. N invente jamais un code valide et n en accorde jamais un toi-meme.",
      );
    }
  }

  // Nathan a autorise Nate a communiquer le code au visiteur (via Elon).
  const released = getReleasedCodeForThread(threadId);
  if (released) {
    parts.push(
      `Nathan autorise la gratuite pour ce visiteur. Annonce-lui, avec tes mots et de facon chaleureuse, ` +
        `que Nathan lui offre un code gratuit : ${released.code}. Explique qu il peut l utiliser ici meme ` +
        "pour lancer son projet sans payer.",
    );
  }

  return { facts: parts.length ? parts.join("\n") : null, announcedCode: released?.code ?? null };
}

async function handleFunnelTurn({ threadId, trimmed, thread, send, ip }) {
  const isFirstTurn = !thread.sessionId;
  const sessionId = thread.sessionId ?? crypto.randomUUID();

  // Pas de replay d'historique sur le chemin nominal : --resume conserve deja
  // toute la conversation cote CLI (verifie le 30/07 - sans aucun replay, Nate
  // restitue le prenom et le metier donnes deux tours plus tot).
  // Le renvoyer etait donc redondant ET couteux : ce bloc change a chaque tour
  // (les 12 derniers messages), il decalait le prefixe et invalidait le cache
  // a chaque appel. Signature observee : cacheR bloque a une valeur constante
  // (15 479) pendant que cacheW grimpait a 25-45k/tour, soit ~0,10 USD/tour au
  // lieu de ~0,01.
  // Il reste transmis en fallbackHistoryReplay, pour les seuls cas ou la
  // session CLI est reellement perdue (bascule de compte sur 429, fichier de
  // session introuvable) : la, il n'y a plus rien a reprendre et le replay est
  // la seule facon de ne pas repartir de zero.
  const historyReplay = null;

  // Un audit compte comme "termine" quand Nate a effectivement ecrit son lead
  // sur disque pendant ce tour, pas quand il annonce avoir fini (le modele
  // reformule librement, et la phrase seule serait facile a provoquer).
  const leadsBefore = countPlans();

  addMessage(threadId, "USER", trimmed);

  // Le message est enrichi de faits que le code a deja etablis (code gratuit
  // valide ou refuse, autorisation de Nathan). Nate ne decide rien sur ces
  // points, il les met en mots - c est la seule facon de garder une reponse
  // conversationnelle sans confier une decision de securite au modele.
  const { facts, announcedCode } = buildTurnFacts({ threadId, trimmed });
  const message = facts ? `${trimmed}\n\n[CONTEXTE SYSTEME, non ecrit par le visiteur]\n${facts}` : trimmed;

  const result = await runNateChatStreaming({
    sessionId,
    message,
    isFirstTurn,
    historyReplay,
    preferredAccount: thread.account,
    fallbackHistoryReplay: getRecentHistory(threadId),
    onTextDelta: (text) => send("delta", { text }),
  });

  const finalSessionId = result.newSessionId ?? sessionId;
  touchThread(threadId, finalSessionId, result.usedAccount);

  // Marqueurs de fin de parcours (---PAIEMENT--- / ---TELEPHONE---) : retires
  // du texte affiche et convertis en bouton d action sous la bulle. On stocke
  // le texte nettoye en base pour que l historique ne contienne pas les
  // marqueurs bruts (sinon le replay les re-injecterait au tour suivant).
  const { text: cleanedText, action } = splitActionMarkers(result.reply);

  // ---IDENTITE--- : Nate a cadre le besoin, confirme la faisabilite, et
  // reclame maintenant prenom + email (etape 0.5 de mission.md). On retire le
  // marqueur du texte affiche ET stocke (sinon le replay le re-injecterait au
  // tour suivant et Nate croirait devoir le redemander), et on bascule le
  // thread en mode collecte pour les messages suivants.
  const wantsIdentity = /^\s*---IDENTITE---\s*$/m.test(cleanedText);
  const text = wantsIdentity
    ? cleanedText.replace(/^\s*---IDENTITE---\s*$/m, "").trimEnd()
    : cleanedText;

  addMessage(threadId, "ASSISTANT", text);

  if (wantsIdentity && !isThreadUnlocked(threadId)) {
    markIdentityRequested(threadId);
  }

  const planJustWritten = countPlans() > leadsBefore;
  if (planJustWritten) {
    recordAudit(ip);
  }

  // Marque APRES un tour reussi : si l appel avait echoue, le code doit
  // rester a annoncer au tour suivant plutot que d etre perdu en silence.
  if (announcedCode) {
    markAnnounced(announcedCode);
  }

  const progress = computeProgress({
    messageCount: countMessages(threadId),
    identityRequested: isIdentityRequested(threadId),
    unlocked: isThreadUnlocked(threadId),
    planJustWritten,
  });

  send("done", { text, action: buildAction(action, threadId), progress });
}

// Traduit le marqueur detecte en bouton concret. Renvoie null si l action est
// impossible (palier inconnu, lien Stripe non configure) : mieux vaut aucun
// bouton qu un bouton casse en fin de parcours commercial.
function buildAction(action, threadId) {
  if (!action) return null;

  if (action.kind === "phone") {
    return { kind: "phone", href: `tel:${NATHAN_PHONE}`, label: `Appeler Nathan - ${NATHAN_PHONE_DISPLAY}` };
  }

  if (action.kind === "payment") {
    const profile = getUnlockedProfile(threadId);
    const link = paymentLinkFor(action.tier, { email: profile?.email, threadId });
    if (!link) {
      console.error(`Lien de paiement indisponible (palier: ${action.tier ?? "inconnu"})`);
      return null;
    }
    return { kind: "payment", href: link.url, label: link.label };
  }

  return null;
}

export async function GET(request, { params }) {
  const { threadId } = await params;
  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }
  const { getMessages } = await import("@/app/lib/chat/db");
  return NextResponse.json({ messages: getMessages(threadId) });
}
