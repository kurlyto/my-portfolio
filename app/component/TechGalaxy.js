"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, Logo } from "./TechGrid";

// La "galaxie" des outils (demande de Nathan du 16/10/2026 : la liste en
// colonnes faisait catalogue). Nathan au centre, deux orbites :
// - l'orbite INTERIEURE (`orbite: 1` dans CATEGORIES) = ce avec quoi il code ;
// - l'orbite EXTERIEURE = les outils qu'il branche chez ses clients.
// Chaque categorie forme un amas de logos, son nom au bord exterieur. Survol
// d'un amas : les autres s'estompent ; survol d'un logo : son nom.
// Tout est dessine sur un plan fixe (W x H) puis mis a l'echelle de la fenetre.

const W = 1760;
const H = 1170;
const CX = W / 2;
const CY = H / 2;
const TILE = 38; // cote d'un logo sur le plan
const STEP = TILE + 10; // distance entre deux logos voisins d'un anneau
const ORBITES = { 1: { rx: 340, ry: 220 }, 2: { rx: 740, ry: 440 } };

// Position des logos d'un amas autour de son centre : un anneau jusqu'a 10,
// deux anneaux au-dela (un tiers dedans).
function placerLogos(n) {
  const anneau = (m, r, decalage) =>
    Array.from({ length: m }, (_, i) => {
      const a = (i / m) * 2 * Math.PI - Math.PI / 2 + decalage;
      return [r * Math.cos(a), r * Math.sin(a)];
    });
  const rayonMini = (m) => (m < 2 ? 0 : STEP / (2 * Math.sin(Math.PI / m)));
  if (n === 1) return { pts: [[0, 0]], rayon: TILE / 2 };
  if (n <= 10) {
    const r = rayonMini(n);
    return { pts: anneau(n, r, 0), rayon: r + TILE / 2 };
  }
  const m1 = Math.round(n / 3);
  const r1 = Math.max(rayonMini(m1), STEP * 0.9);
  const r2 = Math.max(r1 + STEP * 0.95, rayonMini(n - m1));
  return { pts: [...anneau(m1, r1, 0.4), ...anneau(n - m1, r2, 0)], rayon: r2 + TILE / 2 };
}

// Points d'une ellipse a pas de LONGUEUR constant : les amas se repartissent
// selon leur taille sans se serrer aux deux bouts de l'ellipse.
function placerSurOrbite(amas, { rx, ry }, depart) {
  const N = 1440;
  const pts = [];
  let total = 0;
  for (let i = 0; i <= N; i += 1) {
    const t = depart + (i / N) * 2 * Math.PI;
    const p = [CX + rx * Math.cos(t), CY + ry * Math.sin(t)];
    if (i > 0) total += Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]);
    pts.push(p);
    p.push(total);
  }
  const besoin = amas.reduce((s, a) => s + 2 * a.rayon, 0);
  const marge = (total - besoin) / amas.length;
  let cursor = 0;
  return amas.map((a) => {
    const cible = cursor + a.rayon + marge / 2;
    cursor += 2 * a.rayon + marge;
    const p = pts.find((q) => q[2] >= cible) || pts[pts.length - 1];
    return { ...a, x: p[0], y: p[1] };
  });
}

// Disposition ZOOMEE d'un amas (survol d'une famille, 18/10/2026) : un seul
// anneau, chaque nom dans une etiquette SOUS son logo. L'ecart entre deux logos
// voisins vaut au moins le nom le plus long : aucun nom ne mord sur un logo
// (Nathan, 18/10 : les noms en biais tombaient sur les carres blancs).
// Les noms gardent ~14 px a l'ecran : police de POLICE_ZOOM / Z sur le plan.
// Un nom long (« Annuaire des entreprises ») passe sur deux lignes au-dela de
// PAR_LIGNE lettres : sinon il ecarte tout l'anneau et les logos rapetissent.
const POLICE_ZOOM = 20;
const PAR_LIGNE = 13;
function placerZoom(n, lettres, Z) {
  const police = POLICE_ZOOM / Z;
  const largeurNom = Math.min(lettres, PAR_LIGNE) * 0.6 * police + police; // + marges
  const hauteurNom = ((lettres > PAR_LIGNE ? 2 : 1) * 1.2 + 0.6) * police;
  const ecart = Math.max(largeurNom + 10, TILE + hauteurNom + 16);
  const rayonPour = (m) => (m < 2 ? 0 : Math.max(70, ecart / (2 * Math.sin(Math.PI / m))));
  const anneau = (m, r, decalage) =>
    Array.from({ length: m }, (_, i) => {
      const a = (i / m) * 2 * Math.PI - Math.PI / 2 + decalage;
      return [r * Math.cos(a), r * Math.sin(a)];
    });
  // Au-dela de 8 outils, un seul anneau devient immense (logos minuscules) :
  // deux anneaux, un tiers dedans, separes d'un logo + son nom.
  let pts;
  let r;
  if (n <= 8) {
    r = rayonPour(n);
    pts = anneau(n, r, 0);
  } else {
    const m1 = Math.round(n / 3);
    const r1 = rayonPour(m1);
    r = Math.max(rayonPour(n - m1), r1 + TILE + hauteurNom + 34);
    pts = [...anneau(m1, r1, Math.PI / m1), ...anneau(n - m1, r, 0)];
  }
  const bulle = Math.max(r + TILE / 2 + 8 + hauteurNom, r + largeurNom / 2) + 18;
  return { pts, rayon: r + TILE / 2, bulle, police, largeurNom };
}

