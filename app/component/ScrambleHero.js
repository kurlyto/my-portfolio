"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CallButton from "./CallButton";
import ToolStrip from "./ToolStrip";

const TITLE = "Des agents sur-mesure\nqui bossent pour vous.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_FRAMES = 18;

// Halo qui respire autour du CTA principal : attire l'oeil sans clignotement
// agressif (l'ombre s'etend puis retombe, la couleur ne change jamais).
const PULSE_SHADOWS = [
  "0 0 0 0 rgba(255,107,53,0.45)",
  "0 0 0 14px rgba(255,107,53,0)",
  "0 0 0 0 rgba(255,107,53,0)",
];

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
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] whitespace-pre-line">
        {displayText}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        className="mt-6 text-lg md:text-xl opacity-70 max-w-xl"
      >
        Mails, agenda, prospection, comptabilité, réseaux sociaux : je conçois
        l&apos;agent qui s&apos;occupe de ce que vous ne voulez plus faire.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        <motion.button
          type="button"
          onClick={onOpenChat}
          data-cursor-hover
          animate={{ boxShadow: PULSE_SHADOWS }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block text-[13px] md:text-sm font-mono font-bold rounded px-6 py-4 uppercase tracking-wide transition-transform duration-150 ease-out bg-[#ff6b35] text-white hover:bg-[#e2531f] hover:-translate-y-0.5"
        >
          Je clarifie mon besoin gratuitement
        </motion.button>
        <CallButton className="inline-flex items-center gap-2 text-[13px] md:text-sm font-mono font-semibold rounded px-5 py-4 border-2 border-black text-black whitespace-nowrap transition-all duration-150 ease-out hover:bg-black hover:text-white hover:-translate-y-0.5">
          Passer un appel &rarr;
        </CallButton>
        <p className="w-full text-xs font-mono opacity-50">
          Gratuit, sans engagement - on cadre votre besoin, vous repartez avec
          une réponse claire.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
      >
        <ToolStrip />
      </motion.div>
    </div>
  );
}
