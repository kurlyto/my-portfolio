"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const TESTIMONIALS = [
  { role: "Notaire", useCase: "Vérification de dossiers" },
  { role: "Garagiste", useCase: "Prise de rendez-vous" },
  { role: "Avocat", useCase: "Recherche documentaire (RAG)" },
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
    <section
      className="max-w-3xl mx-auto px-6 py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="border border-black/10 p-10 min-h-[180px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              [Témoignage à venir — {current.role}]
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full border border-black/20 flex items-center justify-center text-xs font-mono opacity-70">
                {current.role.charAt(0)}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest opacity-50">
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
              i === index ? "bg-black" : "bg-black/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
