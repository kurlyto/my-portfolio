"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import { QUESTIONS } from "./faq-questions";


function FaqItem({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="border-b border-black/10">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor-hover
          className="group w-full flex items-start justify-between gap-6 py-6 text-left transition-colors hover:text-[#ff6b35]"
        >
          <span className="font-display text-lg md:text-xl font-bold leading-snug">
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 text-xl leading-none font-mono transition-transform duration-200 ease-out ${
              isOpen ? "rotate-45 text-[#ff6b35]" : "opacity-40 group-hover:opacity-100"
            }`}
          >
            +
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-10 text-[15px] md:text-base opacity-70 leading-relaxed max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  // Une seule reponse ouverte a la fois : la liste reste lisible et on evite
  // que la page ne s'allonge d'un coup. La premiere est ouverte au chargement
  // pour montrer que ca se deplie.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white text-black border-t border-black/10 scroll-mt-20">
      <Reveal className="max-w-5xl mx-auto px-6 py-28 md:py-36">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          FAQ
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Les questions qu&apos;on nous pose en premier.
        </h2>

        <div className="mt-14 border-t border-black/10">
          {QUESTIONS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>

        <p className="mt-12 text-sm font-mono opacity-60">
          Une autre question ?{" "}
          <a
            href="https://t.me/AssistantNate_bot"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="underline underline-offset-4 hover:text-[#ff6b35] transition-colors"
          >
            Posez-la à Nate &rarr;
          </a>
        </p>
      </Reveal>
    </section>
  );
}
