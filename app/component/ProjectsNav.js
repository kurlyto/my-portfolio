"use client";

import { useState } from "react";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import CvModal from "./CvModal";

// Nav PROPRE a la page /projects : volontairement decouplee du Header du site
// d'agents (pas de "Votre Agent IA", pas de Metiers/Agents/FAQ). Le portfolio
// se tient tout seul, comme un site a part. Deux actions : ouvrir le CV et
// descendre vers les projets ; plus les canaux de contact.
const CONTACTS = [
  { label: "WhatsApp", href: "https://wa.me/33622164758", Icon: WhatsAppIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/nathan-knaebel", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/kurlyto", Icon: GitHubIcon },
];

export default function ProjectsNav() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <span className="font-display text-lg font-bold tracking-tight">
            Nathan Knaebel
          </span>

          <nav className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              data-cursor-hover
              className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] font-mono uppercase tracking-widest text-white/90 transition-all duration-150 hover:border-[#ff6b35] hover:text-[#ff6b35]"
            >
              Mon CV
            </button>

            {/* Ancre vers la grille de projets, plus bas dans la page. La page
                gere le scroll-behavior: smooth global, l'ancre descend en
                douceur. */}
            <a
              href="#projets"
              data-cursor-hover
              className="hidden text-[12px] font-mono uppercase tracking-widest text-white/70 transition-colors duration-150 hover:text-white sm:inline"
            >
              Mes projets
            </a>

            <div className="hidden items-center gap-2.5 sm:flex">
              {CONTACTS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor-hover
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/80 transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#ff6b35] hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
