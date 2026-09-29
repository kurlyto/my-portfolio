import Link from "next/link";
import { Instrument_Serif } from "next/font/google";
import Header, { ContactIcons } from "./Header";
import Footer from "./FooterAvecArticles";
import Reveal from "./Reveal";
import LegacyFoxyAnchors from "./LegacyFoxyAnchors";
import ProjetsApercu from "./ProjetsApercu";
import { tousLesArticles, dateLisible, estPublie } from "../blog/blog-data";
import { contenuAccueil } from "./accueil-perso-data";

// Accueil perso de Nathan (racine du domaine depuis le 28/09/2026, avant :
// l'accueil de l'agence, AgenceHomeContent). C'est SON site : qui il est, puis
// ce qui en decoule. Les produits qui se vendent le plus ont leurs cartes des
// le premier ecran, chacune aux couleurs de son site ; suivent les six
// rubriques dans l'ordre fixe par Nathan (travail, etudes, projets, articles,
// voyages, autres), inspirees de marekdlugos.com.
//
// Direction artistique propre (theme-perso de globals.css) : papier chaud,
// encre, titres en Instrument Serif. La fonte n'est chargee qu'ici.
//
// Bilingue : `lang` vient de la page (langue du navigateur du visiteur, ou son
// choix sur la bascule FR/EN du menu), les textes de accueil-perso-data.js.
const serif = Instrument_Serif({
  variable: "--font-perso",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const BOUTON_PLEIN =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-ink px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide transition-all duration-150 hover:bg-accent-dark hover:-translate-y-0.5";
const BOUTON_CONTOUR =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide text-ink/75 transition-colors duration-150 hover:border-ink hover:text-ink";
const LIEN_SUITE =
  "inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-widest text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink";

// Une rubrique : son numero et son titre a gauche, le contenu a droite (empiles
// sur telephone). Le filet du haut reste dans la colonne de lecture.
function Rubrique({ id, numero, titre, children }) {
  return (
    <section id={id} className="scroll-mt-4">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="grid gap-8 border-t border-ink/10 py-14 md:grid-cols-[170px_minmax(0,1fr)] md:gap-12 md:py-20">
          <div>
            <span className="font-mono text-xs text-ink/40">{numero}</span>
            <h2 className="font-perso mt-1 text-4xl leading-none md:text-5xl">{titre}</h2>
          </div>
          <div className="min-w-0">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

function CarteProduit({ produit: p }) {
  const externe = p.href.startsWith("http");
  return (
    // La classe da-* pose les couleurs du site vise sur toute la carte.
    <li className={p.da}>
      <Link
        href={p.href}
        {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor-hover
        data-clic={p.evenement}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_30px_-18px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition-transform duration-200 ease-out hover:-translate-y-1"
      >
        <span className={`flex h-40 items-center justify-center md:h-48 ${p.couverture}`}>
          {/* Visuel local a taille fixe : next/image n'apporte rien ici. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.visuel} alt="" className={p.visuelClass} />
        </span>
        <span className="flex flex-1 flex-col p-6 md:p-7">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono font-bold uppercase tracking-widest">{p.nom}</span>
            <span className="text-ink/50">{p.pour}</span>
          </span>
          <span className="font-perso mt-3 text-[1.85rem] leading-[1.1]">{p.titre}</span>
          <span className="mt-3 text-[15px] leading-relaxed text-ink/65">{p.texte}</span>
          {/* mt-auto : les boutons s'alignent d'une carte a l'autre. Seul sur
              sa ligne (Nathan, 29/09 : plus de petite phrase a cote, qui le
              renvoyait a la ligne selon la longueur du texte). */}
          <span className="mt-auto flex pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-wide text-accent-ink transition-colors duration-150 group-hover:bg-accent-dark">
              {p.cta}
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </span>
          </span>
        </span>
      </Link>
    </li>
  );
}

// Case des logos (employeurs, ecole) EN LONGUEUR : les logos officiels de
// Continental et de Mon Devis Dentaire sont des mots, illisibles dans un carre.
// Largeur = colonne de COLONNE_LOGO (la frise passe par son milieu).
const COLONNE_LOGO = "grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)]";

function Logo({ src }) {
  return (
    <span className="relative z-10 flex h-11 w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-2 py-1.5 ring-1 ring-ink/10 md:h-14 md:w-24 md:px-2.5 md:py-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-contain" />
    </span>
  );
}

// Les realisations d'un poste, en courte liste a puces.
function Points({ points }) {
  return (
    <ul className="mt-2.5 space-y-1.5">
      {points.map((point) => (
        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink/75">
          <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

// Une ligne de liste (voyage, autre) : devient un lien le jour ou son recit
// existe (`recit` dans accueil-perso-data.js).
function Ligne({ titre, detail, quand, recit }) {
  const contenu = (
    <>
      <span className="min-w-0">
        <span className={`text-[16px] leading-snug md:text-[17px] ${recit ? "underline decoration-ink/25 underline-offset-4 group-hover:decoration-ink" : ""}`}>
          {titre}
          {recit && <span aria-hidden> &rarr;</span>}
        </span>
        {detail && <span className="mt-0.5 block text-[14px] text-ink/55">{detail}</span>}
      </span>
      {quand && <span className="shrink-0 font-mono text-[12px] text-ink/45">{quand}</span>}
    </>
  );
  const classe = "flex items-baseline justify-between gap-6 py-4";
  return (
    <li className="border-b border-ink/10 last:border-b-0">
      {recit ? (
        <Link href={recit} data-cursor-hover data-clic="clic-accueil-recit" className={`group ${classe}`}>
          {contenu}
        </Link>
      ) : (
        <div className={classe}>{contenu}</div>
      )}
    </li>
  );
}

export default function PersoHomeContent({ lang = "fr" }) {
  const articles = tousLesArticles().filter(estPublie).slice(0, 3);
  const { textes, produits, travail, etudes, langues, photos, voyages, autres, nombrePays, continents } =
    contenuAccueil(lang);

  return (
    <div className={`theme-perso ${serif.variable} bg-surface text-ink`}>
      <LegacyFoxyAnchors />
      <Header compactY site="perso" lang={lang} />

      {/* Premier ecran : qui il est. Sur telephone la photo passe au-dessus. */}
      <section className="mx-auto max-w-5xl px-6 pt-8 pb-14 md:pt-20 md:pb-20">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">{textes.kicker}</p>
            <h1 className="font-perso mt-4 text-[3.5rem] leading-[0.95] tracking-tight md:text-8xl">
              Nathan Knaebel
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-snug md:text-2xl">{textes.intro}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 md:text-lg">{textes.aCote}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#produits" data-cursor-hover data-clic="clic-accueil-hero-produits" className={`${BOUTON_PLEIN} w-full sm:w-fit`}>
                {textes.mesProduits} <span aria-hidden>&darr;</span>
              </a>
              <a
                href={textes.cv}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                data-clic="clic-accueil-hero-cv"
                className={`${BOUTON_CONTOUR} w-full sm:w-fit`}
              >
                {textes.monCv}
              </a>
            </div>
            {/* Les contacts, en haut de page (Nathan, 29/09) : le menu n'a plus
                la place de les porter a cote des six rubriques. */}
            <div className="mt-6">
              <ContactIcons compact zone="accueil-hero" lang={lang} />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- photo locale
              a taille fixe, next/image n'apporte rien ici. */}
          <img
            src="/images/profile-pic.png"
            alt="Nathan Knaebel"
            className="order-first h-24 w-24 rounded-full object-cover md:order-none md:h-64 md:w-64"
          />
        </div>
      </section>

      {/* Les produits : visibles tout de suite, chacun dans son univers. */}
      <section id="produits" className="scroll-mt-4">
        <Reveal className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
          <h2 className="font-perso text-4xl leading-none md:text-5xl">{textes.mesProduits}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
            {produits.map((produit) => (
              <CarteProduit key={produit.href} produit={produit} />
            ))}
          </ul>
        </Reveal>
      </section>

      <Rubrique id="travail" numero="01" titre={textes.travail}>
        {/* La frise : un trait relie les logos, du plus recent au plus ancien. */}
        <ol>
          {travail.map((poste, i) => (
            <li key={poste.poste} className={`relative grid ${COLONNE_LOGO} gap-x-5 pb-10 last:pb-0`}>
              {i < travail.length - 1 && (
                <span aria-hidden className="absolute left-[35.5px] top-12 bottom-1 w-px bg-ink/15 md:left-[47.5px] md:top-[60px]" />
              )}
              <Logo src={poste.logo} />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[17px] font-semibold leading-snug">{poste.poste}</h3>
                  <span className="font-mono text-[12px] text-ink/45">{poste.dates}</span>
                </div>
                <p className="mt-0.5 text-[15px] text-ink/55">{poste.entreprise}</p>
                <Points points={poste.points} />
              </div>
            </li>
          ))}
        </ol>
      </Rubrique>

      <Rubrique id="etudes" numero="02" titre={textes.etudes}>
        {etudes.map((etude) => (
          <div key={etude.diplome} className={`grid ${COLONNE_LOGO} gap-x-5`}>
            <Logo src={etude.logo} />
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[17px] font-semibold leading-snug">{etude.diplome}</h3>
                <span className="font-mono text-[12px] text-ink/45">{etude.dates}</span>
              </div>
              <p className="mt-0.5 text-[15px] text-ink/55">{etude.ecole}</p>
            </div>
          </div>
        ))}
        <h3 className="mt-10 font-mono text-[11px] uppercase tracking-widest text-ink/45">{textes.langues}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {langues.map(({ langue, niveau, drapeau }) => (
            <li key={langue} className="flex items-center gap-2.5 rounded-full bg-white py-2 pl-3 pr-4 text-[14px] ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={drapeau} alt="" className="h-3.5 w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10" />
              <span>
                <span className="font-semibold">{langue}</span> <span className="text-ink/55">{niveau}</span>
              </span>
            </li>
          ))}
        </ul>
      </Rubrique>

      <Rubrique id="projets" numero="03" titre={textes.projets}>
        <ProjetsApercu lang={lang} />
        <Link href="/projects" data-cursor-hover data-clic="clic-accueil-tous-les-projets" className={`mt-10 ${LIEN_SUITE}`}>
          {textes.tousLesProjets} <span aria-hidden>&rarr;</span>
        </Link>
      </Rubrique>

      <Rubrique id="articles" numero="04" titre={textes.articles}>
        {textes.articlesEnFrancais && <p className="mb-2 text-[15px] text-ink/55">{textes.articlesEnFrancais}</p>}
        <ul>
          {articles.map((a) => (
            <li key={a.slug} className="border-b border-ink/10 last:border-b-0">
              <Link
                href={`/blog/${a.slug}`}
                data-cursor-hover
                data-clic={`clic-accueil-article-${a.slug}`}
                className="group grid gap-1 py-5 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6"
              >
                <span className="font-mono text-[12px] text-ink/45 md:pt-2">{dateLisible(a.date, textes.formatDate)}</span>
                <span>
                  <span className="font-perso block text-[1.65rem] leading-tight decoration-1 underline-offset-4 group-hover:underline">
                    {a.titre}
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-[15px] leading-relaxed text-ink/60">
                    {a.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/blog" data-cursor-hover data-clic="clic-accueil-tous-les-articles" className={`mt-8 ${LIEN_SUITE}`}>
          {textes.tousLesArticles} <span aria-hidden>&rarr;</span>
        </Link>
      </Rubrique>

      <Rubrique id="voyages" numero="05" titre={textes.voyages}>
        <p className="flex items-baseline gap-3">
          <span className="font-perso text-6xl leading-none">{nombrePays}</span>
          <span className="text-[15px] text-ink/60">{textes.paysVisites}</span>
        </p>
        {/* Image construite par app/carte-voyages.svg depuis la liste des pays ;
            ?v= change avec leur nombre, pour qu'un navigateur ne garde pas
            l'ancienne carte en cache. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/carte-voyages.svg?v=${nombrePays}`}
          alt={textes.carteAlt}
          width={1000}
          height={436}
          loading="lazy"
          className="mt-6 h-auto w-full"
        />
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {continents.map((continent) => (
            <div key={continent.id}>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink/45">{continent.nom}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/75">{continent.pays.join(", ")}</p>
            </div>
          ))}
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-3 md:gap-4">
          {photos.map((photo) => (
            <li key={photo.src}>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[5/4] w-full rounded-xl object-cover"
                />
                <figcaption className="mt-2 text-[13px] text-ink/55">{photo.legende}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <ul className="mt-10">
          {voyages.map((voyage) => (
            <Ligne key={voyage.titre} {...voyage} />
          ))}
        </ul>
      </Rubrique>

      <Rubrique id="autres" numero="06" titre={textes.autres}>
        <ul>
          {autres.map((autre) => (
            <Ligne key={autre.titre} {...autre} />
          ))}
        </ul>
      </Rubrique>

      {/* Le pied de page EST la section contact (titre "Me contacter" et les
          boutons) : l'ancre y descend directement. */}
      <div id="contact" className="mt-10">
        <Footer showHomeLink={false} lang={lang} />
      </div>
    </div>
  );
}
