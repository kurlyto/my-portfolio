import Header from "../component/Header";
import Footer from "../component/Footer";
import Reveal from "../component/Reveal";
import AgentsExplorer from "./AgentsExplorer";

export const metadata = {
  title: "Agents IA sur mesure | Nathan Knaebel",
  description:
    "Des agents IA autonomes qui prennent en charge des tâches réelles de votre entreprise : support, qualité, veille, prospection, reporting.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="bg-black text-white">
        <Header dark />
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
            Work
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Une équipe d&apos;agents IA
            <br />
            qui travaille pendant que vous dormez
          </h1>
          <p className="mt-6 text-base md:text-lg opacity-70 leading-relaxed max-w-2xl">
            Voici des exemples d&apos;agents autonomes déjà en place, chacun avec une mission
            précise : surveiller, vérifier, prospecter, résumer. Le même principe peut être
            adapté à vos propres processus, quel que soit votre secteur.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <Reveal>
          <AgentsExplorer />
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
