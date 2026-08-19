// Matériel et modèles exécutables localement.
//
// À remplir depuis la recherche en cours. Ne rien inventer : un prix ou une
// vitesse faux, annoncés à un client, se paient au moment de la livraison.

export const LOCAL_MODEL_COLUMNS = [
  { key: "name", label: "Modèle" },
  { key: "editor", label: "Éditeur" },
  { key: "country", label: "Pays" },
  { key: "sizes", label: "Tailles" },
  { key: "ram", label: "RAM / VRAM requise" },
  { key: "license", label: "Licence" },
  { key: "commercial", label: "Usage commercial" },
  { key: "level", label: "Niveau" },
];

export const LOCAL_MODELS = [];

export const HARDWARE_COLUMNS = [
  { key: "name", label: "Configuration" },
  { key: "price", label: "Prix 2026" },
  { key: "maxModel", label: "Modèle maximum" },
  { key: "speed", label: "Vitesse" },
  { key: "users", label: "Utilisateurs simultanés" },
  { key: "target", label: "Pour qui" },
];

export const HARDWARE = [];

export const RUNTIME_COLUMNS = [
  { key: "name", label: "Logiciel" },
  { key: "usage", label: "Usage" },
  { key: "install", label: "Installation" },
  { key: "openaiApi", label: "API compatible OpenAI" },
  { key: "license", label: "Licence" },
  { key: "notes", label: "Points forts et limites" },
];

export const RUNTIMES = [];

export const HARDWARE_SOURCES = [];
