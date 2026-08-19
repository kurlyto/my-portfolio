// Moteur de recommandation : à partir des contraintes cochées, propose un
// montage complet (hébergement, modèle, canal) plutôt qu'une liste de
// fournisseurs compatibles.
//
// Principe : Nathan est l'intégrateur. La question n'est jamais « le client
// sait-il gérer un serveur » mais « où tourne le modèle, et qu'est-ce qui
// sort de l'infrastructure ». Trois hébergements possibles :
//   - notre Dedibox (déjà payée, HDS, mais SANS GPU)
//   - une machine chez le client (achat, pour la protection totale)
//   - un GPU loué en France (quand le local est requis et qu'il faut du débit)
//
// La contrainte structurante est le GPU : notre serveur n'en a pas, donc
// tout montage « rien ne sort » en usage interactif demande du matériel en
// plus. C'est le point qui coûte de l'argent, il doit être dit.

import { CAPABILITIES } from "./criteria";

const TELEGRAM = { channel: "Telegram", channelWhy: "Déjà installé chez le client, gratuit" };
const MATRIX = {
  channel: "Matrix auto-hébergé",
  channelWhy: "Nous sommes l'opérateur : rien ne transite par un tiers",
};
const MAIL = { channel: "Email ou SMS", channelWhy: "Aucune application à installer" };

export function recommend({ criteria = [], usage = "medium", channel = null }) {
  const has = (id) => criteria.includes(id);

  const mustStayInternal = has("fullyLocal") || has("clientHardware");
  const health = has("health");
  const sovereign = has("noUsChina") || has("france");
  const budget = has("under10");

  // Le canal explicitement demandé prime ; sinon il découle de la
  // sensibilité des données.
  const chan =
    channel === "chanConfidential"
      ? MATRIX
      : channel === "chanNoApp"
        ? MAIL
        : channel === "chanSimple"
          ? TELEGRAM
          : mustStayInternal || health
            ? MATRIX
            : TELEGRAM;

  // Cas 1 : le matériel doit être chez le client.
  if (has("clientHardware")) {
    const machine =
      usage === "heavy"
        ? "PC RTX 5090 32 Go, environ 4 300 EUR la carte"
        : usage === "light"
          ? "Mac Studio M4 Max 32 Go, 2 199 EUR"
          : "PC RTX 4090 24 Go, environ 3 390 EUR la carte";
    return {
      title: "Machine chez le client, rien ne sort de ses locaux",
      hosting: machine,
      model: "Mistral Small 3.2 24B, Apache 2.0, éditeur français",
      runtime: usage === "heavy" ? "vLLM" : "Ollama",
      ...chan,
      cost: "Achat unique du matériel, puis prestation. Aucun abonnement au token.",
      caveats: [
        "Un modèle 24B local reste en deçà des grands modèles en ligne sur le raisonnement complexe.",
        "Maintenance et pannes à distance à prévoir dans le contrat.",
      ],
    };
  }

  // Cas 2 : rien ne doit sortir de notre infrastructure.
  if (mustStayInternal) {
    if (!CAPABILITIES.server.gpu && usage !== "light") {
      return {
        title: "Modèle auto-hébergé, mais notre serveur n'a pas de GPU",
        hosting: "GPU loué en France : Scaleway L4 environ 575 EUR/mois, ou OVHcloud L4 environ 500 EUR/mois",
        model: "Mistral Small 3.2 24B, Apache 2.0",
        runtime: usage === "heavy" ? "vLLM" : "Ollama",
        ...chan,
        cost: "Environ 500 à 600 EUR par mois de GPU, à répartir entre plusieurs clients.",
        caveats: [
          `Notre Dedibox (${CAPABILITIES.server.detail}) tient 4 à 15 tokens par seconde : suffisant pour du traitement de nuit, pas pour du dialogue.`,
          "Un GPU loué n'est rentable qu'à partir de plusieurs clients, ou d'un client qui le finance.",
        ],
      };
    }
    return {
      title: "Modèle auto-hébergé sur notre Dedibox",
      hosting: `${CAPABILITIES.server.label} (${CAPABILITIES.server.detail})`,
      model: "Ministral 3 8B, Apache 2.0, éditeur français",
      runtime: "Ollama",
      ...chan,
      cost: "Aucun coût supplémentaire : le serveur est déjà payé.",
      caveats: [
        "4 à 15 tokens par seconde sans GPU : acceptable pour un usage occasionnel, pénible en conversation soutenue.",
        "Passer à un GPU loué dès que le client se plaint de la lenteur.",
      ],
    };
  }

  // Cas 3 : données de santé, sans exigence de local strict.
  if (health) {
    return {
      title: "Architecture HDS : modèle ouvert sur notre infrastructure certifiée",
      hosting: `${CAPABILITIES.server.label}, sous contrat HDS signé`,
      model: "Mistral, poids ouverts Apache 2.0, déployé par nos soins",
      runtime: "Ollama, ou GPU loué si le débit ne suffit pas",
      ...chan,
      cost: "Serveur déjà payé. GPU loué en supplément si nécessaire.",
      caveats: [
        "Aucune API d'inférence prête à l'emploi n'est dans un périmètre HDS : l'appel à Claude ou GPT depuis un serveur HDS ferait sortir la donnée du périmètre.",
        "Vérifier le contrat HDS de la Dedibox : la certification ne se transmet pas en louant une machine.",
      ],
    };
  }

  // Cas 4 : souveraineté sans donnée de santé.
  if (sovereign) {
    return {
      title: "API française, agent hébergé chez nous",
      hosting: `${CAPABILITIES.server.label}`,
      model: "Mistral, API La Plateforme, droit français",
      runtime: "Appel API, rien à administrer",
      ...chan,
      cost: "Environ 1 à 3 EUR par mois d'API pour un usage quotidien.",
      caveats: ["Confirmer par écrit la politique de rétention de Mistral avant de s'engager."],
    };
  }

  // Cas 5 : aucune contrainte forte. Le montage par défaut.
  const model = budget
    ? "Claude Haiku 4.5, environ 6 EUR par mois"
    : usage === "heavy"
      ? "Claude Sonnet 5, environ 19 EUR par mois"
      : "Claude Sonnet 5 ou Mistral selon le budget";

  return {
    title: "Montage standard : hébergé chez nous, API au compteur",
    hosting: `${CAPABILITIES.server.label}`,
    model,
    runtime: "Appel API, rien à administrer",
    ...chan,
    cost: budget ? "Moins de 10 EUR par mois." : "Entre 6 et 32 EUR par mois selon le modèle.",
    caveats: [
      "Les données transitent par un fournisseur américain : à ne pas proposer si le client a des données sensibles.",
    ],
  };
}
