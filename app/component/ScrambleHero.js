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
      <h1 className="font-display text-[clamp(1.9rem,8.2vw,2.6rem)] md:text-[3.4rem] font-black tracking-tight leading-[1.06] md:leading-[1.08] whitespace-pre-line text-balance">
        {displayText}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        // Serif en graisse legere et italique : discret a cote du titre en
        // gras, mais moins plat qu'un sans-serif standard.
        className="font-display mt-4 sm:mt-6 text-[15px] sm:text-lg md:text-xl font-light italic leading-snug sm:leading-relaxed opacity-75 max-w-xl text-balance"
      >
        Mails, devis, comptabilité, agenda : je déploie un agent sur-mesure qui
        gère votre business.
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
        <VoiceRecorder
          onResult={onVoiceResult}
          motionProps={{
            animate: { boxShadow: PULSE_SHADOWS },
            transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="inline-flex items-center gap-2.5 rounded-full bg-[#ff6b35] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-[#e2531f]"
        >
          <MicGlyph className="w-4 h-4 shrink-0" />
          J&apos;explique mon besoin
        </VoiceRecorder>

        <p className="mt-3 text-[12px] sm:text-[13px] opacity-55 leading-snug max-w-md">
          Dites par exemple : «&nbsp;Je souhaite déléguer ma prospection&nbsp;»
          ou «&nbsp;J&apos;ai besoin d&apos;aide sur ma comptabilité&nbsp;».
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={onOpenChat}
            data-cursor-hover
            className="text-[12px] sm:text-[13px] font-mono underline underline-offset-4 opacity-60 hover:opacity-100 hover:text-[#ff6b35] transition-colors"
          >
            Je préfère écrire &rarr;
          </button>
          <p className="text-[12px] sm:text-[13px] font-mono font-bold text-[#ff6b35]">
            1 mois offert, sans engagement
          </p>
        </div>
      </motion.div>

      {/* La bande d'outils est un bonus : elle ne doit jamais pousser le CTA
          sous la ligne de flottaison. Masquee seulement sur les ecrans vraiment
          courts (<640px de haut, type iPhone SE paysage ou vieux petits
          modeles), ou le hero a deja consomme toute la hauteur utile. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
        className="hidden tall:block lg:block"
      >
        <ToolStrip />
      </motion.div>
    </div>
  );
}
