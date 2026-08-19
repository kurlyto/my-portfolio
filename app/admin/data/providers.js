// Fournisseurs de modèles IA sous l'angle souveraineté des données.
// Vérifié le 19/08/2026 sur pages officielles, sauf mentions « non vérifié »
// qui sont volontaires : ne jamais les combler par approximation.
//
// Deux maillons distincts, que tout le monde confond :
//   - l'hébergement de l'agent (Dedibox HDS, France)
//   - le fournisseur du modèle appelé, qui reçoit le texte
// Un appel API vers un fournisseur hors périmètre HDS depuis un serveur HDS
// fait sortir la donnée du périmètre. C'est l'erreur classique.
//
// Prix en USD par million de tokens, tarif standard hors cache et hors batch.

// Les largeurs sont obligatoires : le tableau est en table-layout fixe.
// Elles totalisent 100 %. Les colonnes à badge sont volontairement étroites,
// les colonnes de phrase prennent le reste.
export const PROVIDER_COLUMNS = [
  { key: "name", label: "Fournisseur", width: "11%" },
  { key: "models", label: "Modèles", width: "15%" },
  { key: "location", label: "Serveurs", width: "13%" },
  { key: "jurisdiction", label: "Droit", width: "9%" },
  { key: "training", label: "Entraînement", width: "11%" },
  { key: "retention", label: "Rétention", width: "8%" },
  { key: "health", label: "Santé FR", width: "9%" },
  { key: "openWeights", label: "Poids ouverts", width: "11%" },
  { key: "price", label: "Prix / M tokens", width: "13%" },
];

