"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { nomClicDemo } from "../lib/suivi-clics";

const ACCENT = "var(--accent)";
// L'accent est une VARIABLE CSS depuis la scission des deux sites : lui coller
// un suffixe d'opacite hexadecimal ("var(--accent)1f") ne produit pas une
// couleur, ca produit une valeur invalide que le navigateur jette en silence
// (fonds et ombres disparus sans erreur). color-mix est la seule facon de
// diluer une variable.
const teinte = (pct) => `color-mix(in srgb, ${ACCENT} ${pct}%, transparent)`;

// Lecteur des demonstrations scriptees (voir demo-scenarios.js). Il occupe le
// meme emplacement que le ChatPanel : colonne droite du hero en desktop, plein
// ecran en mobile. Meme cadre orange que le chat : le visiteur comprend que
// c'est la meme fenetre de conversation, seule la nature (demo vs reel) change,
// et le bandeau du bas le dit explicitement.
//
// Ouvert sans demonstration choisie, il affiche d'abord le CHOIX : sur telephone
// le bouton du hero jouait toujours le meme scenario, donc le visiteur voyait ce
// qu'on avait decide pour lui, jamais ce qui le concerne.

// Cadence de lecture. Le `delay` d'un scenario dit le rythme VOULU, mais un
// delai fixe ignore ce qu'il y a a lire : une ligne de trois mots et une phrase
// de deux lignes restaient affichees le meme temps, et les longues passaient
// trop vite. On garde donc le delai du scenario comme plancher, et on l'allonge
// selon la longueur de l'etape PRECEDENTE - celle que le visiteur est en train
// de lire pendant l'attente.
const RYTHME = 1.25;
const LECTURE_BASE = 500;
const MS_PAR_CARACTERE = 18;
const ATTENTE_MAX = 3800;

function longueurTexte(step) {
  if (!step) return 0;
  return (step.text ?? "").replace(/[{}]/g, "").length;
}

function attenteAvant(steps, index) {
  const prevu = (steps[index].delay ?? 1200) * RYTHME;
  if (index === 0) return prevu;
  const tempsDeLecture = LECTURE_BASE + longueurTexte(steps[index - 1]) * MS_PAR_CARACTERE;
  return Math.min(Math.max(prevu, tempsDeLecture), ATTENTE_MAX);
}

function PulsingDot() {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: ACCENT }}
    />
  );
}

function CheckGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Une etape de raisonnement : le point qui pulse tant que l'agent y travaille,
// la coche une fois passe. L'outil ouvert est ecrit DANS la phrase, entre
// accolades dans le scenario, et ressort en couleur : une phrase simple se lit
// d'un trait ("Je regarde vos rendez-vous dans l'agenda"), et la suite des mots
// colores montre a elle seule qu'une demande a ouvert plusieurs outils. L'ancienne
// pastille en majuscules a part coupait la lecture en deux.
function ReasonLine({ text, isCurrent }) {
  const morceaux = text.split(/\{([^}]+)\}/);
  return (
    <div className="flex items-start gap-2.5 pl-1">
      <span className="mt-[5px] flex items-center justify-center w-3 shrink-0">
        {isCurrent ? <PulsingDot /> : <CheckGlyph className="w-3 h-3" style={{ color: ACCENT }} />}
      </span>
      <p className="text-[12.5px] font-mono leading-relaxed text-black/55">
        {morceaux.map((m, i) =>
          i % 2 === 1 ? (
            <span key={i} className="mot-accent font-bold">
              {m}
            </span>
          ) : (
            m
          ),
        )}
      </p>
    </div>
  );
}

function Step({ step, isCurrent }) {
  if (step.type === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex justify-end"
      >
        <p
          className="max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed rounded text-white"
          style={{ background: ACCENT }}
        >
          {step.text}
        </p>
      </motion.div>
    );
  }

  if (step.type === "agent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex justify-start"
      >
        <p className="max-w-[85%] px-4 py-2.5 text-[14px] leading-relaxed rounded bg-black/[0.04] text-black">
          {step.text}
        </p>
      </motion.div>
    );
  }

  // Etape de raisonnement, avec ou sans outil ouvert a ce moment-la.
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <ReasonLine text={step.text} isCurrent={isCurrent} />
    </motion.div>
  );
}

// Le triangle de lecture est DESSINE, pas ecrit : le caractere U+25B6 se rend
// en emoji couleur sur une partie des Android, ce qui casse la pastille rouge.
function PlayMark({ className = "" }) {
  return (
    <svg viewBox="0 0 10 12" fill="currentColor" aria-hidden className={className}>
      <path d="M1 0.6 9 6 1 11.4Z" />
    </svg>
  );
}

