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

// Nav a plat : trois liens directs, pas de dropdown. Metiers et FAQ sont des
// sections de la home, d'ou les ancres plutot que des pages. "Projets" est
// sorti de la nav (la page /projects existe toujours) : les flyers metiers
// parlent mieux aux visiteurs que le portfolio technique.
const NAV_LINKS = [
  { href: "/#metiers", label: "Métiers" },
  { href: "/agents", label: "Agents" },
  { href: "/#faq", label: "FAQ" },
];

function ContactIcons({ compact = false, dark = false }) {
  const buttonClass = `flex items-center justify-center rounded-full bg-[#ff6b35] text-black hover:bg-[#e2531f] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out ${
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

function MobileMenu({ dark }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        data-cursor-hover
        className="flex flex-col items-end gap-1.5 p-1"
      >
        <span className={`block w-6 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
        <span className={`block w-4 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
      </button>

      {open && (
        <div className={`fixed inset-0 z-50 flex flex-col ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
          <div className="flex items-center justify-between px-4 py-6">
            <Link href="/" className="flex items-center gap-2 opacity-80" onClick={() => setOpen(false)}>
              <Image src="/images/logo-nk.png" alt="" width={28} height={28} className="rounded-md" unoptimized />
              <span className="text-sm font-mono">Votre Agent IA</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              data-cursor-hover
              className="text-2xl leading-none px-1"
            >
              &times;
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-6 px-6">
            {NAV_LINKS.map((item) => (
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
 */
export default function Header({ dark = false, compactY = false }) {
  return (
    <header
      className={`relative w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 ${
        compactY ? "py-4 md:py-5" : "py-8"
      }`}
    >
      <Link
        href="/"
        className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
      >
        <Image src="/images/logo-nk.png" alt="" width={32} height={32} className="rounded-md" priority unoptimized />
        <span className="text-sm font-mono">Votre Agent IA</span>
      </Link>

      <nav className="hidden sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 items-center gap-10 text-base font-mono uppercase tracking-widest">
        {NAV_LINKS.map((item) => (
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

      <MobileMenu dark={dark} />
    </header>
  );
}
