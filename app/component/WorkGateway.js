import Link from "next/link";
import Reveal from "./Reveal";

const ENTRIES = [
  {
    href: "/agents",
    label: "Voir des cas d'usage",
    title: "Des agents déjà en place",
    description:
      "Une équipe d'agents IA qui prend en charge des tâches réelles : veille, contrôle qualité, prospection, reporting.",
  },
  {
    href: "/projects",
    label: "Voir le portfolio",
    title: "Ce que j'ai construit",
    description:
      "Jeux, outils métier, SaaS : la preuve technique derrière les automatisations.",
  },
];

export default function WorkGateway() {
  return (
    <section className="bg-black text-white">
      <Reveal className="max-w-5xl mx-auto px-6 py-28 md:py-36">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Explorer
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-xl">
          Deux façons de voir ce que je fais.
        </h2>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-16">
          {ENTRIES.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              data-cursor-hover
              className="group flex flex-col transition-transform duration-200 ease-out hover:-translate-y-1"
            >
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                {entry.label}
              </span>
              <h3 className="mt-3 text-2xl font-bold leading-snug transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                {entry.title}
              </h3>
              <p className="mt-3 text-sm opacity-70 leading-relaxed">{entry.description}</p>
              <span className="mt-6 text-xs font-mono opacity-50 group-hover:opacity-100 group-hover:text-[#ff6b35] transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
