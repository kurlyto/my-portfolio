"use client";

import Link from "next/link";
import { PROJECTS } from "./ProjectCards";
import { PROJETS_MONTRES } from "./accueil-perso-data";

// Rubrique "Projets" de l'accueil perso : une selection des projets de
// /projects, produits compris, chacun avec sa vignette et sa description
// visible (Nathan, 29/09). Composant client parce que la liste vit dans
// ProjectCards (client, a cause de ses icones) : importee depuis une page
// serveur, elle n'arriverait pas comme donnee.
// Un projet en ligne s'ouvre directement ; les autres menent a /projects, ou
// ils sont decrits en entier.
export default function ProjetsApercu({ lang = "fr" }) {
  const projets = PROJETS_MONTRES.map((nom) => PROJECTS.find((p) => p.name === nom)).filter(Boolean);

  return (
    // Une seule colonne : a deux, la description tenait dans 235 px et
    // s'etirait sur 9 lignes.
    <ul className="space-y-6 md:space-y-7">
      {projets.map((p) => {
        const externe = p.link?.startsWith("http");
        const description = (lang === "en" && p.descriptionEn) || p.description;
        return (
          <li key={p.name}>
            <Link
              href={p.link || "/projects#projets"}
              {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              data-cursor-hover
              data-clic={`clic-accueil-projet-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="group grid grid-cols-[96px_minmax(0,1fr)] items-start gap-4 md:grid-cols-[128px_minmax(0,1fr)] md:gap-5"
            >
              <span
                className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ring-1 ring-black/5 ${p.cover}`}
              >
                {p.coverImage && (
                  // Vignette locale a taille fixe : next/image n'apporte rien ici.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.coverImage}
                    alt=""
                    className={`h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.04] ${
                      p.coverImageFit === "contain" ? "object-contain p-2.5" : "object-cover"
                    }`}
                  />
                )}
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[15px] font-semibold leading-snug underline-offset-4 group-hover:underline">
                    {(lang === "en" && p.nameEn) || p.name}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-ink/45">{p.years}</span>
                </span>
                {/* Bornee a 4 lignes sur telephone (la complete est sur /projects).
                    Pas de classe `block` ici : elle annulerait le line-clamp. */}
                <span className="mt-1 line-clamp-4 text-[14px] leading-relaxed text-ink/60 md:line-clamp-none md:text-[15px]">
                  {description}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
