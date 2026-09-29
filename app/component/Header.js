"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon, LinkedInIcon, MaltIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";
import BasculeLangue from "./BasculeLangue";
import { nomClic } from "../lib/suivi-clics";

const CONTACTS = [
  { label: "WhatsApp", href: "https://wa.me/33622164758", Icon: WhatsAppIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/nathan-knaebel", Icon: LinkedInIcon },
  { label: "Malt", href: "https://www.malt.fr/profile/nathanknaebel", Icon: MaltIcon },
  { label: "GitHub", href: "https://github.com/kurlyto", Icon: GitHubIcon },
];

// Trois sites, trois navigations, un seul header. `/` est l'accueil de
// l'agence (qui presente les offres), `/foxy` le site de l'AIOS (le systeme
// complet, pour un chef d'entreprise) et `/agents` celui des agents sur mesure
// (une mission precise dans un metier). Melanger les deux offres sur un meme
// ecran est exactement ce qui rendait l'ancienne page confuse : l'accueil les
// presente cote a cote, chacune garde son propre site.
//
// Le dernier lien de Foxy et des agents est la passerelle vers l'autre site :
// un visiteur arrive au mauvais endroit doit pouvoir traverser d'un clic.
const NAV_BY_SITE = {
  // Accueil perso (racine depuis le 28/09/2026) : les rubriques de la page,
  // dans l'ordre fixe par Nathan. Les produits ne sont pas dans le menu : ils
  // ont leurs cartes juste sous le premier ecran. Seul site bilingue :
  // `labelEn` s'affiche quand la page est en anglais.
  perso: [
    { href: "/#travail", label: "Travail", labelEn: "Work" },
    { href: "/#etudes", label: "Études", labelEn: "Studies" },
    { href: "/#projets", label: "Projets", labelEn: "Projects" },
    { href: "/#articles", label: "Articles", labelEn: "Articles" },
    { href: "/#voyages", label: "Voyages", labelEn: "Travel" },
    { href: "/#autres", label: "Autres", labelEn: "Others" },
  ],
  agence: [
    { href: "/foxy", label: "Foxy" },
    { href: "/agents", label: "Agents" },
    { href: "/projects", label: "Réalisations" },
    { href: "/#a-propos", label: "À propos" },
    { href: "/#contact", label: "Contact" },
  ],
  aios: [
    { href: "/foxy#capacites", label: "Au quotidien" },
    { href: "/foxy#comparatif", label: "Comparatif" },
    { href: "/foxy#temoignages", label: "Témoignages" },
    { href: "/foxy#faq", label: "FAQ" },
    { href: "/agents", label: "Agents" },
  ],
  agents: [
    { href: "/agents#metiers", label: "Métiers" },
    { href: "/agents#exemples", label: "Exemples" },
    { href: "/agents#temoignages", label: "Témoignages" },
    { href: "/agents#faq", label: "FAQ" },
    { href: "/foxy", label: "Foxy" },
  ],
};

// Chaque site a son enseigne : son logo et son nom. Le logo NK reste celui de
// l'activite "agents sur mesure", l'AIOS porte le renard.
// `logoClass` : le NK est une vignette carree pleine (l'arrondi la pose bien),
// le renard est detoure sur transparent - lui appliquer un arrondi rognerait
// une oreille pour rien.
const BRAND_BY_SITE = {
  // Le site perso porte le visage de Nathan, pas un logo de marque.
  perso: {
    href: "/",
    label: "Nathan Knaebel",
    logo: "/images/profile-pic.png",
    logoClass: "rounded-full",
    logoSize: 32,
  },
  agence: {
    href: "/",
    label: "Nathan Knaebel",
    logo: "/images/logo-nk.png",
    logoClass: "rounded-md",
    logoSize: 32,
  },
  aios: {
    href: "/foxy",
    label: "Foxy",
    logo: "/images/cover-aios.png",
    logoClass: "",
    logoSize: 40,
  },
  agents: {
    href: "/agents",
    label: "Votre Agent IA",
    logo: "/images/logo-nk.png",
    logoClass: "rounded-md",
    logoSize: 32,
  },
};

// Exportees : le premier ecran de l'accueil perso les reprend (Nathan, 29/09 :
// ses contacts en haut de page, que le menu n'a plus la place de porter).
// `zone` nomme les clics (header, accueil-hero...).
export function ContactIcons({ compact = false, dark = false, lang = "fr", zone = "header" }) {
  const buttonClass = `flex items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out ${
    compact ? "w-10 h-10" : "w-9 h-9"
  }`;
  const iconClass = compact ? "w-[18px] h-[18px]" : "w-4 h-4";

  return (
    <div className="flex items-center gap-3">
      <EmailButton className={buttonClass} iconClassName={iconClass} dark={dark} zone={zone} lang={lang} />
      {CONTACTS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor-hover
          data-umami-event={nomClic(zone, label)}
          className={buttonClass}
        >
          <Icon className={iconClass} />
        </a>
      ))}
    </div>
  );
}

