import Link from "next/link";
import Reveal from "./Reveal";
import { METIERS } from "../metiers/metiers-data";

// Section "Metiers" de /agents : un badge par metier, chacun est un VRAI lien
// vers /metiers/[slug] (roadmap SEO A3, 17/09). L'ancienne modale cachait les
// pages aux robots : 15 pages sur 17 n'etaient liees de nulle part. La page
// metier porte le flyer, le partage et le bouton "En parler a Nate".
export default function MetierBadges() {
  return (
    <section className="bg-white text-black border-t border-black/10">
      {/* min-h-[100svh] : la section occupe un ecran entier, desktop comme
          mobile (svh = hauteur reellement visible, barre d'adresse deduite).
          justify-center la centre verticalement ; si le contenu depasse sur un
          tres petit ecran, min-h laisse la section grandir. */}
      {/* Au bureau, tout grandit d'un cran (Nathan, 29/09 : sur grand ecran la
          section paraissait perdue au milieu d'un ecran entier) : titre,
          phrase, et surtout les badges, plus larges et plus lisibles. */}
      <Reveal className="min-h-[100svh] max-w-5xl xl:max-w-6xl mx-auto px-6 py-12 flex flex-col justify-center text-center">
        {/* Ancre sur le titre : la section fait un ecran entier et centre son
            contenu, viser son bord haut arrivait au-dessus du texte. Plus de
            petit titre "Métiers" au-dessus : retire par Nathan le 14/09, la
            question se suffit a elle-meme. */}
        <h2
          id="metiers"
          className="scroll-mt-10 font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance"
        >
          Et pour votre métier, ça donne quoi ?
        </h2>
        <p className="mt-4 lg:mt-6 text-[15px] md:text-base lg:text-lg xl:text-xl opacity-70 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          Choisissez votre métier et découvrez 5 demandes concrètes à confier à votre
          agent.
        </p>

        <div className="mt-10 lg:mt-14 flex flex-wrap justify-center gap-2.5 md:gap-3 lg:gap-4">
          {METIERS.map((metier) => (
            <Link
              key={metier.slug}
              href={`/metiers/${metier.slug}`}
              data-cursor-hover
              data-clic={`clic-agents-metier-${metier.slug}`}
              className="inline-flex items-center gap-2 lg:gap-2.5 rounded-full border border-black/15 bg-white px-4 py-2 lg:px-6 lg:py-3 xl:px-7 xl:py-3.5 font-mono text-[12px] md:text-[13px] lg:text-[15px] xl:text-base transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            >
              <span aria-hidden="true" className="lg:text-[1.2em] leading-none">{metier.emoji}</span>
              {metier.badge}
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
