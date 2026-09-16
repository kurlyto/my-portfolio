import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import LegacyFoxyAnchors from "./LegacyFoxyAnchors";
import { AIOS_OFFER } from "./aios-offer";

// Accueil de l'agence (racine du domaine depuis le 16/09/2026). Il ne vend
// rien lui-meme : il dit qui fait quoi et oriente vers le bon site. Foxy
// (/foxy) et les agents sur mesure (/agents) gardent chacun leur page, leurs
// couleurs et leur promesse ; les realisations vivent sur /projects.
//
// Chaque carte porte les couleurs du site vers lequel elle mene (le brun et le
// rouge du renard pour Foxy, l'orange pour les agents) : on voit deja ou l'on
// va avant de cliquer, meme logique que les passerelles entre les deux sites.

const CTA_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-ink px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide transition-all duration-150 hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg";

const OFFRES = [
  {
    href: "/foxy",
    // theme-aios : la carte prend la palette de Foxy (brun profond, rouge).
    surface: "theme-aios on-dark bg-deep text-white",
    logo: "/images/cover-aios.png",
    logoClass: "w-11 h-11 object-contain",
    label: "Foxy - pour le chef d'entreprise",
    titre: "Un bras droit qui connaît tout votre business.",
    texte:
      "Vos mails, votre agenda, vos clients et vos tâches au même endroit. Vous lui parlez et il s'occupe du reste.",
    detail: `Accès anticipé : ${AIOS_OFFER.placesRestantes} places sur ${AIOS_OFFER.placesTotal}`,
    cta: "Découvrir Foxy",
  },
  {
    href: "/agents",
    surface: "bg-white text-black border border-black/10",
    logo: "/images/logo-nk.png",
    logoClass: "w-9 h-9 rounded-md object-contain",
    label: "Agents sur mesure - une tâche précise",
    titre: "Un agent pour la tâche que vous n'aimez pas faire.",
    texte:
      "Relancer vos devis, trier vos candidatures ou surveiller vos concurrents : l'agent s'en charge chaque jour à votre place.",
    detail: "1 mois d'essai gratuit, sans engagement",
    cta: "Voir les agents",
  },
  {
    href: "/projects",
    surface: "on-dark bg-black text-white",
    label: "Réalisations - la preuve",
    titre: "Ce que j'ai déjà construit.",
    texte:
      "Mon Devis Dentaire, Football Fight, des outils métier et des agents en service : des produits utilisés chaque jour.",
    vignettes: ["/images/cover-mdd.png", "/images/cover-featuring.png", "/images/cover-poker.png"],
    detail: "SaaS, jeux, outils métier",
    cta: "Voir les réalisations",
  },
];

// La methode tient en trois temps. C'est ici que se raconte l'analyse du
// besoin (decision du 16/09 : pas de page "conseil IA" a part).
const METHODE = [
  {
    numero: "01",
    titre: "Comprendre",
    texte: "Je regarde comment votre travail circule vraiment avant de proposer quoi que ce soit.",
  },
  {
    numero: "02",
    titre: "Construire",
    texte: "L'IA se branche sur vos vrais outils et prend en charge ce qui vous fait perdre du temps.",
  },
  {
    numero: "03",
    titre: "Suivre",
    texte: "Je reste là après la mise en route pour l'ajuster à mesure que votre activité évolue.",
  },
];

function Vignettes({ images }) {
  return (
    <span className="flex -space-x-2">
      {images.map((src) => (
        // Vignettes locales a taille fixe : next/image n'apporte rien ici.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 object-cover"
        />
      ))}
    </span>
  );
}

