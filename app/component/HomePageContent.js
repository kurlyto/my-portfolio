import Link from "next/link";
import CtaButton from "./CtaButton";

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

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <header className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-6 max-w-6xl mx-auto">
        <div />

        <nav className="flex items-center justify-center gap-10 text-sm font-mono uppercase tracking-widest opacity-80">
          <Link href="#expertise" className="whitespace-nowrap hover:opacity-100">
            Expertise
          </Link>
          <Link href="#projets" className="whitespace-nowrap hover:opacity-100">
            Projets
          </Link>
          <Link href="/agents" className="whitespace-nowrap hover:opacity-100">
            Agents IA
          </Link>
          <Link href="#a-propos" className="whitespace-nowrap hover:opacity-100">
            A propos
          </Link>
          <Link href="#temoignages" className="whitespace-nowrap hover:opacity-100">
            Témoignages
          </Link>
        </nav>

        <div className="justify-self-end">
          <CtaButton href="#contact">Me contacter</CtaButton>
        </div>
      </header>

      <main className="mx-auto max-w-5xl pt-16 space-y-24 pb-24">
        <section id="expertise" className="scroll-mt-24">
          <h2 className="text-xs font-mono uppercase tracking-widest opacity-50">Expertise</h2>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
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
        </section>

        <section id="projets" className="scroll-mt-24">
          <h2 className="text-xs font-mono uppercase tracking-widest opacity-50">Projets</h2>
          <h3 className="mt-3 text-2xl md:text-3xl font-bold">Ce que j&apos;ai construit</h3>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="group relative bg-black p-6 flex flex-col border-r border-b border-white/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_24px_-8px_rgba(255,255,255,0.08)] hover:z-10 cursor-default"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-bold leading-snug transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                    {project.name}
                  </h4>
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
        </section>

        <section id="a-propos" className="scroll-mt-24">
          <h2 className="text-xs font-mono uppercase tracking-widest opacity-50">A propos</h2>
          <p className="mt-4 opacity-70">Bio / parcours</p>
        </section>

        <section id="temoignages" className="scroll-mt-24">
          <h2 className="text-xs font-mono uppercase tracking-widest opacity-50">Témoignages</h2>
          <p className="mt-4 opacity-70">A venir</p>
        </section>

        <section id="contact" className="scroll-mt-24 pb-4 border-t border-white/10 pt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Me contacter</h2>
          <div className="mt-6 flex flex-col items-center gap-2 text-sm font-mono opacity-70">
            <a href="mailto:nathan.knaebel@gmail.com" className="hover:opacity-100 underline">
              nathan.knaebel@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/nathanknaebel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline"
            >
              linkedin.com/in/nathanknaebel
            </a>
            <a
              href="https://github.com/nknaebel"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline"
            >
              github.com/nknaebel
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
