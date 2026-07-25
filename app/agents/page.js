import Header from "../component/Header";
import Footer from "../component/Footer";
import Reveal from "../component/Reveal";

export const metadata = {
  title: "Agents IA sur mesure | Nathan Knaebel",
  description:
    "Des agents IA autonomes qui prennent en charge des tâches réelles de votre entreprise : support, qualité, veille, prospection, reporting.",
};

const AGENTS = [
  {
    slug: "didier",
    name: "Didier",
    titleFr: "Chef d'orchestre",
    titleEn: "Orchestrator",
    description:
      "Coordonne toute l'équipe d'agents, agrège leurs rapports et surveille qui a bien tourné. Un point d'entrée unique pour piloter tout le système.",
    format: "Rapport de supervision",
    channel: "Chat interne",
  },
  {
    slug: "marcel",
    name: "Marcel",
    titleFr: "Surveillance infrastructure",
    titleEn: "Infrastructure Monitoring",
    description:
      "Surveille en continu la santé de vos serveurs : charge, stockage, sauvegardes, certificats. Alerte avant que le problème devienne visible pour vos clients.",
    format: "Alertes + rapport d'état",
    channel: "Email",
  },
  {
    slug: "simone",
    name: "Simone",
    titleFr: "Diagnostic de bugs",
    titleEn: "Bug Diagnostics",
    description:
      "Analyse les erreurs et incidents en production, lit le code source pour trouver la cause racine, et propose un correctif prêt à valider.",
    format: "Rapport de diagnostic",
    channel: "Email",
  },
  {
    slug: "hugo",
    name: "Hugo",
    titleFr: "Veille sectorielle",
    titleEn: "Market Intelligence",
    description:
      "Surveille l'actualité de votre secteur : concurrents, réglementation, tendances du marché. Vous tient informé sans passer des heures à chercher.",
    format: "Synthèse de veille",
    channel: "Email",
  },
  {
    slug: "kylian",
    name: "Kylian",
    titleFr: "Analyse business",
    titleEn: "Business Analytics",
    description:
      "Suit vos indicateurs clés en continu : conversions, délais, chiffre d'affaires, trafic. Détecte les tendances et propose des pistes d'amélioration.",
    format: "Tableau de bord + rapport",
    channel: "Email",
  },
  {
    slug: "ousmane",
    name: "Ousmane",
    titleFr: "Prospection commerciale",
    titleEn: "Sales Prospecting",
    description:
      "Recherche de nouveaux prospects qualifiés, extrait leurs coordonnées et alimente votre pipeline commercial automatiquement, jour après jour.",
    format: "Liste de prospects",
    channel: "Google Sheets",
  },
  {
    slug: "camille",
    name: "Camille",
    titleFr: "Assistante de direction",
    titleEn: "Executive Assistant",
    description:
      "Gère les mails, l'agenda et les tâches du dirigeant. Fait la synthèse de la semaine et répond aux questions du quotidien en langage naturel.",
    format: "Synthèse quotidienne",
    channel: "Telegram",
  },
  {
    slug: "jo",
    name: "Jo",
    titleFr: "Contrôle qualité documents",
    titleEn: "Document QA",
    description:
      "Vérifie chaque document généré avant envoi : structure, champs obligatoires, cohérence des montants. Une relecture automatique qui ne dort jamais.",
    format: "Alerte + document annoté",
    channel: "Email",
  },
  {
    slug: "mike",
    name: "Mike",
    titleFr: "Suivi produit",
    titleEn: "Product Updates",
    description:
      "Résume chaque jour les nouveautés livrées en production, traduites en langage clair pour tout comprendre sans avoir à lire le code.",
    format: "Résumé quotidien",
    channel: "Email",
  },
  {
    slug: "lea",
    name: "Lea",
    titleFr: "Marketing & communication",
    titleEn: "Marketing & Content",
    description:
      "Propose chaque semaine des idées de publications pour vos réseaux, prêtes à relire et publier. Vous gardez la main, elle fait le premier jet.",
    format: "Propositions de posts",
    channel: "Email",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 pt-8 pb-24">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Une équipe d&apos;agents IA
            <br />
            qui travaille pendant que vous dormez
          </h1>
          <p className="mt-6 text-base md:text-lg opacity-70 leading-relaxed max-w-2xl">
            Voici des exemples d&apos;agents autonomes déjà en place, chacun avec une mission
            précise : surveiller, vérifier, prospecter, résumer. Le même principe peut être
            adapté à vos propres processus, quel que soit votre secteur.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {AGENTS.map((agent) => (
            <div
              key={agent.slug}
              className="group relative bg-black p-6 flex flex-col border-r border-b border-white/10 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_12px_24px_-8px_rgba(255,255,255,0.08)] hover:z-10 cursor-default"
              data-cursor-hover
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-sm font-mono opacity-70 transition-transform duration-200 ease-out group-hover:scale-110">
                  {agent.name.charAt(0)}
                </div>
                <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                  {agent.name}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-bold leading-snug transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                {agent.titleFr}
              </h2>
              <p className="text-xs font-mono opacity-50 mt-0.5">{agent.titleEn}</p>

              <p className="mt-3 text-sm opacity-70 leading-relaxed flex-1">
                {agent.description}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-1 text-xs font-mono opacity-50">
                <span>format : {agent.format.toLowerCase()}</span>
                <span>canal : {agent.channel.toLowerCase()}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
