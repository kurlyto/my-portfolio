// Genere app/component/carte-monde.js : le fond de carte du monde de la
// rubrique Voyages de l'accueil (un chemin SVG par pays, cle = code ISO
// alpha-2). A relancer seulement pour changer la geometrie (projection,
// resolution) ; la liste des pays visites vit dans accueil-perso-data.js.
//
// Les librairies carto ne sont PAS des dependances du portfolio : on emprunte
// celles du projet Fetamap (/data/nathan/travel-map), qui les a deja.
//   node scripts/generer-carte-monde.mjs
import fs from "node:fs";
import path from "node:path";

const PNPM = "/data/nathan/travel-map/node_modules/.pnpm";
const { geoNaturalEarth1, geoPath } = await import(`${PNPM}/d3-geo@3.1.1/node_modules/d3-geo/src/index.js`);
const { feature } = await import(`${PNPM}/topojson-client@3.1.0/node_modules/topojson-client/src/index.js`);
const monde = JSON.parse(fs.readFileSync(`${PNPM}/world-atlas@2.0.2/node_modules/world-atlas/countries-110m.json`, "utf8"));

// Table ISO numerique -> alpha-2, reprise de Fetamap (world-atlas ne donne que le numerique).
const table = fs.readFileSync("/data/nathan/travel-map/packages/travel-map/src/lib/country-mapping.ts", "utf8");
const ISO = Object.fromEntries([...table.matchAll(/"(\d{3})":\s*"([A-Z]{2})"/g)].map((m) => [m[1], m[2]]));

const brut = feature(monde, monde.objects.countries).features.filter((f) => f.id !== "010"); // sans l'Antarctique
// Natural Earth range la Guyane DANS la France : elle s'allumerait avec elle.
// On la separe (polygones a l'ouest de -30 degres) sous son propre code, GF.
const pays = brut.flatMap((f) => {
  if (f.id !== "250" || f.geometry.type !== "MultiPolygon") return [f];
  const ouest = (poly) => poly[0][0][0] < -30;
  const morceau = (id, polys) => ({ ...f, id, geometry: { type: "MultiPolygon", coordinates: polys } });
  return [morceau("250", f.geometry.coordinates.filter((p) => !ouest(p))), morceau("254", f.geometry.coordinates.filter(ouest))];
});
const LARGEUR = 1000;
const projection = geoNaturalEarth1().fitWidth(LARGEUR, { type: "FeatureCollection", features: pays });
const chemin = geoPath(projection).digits(1);
const [[, y0], [, y1]] = chemin.bounds({ type: "FeatureCollection", features: pays });
projection.translate([projection.translate()[0], projection.translate()[1] - y0]);
const hauteur = Math.ceil(y1 - y0);

const lignes = pays
  .map((f) => [ISO[f.id] || f.properties.name, chemin(f)])
  .filter(([, d]) => d)
  .map(([code, d]) => `  [${JSON.stringify(code)}, ${JSON.stringify(d)}],`);

const sortie = `// Fond de carte du monde de la rubrique Voyages (accueil perso).
// GENERE par scripts/generer-carte-monde.mjs : ne pas editer a la main.
// Source : world-atlas, Natural Earth 1:110m (domaine public), projection
// Natural Earth, Antarctique retire. Cle = code ISO alpha-2 (ou le nom quand
// le pays n'a pas de code, ex. Kosovo).
export const CARTE_MONDE = {
  largeur: ${LARGEUR},
  hauteur: ${hauteur},
  pays: [
${lignes.join("\n")}
  ],
};
`;
const cible = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "app", "component", "carte-monde.js");
fs.writeFileSync(cible, sortie);
console.log(`${lignes.length} pays, ${LARGEUR}x${hauteur}, ${(sortie.length / 1024).toFixed(0)} Ko -> ${cible}`);
