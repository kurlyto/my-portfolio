// Prise de rendez-vous en ligne (Cal.com, choisi le 23/09/2026 plutot que
// Calendly : le gratuit y suffit). Le lien vise le rendez-vous public "Premier
// echange" ; le cadrage et le point de suivi sont masques, Nathan envoie leur
// lien lui-meme.
//
// Module sans "use client" : le pied de page (composant serveur) et le bouton
// flottant (composant client) le lisent tous les deux.
export const RDV_URL = "https://cal.com/nathan-knaebel/15min";
export const RDV_LABEL = "Réserver un appel";

export function CalendrierIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
