import Link from "next/link";
import { notFound } from "next/navigation";
import MetierFlyerShareable from "../../component/MetierFlyerShareable";
import Sommaire from "../../component/Sommaire";
import Footer from "../../component/FooterAvecArticles";
import Partager from "../../component/Partager";
import { LigneAuteur, MotsCles, LireAussi } from "../../component/ArticleExtras";
import { lireAussiPourMetier } from "../../blog/lire-aussi";
import { METIERS, getMetier } from "../metiers-data";
import { getFaqMetier } from "../metiers-faq";
import { getArticleMetier } from "../metiers-articles";
import { PROSE, dateLisible } from "../../blog/blog-data";

const SITE_URL = "https://nathan-knaebel.com";

function articleJsonLd(article, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    datePublished: article.date,
    dateModified: article.maj || article.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${SITE_URL}/metiers/${slug}`,
    keywords: article.motsCles.length ? article.motsCles.join(", ") : undefined,
    author: { "@type": "Person", name: "Nathan Knaebel", url: `${SITE_URL}/projects` },
  };
}

// Meme liste que celle affichee a l'ecran : un FAQPage annoncant des questions
// invisibles est du balisage trompeur pour Google.
function faqJsonLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function generateStaticParams() {
  return METIERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metier = getMetier(slug);
  if (!metier) return {};

  // Un metier qui a son article prend son title et sa description (ecrits pour
  // la recherche reelle : "agent ia restaurant", pas "Restaurateur / Food truck").
  const article = getArticleMetier(slug);
  const title = article?.titre || `Agent IA pour ${metier.title}`;
  const description =
    article?.description ||
    `${metier.title} : ${metier.demandes.length} demandes concrètes à confier à votre agent IA. 1 mois d'essai 100% gratuit, sans engagement.`;
  const url = `${SITE_URL}/metiers/${slug}`;

  return {
    title,
    description,
    // Chaque page declare son canonical, sinon elle herite de celui de la
    // home et Google la voit comme un doublon (regle du layout racine).
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Votre Agent IA",
      locale: "fr_FR",
      type: "website",
    },
  };
}

// Page partageable d'un flyer metier : pensee pour etre envoyee telle quelle
// a quelqu'un (WhatsApp, SMS, mail). Pas de header complet : le flyer est le
// contenu, avec juste un retour vers le site et les deux actions utiles.
export default async function MetierPage({ params }) {
  const { slug } = await params;
  const metier = getMetier(slug);
  if (!metier) notFound();
  const faq = getFaqMetier(slug);
  const article = getArticleMetier(slug);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <header className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <Link
          href="/agents"
          data-cursor-hover
          className="font-mono text-[12px] uppercase tracking-widest transition-colors hover:text-[#ff6b35]"
        >
          &larr; nathan-knaebel.com
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <MetierFlyerShareable metier={metier} titreH1={!article} />

        {/* Le flyer reste en tete (c'est lui qu'on partage) ; l'article porte le
            H1 et le texte que Google lit. */}
        {article && (
          <article className="mt-12">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, slug)) }}
            />
            <h1 className="font-display text-3xl sm:text-4xl font-black leading-tight">{article.h1}</h1>
            <LigneAuteur
              dateTexte={dateLisible(article.date)}
              majTexte={article.maj ? dateLisible(article.maj) : null}
              minutes={article.minutes}
            />

            <Sommaire chapitres={article.chapitres} />

            <div className={`${PROSE} article-metier`} dangerouslySetInnerHTML={{ __html: article.html }} />

            <MotsCles mots={article.motsCles} />
            <div className="mt-8 border-t border-black/10 pt-6">
              <Partager url={`${SITE_URL}/metiers/${slug}`} titre={article.titre} />
            </div>
          </article>
        )}

        {faq.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-metier">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
            <h2 id="faq-metier" className="font-display text-2xl font-bold">
              Questions fréquentes
            </h2>
            {/* <details> natif : les reponses sont dans le HTML des le premier
                octet (lues par Google et les IA), sans JavaScript. */}
            <div className="mt-6 border-t border-black/10">
              {faq.map((item) => (
                <details key={item.q} className="group border-b border-black/10">
                  <summary
                    data-cursor-hover
                    className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden"
                  >
                    {/* Espace insecable devant ? et : (typographie francaise) :
                        sans elle, le point d'interrogation tombe seul a la ligne. */}
                    <h3 className="font-display text-[17px] font-bold leading-snug">
                      {item.q.replace(/ ([?:!])/g, " $1")}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 font-mono text-xl leading-none transition-transform group-open:rotate-45 group-open:text-[#ff6b35]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 pr-6 text-[15px] leading-relaxed text-black/70">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {article && <LireAussi liens={lireAussiPourMetier(slug, article.lireAussi)} />}

        <p className="mt-8 pb-6 text-center font-mono text-[12px] opacity-60">
          <Link
            href="/agents#metiers"
            data-cursor-hover
            data-clic="clic-metier-voir-les-autres-metiers"
            className="underline underline-offset-4 transition-colors hover:text-[#ff6b35] hover:opacity-100"
          >
            Voir les autres métiers &rarr;
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
