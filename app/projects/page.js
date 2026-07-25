import Header from "../component/Header";
import Footer from "../component/Footer";
import Reveal from "../component/Reveal";

export const metadata = {
  title: "Projects | Nathan Knaebel",
  description: "Ce que j'ai construit : jeux, outils metier, SaaS.",
};

const TECH_STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "Next.js",
  "Node.js",
  "Prisma",
  "Linux",
  "Git",
];

const PROJECTS = [
  {
    name: "Variante de Poker Japonais",
    status: "public",
    description: "Une variante du poker japonais développée avant l'ère de l'IA.",
    years: "2023",
  },
  {
    name: "Featuring",
    status: "public",
    description:
      "Avec qui cet acteur a-t-il joué ? Enchaînez les bonnes réponses dans un ping-pong culturel.",
    years: "2023",
  },
  {
    name: "AI or Not",
    status: "public",
    description: "La photo est-elle générée par IA, ou est-elle réelle ?",
    years: "2023",
  },
  {
    name: "Fichage Notariat & Succession",
    status: "prive",
    description:
      "Deux outils pour études notariales : vérification de l'intégrité et de la solvabilité des clients, et génération automatique de courriers de successions.",
    years: "2023 - 2024",
  },
  {
    name: "Insider Bot",
    status: "public",
    description: "Alerte automatique sur les mouvements d'insiders des marchés de prédiction.",
    years: "2025",
  },
  {
    name: "Mon Devis Dentaire",
    status: "prive",
    description:
      "Plateforme SaaS visant à fluidifier la signature des devis pour les cabinets dentaires. Explications des actes par IA, relances automatiques, prise de rendez-vous et solutions de paiement intégrées.",
    years: "2025 - 2026",
    link: "https://mondevisdentaire.fr",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 pt-8 pb-24">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ingénieur industriel &amp; logiciel
            <br />
            Chef de projet
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg opacity-70 leading-relaxed">
            J&apos;ai travaillé durant 6 ans sur des optimisations de processus industriels avant
            d&apos;allouer plus de temps à ce qui me plaît énormément : développer et concevoir
            des projets et applications pour répondre à des besoins d&apos;utilisateurs (et pour
            mon plaisir personnel !).
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <li
                key={tech}
                className="text-xs font-mono border border-white/20 rounded px-3 py-1 opacity-70 transition-all duration-150 ease-out hover:opacity-100 hover:-translate-y-0.5 hover:border-white/50 cursor-default"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold">Ce que j&apos;ai construit</h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="group relative bg-black p-6 flex flex-col border-r border-b border-white/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_24px_-8px_rgba(255,255,255,0.08)] hover:z-10 cursor-default"
                data-cursor-hover
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold leading-snug transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                    {project.name}
                  </h3>
                  <span
                    className={`shrink-0 text-xs font-mono uppercase tracking-wide px-2 py-0.5 rounded border ${
                      project.status === "public"
                        ? "border-white/30 opacity-70"
                        : "border-white/10 opacity-40"
                    }`}
                  >
                    {project.status === "public" ? "public" : "privé"}
                  </span>
                </div>

                <p className="mt-3 text-sm opacity-70 leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono opacity-50">
                  <span>{project.years}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-100 underline hover:no-underline"
                    >
                      voir le site &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
