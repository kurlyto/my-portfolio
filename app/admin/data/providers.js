// Fournisseurs de modeles IA, sous l'angle "ou vont les donnees du client".
//
// LA DISTINCTION QUI COMPTE, et que tout le monde confond :
//   - l'HEBERGEMENT de l'agent (mon serveur, France, certifie HDS)
//   - le FOURNISSEUR du modele appele, qui recoit le texte
// Le premier ne protege rien si le second est ailleurs. Une page qui ne
// separe pas les deux induit le client en erreur.
//
// "Serveurs en Europe" ne suffit pas pour un editeur americain : la maison
// mere reste soumise au droit americain. C'est la colonne "juridiction" qui
// tranche, pas la colonne "localisation".
//
// Donnees a remplir depuis la recherche en cours - ne rien inventer ici :
// un tarif ou une certification faux, montres a un client, coutent plus
// cher qu'une case vide.

export const PROVIDER_COLUMNS = [
  { key: "name", label: "Fournisseur" },
  { key: "models", label: "Modeles principaux" },
  { key: "location", label: "Ou tournent les serveurs" },
  { key: "jurisdiction", label: "Droit applicable" },
  { key: "training", label: "Entrainement sur vos donnees" },
  { key: "retention", label: "Retention des logs" },
  { key: "health", label: "Donnees de sante" },
  { key: "openWeights", label: "Executable en local" },
  { key: "price", label: "Prix indicatif" },
];

export const PROVIDERS = [];

export const PROVIDER_SOURCES = [];
