"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AGENTS } from "../agents/agents-data";
import { AGENT_PITCHES } from "./agent-pitches";

// Agents disposant d'un portrait dans public/images/agents/. Les autres
// tombent sur l'initiale : meme regle que la page /agents.
const AGENTS_WITH_PHOTO = new Set([
  "didier",
  "marcel",
  "simone",
  "hugo",
  "kylian",
  "camille",
  "mike",
  "lea",
  "soul",
  "nate",
  "jensen",
  "ousmane",
  "ride",
]);

function AgentCard({ agent }) {
  const hasPhoto = AGENTS_WITH_PHOTO.has(agent.slug);
  const pitch = AGENT_PITCHES[agent.slug];
  const label = pitch?.label ?? `Agent ${agent.title}`;
  const text = pitch?.pitch ?? agent.shortDescription;

  return (
    <Link
      href="/agents"
      data-cursor-hover
      // Mobile : carte verticale plus etroite que l'ecran (une carte tient
      // entierement, la suivante depasse juste assez pour signaler qu'on peut
      // faire glisser). Desktop : disposition horizontale, plus dense.
      className="group shrink-0 w-[280px] sm:w-[420px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 sm:p-8 flex flex-col transition-all duration-300 hover:border-[#ff6b35]/50 hover:from-white/[0.11] hover:-translate-y-1"
    >
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left sm:gap-5">
        <div className="shrink-0 w-24 h-24 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center ring-1 ring-white/10">
          {hasPhoto ? (
            <img
              src={`/images/agents/${agent.slug}.png`}
              alt={agent.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-2xl opacity-40">{agent.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0 mt-4 sm:mt-0">
          <p className="font-display text-[1.4rem] sm:text-[1.55rem] font-bold leading-tight tracking-tight text-[#ff6b35]">
            {label}
          </p>
          <p className="text-[11px] sm:text-[12px] font-mono uppercase tracking-widest opacity-50 mt-1">
            {agent.name}
          </p>
        </div>
      </div>

      <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-relaxed opacity-80 text-center sm:text-left">
        {text}
      </p>
    </Link>
  );
}

// Agents ecartes de la vitrine : trop abstrait pour un visiteur
// (marcel/surveillance), ou deja incarne ailleurs sur la page (nate est le
// cadreur de besoin, present dans le chat). Jo et Didier, eux, sont sortis du
// catalogue agents-data.js (17/08), plus besoin de les filtrer ici.
const HIDDEN_FROM_SHOWCASE = new Set(["marcel", "nate"]);

// Agents absents de agents-data.js (catalogue /agents) mais montres en
// vitrine : ils illustrent une demande frequente.
const EXTRA_AGENTS = [
  { slug: "alexis", name: "Alexis", title: "Comptabilité" },
];

// Vitesse de croisiere du defilement, en pixels par seconde.
const SPEED_PX_PER_SEC = 29;

// Amplitude verticale du glissement, en pixels de part et d'autre.
const MAX_LIFT = 22;

// Amortissement de l'elan apres le lacher : 0,94 par frame donne une glisse
// d'environ une seconde, proche du defilement natif d'un telephone.
const FRICTION = 0.94;

function clampLift(v) {
  return Math.max(-MAX_LIFT, Math.min(MAX_LIFT, v));
}

export default function AgentMarquee() {
  const shown = [
    ...AGENTS.filter((a) => !HIDDEN_FROM_SHOWCASE.has(a.slug)),
    ...EXTRA_AGENTS,
  ];
  const doubled = [...shown, ...shown];

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const dragRef = useRef(null);
  const movedRef = useRef(false);
  const liftRef = useRef(0);
  const velocityRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  // Defilement pilote en JS plutot qu'en CSS : c'est la seule facon de laisser
  // le visiteur prendre la main a la souris ou au doigt, puis de reprendre le
  // mouvement la ou il l'a laisse.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    let last = performance.now();

    // La piste contient deux copies de la liste : on boucle sur sa demi-largeur.
    function half() {
      return track.scrollWidth / 2;
    }

    function normalize() {
      const h = half();
      if (h <= 0) return;
      if (offsetRef.current <= -h) offsetRef.current += h;
      if (offsetRef.current > 0) offsetRef.current -= h;
    }

    function frame(now) {
      const dt = (now - last) / 1000;
      last = now;

      // La piste desktop est masquee sous 640px : inutile de la faire avancer.
      if (track.offsetParent === null) {
        raf = requestAnimationFrame(frame);
        return;
      }

      if (!dragRef.current && !reduce) {
        // L'elan du geste se prolonge puis s'eteint, et le defilement de fond
        // reprend la main : le lacher de doigt ne stoppe pas la bande net.
        if (Math.abs(velocityRef.current) > 1) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= FRICTION;
          if (Math.abs(velocityRef.current) < 6) velocityRef.current = 0;
        } else {
          offsetRef.current -= SPEED_PX_PER_SEC * dt;
        }
        normalize();
      }
      // Hors glissement, le decalage vertical revient a zero : la bande se
      // remet d'aplomb toute seule quand on lache.
      if (!dragRef.current && liftRef.current !== 0) {
        liftRef.current *= 0.88;
        if (Math.abs(liftRef.current) < 0.4) liftRef.current = 0;
      }
      track.style.transform = `translate3d(${offsetRef.current}px,${liftRef.current}px,0)`;
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onPointerDown(e) {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOffset: offsetRef.current,
      startLift: liftRef.current,
    };
    velocityRef.current = 0;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true;

    // Vitesse instantanee du geste, pour prolonger le mouvement au relachement.
    const now = performance.now();
    const dt = now - (drag.lastTime ?? now);
    if (dt > 0 && drag.lastX !== undefined) {
      velocityRef.current = ((e.clientX - drag.lastX) / dt) * 1000;
    }
    drag.lastX = e.clientX;
    drag.lastTime = now;

    offsetRef.current = drag.startOffset + dx;
    // Le vertical suit le doigt de facon amortie et bornee : c'est un effet de
    // matiere, pas un vrai defilement (il n'y a rien a voir au-dessus).
    liftRef.current = clampLift(drag.startLift + dy * 0.35);
  }

  // Un glissement ne doit pas ouvrir la carte : on annule le clic seulement
  // si le pointeur a reellement bouge, pour ne pas casser le clic simple.
  function onClickCapture(e) {
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  }

  function endDrag(e) {
    if (!dragRef.current) return;
    movedRef.current = Boolean(dragRef.current.moved);
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  return (
    <section className="bg-black text-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Problèmes
        </span>
        {/* max-w-2xl (672px) retire : ce titre est plus long que l'ancien
            ("Des milliers de cas d'usage") et se repliait des le desktop alors
            que la colonne fait 1280px. Il court desormais sur toute la largeur
            disponible et ne se replie qu'une fois celle-ci reellement remplie.
            text-balance retire aussi : il equilibrait la longueur des lignes,
            donc renvoyait a la ligne avant meme d'avoir rempli l'espace. */}
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight">
          Des centaines de problèmes à résoudre en entreprise. Trouvons le
          vôtre.
        </h2>
        <p className="mt-4 text-sm md:text-base opacity-60 max-w-xl">
          Voici des agents déjà construits. Le vôtre sera différent : il sera
          fait pour vous.
        </p>
      </div>

      {/* Mobile : defilement natif avec accrochage. Une bande qui glisse en
          continu ne laisse jamais lire une carte entiere sur un petit ecran, et
          l'inertie du systeme est meilleure que tout ce qu'on simulerait. */}
      <div className="sm:hidden mt-10 relative">
        <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shown.map((agent) => (
            <div key={agent.slug} className="snap-center shrink-0 flex">
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
        <p className="mt-1 px-6 text-[11px] font-mono opacity-35">
          Faites glisser pour voir les autres
        </p>
      </div>

      {/* Desktop : bande continue, manipulable a la souris. Le survol ne met
          plus en pause, seul un glissement reel reprend la main. */}
      <div className="hidden sm:block relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 z-10 bg-gradient-to-l from-black to-transparent" />

        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
          // overflow-x seul + padding vertical : en overflow-hidden, la bordure
          // haute des cartes et leur translation au survol etaient rognees.
          className={`overflow-x-hidden py-3 touch-pan-y select-none ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div ref={trackRef} className="flex items-stretch gap-5 w-max will-change-transform">
            {doubled.map((agent, i) => (
              <AgentCard key={`${agent.slug}-${i}`} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
