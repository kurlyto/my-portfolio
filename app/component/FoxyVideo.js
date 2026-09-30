"use client";

// Video de presentation de Foxy (1 min, motion design v5, prise 2, fin
// "10 places"), posee le 30/09/2026 avec les memes codes que la landing de Mon
// Devis Dentaire (demande de Nathan) :
// - un bouton "Voir la video" dans le hero qui l'ouvre en grand ;
// - une section juste sous le hero, lecture MUETTE quand elle arrive a l'ecran
//   (les navigateurs n'autorisent le lancement automatique que sans le son),
//   un bouton "Activer le son" qui la reprend du debut ;
// - une carte de fin qui propose de reserver sa place.
//
// `preload="none"` + affiche fixe ("Voici Foxy !", 10 s) : les 4 Mo ne partent
// qu'a l'arrivee sur la section ou au clic, le premier ecran ne paie rien.

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/foxy-1min.mp4";
const VIDEO_POSTER = "/videos/foxy-1min-affiche.webp";
const VIDEO_TITLE = "Foxy en une minute";

// Une seule video joue a la fois (meme regle que MDD, 29/09/2026) : celle qui
// demarre AVEC le son met les autres en pause. La lecture muette de la section
// ne coupe personne.
function pauseOtherVideos(current) {
  document.querySelectorAll("video[data-video-foxy]").forEach((v) => {
    if (v !== current && !v.paused) v.pause();
  });
}

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

// Carte posee sur la video terminee : c'est le moment ou le visiteur a compris
// le produit, donc le meilleur pour lui proposer de reserver.
function VideoEndCard({ onReserve, onReplay, zone }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-5 bg-deep/85 p-4 text-center backdrop-blur-sm">
      <p className="font-display text-lg md:text-3xl font-bold text-white">Envie de l&apos;essayer ?</p>
      <button
        type="button"
        onClick={onReserve}
        data-cursor-hover
        data-umami-event={`clic-foxy-fin-video-${zone}-reserver-ma-place`}
        className="inline-flex items-center justify-center rounded-full bg-accent text-white px-6 py-3 md:px-8 md:py-4 text-[12px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors hover:bg-accent-dark"
      >
        Réserver ma place
      </button>
      <button
        type="button"
        onClick={onReplay}
        data-cursor-hover
        className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-white/70 transition-colors hover:text-white"
      >
        <ReplayGlyph className="w-3.5 h-3.5" />
        Revoir la vidéo
      </button>
    </div>
  );
}

