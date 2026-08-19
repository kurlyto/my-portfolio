// Comparatif des passerelles de messagerie utilisables comme interface d'un
// agent. Verifie le 18/08/2026 sur les sources primaires (docs officielles
// Hermes Agent, CGU Signal, doc tarifaire Meta, doc Telegram).
//
// LE PIEGE A RETENIR, valable pour TOUTES les lignes : un bot est une
// extremite de la conversation. Le chiffrement de bout en bout protege le
// message pendant le transport ; l'agent doit dechiffrer pour comprendre.
// Le contenu est donc TOUJOURS en clair sur le serveur qui heberge l'agent.
// "Signal chiffre" ne rend donc rien prive vis-a-vis de l'hebergeur de l'agent.

export const GATEWAY_COLUMNS = [
  { key: "name", label: "Passerelle" },
  { key: "how", label: "Branchement" },
  { key: "difficulty", label: "Difficulte" },
  { key: "e2ee", label: "Chiffrement bout en bout" },
  { key: "operatorSees", label: "Ce que voit l'operateur" },
  { key: "selfHost", label: "Auto-hebergeable" },
  { key: "cost", label: "Cout" },
  { key: "comfort", label: "Confort client" },
  { key: "verdict", label: "Verdict" },
];

export const GATEWAYS = [
  {
    name: "Telegram",
    domain: "telegram.org",
    how: "API bot officielle (@BotFather)",
    difficulty: "Tres simple",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees:
      "Tout le contenu. Les echanges avec un bot sont des cloud chats, jamais chiffres de bout en bout. Numero de telephone, horaires, IP.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Gratuit",
    comfort: "Excellent",
    verdict:
      "Le meilleur rapport effort/resultat pour demarrer. A exclure pour toute donnee sensible.",
    tone: "warn",
  },
  {
    name: "WhatsApp",
    domain: "whatsapp.com",
    how: "Cloud API officielle (Meta)",
    difficulty: "Moyen",
    e2ee: { label: "Non via API", tone: "bad" },
    operatorSees:
      "Tout le contenu. WhatsApp grand public est chiffre, mais via l'API Business les messages transitent en clair chez Meta.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Payant au message (varie par pays)",
    comfort: "Excellent",
    verdict:
      "Le plus confortable pour un client, mais Meta lit tout et la facture court au message.",
    tone: "warn",
  },
  {
    name: "Matrix / Element",
    domain: "element.io",
    how: "API officielle, serveur Synapse ou Conduit",
    difficulty: "Exigeant",
    e2ee: { label: "Oui, si impose", tone: "good" },
    operatorSees:
      "Rien, si vous heberez le serveur : l'operateur, c'est vous. Les metadonnees fuient en federation, sauf a la fermer.",
    selfHost: { label: "Oui, total", tone: "good" },
    cost: "Gratuit hors serveur",
    comfort: "Faible",
    verdict:
      "Le seul reellement souverain. La bonne reponse pour donnees sensibles, au prix d'un serveur a exploiter.",
    tone: "good",
  },
  {
    name: "Signal",
    domain: "signal.org",
    how: "signal-cli, non officiel",
    difficulty: "Exigeant",
    e2ee: { label: "Oui", tone: "good" },
    operatorSees:
      "Quasi rien : Signal est la reference en metadonnees minimales. Mais un numero de telephone dedie est necessaire.",
    selfHost: { label: "Partiel", tone: "warn" },
    cost: "Gratuit",
    comfort: "Moyen",
    verdict:
      "Excellent en usage personnel. Deconseille pour un produit vendu : les CGU interdisent comptes automatises et revente du service, et signal-cli n'est pas officiel.",
    tone: "bad",
  },
  {
    name: "Slack",
    domain: "slack.com",
    how: "API officielle",
    difficulty: "Simple",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees:
      "Tout le contenu. Les administrateurs du workspace peuvent acceder aux messages prives, y compris ceux du bot.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Gratuit a payant",
    comfort: "Moyen",
    verdict: "Pertinent seulement si le client vit deja dedans.",
    tone: "neutral",
  },
  {
    name: "Google Chat",
    domain: "google.com",
    how: "API officielle",
    difficulty: "Moyen",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees: "Tout le contenu. Chiffrement en transit et au repos uniquement.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Inclus Workspace",
    comfort: "Moyen",
    verdict: "Meme logique que Slack : utile si le client est deja sur Workspace.",
    tone: "neutral",
  },
  {
    name: "SMS",
    domain: "twilio.com",
    how: "Twilio, Brevo",
    difficulty: "Simple",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees:
      "Tout le contenu, cote operateurs telecom et prestataire d'envoi. Interceptable.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Payant au message",
    comfort: "Excellent",
    verdict:
      "Imbattable en accessibilite : aucun compte, aucune application. A reserver au non sensible et au court.",
    tone: "neutral",
  },
  {
    name: "Email",
    domain: "gmail.com",
    how: "SMTP / IMAP",
    difficulty: "Simple",
    e2ee: { label: "Non en pratique", tone: "bad" },
    operatorSees:
      "Tout le contenu chez l'hebergeur mail. Le chiffrement PGP existe mais reste inutilisable par un client non technique.",
    selfHost: { label: "Oui", tone: "good" },
    cost: "Quasi gratuit",
    comfort: "Excellent",
    verdict:
      "Sous-estime : universel, asynchrone, bien adapte a un agent qui met du temps a repondre.",
    tone: "neutral",
  },
];

export const GATEWAY_SOURCES = [
  { label: "Hermes Agent - passerelle", url: "https://hermes-agent.nousresearch.com/docs/user-guide/messaging/" },
  { label: "CGU Signal", url: "https://signal.org/legal/" },
  { label: "Tarifs WhatsApp Business (Meta)", url: "https://developers.facebook.com/docs/whatsapp/pricing/" },
  { label: "Telegram - chiffrement", url: "https://core.telegram.org/api/end-to-end" },
];
