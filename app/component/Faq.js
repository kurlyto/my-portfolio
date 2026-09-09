"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";
import { QUESTIONS } from "./faq-questions";


// Rend une reponse dont les passages **entre asterisques** (voir
// faq-questions.js) ressortent en gras orange : la reponse se scanne d'un
// coup d'oeil, les phrases cles d'abord, le detail ensuite.
function EmphasizedAnswer({ text }) {
  // split("**") alterne texte nu / texte emphase : les segments impairs
  // etaient entre marqueurs.
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-accent">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

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
          className="group w-full flex items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
        >
          {/* La question ouverte passe en orange : dans une liste de 8 items,
              l'oeil retrouve immediatement celle qui est depliee. */}
          <span
            className={`font-display text-lg md:text-xl font-bold leading-snug transition-colors duration-200 ${
              isOpen ? "text-accent" : ""
            }`}
          >
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className={`mt-1 shrink-0 text-xl leading-none font-mono transition-transform duration-200 ease-out ${
              isOpen ? "rotate-45 text-accent" : "opacity-40 group-hover:opacity-100"
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
            {/* opacity-70 remplacee par un gris du texte : une opacite sur le
                parent delaverait aussi les passages orange. */}
            <p className="pb-7 pr-10 text-[15px] md:text-base text-black/70 leading-relaxed max-w-3xl">
              <EmphasizedAnswer text={item.a} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * `questions` : la liste a afficher. Par defaut celle du site agents ; le site
 * AIOS passe la sienne (QUESTIONS_AIOS), les deux offres n'appelant pas les
 * memes objections. La page qui affiche une liste doit generer le balisage
 * FAQPage correspondant : Google traite un FAQPage sans equivalent a l'ecran
 * comme du balisage trompeur.
 */
export default function Faq({
  questions = QUESTIONS,
  askLabel = "Posez-la à Nate",
  // Le site AIOS pose ses sections sur un creme chaud, pas sur du blanc pur :
  // il passe donc sa propre surface plutot que de dupliquer le composant.
  surfaceClass = "bg-white text-black",
}) {
  // Une seule reponse ouverte a la fois : la liste reste lisible et on evite
  // que la page ne s'allonge d'un coup. Toutes fermees au chargement (demande
  // Nathan 16/08) : la premiere ouverte d'office alourdissait la section.
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className={`${surfaceClass} border-t border-black/10`}>
      <Reveal className="max-w-5xl mx-auto px-6 py-28 md:py-36">
        {/* Ancre sur le titre, pas sur la section : la section porte 112 px de
            padding, un lien "FAQ" y arrivait sur du vide. */}
        <span
          id="faq"
          className="scroll-mt-10 text-xs font-mono uppercase tracking-widest text-accent"
        >
          FAQ
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Les questions qu&apos;on nous pose en premier.
        </h2>

        <div className="mt-14 border-t border-black/10">
          {questions.map((item, i) => (
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
            className="inline-flex items-center py-2 underline underline-offset-4 hover:text-accent transition-colors"
          >
            {askLabel} &rarr;
          </a>
        </p>
      </Reveal>
    </section>
  );
}
