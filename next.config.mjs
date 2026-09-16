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
    ];
  },
};

export default nextConfig;
