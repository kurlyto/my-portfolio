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

// Verrou anti-concurrence par thread : un visiteur ne peut avoir qu'une
// requete en vol a la fois sur son propre thread (memoire process, comme
// l'openspace admin devis_dentaire).
const busyThreads = new Set();

const AGENTS_CATALOG =
  "Voici les agents qu'on a déjà créés :\n\n" +
  "Camille — assistante générale : gère emails, agenda, documents et administratif, peut piloter les autres agents depuis une seule conversation.\n\n" +
  "Ousmane — prospection : trouve des leads qualifiés, relance les indécis, place les rendez-vous acceptés directement dans ton agenda.\n\n" +
  "Hugo — veille et référencement : surveille ton secteur et tes concurrents, t'aide sur le SEO de ton site (audit, propositions d'articles).\n\n" +
  "Léa — contenu et stratégie : construit ta stratégie de contenu, rédige des posts, propose un calendrier éditorial et des outils adaptés.\n\n" +
  "Un de ces agents te parle, ou tu préfères qu'on cadre ton propre besoin ?\n\n" +
  "---BOUTONS---\nJ'ai une idée en tête\nJe n'ai pas encore d'idée";

function sseEvent(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function verifyBaseUrl() {
  const url = process.env.CHAT_VERIFY_BASE_URL;
  if (!url) throw new Error("CHAT_VERIFY_BASE_URL manquant dans l'environnement");
  return url;
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
  const { message } = await request.json();

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
          send("done", { text: AGENTS_CATALOG });
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
                resendText = `C'est reparti, je viens de te renvoyer le lien à ${pending.email}. Pense à regarder dans tes spams.`;
              } catch (err) {
                console.error("Renvoi email de verification echoue:", err);
                resendText = "L'envoi a encore échoué de mon côté, réessaie dans un instant.";
              }
              addMessage(threadId, "ASSISTANT", resendText);
              send("done", { text: resendText });
              return;
            }

            addMessage(threadId, "USER", trimmed);
            const waitText = `Il me manque juste ta confirmation : clique sur le lien que je t'ai envoyé à ${pending.email} et on reprend tout de suite là où on en était. Pense à vérifier tes spams. Si tu n'as rien reçu, dis-moi "renvoyer le lien".`;
            addMessage(threadId, "ASSISTANT", waitText);
            send("done", { text: waitText });
            return;
          }

          // Quota anti-abus : la collecte d identite est la seule partie
          // ouverte a un inconnu, donc la plus exposee. Au-dela de la limite
          // on repond un texte fixe, sans appeler le modele (aucun token
          // consomme) - c est tout l interet de bloquer ici.
          if (!canSpendIdentityTurn(ip)) {
            addMessage(threadId, "USER", trimmed);
            addMessage(threadId, "ASSISTANT", IDENTITY_LIMIT_MESSAGE);
            send("done", { text: IDENTITY_LIMIT_MESSAGE });
            return;
          }
          recordIdentityTurn(ip);
          await handleIdentityTurn({ threadId, trimmed, thread, send });
          return;
        }

        // Meme logique pour les audits : une fois le plafond atteint, on ne
        // relance plus le funnel du tout pour cette IP aujourd hui.
        if (!canStartAudit(ip)) {
          addMessage(threadId, "USER", trimmed);
          addMessage(threadId, "ASSISTANT", AUDIT_LIMIT_MESSAGE);
          send("done", { text: AUDIT_LIMIT_MESSAGE });
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

async function handleIdentityTurn({ threadId, trimmed, send }) {
  addMessage(threadId, "USER", trimmed);

  const existingSessionId = getIdentitySession(threadId);
  const sessionId = existingSessionId ?? crypto.randomUUID();
  const isFirstTurn = !existingSessionId;

  const result = await runNateChatStreaming({
    sessionId,
    message: trimmed,
    isFirstTurn,
    historyReplay: null,
    systemPrompt: IDENTITY_SYSTEM_PROMPT,
    allowedTools: "",
    onTextDelta: (text) => send("delta", { text }),
  });

  setIdentitySession(threadId, result.newSessionId ?? sessionId);

  const { text: replyText, identity } = parseIdentityBlock(result.reply);
  addMessage(threadId, "ASSISTANT", replyText || result.reply);

  if (!identity) {
    send("done", { text: replyText || result.reply });
    return;
  }

  const token = createPendingVerification(threadId, identity.firstName, identity.email, null);
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
    send("done", { text: errText });
    return;
  }

  const confirmText = `Je t'ai envoyé un lien à ${identity.email}. Clique dessus pour continuer (valable 30 minutes) — pense à vérifier tes spams si tu ne le vois pas.`;
  addMessage(threadId, "ASSISTANT", confirmText);
  send("done", { text: confirmText });
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
  const historyReplay = isFirstTurn ? null : getRecentHistory(threadId);

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
  const { text, action } = splitActionMarkers(result.reply);
  addMessage(threadId, "ASSISTANT", text);

  if (countPlans() > leadsBefore) {
    recordAudit(ip);
  }

  // Marque APRES un tour reussi : si l appel avait echoue, le code doit
  // rester a annoncer au tour suivant plutot que d etre perdu en silence.
  if (announcedCode) {
    markAnnounced(announcedCode);
  }

  send("done", { text, action: buildAction(action, threadId) });
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
