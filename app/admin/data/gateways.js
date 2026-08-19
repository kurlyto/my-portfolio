// Passerelles de messagerie utilisables comme interface d'un agent.
// Vérifié le 18/08/2026 sur sources primaires (docs Hermes Agent, CGU
// Signal, doc tarifaire Meta, doc Telegram).
//
// Point valable pour TOUTES les lignes : un bot est une extrémité de la
// conversation, donc le contenu est toujours en clair sur le serveur qui
// héberge l'agent. Le chiffrement de bout en bout protège contre
// l'opérateur de la messagerie, jamais contre l'hébergeur de l'agent.

export const GATEWAY_COLUMNS = [
  { key: "name", label: "Passerelle" },
  { key: "api", label: "API" },
  { key: "difficulty", label: "Difficulté" },
  { key: "e2ee", label: "Chiffrement E2E" },
  { key: "operatorSees", label: "Ce que voit l'opérateur" },
  { key: "selfHost", label: "Auto-hébergeable" },
  { key: "cost", label: "Coût" },
  { key: "proUse", label: "Usage commercial" },
  { key: "comfort", label: "Confort client" },
];

export const GATEWAYS = [
  {
    name: "Telegram",
    domain: "telegram.org",
    api: "Bot API officielle",
    difficulty: "Faible",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees: "Contenu intégral, numéro de téléphone, horaires, IP",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Gratuit",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Élevé",
  },
  {
    name: "WhatsApp",
    domain: "whatsapp.com",
    api: "Cloud API officielle (Meta)",
    difficulty: "Moyenne",
    e2ee: { label: "Non via API", tone: "bad" },
    operatorSees: "Contenu intégral, numéro, métadonnées",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Par message, variable selon pays",
    proUse: { label: "Autorisé, vérif. entreprise", tone: "warn" },
    comfort: "Élevé",
  },
  {
    name: "Matrix / Element",
    domain: "element.io",
    api: "Officielle (mautrix)",
    difficulty: "Élevée",
    e2ee: { label: "Oui, si imposé", tone: "good" },
    operatorSees: "Rien si serveur auto-hébergé. Métadonnées en fédération.",
    selfHost: { label: "Oui, total", tone: "good" },
    cost: "Gratuit hors serveur",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Faible",
  },
  {
    name: "Signal",
    domain: "signal.org",
    api: "signal-cli, non officielle",
    difficulty: "Élevée",
    e2ee: { label: "Oui", tone: "good" },
    operatorSees: "Métadonnées minimales. Numéro dédié obligatoire.",
    selfHost: { label: "Partiel (le pont)", tone: "warn" },
    cost: "Gratuit",
    proUse: { label: "CGU restrictives", tone: "bad" },
    comfort: "Moyen",
  },
  {
    name: "Slack",
    domain: "slack.com",
    api: "Officielle",
    difficulty: "Faible",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees: "Contenu intégral. Admins du workspace inclus.",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Gratuit à payant",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Moyen",
  },
  {
    name: "Google Chat",
    domain: "google.com",
    api: "Officielle",
    difficulty: "Moyenne",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees: "Contenu intégral",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Inclus Workspace",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Moyen",
  },
  {
    name: "SMS",
    domain: "twilio.com",
    api: "Twilio, Brevo",
    difficulty: "Faible",
    e2ee: { label: "Non", tone: "bad" },
    operatorSees: "Contenu intégral, opérateurs télécom inclus",
    selfHost: { label: "Non", tone: "bad" },
    cost: "Par message",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Élevé, sans application",
  },
  {
    name: "Email",
    domain: "gmail.com",
    api: "SMTP / IMAP",
    difficulty: "Faible",
    e2ee: { label: "Non en pratique", tone: "bad" },
    operatorSees: "Contenu intégral chez l'hébergeur mail",
    selfHost: { label: "Oui", tone: "good" },
    cost: "Quasi nul",
    proUse: { label: "Autorisé", tone: "good" },
    comfort: "Élevé",
  },
];

export const GATEWAY_SOURCES = [
  {
    label: "Hermes Agent - messagerie",
    url: "https://hermes-agent.nousresearch.com/docs/user-guide/messaging/",
  },
  { label: "CGU Signal", url: "https://signal.org/legal/" },
  {
    label: "Tarifs WhatsApp Business",
    url: "https://developers.facebook.com/docs/whatsapp/pricing/",
  },
  { label: "Telegram - chiffrement", url: "https://core.telegram.org/api/end-to-end" },
];
