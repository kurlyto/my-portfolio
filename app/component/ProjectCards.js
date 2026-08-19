"use client";

import { useEffect, useState } from "react";
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
// Ordre = importance editoriale (les projets phares en premier), pas
// chronologie : c'est le haut de la liste qui est vu sur telephone, ou une
// carte occupe tout l'ecran.
const PROJECTS = [
  {
    name: "Featuring Club",
    description:
      "Ces joueurs ont-ils été coéquipiers ? Avec qui cet acteur a-t-il joué ? Enchaînez les bonnes réponses dans un ping-pong culturel !",
    years: "2023",
    link: "https://featuring.club",
    cover: "from-zinc-100 to-zinc-200",
    coverImage: "/images/cover-featuring.png",
    coverImageFit: "contain",
    tech: [
      { icon: PythonIcon, label: "Python" },
      { icon: NodeJsIcon, label: "Node.js" },
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
    name: "Agents IA sur-mesure",
    description:
      "Un employé qui fait ce que vous n'avez pas envie de faire, et qui ne dort jamais. Mails, agenda, prospection, réseaux, relances : il s'en occupe pendant que vous gérez le reste. Vous lui parlez sur Telegram, comme à un collègue.",
    years: "2026",
    link: "/",
    cover: "from-zinc-800 to-zinc-900",
    coverImage: "/images/cover-agents.png",
    // Logo NK sur fond transparent : comme FeatuRing et MDD, il doit rester
    // ENTIER. Sans ce drapeau le desktop passe en object-cover et rogne le
    // logo dans le cadre 4/3 (meme piege que le logo Insider Bot coupe).
    coverImageFit: "contain",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: PythonIcon, label: "Python" },
      { icon: TelegramIcon, label: "Telegram" },
    ],
  },
  {
    name: "AI or Not",
    description:
      "La photo est-elle générée par IA, ou est-elle réelle ? Saurez-vous faire la différence ?",
    years: "2023",
    cover: "from-sky-600 to-indigo-900",
    coverImage: "/images/cover-aiornot.png",
    tech: [
      { icon: NextJsIcon, label: "Next.js" },
      { icon: ReactIcon, label: "React" },
      { icon: SupabaseIcon, label: "Supabase" },
      { icon: TailwindIcon, label: "Tailwind CSS" },
    ],
  },
  {
    name: "Variante de Poker Japonais",
    description: "Une variante du poker japonais en 1 contre 1.",
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
    name: "Photographies",
    description:
      "Une sélection de mes photographies, avec une direction artistique qui lui est propre.",
    years: "2026",
    status: "En construction",
    link: "/photography",
    cover: "from-neutral-700 to-neutral-950",
  },
  {
    name: "Fetamap",
    description: "Une carte pour retrouver les meilleures adresses, sélectionnées à la main.",
    years: "2026",
    status: "En construction",
    cover: "from-teal-700 to-teal-950",
  },
  {
    name: "Fetafrance",
    description: "Le meilleur de la France, adresse par adresse, région par région.",
    years: "2026",
    status: "En construction",
    cover: "from-indigo-700 to-indigo-950",
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
      className={`relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br sm:aspect-[4/3] sm:flex-none ${project.cover}`}
    >
      {project.coverImage ? (
        // `object-cover` recadre pour remplir : acceptable dans le cadre 4/3 du
        // desktop, desastreux sur mobile ou la carte plein ecran rend la zone
        // bien plus haute que large (une image 4/3 y perdait ~60% de sa largeur,
        // d'ou le logo Insider Bot coupe). Sur telephone on affiche donc toujours
        // l'image entiere, et c'est le degrade qui comble autour.
        <img
          src={project.coverImage}
          alt=""
          className={`h-full w-full object-contain p-4 ${
            project.coverImageFit === "contain" ? "sm:object-contain" : "sm:p-0 sm:object-cover"
          }`}
        />
      ) : FirstIcon ? (
        <FirstIcon className="h-14 w-14 text-white/25" />
      ) : (
        // Sans capture ni stack (projets encore en construction), un degrade nu
        // occupe tout l'ecran sur mobile et fait "carte vide" : l'initiale
        // donne un point d'accroche visuel.
        <span className="font-display text-7xl font-bold text-white/15">
          {project.name.charAt(0)}
        </span>
      )}
      <div className="absolute right-3 top-3 flex items-center gap-1.5">
        {project.status && (
          <span className="rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-mono text-white/85 backdrop-blur-sm">
            {project.status}
          </span>
        )}
        <span className="rounded-full bg-black/20 px-2.5 py-1 text-[11px] font-mono text-white/70 backdrop-blur-sm">
          {project.years}
        </span>
      </div>
    </div>
  );
}

