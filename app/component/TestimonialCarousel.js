"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  {
    quote:
      "On cherchait des endroits où jouer dans notre ville, sans y passer nos soirées. Maintenant le démarchage tourne tout seul et on se concentre sur la musique.",
    role: "Groupe de musique",
    useCase: "Recherche de dates",
    name: null,
    initials: null,
    location: null,
  },
];

const AUTOPLAY_MS = 6000;

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Identity({ item }) {
  const badge = item.initials ?? item.role.charAt(0);
  const line = item.name ?? item.role;
  const sub = [item.location, item.useCase].filter(Boolean).join(" - ");

  return (
    <div className="mt-auto pt-5 flex items-center gap-2.5 border-t border-black/10">
      <div className="mt-4 w-8 h-8 shrink-0 rounded-full bg-[#ff6b35] flex items-center justify-center text-[11px] font-mono font-bold text-white">
        {badge}
      </div>
      <div className="mt-4 min-w-0">
        <p className="text-[13px] font-semibold leading-tight">{line}</p>
        <p className="text-[10px] font-mono uppercase tracking-wider opacity-40 leading-tight mt-0.5">
          {sub}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeRef = useRef(null);

  function go(step) {
    setIndex((i) => (i + step + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  // Balayage horizontal pour passer d'un temoignage a l'autre. Le seuil de 45px
  // evite qu'un simple appui, ou un scroll vertical un peu oblique, fasse
  // changer de carte.
  function onPointerDown(e) {
    swipeRef.current = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp(e) {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  }

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
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        swipeRef.current = null;
      }}
      className="touch-pan-y select-none"
    >
      {/* Contour orange (accent de la marque) plutot qu'un liseré noir a 7%
          quasi invisible : le bloc temoignage doit ressortir du fond blanc,
          c'est la preuve sociale a cote du hero. */}
      <div className="relative bg-[#faf8f5] text-black rounded-3xl border-2 border-[#ff6b35]/35 shadow-[0_20px_50px_-20px_rgba(255,107,53,0.25)] p-8 md:p-10 min-h-[340px] flex flex-col overflow-hidden">
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

      <div className="mt-5 flex items-center justify-center gap-3">
        {/* Fleches reservees au pointeur : au doigt, le balayage suffit. */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Temoignage precedent"
          data-cursor-hover
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
        >
          <ArrowIcon className="w-4 h-4 rotate-180" />
        </button>

        <div className="flex items-center gap-1.5">
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

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Temoignage suivant"
          data-cursor-hover
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded-full text-black/40 hover:text-black hover:bg-black/[0.06] transition-colors"
        >
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
