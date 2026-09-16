"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";

const CONTACTS = [
  { label: "WhatsApp", href: "https://wa.me/33622164758", Icon: WhatsAppIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/nathan-knaebel", Icon: LinkedInIcon },
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
    { href: "/agents/exemples", label: "Exemples" },
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

function ContactIcons({ compact = false, dark = false }) {
  const buttonClass = `flex items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out ${
    compact ? "w-10 h-10" : "w-9 h-9"
  }`;
  const iconClass = compact ? "w-[18px] h-[18px]" : "w-4 h-4";

  return (
    <div className="flex items-center gap-3">
      <EmailButton className={buttonClass} iconClassName={iconClass} dark={dark} />
      {CONTACTS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor-hover
          className={buttonClass}
        >
          <Icon className={iconClass} />
        </a>
      ))}
    </div>
  );
}

function MobileMenu({ dark, navLinks, brand }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        data-cursor-hover
        className="flex flex-col items-end justify-center gap-1.5 w-11 h-11 pr-0.5 -mr-1"
      >
        <span className={`block w-6 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
        <span className={`block w-4 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
      </button>

      {open && (
        <div className={`fixed inset-0 z-50 flex flex-col ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
          <div className="flex items-center justify-between px-4 py-6">
            <Link href={brand.href} className="flex items-center gap-2 opacity-80" onClick={() => setOpen(false)}>
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
              aria-label="Fermer le menu"
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
                className="text-3xl font-bold tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 py-10 flex justify-center">
            <ContactIcons compact dark={dark} />
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
 * `site` : "agents" (defaut), "aios" ou "agence". Determine l'enseigne et la
 * nav. Les pages annexes (metiers, mentions, blog) gardent la nav des agents,
 * elles n'ont donc rien a declarer.
 */
export default function Header({ dark = false, compactY = false, site = "agents" }) {
  const navLinks = NAV_BY_SITE[site] ?? NAV_BY_SITE.agents;
  const brand = BRAND_BY_SITE[site] ?? BRAND_BY_SITE.agents;

  return (
    <header
      className={`relative w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 ${
        compactY ? "py-4 md:py-5" : "py-8"
      }`}
    >
      <Link
        href={brand.href}
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

      <nav className="hidden sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 items-center gap-10 text-base font-mono uppercase tracking-widest">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-cursor-hover
            className="whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden sm:block">
        <ContactIcons dark={dark} />
      </div>

      <MobileMenu dark={dark} navLinks={navLinks} brand={brand} />
    </header>
  );
}
