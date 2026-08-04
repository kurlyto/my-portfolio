import Header from "../component/Header";
import Footer from "../component/Footer";
import Reveal from "../component/Reveal";
import ProjectCards from "../component/ProjectCards";

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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header dark />
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 py-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
            Work
          </span>
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
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold">Ce que j&apos;ai construit</h2>
        </Reveal>

        <ProjectCards />
      </main>

      <Footer />
    </div>
  );
}
