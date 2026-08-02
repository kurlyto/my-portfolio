// Protection de /stats par un mot de passe unique.
//
// Pas de table utilisateur ni de librairie d'auth : il y a un seul lecteur.
// Le cookie porte une signature HMAC-SHA256 de sa date d'expiration, donc le
// navigateur ne peut ni forger ni prolonger une session (meme principe que
// l'auth admin de MDD, en beaucoup plus simple).

import crypto from "node:crypto";

const COOKIE_NAME = "stats_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret() {
  // On derive la cle du mot de passe lui-meme : changer STATS_PASSWORD
  // invalide mecaniquement toutes les sessions existantes.
  const password = process.env.STATS_PASSWORD;
  if (!password) throw new Error("STATS_PASSWORD non configure");
  return crypto.createHash("sha256").update(`stats-session:${password}`).digest();
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionCookie() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return {
    name: COOKIE_NAME,
    value: `${payload}.${sign(payload)}`,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(SESSION_TTL_MS / 1000),
    },
  };
}

export function isValidSession(cookieValue) {
  if (!cookieValue) return false;

  const [payload, signature] = String(cookieValue).split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  // timingSafeEqual exige deux buffers de meme longueur, d'ou le garde-fou.
  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

  return Number(payload) > Date.now();
}

/** Comparaison a temps constant : ne renseigne pas sur le prefixe correct. */
export function isPasswordCorrect(candidate) {
  const expected = process.env.STATS_PASSWORD ?? "";
  if (!expected || typeof candidate !== "string") return false;

  const a = crypto.createHash("sha256").update(candidate).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export const STATS_COOKIE_NAME = COOKIE_NAME;
