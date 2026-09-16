import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import {
  tousLesArticles,
  getArticle,
  enHtml,
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

// Le texte vient du Markdown : on style les balises generees depuis le conteneur
// plutot que d'ajouter un plugin de typographie.
const PROSE =
  "mt-10 text-[17px] leading-[1.75] text-black/85 " +
  "[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-4 " +
  "[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-3 " +
  "[&_p]:my-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 " +
  "[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#ff6b35] [&_strong]:font-semibold [&_strong]:text-black " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-[#ff6b35] [&_blockquote]:pl-5 [&_blockquote]:italic " +
  "[&_img]:my-8 [&_img]:rounded-xl [&_img]:w-full " +
  "[&_code]:font-mono [&_code]:text-[15px] [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:rounded " +
  "[&_pre]:my-6 [&_pre]:bg-black [&_pre]:text-white [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 " +
  "[&_table]:my-6 [&_table]:w-full [&_table]:text-[15px] [&_th]:text-left [&_th]:border-b-2 [&_th]:border-black/20 [&_th]:py-2 [&_th]:pr-3 " +
  "[&_td]:border-b [&_td]:border-black/10 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top";

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

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
            {FORMATS[a.format] || a.format} · {dateLisible(a.date)} · {a.minutes} min de lecture
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{a.titre}</h1>
          <p className="mt-5 text-[19px] leading-relaxed text-black/70">{a.description}</p>
          <p className="mt-6 text-[14px] text-black/60">
            Par Nathan Knaebel
            {a.maj && <> · mis à jour le {dateLisible(a.maj)}</>}
          </p>

          {a.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={a.image} alt={a.imageAlt} className="mt-10 w-full rounded-xl" />
          )}

          <div className={PROSE} dangerouslySetInnerHTML={{ __html: enHtml(a.contenu) }} />
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
      </main>

      <Footer />
    </div>
  );
}
