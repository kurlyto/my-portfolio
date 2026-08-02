// Client Umami cote serveur uniquement.
//
// Les identifiants ne quittent jamais le serveur : la page /stats appelle
// /api/stats, qui appelle Umami. Le navigateur ne voit que des series de
// nombres deja agregees.
//
// Umami v3 self-hosted s'authentifie en Bearer (POST /api/auth/login -> JWT),
// pas via un header x-umami-api-key (celui-la n'existe que sur Umami Cloud).

const UMAMI_URL = process.env.UMAMI_URL ?? "";
const UMAMI_USERNAME = process.env.UMAMI_USERNAME ?? "";
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD ?? "";

/**
 * Liste des projets a afficher, en JSON dans UMAMI_SITES.
 * Format : [{ "key": "poker", "label": "Poker", "websiteId": "uuid" }]
 *
 * Volontairement en variable d'env et pas en dur dans le code : ajouter un
 * projet (Fetafrance quand il sera en ligne) ne doit pas demander un redeploy.
 * L'ordre du tableau fixe l'ordre des couleurs de la charte dataviz.
 */
export function getSites() {
  try {
    const parsed = JSON.parse(process.env.UMAMI_SITES ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((s) => s?.websiteId && s?.label) : [];
  } catch {
    return [];
  }
}

// Le JWT Umami est valable plusieurs jours. On le garde en memoire du process
// pour ne pas rejouer un login a chaque affichage de la page.
let cachedToken = null;
let cachedTokenAt = 0;
const TOKEN_TTL_MS = 6 * 60 * 60 * 1000;

async function getToken(forceRefresh = false) {
  const fresh = cachedToken && Date.now() - cachedTokenAt < TOKEN_TTL_MS;
  if (fresh && !forceRefresh) return cachedToken;

  const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Umami login: HTTP ${res.status}`);

  const data = await res.json();
  if (!data?.token) throw new Error("Umami login: pas de token dans la reponse");

  cachedToken = data.token;
  cachedTokenAt = Date.now();
  return cachedToken;
}

async function umamiGet(path, { retryOnAuthError = true } = {}) {
  const token = await getToken();
  const res = await fetch(`${UMAMI_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  // Un token expire avant la fin du TTL (redemarrage d'Umami, APP_SECRET
  // change) : on relogue une fois avant d'abandonner.
  if ((res.status === 401 || res.status === 403) && retryOnAuthError) {
    await getToken(true);
    return umamiGet(path, { retryOnAuthError: false });
  }

  if (!res.ok) throw new Error(`Umami ${path}: HTTP ${res.status}`);
  return res.json();
}

/** Suite de dates AAAA-MM-JJ couvrant [startAt, endAt], en heure de Paris. */
function buildDateAxis(startAt, endAt) {
  const axis = [];
  const cursor = new Date(startAt);
  cursor.setUTCHours(12, 0, 0, 0); // midi : immunise contre les decalages DST
  const last = new Date(endAt);

  while (cursor <= last) {
    axis.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return axis;
}

/**
 * Umami ne renvoie que les jours ou il y a du trafic. Sans ce recalage, une
 * serie a trous serait dessinee comme si les jours vides n'existaient pas :
 * les courbes des differents projets ne seraient plus alignees sur le meme axe.
 */
function alignToAxis(points, axis) {
  const byDay = new Map();
  for (const p of points ?? []) {
    const day = String(p.x).slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + Number(p.y ?? 0));
  }
  return axis.map((day) => byDay.get(day) ?? 0);
}

/**
 * Series journalieres de tous les projets sur une periode.
 *
 * Un projet qui echoue (site supprime, Umami qui tousse) ne doit pas faire
 * tomber toute la page : sa serie revient a zero avec un drapeau `failed`,
 * et l'UI le signale au lieu d'afficher une erreur globale.
 */
export async function getStats({ days = 30 } = {}) {
  const sites = getSites();
  if (!UMAMI_URL || !UMAMI_USERNAME || !UMAMI_PASSWORD) {
    throw new Error("Configuration Umami manquante (UMAMI_URL / USERNAME / PASSWORD)");
  }
  if (sites.length === 0) throw new Error("Aucun site configure dans UMAMI_SITES");

  const endAt = Date.now();
  const startAt = endAt - days * 24 * 60 * 60 * 1000;

  const axis = buildDateAxis(startAt, endAt);
  const qs = (from, to) =>
    `startAt=${from}&endAt=${to}&unit=day&timezone=Europe%2FParis`;

  // `compare=prev` fait calculer la periode precedente par Umami lui-meme :
  // il renvoie un bloc `comparison`, ce qui evite une requete de plus par
  // projet pour l'evolution.
  const statsQs = (from, to) => `${qs(from, to)}&compare=prev`;

  const series = await Promise.all(
    sites.map(async (site) => {
      try {
        // Deux sources volontairement combinees :
        //
        // - /stats donne les TOTAUX exacts sur la periode, avec la definition
        //   d'Umami : visiteurs = count(distinct session_id), visites =
        //   count(distinct visit_id). Une meme personne qui revient le
        //   lendemain compte 1 visiteur et 2 visites.
        // - /pageviews donne les series journalieres, mais seulement pour les
        //   pages vues et les sessions. Aucun endpoint ne renvoie la serie
        //   journaliere des visites.
        //
        // On ne somme donc JAMAIS une serie journaliere pour afficher un
        // total de visiteurs : additionner les uniques de chaque jour
        // recompte la meme personne a chaque retour et gonfle le chiffre
        // (sur MDD : 655 par sommation contre 489 reels).
        const [current, stats] = await Promise.all([
          umamiGet(`/api/websites/${site.websiteId}/pageviews?${qs(startAt, endAt)}`),
          umamiGet(`/api/websites/${site.websiteId}/stats?${statsQs(startAt, endAt)}`),
        ]);

        const daily = alignToAxis(current.sessions, axis);
        const pageviews = alignToAxis(current.pageviews, axis);
        const previous = stats.comparison ?? {};

        return {
          key: site.key ?? site.websiteId,
          label: site.label,
          // Series journalieres (la forme des courbes).
          visitors: daily,
          visits: daily,
          pageviews,
          // Totaux exacts sur la periode (les chiffres qu'on affiche).
          totalVisitors: Number(stats.visitors ?? 0),
          totalVisits: Number(stats.visits ?? 0),
          totalPageviews: Number(stats.pageviews ?? 0),
          previousVisitors: Number(previous.visitors ?? 0),
          previousVisits: Number(previous.visits ?? 0),
          previousPageviews: Number(previous.pageviews ?? 0),
          failed: false,
        };
      } catch {
        const zeros = axis.map(() => 0);
        return {
          key: site.key ?? site.websiteId,
          label: site.label,
          visitors: zeros,
          visits: zeros,
          pageviews: zeros,
          totalVisitors: 0,
          totalVisits: 0,
          totalPageviews: 0,
          previousVisitors: 0,
          previousVisits: 0,
          previousPageviews: 0,
          failed: true,
        };
      }
    }),
  );

  return { axis, series, days };
}
