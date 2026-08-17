import Link from "next/link";
import { notFound } from "next/navigation";
import MetierFlyer from "../../component/MetierFlyer";
import FlyerShareButton from "../../component/FlyerShareButton";
import { METIERS, getMetier } from "../metiers-data";

const SITE_URL = "https://nathan-knaebel.com";

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

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <header className="max-w-xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <Link
          href="/"
          data-cursor-hover
          className="font-mono text-[12px] uppercase tracking-widest transition-colors hover:text-[#ff6b35]"
        >
          &larr; nathan-knaebel.com
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <MetierFlyer metier={metier} />

        <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-3">
          <FlyerShareButton metier={metier} />
          {/* Le parametre metier fait ouvrir le chat avec le message
              pre-redige du metier (cf. HomePageContent) : le visiteur arrive
              sur la home et Nate sait deja de quel metier il s'agit. */}
          <Link
            href={`/?chat=1&metier=${metier.slug}`}
            data-cursor-hover
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#ff6b35] px-6 py-2.5 text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-wide text-[#ff6b35] transition-colors duration-150 ease-out hover:bg-[#ff6b35] hover:text-white"
          >
            En parler à Nate
          </Link>
        </div>

        <p className="mt-8 pb-6 text-center font-mono text-[12px] opacity-60">
          <Link
            href="/#metiers"
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
