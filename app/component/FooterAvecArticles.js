import Footer from "./Footer";
import { tousLesArticles } from "../blog/blog-data";

// Combien d'articles le pied de page montre avant "Tous les articles".
const NOMBRE = 4;

// A appeler depuis une page serveur : lit le blog sur le disque. Les pages dont
// le contenu est un composant client passent le resultat en prop jusqu'au Footer.
export function articlesPiedDePage() {
  return tousLesArticles()
    .slice(0, NOMBRE)
    .map(({ slug, titre }) => ({ slug, titre }));
}

// Le pied de page des pages serveur : le meme, avec les derniers articles.
export default function FooterAvecArticles(props) {
  return <Footer {...props} articles={articlesPiedDePage()} />;
}
