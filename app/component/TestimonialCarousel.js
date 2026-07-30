"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Cas clients reels. `name`, `initials` et `location` restent a remplir avec
// les vraies identites : tant qu'ils sont vides, la carte affiche le metier et
// le secteur plutot qu'un faux nom.
const TESTIMONIALS = [
  {
    quote:
      "Chaque matin, mes mails de prospection partent tout seuls vers les organisateurs d'événements. Je ne cherche plus mes dates, elles arrivent.",
    role: "Foodtruck",
    useCase: "Prospection événementielle",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Ma recherche d'emploi tourne en continu : l'agent cible les offres qui collent vraiment à mon CV et prépare mes candidatures avec moi.",
    role: "En recherche d'emploi",
    useCase: "Candidatures ciblées",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Toute ma comptabilité passe par lui. Il est branché à mes outils, il surveille, il alerte. Ça me coûte une fraction d'un cabinet.",
    role: "Entrepreneur",
    useCase: "Comptabilité surveillée",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Je lui envoie un vocal et il gère : mails, agenda, tableur de suivi, documents. Il me tient informé sur mes prospects sans que je demande.",
    role: "Indépendant",
    useCase: "Assistant par messages vocaux",
    name: null,
    initials: null,
    location: null,
  },
  {
    quote:
      "Il est branché à toutes mes archives sur X, il connaît mes sujets et ma façon d'écrire. Je ne m'occupe plus de ma présence en ligne.",
    role: "Créateur",
    useCase: "Stratégie de contenu",
    name: null,
    initials: null,
    location: null,
  },
];

const AUTOPLAY_MS = 6000;

function Identity({ item }) {
  const badge = item.initials ?? item.role.charAt(0);
  const line = item.name ?? item.role;
  const sub = [item.location, item.useCase].filter(Boolean).join(" - ");

  return (
    <div className="mt-auto pt-7 flex items-center gap-3 border-t border-black/10">
      <div className="mt-6 w-11 h-11 shrink-0 rounded-full bg-[#ff6b35] flex items-center justify-center text-sm font-mono font-bold text-white">
        {badge}
      </div>
      <div className="mt-6 min-w-0">
        <p className="text-sm font-semibold leading-tight">{line}</p>
        <p className="text-[11px] font-mono uppercase tracking-widest opacity-45 leading-tight mt-1">
          {sub}
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
      <div className="relative bg-[#faf8f5] text-black rounded-3xl border border-black/[0.07] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] p-8 md:p-10 min-h-[340px] flex flex-col overflow-hidden">
        {/* Guillemet en filigrane : donne du caractere a la carte sans
            concurrencer le texte. */}
        <span
          aria-hidden
          className="absolute -top-10 right-4 text-[170px] leading-none font-display text-[#ff6b35]/[0.10] select-none"
        >
          &rdquo;
        </span>

        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col flex-1"
          >
            <p className="font-display text-xl md:text-[1.6rem] leading-snug font-semibold text-balance">
              {current.quote}
            </p>
            <Identity item={current} />
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex justify-center gap-1.5">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.role + i}
            type="button"
            aria-label={`Voir le temoignage ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-[#ff6b35]" : "w-3 bg-black/15 hover:bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
