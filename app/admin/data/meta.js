// Date de vérification des données de la page écosystème.
//
// À mettre à jour À LA MAIN à chaque revue des tableaux. Jamais de date
// automatique : une date générée au build afficherait « vérifié
// aujourd'hui » sur des chiffres vieux de six mois, ce qui est pire que
// pas de date du tout.
export const VERIFIED_ON = "2026-08-19";

export const VERIFIED_LABEL = "19 août 2026";

// Au-delà de ce délai, le bandeau passe en « à revérifier ».
export const STALE_AFTER_DAYS = 120;