// Le facteur de zoom depend de la taille des noms, qui depend du zoom : on
// recalcule jusqu'a stabilite (3 tours suffisent).
function zoomer1(cat) {
  const lettres = Math.max(...cat.items.map((i) => i.label.length));
  let Z = 2;
  let z = placerZoom(cat.items.length, lettres, Z);
  for (let k = 0; k < 4; k += 1) {
    Z = Math.max(1.2, Math.min(2.6, (0.86 * H) / (2 * z.bulle), (0.9 * W) / (2 * z.bulle)));
    z = placerZoom(cat.items.length, lettres, Z);
  }
  return { zoom: z, Z, bulle: z.bulle };
}

function construire() {
  const amas = CATEGORIES.map((cat) => ({ cat, ...placerLogos(cat.items.length) }));
  const dedans = placerSurOrbite(amas.filter((a) => a.cat.orbite === 1), ORBITES[1], -Math.PI * 0.62);
  const dehors = placerSurOrbite(amas.filter((a) => a.cat.orbite !== 1), ORBITES[2], -Math.PI * 0.55);
  return [...dedans, ...dehors].map((a) => ({ ...a, ...zoomer1(a.cat) }));
}

export default function TechGalaxy({ lang = "fr", total }) {
  const amas = useMemo(() => construire(), []);
  const cadre = useRef(null);
  const [echelle, setEchelle] = useState(0);
  const [amasActif, setAmasActif] = useState(null);
  const [bulle, setBulle] = useState(null); // { x, y, label }
  const [zoom, setZoom] = useState(null); // nom FR de la famille zoomee
  const calme = useReducedMotion();
  // Zoom AU SURVOL (Nathan, 18/10/2026 : "sans cliquer") : la souris doit se
  // poser un instant sur une famille (pas juste la traverser). La famille glisse
  // au centre en s'ouvrant, la souris n'est donc plus dessus : on lui laisse
  // 1,5 s pour entrer dans la bulle, ensuite sortir de la bulle la referme.
  // Seul un VRAI deplacement arme le zoom : quand les familles glissent sous une
  // souris immobile (animation d'entree), le navigateur emet de faux survols.
  const minuteurOuvrir = useRef(null);
  const minuteurFermer = useRef(null);
  // Enchainement (Nathan, 16/11/2026) : sortir d'une famille pour passer sur une
  // autre doit rezoomer DIRECT sur l'autre, sans attendre un nouveau mouvement.
  const minuteurEnchainer = useRef(null);
  const entreeDansBulle = useRef(false);
  const souris = useRef(null);
  const dansBulle = (a) => {
    if (!souris.current || !cadre.current) return false;
    const r = cadre.current.getBoundingClientRect();
    const d = Math.hypot(souris.current[0] - (r.left + r.width / 2), souris.current[1] - (r.top + r.height / 2));
    return d <= a.bulle * a.Z * (r.width ? Math.min(r.width / W, r.height / H) : 0);
  };
  // La famille sous la souris dans la vue d'ENSEMBLE (pas la vue zoomee) : celle
  // qu'on voit sous le pointeur une fois revenu a l'ensemble.
  const amasSousSouris = () => {
    if (!souris.current || !cadre.current) return null;
    const r = cadre.current.getBoundingClientRect();
    const e = Math.min(r.width / W, r.height / H);
    if (!e) return null;
    const [mx, my] = souris.current;
    if (mx < r.left || mx > r.right || my < r.top || my > r.bottom) return null;
    const px = CX + (mx - (r.left + r.width / 2)) / e;
    const py = CY + (my - (r.top + r.height / 2)) / e;
    return amas.find((a) => Math.hypot(px - a.x, py - a.y) <= a.rayon + 24) || null;
  };
  const cible = amas.find((a) => a.cat.fr === zoom);
  const en = lang === "en";

  useEffect(() => {
    const el = cadre.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setEchelle(Math.min(width / W, height / H));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Echap dezoome d'abord ; un second Echap ferme la pop-up (TechPopup).
  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      dezoomer();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [zoom]);

  const zoomer = (a) => {
    clearTimeout(minuteurEnchainer.current);
    clearTimeout(minuteurOuvrir.current);
    clearTimeout(minuteurFermer.current);
    minuteurFermer.current = null;
    minuteurOuvrir.current = null;
    entreeDansBulle.current = false;
    minuteurFermer.current = setTimeout(() => {
      minuteurFermer.current = null;
      if (dansBulle(a)) entreeDansBulle.current = true;
      else sortirDeLaBulle();
    }, 1100);
    setBulle(null);
    setZoom(a.cat.fr);
  };
  const armer = (a, e) => {
    const avant = souris.current;
    if (!avant || (avant[0] === e.clientX && avant[1] === e.clientY)) return;
    if (zoom || minuteurOuvrir.current) return;
    minuteurOuvrir.current = setTimeout(() => zoomer(a), 120);
  };
  const dezoomer = () => {
    clearTimeout(minuteurEnchainer.current);
    clearTimeout(minuteurFermer.current);
    minuteurFermer.current = null;
    setZoom(null);
  };
  // Sortie de la bulle a la souris : retour a l'ensemble, puis zoom direct sur la
  // famille sous le pointeur (le temps que l'ensemble se redessine sous ses yeux).
  const sortirDeLaBulle = () => {
    dezoomer();
    minuteurEnchainer.current = setTimeout(() => {
      const b = amasSousSouris();
      if (b) zoomer(b);
    }, 260);
  };
  useEffect(() => () => {
    clearTimeout(minuteurOuvrir.current);
    clearTimeout(minuteurFermer.current);
    clearTimeout(minuteurEnchainer.current);
  }, []);

  // Suit la souris pendant le zoom : dehors la bulle (une fois entree) = on ferme.
  const suivreSouris = (e) => {
    souris.current = [e.clientX, e.clientY];
    if (!cible) return;
    if (dansBulle(cible)) {
      entreeDansBulle.current = true;
      clearTimeout(minuteurFermer.current);
      minuteurFermer.current = null;
    } else if (entreeDansBulle.current && !minuteurFermer.current) {
      minuteurFermer.current = setTimeout(sortirDeLaBulle, 140);
    }
  };
  const ressort = { type: "spring", stiffness: 210, damping: 30, mass: 0.8 };

  return (
    <div
      ref={cadre}
      className="relative h-full w-full overflow-hidden"
      onClick={(e) => {
        if (zoom && !e.target.closest("[data-amas-zoome]")) dezoomer();
      }}
      onMouseMove={suivreSouris}
      onMouseLeave={() => zoom && dezoomer()}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: W,
          height: H,
          transform: `translate(-50%, -50%) scale(${echelle})`,
          visibility: echelle ? "visible" : "hidden",
        }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          // Entree d'UN seul bloc (18/10/2026) : les 19 familles qui s'envolaient
          // chacune du centre faisaient ~20 calques a redessiner, la fenetre ramait.
          initial={calme ? false : { opacity: 0, scale: 0.9 }}
          animate={
            cible
              ? { opacity: 1, scale: cible.Z, x: cible.Z * (CX - cible.x), y: cible.Z * (CY - cible.y) }
              : { opacity: 1, scale: 1, x: 0, y: 0 }
          }
          transition={calme ? { duration: 0 } : ressort}
        >
          <motion.svg
            className="pointer-events-none absolute inset-0"
            width={W}
            height={H}
            aria-hidden
            animate={{ opacity: zoom ? 0.15 : 1 }}
          >
            {Object.values(ORBITES).map((o) => (
              <ellipse
                key={o.rx}
                cx={CX}
                cy={CY}
                rx={o.rx}
                ry={o.ry}
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeDasharray="2 7"
              />
            ))}
          </motion.svg>

          <motion.div
            className="absolute flex flex-col items-center"
            style={{ left: CX, top: CY, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: zoom ? 0.08 : 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile-pic.png"
              alt="Nathan Knaebel"
              className="h-28 w-28 rounded-full border-2 border-white/80 object-cover shadow-[0_0_60px_rgba(255,255,255,0.18)]"
            />
            <span className="mt-3 font-display text-lg font-bold text-white">Nathan</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {total} {en ? "tools" : "outils"}
            </span>
          </motion.div>

          {amas.map((a) => {
            const ouvert = zoom === a.cat.fr;
            const cache = zoom !== null && !ouvert;
            const estompe = !zoom && amasActif !== null && amasActif !== a.cat.fr;
            const enHaut = a.y < CY;
            const rayon = ouvert ? a.zoom.rayon : a.rayon;
            return (
              <motion.div
                key={a.cat.fr}
                data-amas-zoome={ouvert ? "" : undefined}
                className={`absolute ${cache ? "pointer-events-none" : ""} ${ouvert ? "z-10" : "cursor-pointer"}`}
                style={{ left: a.x, top: a.y }}
                initial={false}
                animate={{ opacity: cache ? 0.05 : estompe ? 0.22 : 1 }}
                transition={{ duration: 0.18 }}
                onMouseEnter={(e) => {
                  setAmasActif(a.cat.fr);
                  armer(a, e);
                }}
                onMouseMove={(e) => armer(a, e)}
                onMouseLeave={() => {
                  clearTimeout(minuteurOuvrir.current);
                  minuteurOuvrir.current = null;
                  setAmasActif(null);
                  setBulle(null);
                }}
                onClick={() => !ouvert && zoomer(a)}
                data-cursor-hover={ouvert ? undefined : ""}
              >
                {/* la "bulle" de la famille zoomee (idee de Nathan du 18/10/2026) */}
                <motion.div
                  className="pointer-events-none absolute rounded-full border border-white/15 bg-neutral-900"
                  style={{ left: 0, top: 0, translateX: "-50%", translateY: "-50%", width: 2 * a.bulle, height: 2 * a.bulle }}
                  initial={false}
                  animate={{ opacity: ouvert ? 1 : 0, scale: ouvert ? 1 : 0.5 }}
                  transition={calme ? { duration: 0 } : ressort}
                />
                {/* zone de survol (et de clic) de l'amas entier */}
                <div
                  className="absolute rounded-full"
                  style={{ width: 2 * rayon + 16, height: 2 * rayon + 16, left: -rayon - 8, top: -rayon - 8 }}
                />
                <motion.span
                  className={`absolute whitespace-nowrap font-mono text-[15px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    amasActif === a.cat.fr ? "text-accent" : "text-white/70"
                  }`}
                  style={{
                    left: 0,
                    top: enHaut ? -a.rayon - 14 : a.rayon + 14,
                    translateX: "-50%",
                    translateY: enHaut ? "-100%" : "0%",
                  }}
                  animate={{ opacity: ouvert ? 0 : 1 }}
                >
                  {en ? a.cat.en : a.cat.fr}
                  <span className="ml-1.5 text-white/35">{a.cat.items.length}</span>
                </motion.span>
                {a.cat.items.map((item, i) => {
                  const [px, py] = ouvert ? a.zoom.pts[i] : a.pts[i];
                  return (
                    // 144 logos : transition CSS (le navigateur seul), pas framer-motion,
                    // trop lourd a monter d'un coup a l'ouverture (18/10/2026).
                    <div
                      key={item.label}
                      className="absolute left-0 top-0"
                      style={{
                        transform: `translate(${px}px, ${py}px)`,
                        transition: calme ? "none" : "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <button
                        type="button"
                        aria-label={item.label}
                        className="absolute rounded-md transition-transform duration-150 hover:z-10 hover:scale-125 focus-visible:scale-125 focus-visible:outline-2 focus-visible:outline-accent"
                        style={{ left: -TILE / 2, top: -TILE / 2, width: TILE, height: TILE }}
                        onMouseEnter={() => !zoom && setBulle({ x: a.x + px, y: a.y + py, label: item.label })}
                        onFocus={() => {
                          setAmasActif(a.cat.fr);
                          if (!zoom) setBulle({ x: a.x + px, y: a.y + py, label: item.label });
                        }}
                      >
                        <Logo item={item} size="h-full w-full" />
                      </button>
                      {ouvert && (
                        <span
                          className="galaxie-nom pointer-events-none absolute w-max -translate-x-1/2 rounded-md bg-neutral-900/95 text-center font-semibold leading-[1.2] text-white ring-1 ring-white/10"
                          style={{
                            fontSize: a.zoom.police,
                            maxWidth: a.zoom.largeurNom,
                            padding: `${0.3 * a.zoom.police}px ${0.5 * a.zoom.police}px`,
                            left: 0,
                            top: TILE / 2 + 8,
                          }}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            );
          })}

          {bulle && !zoom && (
            <div
              className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full bg-white px-3.5 py-1.5 text-[15px] font-semibold text-black shadow-lg"
              style={{ left: bulle.x, top: bulle.y - TILE / 2 - 14, transform: "translate(-50%, -100%)" }}
            >
              {bulle.label}
            </div>
          )}
        </motion.div>
      </div>

      {/* Hors du plan mis a l'echelle : taille fixe a l'ecran. */}
      {cible ? (
        <div className="absolute left-4 top-3 flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dezoomer();
            }}
            data-cursor-hover
            className="rounded-full border border-white/20 px-3.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:border-accent hover:text-accent"
          >
            &larr; {en ? "All families" : "Toutes les familles"}
          </button>
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
            {en ? cible.cat.en : cible.cat.fr}
            <span className="ml-1.5 text-white/40">{cible.cat.items.length}</span>
          </span>
        </div>
      ) : null}
    </div>
  );
}