function DemoHeader({ title, subtitle, onClose, onBack }) {
  return (
    <div className="shrink-0 border-b border-black/10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Le rond de lecture devient un retour quand il y a un choix
              derriere : meme place, meme taille, le visiteur n'a qu'un seul
              endroit a regarder pour changer d'idee. */}
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              data-cursor-hover
              aria-label="Choisir une autre démonstration"
              className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full border border-black/15 text-black/50 hover:text-black hover:border-black/35 transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4" aria-hidden>
                <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full text-white"
              style={{ background: ACCENT }}
              aria-hidden
            >
              <PlayMark className="w-[11px] h-[13px] ml-0.5" />
            </span>
          )}
          <div>
            <p className="text-[14px] font-semibold leading-tight">{title}</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-black/40 leading-tight">
              {subtitle}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-cursor-hover
          className="flex items-center justify-center shrink-0 w-9 h-9 -mr-1 rounded-full text-[24px] leading-none text-black/45 hover:text-black hover:bg-black/[0.06] transition-colors duration-150 font-mono"
          aria-label="Fermer la démonstration"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

// La demande du visiteur telle qu'elle est ecrite dans le scenario : c'est elle
// qu'on montre dans le menu, pas un resume. Ce que le bouton promet est
// exactement ce qui va s'afficher a l'ecran.
function demandeDe(demo) {
  return demo.steps.find((s) => s.type === "user")?.text ?? demo.chip;
}

