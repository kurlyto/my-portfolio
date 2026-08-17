// Genere flyers-metiers.md (base de connaissances de Nate) a partir de la
// source unique du site : app/metiers/metiers-data.js. A relancer apres toute
// modification des flyers, sinon Nate parle d'exemples que le visiteur ne voit
// plus a l'ecran.
//
//   node scripts/gen-flyers-md.mjs
//
// Sortie : /data/nathan/my-agents/Nate/doctrine/flyers-metiers.md

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, "..", "app", "metiers", "metiers-data.js");
const OUT =
  process.env.FLYERS_MD_OUT ||
  "/data/nathan/my-agents/Nate/doctrine/flyers-metiers.md";

const { METIERS } = await import(`file://${DATA}`);

const lines = [
  "# Flyers metiers du site (ce que le visiteur a sous les yeux)",
  "",
  "FICHIER GENERE - ne pas editer a la main.",
  "Source : app/metiers/metiers-data.js du site my-portfolio.",
  "Regenere avec `node scripts/gen-flyers-md.mjs` apres toute modif des flyers.",
  "",
  "## A quoi ca sert",
  "",
  "La page d'accueil a une section \"Metiers\" : des badges cliquables, un par",
  "metier. Le clic ouvre un flyer avec 5 demandes concretes. Chaque flyer a",
  "aussi son lien partageable : nathan-knaebel.com/metiers/<slug>.",
  "",
  "Le bouton \"En parler a Nate\" du flyer ouvre CE chat avec un message",
  "pre-redige du type \"Je suis <metier> et j'ai consulte les possibilites pour",
  "un agent pour mon metier, je suis interesse.\". Quand un message ressemble a",
  "ca, le visiteur arrive donc d'un flyer : il a deja vu les 5 exemples de son",
  "metier ci-dessous. Ne les lui recite pas comme une nouveaute - rebondis",
  "dessus (\"vous avez vu les exemples cote <metier> : lequel vous parle le",
  "plus, ou c'est autre chose ?\") et enchaine sur ton cadrage habituel.",
  "",
  "Ces demandes sont des ILLUSTRATIONS commerciales, pas un catalogue de",
  "fonctionnalites livrees. Regles :",
  "",
  "- Ne promets jamais qu'une demande listee est deja branchee chez le client :",
  "  ce qui est faisable depend de ses outils, verifie-le pendant le cadrage.",
  "- Le telephone entrant (\"reponds au telephone\") est le point le plus",
  "  delicat : c'est une brique voix distincte. Si le visiteur veut CA en",
  "  priorite, ne le promets pas dans la seconde - note-le comme besoin",
  "  principal et laisse Nathan trancher.",
  "- Les prenoms, montants et logiciels des exemples sont fictifs.",
  "",
  "## Les metiers couverts",
  "",
];

for (const m of METIERS) {
  lines.push(`### ${m.title}`);
  lines.push("");
  lines.push(`- Badge affiche : ${m.badge}`);
  lines.push(`- Lien du flyer : nathan-knaebel.com/metiers/${m.slug}`);
  lines.push(`- Message pre-redige du bouton : "${m.nateMessage}"`);
  lines.push("- Les 5 demandes montrees au visiteur :");
  for (const d of m.demandes) lines.push(`  - "${d}"`);
  lines.push("");
}

lines.push("## Un metier absent de cette liste");
lines.push("");
lines.push("La liste est une vitrine, pas une limite. Si le visiteur exerce un");
lines.push("autre metier, ne dis jamais \"ce n'est pas prevu\" : cadre son besoin");
lines.push("normalement. Les briques qui reviennent partout (boite mail, relances,");
lines.push("rendez-vous, factures, points quotidiens) ne dependent pas du metier.");
lines.push("");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join("\n"), "utf8");
console.log(`flyers-metiers.md ecrit : ${OUT} (${METIERS.length} metiers)`);
