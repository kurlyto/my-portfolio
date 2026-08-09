import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getThread, getRecentHistory, addMessage, touchThread, getUnlockedProfile } from "@/app/lib/chat/db";
import { runNateChatStreaming } from "@/app/lib/chat/nate-chat-runner";
import { clientIp, canSpendIdentityTurn, recordIdentityTurn } from "@/app/lib/chat/quota";
import { hasCompletedAudit } from "@/app/lib/chat/plans";

export const maxDuration = 200;

// Message d'accueil quand un visiteur revient sur une conversation existante
// (onglet ferme, page rafraichie, retour le lendemain). Redige par Nate a
// partir du fil : il a vu tout le cadrage, il peut donc resumer le PROJET, pas
// seulement repeter les mots du visiteur.
//
// Deux garde-fous contre le coup de l'appel modele :
// - un seul resume par thread et par fenetre de RESUME_COOLDOWN_MS (un F5
//   repete ne redeclenche rien) ;
// - le tour est decompte du quota d'IP habituel.
const RESUME_COOLDOWN_MS = 10 * 60 * 1000;

// threadId -> timestamp du dernier resume servi. En memoire process : au pire
// un redemarrage autorise un resume de plus, sans consequence.
const lastResumeAt = new Map();

const RESUME_BASE =
  "[CONTEXTE SYSTEME, non ecrit par le visiteur] Le visiteur vient de revenir sur cette conversation " +
  "apres l'avoir quittee (page fermee ou rafraichie). Accueille-le en une a deux phrases maximum : " +
  "rappelle-lui concretement ou vous en etiez en resumant SON projet avec tes mots (pas une simple " +
  "repetition de ce qu'il a ecrit), puis demande-lui comment il veut continuer. Ne repose aucune " +
  "question du funnel dans ce message, ne redemande jamais son prenom ni son email.";

// Le bouton de paiement est un marqueur ephemere : il n'est pas persiste avec
// le message (voir getMessages, qui ne renvoie pas `action`), donc un visiteur
// qui revient apres avoir vu son lien de reglement ne l'a plus sous les yeux.
// Sans ces boutons-la, il faudrait qu'il devine de recliquer "Je veux lancer le
// projet" : on lui remet donc explicitement la marche a suivre.
const RESUME_BUTTONS_AFTER_AUDIT =
  "\n\nSon audit est DEJA termine et son plan est ecrit : ne recommence surtout pas le cadrage. " +
  "Termine par ce bloc exact :\n\n---BOUTONS---\nJe veux lancer le projet\n" +
  "Je veux essayer pendant un mois\nJ'ai un code gratuit\n" +
  "J'ai une autre question\nRepartir sur un nouveau projet";

const RESUME_BUTTONS_MID_FUNNEL =
  "\n\nSon cadrage n'est PAS termine : il reste des questions a lui poser. Termine par ce bloc " +
  "exact :\n\n---BOUTONS---\nOn reprend\nRepartir sur un nouveau projet";

// Reprise apres validation du lien email, et non apres un simple retour sur la
// page. Deux differences avec RESUME_BASE, qui viennent du meme constat : ici le
// visiteur n'a rien "quitte", il a fait ce qu'on lui demandait et il attend que
// ca reparte. Lui repondre "dis-moi comment tu veux continuer" lui remet la
// charge sur les epaules alors que c'est a Nate de jouer.
//   - on enchaine sur la question suivante du cadrage au lieu de demander la
//     permission de continuer ;
//   - pas de bouton "On reprend" : il n'y a plus rien a relancer.
const RESUME_VERIFIED =
  "[CONTEXTE SYSTEME, non ecrit par le visiteur] Le visiteur vient de valider son adresse email en " +
  "cliquant le lien recu : son acces est confirme. Reprends la main toi-meme, immediatement. " +
  "En une phrase courte, confirme que c'est bon et rappelle en quelques mots le projet sur lequel " +
  "vous travailliez, puis ENCHAINE DIRECTEMENT sur la prochaine question de ton cadrage. " +
  "Ne lui demande pas s'il veut continuer, ne lui demande pas par quoi commencer : c'est toi qui " +
  "poses la question suivante. Ne redemande jamais son prenom ni son email, et ne repose aucune " +
  "question a laquelle il a deja repondu dans le fil.";

