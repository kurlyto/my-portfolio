"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import CallButton from "./CallButton";

const NATE_URL = "https://t.me/AssistantNate_bot";

const STEPS = [
  {
    number: "01",
    who: "Vous",
    title: "Décrivez votre besoin à Nate",
    description:
      "Dites-nous ce qui vous prend du temps, en langage courant. Pas de cahier des charges à préparer.",
    link: NATE_URL,
  },
  {
    number: "02",
    who: "Nous",
    title: "On construit votre agent",
    description:
      "On conçoit, on teste et on ajuste votre agent jusqu'à ce qu'il fasse exactement le travail attendu.",
  },
  {
    number: "03",
    who: "Vous",
    title: "Vous lui parlez, il travaille",
    description:
      "Vous échangez avec votre agent comme avec un nouvel employé : vous lui confiez des tâches, il les exécute.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#fafafa]">
      <Reveal className="max-w-5xl mx-auto px-6 py-28 md:py-36">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Comment ça marche
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Décrivez votre besoin. On construit la solution.
        </h2>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8">
          {STEPS.map((step, i) => {
            const Wrapper = step.link ? "a" : "div";
            const wrapperProps = step.link
              ? {
                  href: step.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-cursor-hover": true,
                  className: "group block",
                }
              : { className: "group" };

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.5, duration: 0.55, ease: "easeOut" }}
              >
                <Wrapper {...wrapperProps}>
                  <span className="block text-6xl font-bold text-[#ff6b35] leading-none">
                    {step.number}
                  </span>
                  <span className="mt-4 block text-xs font-mono uppercase tracking-widest opacity-50">
                    {step.who}
                  </span>
                  <h3
                    className={`font-display mt-2 text-2xl md:text-[1.7rem] font-bold leading-snug transition-colors ${
                      step.link ? "group-hover:text-[#ff6b35]" : ""
                    }`}
                  >
                    {step.title}
                    {step.link && (
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
                        &rarr;
                      </span>
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] opacity-70 leading-relaxed">{step.description}</p>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
          <a
            href={NATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-block text-lg font-mono font-semibold rounded px-10 py-5 whitespace-nowrap transition-all duration-150 ease-out bg-[#ff6b35] text-white hover:bg-[#e2531f] hover:-translate-y-0.5 hover:shadow-lg"
          >
            Commencer
          </a>
          <CallButton className="inline-flex items-center gap-2 text-sm font-mono opacity-60 hover:opacity-100 hover:text-[#ff6b35] transition-colors">
            &rarr; ou passer un appel
          </CallButton>
        </div>
      </Reveal>
    </section>
  );
}
