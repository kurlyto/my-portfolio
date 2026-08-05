"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ToolStrip from "./ToolStrip";
import VoiceRecorder from "./VoiceRecorder";

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

function MicGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3" />
      <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2.08A7 7 0 0 0 19 11" />
    </svg>
  );
}

export default function ScrambleHero({ onOpenChat, onVoiceResult }) {
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

      {/* CTA unique : le micro EST l'action principale. L'ancien couple
          "je clarifie mon besoin" + "j'explique mon besoin" proposait deux
          portes vers la meme conversation, ce qui faisait hesiter au lieu de
          faire cliquer. L'ecrit devient un repli discret. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        className="mt-6 sm:mt-8"
      >
        {/* La phrase d'exemple et le repli "je prefere ecrire" vivent
            desormais dans la pop-up d'enregistrement : c'est en parlant qu'on
            cherche quoi dire, et c'est la aussi qu'on se ravise. Le hero garde
            une seule action, ce qui le raccourcit d'autant sur mobile. */}
        {/* Deux portes vers la meme conversation, mais chacune assumee : le
            vocal pour qui prefere parler, l'ecrit pour qui prefere taper.
            Empilees en mobile (deux boutons sur une ligne y donneraient des
            cibles trop etroites), cote a cote des lg ou la largeur le permet. */}
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-4">
          <VoiceRecorder
            onResult={onVoiceResult}
            onPreferWriting={onOpenChat}
            motionProps={{
              animate: { boxShadow: PULSE_SHADOWS },
              transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#ff6b35] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-[#e2531f]"
          >
            <MicGlyph className="w-4 h-4 shrink-0" />
            J&apos;explique mon besoin
          </VoiceRecorder>

          {/* Contour plutot que plein : deux aplats orange l'un sous l'autre se
              disputeraient l'oeil, alors que le vocal reste l'action mise en
              avant. */}
          <button
            type="button"
            onClick={onOpenChat}
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#ff6b35] text-[#ff6b35] px-6 sm:px-7 py-3 sm:py-3.5 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-[#ff6b35] hover:text-white"
          >
            Créer mon agent gratuitement
          </button>
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
