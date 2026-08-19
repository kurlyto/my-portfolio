"use client";

import Link from "next/link";
import { useRef } from "react";
import MetierFlyer from "./MetierFlyer";
import FlyerShareButton from "./FlyerShareButton";

// La carte + ses deux actions, sur la page partageable /metiers/[slug].
// Existe en composant client uniquement pour tenir la ref du flyer : le
// bouton de partage rasterise ce noeud pour en faire l'image envoyee. La page
// elle-meme reste un composant serveur.
export default function MetierFlyerShareable({ metier }) {
  const flyerRef = useRef(null);

  return (
    <>
      <div ref={flyerRef}>
        <MetierFlyer metier={metier} />
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
        <FlyerShareButton metier={metier} flyerRef={flyerRef} />
        {/* Le parametre metier fait ouvrir le chat avec le message
            pre-redige du metier (cf. HomePageContent) : le visiteur arrive
            sur la home et Nate sait deja de quel metier il s'agit. */}
        <Link
          href={`/?chat=1&metier=${metier.slug}`}
          data-cursor-hover
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#ff6b35] px-6 py-2.5 text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-wide text-[#ff6b35] transition-colors duration-150 ease-out hover:bg-[#ff6b35] hover:text-white"
        >
          En parler à Nate
        </Link>
      </div>
    </>
  );
}
