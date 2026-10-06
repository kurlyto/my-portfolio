"use client";

import { useEffect, useState } from "react";
import { CATEGORIES, Logo, TechCategories } from "./TechGrid";
import { t } from "../lib/i18n-projects";

// Les outils deja utilises, en POP-UP depuis le 06/10/2026 (idee de Nathan : le
// bloc pleine page faisait plus de trois ecrans sur telephone). Sous le bouton
// du haut de page, une ligne d'accroche avec quelques logos et le compte du
// reste ; un clic ouvre la liste complete rangee par categories.
// Ordre choisi par Nathan le 06/10/2026.
const APERCU = ["Next.js", "PostgreSQL", "React", "Python", "Claude", "Gmail", "Notion", "HubSpot", "Lemlist"];
const TOUS = CATEGORIES.flatMap((c) => c.items);
const APERCU_ITEMS = APERCU.map((l) => TOUS.find((i) => i.label === l)).filter(Boolean);

export default function TechPopup({ lang = "fr" }) {
  const [open, setOpen] = useState(false);
  const tr = t(lang);

  // Meme comportement que la pop-up du CV : Echap ferme, la page derriere ne
  // defile plus tant que la fenetre est ouverte.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor-hover
        data-clic="clic-projets-hero-outils"
        className="group mt-3 flex flex-col items-center gap-2.5"
      >
        <span className="text-sm text-white/60 transition-colors group-hover:text-white">
          {tr.tech.teaser}
        </span>
        <span className="flex items-center gap-1.5">
          {APERCU_ITEMS.map((item) => (
            <Logo key={item.label} item={item} size="h-7 w-7" />
          ))}
          <span className="ml-1 rounded-full border border-white/20 px-2.5 py-1 font-mono text-[12px] font-bold text-white/80 transition-colors group-hover:border-accent group-hover:text-accent">
            +{TOUS.length - APERCU_ITEMS.length}
          </span>
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 text-left backdrop-blur-sm sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={tr.tech.title}
        >
          <div
            className="flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
              <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-3xl">
                {tr.tech.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={tr.cv.close}
                data-cursor-hover
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                &times;
              </button>
            </div>
            <div className="min-h-0 overflow-y-auto overscroll-contain px-5 pt-6 sm:px-8 sm:pt-8">
              <TechCategories lang={lang} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
