"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import CvModal from "./CvModal";
import { LANG_COOKIE, LANGS, t } from "../lib/i18n-projects";
import { nomClic } from "../lib/suivi-clics";

// Nav PROPRE a la page /projects : volontairement decouplee du Header du site
// d'agents (pas de "Votre Agent IA", pas de Metiers/Agents/FAQ). Le portfolio
// se tient tout seul, comme un site a part. Deux actions : ouvrir le CV et
// descendre vers les projets ; plus les canaux de contact.
const CONTACTS = [
  { label: "WhatsApp", href: "https://wa.me/33622164758", Icon: WhatsAppIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/nathan-knaebel", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/kurlyto", Icon: GitHubIcon },
];

export default function ProjectsNav({ lang = "fr" }) {
  const [cvOpen, setCvOpen] = useState(false);
  const router = useRouter();
  const tr = t(lang);

  // Le <html lang> vit dans le layout partage avec le site francais : on le
  // corrige ici pour la seule page bilingue. Sans ca, un lecteur d'ecran (et
  // Google) lisent une page anglaise annoncee comme francaise.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Le choix explicite s'ecrit dans un cookie lu par le composant serveur, puis
  // router.refresh() redemande la page : les textes reviennent traduits sans
  // rechargement complet ni perte de position dans la page.
  function choose(next) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <span className="font-display text-lg font-bold tracking-tight">
            Nathan Knaebel
          </span>

          <nav className="flex items-center gap-3 sm:gap-5">
            {/* Bascule de langue : deux cibles de 30 px de haut (au-dessus du
                minimum touchable), la langue active en plein, l'autre en creux. */}
            <div className="flex items-center gap-1 rounded-full border border-white/15 p-0.5">
              {LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => choose(code)}
                  aria-pressed={code === lang}
                  data-cursor-hover
                  data-umami-event={`clic-projets-nav-langue-${code}`}
                  className={`rounded-full px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-widest transition-colors duration-150 ${
                    code === lang
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCvOpen(true)}
              data-cursor-hover
              data-umami-event="clic-projets-nav-voir-le-cv"
              className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] font-mono uppercase tracking-widest text-white/90 transition-all duration-150 hover:border-accent hover:text-accent"
            >
              {tr.nav.cv}
            </button>

            {/* Ancre vers la grille de projets, plus bas dans la page. La page
                gere le scroll-behavior: smooth global, l'ancre descend en
                douceur. */}
            <a
              href="#projets"
              data-cursor-hover
              data-clic="clic-projets-nav-voir-les-projets"
              className="hidden text-[12px] font-mono uppercase tracking-widest text-white/70 transition-colors duration-150 hover:text-white sm:inline"
            >
              {tr.nav.projects}
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
                  data-umami-event={nomClic("projets-nav", label)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/80 transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </>
  );
}
