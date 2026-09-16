import Link from "next/link";
import { notFound } from "next/navigation";
import MetierFlyerShareable from "../../component/MetierFlyerShareable";
import { METIERS, getMetier } from "../metiers-data";
import { getFaqMetier } from "../metiers-faq";

const SITE_URL = "https://nathan-knaebel.com";

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

  const title = `Agent IA pour ${metier.title}`;
  const description = `${metier.title} : 6 demandes concrètes à confier à votre agent IA. 1 mois d'essai 100% gratuit, sans engagement.`;
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
        <MetierFlyerShareable metier={metier} />

        {faq.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-metier">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faq)) }} />
            <h2 id="faq-metier" className="font-display text-2xl font-bold">
              Vos questions sur un agent IA : {metier.title}
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

        <p className="mt-8 pb-6 text-center font-mono text-[12px] opacity-60">
          <Link
            href="/agents#metiers"
            data-cursor-hover
            className="underline underline-offset-4 transition-colors hover:text-[#ff6b35] hover:opacity-100"
          >
            Voir les autres métiers &rarr;
          </Link>
        </p>
      </main>
    </div>
  );
}
