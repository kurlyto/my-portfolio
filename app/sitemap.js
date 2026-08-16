// Sitemap genere a partir des routes reelles du site.
//
// Volontairement absents :
// - /stats          : deja en noindex (tableau de bord d'audience prive)
// - /page_*         : brouillons laisses dans app/, servis en 200 mais doublons
//                     de /photography et de la home. Ils portent un noindex.
// - /travel,        : pages "a venir", sans contenu, donc en noindex. Les
//   /photography      remettre ici le jour ou elles sont remplies.
// - /api/*          : pas des pages.

import { METIERS } from "./metiers/metiers-data";

const BASE_URL = "https://nathan-knaebel.com";

export default function sitemap() {
  const lastModified = new Date();

  return [
    { url: BASE_URL, changeFrequency: "monthly", priority: 1, lastModified },
    { url: `${BASE_URL}/agents`, changeFrequency: "monthly", priority: 0.9, lastModified },
    // Un flyer partageable par metier : pages statiques, bonnes portes
    // d'entree SEO ("agent IA plombier", etc.).
    ...METIERS.map((m) => ({
      url: `${BASE_URL}/metiers/${m.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified,
    })),
    { url: `${BASE_URL}/projects`, changeFrequency: "monthly", priority: 0.8, lastModified },
    { url: `${BASE_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2, lastModified },
    { url: `${BASE_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.2, lastModified },
    { url: `${BASE_URL}/conditions`, changeFrequency: "yearly", priority: 0.2, lastModified },
  ];
}
