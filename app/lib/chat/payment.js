// Liens de paiement Stripe pour les prestations cadrees par Nate.
//
// Choix assume : on utilise des Payment Links Stripe (crees une fois a la main
// dans le dashboard, URL collee en variable d environnement) plutot que des
// Checkout Sessions creees a la volee par l API. Raisons :
// - aucune cle secrete Stripe a stocker sur le VPS pour ce flux
// - la facture est generee et envoyee automatiquement par Stripe
// - Nathan peut changer un prix depuis le dashboard sans redeploiement
//
// La contrepartie est qu on ne peut pas prefixer le montant par projet : les
// trois paliers de la grille (voir mission.md) correspondent a trois liens.
//
// Prefill : Stripe accepte ?prefilled_email= sur un Payment Link, ce qui evite
// au prospect de retaper l email qu il a deja donne a la verification. Le
// client_reference_id permet de retrouver le lead correspondant dans le
// webhook Stripe le jour ou on branchera le declenchement automatique d Aston.

const TIERS = ["simple", "moyen", "complexe"];

const ENV_BY_TIER = {
  simple: "STRIPE_LINK_SIMPLE",
  moyen: "STRIPE_LINK_MOYEN",
  complexe: "STRIPE_LINK_COMPLEXE",
};

const LABEL_BY_TIER = {
  simple: "Regler 490 EUR et lancer le projet",
  moyen: "Regler 1 490 EUR et lancer le projet",
  complexe: "Regler 2 900 EUR et lancer le projet",
};

export const NATHAN_PHONE = "+33622164758";
export const NATHAN_PHONE_DISPLAY = "06 22 16 47 58";

/**
 * Construit l URL de paiement pour un palier donne, prefixee avec l email du
 * prospect. Renvoie null si le palier est inconnu ou si le lien n est pas
 * configure (l appelant affiche alors un repli, jamais un bouton casse).
 */
export function paymentLinkFor(tier, { email, threadId } = {}) {
  if (!TIERS.includes(tier)) return null;

  const base = process.env[ENV_BY_TIER[tier]];
  if (!base) return null;

  try {
    const url = new URL(base);
    if (email) url.searchParams.set("prefilled_email", email);
    if (threadId) url.searchParams.set("client_reference_id", threadId);
    return { url: url.toString(), label: LABEL_BY_TIER[tier] };
  } catch {
    console.error(`Lien Stripe invalide pour le palier ${tier} : ${base}`);
    return null;
  }
}

/**
 * Detecte les marqueurs ---PAIEMENT--- / ---TELEPHONE--- ecrits par Nate en
 * fin de reponse (voir mission.md) et les retire du texte affiche. Renvoie le
 * texte nettoye et l action a proposer sous la bulle.
 */
export function splitActionMarkers(reply) {
  let text = reply;
  let action = null;

  const payIdx = text.indexOf("---PAIEMENT---");
  if (payIdx !== -1) {
    const after = text.slice(payIdx + "---PAIEMENT---".length);
    const tier = after.split("\n").map((l) => l.trim()).filter(Boolean)[0]?.toLowerCase();
    text = text.slice(0, payIdx).trim();
    action = { kind: "payment", tier: TIERS.includes(tier) ? tier : null };
  }

  const telIdx = text.indexOf("---TELEPHONE---");
  if (telIdx !== -1) {
    text = text.slice(0, telIdx).trim();
    // Un marqueur telephone ne doit jamais ecraser une proposition de paiement
    // deja detectee : le paiement est l action prioritaire de fin de parcours.
    action = action ?? { kind: "phone" };
  }

  return { text, action };
}