export const PROVIDERS = [
  {
    name: "Mistral AI",
    domain: "mistral.ai",
    models: "Mistral Large 3, Medium 3.5, Small 4, Ministral 3",
    location: "France / UE, siège Paris",
    jurisdiction: { label: "France", tone: "good" },
    training: "Non sur offre payante, à confirmer contractuellement",
    retention: "Non vérifié",
    health: { label: "Si auto-hébergé", tone: "warn" },
    openWeights: "Large 3, Small 4, Ministral 3 : Apache 2.0. Medium 3.5 : Modified MIT",
    price: "Large 3 : 0,50 / 1,50 · Small 4 : 0,15 / 0,60 · Ministral 3 8B : 0,15 / 0,15",
  },
  {
    name: "Scaleway",
    domain: "scaleway.com",
    models: "Generative APIs : modèles ouverts (Mistral, Llama, Qwen)",
    location: "France (Paris)",
    jurisdiction: { label: "France", tone: "good" },
    training: "Annoncé sans collecte, page data-privacy inaccessible",
    retention: "Non vérifié",
    health: { label: "Hors HDS", tone: "bad" },
    openWeights: "Modèles ouverts",
    price: "Non vérifié",
  },
  {
    name: "OVHcloud",
    domain: "ovhcloud.com",
    models: "AI Endpoints : ~40 modèles ouverts (Llama, Qwen, DeepSeek)",
    location: "France / UE",
    jurisdiction: { label: "France", tone: "good" },
    training: "Non, engagement sur page officielle",
    retention: "Non documenté",
    health: { label: "Hors HDS", tone: "bad" },
    openWeights: "Modèles ouverts",
    price: "Non affiché au détail. Offre batch ~moitié prix",
  },
  {
    name: "NumSpot / Docaposte",
    domain: "numspot.com",
    models: "LightOn (Paradigm), RAG et LLM managés",
    location: "France, infra Outscale",
    jurisdiction: { label: "France", tone: "good" },
    training: "Non vérifié",
    retention: "Non vérifié",
    health: { label: "PaaS oui, IA n.v.", tone: "warn" },
    openWeights: "Selon modèle déployé",
    price: "Sur devis",
  },
  {
    name: "Anthropic",
    domain: "anthropic.com",
    models: "Claude Opus 5, Sonnet 5, Haiku 4.5, Fable 5",
    location: "US. inference_geo : us ou global, pas d'option UE",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non par défaut sur l'API",
    retention: "30 j. ZDR possible, sauf Fable 5 qui impose 30 j",
    health: { label: "Non", tone: "bad" },
    openWeights: "Non",
    price: "Opus 5 : 5 / 25 · Sonnet 5 : 3 / 15 · Haiku 4.5 : 1 / 5 · Fable 5 : 10 / 50",
  },
  {
    name: "OpenAI",
    domain: "openai.com",
    models: "gpt-5.6-sol, gpt-5.6-terra, gpt-5.6-luna",
    location: "Résidence UE via European Projects, nouveaux projets seulement, sur approbation",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non par défaut sur l'API",
    retention: "30 j. ZDR sur demande",
    health: { label: "Non", tone: "bad" },
    openWeights: "Non",
    price:
      "sol : 5 / 30 · terra : 2 / 12 · luna : 0,20 / 1,20. Uplift +10 % sur endpoints régionaux",
  },
  {
    name: "Google",
    domain: "ai.google.dev",
    models: "Gemini 3.7 Flash, 3.5 Flash, 3.5 Flash-Lite",
    location: "Régions UE via Vertex AI. API Gemini directe non vérifiée",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non sur tiers payants. Oui sur le tier gratuit",
    retention: "Non vérifié",
    health: { label: "Non", tone: "bad" },
    openWeights: "Non (Gemma est distinct)",
    price: "3.7 Flash : 0,75 / 3,75 jusqu'au 31/12/2026, puis 1,50 / 7,50 · 3.5 Flash : 1,50 / 9,00",
  },
  {
    name: "Microsoft Azure",
    domain: "azure.microsoft.com",
    models: "Modèles OpenAI via Azure",
    location: "Azure France Central, certifié HDS",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non",
    retention: "Configurable, ZDR sur dossier",
    health: { label: "Infra oui, IA n.v.", tone: "warn" },
    openWeights: "Non",
    price: "Aligné OpenAI, non vérifié au détail",
  },
  {
    name: "Meta (Llama)",
    domain: "llama.com",
    models: "Llama 4 Scout, Llama 4 Maverick",
    location: "Vous hébergez",
    jurisdiction: { label: "Local", tone: "good" },
    training: "Sans objet",
    retention: "Aucune si auto-hébergé",
    health: { label: "Si auto-hébergé", tone: "good" },
    openWeights: "Llama 4 Community License, restrictions d'usage, pas Apache 2.0",
    price: "Coût GPU",
  },
  {
    name: "Alibaba (Qwen)",
    domain: "qwen.ai",
    models: "Qwen3.6-35B-A3B, Qwen3-32B, Qwen3.5-397B-A17B",
    location: "API : Chine. Auto-hébergé : où vous voulez",
    jurisdiction: { label: "Chine", tone: "bad" },
    training: "Via API : à considérer comme oui",
    retention: "Sans objet si auto-hébergé",
    health: { label: "Si auto-hébergé", tone: "warn" },
    openWeights: "Apache 2.0 sur la plupart des modèles",
    price: "Coût GPU en auto-hébergé",
  },
  {
    name: "DeepSeek",
    domain: "deepseek.com",
    models: "DeepSeek V4, V4 Flash",
    location: "Chine",
    jurisdiction: { label: "Chine", tone: "bad" },
    training: "À considérer comme oui",
    retention: "Non vérifié",
    health: { label: "Non", tone: "bad" },
    openWeights: "Oui, licence exacte non vérifiée",
    price: "V4 Flash ~0,14 / 0,28, source agrégateur non vérifiée",
  },
  {
    name: "xAI",
    domain: "x.ai",
    models: "Grok 4.1",
    location: "US",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non vérifié",
    retention: "Non vérifié",
    health: { label: "Non", tone: "bad" },
    openWeights: "Non",
    price: "~0,20 / 0,50, source agrégateur non vérifiée",
  },
  {
    name: "Cohere",
    domain: "cohere.com",
    models: "Command A",
    location: "US / Canada, déploiement privé possible",
    jurisdiction: { label: "US, Cloud Act", tone: "bad" },
    training: "Non sur offre entreprise, non vérifié",
    retention: "Non vérifié",
    health: { label: "Non", tone: "bad" },
    openWeights: "Poids de recherche CC-BY-NC, non vérifié",
    price: "~2,50 / 10, source agrégateur non vérifiée",
  },
];

