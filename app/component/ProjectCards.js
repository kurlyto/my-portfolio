"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  ClaudeIcon,
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
// Ordre fixe par Nathan le 05/10/2026 (refonte : cette liste devient l'accueil) :
// MDD, Agents IA, Foxy, les deux projets clients, Football Fight, le notariat,
// puis les projets en construction ou secondaires. Le groupe de restaurants
// n'est pas nomme : pas de contrat signe.
// Exportee : l'accueil perso (ProjetsApercu) en montre une selection.
export const PROJECTS = [
  {
    name: "Mon Devis Dentaire",
    description:
      "Plateforme SaaS qui fluidifie la signature des devis pour les cabinets dentaires. L'IA explique chaque acte au patient en langage clair, des relances automatiques suivent les devis en attente et le cabinet gère la prise de rendez-vous et le paiement en ligne depuis son propre logiciel métier.",
    descriptionEn:
      "A SaaS platform that smooths out treatment plan approvals for dental practices. AI explains every procedure to the patient in plain language, automated reminders chase pending quotes and the practice handles booking and online payment right from its own practice software.",
    years: "2025 - 2026",
    link: "https://mondevisdentaire.fr",
    // Video de presentation (40 s, avec le son), ouverte depuis la carte.
    video: "/videos/mdd-presentation.mp4",
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
    nameEn: "Custom AI agents",
    description:
      "Un agent IA dédié à une tâche de votre entreprise : relances, mails, planning, prospection. Il travaille seul, jour et nuit, et vous rend des heures chaque semaine.",
    descriptionEn:
      "An AI agent dedicated to one task in your business: follow-ups, email, scheduling, prospecting. It works on its own, day and night, and gives you back hours every week.",
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
    name: "Foxy",
    description:
      "Imaginez quelqu'un qui vous connaît par cœur : vous, votre business, votre façon de parler, vos clients. Branché sur vos outils, il fait un tas d'actions à votre place.",
    descriptionEn:
      "Imagine someone who knows you by heart: you, your business, the way you talk, your clients. Plugged into your tools, it takes care of a whole lot of tasks for you.",
    years: "2026",
    link: "/foxy",
    video: "/videos/foxy-1min.mp4",
    cover: "from-zinc-800 to-zinc-900",
    coverImage: "/images/cover-aios.png",
    // Icone renard sur fond sombre plein cadre : comme MDD et Agents IA
    // sur-mesure, elle doit rester ENTIERE (contain), sinon object-cover
    // rogne les oreilles dans le cadre 4/3.
    coverImageFit: "contain",
    tech: [{ icon: NodeJsIcon, label: "Node.js" }],
  },
  {
    name: "Stage : logiciel de prospection pour des agences de booking d'artistes",
    nameEn: "Stage: prospecting software for artist booking agencies",
    // Textes de Nathan du 16/11/2026 (« c'est ce genre de precision qui est cool »).
    description:
      "Stage est un logiciel sur-mesure conçu pour des agences de booking d'artistes européennes qui souhaitent moderniser leurs méthodes pour obtenir des contrats de représentations musicales pour leurs artistes et booster leurs résultats grâce à l'intelligence artificielle. Stage est un système intelligent qui permet une prospection structurée, intelligente, personnalisée et visuelle pour des agences de booking d'artistes.",
    descriptionEn:
      "Stage is custom software built for European artist booking agencies that want to modernise how they land live performance contracts for their artists and boost their results with artificial intelligence. Stage makes prospecting structured, smart, personalised and visual for artist booking agencies.",
    years: "2026",
    cover: "from-neutral-200 to-neutral-300",
    // Video de presentation de Stage (v14 du 13/11), version allegee sans le
    // son : la carte montre l'image fixe, le Play ouvre la video (Nathan,
    // 17/11/2026 : image fixe + Play comme les autres projets).
    video: "/videos/stage-presentation-carte.mp4",
    coverImage: "/images/cover-stage-poster.jpg",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: ClaudeIcon, label: "Claude" },
    ],
  },
  {
    name: "Agent de planning prévisionnel intelligent et connecté",
    nameEn: "Smart, connected forecast scheduling agent",
    description:
      "Planification d'équipes assistée par IA pour un groupe de 20 établissements. Proposition de plannings et intégration au logiciel RH. Confirmation du planning auprès des employés par WhatsApp.",
    descriptionEn:
      "AI-assisted team scheduling for a group of 20 venues. Schedule proposals and integration with the HR software. Schedules confirmed with employees over WhatsApp.",
    years: "2026",
    cover: "from-neutral-800 to-neutral-950",
    // Une photo remplit aussi la carte sur telephone ("fill") : pas de cadre
    // de degrade autour (Nathan, 05/10/2026 : "fond rouge degueulasse").
    coverImageFit: "fill",
    // Photo Unsplash (licence Unsplash, photo-1538334421852), choisie par Nathan le 05/10/2026.
    coverImage: "/images/cover-planning-restaurants-photo.jpg",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: ClaudeIcon, label: "Claude" },
    ],
  },
  {
    name: "Football Fight",
    description:
      "Ces deux joueurs ont-ils déjà porté le même maillot ? Reliez-les de club en club et enchaînez les bonnes réponses pour gagner votre duel de culture foot en 1 contre 1.",
    descriptionEn:
      "Have these two players ever worn the same shirt? Link them club by club and chain up correct answers to win your one-on-one football knowledge duel.",
    years: "2026",
    link: "https://footballfight.app",
    video: "/videos/footballfight-presentation.mp4",
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
    name: "Anonymiseur de documents pour étude notariale",
    nameEn: "Document anonymizer for notary firms",
    description:
      "Anonymisation des Word et PDF d'une étude notariale sur l'ordinateur, sans IA ni internet. Le document part ensuite chez Claude et les vrais noms reviennent en un clic dans sa réponse.",
    descriptionEn:
      "Anonymizes a notary firm's Word and PDF files on the computer itself, with no AI and no internet. The document then goes to Claude and the real names come back into its answer in one click.",
    years: "2026",
    cover: "from-slate-700 to-slate-800",
    // Faux document d'essai (aucune vraie donnee d'etude), original derriere,
    // version anonymisee devant. Fabrique le 16/11/2026.
    coverImage: "/images/cover-anonymiseur-v2.jpg",
    coverImageFit: "fill",
    tech: [
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: ClaudeIcon, label: "Claude" },
    ],
  },
  {
    name: "Génération intelligente de courriers de successions",
    nameEn: "Smart estate letter generation",
    description: "Génération automatique de courriers de successions pour études notariales.",
    descriptionEn: "Automatic generation of estate settlement letters for notary firms.",
    years: "2023 - 2024",
    cover: "from-amber-600 to-orange-900",
    // Ecran des modeles de courrier (generique) : JAMAIS un ecran qui situe l'etude
    // (lieux, correspondants locaux), demande de Nathan du 05/10/2026.
    coverImage: "/images/cover-succession-courriers-v2.jpg",
    tech: [
      { icon: NextJsIcon, label: "Next.js" },
      { icon: TypeScriptIcon, label: "TypeScript" },
      { icon: TailwindIcon, label: "Tailwind CSS" },
    ],
  },
  {
    name: "Vérification client pour étude notariale",
    nameEn: "Client screening for notary firms",
    description:
      "Vérification de l'intégrité et de la solvabilité des clients d'une étude notariale par croisement de sources publiques comme le BODACC et le registre des entreprises.",
    descriptionEn:
      "Integrity and solvency checks on notary clients by cross-referencing public sources such as BODACC and the French company register.",
    years: "2023 - 2024",
    cover: "from-slate-600 to-slate-900",
    // Capture de l'outil rempli d'un client fictif, 05/10/2026.
    coverImage: "/images/cover-notariat-capture.jpg",
    tech: [
      { icon: NodeJsIcon, label: "Node.js" },
      { icon: ExpressIcon, label: "Express" },
      { icon: GovApiIcon, label: "API gouv.fr" },
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
    name: "FetaFrance",
    description: "Quelle proportion de la France as-tu réellement visitée ?",
    descriptionEn: "How much of France have you actually visited?",
    years: "2026",
    link: "https://fetafrance.nathan-knaebel.com",
    cover: "from-neutral-900 to-black",
    // Ecran de bienvenue du site (photo du Mont-Saint-Michel, Lynx1211, CC BY-SA 4.0),
    // choisi par Nathan le 05/10/2026 ; fond sombre pour se fondre a la photo sur telephone.
    coverImage: "/images/cover-fetafrance-capture.jpg",
    coverImageMobile: "/images/cover-fetafrance-mobile.jpg",
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
  // "Mes photographies" est passee dans la grille du dessous (AutresRubriques,
  // 28/10/2026), avec les articles et le CV.
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
      {project.coverVideo ? (
        // Video muette en boucle : `playsInline` evite le plein ecran force sur
        // iPhone, et `poster` montre une image tant que la video charge.
        <video
          src={project.coverVideo}
          poster={project.coverImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-contain sm:object-cover"
        />
      ) : project.coverImage ? (
        // `object-cover` recadre pour remplir : acceptable dans le cadre 4/3 du
        // desktop, desastreux sur mobile ou la carte plein ecran rend la zone
        // bien plus haute que large (une image 4/3 y perdait ~60% de sa largeur,
        // d'ou le logo Insider Bot coupe). Sur telephone on affiche donc toujours
        // l'image entiere, et c'est le degrade qui comble autour.
        <picture className="contents">
        {/* Capture faite pour le telephone (format portrait) : elle remplit la
            carte plein ecran au lieu de flotter dans un cadre. */}
        {project.coverImageMobile && (
          <source media="(max-width: 639px)" srcSet={project.coverImageMobile} />
        )}
        <img
          src={project.coverImage}
          alt=""
          className={`h-full w-full ${
            project.coverImageFit === "fill" || project.coverImageMobile
              ? "object-cover"
              : project.coverImageFit === "contain"
                ? "object-contain p-4 sm:object-contain"
                : "object-contain p-4 sm:p-0 sm:object-cover"
          }`}
        />
        </picture>
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
      {project.video && (
        // Play semi-transparent en bas a gauche : il invite a voir la video
        // sans cacher le logo (au centre, il masquait celui de MDD), et
        // devient plus net au survol de la carte.
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/30 py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-white/90 ring-1 ring-white/25 backdrop-blur-sm transition-all duration-200 ease-out group-hover:bg-black/55 group-hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          {tr.cards.video}
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

// Lecteur en grand, avec le son. Rendu dans <body> par un portail : la carte
// est animee par une transformation CSS, et un element `fixed` place dedans
// serait cale sur la carte au lieu de l'ecran.
function VideoModal({ src, poster, title, closeLabel, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-10"
    >
      <motion.div
        initial={{ scale: 0.96, y: 8 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <video
          src={src}
          poster={poster}
          autoPlay
          controls
          playsInline
          className="max-h-[85dvh] w-full rounded-2xl bg-black shadow-2xl"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          data-cursor-hover
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </motion.div>
    </motion.div>,
    document.body,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const coverRef = useRef(null);

  // Le petit menu se ferme au clic ailleurs ou sur Echap.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (!coverRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeVideo = useCallback(() => setVideoOpen(false), []);
  const openVideo = () => {
    setMenuOpen(false);
    setVideoOpen(true);
  };

  // Projet avec video : un clic sur l'image ouvre un petit menu Site / Video
  // (choix de Nathan, 17/11/2026). Sans site (Stage), le clic lance la video.
  const cover = project.video ? (
    <div ref={coverRef} className="relative flex min-h-0 flex-1 flex-col sm:flex-none">
      <button
        type="button"
        onClick={() => (project.link ? setMenuOpen((o) => !o) : openVideo())}
        aria-haspopup={project.link ? "menu" : undefined}
        aria-expanded={project.link ? menuOpen : undefined}
        aria-label={project.link ? name : tr.cards.watchVideo}
        data-cursor-hover
        className="flex min-h-0 flex-1 flex-col text-left sm:flex-none"
      >
        <CoverPlaceholder project={project} tr={tr} />
      </button>
      {menuOpen && (
        <motion.div
          role="menu"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 z-10 w-56 overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
          style={{ x: "-50%", y: "-50%" }}
        >
          <a
            role="menuitem"
            href={project.link}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            onClick={() => setMenuOpen(false)}
            data-cursor-hover
            {...attributClic(nomClic("projet", project.name), isExternal)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold text-black transition-colors hover:bg-black/[0.05]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] opacity-60" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
            {tr.cards.openSite}
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={openVideo}
            data-cursor-hover
            data-umami-event={nomClic("projet-video", project.name)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-black transition-colors hover:bg-black/[0.05]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] opacity-60" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            {tr.cards.watchVideo}
          </button>
        </motion.div>
      )}
      {videoOpen && (
        <VideoModal
          src={project.video}
          poster={project.coverImage}
          title={name}
          closeLabel={tr.cards.closeVideo}
          onClose={closeVideo}
        />
      )}
    </div>
  ) : project.link ? (
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
        {/* Titre sur 3 lignes (Stage) : la description perd 2 lignes pour que
            les icones restent dans la carte. */}
        <p
          className={`mt-3 text-[15px] opacity-60 leading-relaxed line-clamp-4 ${
            name.length > 50 ? "sm:line-clamp-3" : "sm:line-clamp-5"
          }`}
        >
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
