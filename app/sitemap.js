// Sitemap genere a partir des routes reelles du site.
//
// Volontairement absents :
// - /admin          : deja en noindex (espace prive)
// - /page_*         : brouillons laisses dans app/, servis en 200 mais doublons
//                     de /photography et de la home. Ils portent un noindex.
// - /travel,        : pages "a venir", sans contenu, donc en noindex. Les
//   /photography      remettre ici le jour ou elles sont remplies.
// - /api/*          : pas des pages.

import { METIERS } from "./metiers/metiers-data";
import { tousLesArticles } from "./blog/blog-data";

const BASE_URL = "https://nathan-knaebel.com";

export default function sitemap() {
  const lastModified = new Date();
  const articles = tousLesArticles().filter((a) => a.statut === "publie");

  return [
    // Deux sites sur un domaine : la racine est celui de l'AIOS, /agents celui
    // des agents sur mesure, /agents/exemples sa galerie d'agents en place.
    { url: BASE_URL, changeFrequency: "monthly", priority: 1, lastModified },
    { url: `${BASE_URL}/agents`, changeFrequency: "monthly", priority: 0.9, lastModified },
    { url: `${BASE_URL}/agents/exemples`, changeFrequency: "monthly", priority: 0.7, lastModified },
    // Un flyer partageable par metier : pages statiques, bonnes portes
    // d'entree SEO ("agent IA plombier", etc.).
    ...METIERS.map((m) => ({
      url: `${BASE_URL}/metiers/${m.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified,
    })),
    // Le blog : l'index n'entre qu'avec son premier article publie, chaque
    // article porte sa vraie date (Google s'en sert pour recrawler).
    ...(articles.length
      ? [{ url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.7, lastModified: new Date(articles[0].maj || articles[0].date) }]
      : []),
    ...articles.map((a) => ({
      url: `${BASE_URL}/blog/${a.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(a.maj || a.date),
    })),
    { url: `${BASE_URL}/projects`, changeFrequency: "monthly", priority: 0.8, lastModified },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2, lastModified },
    { url: `${BASE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.2, lastModified },
    { url: `${BASE_URL}/conditions`, changeFrequency: "yearly", priority: 0.2, lastModified },
  ];
}
