// Interrupteur du lien "Blog" dans le pied de page.
//
// Le pied de page est rendu par des composants client : il ne peut pas lister
// content/blog/ lui-meme. On le bascule a true au premier article publie
// (skill seo-publier-article), pas avant : un lien vers un blog vide est une
// porte vers une page maigre.
export const BLOG_OUVERT = true;