function CarteOffre({ offre }) {
  return (
    <Link
      href={offre.href}
      data-cursor-hover
      className={`group flex flex-col h-full rounded-lg p-7 md:p-8 transition-transform duration-200 ease-out hover:-translate-y-1 ${offre.surface}`}
    >
      <div className="flex items-center gap-3 min-h-11">
        {offre.logo ? (
          // Logo local a taille fixe : next/image n'apporte rien ici.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={offre.logo} alt="" className={offre.logoClass} />
        ) : (
          <Vignettes images={offre.vignettes} />
        )}
      </div>
      <span className="mt-6 text-xs font-mono uppercase tracking-widest opacity-60">
        {offre.label}
      </span>
      <h3 className="font-display mt-3 text-2xl md:text-[1.7rem] font-bold leading-snug tracking-tight">
        {offre.titre}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed opacity-75">{offre.texte}</p>

      {/* mt-auto : les boutons des trois cartes s'alignent sur la meme ligne
          quelle que soit la longueur des textes. */}
      <div className="mt-auto pt-8 flex flex-col gap-4">
        <span className="text-[12px] font-mono opacity-55">{offre.detail}</span>
        <span className={`${CTA_CLASS} w-full sm:w-fit`}>
          {offre.cta}
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function AgenceHomeContent() {
  return (
    <div className="bg-white text-black">
      <LegacyFoxyAnchors />
      <Header compactY site="agence" />

      {/* Premier ecran : qui, quoi, ou cliquer. */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pt-20 md:pb-28">
        <span className="kicker text-xs font-mono uppercase tracking-widest">
          Agence IA - Nathan Knaebel
        </span>
        <h1 className="font-display mt-6 text-4xl md:text-6xl font-bold tracking-tight max-w-[16ch] text-balance">
          Des IA qui travaillent vraiment pour votre entreprise.
        </h1>
        <p className="mt-6 text-base md:text-lg text-black/65 leading-relaxed max-w-2xl">
          Je conçois <span className="mot-accent font-semibold">Foxy</span>, un bras droit qui
          connaît tout votre business, et des{" "}
          <span className="mot-accent font-semibold">agents sur mesure</span> qui prennent en
          charge une tâche précise. Chaque projet commence par comprendre comment vous
          travaillez.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#offres" data-cursor-hover className={`${CTA_CLASS} w-full sm:w-fit`}>
            Voir les offres
          </a>
          <a
            href="#contact"
            data-cursor-hover
            className="inline-flex items-center justify-center rounded-full border border-black/20 px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide text-black/70 transition-colors duration-150 hover:border-black hover:text-black w-full sm:w-fit"
          >
            Me contacter
          </a>
        </div>
      </section>

      {/* Les trois portes. */}
      <section className="bg-[#f4f4f4]">
        <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-28">
          <span id="offres" className="scroll-mt-10 kicker text-xs font-mono uppercase tracking-widest">
            Ce que je fais
          </span>
          <h2 className="font-display mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Par où commencer ?
          </h2>
          <div className="mt-12 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {OFFRES.map((offre) => (
              <CarteOffre key={offre.href} offre={offre} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* A propos : le parcours et la methode. Les faits viennent du CV de
          Nathan, rien d'arrondi a la hausse. */}
      <section>
        <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-12 lg:gap-20 items-start">
            <div>
              <span id="a-propos" className="scroll-mt-10 kicker text-xs font-mono uppercase tracking-widest">
                À propos
              </span>
              <h2 className="font-display mt-4 text-3xl md:text-5xl font-bold tracking-tight">
                Ingénieur avant d&apos;être développeur.
              </h2>
              <div className="mt-8 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- photo
                    locale a taille fixe, next/image n'apporte rien ici. */}
                <img
                  src="/images/profile-pic.png"
                  alt="Nathan Knaebel"
                  className="w-16 h-16 rounded-full object-cover object-top border border-black/10"
                />
                <span className="text-[13px] font-mono leading-tight">
                  <span className="block font-bold">Nathan Knaebel</span>
                  <span className="block text-black/50">Concepteur d&apos;agents IA</span>
                </span>
              </div>
            </div>

            <div className="text-base md:text-lg text-black/70 leading-relaxed space-y-5">
              <p>
                J&apos;ai passé six ans comme ingénieur qualité et supply chain dans
                l&apos;industrie : dispositifs médicaux, métallurgie puis automobile chez
                Continental. Mon travail consistait à comprendre des processus compliqués et à
                trouver où ils perdaient du temps.
              </p>
              <p>
                Je suis aujourd&apos;hui co-fondateur et CTO de Mon Devis Dentaire et je conçois
                des IA pour les entreprises. La méthode n&apos;a pas changé : l&apos;IA vient
                après la compréhension du besoin et seulement là où elle fait vraiment gagner
                du temps.
              </p>
            </div>
          </div>

          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {METHODE.map((etape) => (
              <div key={etape.numero} className="border-t border-black/15 pt-6">
                <span className="text-[13px] font-mono font-bold text-black/40">{etape.numero}</span>
                <h3 className="font-display mt-3 text-xl md:text-2xl font-bold">{etape.titre}</h3>
                <p className="mt-2.5 text-[15px] text-black/60 leading-relaxed">{etape.texte}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Le pied de page EST la section contact (titre "Me contacter" et les
          boutons) : l'ancre du menu y descend directement. */}
      <div id="contact">
        <Footer showHomeLink={false} />
      </div>
    </div>
  );
}
