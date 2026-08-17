"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import MetierFlyer from "./MetierFlyer";
import FlyerShareButton from "./FlyerShareButton";
import { METIERS } from "../metiers/metiers-data";

function FlyerModal({ metier, onClose, onTalkToNate }) {
  // Echap ferme la modale, comme le clic sur le fond.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Le fond ne doit pas defiler sous la modale : le flyer a son propre scroll.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Flyer ${metier.title}`}
    >
      <div className="flex min-h-full items-center justify-center px-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-1.5 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le flyer"
              data-cursor-hover
              className="text-2xl leading-none text-white/70 transition-colors hover:text-white"
            >
              &times;
            </button>
          </div>

          <MetierFlyer metier={metier} />

          <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
            <FlyerShareButton metier={metier} />
            {/* Ouvre le chat Nate avec un message pre-redige au nom du metier :
                le visiteur n'a rien a ecrire, la conversation demarre qualifiee. */}
            <button
              type="button"
              data-cursor-hover
              onClick={() => {
                onClose();
                onTalkToNate?.(metier.nateMessage);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-2.5 text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-colors duration-150 ease-out hover:border-white hover:bg-white hover:text-black"
            >
              En parler à Nate
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Section "Metiers" de la home : un badge par metier, le clic ouvre le flyer
// en modale. Chaque flyer a aussi sa page partageable (/metiers/[slug]) via le
// bouton de partage. `onTalkToNate(message)` remonte au parent (la home), qui
// ouvre le chat Nate avec le message pre-redige.
export default function MetierBadges({ onTalkToNate }) {
  const [active, setActive] = useState(null);

  return (
    <section id="metiers" className="bg-white text-black border-t border-black/10">
      {/* min-h-[100svh] : la section occupe un ecran entier, desktop comme
          mobile (svh = hauteur reellement visible, barre d'adresse deduite).
          justify-center la centre verticalement ; si le contenu depasse sur un
          tres petit ecran, min-h laisse la section grandir. */}
      <Reveal className="min-h-[100svh] max-w-5xl mx-auto px-6 py-12 flex flex-col justify-center text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Métiers
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold tracking-tight text-balance">
          Et pour votre métier, ça donne quoi ?
        </h2>
        <p className="mt-4 text-[15px] md:text-base opacity-70 max-w-2xl mx-auto leading-relaxed">
          Choisissez votre métier : 5 demandes concrètes, à confier à votre agent
          dès demain.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2.5 md:gap-3">
          {METIERS.map((metier) => (
            <button
              key={metier.slug}
              type="button"
              onClick={() => setActive(metier)}
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 font-mono text-[12px] md:text-[13px] transition-colors duration-150 ease-out hover:border-[#ff6b35] hover:text-[#ff6b35]"
            >
              <span aria-hidden="true">{metier.emoji}</span>
              {metier.badge}
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {active && (
          <FlyerModal
            metier={active}
            onClose={() => setActive(null)}
            onTalkToNate={onTalkToNate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
