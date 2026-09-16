"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DEMOS } from "./demo-scenarios";
import CallButton from "./CallButton";

// Titre = la promesse concrete, pas une metaphore : le visiteur doit
// comprendre ce qu'on vend avant meme le sous-titre (refonte 09/2026,
// inspiree des vitrines qui annoncent le produit dans le titre).
const TITLE = "Un employé IA qui gère\nvotre business.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_FRAMES = 18;

// Halo qui respire autour de la barre de saisie : attire l'oeil sans
// clignotement agressif (l'ombre s'etend puis retombe, la couleur ne change
// jamais).
const PULSE_SHADOWS = [
  "0 0 0 0 rgba(255,107,53,0.45)",
  "0 0 0 14px rgba(255,107,53,0)",
  "0 0 0 0 rgba(255,107,53,0)",
];

// Le champ s'ecrit tout seul. Ce sont des ORDRES qu'on donnerait a son agent,
// pas des plaintes : le visiteur ne decrit pas son probleme, il se voit deja en
// train de deleguer.
//
// Les phrases ne sont pas ecrites ici : ce sont EXACTEMENT les demandes des
// demonstrations. Cliquer dans le champ joue la demo de la phrase affichee, et
// le visiteur voit se derouler ce qu'il venait de lire. Une liste separee
// finirait par promettre des choses qu'aucune demo ne montre.
const PLACEHOLDER_EXAMPLES = DEMOS.map((demo) => ({
  id: demo.id,
  // Sans le point final : on ecrit dans un champ de saisie, pas un texte.
  text: (demo.steps.find((s) => s.type === "user")?.text ?? demo.chip).replace(/\.$/, ""),
}));
const TYPE_MS = 55;
const ERASE_MS = 26;
const HOLD_MS = 1700;
const GAP_MS = 400;
const START_MS = 1400;

function ArrowGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

// Ce que le bouton "Faire un audit gratuit" envoie a Nate : la conversation
// s'ouvre deja amorcee, et Nate enchaine sur le cadrage du besoin sans que le
// visiteur ait a ecrire quoi que ce soit. Exporte : "Comment ca marche" ouvre la
// meme conversation.
export const AUDIT_MESSAGE =
  "Je voudrais un audit gratuit : dites-moi ce qu'un agent IA pourrait prendre en charge dans mon entreprise.";

