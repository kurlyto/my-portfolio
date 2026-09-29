/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // ?chat=1 appartient au chat Nate, qui vit sur /agents. Les liens ecrits
      // avant la scission des sites (verification email, flyers metiers deja
      // imprimes ou partages) pointent encore sur la racine : on les renvoie
      // la-bas, parametres compris (Next les recopie). Ouvrir le chat sur Foxy
      // envoyait a Nate "Je veux reserver Foxy", et Nate ne connait pas Foxy
      // (vu le 11/09).
      {
        source: "/",
        has: [{ type: "query", key: "chat", value: "1" }],
        destination: "/agents",
        permanent: false,
      },
      // L'ancienne galerie d'agents, supprimee le 29/09 (Nathan) : la section
      // Exemples de /agents la remplace. Redirection permanente pour Google
      // (la page etait dans le sitemap) et les liens deja partages.
      {
        source: "/agents/exemples",
        destination: "/agents#exemples",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