// Ecran de choix. Une demonstration qu'on n'a pas choisie est une video : le
// visiteur regarde poliment. Une qu'il a choisie parle de SON probleme.
function DemoMenu({ demos, onPick, titre }) {
  return (
    // my-auto sur le bloc interne : en plein ecran mobile, quatre choix ne
    // remplissent pas la hauteur et laissaient un demi-ecran blanc sous la
    // liste. Centre tant qu'il reste de la place, sans effet des que le
    // contenu deborde (le defilement reprend normalement).
    <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col">
      <div className="my-auto">
        <p className="px-1 text-[13.5px] leading-relaxed text-black/60">{titre}</p>
        <div className="mt-4 flex flex-col gap-2">
          {demos.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onPick(d)}
              data-cursor-hover
              data-umami-event={nomClicDemo(d.id)}
              className="group w-full text-left rounded border border-black/10 px-4 py-3.5 transition-colors duration-150 hover:border-transparent"
              style={{ background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = teinte(7);
                e.currentTarget.style.borderColor = teinte(45);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
              }}
            >
              <span className="flex items-center gap-2.5">
                <span
                  className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full text-white"
                  style={{ background: ACCENT }}
                  aria-hidden
                >
                  <PlayMark className="w-[7px] h-[9px] ml-px" />
                </span>
                <span className="text-[14px] font-semibold leading-tight">{d.chip}</span>
              </span>
              <span className="mt-2 block pl-[34px] text-[12.5px] font-mono leading-relaxed text-black/45">
                &laquo;&nbsp;{demandeDe(d)}&nbsp;&raquo;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Les libelles ci-dessous sont surchargeables : le meme lecteur sert aux
// demos d'agents (hero) et a celles de l'AIOS (section acces anticipe), qui ne
// racontent pas la meme chose et ne debouchent pas sur la meme action.
//
// `demo` peut etre nul : le panneau s'ouvre alors sur le choix (`demos`).
export default function DemoPanel({
  demo: demoInitiale = null,
  demos = [],
  onClose,
  onOpenChat,
  fullScreen = false,
  subtitle = "Démonstration : un agent au travail",
  ctaLabel = "Décrire mon vrai besoin",
  // Nom du clic suivi (Umami) sur le bouton de fin de demonstration.
  evenementCta = "clic-agents-demo-fin-decrire-mon-besoin",
  disclaimer = "Ceci est une démonstration écrite à l'avance. Votre agent, lui, sera branché à vos vrais outils.",
  menuTitle = "Choisissez ce que vous voulez le voir faire. Chaque démonstration se joue étape par étape, en quelques secondes.",
}) {
  // Choix courant. Il vit ICI et pas chez le parent : une fois le panneau
  // ouvert, changer de scenario ne doit rien rouvrir ni rien faire defiler.
  const [demo, setDemo] = useState(demoInitiale);
  useEffect(() => {
    setDemo(demoInitiale);
  }, [demoInitiale]);
  const choixPossible = demos.length > 1;
  // Nombre d'etapes deja affichees. La suivante apparait apres son `delay` :
  // c'est ce sequencage qui donne l'impression d'un agent qui travaille.
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    setCount(0);
    setDone(false);
  }, [demo?.id]);

  useEffect(() => {
    if (!demo) return undefined;
    if (count >= demo.steps.length) {
      setDone(true);
      return undefined;
    }
    const id = setTimeout(() => setCount((c) => c + 1), attenteAvant(demo.steps, count));
    return () => clearTimeout(id);
  }, [count, demo]);

  // Chaque nouvelle etape doit rester visible : on suit le bas de la
  // conversation, comme dans un vrai chat.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, done]);

  const visible = demo ? demo.steps.slice(0, count) : [];

  // Rien de choisi : on montre le menu au lieu du lecteur, dans le meme cadre.
  const body = !demo ? (
    <>
      <DemoHeader title="Voir une démonstration" subtitle={subtitle} onClose={onClose} />
      <DemoMenu demos={demos} titre={menuTitle} onPick={setDemo} />
      <div className="shrink-0 border-t border-black/10 px-4 py-4">
        <p className="text-[12.5px] leading-relaxed text-black/55">{disclaimer}</p>
      </div>
    </>
  ) : (
    <>
      <DemoHeader
        title={demo.title}
        subtitle={subtitle}
        onClose={onClose}
        onBack={choixPossible ? () => setDemo(null) : undefined}
      />

      {/* mt-auto sur le bloc interne : la conversation part du BAS du cadre,
          comme dans une vraie messagerie. Sinon, une demo qui commence par un
          seul message laisse un grand vide sous lui (visible surtout en plein
          ecran mobile). Des que le contenu depasse, mt-auto vaut 0 et le
          defilement reprend son comportement normal. */}
      <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-5 flex flex-col">
        <div className="mt-auto flex flex-col gap-3.5">
          {visible.map((step, i) => (
            <Step
              key={i}
              step={step}
              isCurrent={
                step.type === "think" && i === count - 1 && !done
              }
            />
          ))}
        </div>
      </div>

      {/* Honnetete d'abord : la demo est annoncee comme telle, et debouche sur
          la seule action qui compte, decrire son vrai besoin dans le chat. */}
      <div className="shrink-0 border-t border-black/10 px-4 py-4">
        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <p className="text-[12.5px] leading-relaxed text-black/55">{disclaimer}</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenChat}
                data-cursor-hover
                data-umami-event={evenementCta}
                className="inline-flex items-center gap-2 text-[13px] font-mono font-bold uppercase tracking-wide rounded-full px-5 py-2.5 text-white transition-all duration-150 ease-out hover:-translate-y-0.5"
                style={{ background: ACCENT }}
              >
                {ctaLabel}
              </button>
              {/* La sortie la plus utile apres une demo n'est pas de la revoir,
                  c'est d'en voir une autre : c'est la deuxieme qui prouve que
                  ce n'est pas un tour de magie prepare pour un seul cas. */}
              {choixPossible ? (
                <button
                  type="button"
                  onClick={() => setDemo(null)}
                  data-cursor-hover
                  className="text-[12px] font-mono text-black/45 hover:text-black transition-colors"
                >
                  Voir un autre exemple
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setCount(0);
                  setDone(false);
                }}
                data-cursor-hover
                className="text-[12px] font-mono text-black/45 hover:text-black transition-colors"
              >
                Rejouer
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <p className="text-[12px] font-mono uppercase tracking-wider text-black/35">
              Démonstration en cours...
            </p>
            {/* Passer la suite sans attendre : la cadence est faite pour lire,
                elle ne doit pas retenir quelqu'un qui a compris. */}
            <button
              type="button"
              onClick={() => setCount(demo.steps.length)}
              data-cursor-hover
              className="shrink-0 text-[12px] font-mono text-black/40 hover:text-black transition-colors"
            >
              Tout afficher
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        // text-black explicite : le panneau peut etre rendu a l'interieur d'une
        // section en text-white (section AIOS, fond noir). Sans cette couleur,
        // les textes sans classe propre (le titre de l'entete) heritent du
        // blanc et disparaissent sur le fond blanc du panneau.
        className="surface-claire fixed inset-0 z-50 bg-white text-black flex flex-col"
        style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}` }}
      >
        {body}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="surface-claire flex flex-col h-full min-h-[min(560px,60vh)] max-h-[calc(100vh-6.5rem)] rounded bg-white text-black overflow-hidden"
      style={{
        border: `2px solid ${ACCENT}`,
        boxShadow: `0 0 0 4px ${teinte(10)}, 0 20px 40px -12px ${teinte(20)}`,
      }}
    >
      {body}
    </motion.div>
  );
}