// Le constat qui structure toute la page santé.
export const HDS_VERDICT = {
  title: "Aucune API d'inférence LLM prête à l'emploi n'est couverte par un périmètre HDS en France",
  body: "404 hébergeurs sont certifiés HDS (liste ANS au 13/05/2026), mais la certification porte sur l'infrastructure, pas sur un service d'inférence. Scaleway est certifié HDS sur Instances, Dedibox et Elastic Metal, mais Generative APIs ne figure pas dans le périmètre. OVHcloud AI Endpoints revendique ISO 27001, pas HDS. La seule architecture solide est un modèle à poids ouverts déployé sur des GPU d'un hébergeur certifié HDS, sous contrat HDS signé, l'inférence étant opérée par vous. C'est le schéma de PulseLife (Mistral sur Scaleway) et de Docaposte (LightOn sur NumSpot).",
  checks: [
    "Contrat HDS Dedibox : la certification ne se transmet pas en louant une machine. Il faut un plan de support Business ou Enterprise et un contrat HDS signé avec Scaleway.",
    "Certificat en HDS v2 : obligatoire depuis le 16/05/2026.",
    "Zéro appel sortant vers une API non HDS sur les flux contenant des données patient.",
    "Documentation de conformité remise au client : c'est lui le responsable de traitement.",
  ],
};

// Argument commercial factuel, plus fort qu'un raisonnement sur le Cloud Act.
export const SOVEREIGNTY_CONTEXT = {
  title: "L'État français applique déjà cette doctrine",
  body: "Le 6 février 2026, le gouvernement a annoncé quitter Microsoft pour l'hébergement du Health Data Hub, avec un appel d'offres exigeant la qualification SecNumCloud, qui impose la non-soumission aux législations extra-européennes. Le Data Privacy Framework a survécu au recours Latombe (Tribunal UE, 03/09/2025) mais l'appel est pendant devant la CJUE (C-703/25 P), la juridiction qui a annulé Safe Harbor puis Privacy Shield.",
};

export const PROVIDER_SOURCES = [
  { label: "Liste officielle HDS (ANS)", url: "https://www.hebergeurs-de-donnees-de-sante.fr/" },
  { label: "Scaleway HDS", url: "https://www.scaleway.com/fr/security-and-compliance/hds/" },
  { label: "OVHcloud AI Endpoints", url: "https://www.ovhcloud.com/fr/public-cloud/ai-endpoints/" },
  { label: "Roadmap OVH HDS (issue 995)", url: "https://github.com/ovh/public-cloud-roadmap/issues/995" },
  { label: "Azure HDS France", url: "https://learn.microsoft.com/fr-fr/compliance/regulatory/offering-hds-france" },
  { label: "NumSpot santé (LeMagIT)", url: "https://www.lemagit.fr/actualites/366638730/Cloud-souverain-Numspot-devient-une-veritable-alternative-pour-le-secteur-de-la-sante" },
  { label: "PulseLife, IA médicale souveraine", url: "https://pulselife.com/fr-fr/blog/post/ia-medicale-entierement-souveraine" },
  { label: "Latombe / DPF (Bird & Bird)", url: "https://www.twobirds.com/en/insights/2025/euus-data-privacy-framework-survives-legal-challenge-what-the-latombe-decision-means-for-internation" },
];
