"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TITLE = "Une tâche que vous n'aimez pas faire ?\nOn l'automatise.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TOTAL_FRAMES = 18;

export default function ScrambleHero() {
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
    <section className="min-h-[80vh] flex flex-col justify-center max-w-6xl mx-auto px-6">
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
    </section>
  );
}
