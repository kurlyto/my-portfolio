import AiosHomeContent from "./component/AiosHomeContent";
import UnderConstruction from "./component/UnderConstruction";
import { QUESTIONS_AIOS, stripEmphasisAios } from "./component/aios-content";

const SITE_URL = "https://nathan-knaebel.com";

export const metadata = {
  // Titre absolu : le gabarit du layout ajouterait un suffixe "Votre Agent IA",
  // qui est le nom de l'AUTRE site (celui des agents, sur /agents).
  title: { absolute: "Foxy - l'AIOS qui connaît tout votre business" },
  description:
    "Foxy voit vos mails, votre agenda, vos clients et vos tâches au même endroit. Vous lui parlez, il s'occupe du reste. Accès anticipé, places limitées.",
  alternates: { canonical: SITE_URL },
  // L'onglet du navigateur porte l'enseigne du site qu'on regarde : le renard
  // ici, le NK sur /agents (herite du layout).
  icons: {
    icon: [{ url: "/images/cover-aios.png", type: "image/png" }],
    apple: [{ url: "/images/cover-aios.png" }],
  },
  openGraph: {
    title: "Foxy - l'AIOS qui connaît tout votre business",
    description:
      "Mails, agenda, clients, tâches : un seul interlocuteur qui connaît votre entreprise et agit pour vous.",
    url: SITE_URL,
    // Version a fond plein : le logo du site est detoure, et un PNG transparent
    // se retrouve sur un fond impose (souvent noir) dans les apercus partages.
    images: [{ url: "/images/aios-partage.png", width: 512, height: 512, alt: "Foxy" }],
  },
};

// Le balisage est genere ici, dans un composant serveur : AiosHomeContent est
// un composant client, et un JSON-LD injecte apres l'hydratation n'est pas
// garanti d'etre vu par les robots.
//
// FAQPage reprend QUESTIONS_AIOS, la liste que la page affiche reellement. Ne
// pas y ajouter de question absente de l'ecran : Google traite un schema sans
// equivalent visible comme du balisage trompeur.
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Foxy",
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
        ],
        knowsAbout: [
          "Assistant IA pour entrepreneurs",
          "Agents IA autonomes",
          "Claude (Anthropic)",
          "SaaS",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#aios`,
        name: "Foxy",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description:
          "Assistant IA branche sur les mails, l'agenda, les documents et le suivi client d'une entreprise. Pilote au clavier ou a la voix, depuis un ordinateur ou un telephone.",
        author: { "@id": `${SITE_URL}/#person` },
        url: SITE_URL,
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: QUESTIONS_AIOS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: stripEmphasisAios(item.a) },
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
      <AiosHomeContent />
    </>
  );
}
