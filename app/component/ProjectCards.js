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
import { t } from "../lib/i18n-projects";
import { attributClic, nomClic } from "../lib/suivi-clics";

// Les icones sont des composants : elles ne peuvent pas traverser la
// frontiere Server -> Client Component en tant que reference de fonction
// (Next.js le refuse). La liste des projets vit donc ici, cote client,
// plutot que dans page.js.
// Ordre = importance editoriale (les projets phares en premier), pas
// chronologie : c'est le haut de la liste qui est vu sur telephone, ou une
// carte occupe tout l'ecran.
// L'ordre compte aussi pour la mise en page desktop (3 colonnes), fixe par
// Nathan le 23/09 : ligne 1 Agents IA / MDD / Foxy, ligne 2 les jeux
// (Football Fight, FeatuRing, AI or Not), ligne 3 notariat + FetaFrance,
// ligne 4 Insider Bot / Photographies / Poker.
const PROJECTS = [
  {
    name: "Agents IA sur-mesure",
    nameEn: "Custom AI agents",
    description:
      "Un employé qui ne dort jamais et fait ce que vous n'avez pas envie de faire. Mails, agenda, prospection, réseaux sociaux, relances clients : il s'en occupe seul pendant que vous gérez le reste. Vous lui parlez sur Telegram comme à un collègue et il se façonne autour de votre métier.",
    descriptionEn:
      "An employee who never sleeps and does what you would rather not. Email, calendar, prospecting, social media, client follow-ups: it handles them on its own while you get on with the rest. You talk to it on Telegram like a colleague and it adapts to your line of work.",
    years: "2026",
    // La racine est Foxy depuis le 09/09 : la vitrine d'agents vit sur /agents.
    link: "/agents",
    cover: "from-zinc-800 to-zinc-900",
    coverImage: "/images/cover-agents.png",
    // Logo NK sur fond transparent : comme MDD, il doit rester ENTIER. Sans ce
    // drapeau le desktop passe en object-cover et rogne le logo dans le cadre
    // 4/3 (meme piege que le logo Insider Bot coupe).
    coverImageFit: "contain",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: PythonIcon, label: "Python" },
      { icon: TelegramIcon, label: "Telegram" },
    ],
  },
  {
    name: "Mon Devis Dentaire",
    description:
      "Plateforme SaaS qui fluidifie la signature des devis pour les cabinets dentaires. L'IA explique chaque acte au patient en langage clair, des relances automatiques suivent les devis en attente et le cabinet gère la prise de rendez-vous et le paiement en ligne depuis son propre logiciel métier.",
    descriptionEn:
      "A SaaS platform that smooths out treatment plan approvals for dental practices. AI explains every procedure to the patient in plain language, automated reminders chase pending quotes and the practice handles booking and online payment right from its own practice software.",
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
    name: "Foxy",
    description:
      "Mon deuxième cerveau, qui tourne en continu sur mon serveur : mails, agenda, bourse, veille, prospection, mémoire. Je lui parle à la voix ou par écrit comme à un collègue, il agit sur mes vrais outils et apprend de mes corrections d'une session à l'autre pour ne jamais refaire deux fois la même erreur.",
    descriptionEn:
      "My second brain, running non-stop on my server: email, calendar, stocks, market watch, prospecting, memory. I talk to it out loud or in writing like a colleague, it acts on my real tools and learns from my corrections between sessions so it never makes the same mistake twice.",
    years: "2026",
    link: "/foxy",
    cover: "from-zinc-800 to-zinc-900",
    coverImage: "/images/cover-aios.png",
    // Icone renard sur fond sombre plein cadre : comme MDD et Agents IA
    // sur-mesure, elle doit rester ENTIERE (contain), sinon object-cover
    // rogne les oreilles dans le cadre 4/3.
    coverImageFit: "contain",
    tech: [{ icon: NodeJsIcon, label: "Node.js" }],
  },
  {
    name: "Football Fight",
    description:
      "Ces deux joueurs ont-ils déjà porté le même maillot ? Reliez-les de club en club et enchaînez les bonnes réponses pour gagner votre duel de culture foot en 1 contre 1.",
    descriptionEn:
      "Have these two players ever worn the same shirt? Link them club by club and chain up correct answers to win your one-on-one football knowledge duel.",
    years: "2026",
    link: "https://footballfight.app",
    cover: "from-[#02794a] to-[#02794a]",
    coverImage: "/images/cover-footballfight-blason.png",
    // Icone carree sur fond vert plein : entiere (contain), le degrade de la
    // meme couleur comble autour dans le cadre 4/3.
    coverImageFit: "contain",
    tech: [
      { icon: PythonIcon, label: "Python" },
      { icon: NodeJsIcon, label: "Node.js" },
    ],
  },
  {
    name: "FeatuRing",
    description:
      "Footballeurs, acteurs, chanteurs : reliez ceux qui ont joué, tourné ou chanté ensemble et affrontez les meilleurs joueurs dans un duel de culture générale.",
    descriptionEn:
      "Footballers, actors, singers: link the ones who played, starred or sang together and take on the best players in a general knowledge duel.",
    years: "2026",
    link: "https://featuring.club",
    cover: "from-zinc-100 to-zinc-100",
    coverImage: "/images/cover-featuring.png",
    coverImageFit: "contain",
    tech: [
      { icon: PythonIcon, label: "Python" },
      { icon: NodeJsIcon, label: "Node.js" },
    ],
  },
  {
    name: "AI or Not",
    description:
      "La photo est-elle générée par IA, ou est-elle réelle ? Saurez-vous faire la différence ?",
    descriptionEn: "Is this photo AI-generated, or is it real? Can you tell the difference?",
    years: "2023",
    link: "https://ai-or-not.nathan-knaebel.com",
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
    name: "Courrier de succession",
    nameEn: "Estate Letters",
    description: "Génération automatique de courriers de successions pour études notariales.",
    descriptionEn: "Automatic generation of estate settlement letters for notary firms.",
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
    name: "Fichage Notariat",
    nameEn: "Notary Client Screening",
    description:
      "Vérification de l'intégrité et de la solvabilité des clients d'une étude notariale par croisement de sources publiques comme le BODACC et le registre des entreprises.",
    descriptionEn:
      "Integrity and solvency checks on notary clients by cross-referencing public sources such as BODACC and the French company register.",
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
    name: "FetaFrance",
    description: "Quelle proportion de la France as-tu réellement visitée ?",
    descriptionEn: "How much of France have you actually visited?",
    years: "2026",
    link: "https://fetafrance.nathan-knaebel.com",
    cover: "from-[#fbfaf7] to-[#fbfaf7]",
    coverImage: "/images/cover-fetafrance.svg",
    coverImageFit: "contain",
    tech: [
      { icon: ReactIcon, label: "React" },
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: ViteIcon, label: "Vite" },
    ],
  },
  {
    name: "Insider Bot",
    description: "Alerte automatique sur les mouvements d'insiders des marchés de prédiction.",
    descriptionEn: "Automatic alerts on insider moves in prediction markets.",
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
    nameEn: "Photography",
    description:
      "Une sélection de mes photographies qui suit sa propre direction artistique.",
    descriptionEn: "A selection of my photographs that follows its own art direction.",
    years: "2026",
    status: "wip",
    cover: "from-neutral-700 to-neutral-950",
  },
  {
    name: "Variante de Poker Japonais",
    nameEn: "Japanese Poker Variant",
    description: "Une variante du poker japonais en 1 contre 1.",
    descriptionEn: "A one-on-one variant of Japanese poker.",
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
];

