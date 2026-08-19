// Filtres du tableau des fournisseurs : on coche les contraintes du client,
// chaque ligne devient compatible ou exclue, avec le MOTIF de l'exclusion.
//
// Le motif compte autant que la couleur : en rendez-vous, « Anthropic :
// exclu, hors périmètre HDS » se dit à voix haute, un rouge sans explication
// ne se dit pas.
//
// RÈGLE DE CONCEPTION : en cas de doute, on exclut. Un fournisseur affiché
// à tort comme compatible devant un client médical coûte bien plus cher
// qu'un fournisseur écarté par prudence. C'est pourquoi les mentions « non
// vérifié » comptent comme des exclusions et non comme des inconnues
// bénignes.
//
// Chaque critère porte sa propre règle. Ajouter un critère = ajouter une
// entrée ici, rien à toucher dans le composant.

// Pays de l'éditeur, indépendamment du lieu d'exécution. Un modèle Meta
// exécuté en France ne fait sortir aucune donnée, mais l'éditeur reste
// américain : les deux questions sont distinctes et le client pose
// souvent la seconde.
const EDITOR_COUNTRY = {
  "Mistral AI": "FR",
  Scaleway: "FR",
  OVHcloud: "FR",
  "NumSpot / Docaposte": "FR",
  Anthropic: "US",
  OpenAI: "US",
  Google: "US",
  "Microsoft Azure": "US",
  "Meta (Llama)": "US",
  "Alibaba (Qwen)": "CN",
  DeepSeek: "CN",
  xAI: "US",
  Cohere: "US",
};

// Un fournisseur n'est réputé exécutable en local que si ses poids sont
// ouverts ET la licence connue. « Non vérifié » ne vaut pas « oui ».
function hasUsableOpenWeights(p) {
  const w = p.openWeights ?? "";
  if (/^non/i.test(w)) return false;
  if (/non vérifié/i.test(w)) return false;
  return true;
}

export const CRITERIA = [
  {
    id: "france",
    label: "Hébergement en France",
    hint: "Le calcul se fait sur le territoire français, hors droit extra-européen",
    // Le droit applicable prime sur la localisation des serveurs : une
    // filiale européenne d'un éditeur américain reste sous droit américain.
    excludes: (p) => {
      if (p.jurisdiction?.tone === "good" && p.jurisdiction?.label === "France") return null;
      // « Local » = exécution chez le client : compatible si les poids sont
      // réellement téléchargeables.
      if (p.jurisdiction?.label === "Local" && hasUsableOpenWeights(p)) return null;
      return `Droit applicable : ${p.jurisdiction?.label ?? "hors France"}`;
    },
  },
  {
    id: "noUsChina",
    label: "Éditeur ni américain ni chinois",
    hint: "Exclut les éditeurs US et chinois, même si le modèle tourne en local",
    excludes: (p) => {
      const c = EDITOR_COUNTRY[p.name];
      if (c === "US") return "Éditeur américain";
      if (c === "CN") return "Éditeur chinois";
      return null;
    },
  },
  {
    id: "health",
    label: "Données de santé",
    hint: "Utilisable dans une architecture HDS, en direct ou auto-hébergé",
    // La question n'est pas « ce fournisseur est-il certifié HDS » mais
    // « peut-on le mettre dans une architecture HDS ». Aucune API
    // d'inférence prête à l'emploi n'est aujourd'hui dans un périmètre HDS :
    // la voie praticable est un modèle à poids ouverts déployé sur une infra
    // certifiée, ce qui rend Mistral compatible et Anthropic non.
    excludes: (p) => {
      if (p.health?.tone === "good") return null;
      if (p.health?.tone === "warn") return null;
      if (hasUsableOpenWeights(p)) return null;
      return "Hors périmètre HDS et poids fermés : aucune architecture HDS possible";
    },
  },
  {
    id: "fullyLocal",
    label: "Protection totale (modèle local)",
    hint: "Poids téléchargeables, licence connue, rien ne sort de la machine",
    excludes: (p) => {
      if (hasUsableOpenWeights(p)) return null;
      if (/non vérifié/i.test(p.openWeights ?? "")) return "Licence des poids non vérifiée";
      return "Poids fermés : exécution locale impossible";
    },
  },
  {
    id: "noTraining",
    label: "Aucun entraînement sur mes données",
    hint: "Engagement de non-réutilisation, vérifié",
    excludes: (p) => {
      const t = (p.training ?? "").toLowerCase();
      if (t.startsWith("sans objet")) return null;
      if (t.startsWith("non vérifié")) return "Politique d'entraînement non vérifiée";
      if (t.startsWith("non")) return null;
      return `Entraînement : ${p.training}`;
    },
  },
  {
    id: "verifiedPrice",
    label: "Tarif vérifié",
    hint: "Écarte les prix issus d'agrégateurs non confirmés",
    excludes: (p) =>
      /non vérifié/i.test(p.price ?? "") ? "Tarif non vérifié sur source officielle" : null,
  },
  {
    id: "under10",
    label: "Moins de 10 € par mois",
    hint: "Sur la base d'un usage quotidien d'indépendant (voir colonne coût / mois)",
    // Le seuil porte sur la facture mensuelle, pas sur le prix au token :
    // c'est la seule grandeur qu'un client sait interpréter. Un fournisseur
    // dont l'entrée de gamme passe sous 10 EUR reste compatible, le choix
    // du modèle se fait ensuite.
    excludes: (p) => {
      const m = p.monthly ?? "";
      if (/pas d'abonnement/i.test(m)) return null; // coût machine, pas de facture mensuelle
      if (/non vérifié|sur devis|aligné/i.test(m)) return `Coût mensuel inconnu : ${m}`;
      // Première valeur de la fourchette : c'est l'entrée de gamme.
      const first = m.match(/(\d+(?:[.,]\d+)?)/);
      if (first && parseFloat(first[1].replace(",", ".")) < 10) return null;
      if (/^</.test(m)) return null;
      return `Au-delà de 10 EUR par mois : ${m}`;
    },
  },
  {
    id: "clientAccount",
    label: "Le client apporte son compte",
    hint: "Il fournit sa propre clé d'API et paie sa consommation",
    excludes: (p) => {
      // Un modèle à poids ouverts sans offre managée ne se prête pas au
      // schéma « le client apporte sa clé ».
      if (/^coût gpu/i.test(p.price ?? "")) {
        return "Pas d'offre par abonnement : aucune clé à apporter";
      }
      return null;
    },
  },
  {
    id: "managed",
    label: "Le client ne gère aucun serveur",
    hint: "Service managé, aucune machine à administrer",
    excludes: (p) => {
      if (/^coût gpu/i.test(p.price ?? "") || p.location === "Vous hébergez") {
        return "Demande d'héberger et d'administrer le modèle soi-même";
      }
      return null;
    },
  },
];
