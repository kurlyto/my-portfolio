// Reperes temporels d'un agent conversationnel (13/08/2026, incident Camille).
//
// LE PROBLEME. Une session reprise en `--resume` n'a AUCUNE horloge : pour le
// modele, le tour precedent vient juste d'avoir lieu, meme s'il date de trois
// jours. Le 13/08/2026, Camille a repondu a un "Point mail ?" en 3,8 s sans
// appeler le moindre outil : "rien de nouveau depuis 2 minutes" — a propos d'un
// check du 10/08, sur des mails lus depuis. Elle ne mentait pas : rien dans son
// contexte ne disait que trois jours avaient passe.
//
// LE PRINCIPE. L'agent n'a pas d'horloge et n'en aura jamais ; c'est le CODE qui
// lui colle l'heure sur chaque message. Il LIT l'heure, il ne la connait pas.
// Corollaire : entre deux messages, il ne se passe rien pour lui — si un agent
// doit reagir au temps qui passe (relancer, s'inquieter d'un silence), il faut
// un declencheur exterieur (cron, watchdog), jamais une consigne de prompt.
//
// OU L'APPELER. Dans le runner, juste avant le spawn, et UNE SEULE FOIS dans la
// fonction `run<Agent>Chat` : elle couvre ainsi tous les chemins d'appel (tour
// normal, chaine de repli de compte sur quota 429, rejeu de la file d'attente).
// Un seul chemin oublie et le bug revient par cette porte.
//
// PAS dans index.js : le texte persiste en base AVANT horodatage, sinon le
// prefixe finit stocke et pollue le replay d'historique au tour suivant.
//
// Copie volontaire (comme accuse-reception.js) si un jour le parc perso
// /data/nathan/agents-nathan en a besoin : les deux arborescences n'ont pas de
// mecanisme de partage de code, et dupliquer 40 lignes vaut mieux qu'un
// couplage cache entre deux repos independants.

// Le VPS et Postgres tournent en UTC ; Nathan et Ben vivent a l'heure de Paris.
// Sans ce forcage, l'agent annonce 13:30 pour un message envoye a 15:30.
const PARIS_TZ = "Europe/Paris";

// Seuil au-dela duquel la reprise est signalee explicitement. En-deca,
// l'horodatage du message suffit ; au-dela, on explicite, parce que le modele
// ne fait PAS spontanement la soustraction entre deux dates.
export const SEUIL_REPRISE_MS = 12 * 3600 * 1000;

/**
 * Normalise une date venue de n'importe quelle source du parc.
 *
 * Piege SQLite (Victor) : `datetime('now')` stocke un texte UTC SANS suffixe
 * ("2026-08-13 14:30:00"), que JS interprete en heure LOCALE. En ete, c'est
 * 2 h d'ecart, totalement silencieux. On force le "Z" absent.
 * Postgres, lui, renvoie deja un objet Date correct.
 */
export function versDate(valeur) {
  if (valeur instanceof Date) return valeur;
  if (typeof valeur === "string" && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(valeur)) {
    return new Date(valeur.replace(" ", "T") + "Z");
  }
  return new Date(valeur);
}

/** "jeudi 13/08/2026 15:30", toujours en heure de Paris. */
export function formatDateHeure(d = new Date()) {
  return versDate(d).toLocaleString("fr-FR", {
    timeZone: PARIS_TZ,
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "13/08/2026 15:30" — format court, pour dater les lignes d'un replay. */
export function formatDateCourte(d) {
  return versDate(d).toLocaleString("fr-FR", {
    timeZone: PARIS_TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Prefixe un message utilisateur de sa date d'envoi reelle, et signale une
 * reprise ancienne le cas echeant.
 *
 * @param {string} message - le texte brut de l'utilisateur
 * @param {Date|string|null} lastExchangeAt - date du dernier echange du thread
 *   (Postgres: lastMessageAt / SQLite: threads.lastMessageAt), ou null au
 *   premier tour.
 */
export function horodaterMessage(message, lastExchangeAt) {
  const lignes = [];

  if (lastExchangeAt) {
    const ecartMs = Date.now() - versDate(lastExchangeAt).getTime();
    if (Number.isFinite(ecartMs) && ecartMs > SEUIL_REPRISE_MS) {
      const heures = Math.round(ecartMs / 3600000);
      const ecart = heures < 48 ? `${heures} heures` : `${Math.round(heures / 24)} jours`;
      lignes.push(
        `[Reprise de discussion : le dernier echange date du ${formatDateHeure(lastExchangeAt)}, il y a environ ${ecart}. Ce qui precede dans cette conversation n'est PAS recent.]`,
      );
    }
  }

  lignes.push(`[${formatDateHeure()}] ${message}`);
  return lignes.join("\n");
}

/**
 * Formate un replay d'historique en datant CHAQUE ligne. Un replay non date se
 * lit comme une conversation qui vient d'avoir lieu — c'est le second volet du
 * meme incident, cote db.js/getRecentHistory.
 *
 * @param {Array<{role: string, content: string, createdAt?: Date|string}>} messages
 *   deja dans l'ordre chronologique (le plus ancien en premier).
 * @param {string} nomAgent - "Camille", "Ousmane"...
 * @param {string} nomUtilisateur - "Nathan", "Ben"...
 */
export function formaterReplay(messages, nomAgent, nomUtilisateur = "Nathan") {
  return messages
    .map((m) => {
      const quand = m.createdAt ? `[${formatDateCourte(m.createdAt)}] ` : "";
      return `${quand}${m.role === "USER" ? nomUtilisateur : nomAgent}: ${m.content}`;
    })
    .join("\n");
}

/**
 * Bloc de consigne a injecter dans le contexte STABLE du prompt (jamais dans le
 * bloc variable : il doit rester identique byte pour byte a chaque tour, cf.
 * la regle de non-retractation d'identite du 24/07/2026).
 *
 * Le second paragraphe est le plus important : il contrebalance les consignes
 * d'economie de budget du type "ne verifie pas ce que tu sais deja", qui sont
 * raisonnables pour la delegation mais produisent des reponses fausses des
 * qu'elles s'appliquent a un etat qui change SANS l'agent. C'etait la vraie
 * cause du "y'a pas de nouveau mail" sur des mails lus depuis trois jours.
 *
 * @param {string} exemplesEtatExterne - les sources propres a cet agent
 *   (ex. "boite mail, agenda, Trello, tableurs").
 */
export function consigneReperesTemporels(exemplesEtatExterne) {
  return [
    "--- REPERES TEMPORELS ---",
    "Chaque message de ton interlocuteur commence par un horodatage entre crochets, ex. [mercredi 13/08/2026 15:30]. C'est sa date d'envoi reelle. Sers-t'en pour situer le temps ecoule : une discussion reprise peut avoir des heures ou des jours d'ecart entre deux messages, meme si elle te parait continue. Ne dis jamais 'a l'instant' ou 'il y a deux minutes' sans avoir compare les horodatages. Ne recopie jamais ces prefixes entre crochets dans tes reponses.",
    `ETAT EXTERNE (${exemplesEtatExterne}) : quand on te demande un point ou un etat, va TOUJOURS le re-verifier avec tes outils avant de repondre, meme si tu as regarde recemment. Ces donnees changent sans toi : ta memoire de conversation n'est jamais une source a jour pour un etat externe.`,
  ].join("\n");
}
