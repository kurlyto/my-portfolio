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
import { enHtmlAvecChapitres, minutesDeLecture } from "../blog/blog-data";

const DOSSIER = path.join(process.cwd(), "content", "metiers");

const enIso = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d ? String(d) : null);

export function getArticleMetier(slug) {
  const fichier = path.join(DOSSIER, `${slug}.md`);
  if (!fs.existsSync(fichier)) return null;
  const { data, content } = matter(fs.readFileSync(fichier, "utf8"));
  const { html, chapitres } = enHtmlAvecChapitres(content);

  return {
    titre: data.titre,
    description: data.description,
    h1: data.h1,
    date: enIso(data.date),
    maj: enIso(data.maj),
    minutes: minutesDeLecture(content),
    chapitres,
    html,
  };
}
