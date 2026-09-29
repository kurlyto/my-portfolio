import { CARTE_MONDE } from "../component/carte-monde";
import { PAYS_VISITES } from "../component/accueil-perso-data";

// La carte des voyages de l'accueil perso, en image SVG : les pays visites a
// l'encre, les autres en papier fonce. Construite au build a partir de la liste
// PAYS de accueil-perso-data.js (source unique, le compteur de la page la lit
// aussi). Servie en image (et non dans la page) : le fond de carte pese ~110 Ko,
// il ne doit ni alourdir la page ni etre doublé dans ses donnees React.
export const dynamic = "force-static";

const ENCRE = "#1b1814";
const TERRE = "#e2dacb";
const PAPIER = "#f5f1ea";

export function GET() {
  const visites = new Set(PAYS_VISITES);
  const chemins = CARTE_MONDE.pays
    .map(([code, d]) => `<path fill="${visites.has(code) ? ENCRE : TERRE}" d="${d}"/>`)
    .join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CARTE_MONDE.largeur} ${CARTE_MONDE.hauteur}">` +
    `<g stroke="${PAPIER}" stroke-width="0.5" stroke-linejoin="round">${chemins}</g></svg>`;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
