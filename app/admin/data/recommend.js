// Moteur de recommandation : à partir des contraintes cochées, propose un
// montage complet (hébergement, modèle, machine, canal, coût).
//
// Principe : nous sommes l'intégrateur. La question n'est jamais « le client
// sait-il gérer un serveur » mais « où tourne le modèle, et qu'est-ce qui
// sort de l'infrastructure ».
//
// Les MACHINES ne sont pas un filtre mais une conséquence : personne ne
// choisit un RTX 4090, c'est ce qui reste quand on a exigé du local et un
// certain volume. La fonction renvoie donc la liste des machines encore
// possibles, calculée à partir des autres contraintes.

import { CAPABILITIES } from "./criteria";

const TELEGRAM = { channel: "Telegram", channelWhy: "Déjà installé chez le client, gratuit" };
const MATRIX = {
  channel: "Matrix auto-hébergé",
  channelWhy: "Nous sommes l'opérateur : rien ne transite par un tiers",
};
const MAIL = { channel: "Email ou SMS", channelWhy: "Aucune application à installer" };

// Machines retenues selon le lieu d'exécution et le volume. Les prix
// viennent du tableau matériel, vérifiés le 19/08/2026.
function machinesFor({ where, usage }) {
  if (where === "api") {
    return [
      {
        name: CAPABILITIES.server.label,
        why: "L'agent seul y tourne : le calcul est fait par l'API, aucune machine supplémentaire",
      },
    ];
  }

  if (where === "client") {
    if (usage === "heavy") {
      return [
        { name: "PC RTX 5090 32 Go", why: "Environ 4 300 EUR la carte, 5 à 12 utilisateurs" },
        { name: "Station GPU professionnelle", why: "Au-delà de 15 personnes, sur devis" },
      ];
    }
    if (usage === "light") {
      return [
        { name: "Mac Studio M4 Max 32 Go", why: "2 199 EUR, silencieux, aucune carte à gérer" },
        { name: "PC RTX 4090 24 Go", why: "Environ 3 390 EUR la carte, plus de marge" },
      ];
    }
    return [
      { name: "PC RTX 4090 24 Go", why: "Environ 3 390 EUR la carte, 3 à 8 utilisateurs" },
      { name: "Mac Apple Silicon 64 Go", why: "3 500 à 4 000 EUR, jusqu'à 3 personnes" },
    ];
  }

  // Exécution chez nous. La Dedibox n'a pas de GPU : elle ne convient qu'à
  // un usage ponctuel ou à du traitement de nuit.
  if (usage === "light") {
    return [
      {
        name: `${CAPABILITIES.server.label}, telle quelle`,
        why: "Déjà payée. 4 à 15 tokens par seconde : acceptable en usage ponctuel",
      },
      { name: "GPU loué en France", why: "Environ 500 à 575 EUR par mois si la lenteur gêne" },
    ];
  }

  return [
    {
      name: "GPU loué en France (Scaleway ou OVHcloud L4)",
      why: "Environ 500 à 575 EUR par mois, à répartir entre plusieurs clients",
    },
    {
      name: `${CAPABILITIES.server.label}, pour les traitements de nuit`,
      why: "Sans GPU : indexation et traitement par lots seulement, pas de dialogue",
    },
  ];
}

