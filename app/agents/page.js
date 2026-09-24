import HomePageContent from "../component/HomePageContent";
import { articlesPiedDePage } from "../component/FooterAvecArticles";
import UnderConstruction from "../component/UnderConstruction";
import { QUESTIONS, stripEmphasis } from "../component/faq-questions";

const SITE_URL = "https://nathan-knaebel.com";
const PAGE_URL = `${SITE_URL}/agents`;

export const metadata = {
  // Titre absolu : le gabarit du layout ("%s | Votre Agent IA") ajouterait ici
  // un suffixe qui repete le titre.
  title: { absolute: "Votre Agent IA - un agent sur mesure pour votre métier" },
  description:
    "Un agent IA sur mesure qui prend en charge une tâche précise de votre entreprise : mails, prospection, devis, relances, veille. Premier mois d'essai gratuit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Votre Agent IA",
    description:
      "Un agent IA sur mesure qui prend en charge une tâche précise de votre entreprise.",
    url: PAGE_URL,
    // Une page qui declare son openGraph REMPLACE en bloc celui du layout :
    // type, nom du site et image se redonnent ici.
    siteName: "Votre Agent IA",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/partage-agents.png", width: 1200, height: 627, alt: "Votre Agent IA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Votre Agent IA",
    description:
      "Un agent IA sur mesure qui prend en charge une tâche précise de votre entreprise.",
    images: ["/images/partage-agents.png"],
  },
};

// Le balisage est genere ici, dans un composant serveur : HomePageContent est
// un composant client, et un JSON-LD injecte apres l'hydratation n'est pas
// garanti d'etre vu par les robots.
//
// FAQPage reprend QUESTIONS, la liste que la page affiche reellement. Ne pas
// y ajouter de question qui ne serait pas visible a l'ecran : Google traite un
// schema sans equivalent visible comme du balisage trompeur.
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // Pas de noeud WebSite ici : il est declare une seule fois, sur la
      // racine du site. Le redeclarer par page donnerait deux definitions
      // concurrentes du meme site.
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
          "Automatisation de taches metier",
          "Claude (Anthropic)",
          "SaaS",
        ],
        worksFor: {
          "@type": "Organization",
          "@id": "https://mondevisdentaire.fr/#organization",
          name: "Mon Devis Dentaire",
          url: "https://mondevisdentaire.fr",
        },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Conception d'agents IA sur mesure",
        description:
          "Conception, hebergement et suivi d'agents IA autonomes qui prennent en charge des taches repetitives : mails, prospection, administratif, veille, reporting.",
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: "FR",
        url: `${SITE_URL}/agents/exemples`,
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: QUESTIONS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: stripEmphasis(item.a) },
        })),
      },
    ],
  };
}

export default function AgentsPage() {
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
      <HomePageContent articles={articlesPiedDePage()} />
    </>
  );
}
