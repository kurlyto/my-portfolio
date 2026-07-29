// Codes gratuits nominatifs : un code par prospect, genere au moment ou il
// valide son adresse email (voir app/api/chat/verify/route.js).
//
// Nathan recoit le code via Elon et decide s il l offre ou non. Le prospect ne
// le voit jamais tant que Nathan (ou Nate sur autorisation) ne le lui a pas
// communique.
//
// Regles de securite retenues :
// - NOMINATIF : le code est lie a l email du prospect. Le partager ne sert a
//   rien, il ne fonctionne que pour cette adresse.
// - USAGE UNIQUE : consomme une seule fois (`usedAt`), pas de prestation
//   gratuite en serie.
// - Compare en majuscules et sans espaces : le prospect recopie souvent le
//   code a la main depuis un email, avec une casse ou des espaces differents.
import Database from "better-sqlite3";
import path from "node:path";
import crypto from "node:crypto";

const DB_PATH = path.join(process.cwd(), "data", "chat.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS free_codes (
    code TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    firstName TEXT NOT NULL,
    threadId TEXT,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    usedAt TEXT,
    -- Pose par Elon quand Nathan autorise Nate a communiquer le code au
    -- prospect directement dans la conversation (voir grants/ cote agents).
    releasedAt TEXT,
    -- Pose des que Nate a effectivement annonce le code au visiteur. Sans ca,
    -- l instruction serait reinjectee a chaque tour et Nate repeterait le code
    -- indefiniment (le contexte systeme est ephemere, il ne survit pas dans
    -- l historique rejoue).
    announcedAt TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_free_codes_email ON free_codes(email);
  CREATE INDEX IF NOT EXISTS idx_free_codes_thread ON free_codes(threadId);
`);

// CREATE TABLE IF NOT EXISTS n ajoute pas les colonnes ajoutees apres coup sur
// une base deja creee : on rattrape a la main, en ignorant l erreur si la
// colonne existe deja (sqlite n a pas de ADD COLUMN IF NOT EXISTS).
for (const column of ["releasedAt TEXT", "announcedAt TEXT"]) {
  try {
    db.exec(`ALTER TABLE free_codes ADD COLUMN ${column}`);
  } catch {
    // Colonne deja presente.
  }
}

// Alphabet sans caracteres ambigus (pas de O/0, I/1, S/5) : le code est
// souvent lu dans un email puis retape a la main.
const ALPHABET = "ABCDEFGHJKLMNPQRTUVWXYZ2346789";

function randomCode() {
  const bytes = crypto.randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `NATE-${out.slice(0, 4)}-${out.slice(4)}`;
}

export function normalizeCode(raw) {
  return String(raw ?? "").toUpperCase().replace(/\s+/g, "");
}

/**
 * Cree (ou recupere) le code d un prospect. Idempotent par email : si la
 * personne recommence une conversation avec la meme adresse, elle garde le
 * meme code plutot que d en accumuler un par thread.
 */
export function ensureCodeFor({ email, firstName, threadId }) {
  const existing = db
    .prepare(`SELECT * FROM free_codes WHERE email = ? ORDER BY createdAt ASC LIMIT 1`)
    .get(email);
  if (existing) return existing;

  // Collision quasi impossible (30^8), mais la PRIMARY KEY la rendrait fatale :
  // on retente quelques fois plutot que de propager une erreur au visiteur.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();
    try {
      db.prepare(
        `INSERT INTO free_codes (code, email, firstName, threadId) VALUES (?, ?, ?, ?)`,
      ).run(code, email, firstName, threadId ?? null);
      return db.prepare(`SELECT * FROM free_codes WHERE code = ?`).get(code);
    } catch (err) {
      if (attempt === 4) throw err;
    }
  }
  return null;
}

/**
 * Verifie un code saisi par un prospect. Renvoie un resultat explicite plutot
 * qu un booleen : l appelant (et Nate) doit pouvoir expliquer POURQUOI un code
 * est refuse, sinon le visiteur ne comprend pas quoi corriger.
 */
export function redeemCode({ rawCode, email }) {
  const code = normalizeCode(rawCode);
  if (!code) return { ok: false, reason: "empty" };

  const row = db.prepare(`SELECT * FROM free_codes WHERE code = ?`).get(code);
  if (!row) return { ok: false, reason: "unknown" };
  if (row.usedAt) return { ok: false, reason: "already_used" };
  if (row.email !== email) return { ok: false, reason: "wrong_email" };

  db.prepare(`UPDATE free_codes SET usedAt = datetime('now') WHERE code = ?`).run(code);
  return { ok: true, code: row.code, firstName: row.firstName, email: row.email };
}

export function getCodeByEmail(email) {
  return db.prepare(`SELECT * FROM free_codes WHERE email = ? ORDER BY createdAt ASC LIMIT 1`).get(email) ?? null;
}

/**
 * Code que Nathan a autorise Nate a annoncer, s il existe, n est pas deja
 * utilise, et n a pas deja ete annonce (sinon Nate le repeterait a chaque tour).
 */
export function getReleasedCodeForThread(threadId) {
  return (
    db
      .prepare(
        `SELECT * FROM free_codes
         WHERE threadId = ? AND releasedAt IS NOT NULL AND usedAt IS NULL AND announcedAt IS NULL
         LIMIT 1`,
      )
      .get(threadId) ?? null
  );
}

export function markAnnounced(code) {
  db.prepare(`UPDATE free_codes SET announcedAt = datetime('now') WHERE code = ?`).run(
    normalizeCode(code),
  );
}

/** Appele quand Nathan autorise la communication du code (via Elon). */
export function releaseCode(code) {
  const normalized = normalizeCode(code);
  const res = db
    .prepare(`UPDATE free_codes SET releasedAt = datetime('now') WHERE code = ? AND usedAt IS NULL`)
    .run(normalized);
  return res.changes > 0;
}
