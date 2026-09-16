// Le blog de l'agence : un article = un fichier Markdown dans content/blog/.
//
// Tout se lit AU BUILD (pages statiques) : l'image Docker "standalone" n'embarque
// pas content/, donc aucune lecture de fichier ne doit se faire a la requete.
//
// En-tete d'un article (frontmatter) :
//   titre, description (meta, 155 caracteres max), date (AAAA-MM-JJ), maj
//   (optionnel), format (explicatif | tuto | actu | comparatif), grappe (agents |
//   foxy | metier:<slug> | tutos | actus), mot_cle, image, image_alt,
//   statut (brouillon | publie).
//
// Un brouillon n'existe qu'en local (npm run dev) : jamais liste, jamais genere,
// jamais dans le sitemap en production. Un article "publie" date du futur attend
// le build qui suit sa date : c'est la programmation de la publication.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export const SITE_URL = "https://nathan-knaebel.com";
const DOSSIER = path.join(process.cwd(), "content", "blog");

export const FORMATS = {
  explicatif: "Comprendre",
  tuto: "Tutoriel",
  actu: "Actualité",
  comparatif: "Comparatif",
};

// La page mere de chaque grappe : chaque article renvoie vers elle.
export function pageMere(grappe = "") {
  if (grappe.startsWith("metier:")) return `/metiers/${grappe.slice(7)}`;
  if (grappe === "foxy") return "/";
  return "/agents";
}

const montrerBrouillons = process.env.NODE_ENV !== "production";

function lire(fichier) {
  const brut = fs.readFileSync(path.join(DOSSIER, fichier), "utf8");
  const { data, content } = matter(brut);
  const slug = fichier.replace(/\.md$/, "");
  const mots = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    titre: data.titre,
    description: data.description,
    date: String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date),
    maj: data.maj ? String(data.maj instanceof Date ? data.maj.toISOString().slice(0, 10) : data.maj) : null,
    format: data.format || "explicatif",
    grappe: data.grappe || "agents",
    motCle: data.mot_cle || "",
    image: data.image || null,
    imageAlt: data.image_alt || "",
    statut: data.statut || "brouillon",
    minutes: Math.max(1, Math.round(mots / 230)),
    contenu: content,
  };
}

function visible(article) {
  if (montrerBrouillons) return true;
  const aujourdhui = new Date().toISOString().slice(0, 10);
  return article.statut === "publie" && article.date <= aujourdhui;
}

export function tousLesArticles() {
  if (!fs.existsSync(DOSSIER)) return [];
  return fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(lire)
    .filter(visible)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug) {
  return tousLesArticles().find((a) => a.slug === slug) || null;
}

export function enHtml(markdown) {
  return marked.parse(markdown, { gfm: true });
}

export function dateLisible(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}
