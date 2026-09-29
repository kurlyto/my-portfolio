import { cookies, headers } from "next/headers";
import PersoHomeContent from "./component/PersoHomeContent";
import UnderConstruction from "./component/UnderConstruction";
import { LANG_COOKIE, detectLang } from "./lib/i18n-projects";

const SITE_URL = "https://nathan-knaebel.com";

const META = {
  fr: {
    titre: "Nathan Knaebel : ingénieur, CTO et concepteur d'IA",
    description:
      "Ingénieur, co-fondateur et CTO de Mon Devis Dentaire, je conçois des IA pour les entreprises. Mon parcours, mes produits, mes projets, mes articles et mes voyages.",
    locale: "fr_FR",
  },
  en: {
    titre: "Nathan Knaebel: engineer, CTO and AI builder",
    description:
      "Engineer, co-founder and CTO of Mon Devis Dentaire, I build AI for businesses. My career, my products, my projects, my articles and my travels.",
    locale: "en_US",
  },
};

// Accueil bilingue (cf app/lib/i18n-projects.js) : la langue du navigateur,
// sauf choix explicite sur la bascule FR/EN. Lire l'en-tete rend la page
// dynamique : c'est voulu, une page en cache servirait la meme langue a tous.
// Sans en-tete (robots de Google, apercus LinkedIn ou WhatsApp) : le francais,
// la langue d'origine du site, pour l'indexation comme pour l'apercu d'un lien.
async function currentLang() {
  const [h, c] = await Promise.all([headers(), cookies()]);
  return detectLang(h.get("accept-language"), c.get(LANG_COOKIE)?.value, "fr");
}

export async function generateMetadata() {
  const lang = await currentLang();
  const { titre, description, locale } = META[lang];

  return {
    // Titre absolu : le gabarit du layout ajouterait "| Votre Agent IA", le nom
    // d'une seule des offres.
    title: { absolute: titre },
    description,
    alternates: { canonical: SITE_URL },
    // Une page qui declare son openGraph REMPLACE en bloc celui du layout (Next
    // ne fusionne pas) : type, nom du site et image se redonnent donc ici, sinon
    // LinkedIn n'a rien pour fabriquer son apercu.
    openGraph: {
      title: titre,
      description,
      url: SITE_URL,
      siteName: "Nathan Knaebel",
      locale,
      type: "website",
      images: [{ url: "/images/partage-accueil.png", width: 1200, height: 627, alt: titre }],
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: ["/images/partage-accueil.png"],
    },
  };
}

// Accueil perso de Nathan depuis le 28/09/2026 (avant : l'accueil de l'agence,
// AgenceHomeContent ; Foxy vit sur /foxy, les agents sur /agents). C'est la
// racine : le noeud WebSite n'est declare qu'ici, les autres pages renvoient a
// la meme Person par son @id.
function buildJsonLd(lang) {
  const en = lang === "en";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Nathan Knaebel",
        inLanguage: en ? "en" : "fr-FR",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Nathan Knaebel",
        url: SITE_URL,
        image: `${SITE_URL}/images/profile-pic.png`,
        jobTitle: en
          ? "Co-founder and CTO of Mon Devis Dentaire, AI agent builder"
          : "Co-fondateur et CTO de Mon Devis Dentaire, concepteur d'agents IA",
        alumniOf: { "@type": "CollegeOrUniversity", name: en ? "CESI Engineering School" : "École d'ingénieurs CESI" },
        sameAs: [
          "https://github.com/kurlyto",
          "https://linkedin.com/in/nathan-knaebel",
          "https://www.malt.fr/profile/nathanknaebel",
        ],
        knowsAbout: en
          ? [
              "Autonomous AI agents",
              "AI assistant for entrepreneurs",
              "Business task automation",
              "Claude (Anthropic)",
              "Industrial quality and supply chain",
            ]
          : [
              "Agents IA autonomes",
              "Assistant IA pour entrepreneurs",
              "Automatisation de taches metier",
              "Claude (Anthropic)",
              "Qualite et supply chain industrielles",
            ],
      },
    ],
  };
}

export default async function Home() {
  const isUnderConstruction = process.env.NEXT_PUBLIC_SITE_UNDER_CONSTRUCTION === "true";

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }

  const lang = await currentLang();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
      />
      <PersoHomeContent lang={lang} />
    </>
  );
}
