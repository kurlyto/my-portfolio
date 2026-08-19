// Date de verification des donnees de la page ecosysteme.
//
// A mettre a jour A LA MAIN a chaque revue des tableaux, jamais de date
// automatique : une date generee au build afficherait "verifie aujourd'hui"
// sur des chiffres vieux de six mois, ce qui est pire que pas de date du
// tout. C'est une page montree en rendez-vous client - un prix ou une
// certification perimee s'y voit tout de suite.
export const VERIFIED_ON = "2026-08-18";

export const VERIFIED_LABEL = "18 aout 2026";

// Au-dela de ce delai, la page affiche un avertissement de fraicheur.
// Les tarifs et les certifications des fournisseurs bougent vite.
export const STALE_AFTER_DAYS = 120;
