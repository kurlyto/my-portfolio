import Reveal from "./Reveal";

const ELON_URL = "https://t.me/Elon_Master_Bot";

const STEPS = [
  {
    number: "01",
    who: "Vous",
    title: "Décrivez votre besoin à Elon",
    description:
      "Dites-nous ce qui vous prend du temps, en langage courant. Pas de cahier des charges à préparer.",
    link: ELON_URL,
  },
  {
    number: "02",
    who: "Ensemble",
    title: "On cadre ce qui manque",
    description:
      "Si des informations manquent pour construire la solution, on vous les demande directement.",
  },
  {
    number: "03",
    who: "Nous",
    title: "On construit, on teste, on ajuste",
    description:
      "Votre système est mis en place puis ajusté jusqu'à ce qu'il fonctionne exactement comme prévu.",
  },
];

export default function HowItWorks() {
  return (
    <Reveal className="max-w-5xl mx-auto px-6 py-24 border-t border-black/10">
      <span className="text-xs font-mono uppercase tracking-widest opacity-50">
        Comment ça marche
      </span>
      <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">
        Décrivez votre besoin. On construit la solution.
      </h2>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
        {STEPS.map((step) => {
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
            <Wrapper key={step.number} {...wrapperProps}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 shrink-0 rounded-full border border-black/20 flex items-center justify-center text-xs font-mono">
                  {step.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                  {step.who}
                </span>
              </div>
              <h3
                className={`mt-4 text-lg font-bold leading-snug transition-colors ${
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
              <p className="mt-2 text-sm opacity-70 leading-relaxed">{step.description}</p>
            </Wrapper>
          );
        })}
      </div>

      <p className="mt-16 pt-8 border-t border-black/10 text-sm italic opacity-50">
        Une automatisation livrée. La suivante peut commencer.
      </p>
    </Reveal>
  );
}
