"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
  { role: "Notaire", useCase: "Vérification de dossiers" },
  { role: "Garagiste", useCase: "Prise de rendez-vous" },
  { role: "Avocat", useCase: "Recherche documentaire (RAG)" },
  { role: "Comptable", useCase: "Relance des factures impayées" },
  { role: "Agence immobilière", useCase: "Standard téléphonique 24/7" },
  { role: "Consultant indépendant", useCase: "Prospection commerciale" },
  { role: "Commerçant", useCase: "Gestion des réseaux sociaux" },
];

const AUTOPLAY_MS = 4500;

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="bg-black text-white p-8 md:p-12 min-h-[260px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="text-4xl text-[#ff6b35] leading-none">&ldquo;</span>
            <p className="mt-2 text-xl md:text-2xl leading-snug font-medium">
              Témoignage à venir — {current.role}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#ff6b35] flex items-center justify-center text-xs font-mono font-bold text-white">
                {current.role.charAt(0)}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest opacity-60">
                {current.role} — {current.useCase}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.role}
            type="button"
            aria-label={`Voir le témoignage ${t.role}`}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index ? "bg-[#ff6b35]" : "bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
