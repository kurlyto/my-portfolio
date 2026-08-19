// Contraintes client, groupées par famille, et capacités disponibles.
//
// PRINCIPE : les filtres décrivent ce que le client exige, jamais ce qu'il
// « s'en fout ». Une famille sans sélection est simplement sans contrainte :
// pas besoin d'une case pour le dire.
//
// Deux familles distinctes qu'il ne faut jamais confondre :
//   - HÉBERGEMENT : où vit l'agent, ses fichiers, ses journaux
//   - MODÈLE : où part le texte des questions et des documents
// Un serveur français certifié HDS ne protège rien si le modèle appelé est
// hors UE. C'est l'erreur la plus fréquente sur ce sujet.
//
// En cas de doute, on exclut : un fournisseur affiché à tort comme
// compatible devant un client médical coûte plus cher qu'un fournisseur
// écarté par prudence.

// Ce dont nous disposons. Vérifié en SSH le 19/08/2026 : le contrôleur
// ASPEED est la puce d'affichage de la carte mère, pas une carte de calcul.
export const CAPABILITIES = {
  server: {
    label: "Dedibox HDS, France",
    detail: "Ryzen 5 PRO 3600, 12 threads, 30 Go de RAM, pas de GPU",
    gpu: false,
  },
};

// Pays de l'éditeur, indépendamment du lieu d'exécution. Un modèle Meta
// exécuté en France ne fait sortir aucune donnée, mais l'éditeur reste
// américain : les deux questions sont distinctes et le client pose souvent
// la seconde.
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

// Poids ouverts ET licence connue. « Non vérifié » ne vaut pas « oui » :
// une licence incertaine ne permet pas de s'engager.
function hasUsableOpenWeights(p) {
  const w = p.openWeights ?? "";
  if (/^non/i.test(w)) return false;
  if (/non vérifié/i.test(w)) return false;
  return true;
}

// Où tourne réellement le calcul, une fois le montage choisi.
function runsOnOurSide(p) {
  return hasUsableOpenWeights(p);
}

export const USAGE_LEVELS = [
  { id: "light", label: "1 personne, usage ponctuel", hint: "Quelques échanges par jour" },
  { id: "medium", label: "1 à 3 personnes, quotidien", hint: "Échanges réguliers, un rapport par jour" },
  { id: "heavy", label: "Cabinet, traitement en masse", hint: "Plusieurs personnes, gros volumes de documents" },
];