export async function POST(request, { params }) {
  const { threadId } = await params;

  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }

  const history = getRecentHistory(threadId);
  if (!history) {
    return NextResponse.json({ error: "Rien a reprendre." }, { status: 400 });
  }

  // "verified" = appel declenche par la validation du lien email (voir le poll
  // de ChatPanel), pas par un retour sur la page.
  let reason = null;
  try {
    reason = (await request.json())?.reason ?? null;
  } catch {
    // Corps absent ou illisible : c'est un resume de retour classique.
  }
  const isVerified = reason === "verified";

  // La validation d'email est un evenement unique et voulu, declenche par le
  // visiteur lui-meme : le cooldown anti-F5 n'a pas de sens ici. Le laisser
  // s'appliquer reproduirait exactement le bug qu'on corrige (Nate reste muet
  // apres la confirmation) pour quiconque a rafraichi la page dans les 10
  // minutes precedentes - donc pendant l'attente du mail, le cas le plus
  // frequent. Le quota par IP ci-dessous reste applique.
  if (!isVerified) {
    const previous = lastResumeAt.get(threadId);
    if (previous && Date.now() - previous < RESUME_COOLDOWN_MS) {
      return NextResponse.json({ error: "Resume deja servi recemment." }, { status: 429 });
    }
  }

  const ip = clientIp(request);
  if (!canSpendIdentityTurn(ip)) {
    return NextResponse.json({ error: "Quota atteint." }, { status: 429 });
  }

  // Marque avant l'appel : deux rafraichissements simultanes ne doivent pas
  // declencher deux resumes en parallele.
  lastResumeAt.set(threadId, Date.now());
  recordIdentityTurn(ip);

  try {
    const profile = getUnlockedProfile(threadId);
    const facts = profile
      ? `Le visiteur s appelle ${profile.firstName} et son email verifie est ${profile.email}. ` +
        "Ne redemande jamais ces informations.\n"
      : "";

    // Detection cote code (existence du lead de fin de funnel), pas via une
    // interpretation du fil par le modele : c est ce qui decide si on lui
    // remet le bouton de reglement ou si on reprend le cadrage.
    const completed = hasCompletedAudit(profile?.email);
    // Un audit deja termine garde ses boutons d'action meme en sortie de
    // verification : la marche a suivre (regler, code gratuit...) prime alors
    // sur la reprise du cadrage, qui n'a plus lieu d'etre.
    const base = isVerified && !completed ? RESUME_VERIFIED : RESUME_BASE;
    const instruction =
      base + (completed ? RESUME_BUTTONS_AFTER_AUDIT : isVerified ? "" : RESUME_BUTTONS_MID_FUNNEL);

    // Session neuve volontairement : on ne veut pas polluer la session du
    // funnel avec ce tour d'accueil, et l'historique rejoue suffit a Nate pour
    // savoir de quoi il retourne.
    const sessionId = crypto.randomUUID();
    const result = await runNateChatStreaming({
      sessionId,
      message: `${facts}${instruction}`,
      isFirstTurn: true,
      historyReplay: history,
      preferredAccount: thread.account,
      onTextDelta: () => {},
    });

    const text = result.reply?.trim();
    if (!text) {
      return NextResponse.json({ error: "Resume vide." }, { status: 500 });
    }

    addMessage(threadId, "ASSISTANT", text);
    // La session du funnel reste inchangee : ce tour d'accueil vit a part, mais
    // son texte est dans le fil, donc rejoue au prochain vrai message.
    touchThread(threadId, thread.sessionId, result.usedAccount ?? thread.account);

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Resume de conversation echoue:", err);
    // Le cooldown reste pose : en cas d'echec repete (quota Claude), on ne veut
    // pas relancer un appel a chaque rafraichissement.
    return NextResponse.json({ error: "Resume indisponible." }, { status: 500 });
  }
}
