"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CallButton from "./CallButton";

const TITLE = "Une tâche que vous n'aimez pas faire ?\nOn l'automatise.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_FRAMES = 18;

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
    <div>
      <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight whitespace-pre-line">
        {displayText}
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
        className="mt-6 text-lg md:text-xl opacity-70 max-w-xl"
      >
        Des tonnes de cas d&apos;usages. Quel est le vôtre ?
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={onOpenChat}
          data-cursor-hover
          className="inline-block text-sm font-mono font-semibold rounded px-6 py-3 whitespace-nowrap transition-all duration-150 ease-out bg-[#ff6b35] text-white hover:bg-[#e2531f] hover:-translate-y-0.5 hover:shadow-lg"
        >
          J&apos;ai une idée en tête !
        </button>
        <CallButton className="inline-flex items-center gap-2 text-sm font-mono opacity-60 hover:opacity-100 hover:text-[#ff6b35] transition-colors">
          ou passer un appel &rarr;
        </CallButton>
      </motion.div>
    </div>
  );
}
