"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import CallButton from "./CallButton";

// Trois etapes CONCRETES : une duree, un livrable, un prix. Les anciennes
// formulations ("on construit votre agent") ne disaient ni combien de temps ni
// ce que ca coute pour commencer - c'est exactement ce que le visiteur veut
// savoir avant de cliquer.
const STEPS = [
  {
    number: "01",
    who: "Vous",
    title: "On s'appelle une demi-heure",
    description:
      "On parle de votre activité et de vos outils puis on prépare le cahier des charges ensemble.",
    opensChat: true,
  },
  {
    number: "02",
    who: "Nous",
    title: "On déploie votre agent",
    description:
      "On le construit et on le connecte à vos outils. On définit ensemble ce qu'il fait seul et ce qui attend votre validation.",
  },
  {
    number: "03",
    who: "Vous",
    title: "Vous testez et on affine",
    description:
      "Votre agent est prêt et vous le testez un mois complet gratuitement et sans engagement. On voit ensemble s'il y a des ajustements à faire.",
  },
];

// `onStart` ouvre le chat Nate sur la page, amorce sur l'audit. Avant, ces
// liens partaient vers le bot Telegram : le visiteur quittait le site, et sans
// l'application il ne pouvait meme pas ecrire.
export default function HowItWorks({ onStart }) {
  return (
    <section className="bg-[#fafafa]">
      <Reveal className="max-w-5xl mx-auto px-6 py-16 md:py-36">
        <span className="kicker text-xs font-mono uppercase tracking-widest">
          Démarrer
        </span>
        {/* Le titre pose la question du visiteur, mot pour mot. Une formule
            plus travaillee ("Decrivez votre besoin, on construit la solution")
            se lit comme une promesse commerciale : ici on veut juste qu'il
            comprenne qu'il va avoir la reponse. */}
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Comment ça marche ?
        </h2>

        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-8">
          {STEPS.map((step, i) => {
            const clickable = step.opensChat && onStart;
            const Wrapper = clickable ? "button" : "div";
            const wrapperProps = clickable
              ? {
                  type: "button",
                  onClick: onStart,
                  "data-cursor-hover": true,
                  className: "group block w-full text-left",
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
                  <span className="block text-6xl font-bold text-accent leading-none">
                    {step.number}
                  </span>
                  <span className="mt-4 block text-xs font-mono uppercase tracking-widest opacity-50">
                    {step.who}
                  </span>
                  <h3
                    className={`font-display mt-2 text-2xl md:text-[1.7rem] font-bold leading-snug transition-colors ${
                      clickable ? "group-hover:text-accent" : ""
                    }`}
                  >
                    {step.title}
                    {clickable && (
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

        <div className="mt-12 md:mt-20 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={onStart}
            data-cursor-hover
            className="inline-block text-lg font-mono font-semibold rounded px-10 py-5 whitespace-nowrap transition-all duration-150 ease-out bg-accent text-accent-ink hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg"
          >
            Faire un audit gratuit
          </button>
          <CallButton className="inline-flex items-center gap-2 py-2 px-2 text-sm font-mono opacity-60 hover:opacity-100 hover:text-accent transition-colors">
            &rarr; ou passer un appel
          </CallButton>
        </div>
      </Reveal>
    </section>
  );
}