// Couverture de carte : vraie image (screenshot/logo) quand disponible,
// sinon degrade + icone du premier outil de la stack en placeholder. Badge
// annee en haut a droite, tres discret (comme le compteur "13/52" de la
// reference bewide), a la place du badge public/prive retire.
function CoverPlaceholder({ project, tr }) {
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
            {tr.status[project.status]}
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
  "group flex h-[calc(100dvh-2rem)] flex-col rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out sm:h-[560px] hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_40px_-20px_rgba(0,0,0,0.18)]";

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
function ProjectCard({ project, index, lang }) {
  const isExternal = project.link?.startsWith("http");
  const isPhone = useIsPhone();
  const tr = t(lang);
  // Le nom d'un projet ne change qu'au besoin (les noms propres restent tels
  // quels) : `nameEn` n'existe que sur ceux dont le titre est une phrase.
  const name = (lang === "en" && project.nameEn) || project.name;
  const description = (lang === "en" && project.descriptionEn) || project.description;

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
      aria-label={tr.cards.discoverAria(name)}
      data-cursor-hover
      {...attributClic(nomClic("projet", project.name), isExternal)}
      className="flex min-h-0 flex-1 flex-col sm:flex-none"
    >
      <CoverPlaceholder project={project} tr={tr} />
    </a>
  ) : (
    <CoverPlaceholder project={project} tr={tr} />
  );

  const body = (
    <>
      {cover}

      <div className="flex shrink-0 flex-col px-2 pb-1 pt-5 sm:flex-1 sm:pt-6">
        <h3 className="text-2xl font-bold leading-snug tracking-tight">
          {name}
        </h3>

        {/* La description est bornee des le mobile (line-clamp-4) pour qu'une
            carte tienne TOUJOURS dans l'ecran, meme sur un petit telephone : une
            description longue ne doit jamais deborder ni pousser la couverture
            hors de la carte. A partir de sm, hauteur figee a 520px, clamp-3 pour
            aligner les cartes entre elles. */}
        <p className="mt-3 text-[15px] opacity-60 leading-relaxed line-clamp-4 sm:line-clamp-5">
          {description}
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
              {...attributClic(nomClic("projet", project.name), isExternal)}
              className="shrink-0 inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3.5 py-1.5 text-[13px] font-semibold text-black transition-colors duration-150 hover:bg-black hover:text-white"
            >
              {tr.cards.discover} <span aria-hidden>&rarr;</span>
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
      initial={{ opacity: 0, y: 64, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // margin plus genereuse (-15%) : l'animation se declenche des que la carte
      // approche du bas de l'ecran, elle est donc franchement VISIBLE au scroll
      // plutot que deja finie quand on arrive dessus.
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      // Cascade par colonne (index % 3) + ressort doux : les cartes montent en
      // se posant plutot qu'en glissant a plat, ce qui donne de la vie a
      // l'apparition sans ralentir la lecture.
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.12,
      }}
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
export default function ProjectCards({ lang = "fr" }) {
  return (
    <div className="snap-page mt-10 grid grid-cols-1 gap-0 max-sm:mt-0 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
      {PROJECTS.map((project, index) => (
        <div
          key={project.name}
          className="snap-card -mx-6 flex h-dvh items-center px-4 sm:mx-0 sm:block sm:h-auto sm:px-0"
        >
          <ProjectCard project={project} index={index} lang={lang} />
        </div>
      ))}
    </div>
  );
}
