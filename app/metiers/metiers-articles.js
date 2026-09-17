// L'article de chaque page metier : un fichier Markdown dans content/metiers/<slug>.md.
//
// Pourquoi (16/09/2026) : une page metier faite du seul flyer et de 4 questions
// pese ~120 mots, et Google a refuse d'indexer celle du coiffeur. L'article
// explique ce qu'un agent prend en charge dans CE metier et surtout ce qu'il ne
// doit pas faire, a partir des vraies questions des pros
// (/data/nathan/seo/mots-cles/metiers/). Un metier sans fichier garde sa page
// actuelle : on les ecrit un par un, chacun relu par Nathan.
//
// En-tete : titre (title de l'onglet, le suffixe du site s'ajoute : 60 caracteres
// au total), description (meta, 155 max), h1, date, maj (optionnel), mot_cle.
// Le H1 vit dans l'en-tete et non dans le corps : la page l'affiche suivi de la
// date, de l'auteur et du sommaire (retour de Nathan le 16/09 : un mur de texte
// sans date ni chapitres ne fait pas vrai). Le sommaire se tire des H2.
//
// Lu AU BUILD uniquement (pages statiques) : l'image Docker n'embarque pas content/.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { enHtml } from "../blog/blog-data";

const DOSSIER = path.join(process.cwd(), "content", "metiers");

const enIso = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d ? String(d) : null);

function ancre(texte) {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getArticleMetier(slug) {
  const fichier = path.join(DOSSIER, `${slug}.md`);
  if (!fs.existsSync(fichier)) return null;
  const { data, content } = matter(fs.readFileSync(fichier, "utf8"));

  const chapitres = [];
  const html = enHtml(content).replace(/<h2>(.*?)<\/h2>/g, (_, interieur) => {
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

  // Temps de lecture sur le texte seul : les maquettes HTML ne se lisent pas.
  const mots = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    titre: data.titre,
    description: data.description,
    h1: data.h1,
    date: enIso(data.date),
    maj: enIso(data.maj),
    minutes: Math.max(1, Math.round(mots / 230)),
    chapitres,
    html,
  };
}
