"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { CAPACITES } from "./aios-content";

// "Ce qu'il fait", montre plutot que raconte (demande de Nathan, 08/09/2026 :
// la section n'etait qu'une grille de textes).
//
// A gauche, les moments de la journee ; a droite, la conversation
// correspondante qui se JOUE, bulle apres bulle, dans un ecran de telephone.
// Le visiteur voit l'outil fonctionner avant d'avoir lu une seule ligne de
// fonctionnalite.
//
// Les conversations sont ecrites a l'avance (aios-content.js), aucun modele
// n'est appele ici : c'est une mise en scene, pas une fausse execution en
// direct - le libelle "Exemple de conversation" le dit a l'ecran.

const DELAI_BULLE = 1600; // temps de lecture d'une bulle avant la suivante
const DELAI_BOUCLE = 3600; // pause avant de passer au moment suivant

function MicroGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
    </svg>
  );
}

function Bulle({ etape }) {
  const estUtilisateur = etape.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${estUtilisateur ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
          estUtilisateur
            ? "bg-accent text-white rounded-br-sm"
            : "bg-white text-ink border border-ink/10 rounded-bl-sm"
        }`}
      >
        {etape.voice && (
          <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider opacity-70">
            <MicroGlyph className="w-3 h-3" />
            Dicté
          </span>
        )}
        {etape.text}
      </div>
    </motion.div>
  );
}

// Trois points qui respirent : le signe universel de "il est en train de
// repondre". Sans lui, les bulles apparaissent d'un coup et la scene perd son
// rythme de conversation.
function Frappe() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-ink/10 bg-white px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
            className="block w-1.5 h-1.5 rounded-full bg-ink/60"
          />
        ))}
      </div>
    </div>
  );
}

export default function AiosCapacites() {
  const [actif, setActif] = useState(0);
  const [visibles, setVisibles] = useState(0);
  const [frappe, setFrappe] = useState(false);
  // Une fois que le visiteur a choisi son moment, on arrete la rotation : on
  // ne lui reprend pas la main sur ce qu'il est en train de lire.
  const [manuel, setManuel] = useState(false);
  const timers = useRef([]);

  const capacite = CAPACITES[actif];

  const nettoyer = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  // Deroule la scene courante bulle par bulle, puis enchaine sur le moment
  // suivant tant que le visiteur n'a pas choisi lui-meme.
  useEffect(() => {
    nettoyer();
    setVisibles(0);
    setFrappe(false);

    const scene = capacite.scene;
    let horloge = 500;

    scene.forEach((etape, i) => {
      if (etape.role === "aios") {
        timers.current.push(setTimeout(() => setFrappe(true), horloge));
        horloge += 700;
      }
      timers.current.push(
        setTimeout(() => {
          setFrappe(false);
          setVisibles(i + 1);
        }, horloge)
      );
      horloge += DELAI_BULLE;
    });

    if (!manuel) {
      timers.current.push(
        setTimeout(() => setActif((i) => (i + 1) % CAPACITES.length), horloge + DELAI_BOUCLE)
      );
    }

    return nettoyer;
  }, [actif, manuel, capacite, nettoyer]);

  return (
    <section className="bg-surface-2 text-ink">
      <Reveal className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* L'ancre est posee sur le TITRE, pas sur la section : la section
            porte 96 px de padding et une animation d'entree, donc un lien de
            nav qui visait son bord haut ouvrait sur un ecran presque vide. */}
        <span
          id="capacites"
          className="scroll-mt-10 text-xs font-mono uppercase tracking-widest text-accent"
        >
          Ce qu&apos;il fait
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Une journée avec Foxy.
        </h2>
        <p className="mt-5 text-base md:text-lg text-ink/60 leading-relaxed max-w-2xl">
          Vous lui parlez comme à quelqu&apos;un de votre équipe. Choisissez un moment de
          la journée, la conversation se joue.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] gap-10 lg:gap-16 items-start">
          {/* Les moments de la journee : cliquables, celui qui joue est en
              couleur et porte une barre d'avancement discrete. */}
          <div className="flex flex-col">
            {CAPACITES.map((c, i) => {
              const estActif = i === actif;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setManuel(true);
                    setActif(i);
                  }}
                  data-cursor-hover
                  className={`group relative border-t border-ink/10 py-5 text-left transition-colors ${
                    estActif ? "" : "hover:text-accent"
                  } ${i === CAPACITES.length - 1 ? "border-b" : ""}`}
                >
                  {estActif && (
                    <motion.span
                      layoutId="capacite-active"
                      className="absolute left-0 top-0 h-[2px] w-full bg-accent"
                    />
                  )}
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider ${
                      estActif ? "text-accent" : "text-ink/35"
                    }`}
                  >
                    {c.accroche}
                  </span>
                  <h3
                    className={`font-display mt-1.5 text-xl md:text-2xl font-bold transition-colors ${
                      estActif ? "" : "text-ink/45"
                    }`}
                  >
                    {c.titre}
                  </h3>
                  <AnimatePresence initial={false}>
                    {estActif && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden text-[15px] text-ink/60 leading-relaxed max-w-xl"
                      >
                        <span className="block pt-2.5">{c.texte}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Le telephone : meme cadre que dans le hero, mais habite. */}
          <div className="lg:sticky lg:top-24">
            <div className="mx-auto w-full max-w-[340px] rounded-[28px] border border-ink/12 bg-surface p-3 shadow-[0_30px_70px_-35px_rgba(36,26,21,0.55)]">
              <div className="flex items-center gap-2 px-2 py-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo
                    local a taille fixe. */}
                <img src="/images/cover-aios.png" alt="" className="w-6 h-6 object-contain" />
                <span className="text-[12px] font-mono font-bold">FOXY</span>
                <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-ink/35">
                  Exemple de conversation
                </span>
              </div>

              <div className="mt-1 flex min-h-[330px] flex-col justify-end gap-2.5 rounded-[20px] bg-surface-2 p-3.5">
                <AnimatePresence mode="popLayout">
                  {capacite.scene.slice(0, visibles).map((etape, i) => (
                    <Bulle key={`${capacite.id}-${i}`} etape={etape} />
                  ))}
                </AnimatePresence>
                {frappe && <Frappe />}
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-full border border-accent/40 bg-white px-4 py-2.5">
                <span className="flex-1 text-[11px] text-ink/35">Demandez n&apos;importe quoi...</span>
                <MicroGlyph className="w-3.5 h-3.5 text-ink/35" />
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-[10px]">
                  &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
