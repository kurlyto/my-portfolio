// robots.txt. Ne bloque ni le JS ni le CSS : Google en a besoin pour rendre
// la page, et un blocage de /_next/ fait passer le site pour vide a ses yeux.
//
// /admin et /page_* ne sont pas listes ici : ils portent deja un noindex, et
// robots.txt est un fichier public - y nommer une URL revient a l'annoncer.

const BASE_URL = "https://nathan-knaebel.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
