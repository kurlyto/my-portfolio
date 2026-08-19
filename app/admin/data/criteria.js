// Critères du client, et moteur de recommandation de montage.
//
// CHANGEMENT DE LOGIQUE : les filtres ne demandent plus « ce fournisseur
// convient-il au client » mais « quel montage je propose ». Nathan est
// l'intégrateur : « le client ne veut pas gérer de serveur » n'exclut donc
// pas Llama, puisque c'est Nathan qui l'héberge. Ce qui se filtre, c'est
// ce qui SORT de son infrastructure, pas qui administre la machine.
//
// En cas de doute, on exclut : un fournisseur affiché à tort comme
// compatible devant un client médical coûte plus cher qu'un fournisseur
// écarté par prudence.

// Ce dont Nathan dispose, et qui sert de base aux recommandations.
export const CAPABILITIES = {
  server: {
    label: "Dedibox HDS, France",
    detail: "Ryzen 5 PRO 3600, 12 threads, 30 Go de RAM, pas de GPU",
    // Vérifié en SSH le 19/08/2026 : le contrôleur ASPEED est la puce
    // d'affichage de la carte mère, pas une carte de calcul.
    gpu: false,
  },
};

// Pays de l'éditeur, indépendamment du lieu d'exécution. Un modèle Meta
// exécuté en France ne fait sortir aucune donnée, mais l'éditeur reste
// américain : les deux questions sont distinctes.
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

// Poids ouverts ET licence connue. « Non vérifié » ne vaut pas « oui ».
function hasUsableOpenWeights(p) {
  const w = p.openWeights ?? "";
  if (/^non/i.test(w)) return false;
  if (/non vérifié/i.test(w)) return false;
  return true;
}

// Niveau d'usage : dimensionne le montage, pas la conformité.
export const USAGE_LEVELS = [
  {
    id: "light",
    label: "Usage faible",
    hint: "1 personne, quelques échanges par jour",
  },
  {
    id: "medium",
    label: "Usage moyen",
    hint: "1 à 3 personnes, échanges quotidiens, un rapport par jour",
  },
  {
    id: "heavy",
    label: "Gros usage",
    hint: "Cabinet de plusieurs personnes, traitement de documents en masse",
  },
];

export const CRITERIA = [
  {
    id: "france",
    label: "Traitement en France",
    hint: "Le calcul se fait en France, hors droit extra-européen",
    excludes: (p) => {
      if (p.jurisdiction?.tone === "good" && p.jurisdiction?.label === "France") return null;
      // « Local » = exécuté sur une machine que nous maîtrisons, donc en
      // France : compatible si les poids sont réellement téléchargeables.
      if (p.jurisdiction?.label === "Local" && hasUsableOpenWeights(p)) return null;
      if (hasUsableOpenWeights(p)) return null;
      return `Droit applicable : ${p.jurisdiction?.label ?? "hors France"}`;
    },
  },
  {
    id: "noUsChina",
    label: "Éditeur ni américain ni chinois",
    hint: "Exclut les éditeurs US et chinois, même exécutés en local",
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
    // Aucune API d'inférence prête à l'emploi n'est dans un périmètre HDS :
    // la voie praticable est un modèle à poids ouverts déployé sur une
    // infrastructure certifiée.
    excludes: (p) => {
      if (p.health?.tone === "good" || p.health?.tone === "warn") return null;
      if (hasUsableOpenWeights(p)) return null;
      return "Hors périmètre HDS et poids fermés";
    },
  },
  {
    id: "fullyLocal",
    label: "Rien ne sort de l'infrastructure",
    hint: "Poids téléchargeables, aucun appel vers un tiers",
    excludes: (p) => {
      if (hasUsableOpenWeights(p)) return null;
      if (/non vérifié/i.test(p.openWeights ?? "")) return "Licence des poids non vérifiée";
      return "Poids fermés : exécution locale impossible";
    },
  },
  {
    id: "clientHardware",
    label: "Sur la machine du client",
    hint: "Le matériel est chez le client, pas chez nous",
    excludes: (p) =>
      hasUsableOpenWeights(p) ? null : "Poids fermés : rien à installer chez le client",
  },
  {
    id: "noTraining",
    label: "Aucun entraînement sur les données",
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
    id: "under10",
    label: "Moins de 10 € par mois",
    hint: "Sur la base d'un usage quotidien, voir la colonne coût / mois",
    excludes: (p) => {
      const m = p.monthly ?? "";
      if (/pas d'abonnement/i.test(m)) return null;
      if (/non vérifié|sur devis|aligné/i.test(m)) return `Coût mensuel inconnu : ${m}`;
      const first = m.match(/(\d+(?:[.,]\d+)?)/);
      if (first && parseFloat(first[1].replace(",", ".")) < 10) return null;
      if (/^</.test(m)) return null;
      return `Au-delà de 10 EUR par mois : ${m}`;
    },
  },
  {
    id: "verifiedPrice",
    label: "Tarif vérifié",
    hint: "Écarte les prix issus d'agrégateurs non confirmés",
    excludes: (p) =>
      /non vérifié/i.test(p.price ?? "") ? "Tarif non vérifié sur source officielle" : null,
  },
];

// Canal de discussion : question indépendante du modèle, on la pose donc
// séparément plutôt que d'en faire un filtre du tableau des fournisseurs.
export const CHANNEL_CRITERIA = [
  {
    id: "chanSimple",
    label: "Le plus simple pour le client",
    pick: "Telegram",
    why: "Application déjà installée, gratuit, mise en service en une heure",
  },
  {
    id: "chanConfidential",
    label: "Canal confidentiel",
    pick: "Matrix auto-hébergé",
    why: "Le seul dont nous sommes l'opérateur : chiffrement imposé, fédération fermée",
  },
  {
    id: "chanNoApp",
    label: "Sans installer d'application",
    pick: "Email ou SMS",
    why: "Universel, aucun compte à créer",
  },
];
