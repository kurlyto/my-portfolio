import AiosHomeContent from "../component/AiosHomeContent";
import { articlesPiedDePage } from "../component/FooterAvecArticles";
import UnderConstruction from "../component/UnderConstruction";
import { QUESTIONS_AIOS, stripEmphasisAios } from "../component/aios-content";

const SITE_URL = "https://nathan-knaebel.com";
// Foxy a quitte la racine le 16/09/2026 : la racine est devenue l'accueil de
// l'agence, qui presente Foxy parmi ses offres.
const PAGE_URL = `${SITE_URL}/foxy`;

export const metadata = {
  // Titre absolu : le gabarit du layout ajouterait un suffixe "Votre Agent IA",
  // qui est le nom de l'AUTRE site (celui des agents, sur /agents).
  title: { absolute: "Foxy - l'AIOS qui connaît tout votre business" },
  description:
    "Foxy voit vos mails, votre agenda, vos clients et vos tâches au même endroit. Vous lui parlez, il s'occupe du reste. Accès anticipé, places limitées.",
  alternates: { canonical: PAGE_URL },
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
    url: PAGE_URL,
    // Une page qui declare son openGraph REMPLACE en bloc celui du layout :
    // type, nom du site et langue se redonnent ici.
    siteName: "Foxy",
    locale: "fr_FR",
    type: "website",
    // Format paysage 1200x627 attendu par LinkedIn : l'ancien carre de 512 px
    // lui faisait repondre "impossible de generer un apercu" (21/09/2026).
    images: [{ url: "/images/partage-foxy.png", width: 1200, height: 627, alt: "Foxy, un bras droit qui connaît tout votre business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Foxy - l'AIOS qui connaît tout votre business",
    description:
      "Mails, agenda, clients, tâches : un seul interlocuteur qui connaît votre entreprise et agit pour vous.",
    images: ["/images/partage-foxy.png"],
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
      // Pas de noeud WebSite ici : il est declare une seule fois, sur la
      // racine (l'accueil de l'agence).
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
        "@id": `${PAGE_URL}#foxy`,
        name: "Foxy",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, iOS, Android",
        description:
          "Assistant IA branche sur les mails, l'agenda, les documents et le suivi client d'une entreprise. Pilote au clavier ou a la voix, depuis un ordinateur ou un telephone.",
        author: { "@id": `${SITE_URL}/#person` },
        url: PAGE_URL,
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: QUESTIONS_AIOS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: stripEmphasisAios(item.a) },
        })),
      },
    ],
  };
}

export default function FoxyPage() {
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
      <AiosHomeContent articles={articlesPiedDePage()} />
    </>
  );
}
