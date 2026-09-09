// Reglages de l'offre d'acces anticipe AIOS.
//
// TOUT ce qui bouge dans le temps est ici, pour qu'une signature ou un
// decalage de date se repercute sur le site en changeant UNE valeur, sans
// toucher au dessin de la section.
//
// PLACES_RESTANTES se met a jour A LA MAIN, a chaque entreprise qui signe.
// C'est volontaire : pas de compteur qui descend tout seul, pas de faux
// decompte. Le chiffre affiche doit rester vrai, sinon la rarete se retourne
// contre nous le jour ou un visiteur s'en apercoit.
//
// Le PRIX n'est volontairement pas affiche tant que l'offre n'est pas figee
// (decision du 08/09/2026) : il se dit a l'appel de 30 minutes. Le jour ou il
// est arrete, ajouter ici une cle `prix` et la brancher sous le bouton.
export const AIOS_OFFER = {
  placesTotal: 10,
  placesRestantes: 9,
  // Formulation courte, telle qu'elle s'affiche. La date de bascule sert au
  // cas ou on veuille masquer le bandeau apres coup.
  dateLimiteTexte: "31 octobre",
  dateLimiteISO: "2026-10-31",
  garantie: "Conditions de lancement gardées à vie",
};
