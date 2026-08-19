// Outils de RAG : faire répondre un modèle sur les documents d'un client.
// Vérifié le 19/08/2026.
//
// Comparatif factuel. Le principe du RAG n'est pas expliqué ici : la page
// sert à choisir un outil.

export const RAG_TOOL_COLUMNS = [
  { key: "name", label: "Outil", width: "11%" },
  { key: "license", label: "Licence", width: "11%" },
  { key: "install", label: "Installation", width: "14%" },
  { key: "multiUser", label: "Multi-utilisateurs", width: "16%" },
  { key: "formats", label: "Formats lus", width: "13%" },
  { key: "ocr", label: "OCR scannés", width: "9%" },
  { key: "sources", label: "Citation des sources", width: "14%" },
  { key: "offline", label: "Hors ligne", width: "8%" },
  { key: "ceiling", label: "Plafond mesuré", width: "14%" },
];

export const RAG_TOOLS = [
  {
    name: "AnythingLLM",
    domain: "anythingllm.com",
    license: { label: "MIT", tone: "good" },
    install: "Application de bureau ou Docker. La plus simple en tout-en-un",
    multiUser: "Espaces de travail et équipes, moins fin qu'Open WebUI",
    formats: "PDF, DOCX, TXT, MD, CSV, web",
    ocr: { label: "Natif (v1.7.4)", tone: "good" },
    sources: "Le meilleur du panel : fichier + page, cliquable, passage en clair",
    offline: { label: "Oui", tone: "good" },
    ceiling: "~10 000 pages",
  },
  {
    name: "Onyx (ex-Danswer)",
    domain: "onyx.app",
    license: { label: "MIT", tone: "good" },
    install: "Docker Compose. La plus lourde des quatre",
    multiUser: "Le plus abouti : RAG permission-aware, recopie les droits des sources",
    formats: "40+ connecteurs (Slack, Confluence, partages de fichiers)",
    ocr: { label: "Non vérifié", tone: "neutral" },
    sources: "Oui",
    offline: { label: "Oui", tone: "good" },
    ceiling: "Recherche hybride et reranking : la seule voie au-delà de 12 000 pages",
  },
  {
    name: "PrivateGPT",
    domain: "privategpt.dev",
    license: { label: "Apache 2.0", tone: "good" },
    install: "Python, orientée développeur",
    multiUser: "Faible : pensé mono-utilisateur",
    formats: "PDF, DOCX, TXT, MD",
    ocr: { label: "Non vérifié", tone: "neutral" },
    sources: "Fichier + identifiant de passage, en JSON avec score",
    offline: { label: "Oui", tone: "good" },
    ceiling: "~12 000 pages, jusqu'à ~25 000 avec réglages sur 32 Go de RAM",
  },
  {
    name: "Open WebUI",
    domain: "openwebui.com",
    license: { label: "Propriétaire", tone: "bad" },
    install: "Docker principalement",
    multiUser: "Le meilleur du panel : comptes, OAuth, droits par rôle",
    formats: "PDF, DOCX, TXT, MD, web",
    ocr: { label: "Via module", tone: "warn" },
    sources: "Le plus faible : nom de fichier seul, sans page ni extrait",
    offline: { label: "Oui", tone: "good" },
    ceiling: "~8 000 pages. 22 % d'hallucination dès 10 000",
  },
];

// Le point qui décide de la faisabilité d'un projet, mesuré sur un corpus
// réel de 5 047 pages (RTX 4070, 32 Go RAM).
export const RAG_SCALE = {
  title: "Les outils clés en main plafonnent bien avant 20 000 documents",
  body: "Mesure réelle sur 5 047 pages : AnythingLLM indexe en 14 min 42 s, base de 184 Mo, réponse en 310 ms. Extrapolé à 100 000 pages, soit 20 000 actes de 5 pages : environ 5 h d'indexation sur RTX 4070, 4 à 12 Go de base, 1 à 3 s par réponse. Mais les quatre outils plafonnent entre 8 000 et 12 000 pages. Au-delà, le problème n'est ni l'indexation ni le disque : c'est la qualité de la recherche, qui ramène des passages hors sujet et fait inventer davantage. 100 000 pages, c'est 4 à 12 fois au-delà du plafond mesuré : c'est un projet d'intégration avec recherche hybride et reranking, pas une installation.",
  checks: [
    "Combien de pages par acte réellement ? Un acte de vente immobilière monte à 30-50 pages : facteur 6 à 10 sur le chiffrage.",
    "Les actes sont-ils scannés ou natifs ? 100 000 pages scannées ajoutent 10 à 30 h d'OCR.",
    "Commencer par un pilote sur 1 000 à 2 000 actes, mesurer la qualité sur de vraies questions, puis étendre.",
    "Annoncer d'emblée les taux d'hallucination : 6 % pour le meilleur outil, 20 à 30 % sur les questions à raisonnement multi-étapes.",
    "Sur un métier réglementé, la citation des sources vérifiable page par page est une fonction de sécurité, pas un confort.",
  ],
};

// Piège de licence qui vise directement un revendeur.
export const RAG_LICENSE_WARNING = {
  title: "Open WebUI ne peut pas être revendu en marque blanche",
  body: "Open WebUI est passé de BSD-3 à une licence maison en avril 2025. Elle interdit explicitement de retirer ou modifier son logo, le co-branding, et le white-label pour revente ou offre SaaS. Exception : les déploiements de 50 utilisateurs ou moins sur 30 jours peuvent retirer la marque, ce qui couvre un indépendant. Pour une offre revendue sous votre marque, AnythingLLM et Onyx Community, tous deux en MIT, sont les choix sûrs.",
};

export const RAG_SOURCES = [
  {
    label: "Banc d'essai 5 047 pages",
    url: "https://www.promptquorum.com/power-local-llm/anythingllm-vs-privategpt-vs-openwebui-rag",
  },
  { label: "Licence Open WebUI", url: "https://docs.openwebui.com/license/" },
  { label: "OCR AnythingLLM v1.7.4", url: "https://docs.anythingllm.com/changelog/v1.7.4" },
  { label: "Onyx (GitHub)", url: "https://github.com/onyx-dot-app/onyx" },
];
