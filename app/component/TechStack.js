"use client";

import { useState } from "react";
import { CATEGORIES, Logo } from "./TechGrid";
import { t as tr } from "../lib/i18n-projects";

// La stack complete sous les cartes de projets (demande de Nathan du 16/11/2026).
// - Ordinateur : TOUTE la largeur de l'ecran, ilots plus grands (Nathan : "plein
//   d'espace vide a gauche et a droite").
// - Telephone : la liste complete faisait ~5 ecrans. Seules les familles
//   s'affichent ; un toucher deplie ses outils (une famille ouverte a la fois).

function Pastille({ item, grand }) {
  return (
    <li
      className={`flex items-center rounded-full border border-white/15 bg-white/[0.04] font-medium text-white/85 ${
        grand ? "gap-2.5 py-1.5 pl-1.5 pr-4 text-[15px]" : "gap-2 py-1 pl-1 pr-3.5 text-[13px]"
      }`}
    >
      <Logo item={item} size={grand ? "h-8 w-8" : "h-7 w-7"} />
      {item.label}
    </li>
  );
}

export default function TechStack({ lang = "fr" }) {
  const [ouverte, setOuverte] = useState(null);
  const en = lang === "en";

  return (
    <section id="stack" className="bg-black py-16 text-white md:py-24">
      <div className="px-6 lg:px-12 2xl:px-16">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          {tr(lang).tech.title}
        </h2>

        {/* Ordinateur et tablette : tout deplie, sur toute la largeur. */}
        <div className="mt-14 hidden gap-x-12 sm:block sm:columns-2 lg:columns-3 2xl:columns-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.fr} className="mb-11 break-inside-avoid">
              <h3 className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-accent">
                {en ? cat.en : cat.fr}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <Pastille key={item.label} item={item} grand />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Telephone : les familles seules, un toucher deplie les outils. */}
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 sm:hidden">
          {CATEGORIES.map((cat) => {
            const ouvert = ouverte === cat.fr;
            return (
              <li key={cat.fr}>
                <button
                  type="button"
                  aria-expanded={ouvert}
                  onClick={() => setOuverte(ouvert ? null : cat.fr)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className={`font-mono text-[12px] font-bold uppercase tracking-[0.18em] ${ouvert ? "text-accent" : "text-white/85"}`}>
                    {en ? cat.en : cat.fr}
                    <span className="ml-2 text-white/40">{cat.items.length}</span>
                  </span>
                  <span
                    aria-hidden
                    className={`text-lg text-white/50 transition-transform duration-200 ${ouvert ? "rotate-45 text-accent" : ""}`}
                  >
                    +
                  </span>
                </button>
                {ouvert && (
                  <ul className="flex flex-wrap gap-2 pb-5">
                    {cat.items.map((item) => (
                      <Pastille key={item.label} item={item} />
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
