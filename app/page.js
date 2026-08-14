import HomePageContent from "./component/HomePageContent";
import UnderConstruction from "./component/UnderConstruction";
import { QUESTIONS } from "./component/faq-questions";

const SITE_URL = "https://nathan-knaebel.com";

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
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Votre Agent IA",
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
        sameAs: ["https://github.com/kurlyto"],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Conception d'agents IA sur mesure",
        description:
          "Conception, hebergement et suivi d'agents IA autonomes qui prennent en charge des taches repetitives : mails, prospection, administratif, veille, reporting.",
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: "FR",
        url: `${SITE_URL}/agents`,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: QUESTIONS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
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
      <HomePageContent />
    </>
  );
}
