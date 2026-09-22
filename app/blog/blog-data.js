// Le blog de l'agence : un article = un fichier Markdown dans content/blog/.
//
// Tout se lit AU BUILD (pages statiques) : l'image Docker "standalone" n'embarque
// pas content/, donc aucune lecture de fichier ne doit se faire a la requete.
//
// En-tete d'un article (frontmatter) :
//   titre, description (meta, 155 caracteres max), date (AAAA-MM-JJ), maj
//   (optionnel), format (explicatif | tuto | actu | comparatif), grappe (agents |
//   foxy | metier:<slug> | tutos | actus), mot_cle, image, image_alt,
//   mots_cles (liste affichee en bas d'article), lire_aussi (liste d'adresses
//   internes, optionnelle : voir lire-aussi.js), statut (brouillon | publie).
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
  if (grappe === "foxy") return "/foxy";
  return "/agents";
}

const montrerBrouillons = process.env.NODE_ENV !== "production";

function lire(fichier) {
  const brut = fs.readFileSync(path.join(DOSSIER, fichier), "utf8");
  const { data, content } = matter(brut);
  const slug = fichier.replace(/\.md$/, "");
  return {
    slug,
    titre: data.titre,
    description: data.description,
    date: String(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date),
    maj: data.maj ? String(data.maj instanceof Date ? data.maj.toISOString().slice(0, 10) : data.maj) : null,
    format: data.format || "explicatif",
    grappe: data.grappe || "agents",
    motCle: data.mot_cle || "",
    motsCles: Array.isArray(data.mots_cles) ? data.mots_cles : [],
    lireAussi: Array.isArray(data.lire_aussi) ? data.lire_aussi : [],
    image: data.image || null,
    imageAlt: data.image_alt || "",
    // Miniature des apercus de partage (1200x627), distincte de l'image affichee
    // dans l'article. Fabriquee par /data/nathan/seo/outils/miniature-article.py.
    imagePartage: data.image_partage || null,
    // Visuel de la carte dans la liste du blog (800x450, une vraie image qui
    // donne envie d'ouvrir). Sinon la miniature de partage, sinon l'image du corps.
    imageCarte: data.image_carte || null,
    statut: data.statut || "brouillon",
    minutes: minutesDeLecture(content),
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

// Le texte vient du Markdown : on style les balises generees depuis le conteneur
// plutot que d'ajouter un plugin de typographie.
// Partage par les articles du blog et ceux des pages metier.
export const PROSE =
  "mt-10 text-[17px] leading-[1.75] text-black/85 " +
  "[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:mt-12 [&_h2]:mb-4 " +
  "[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-3 " +
  "[&_p]:my-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 " +
  "[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-[#ff6b35] [&_strong]:font-semibold [&_strong]:text-black " +
  "[&_blockquote]:border-l-4 [&_blockquote]:border-[#ff6b35] [&_blockquote]:pl-5 [&_blockquote]:italic " +
  "[&_img]:my-8 [&_img]:rounded-xl [&_img]:w-full " +
  "[&_code]:font-mono [&_code]:text-[15px] [&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:rounded " +
  "[&_pre]:my-6 [&_pre]:bg-black [&_pre]:text-white [&_pre]:p-5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 " +
  "[&_table]:my-6 [&_table]:w-full [&_table]:text-[15px] [&_th]:text-left [&_th]:border-b-2 [&_th]:border-black/20 [&_th]:py-2 [&_th]:pr-3 " +
  "[&_td]:border-b [&_td]:border-black/10 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top";

// Sur telephone un tableau large deborde ou s'ecrase : chaque cellule recoit le
// titre de sa colonne (data-label) et le CSS (.article-metier table dans
// globals.css) transforme alors chaque ligne en fiche empilee. Le tableau reste un
// vrai <table> : Google et les moteurs IA le reprennent tel quel.
function tableauxEnFiches(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, interieur) => {
    const titres = [...interieur.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) =>
      m[1].replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/"/g, "&quot;").trim()
    );
    const corps = interieur.replace(/<tr>([\s\S]*?)<\/tr>/g, (ligne, cellules) => {
      let i = 0;
      return (
        "<tr>" +
        cellules.replace(/<td([^>]*)>/g, (_td, attributs) => `<td${attributs} data-label="${titres[i++] || ""}">`) +
        "</tr>"
      );
    });
    return `<div class="tableau"><table>${corps}</table></div>`;
  });
}

export function enHtml(markdown) {
  return tableauxEnFiches(marked.parse(markdown, { gfm: true }));
}

function ancre(texte) {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Le HTML de l'article avec une ancre sur chaque H2, et la liste des chapitres
// pour le sommaire. Sert au blog et aux pages metier.
export function enHtmlAvecChapitres(markdown) {
  const chapitres = [];
  const html = enHtml(markdown).replace(/<h2>(.*?)<\/h2>/g, (_, interieur) => {
    // marked encode l'apostrophe en &#39; : le sommaire l'afficherait telle quelle.
    const texte = interieur
      .replace(/<[^>]+>/g, "")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
    const id = ancre(texte);
    chapitres.push({ id, texte });
    return `<h2 id="${id}">${interieur}</h2>`;
  });
  return { html, chapitres };
}

// Temps de lecture sur le texte seul : les illustrations HTML ne se lisent pas.
export function minutesDeLecture(markdown) {
  const mots = markdown.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(mots / 230));
}

export function dateLisible(iso) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  });
}
