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
    <Reveal className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/10">
        {ENTRIES.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            data-cursor-hover
            className="group relative bg-black p-8 flex flex-col border-r border-b border-white/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_24px_-8px_rgba(255,255,255,0.08)] hover:z-10"
          >
            <span className="text-xs font-mono uppercase tracking-widest opacity-50">
              {entry.label}
            </span>
            <h3 className="mt-3 text-xl font-bold leading-snug transition-transform duration-200 ease-out group-hover:translate-x-0.5">
              {entry.title}
            </h3>
            <p className="mt-3 text-sm opacity-70 leading-relaxed">{entry.description}</p>
            <span className="mt-6 text-xs font-mono opacity-50 group-hover:opacity-100 transition-opacity">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
