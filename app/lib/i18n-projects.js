// Traduction de la SEULE page /projects (nav, hero, cartes, CV, pied de page).
// Le reste du site (vitrine d'agents, metiers, legal) reste en francais : il
// s'adresse a des clients francais, le portfolio est ce qu'on partage a
// l'etranger.
//
// Pas de framework i18n : deux dictionnaires et une prop `lang` qui descend
// depuis le composant serveur. Ajouter une 3e langue = ajouter une cle ici.

export const LANGS = ["fr", "en"];
export const DEFAULT_LANG = "fr";

// Nom du cookie qui memorise un choix EXPLICITE de l'utilisateur (le bouton
// FR/EN). Il prime toujours sur la detection automatique.
export const LANG_COOKIE = "pf-lang";

export const T = {
  fr: {
    meta: {
      title: "Projets - Nathan Knaebel",
      description: "Ce que j'ai construit : SaaS, jeux, agents IA, outils metier, cartes.",
    },
    nav: { cv: "Mon CV", projects: "Mes projets", switchTo: "Switch to English" },
    hero: {
      kicker: "Portfolio",
      tagline: "Ingénieur. Je construis des applications, des produits et des agents IA.",
      cta: "Voir mes projets",
    },
    tech: { title: "Déjà utilisés dans mes projets" },
    cards: { discover: "Découvrir", discoverAria: (name) => `Découvrir ${name}` },
    status: { wip: "En construction" },
    cv: { download: "Télécharger", close: "Fermer", title: "Mon CV" },
    footer: {
      contact: "Me contacter",
      home: "retour à l'accueil",
      legal: "Mentions légales",
      privacy: "Confidentialité",
    },
  },
  en: {
    meta: {
      title: "Projects - Nathan Knaebel",
      description: "What I have built: SaaS, games, AI agents, business tools, maps.",
    },
    nav: { cv: "My CV", projects: "My projects", switchTo: "Passer en français" },
    hero: {
      kicker: "Portfolio",
      tagline: "Engineer. I build applications, products and AI agents.",
      cta: "See my projects",
    },
    tech: { title: "Already used in my projects" },
    cards: { discover: "Explore", discoverAria: (name) => `Explore ${name}` },
    status: { wip: "In progress" },
    cv: { download: "Download", close: "Close", title: "My CV" },
    footer: {
      contact: "Get in touch",
      home: "back to home",
      legal: "Legal notice",
      privacy: "Privacy",
    },
  },
};

export function t(lang) {
  return T[lang] || T[DEFAULT_LANG];
}

// Detection a l'arrivee, dans cet ordre :
// 1. le cookie (choix explicite deja fait) ;
// 2. la langue du NAVIGATEUR (en-tete Accept-Language, envoye par tout le
//    monde, c'est le reglage systeme de la personne) : "fr..." -> francais,
//    tout le reste -> anglais.
// On ne geolocalise PAS par IP : un francais en voyage a l'etranger serait
// bascule en anglais a tort, alors que sa langue systeme, elle, ne ment pas.
export function detectLang(acceptLanguage, cookieValue) {
  if (LANGS.includes(cookieValue)) return cookieValue;

  const first = String(acceptLanguage || "")
    .split(",")[0]
    .trim()
    .toLowerCase();

  return first.startsWith("fr") ? "fr" : "en";
}