export function recommend({ criteria = [], usage = "medium", channel = null }) {
  const has = (id) => criteria.includes(id);

  const clientHardware = has("bizClientHardware");
  const mustStayInternal = has("modelNoExit") || clientHardware;
  const health = has("bizHealth");
  const secret = has("bizSecret");
  const sovereign =
    has("modelNoUs") || has("modelNoEditorUsCn") || has("hostNoUs") || has("modelNoChina");
  const budget = has("budgetUnder10");

  const where = clientHardware ? "client" : mustStayInternal || health ? "ours" : "api";

  const chan =
    channel === "chanSelfHost" || channel === "chanE2ee"
      ? MATRIX
      : channel === "chanNoApp"
        ? MAIL
        : channel === "chanEasy" || channel === "chanFree"
          ? TELEGRAM
          : mustStayInternal || health
            ? MATRIX
            : TELEGRAM;

  const machines = machinesFor({ where, usage });

  if (clientHardware) {
    return {
      title: "Machine chez le client, rien ne quitte ses locaux",
      hosting: "Aucun hébergement de notre côté pour le modèle",
      model: "Mistral Small 3.2 24B, Apache 2.0, éditeur français",
      runtime: usage === "heavy" ? "vLLM" : "Ollama",
      machines,
      ...chan,
      cost: "Achat unique du matériel, puis prestation. Aucun abonnement au token.",
      caveats: [
        "Un modèle 24B local reste en deçà des grands modèles en ligne sur le raisonnement complexe et la rédaction longue.",
        "Maintenance, mises à jour et pannes à distance sont à prévoir dans le contrat.",
      ],
    };
  }

  if (mustStayInternal) {
    const noGpuAndBusy = !CAPABILITIES.server.gpu && usage !== "light";
    return {
      title: noGpuAndBusy
        ? "Modèle auto-hébergé : un GPU est nécessaire"
        : "Modèle auto-hébergé sur notre Dedibox",
      hosting: `${CAPABILITIES.server.label} (${CAPABILITIES.server.detail})`,
      model: noGpuAndBusy
        ? "Mistral Small 3.2 24B, Apache 2.0"
        : "Ministral 3 8B, Apache 2.0, éditeur français",
      runtime: usage === "heavy" ? "vLLM" : "Ollama",
      machines,
      ...chan,
      cost: noGpuAndBusy
        ? "Environ 500 à 575 EUR par mois de GPU loué, à répartir entre plusieurs clients."
        : "Aucun coût supplémentaire : le serveur est déjà payé.",
      caveats: noGpuAndBusy
        ? [
            "Notre Dedibox n'a pas de GPU : 4 à 15 tokens par seconde, soit du traitement de nuit, pas du dialogue.",
            "Un GPU loué n'est rentable qu'à partir de plusieurs clients, ou d'un client qui le finance.",
          ]
        : [
            "4 à 15 tokens par seconde sans GPU : acceptable en usage ponctuel, pénible en conversation soutenue.",
            "Passer à un GPU loué dès que le client se plaint de la lenteur.",
          ],
    };
  }

  if (health) {
    return {
      title: "Architecture HDS : modèle ouvert sur notre infrastructure certifiée",
      hosting: `${CAPABILITIES.server.label}, sous contrat HDS signé`,
      model: "Mistral, poids ouverts Apache 2.0, déployé par nos soins",
      runtime: "Ollama, ou vLLM sur GPU loué si le débit ne suffit pas",
      machines,
      ...chan,
      cost: "Serveur déjà payé. GPU loué en supplément si le volume l'exige.",
      caveats: [
        "Aucune API d'inférence prête à l'emploi n'est sous périmètre HDS : appeler Claude ou GPT depuis un serveur HDS ferait sortir la donnée du périmètre.",
        "Vérifier le contrat HDS de la Dedibox : la certification ne se transmet pas en louant une machine.",
      ],
    };
  }

  if (sovereign || secret) {
    return {
      title: "API française, agent hébergé chez nous",
      hosting: CAPABILITIES.server.label,
      model: "Mistral, API La Plateforme, droit français",
      runtime: "Appel API, aucune machine à administrer",
      machines,
      ...chan,
      cost: "Environ 1 à 3 EUR par mois pour un usage quotidien.",
      caveats: ["Confirmer par écrit la politique de rétention de Mistral avant de s'engager."],
    };
  }

  const model = budget
    ? "Claude Haiku 4.5, environ 6 EUR par mois"
    : usage === "heavy"
      ? "Claude Sonnet 5, environ 19 EUR par mois"
      : "Claude Sonnet 5, ou Mistral si le budget prime";

  return {
    title: "Montage standard : hébergé chez nous, modèle en API",
    hosting: CAPABILITIES.server.label,
    model,
    runtime: "Appel API, aucune machine à administrer",
    machines,
    ...chan,
    cost: budget ? "Moins de 10 EUR par mois." : "Entre 6 et 32 EUR par mois selon le modèle.",
    caveats: [
      "Les données transitent par un fournisseur américain : à ne pas proposer si le client a des données sensibles.",
    ],
  };
}
