"use client";

import { useState } from "react";

// Bouton de partage d'un flyer metier : partage natif quand le navigateur le
// propose (mobile), sinon copie du lien. Utilise dans la modale de la home et
// sur la page /metiers/[slug] : une seule logique de partage pour les deux.
export default function FlyerShareButton({ metier }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/metiers/${metier.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `Agent IA - ${metier.title}`, url });
        return;
      } catch {
        // Partage annule par l'utilisateur : on ne copie pas a sa place.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponible (http, permissions) : rien de mieux a faire.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      data-cursor-hover
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-colors duration-150 ease-out hover:bg-[#e2531f]"
    >
      {copied ? "Lien copié !" : "Partager ce flyer"}
    </button>
  );
}
