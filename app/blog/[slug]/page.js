import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../component/Header";
import Footer from "../../component/FooterAvecArticles";
import Sommaire from "../../component/Sommaire";
import Partager from "../../component/Partager";
import { LigneAuteur, MotsCles, LireAussi } from "../../component/ArticleExtras";
import { lireAussiPourArticle } from "../lire-aussi";
import {
  tousLesArticles,
  getArticle,
  enHtmlAvecChapitres,
  PROSE,
  pageMere,
  dateLisible,
  FORMATS,
  SITE_URL,
} from "../blog-data";

// Seuls les articles connus au build existent : une adresse inventee = 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return tousLesArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: a.titre,
    description: a.description,
    alternates: { canonical: url },
    robots: { index: a.statut === "publie", follow: true },
    openGraph: {
      title: a.titre,
      description: a.description,
      url,
      type: "article",
      locale: "fr_FR",
      publishedTime: a.date,
      modifiedTime: a.maj || a.date,
      authors: ["Nathan Knaebel"],
      images: a.image ? [{ url: `${SITE_URL}${a.image}`, alt: a.imageAlt }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const { html, chapitres } = enHtmlAvecChapitres(a.contenu);

  const url = `${SITE_URL}/blog/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    dateModified: a.maj || a.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: url,
    image: a.image ? `${SITE_URL}${a.image}` : undefined,
    keywords: a.motsCles.length ? a.motsCles.join(", ") : undefined,
    author: { "@type": "Person", name: "Nathan Knaebel", url: `${SITE_URL}/projects` },
    publisher: { "@type": "Person", name: "Nathan Knaebel" },
  };

  return (
    <div className="bg-white text-black">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <Link
          href="/blog"
          data-cursor-hover
          className="inline-flex py-2 font-mono text-[12px] uppercase tracking-widest text-black/60 hover:text-[#ff6b35] transition-colors"
        >
          &larr; Le blog
        </Link>

        <article>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-widest text-black/50">
            {FORMATS[a.format] || a.format}
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{a.titre}</h1>
          <p className="mt-5 text-[19px] leading-relaxed text-black/70">{a.description}</p>
          <LigneAuteur
            dateTexte={dateLisible(a.date)}
            majTexte={a.maj ? dateLisible(a.maj) : null}
            minutes={a.minutes}
          />
          <div className="mt-5">
            <Partager url={url} titre={a.titre} libelle="Partager" />
          </div>

          {a.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.image} alt={a.imageAlt} className="mt-10 w-full rounded-xl" />
          )}

          <Sommaire chapitres={chapitres} />

          {/* Memes chapitres numerotes, encadres et illustrations que les pages
              metier (article-metier dans globals.css). */}
          <div className={`${PROSE} article-metier`} dangerouslySetInnerHTML={{ __html: html }} />

          <MotsCles mots={a.motsCles} />
          <div className="mt-8 border-t border-black/10 pt-6">
            <Partager url={url} titre={a.titre} />
          </div>
        </article>

        {/* L'appel a l'action suit la grappe : un article Foxy mene a Foxy, les
            autres aux agents sur mesure (ou a la page du metier). */}
        <aside className="mt-16 rounded-2xl bg-[#fafafa] border border-black/10 p-6 md:p-8">
          <p className="font-display text-xl font-bold">Et chez vous, ça donnerait quoi ?</p>
          <p className="mt-2 text-[15px] leading-relaxed text-black/70">
            {a.grappe === "foxy"
              ? "Foxy est l'assistant qui connaît votre entreprise : vos mails, votre agenda, vos clients. Essayez-le directement sur la page."
              : "Je construis des agents IA pour les petites entreprises. Racontez-moi votre quotidien, je vous dis ce qu'un agent peut en prendre."}
          </p>
          <Link
            href={pageMere(a.grappe)}
            data-cursor-hover
            className="mt-4 inline-flex py-2 font-mono text-[13px] uppercase tracking-widest underline underline-offset-4 hover:text-[#ff6b35] transition-colors"
          >
            {a.grappe === "foxy" ? "Découvrir Foxy" : "Voir ce qu'un agent peut faire"} &rarr;
          </Link>
        </aside>

        <LireAussi liens={lireAussiPourArticle(a)} large />
      </main>

      <Footer />
    </div>
  );
}
