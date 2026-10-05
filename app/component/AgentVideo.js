"use client";

// Video "Un agent, c'est quoi ?" (36 s, motion design du 04/10/2026), posee le
// 05/10/2026 sur /agents a la place de la carte d'audit de Nate (Nathan : l'audit
// n'amenera aucun client).
// - Au bureau : colonne droite du hero, lecture MUETTE d'office (seul lancement
//   automatique permis par les navigateurs), un bouton "Activer le son" la
//   reprend du debut.
// - Sur telephone : juste sous le hero, affiche + gros play, rien ne part seul
//   (le forfait du visiteur, et le hero doit rester seul dans le premier ecran).
// - A la fin d'un visionnage AVEC le son : pop-up "Vous pensez avoir besoin d'un
//   tel systeme ?" vers la prise de rendez-vous. Fin d'une lecture muette : la
//   meme proposition, mais dans la video seulement (le visiteur lisait peut-etre
//   le texte d'a cote, une fenetre par-dessus la page serait une intrusion).

import { useEffect, useRef, useState } from "react";
import { RDV_URL, RDV_LABEL, CalendrierIcon } from "../lib/rendez-vous";

const VIDEO_SRC = "/videos/agent-explication.mp4";
const VIDEO_POSTER = "/videos/agent-explication-affiche.webp";
const VIDEO_TITLE = "Un agent IA, c'est quoi ?";
const QUESTION = "Vous pensez avoir besoin d'un tel système ?";

function PlayGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function SoundGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  );
}

function ReplayGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function BookButton({ evenement, className = "" }) {
  return (
    <a
      href={RDV_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      data-umami-event={evenement}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-accent-ink px-6 py-3 text-[12px] md:text-sm font-mono font-bold uppercase tracking-wide transition-all duration-150 ease-out hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <CalendrierIcon className="w-4 h-4" />
      {RDV_LABEL}
    </a>
  );
}

// Fenetre par-dessus la page, a la fin d'un visionnage avec le son.
function EndPopup({ zone, onClose, onReplay }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={QUESTION} className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div onClick={onClose} aria-hidden className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-md rounded-3xl bg-[#faf8f5] p-7 md:p-9 text-center shadow-2xl surface-claire">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          data-cursor-hover
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-black/5 hover:text-black"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <p className="font-display text-2xl md:text-3xl font-bold leading-tight text-balance">{QUESTION}</p>
        <p className="mt-3 text-[15px] text-black/60">Contactez-moi : on voit ensemble ce qu&apos;un agent peut faire pour votre business.</p>
        <BookButton evenement={`clic-agents-video-${zone}-popup-reserver-appel`} className="mt-6 w-full sm:w-auto" />
        <button
          type="button"
          onClick={onReplay}
          data-cursor-hover
          className="mt-4 mx-auto flex items-center gap-1.5 text-sm font-medium text-black/50 transition-colors hover:text-black"
        >
          <ReplayGlyph className="w-3.5 h-3.5" />
          Revoir la vidéo
        </button>
      </div>
    </div>
  );
}

// `zone` : "hero" (bureau, lecture muette d'office) ou "mobile" (sous le hero).
export default function AgentVideo({ zone = "hero", className = "" }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(false);
  const [ended, setEnded] = useState(false);
  const [popup, setPopup] = useState(false);
  const soundRef = useRef(false);
  const auto = zone === "hero";

  // Bureau : lecture muette quand la video est a l'ecran, pause quand elle en
  // sort (meme regle que la video de Foxy). Qui a demande moins d'animations
  // garde le gros play.
  useEffect(() => {
    const v = videoRef.current;
    if (!auto || !v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.ended || soundRef.current) return;
          v.muted = true;
          v.play().catch(() => {});
        } else if (!v.paused && !soundRef.current) {
          v.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [auto]);

  function playWithSound() {
    const v = videoRef.current;
    if (!v) return;
    soundRef.current = true;
    setSound(true);
    setStarted(true);
    setEnded(false);
    setPopup(false);
    v.muted = false;
    v.currentTime = 0;
    void v.play();
  }

  function onEnded() {
    setEnded(true);
    if (soundRef.current) setPopup(true);
  }

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#faf6f0] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={VIDEO_POSTER}
          preload={auto ? "metadata" : "none"}
          playsInline
          controls={sound && !ended}
          aria-label={VIDEO_TITLE}
          onPlay={() => setStarted(true)}
          onEnded={onEnded}
          className="block aspect-video w-full"
        />
        {!started && (
          <button
            type="button"
            onClick={playWithSound}
            aria-label="Lancer la vidéo (36 s)"
            data-cursor-hover
            data-umami-event={`clic-agents-video-${zone}-lancer`}
            className="group absolute inset-0 flex items-center justify-center bg-black/5"
          >
            <span className="cta-pulse flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-accent shadow-xl shadow-black/25 transition-transform group-hover:scale-110">
              <PlayGlyph className="ml-1 w-6 h-6 md:w-7 md:h-7 text-accent-ink" />
            </span>
          </button>
        )}
        {started && !sound && !ended && (
          <button
            type="button"
            onClick={playWithSound}
            data-cursor-hover
            data-umami-event={`clic-agents-video-${zone}-activer-son`}
            className="group absolute inset-0 flex items-end justify-end p-3"
          >
            <span className="cta-pulse inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-[11px] font-mono font-bold uppercase tracking-wide text-accent-ink shadow-xl shadow-black/30 transition-transform group-hover:scale-105">
              <SoundGlyph className="w-4 h-4" />
              Activer le son
            </span>
          </button>
        )}
        {ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/75 p-4 text-center backdrop-blur-sm">
            <p className="font-display text-lg md:text-xl font-bold leading-tight text-white text-balance">{QUESTION}</p>
            <BookButton evenement={`clic-agents-video-${zone}-fin-reserver-appel`} className="px-5 py-2.5" />
            <button
              type="button"
              onClick={playWithSound}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              <ReplayGlyph className="w-3.5 h-3.5" />
              Revoir la vidéo
            </button>
          </div>
        )}
      </div>
      {popup && <EndPopup zone={zone} onClose={() => setPopup(false)} onReplay={playWithSound} />}
    </div>
  );
}