// Bouton du hero + la video en grand par-dessus la page.
export function WatchVideoButton({ onReserve, className = "" }) {
  const [open, setOpen] = useState(false);
  const [ended, setEnded] = useState(false);
  const videoRef = useRef(null);

  function show(next) {
    setOpen(next);
    setEnded(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") show(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function replay() {
    setEnded(false);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play();
    }
  }

  return (
    <>
      {/* Onde qui part du bouton (classe cta-pulse) : attire l'oeil sans faire
          bouger le bouton, comme "Voir une video" sur MDD. */}
      <button
        type="button"
        onClick={() => show(true)}
        data-cursor-hover
        data-umami-event="clic-foxy-hero-voir-video"
        className={`group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-accent/40 bg-white px-6 py-3.5 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide text-ink transition-colors hover:border-accent w-full sm:w-fit ${className}`}
      >
        <span className="cta-pulse flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent transition-transform group-hover:scale-110">
          <PlayGlyph className="ml-0.5 w-3.5 h-3.5 text-white" />
        </span>
        Voir la vidéo
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={VIDEO_TITLE}
          className="fixed inset-0 z-50 flex items-center justify-center px-3"
        >
          <div onClick={() => show(false)} aria-hidden className="absolute inset-0 bg-black/75" />
          {/* Largeur bornee par la hauteur d'ecran (16/9) : la video entiere
              reste visible sur un ecran bas, sans barre de defilement. */}
          <div className="relative w-[min(94vw,calc(84vh*16/9))]">
            <button
              type="button"
              onClick={() => show(false)}
              aria-label="Fermer la vidéo"
              data-cursor-hover
              className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                data-video-foxy
                autoPlay
                controls={!ended}
                playsInline
                onPlay={(e) => pauseOtherVideos(e.currentTarget)}
                onEnded={() => setEnded(true)}
                className="block aspect-video w-full bg-surface"
              />
              {ended && (
                <VideoEndCard
                  zone="hero"
                  onReplay={replay}
                  onReserve={() => {
                    show(false);
                    onReserve();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function FoxyVideoSection({ onReserve }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [sound, setSound] = useState(false);
  const [ended, setEnded] = useState(false);
  // Copies lues par l'observateur, qui ne voit pas les etats React a jour.
  const soundRef = useRef(false);
  const resumeOnReturn = useRef(false);

  // Lecture muette des que la moitie de la video est a l'ecran, pause quand
  // elle en sort. Qui a demande moins d'animations garde le gros play.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // En muet, on relance a chaque retour ; avec le son, seulement si
          // c'est le defilement qui l'avait mise en pause, pas le visiteur.
          if (v.ended || (soundRef.current && !resumeOnReturn.current)) return;
          resumeOnReturn.current = false;
          if (!soundRef.current) v.muted = true;
          // Refus possible (economie d'energie sur iPhone) : le gros play reste.
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
          resumeOnReturn.current = true;
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);

  // Le son se branche en reprenant du debut : la voix raconte depuis la
  // premiere seconde, la prendre en route ne servirait a rien.
  function playWithSound() {
    const v = videoRef.current;
    if (!v) return;
    soundRef.current = true;
    setSound(true);
    setStarted(true);
    setEnded(false);
    v.muted = false;
    v.currentTime = 0;
    void v.play();
  }

  return (
    // La video a un fond creme, comme la page : un lisere et une ombre la
    // detachent (sur MDD, une video du meme ton que sa section s'y confondait).
    <section id="video" aria-label={VIDEO_TITLE} className="px-4 md:px-6 pb-14 md:pb-24" style={{ scrollMarginTop: "64px" }}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-2xl shadow-black/15">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            data-video-foxy
            preload="none"
            playsInline
            controls={sound && !ended}
            onPlay={(e) => {
              setStarted(true);
              if (!e.currentTarget.muted) pauseOtherVideos(e.currentTarget);
            }}
            onEnded={() => setEnded(true)}
            className="block aspect-video w-full"
          />
          {/* Toute l'affiche est cliquable, avec un gros play au centre. On ne
              le voit qu'avant la lecture automatique (ou a sa place si elle n'a
              pas lieu). */}
          {!started && (
            <button
              type="button"
              onClick={playWithSound}
              aria-label="Lancer la vidéo (1 min)"
              data-cursor-hover
              data-umami-event="clic-foxy-voir-video-section"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="cta-pulse flex h-14 w-14 md:h-20 md:w-20 lg:h-24 lg:w-24 items-center justify-center rounded-full bg-accent shadow-xl shadow-black/25 transition-transform group-hover:scale-110">
                <PlayGlyph className="ml-1 w-6 h-6 md:w-9 md:h-9 lg:w-10 lg:h-10 text-white" />
              </span>
            </button>
          )}
          {/* Pendant la lecture muette, un clic n'importe ou branche le son ; le
              bouton qui pulse le dit en clair. En bas pour laisser le milieu de
              l'image lisible. */}
          {started && !sound && !ended && (
            <button
              type="button"
              onClick={playWithSound}
              data-cursor-hover
              data-umami-event="clic-foxy-activer-son-video"
              className="group absolute inset-0 flex items-end justify-center pb-4 md:pb-8"
            >
              <span className="cta-pulse inline-flex h-10 md:h-14 items-center gap-2 md:gap-3 rounded-full bg-accent px-5 md:px-8 text-[12px] md:text-base font-mono font-bold uppercase tracking-wide text-white shadow-xl shadow-black/30 transition-transform group-hover:scale-105">
                <SoundGlyph className="w-4 h-4 md:w-6 md:h-6" />
                Activer le son
              </span>
            </button>
          )}
          {ended && <VideoEndCard zone="section" onReserve={onReserve} onReplay={playWithSound} />}
        </div>
      </div>
    </section>
  );
}
