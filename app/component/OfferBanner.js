"use client";

import { useState } from "react";

// Bandeau d'offre en haut de page, commun aux deux sites (/agents : l'essai
// gratuit ; Foxy : l'acces anticipe). La couleur suit le theme du site via
// `bg-accent`, rien a passer en parametre.
//
// Refermable : une banniere qu'on ne peut pas fermer irrite le visiteur qui
// revient. Le choix n'est pas persiste volontairement (pas de localStorage) :
// l'offre reste visible d'une visite a l'autre, elle disparait seulement pour
// la session en cours.
//
// `titre` s'affiche partout ; `detail` seulement a partir du palier sm, un
// telephone n'a la place que pour une ligne.
export default function OfferBanner({ titre, detail }) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className="relative bg-accent text-accent-ink">
      {/* py-1.5 et non py-2.5 : chaque pixel pris ici est pris au hero, qui doit
          tenir en entier dans le premier ecran. */}
      <div className="max-w-7xl mx-auto px-6 py-1.5 pr-12 text-center text-[13px] font-mono tracking-wide">
        <span className="font-bold uppercase">{titre}</span>
        {detail && <span className="hidden sm:inline opacity-85"> - {detail}</span>}
      </div>
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Fermer le bandeau"
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 text-white/70 hover:text-white transition-colors text-[16px] leading-none"
      >
        ×
      </button>
    </div>
  );
}
