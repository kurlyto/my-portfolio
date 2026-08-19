// Outils de RAG : faire répondre un modèle sur les documents d'un client
// sans que ces documents sortent de chez lui.
//
// Comparatif factuel uniquement. Le principe du RAG n'est pas expliqué ici :
// cette page sert à choisir un outil, pas à apprendre le concept.

export const RAG_TOOL_COLUMNS = [
  { key: "name", label: "Outil" },
  { key: "license", label: "Licence" },
  { key: "install", label: "Installation" },
  { key: "multiUser", label: "Multi-utilisateurs" },
  { key: "rights", label: "Droits par document" },
  { key: "formats", label: "Formats lus" },
  { key: "ocr", label: "OCR des PDF scannés" },
  { key: "sources", label: "Citation des sources" },
  { key: "offline", label: "100 % hors ligne" },
  { key: "limits", label: "Limites" },
];

export const RAG_TOOLS = [];

export const RAG_SOURCES = [];
