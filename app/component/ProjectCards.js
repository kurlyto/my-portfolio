"use client";

import { motion } from "framer-motion";
import {
  NextJsIcon,
  ReactIcon,
  TypeScriptIcon,
  PythonIcon,
  NodeJsIcon,
  TailwindIcon,
  ViteIcon,
  SocketIoIcon,
  SupabaseIcon,
  ExpressIcon,
  GovApiIcon,
  PrismaIcon,
  PostgresIcon,
  TelegramIcon,
} from "./tech-icons";

// Les icones sont des composants : elles ne peuvent pas traverser la
// frontiere Server -> Client Component en tant que reference de fonction
// (Next.js le refuse). La liste des projets vit donc ici, cote client,
// plutot que dans page.js.
const PROJECTS = [
  {
    name: "Agents IA sur-mesure",
    description:
      "Une équipe d'agents IA employés (Camille, Ousmane, Kylian, Lea...) qui gèrent mails, agenda, prospection, réseaux et pilotage à la place du client, disponibles sur Telegram.",
    years: "2026",
    link: "/agents",
    cover: "from-zinc-800 to-zinc-900",
    coverImage: "/images/cover-agents.png",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: PythonIcon, label: "Python" },
      { icon: TelegramIcon, label: "Telegram" },
    ],
  },
  {
    name: "Variante de Poker Japonais",
    description: "Une variante du poker japonais développée avant l'ère de l'IA.",
    years: "2023",
    link: "https://poker.nathan-knaebel.com",
    cover: "from-emerald-800 to-emerald-950",
    coverImage: "/images/cover-poker.png",
    tech: [
      { icon: ReactIcon, label: "React" },
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: ViteIcon, label: "Vite" },
      { icon: SocketIoIcon, label: "Socket.io" },
      { icon: TailwindIcon, label: "Tailwind CSS" },
    ],
  },
  {
    name: "Featuring",
    description:
      "Avec qui cet acteur a-t-il joué ? Enchaînez les bonnes réponses dans un ping-pong culturel.",
    years: "2023",
    link: "https://featuring.nathan-knaebel.com",
    cover: "from-zinc-100 to-zinc-200",
    coverImage: "/images/cover-featuring.png",
    coverImageFit: "contain",
    tech: [
      { icon: PythonIcon, label: "Python" },
      { icon: NodeJsIcon, label: "Node.js" },
    ],
  },
  {
    name: "AI or Not",
    description: "La photo est-elle générée par IA, ou est-elle réelle ?",
    years: "2023",
    cover: "from-sky-600 to-indigo-900",
    tech: [
      { icon: NextJsIcon, label: "Next.js" },
      { icon: ReactIcon, label: "React" },
      { icon: SupabaseIcon, label: "Supabase" },
      { icon: TailwindIcon, label: "Tailwind CSS" },
    ],
  },
  {
    name: "Fichage Notariat",
    description:
      "Vérification de l'intégrité et de la solvabilité des clients pour études notariales, via croisement de sources publiques (BODACC, registre des entreprises).",
    years: "2023 - 2024",
    cover: "from-slate-600 to-slate-900",
    coverImage: "/images/cover-notariat.png",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: ExpressIcon, label: "Express" },
      { icon: GovApiIcon, label: "API gouv.fr" },
    ],
  },
  {
    name: "Courrier de succession",
    description: "Génération automatique de courriers de successions pour études notariales.",
    years: "2023 - 2024",
    cover: "from-amber-600 to-orange-900",
    coverImage: "/images/cover-succession.png",
    tech: [
      { icon: NextJsIcon, label: "Next.js" },
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: TailwindIcon, label: "Tailwind CSS" },
    ],
  },
  {
    name: "Insider Bot",
    description: "Alerte automatique sur les mouvements d'insiders des marchés de prédiction.",
    years: "2025",
    cover: "from-zinc-100 to-zinc-200",
    coverImage: "/images/cover-insider.png",
    tech: [
      { icon: PythonIcon, label: "Python" },
      { icon: TelegramIcon, label: "Telegram" },
    ],
  },
  {
    name: "Mon Devis Dentaire",
    description:
      "Plateforme SaaS visant à fluidifier la signature des devis pour les cabinets dentaires. Explications des actes par IA, relances automatiques, prise de rendez-vous et solutions de paiement intégrées.",
    years: "2025 - 2026",
    link: "https://mondevisdentaire.fr",
    cover: "from-slate-50 to-slate-100",
    coverImage: "/images/cover-mdd.png",
    coverImageFit: "contain",
    tech: [
      { icon: NextJsIcon, label: "Next.js" },
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: PrismaIcon, label: "Prisma" },
      { icon: PostgresIcon, label: "PostgreSQL" },
    ],
  },
  {
    name: "Photographies",
    description: "Une sélection de mes photographies, avec une direction artistique qui lui est propre.",
    years: "2026",
    link: "/photography",
    cover: "from-neutral-700 to-neutral-950",
  },
];

// Couverture de carte : vraie image (screenshot/logo) quand disponible,
// sinon degrade + icone du premier outil de la stack en placeholder. Badge
// annee en haut a droite, tres discret (comme le compteur "13/52" de la
// reference bewide), a la place du badge public/prive retire.
function CoverPlaceholder({ project }) {
  const FirstIcon = project.tech?.[0]?.icon;
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${project.cover}`}
    >
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt=""
          className={`h-full w-full ${
            project.coverImageFit === "contain" ? "object-contain p-4" : "object-cover"
          }`}
        />
      ) : (
        FirstIcon && <FirstIcon className="h-14 w-14 text-white/25" />
      )}
      <span className="absolute right-3 top-3 rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-mono text-white/70 backdrop-blur-sm">
        {project.years}
      </span>
    </div>
  );
}

// Carte epuree type "bewide" : image en haut, titre, description legere.
// Hauteur fixe (h-[520px]) pour que toutes les cartes s'alignent pile, quelle
// que soit la longueur du texte : la description est tronquee a 3 lignes
// (line-clamp) et tools/bouton sont ancres tout en bas via mt-auto.
function ProjectCard({ project, index }) {
  const isExternal = project.link?.startsWith("http");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className="group flex h-[520px] flex-col rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_40px_-20px_rgba(0,0,0,0.18)]"
    >
      <CoverPlaceholder project={project} />

      <div className="flex flex-1 flex-col px-2 pb-1 pt-6">
        <h3 className="text-2xl font-bold leading-snug tracking-tight">
          {project.name}
        </h3>

        <p className="mt-3 text-[15px] opacity-60 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          {project.tech && (
            <ul className="flex items-center gap-2.5">
              {project.tech.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  title={label}
                  className="opacity-40 transition-opacity duration-150 hover:opacity-80"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </li>
              ))}
            </ul>
          )}

          {project.link && (
            <a
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3.5 py-1.5 text-[13px] font-semibold text-black transition-colors duration-150 hover:bg-black hover:text-white"
            >
              Découvrir <span aria-hidden>&rarr;</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Desktop/tablette : grille, plusieurs cartes par ligne. Mobile : une colonne,
// defilement vertical natif de la page (pas de scroll horizontal ni de snap
// agressif qui faisait "sauter" plusieurs cartes d'un coup au swipe).
export default function ProjectCards() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
}
