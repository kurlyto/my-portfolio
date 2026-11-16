"use client";

import { useState } from "react";
import CvModal from "./CvModal";

// Deuxieme grille du portfolio, sous les projets (demande de Nathan, 28/10/2026) :
// ses autres contenus. Fond noir comme le haut de page pour la distinguer de la
// grille blanche des projets ; chaque carte montre une vraie image (couvertures
// des derniers articles, une photo de voyage, la premiere page du CV) avec un
// titre dans la police du haut de page. Les articles arrivent en props depuis la
// page serveur. Miniatures du CV : pdftoppm sur public/cv/, a refaire quand le CV change.
const TEXTES = {
  fr: {
    articles: "Articles",
    nbArticles: (n) => `${n} articles publiés`,
    photos: "Photographies",
    bientot: "Bientôt",
    cv: "CV",
    voirCv: "Voir le CV",
  },
  en: {
    articles: "Articles",
    nbArticles: (n) => `${n} articles in French`,
    photos: "Photography",
    bientot: "Coming soon",
    cv: "Resume",
    voirCv: "View resume",
  },
};

const CARTE =
  "group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-[#151515] p-7 text-left text-white ring-1 ring-white/[0.06] max-sm:h-[380px]";
const CARTE_ACTIVE = "transition-transform duration-300 ease-out hover:-translate-y-1.5";

function Legende({ titre, ligne }) {
  return (
    <div className="relative">
      <h3 className="font-display text-4xl font-black tracking-tight">{titre}</h3>
      {ligne && <p className="mt-1.5 text-[14px] text-white/60">{ligne}</p>}
    </div>
  );
}

function Fleche() {
  return (
    <span
      aria-hidden
      className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-colors duration-150 group-hover:bg-accent group-hover:text-accent-ink"
    >
      &rarr;
    </span>
  );
}

// Les couvertures des derniers articles, en eventail.
const EVENTAIL = [
  "-rotate-[8deg] -translate-x-[58%] translate-y-4 group-hover:-rotate-[11deg]",
  "z-[1] -translate-x-1/2 group-hover:-translate-y-2",
  "rotate-[8deg] -translate-x-[42%] translate-y-4 group-hover:rotate-[11deg]",
];

export default function AutresRubriques({ lang = "fr", nbArticles, couvertures = [] }) {
  const [cvOpen, setCvOpen] = useState(false);
  const tx = TEXTES[lang] || TEXTES.fr;

  return (
    <section className="bg-black">
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-24 max-sm:py-16 md:grid-cols-3">
        <a
          href="/blog"
          data-cursor-hover
          data-clic="clic-portfolio-rubrique-articles"
          className={`${CARTE} ${CARTE_ACTIVE}`}
        >
          <Fleche />
          <div className="absolute inset-x-0 top-14 h-[210px]">
            {couvertures.slice(0, 3).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- couverture decorative servie depuis /public
              <img
                key={src}
                src={src}
                alt=""
                className={`absolute left-1/2 top-0 aspect-[16/10] w-[62%] rounded-xl object-cover shadow-[0_20px_40px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-transform duration-500 ease-out ${EVENTAIL[i]}`}
              />
            ))}
          </div>
          <Legende titre={tx.articles} ligne={tx.nbArticles(nbArticles)} />
        </a>

        <div className={CARTE}>
          {/* eslint-disable-next-line @next/next/no-img-element -- photo de voyage de Nathan */}
          <img
            src="/images/bateau.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <span className="absolute right-6 top-6 rounded-full bg-black/40 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
            {tx.bientot}
          </span>
          <Legende titre={tx.photos} />
        </div>

        <button
          type="button"
          onClick={() => setCvOpen(true)}
          data-cursor-hover
          data-umami-event="clic-portfolio-rubrique-cv"
          className={`${CARTE} ${CARTE_ACTIVE}`}
        >
          <Fleche />
          {/* eslint-disable-next-line @next/next/no-img-element -- premiere page du CV */}
          <img
            src={`/images/cv-apercu-${lang === "en" ? "en" : "fr"}.webp`}
            alt=""
            className="absolute left-1/2 top-12 w-[64%] -translate-x-1/2 -rotate-[4deg] rounded-md shadow-[0_24px_50px_-10px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0"
          />
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#151515] via-[#151515]/95 to-transparent" />
          <Legende titre={tx.cv} ligne={tx.voirCv} />
        </button>
      </div>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </section>
  );
}