export default function ScrambleHero({ onSubmitNeed, onPlayDemo, onFieldFocus }) {
  const [displayText, setDisplayText] = useState(TITLE);
  const [need, setNeed] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  // Figee des que le visiteur entre dans le champ : la demo prend le relais,
  // deux animations en concurrence ne se lisent plus.
  const [typing, setTyping] = useState(true);
  // Quelle phrase est affichee a l'instant : c'est elle qu'on joue au clic.
  const shownIndex = useRef(0);
  const fieldIsEmpty = need.length === 0;

  useEffect(() => {
    let frame = 0;
    let raf;

    const tick = () => {
      frame += 1;
      const revealCount = Math.floor((frame / TOTAL_FRAMES) * TITLE.length);
      let out = "";
      for (let i = 0; i < TITLE.length; i += 1) {
        const c = TITLE[i];
        if (c === " " || c === "\n") {
          out += c;
        } else {
          out += i < revealCount ? c : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(out);
      if (frame < TOTAL_FRAMES) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplayText(TITLE);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Machine a ecrire du placeholder. Elle ne tourne que si le champ est vide :
  // des que le visiteur tape, le placeholder est invisible, inutile de
  // continuer a re-rendre.
  // Elle tourne AUSSI en "animations reduites" (14/09) : c'est du texte qui
  // s'ecrit, rien ne bouge a l'ecran. L'ancienne garde figeait la premiere
  // phrase sur tout PC Windows aux animations coupees, et Nathan ne voyait
  // jamais les exemples defiler.
  useEffect(() => {
    if (!fieldIsEmpty || !typing) return undefined;

    let charCount = 0;
    let erasing = false;
    let timer;

    const step = () => {
      const phrase = PLACEHOLDER_EXAMPLES[shownIndex.current].text;

      if (!erasing) {
        charCount += 1;
        setPlaceholder(phrase.slice(0, charCount));
        if (charCount >= phrase.length) {
          erasing = true;
          timer = setTimeout(step, HOLD_MS);
          return;
        }
        timer = setTimeout(step, TYPE_MS);
        return;
      }

      charCount -= 1;
      setPlaceholder(phrase.slice(0, charCount));
      if (charCount <= 0) {
        erasing = false;
        shownIndex.current = (shownIndex.current + 1) % PLACEHOLDER_EXAMPLES.length;
        timer = setTimeout(step, GAP_MS);
        return;
      }
      timer = setTimeout(step, ERASE_MS);
    };

    timer = setTimeout(step, START_MS);
    return () => clearTimeout(timer);
  }, [fieldIsEmpty, typing]);

  // Entrer dans le champ (clic, ou espace/entree a vide) joue la demo de la
  // phrase affichee : le visiteur voit se derouler ce qu'il vient de lire,
  // raisonnement compris, pendant qu'il ecrit sa propre demande.
  function playShownDemo() {
    const shown = PLACEHOLDER_EXAMPLES[shownIndex.current];
    setTyping(false);
    setPlaceholder(shown.text);
    onFieldFocus?.(shown.id);
  }

  // Espace ou Entree sur un champ vide : deux gestes qui ne produisent rien
  // aujourd'hui (un espace de tete, un envoi refuse). Ils relancent la demo.
  function onKeyDown(e) {
    if (!fieldIsEmpty) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      playShownDemo();
    }
  }

  function submit(e) {
    e.preventDefault();
    const text = need.trim();
    if (!text) return;
    setNeed("");
    onSubmitNeed(text);
  }

  return (
    <div className="min-w-0">
      {/* Pas d'enseigne repetee ici : le header mobile porte deja le meme carre
          NK a 60 px au-dessus, les deux se lisaient comme un doublon. Le site
          Foxy peut se le permettre parce que son grand renard est une mascotte,
          pas une copie de son logo de header. */}
      {/* Taille fluide plutot que deux paliers : entre 320px et 430px de large,
          un 4xl fixe faisait passer le titre de 2 a 4 lignes et poussait le CTA
          hors de l'ecran. Le clamp suit la largeur reelle du viewport. */}
      {/* Sur un ecran court (< 720px de haut), le titre et le sous-titre sont
          reduits d'un cran : avec la barre et les puces empilees, la taille
          pleine poussait le bas du hero sous la ligne de flottaison sur les
          petits modeles (320x568). Au-dela, rien ne change. */}
      <h1 className="font-display text-[clamp(1.65rem,7.4vw,2.2rem)] tall:text-[clamp(1.9rem,8.2vw,2.6rem)] md:text-[3.4rem] font-black tracking-tight leading-[1.06] md:leading-[1.08] whitespace-pre-line text-balance">
        {displayText}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        // Serif en italique, mais en graisse normale et sans voile
        // d'opacite : la phrase qui explique l'offre doit se lire d'emblee,
        // juste sous le titre.
        // Au grand ecran la phrase prend toute la colonne (elargie a 760 px,
        // 14/09). `text-pretty` et non `text-balance` a ce palier : l'equilibrage
        // coupait deux lignes egales a mi-largeur, la phrase ne s'etalait pas.
        className="font-display mt-3 tall:mt-4 sm:mt-6 text-[15px] tall:text-[17px] sm:text-xl md:text-[1.35rem] font-normal italic leading-snug sm:leading-relaxed text-black/90 max-w-xl xl:max-w-none text-balance xl:text-pretty"
      >
        {/* Une seule idee sur le premier ecran mobile : l'enumeration des
            taches (mails, devis, relances...) attend le bureau, elle se lit mal
            en trois lignes sur un telephone. */}
        <span className="hidden sm:inline">
          Un agent sur mesure se branche à vos outils et s&apos;occupe de vos mails, devis,
          relances et rendez-vous comme un membre de votre équipe.
        </span>
        <span className="sm:hidden">
          Un agent sur mesure qui se branche à vos outils et travaille comme un membre de
          votre équipe.
        </span>
      </motion.p>

      {/* La porte d'entree n'est plus un bouton mais la conversation
          elle-meme : on tape son besoin, le chat s'ouvre avec. Une barre remplie
          par le visiteur convertit mieux qu'un bouton qui promet un chat vide. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        className="mt-6 sm:mt-8"
      >
        {/* Sur telephone, deux boutons plutot que le champ : ouvrir un clavier
            pour decrire son besoin est la plus grosse friction du parcours
            mobile. Le premier bouton ouvre la MEME conversation avec Nate,
            deja amorcee ; le second montre un agent au travail. Le champ et sa
            machine a ecrire restent au bureau, ou ils fonctionnent. */}
        <div className="sm:hidden flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onSubmitNeed(AUDIT_MESSAGE)}
            data-cursor-hover
            className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-accent text-accent-ink px-6 py-4 text-[13px] font-mono font-bold uppercase tracking-wide"
          >
            Faire un audit 100% gratuit
          </button>
          {/* Sur telephone l'appel part directement (tel:), c'est le geste le
              plus naturel de l'ecran. */}
          <CallButton className="inline-flex items-center justify-center gap-2 w-full rounded-full border-2 border-black/15 px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide text-black">
            Passer un appel
          </CallButton>
          {/* Comme cote Foxy : sur mobile on JOUE la premiere demonstration
              plutot que d'ouvrir la liste. Le panneau garde le retour vers le
              choix et le "voir un autre exemple". */}
          <button
            type="button"
            onClick={() => onPlayDemo(DEMOS[0].id)}
            data-cursor-hover
            className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-black/20 px-6 py-4 text-[13px] font-mono font-bold uppercase tracking-wide text-black/70"
          >
            <PlayGlyph className="w-3 h-3 text-accent" />
            Voir un agent travailler
          </button>
          {/* Cette ligne dit ce que le bandeau du haut ne dit pas : ce qui se
              passe apres le clic. Elle repetait "1 mois d'essai gratuit", deja
              affiche en haut de l'ecran et rappele plus bas. */}
          <p className="mt-1 text-[12.5px] font-mono text-black/55">
            <span className="font-bold text-black">Un échange de 30 minutes</span> sans
            engagement.
          </p>
        </div>

        <motion.form
          onSubmit={submit}
          animate={{ boxShadow: PULSE_SHADOWS }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden sm:flex items-center gap-2 max-w-xl rounded-full border-2 border-accent bg-white pl-5 pr-1.5 py-1.5 focus-within:border-accent-dark"
        >
          <input
            type="text"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            onFocus={playShownDemo}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Décrivez votre besoin"
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] sm:text-base placeholder:text-black/50 py-2"
          />
          <button
            type="submit"
            aria-label="Envoyer ma demande"
            data-cursor-hover
            className="flex items-center justify-center shrink-0 w-11 h-11 rounded-full bg-accent text-accent-ink transition-colors duration-150 ease-out hover:bg-accent-dark"
          >
            <ArrowGlyph className="w-5 h-5" />
          </button>
        </motion.form>

        {/* Le champ ne suffit pas comme porte d'entree : cliquer dedans joue une
            demo, et il faut deja savoir formuler son besoin pour s'en servir.
            Le bouton est la porte evidente vers Nate, qui aide justement a le
            formuler (remontee par Nathan le 13/09 : on n'entrait dans le chat
            qu'en passant par un badge metier, puis en le dementant).
            Au grand ecran, c'est la carte de Nate (colonne droite) qui porte ce
            bouton : le garder ici en ferait deux cote a cote. */}
        <div className="hidden sm:flex lg:hidden mt-5 items-center gap-4">
          <button
            type="button"
            onClick={() => onSubmitNeed(AUDIT_MESSAGE)}
            data-cursor-hover
            className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-accent text-accent-ink px-7 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide transition-all duration-150 ease-out hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg"
          >
            Faire un audit 100% gratuit
            <ArrowGlyph className="w-4 h-4" />
          </button>
          <CallButton className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full border-2 border-black/15 px-7 py-3 text-[13px] font-mono font-bold uppercase tracking-wide text-black transition-colors duration-150 ease-out hover:border-accent">
            Passer un appel
          </CallButton>
        </div>

        {/* Trois demonstrations scriptees : le visiteur voit un agent
            travailler (raisonnement etape par etape) sans rien engager. Au
            bureau seulement : sur telephone, trois puces deviennent trois
            lignes et repoussent tout le reste sous la ligne de flottaison, le
            bouton "Voir un agent travailler" y tient ce role. */}
        <div className="hidden sm:flex mt-4 flex-wrap items-center gap-2">
          {DEMOS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => onPlayDemo(demo.id)}
              data-cursor-hover
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3.5 py-2.5 text-[12.5px] font-mono text-black/70 transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <PlayGlyph className="w-3 h-3 text-accent" />
              {demo.chip}
            </button>
          ))}
        </div>

        {/* Ni "1 mois gratuit" (le bandeau du haut le dit deja) ni lien "En
            savoir plus" : retires a la demande de Nathan le 14/09. */}
      </motion.div>

      {/* La bande d'outils ne vit plus dans le hero : le premier ecran mobile
          se limite desormais au logo, au titre, a une phrase et aux deux
          boutons. Elle reste sur la page, juste apres les temoignages
          (cf. HomePageContent), et en pleine largeur au bureau. */}
    </div>
  );
}
