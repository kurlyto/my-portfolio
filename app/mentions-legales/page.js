import Link from "next/link";
import Header from "../component/Header";
import Footer from "../component/FooterAvecArticles";

export const metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et informations légales du site nathan-knaebel.com.",
  alternates: { canonical: "https://nathan-knaebel.com/mentions-legales" },
  robots: { index: true, follow: true },
};

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl md:text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-black/75">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="bg-white text-black">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Mentions légales</h1>

        <Section title="Éditeur du site">
          <p>
            Nathan Knaebel, entrepreneur individuel (micro-entreprise).
            <br />
            Siège social : 40 rue du Tivoli, 67000 Strasbourg, France
            <br />
            SIRET : 10976206200015 (SIREN : 109762062)
            <br />
            Code APE : 62.02A - Conseil en systèmes et logiciels informatiques
            <br />
            Immatriculée au Registre national des entreprises le 10 septembre 2026.
            <br />
            TVA non applicable, article 293 B du Code général des impôts.
            <br />
            Contact :{" "}
            <a href="mailto:nathan.knaebel@gmail.com" className="underline hover:text-[#ff6b35]">
              nathan.knaebel@gmail.com
            </a>
            <br />
            Directeur de la publication : Nathan Knaebel
          </p>
        </Section>

        <Section title="Hébergement">
          <p>
            Scaleway SAS
            <br />
            BP 438, 75366 Paris Cedex 08, France
            <br />
            <a
              href="https://www.scaleway.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#ff6b35]"
            >
              scaleway.com
            </a>
          </p>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L&apos;ensemble du contenu de ce site — textes, visuels, code — est protégé par le droit
            d&apos;auteur. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </Section>

        <Section title="Données personnelles">
          <p>
            Le traitement des données personnelles est détaillé dans la{" "}
            <Link href="/confidentialite" className="underline hover:text-[#ff6b35]">
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            Ce site n&apos;utilise pas de cookie publicitaire ni de traceur tiers. La mesure
            d&apos;audience est assurée par Umami, qui fonctionne sans cookie et sans profilage. Le
            navigateur conserve localement l&apos;état de votre conversation avec l&apos;assistant,
            uniquement pour vous permettre de la reprendre si vous fermez la page.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
