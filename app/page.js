import AgenceHomeContent from "./component/AgenceHomeContent";
import UnderConstruction from "./component/UnderConstruction";

const SITE_URL = "https://nathan-knaebel.com";
const TITRE = "Nathan Knaebel - agence IA : Foxy et agents IA sur mesure";
const DESCRIPTION =
  "Des IA qui travaillent pour votre entreprise : Foxy, un bras droit qui connaît tout votre business, et des agents IA sur mesure pour une tâche précise.";

export const metadata = {
  // Titre absolu : le gabarit du layout ajouterait "| Votre Agent IA", le nom
  // d'une seule des deux offres.
  title: { absolute: TITRE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  // Une page qui declare son openGraph REMPLACE en bloc celui du layout (Next
  // ne fusionne pas) : type, nom du site et image se redonnent donc ici, sinon
  // LinkedIn n'a rien pour fabriquer son apercu.
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Nathan Knaebel - agence IA",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/partage-agence.png", width: 1200, height: 627, alt: TITRE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
    images: ["/images/partage-agence.png"],
  },
};

// Accueil de l'agence depuis le 16/09/2026 (Foxy, qui etait ici, vit sur
// /foxy). C'est la racine : le noeud WebSite n'est declare qu'ici, les autres
// pages renvoient a la meme Person par son @id.
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Nathan Knaebel",
        inLanguage: "fr-FR",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Nathan Knaebel",
        url: SITE_URL,
        image: `${SITE_URL}/images/logo-nk.png`,
        jobTitle: "Concepteur d'agents IA",
        sameAs: [
          "https://github.com/kurlyto",
          "https://linkedin.com/in/nathan-knaebel",
          "https://www.malt.fr/profile/nathanknaebel",
        ],
        knowsAbout: [
          "Agents IA autonomes",
          "Assistant IA pour entrepreneurs",
          "Automatisation de taches metier",
          "Claude (Anthropic)",
        ],
      },
    ],
  };
}

export default function Home() {
  const isUnderConstruction = process.env.NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION === "true";

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      <AgenceHomeContent />
    </>
  );
}
