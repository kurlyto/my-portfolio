// Matériel et modèles exécutables localement. Vérifié le 19/08/2026.
// Mentions « non vérifié » volontaires : ne pas combler par approximation.
//
// Règle de dimensionnement : en Q4_K_M, compter environ 0,6 Go par milliard
// de paramètres, plus 2 à 8 Go de cache de contexte. Pour un modèle MoE,
// c'est le nombre de paramètres TOTAUX qui doit tenir en mémoire, pas les
// paramètres actifs : erreur de chiffrage classique.
//
// Repère de vitesse : un humain lit à environ 10 tokens/seconde. Donc
// 10 tok/s suit la lecture, 30 tok/s est confortable, 5 tok/s est pénible.

export const LOCAL_MODEL_COLUMNS = [
  { key: "name", label: "Modèle" },
  { key: "editor", label: "Éditeur" },
  { key: "country", label: "Pays" },
  { key: "sizes", label: "Tailles" },
  { key: "ram", label: "RAM / VRAM (Q4_K_M)" },
  { key: "license", label: "Licence" },
  { key: "commercial", label: "Usage commercial" },
  { key: "level", label: "Niveau" },
];

export const LOCAL_MODELS = [
  {
    name: "Mistral Small 3.2 / Devstral",
    editor: "Mistral AI",
    domain: "mistral.ai",
    country: "France",
    sizes: "24B dense",
    ram: "15-16 Go, tient sur RTX 4090 24 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Meilleur rapport qualité/poste de travail en français métier",
  },
  {
    name: "Magistral Small 1.2",
    editor: "Mistral AI",
    domain: "mistral.ai",
    country: "France",
    sizes: "24B dense, raisonnement",
    ram: "15-16 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Version raisonnement du 24B",
  },
  {
    name: "Ministral 3",
    editor: "Mistral AI",
    domain: "mistral.ai",
    country: "France",
    sizes: "3B, 8B, 14B, 256K contexte",
    ram: "3B : 2-3 Go · 8B : 6-7 Go · 14B : 10-12 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Extraction et résumé. Le 14B annoncé à 85 % AIME'25",
  },
  {
    name: "Mistral Small 4",
    editor: "Mistral AI",
    domain: "mistral.ai",
    country: "France",
    sizes: "119B total / 6B actifs (MoE)",
    ram: "70-75 Go : station GPU ou Mac 128 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Non vérifié",
  },
  {
    name: "Mistral Large 3",
    editor: "Mistral AI",
    domain: "mistral.ai",
    country: "France",
    sizes: "675B total / 41B actifs (MoE)",
    ram: "8×H100 : hors périmètre local",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "N°2 des modèles ouverts non raisonnants sur LMArena (12/2025)",
  },
  {
    name: "Gemma 4",
    editor: "Google",
    domain: "google.com",
    country: "États-Unis",
    sizes: "E2B, E4B, 26B-A4B (MoE), 31B dense",
    ram: "31B dense : 19-20 Go · 26B MoE : 16 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "31B classé n°3 mondial des modèles ouverts sur Arena (04/2026)",
  },
  {
    name: "Gemma 3",
    editor: "Google",
    domain: "google.com",
    country: "États-Unis",
    sizes: "1B, 4B, 12B, 27B",
    ram: "27B : 17 Go",
    license: { label: "Licence Google, non OSI", tone: "bad" },
    commercial: "Politique d'usage révocable : préférer Gemma 4",
    level: "Génération précédente",
  },
  {
    name: "Qwen 3 / 3.5",
    editor: "Alibaba",
    domain: "qwen.ai",
    country: "Chine",
    sizes: "0,6B à 32B dense · MoE 30B-A3B, 235B-A22B · 3.5 : 35B, 122B, 397B",
    ram: "Qwen3-32B : 20 Go · 30B-A3B : 18-19 Go",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Excellent. Les poids tournent en local, aucune donnée ne part",
  },
  {
    name: "gpt-oss",
    editor: "OpenAI",
    domain: "openai.com",
    country: "États-Unis",
    sizes: "20B et 120B",
    ram: "20B : 16 Go · 120B : 80 Go (quantification native MXFP4)",
    license: { label: "Apache 2.0", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Le 20B concurrence directement le Mistral 24B sur poste",
  },
  {
    name: "Phi-4-Reasoning",
    editor: "Microsoft",
    domain: "microsoft.com",
    country: "États-Unis",
    sizes: "14B, variante Vision 15B",
    ram: "9-10 Go",
    license: { label: "MIT", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Petit modèle spécialisé raisonnement et maths",
  },
  {
    name: "Llama 4 Scout / Maverick",
    editor: "Meta",
    domain: "llama.com",
    country: "États-Unis",
    sizes: "Scout 109B/17B actifs · Maverick 400B/17B actifs",
    ram: "Scout : 60-65 Go, hors poste de travail",
    license: { label: "Community License", tone: "warn" },
    commercial: "Oui sous 700 M utilisateurs. Mention « Built with Llama » obligatoire",
    level: "Non vérifié",
  },
  {
    name: "DeepSeek V3.2 / R1",
    editor: "DeepSeek",
    domain: "deepseek.com",
    country: "Chine",
    sizes: "671B total / 37B actifs",
    ram: "8×H100 : hors périmètre local. Seules les versions distillées 7B-70B sont réalistes",
    license: { label: "MIT", tone: "good" },
    commercial: "Oui, sans restriction",
    level: "Non vérifié",
  },
];

export const HARDWARE_COLUMNS = [
  { key: "name", label: "Configuration" },
  { key: "price", label: "Prix 2026" },
  { key: "maxModel", label: "Modèle maximum" },
  { key: "speed", label: "Vitesse mesurée" },
  { key: "users", label: "Utilisateurs" },
  { key: "target", label: "Pour qui" },
];

export const HARDWARE = [
  {
    name: "Mac Studio M4 Max 32 Go",
    price: "2 199 € (Apple France)",
    maxModel: "Jusqu'à 27B en Q4",
    speed: "M4 Pro 24 Go : Qwen3 8B 45 tok/s, Qwen3 14B 26 tok/s",
    users: "1 à 2",
    target: "Poste unique d'un notaire ou avocat seul. Silencieux, aucune carte à gérer",
  },
  {
    name: "Mac Apple Silicon 64 Go",
    price: "3 500-4 000 € (prix exact non vérifié)",
    maxModel: "Jusqu'à 70B en Q4",
    speed: "Mistral 7B 51 tok/s · Gemma 3 27B 27 tok/s · Llama 3.1 70B 12,5 tok/s",
    users: "2 à 3",
    target: "Cabinet de 2-3 personnes. Le meilleur compromis Mac",
  },
  {
    name: "Mac Apple Silicon 128 Go",
    price: "5 000-6 000 € (ordre de grandeur)",
    maxModel: "Modèles MoE de 100B+ en Q4",
    speed: "~7B : 75-90 tok/s",
    users: "3 à 5",
    target: "Cabinet voulant un serveur unique, sans salle machine",
  },
  {
    name: "PC RTX 4090 24 Go",
    price: "Carte 3 390 € (relevé UE 08/2026), machine complète +1 200 €",
    maxModel: "24-32B en Q4 : Mistral Small 24B, Gemma 4 31B, Qwen3-32B",
    speed: "Référence de base. Le 5090 fait 35 à 46 % de mieux",
    users: "3 à 8 avec vLLM",
    target: "Serveur de cabinet. Meilleur rapport modèle/prix pour du 24B français",
  },
  {
    name: "PC RTX 5090 32 Go",
    price: "4 299-4 746 € neuf, ~3 473 € occasion (relevés 08/2026)",
    maxModel: "32B confortablement, 70B en quantification agressive",
    speed: "178 tok/s sur Llama 3.1 8B Q4_K_M. Bande passante 1 792 Go/s",
    users: "5 à 12 avec vLLM",
    target: "Cabinet de 5 à 15 personnes",
  },
  {
    name: "PC portable standard sans GPU",
    price: "800-1 500 €",
    maxModel: "3 à 8B en Q4_K_M",
    speed: "Phi-4 Mini 12 tok/s · Gemma 4 E2B 15 tok/s · Qwen3 8B 4-5 tok/s",
    users: "1",
    target: "Démonstration et test. Ne rien vendre au-delà de 8B",
  },
  {
    name: "Serveur CPU seul (12 vCPU / 30 Go)",
    price: "50-150 €/mois en VPS",
    maxModel: "8 à 14B. La vitesse limite, pas la RAM",
    speed:
      "4 à 15 tok/s mesurés sur 7B. Pour un 24B : 1,5 à 4 tok/s attendus, non vérifié. CPU 10 à 30× plus lent que GPU",
    users: "1, et encore",
    target: "Traitements de nuit uniquement. À déconseiller pour du dialogue interactif",
  },
  {
    name: "Location GPU Scaleway (France)",
    price: "L4 24 Go : 0,79 €/h, soit ~575 €/mois",
    maxModel: "L4 : 14B confortable. L40S et H100 disponibles",
    speed: "Non vérifié chez l'hébergeur",
    users: "Variable",
    target: "Datacenter français, mais ce n'est plus du local : vendre comme cloud souverain",
  },
  {
    name: "Location GPU OVHcloud (France)",
    price: "L4 0,68 €/h (~500 €/mois) · L40S ~1,40 €/h · H100 2,80 €/h HT",
    maxModel: "Selon GPU",
    speed: "Non vérifié chez l'hébergeur",
    users: "Variable",
    target: "Idem Scaleway. Prix fluctuants selon disponibilité",
  },
  {
    name: "Station GPU H100 80 Go",
    price: "25 000-30 000 € (prix France non vérifié)",
    maxModel: "gpt-oss-120b, Llama 4 Scout",
    speed: "Non vérifié",
    users: "20+",
    target: "Hors budget d'un indépendant. Réservé à un groupement",
  },
];

export const RUNTIME_COLUMNS = [
  { key: "name", label: "Logiciel" },
  { key: "usage", label: "Usage" },
  { key: "install", label: "Installation" },
  { key: "openaiApi", label: "API OpenAI" },
  { key: "license", label: "Licence" },
  { key: "notes", label: "Points forts et limites" },
];

export const RUNTIMES = [
  {
    name: "Ollama",
    usage: "Poste, ou petit serveur mono-utilisateur",
    install: "Installeur en un clic, image Docker officielle",
    openaiApi: { label: "Oui, port 11434", tone: "good" },
    license: { label: "MIT", tone: "good" },
    notes:
      "Le plus simple à déployer. Mauvais choix en multi-utilisateurs : sa couche de compatibilité omet logprobs, tool_choice et logit_bias",
  },
  {
    name: "LM Studio",
    usage: "Poste uniquement",
    install: "Application graphique, aucune ligne de commande",
    openaiApi: { label: "Oui", tone: "good" },
    license: { label: "Propriétaire, gratuit au travail", tone: "warn" },
    notes:
      "Le meilleur outil pour un client non technique : il teste les modèles lui-même. Pas open source, à écarter si le client exige de l'auditable",
  },
  {
    name: "vLLM",
    usage: "Serveur de production, multi-utilisateurs",
    install: "Python ou Docker, GPU NVIDIA requis",
    openaiApi: { label: "Oui", tone: "good" },
    license: { label: "Apache 2.0", tone: "good" },
    notes:
      "PagedAttention : débit ×2 à ×4 en requêtes concurrentes. Le seul à tenir 10+ utilisateurs simultanés. Inutilisable sur portable",
  },
  {
    name: "llama.cpp",
    usage: "Les deux. C'est le moteur sous Ollama et LM Studio",
    install: "Compilation ou binaires, llama-server pour l'API",
    openaiApi: { label: "Oui, via llama-server", tone: "good" },
    license: { label: "MIT", tone: "good" },
    notes:
      "Le socle de tout l'écosystème, format GGUF, tourne sur CPU seul. Demande une vraie compétence technique, aucune interface",
  },
  {
    name: "Jan",
    usage: "Poste",
    install: "Application de bureau",
    openaiApi: { label: "Oui", tone: "good" },
    license: { label: "Apache 2.0", tone: "good" },
    notes:
      "L'alternative réellement open source à LM Studio. Écosystème plus jeune qu'Ollama",
  },
];

// La règle à ne pas se tromper : les runtimes « poste » optimisent un
// utilisateur sur une machine, les runtimes « serveur » optimisent beaucoup
// d'utilisateurs sur du matériel partagé. vLLM est mauvais sur un portable,
// Ollama est mauvais en production multi-utilisateurs.

export const HARDWARE_SOURCES = [
  { label: "Mistral 3 (02/12/2025)", url: "https://mistral.ai/news/mistral-3/" },
  { label: "gpt-oss (Hugging Face)", url: "https://huggingface.co/openai/gpt-oss-20b" },
  { label: "Qwen3", url: "https://qwenlm.github.io/blog/qwen3/" },
  { label: "Benchmarks Apple Silicon", url: "https://llmcheck.net/benchmarks" },
  { label: "Benchmarks CPU seul", url: "https://www.promptquorum.com/local-llms/best-cpu-only-llm" },
  { label: "Tarifs GPU Scaleway", url: "https://www.scaleway.com/en/pricing/gpu/" },
  { label: "Tarifs GPU OVHcloud", url: "https://www.ovhcloud.com/fr/public-cloud/gpu/" },
  {
    label: "Comparatif runtimes",
    url: "https://www.glukhov.org/llm-hosting/comparisons/hosting-llms-ollama-localai-jan-lmstudio-vllm-comparison/",
  },
];
