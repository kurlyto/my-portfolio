"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ToolStrip from "./ToolStrip";

const TITLE = "Un coup de baguette magique\npour votre business.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_FRAMES = 18;

// Halo qui respire autour du CTA principal : attire l'oeil sans clignotement
// agressif (l'ombre s'etend puis retombe, la couleur ne change jamais).
const PULSE_SHADOWS = [
  "0 0 0 0 rgba(255,107,53,0.45)",
  "0 0 0 14px rgba(255,107,53,0)",
  "0 0 0 0 rgba(255,107,53,0)",
];

function ChatGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3C6.9 3 3 6.5 3 11c0 2.2 1 4.2 2.6 5.6-.2 1-.7 2.1-1.5 3 -.2.2 0 .6.3.6 1.9-.1 3.5-.8 4.6-1.5 .9.2 1.9.4 3 .4 5.1 0 9-3.5 9-8s-3.9-8-9-8z" />
    </svg>
  );
}

export default function ScrambleHero({ onOpenChat }) {
  const [displayText, setDisplayText] = useState(TITLE);

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

  return (
    <div className="min-w-0">
      {/* Taille fluide plutot que deux paliers : entre 320px et 430px de large,
          un 4xl fixe faisait passer le titre de 2 a 4 lignes et poussait le CTA
          hors de l'ecran. Le clamp suit la largeur reelle du viewport. */}
      {/* Sur un ecran court (< 720px de haut), le titre et le sous-titre sont
          reduits d'un cran : avec deux CTA empiles, la taille pleine poussait le
          second bouton sous la ligne de flottaison sur les petits modeles
          (320x568). Au-dela, rien ne change. */}
      <h1 className="font-display text-[clamp(1.65rem,7.4vw,2.2rem)] tall:text-[clamp(1.9rem,8.2vw,2.6rem)] md:text-[3.4rem] font-black tracking-tight leading-[1.06] md:leading-[1.08] whitespace-pre-line text-balance">
        {displayText}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        // Serif en italique, mais en graisse normale et sans voile
        // d'opacite : en `font-light` a 75 % la promesse principale du site
        // passait pour une legende secondaire alors que c'est la phrase qui
        // explique ce qu'on vend. Elle doit se lire d'emblee, juste en dessous
        // du titre.
        className="font-display mt-3 tall:mt-4 sm:mt-6 text-[15px] tall:text-[17px] sm:text-xl md:text-[1.35rem] font-normal italic leading-snug sm:leading-relaxed text-black/90 max-w-xl text-balance"
      >
        Mails, devis, comptabilité, agenda : je déploie un agent sur-mesure qui
        gère votre business comme un employé.
      </motion.p>

      {/* Deux CTA, deux intentions distinctes. L'ancien couple vocal + ecrit
          ouvrait la MEME conversation par deux portes, ce qui faisait hesiter
          au lieu de faire cliquer. Desormais : expliquer son besoin (le chat,
          ou l'on peut ecrire comme dicter via le micro de la barre) ou se
          reconnaitre d'abord dans son metier (ancre vers la section metiers). */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        className="mt-6 sm:mt-8"
      >
        {/* Empiles en mobile (deux boutons sur une ligne y donneraient des
            cibles trop etroites), cote a cote des lg ou la largeur le permet. */}
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-4">
          <motion.button
            type="button"
            onClick={onOpenChat}
            data-cursor-hover
            animate={{ boxShadow: PULSE_SHADOWS }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#ff6b35] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-[#e2531f]"
          >
            <ChatGlyph className="w-4 h-4 shrink-0" />
            J&apos;explique mon besoin
          </motion.button>

          {/* Contour plutot que plein : deux aplats orange l'un a cote de
              l'autre se disputeraient l'oeil, alors qu'expliquer son besoin
              reste l'action mise en avant. Une ancre et non un bouton : elle
              descend a la section metiers (scroll-behavior: smooth global).
              Fragment nu et non /#metiers : le hero ne vit que sur la home,
              et un href commencant par / declenche no-html-link-for-pages. */}
          <a
            href="#metiers"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#ff6b35] text-[#ff6b35] px-6 sm:px-7 py-3 sm:py-3.5 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-[#ff6b35] hover:text-white"
          >
            Quel agent pour mon métier ?
          </a>
        </div>

        <p className="mt-4 text-[13px] sm:text-sm font-mono font-bold text-[#ff6b35]">
          Testez votre agent pendant 1 mois gratuitement sans engagement
        </p>
      </motion.div>

      {/* La bande d'outils est un bonus : elle ne doit jamais pousser le CTA
          sous la ligne de flottaison. Masquee sur les ecrans vraiment courts
          (< 720px de haut), ou le hero a deja consomme toute la hauteur utile.
          En desktop (lg+) elle vit sous le carrousel de temoignages, en colonne
          droite : cette colonne a de la place libre sous les temoignages, alors
          que la colonne gauche est deja chargee (titre, sous-titre, 2 CTA). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
        // `lg:hidden` ne suffit pas a annuler `tall:block` : les deux variantes
        // ont la meme specificite et `tall` est declaree apres dans le CSS
        // genere, donc elle l'emporte. On borne donc explicitement la variante
        // `tall` aux ecrans < lg avec max-lg.
        className="hidden tall:max-lg:block"
      >
        <ToolStrip />
      </motion.div>
    </div>
  );
}
