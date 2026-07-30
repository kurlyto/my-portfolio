"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Cas clients reels. `name`, `initials` et `location` restent a remplir avec
// les vraies identites : tant qu'ils sont vides, la carte affiche le metier et
// le secteur plutot qu'un faux nom.
const TESTIMONIALS = [
  {
    quote:
      "Chaque matin, mes mails de prospection partent tout seuls vers les organisateurs d'evenements. Je ne cherche plus mes dates, elles arrivent.",
    role: "Foodtruck",
    useCase: "Prospection evenementielle",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Ma recherche d'emploi tourne en continu : l'agent cible les offres qui collent vraiment a mon CV et prepare mes candidatures avec moi.",
    role: "En recherche d'emploi",
    useCase: "Candidatures ciblees",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Toute ma comptabilite passe par lui. Il est branche a mes outils, il surveille, il alerte. Ca me coute une fraction d'un cabinet.",
    role: "Entrepreneur",
    useCase: "Comptabilite surveillee",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Je lui envoie un vocal et il gere : mails, agenda, tableur de suivi, documents. Il me tient informe sur mes prospects sans que je demande.",
    role: "Independant",
    useCase: "Assistant par messages vocaux",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Il est branche a toutes mes archives sur X, il connait mes sujets et ma facon d'ecrire. Je ne m'occupe plus de ma presence en ligne.",
    role: "Createur",
    useCase: "Strategie de contenu",
    name: null,
    initials: null,
    location: null,
  },
];

const AUTOPLAY_MS = 6000;

function Identity({ item }) {
  const badge = item.initials ?? item.role.charAt(0);
  const line = [item.name, item.location].filter(Boolean).join(" - ");

  return (
    <div className="mt-8 flex items-center gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-[#ff6b35] flex items-center justify-center text-xs font-mono font-bold text-white">
        {badge}
      </div>
      <div className="min-w-0">
        {line && <p className="text-sm font-semibold leading-tight">{line}</p>}
        <p className="text-xs font-mono uppercase tracking-widest opacity-60 leading-tight mt-0.5">
          {item.role} - {item.useCase}
        </p>
      </div>
    </div>
  );
}

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
      <div className="bg-black text-white p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <span className="text-4xl text-[#ff6b35] leading-none">&ldquo;</span>
            <p className="mt-2 text-lg md:text-xl leading-snug font-medium text-balance">
              {current.quote}
            </p>
            <Identity item={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.role + i}
            type="button"
            aria-label={`Voir le temoignage ${i + 1}`}
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