function MobileMenu({ dark, navLinks, brand, perso = false, lang = "fr" }) {
  const [open, setOpen] = useState(false);
  const fond = dark ? "bg-black text-white" : perso ? "bg-surface text-ink" : "bg-white text-black";

  return (
    <div className={perso ? "lg:hidden" : "sm:hidden"}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={lang === "en" ? "Open menu" : "Ouvrir le menu"}
        data-cursor-hover
        data-umami-event="clic-nav-ouvrir-menu-mobile"
        className="flex flex-col items-end justify-center gap-1.5 w-11 h-11 pr-0.5 -mr-1"
      >
        <span className={`block w-6 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
        <span className={`block w-4 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
      </button>

      {open && (
        <div className={`fixed inset-0 z-50 flex flex-col ${fond}`}>
          <div className="flex items-center justify-between px-4 py-6">
            <Link href={brand.href} data-clic="clic-nav-logo" className="flex items-center gap-2 opacity-80" onClick={() => setOpen(false)}>
              <Image
                src={brand.logo}
                alt=""
                width={brand.logoSize - 4}
                height={brand.logoSize - 4}
                className={brand.logoClass}
                unoptimized
              />
              <span className="text-sm font-mono">{brand.label}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={lang === "en" ? "Close menu" : "Fermer le menu"}
              data-cursor-hover
              className="flex items-center justify-center w-11 h-11 -mr-2 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-6 px-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-clic={item.clic}
                className="text-3xl font-bold tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-10 flex justify-center">
            <ContactIcons compact dark={dark} lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * `compactY` : reduit la hauteur du header. Utilise sur la home, ou le bandeau
 * d'offre s'ajoute au-dessus : les deux cumules repoussaient le hero assez bas
 * pour qu'il soit coupe a l'arrivee sur le site. Les autres pages gardent
 * l'espacement d'origine, elles n'ont pas de bandeau.
 *
 * `site` : "agents" (defaut), "aios", "agence" ou "perso". Determine l'enseigne
 * et la nav. Les pages annexes (metiers, mentions, blog) gardent la nav des
 * agents, elles n'ont donc rien a declarer.
 *
 * `lang` : "fr" (defaut) ou "en", seul l'accueil perso le passe.
 */
export default function Header({ dark = false, compactY = false, site = "agents", lang = "fr" }) {
  const navLinks = (NAV_BY_SITE[site] ?? NAV_BY_SITE.agents).map((item) => ({
    ...item,
    // Le nom de clic garde le libelle francais : un lien compte sous un seul
    // nom dans les statistiques, quelle que soit la langue de la page.
    clic: nomClic("nav", item.label),
    label: (lang === "en" && item.labelEn) || item.label,
  }));
  const brand = BRAND_BY_SITE[site] ?? BRAND_BY_SITE.agents;
  // Les six rubriques du site perso ne tiennent pas entre l'enseigne et la
  // bascule de langue sur une tablette : il garde le menu mobile jusqu'a
  // 1024 px (lg) et un menu plus serre ensuite.
  const perso = site === "perso";

  return (
    <header
      className={`relative w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 ${
        compactY ? "py-4 md:py-5" : "py-8"
      }`}
    >
      <Link
        href={brand.href}
        data-clic="clic-nav-logo"
        className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
      >
        <Image
          src={brand.logo}
          alt=""
          width={brand.logoSize}
          height={brand.logoSize}
          className={brand.logoClass}
          priority
          unoptimized
        />
        <span className="text-sm font-mono">{brand.label}</span>
      </Link>

      <nav
        className={`hidden items-center font-mono uppercase tracking-widest ${
          perso
            ? "lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-6 text-xs xl:gap-8 xl:text-[13px]"
            : "sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 gap-10 text-base"
        }`}
      >
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-cursor-hover
            data-clic={item.clic}
            className="whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {perso ? (
        // A droite, la seule bascule de langue, visible a toutes les tailles.
        // Les icones de contact n'y tiennent plus : le header plafonne a 1152 px
        // et, bascule ajoutee, elles couvraient "Autres" des 1280 px (mesure du
        // 28/09). Elles restent dans le pied de page, titre "Me contacter".
        <div className="flex items-center gap-3">
          <BasculeLangue lang={lang} />
          <MobileMenu dark={dark} navLinks={navLinks} brand={brand} perso lang={lang} />
        </div>
      ) : (
        <>
          <div className="hidden sm:block">
            <ContactIcons dark={dark} />
          </div>
          <MobileMenu dark={dark} navLinks={navLinks} brand={brand} />
        </>
      )}
    </header>
  );
}