// Meme point de bascule que le `sm:` de Tailwind et que le media query du
// scroll guide dans globals.css. Demarre a `false` : le rendu serveur ne
// connait pas la taille de l'ecran, et partir de `false` donne le meme HTML
// des deux cotes (pas d'erreur d'hydratation).
function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isPhone;
}

const CARD_CLASS =
  "group flex h-[calc(100dvh-2rem)] flex-col rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out sm:h-[520px] hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_40px_-20px_rgba(0,0,0,0.18)]";

// Carte epuree type "bewide" : image en haut, titre, description legere.
//
// Desktop/tablette : hauteur fixe (h-[520px]) pour que toutes les cartes
// s'alignent pile, quelle que soit la longueur du texte.
//
// Mobile : la carte occupe tout l'ecran. La hauteur vient de `100dvh` (unite
// *dynamique*) et non `100vh` : sur telephone, `vh` se fige sur la hauteur
// barre d'URL *deployee*, ce qui deborderait de l'ecran une fois la barre
// retractee. Le `snap-card` externe est la boite plein ecran qui sert de point
// d'arret ; la carte visible est ancree dedans avec une marge de respiration.
function ProjectCard({ project, index }) {
  const isExternal = project.link?.startsWith("http");
  const isPhone = useIsPhone();

  // Sur telephone la carte ne bouge pas : une animation qui translate la carte
  // pendant que le navigateur essaie de la caler sur son point d'ancrage fait
  // vibrer le scroll et provoque des sauts. Une carte plein ecran n'a de toute
  // facon pas besoin d'apparaitre en fondu, elle occupe deja tout l'espace.
  //
  // On rend un <div> nu (et non un motion.div fige) : framer-motion conserve
  // l'etat d'animation du premier rendu, et la largeur n'etant connue qu'apres
  // celui-ci, la carte restait bloquee a opacity:0. Sortir du composant motion
  // supprime le probleme a la racine.
  // La couverture est le plus gros element de la carte : en faire un lien donne
  // une cible bien plus large que le seul bouton "Decouvrir". Les projets sans
  // `link` (pas encore publies) gardent une couverture inerte, sans curseur ni
  // survol, pour ne pas promettre un clic qui ne mene nulle part.
  const cover = project.link ? (
    <a
      href={project.link}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`Découvrir ${project.name}`}
      data-cursor-hover
      className="flex min-h-0 flex-1 flex-col sm:flex-none"
    >
      <CoverPlaceholder project={project} />
    </a>
  ) : (
    <CoverPlaceholder project={project} />
  );

  const body = (
    <>
      {cover}

      <div className="flex shrink-0 flex-col px-2 pb-1 pt-5 sm:flex-1 sm:pt-6">
        <h3 className="text-2xl font-bold leading-snug tracking-tight">
          {project.name}
        </h3>

        {/* Sur mobile la carte fait tout l'ecran : la description s'affiche en
            entier et c'est la couverture (flex-1) qui cede la place. Le
            line-clamp ne sert qu'a partir de sm, ou la hauteur est figee a
            520px et ou les cartes doivent s'aligner entre elles. */}
        <p className="mt-3 text-[15px] opacity-60 leading-relaxed sm:line-clamp-3">
          {project.description}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 sm:mt-auto sm:pt-6">
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
    </>
  );

  if (isPhone) {
    return <div className={CARD_CLASS}>{body}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
      className={CARD_CLASS}
    >
      {body}
    </motion.div>
  );
}

// Desktop/tablette : grille classique, plusieurs cartes par ligne, rien ne change.
//
// Mobile : une carte = un ecran. Chaque carte est enveloppee dans une boite
// plein ecran (`snap-card`) qui sert de point d'arret au scroll guide defini
// dans globals.css. La grille passe en `gap-0` : l'espace entre deux cartes
// vient de la boite plein ecran elle-meme, un gap en plus decalerait le
// centrage. `-mx-6` annule le padding lateral de <main> pour que la boite
// fasse vraiment toute la largeur de l'ecran, `px-4` redonne ensuite une
// marge propre autour de la carte.
export default function ProjectCards() {
  return (
    <div className="snap-page mt-10 grid grid-cols-1 gap-0 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
      {PROJECTS.map((project, index) => (
        <div
          key={project.name}
          className="snap-card -mx-6 flex h-dvh items-center px-4 sm:mx-0 sm:block sm:h-auto sm:px-0"
        >
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}
