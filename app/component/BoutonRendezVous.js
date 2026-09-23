"use client";

import { usePathname } from "next/navigation";
import { nomClic } from "../lib/suivi-clics";
import { RDV_URL, RDV_LABEL, CalendrierIcon } from "../lib/rendez-vous";

// Pages ou le bouton flottant n'a rien a faire : l'espace d'admin et les
// pages perso (photos, voyages).
const SANS_BOUTON = [/^\/admin/, /^\/stats/, /^\/photography/, /^\/travel/];

// Bouton flottant en bas a droite, present sur toutes les pages publiques :
// un visiteur convaincu au milieu d'une page n'a pas a remonter chercher le
// contact. z-40 : les fenetres du site (formulaire, chat) passent au-dessus.
export default function BoutonRendezVous() {
  const chemin = usePathname() || "/";
  if (SANS_BOUTON.some((motif) => motif.test(chemin))) return null;
  // Le bouton vit hors du conteneur de la page : sur Foxy il doit porter
  // lui-meme `theme-aios`, sinon il garde l'orange du site agents.
  const theme = chemin.startsWith("/foxy") ? "theme-aios " : "";

  return (
    <a
      href={RDV_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      data-umami-event={nomClic("flottant", RDV_LABEL)}
      className={`${theme}fixed bottom-4 right-4 z-40 flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-lg transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl sm:bottom-6 sm:right-6`}
    >
      <CalendrierIcon className="h-4 w-4" />
      {RDV_LABEL}
    </a>
  );
}
