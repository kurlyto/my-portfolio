// Le bloc "A lire aussi" en bas d'un article du blog ou d'une page metier.
//
// Priorite a la main de l'auteur : l'en-tete `lire_aussi` du fichier Markdown
// (liste d'adresses internes, "/blog/<slug>" ou "/metiers/<slug>"). Sans elle,
// on complete tout seul : les articles de la meme grappe, les metiers de la meme
// famille, puis les articles les plus recents. Trois liens, jamais la page
// elle-meme, jamais deux fois la meme adresse.
//
// Lu AU BUILD, comme tout le contenu (l'image Docker n'embarque pas content/).

import { tousLesArticles, FORMATS } from "./blog-data";
import { getArticleMetier } from "../metiers/metiers-articles";
import { getMetier } from "../metiers/metiers-data";

const COMBIEN = 3;
const METIERS_PAR_DEFAUT = ["restaurateur", "plombier", "consultant"];

// Des metiers voisins se lisent ensemble : un plombier qui a lu sa page trouve
// plus d'idees chez l'electricien que chez le notaire.
const FAMILLES = [
  ["plombier", "electricien", "garagiste"],
  ["avocat", "notaire", "expert-comptable", "kine"],
  ["restaurateur", "epicerie", "coiffeur"],
  ["photographe", "musicien", "architecte-interieur"],
  ["consultant", "agent-immobilier", "chercheur-emploi", "vie-personnelle"],
];

function carteBlog(a) {
  return {
    href: `/blog/${a.slug}`,
    etiquette: FORMATS[a.format] || "Article",
    titre: a.titre,
    description: a.description,
  };
}

function carteMetier(slug) {
  const article = getArticleMetier(slug);
  const metier = getMetier(slug);
  if (!article || !metier) return null;
  return {
    href: `/metiers/${slug}`,
    etiquette: `Métier · ${metier.badge}`,
    titre: article.h1,
    description: article.description,
  };
}

function carteDepuisAdresse(adresse) {
  const [, type, slug] = String(adresse).split("/");
  if (type === "blog") {
    const a = tousLesArticles().find((x) => x.slug === slug);
    return a ? carteBlog(a) : null;
  }
  if (type === "metiers") return carteMetier(slug);
  return null;
}

function voisinsDeFamille(slug) {
  const famille = FAMILLES.find((f) => f.includes(slug)) || [];
  const i = famille.indexOf(slug);
  // On part du voisin suivant et on tourne : chaque page de la famille ne
  // propose pas les memes liens dans le meme ordre.
  return famille.map((_, k) => famille[(i + 1 + k) % famille.length]).filter((s) => s !== slug);
}

function completer(cartes, candidats, soi) {
  for (const c of candidats) {
    if (cartes.length >= COMBIEN) break;
    if (!c || c.href === soi || cartes.some((x) => x.href === c.href)) continue;
    cartes.push(c);
  }
  return cartes;
}

export function lireAussiPourArticle(article) {
  const soi = `/blog/${article.slug}`;
  const articles = tousLesArticles();
  const cartes = completer([], (article.lireAussi || []).map(carteDepuisAdresse), soi);

  const memeGrappe = articles.filter((a) => a.grappe === article.grappe).map(carteBlog);
  completer(cartes, memeGrappe, soi);
  if (article.grappe.startsWith("metier:")) {
    const slug = article.grappe.slice(7);
    completer(cartes, [carteMetier(slug), ...voisinsDeFamille(slug).map(carteMetier)], soi);
  }
  completer(cartes, articles.map(carteBlog), soi);
  // Blog encore jeune : on complete avec des pages metier, qui sont les
  // lectures les plus concretes apres un article general.
  completer(cartes, METIERS_PAR_DEFAUT.map(carteMetier), soi);
  return cartes;
}

export function lireAussiPourMetier(slug, lireAussi = []) {
  const soi = `/metiers/${slug}`;
  const articles = tousLesArticles();
  const cartes = completer([], lireAussi.map(carteDepuisAdresse), soi);

  // D'abord les articles du blog ecrits pour CE metier, puis deux metiers
  // voisins, et on garde la derniere place pour un article du blog.
  completer(cartes, articles.filter((a) => a.grappe === `metier:${slug}`).map(carteBlog), soi);
  const voisins = voisinsDeFamille(slug).map(carteMetier);
  completer(cartes, voisins.slice(0, Math.max(0, articles.length > 0 ? COMBIEN - 1 - cartes.length : COMBIEN)), soi);
  completer(cartes, articles.map(carteBlog), soi);
  completer(cartes, voisins, soi);
  return cartes;
}