// Familles de contraintes. Chaque critère porte sa règle d'exclusion, qui
// reçoit une ligne du tableau des fournisseurs et renvoie soit null (la
// ligne passe), soit le motif du rejet.
export const CRITERIA_GROUPS = [
  {
    id: "hosting",
    label: "Hébergement",
    hint: "Où vivent l'agent, ses fichiers et ses journaux",
    criteria: [
      {
        id: "hostFrance",
        label: "Hébergement en France",
        hint: "Notre Dedibox certifiée HDS répond déjà à cette exigence",
        // L'hébergement de l'agent est toujours le nôtre : cette contrainte
        // ne discrimine aucun fournisseur de modèle, elle documente le
        // montage. Elle est reprise par le recommandeur.
        excludes: () => null,
      },
      {
        id: "hostNoUs",
        label: "Aucun hébergement aux États-Unis",
        hint: "Une résidence UE chez un éditeur américain ne suffit pas : le droit américain suit",
        excludes: (p) => {
          if (runsOnOurSide(p)) return null;
          if (/US|États-Unis/i.test(p.location ?? "")) return "Serveurs aux États-Unis";
          // Une option de résidence UE proposée par un éditeur américain ne
          // met pas la donnée hors de portée du Cloud Act : ce critère
          // porte sur le lieu, mais afficher « compatible » ici induirait
          // en erreur. On signale la nuance plutôt que de laisser passer.
          if (/US|Cloud Act/i.test(p.jurisdiction?.label ?? "")) {
            return "Résidence UE possible, mais éditeur soumis au droit américain";
          }
          return null;
        },
      },
      {
        id: "hostNoChina",
        label: "Aucun hébergement en Chine",
        hint: "Exclut les fournisseurs dont l'infrastructure est chinoise",
        excludes: (p) => {
          if (runsOnOurSide(p)) return null;
          if (/Chine/i.test(p.location ?? "")) return "Serveurs en Chine";
          return null;
        },
      },
    ],
  },
  {
    id: "model",
    label: "Traitement par le modèle",
    hint: "Où part le texte des questions et des documents",
    criteria: [
      {
        id: "modelNoExit",
        label: "Les données ne sortent pas de notre infrastructure",
        hint: "Modèle à poids ouverts exécuté chez nous, aucun appel vers un tiers",
        excludes: (p) =>
          hasUsableOpenWeights(p)
            ? null
            : /non vérifié/i.test(p.openWeights ?? "")
              ? "Licence des poids non vérifiée"
              : "Poids fermés : exécution locale impossible",
      },
      {
        id: "modelNoUs",
        label: "Aucun traitement soumis au droit américain",
        hint: "Le Cloud Act s'applique aussi aux filiales européennes",
        excludes: (p) => {
          if (runsOnOurSide(p)) return null;
          return /US|Cloud Act/i.test(p.jurisdiction?.label ?? "")
            ? "Soumis au Cloud Act américain"
            : null;
        },
      },
      {
        id: "modelNoChina",
        label: "Aucun traitement en Chine",
        hint: "API chinoises exclues, les poids ouverts exécutés chez nous restent possibles",
        excludes: (p) => {
          if (runsOnOurSide(p)) return null;
          return /Chine/i.test(p.jurisdiction?.label ?? "") ? "Traitement en Chine" : null;
        },
      },
      {
        id: "modelNoEditorUsCn",
        label: "Éditeur ni américain ni chinois",
        hint: "Exclut ces éditeurs même quand le modèle tourne en local",
        excludes: (p) => {
          const c = EDITOR_COUNTRY[p.name];
          if (c === "US") return "Éditeur américain";
          if (c === "CN") return "Éditeur chinois";
          return null;
        },
      },
      {
        id: "modelNoTraining",
        label: "Aucun entraînement sur les données",
        hint: "Engagement de non-réutilisation, vérifié sur source officielle",
        excludes: (p) => {
          const t = (p.training ?? "").toLowerCase();
          if (t.startsWith("sans objet")) return null;
          if (t.startsWith("non vérifié")) return "Politique d'entraînement non vérifiée";
          if (t.startsWith("non")) return null;
          return `Entraînement : ${p.training}`;
        },
      },
    ],
  },
  {
    id: "business",
    label: "Contraintes métier",
    hint: "Ce qu'impose la nature des données du client",
    criteria: [
      {
        id: "bizHealth",
        label: "Données de santé (HDS obligatoire)",
        hint: "Aucune API d'inférence n'étant sous périmètre HDS, la voie est le modèle ouvert sur infra certifiée",
        excludes: (p) => {
          if (p.health?.tone === "good" || p.health?.tone === "warn") return null;
          if (hasUsableOpenWeights(p)) return null;
          return "Hors périmètre HDS et poids fermés";
        },
      },
      {
        id: "bizSecret",
        label: "Secret professionnel (avocat, notaire)",
        hint: "Pas de certification imposée, mais aucun tiers ne doit lire les documents",
        excludes: (p) => {
          if (hasUsableOpenWeights(p)) return null;
          const t = (p.training ?? "").toLowerCase();
          if (t.startsWith("non") && !t.startsWith("non vérifié")) return null;
          return "Aucun engagement vérifié de non-réutilisation";
        },
      },
      {
        id: "bizClientHardware",
        label: "Le matériel doit être dans les locaux du client",
        hint: "Rien ne quitte le cabinet, même pas vers notre serveur",
        excludes: (p) =>
          hasUsableOpenWeights(p) ? null : "Poids fermés : rien à installer chez le client",
      },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    hint: "Sur la base de l'usage sélectionné",
    criteria: [
      {
        id: "budgetUnder10",
        label: "Moins de 10 € par mois",
        hint: "Voir la colonne coût mensuel du tableau",
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
        id: "budgetVerified",
        label: "Tarif vérifié sur source officielle",
        hint: "Écarte les prix issus d'agrégateurs",
        excludes: (p) =>
          /non vérifié/i.test(p.price ?? "") ? "Tarif non vérifié sur source officielle" : null,
      },
    ],
  },
];

// Liste à plat, pour l'évaluation.
export const CRITERIA = CRITERIA_GROUPS.flatMap((g) => g.criteria);

// Messagerie : famille à part, car elle ne filtre pas les fournisseurs de
// modèles mais les passerelles. Critères issus des sources primaires
// (docs Hermes Agent, CGU Signal, tarification Meta, doc Telegram).
export const CHANNEL_CRITERIA = [
  {
    id: "chanE2ee",
    label: "Chiffrement de bout en bout",
    hint: "Protège contre l'opérateur de la messagerie, jamais contre l'hébergeur de l'agent",
    excludes: (g) =>
      g.e2ee?.tone === "good" ? null : `Chiffrement de bout en bout : ${g.e2ee?.label ?? "non"}`,
  },
  {
    id: "chanSelfHost",
    label: "Auto-hébergeable",
    hint: "Nous sommes l'opérateur : aucun tiers ne voit les échanges",
    excludes: (g) => {
      if (g.selfHost?.tone === "good") return null;
      if (g.selfHost?.tone === "warn") return "Auto-hébergement partiel seulement";
      return "Opéré par un tiers";
    },
  },
  {
    id: "chanNoApp",
    label: "Sans application à installer",
    hint: "Le client n'installe rien et ne crée aucun compte",
    excludes: (g) =>
      /sans application/i.test(g.comfort ?? "") || g.name === "Email"
        ? null
        : "Demande une application ou un compte",
  },
  {
    id: "chanResale",
    label: "Revente commerciale autorisée",
    hint: "Écarte les passerelles dont les conditions interdisent un usage revendu",
    excludes: (g) =>
      g.proUse?.tone === "bad" ? `Conditions d'utilisation : ${g.proUse.label}` : null,
  },
  {
    id: "chanFree",
    label: "Sans coût par message",
    hint: "Écarte les passerelles facturées à l'usage",
    excludes: (g) => (/par message/i.test(g.cost ?? "") ? `Facturé : ${g.cost}` : null),
  },
  {
    id: "chanEasy",
    label: "Mise en service rapide",
    hint: "API officielle et installation simple",
    excludes: (g) => (/faible|moyenne/i.test(g.difficulty ?? "") ? null : "Installation exigeante"),
  },
];
