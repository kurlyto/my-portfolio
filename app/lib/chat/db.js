// SQLite local au conteneur my-portfolio, meme patron que Nate/telegram-bot/src/db.js
// (agent perso Nathan, aucun lien avec la DB MDD ni la DB Nate Telegram : threads
// distincts par canal, memes principes de schema).
import Database from "better-sqlite3";
import path from "node:path";
import crypto from "node:crypto";

const DB_PATH = path.join(process.cwd(), "data", "chat.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS threads (
    id TEXT PRIMARY KEY,
    sessionId TEXT,
    account TEXT NOT NULL DEFAULT 'nathan',
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    lastMessageAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    threadId TEXT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(threadId);

  -- Verification d'identite (prenom + email), meme principe que
  -- Nate/telegram-bot/src/db.js. Ici la cle est directement threadId (un
  -- thread = un visiteur, pas besoin d'un userId separe comme sur Telegram
  -- ou plusieurs threads peuvent partager le meme utilisateur).
  CREATE TABLE IF NOT EXISTS unlocked_threads (
    threadId TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    email TEXT NOT NULL,
    unlockedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS pending_verifications (
    threadId TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    email TEXT NOT NULL,
    intent TEXT,
    token TEXT NOT NULL UNIQUE,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    expiresAt TEXT NOT NULL
  );

  -- Session Claude dediee a la collecte identite, separee de threads.sessionId
  -- (le funnel principal). Une table a part plutot qu'une colonne sur threads :
  -- evite de confondre les deux sessions si le code lit sessionId par erreur.
  CREATE TABLE IF NOT EXISTS identity_sessions (
    threadId TEXT PRIMARY KEY,
    sessionId TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function getIdentitySession(threadId) {
  return db.prepare(`SELECT sessionId FROM identity_sessions WHERE threadId = ?`).get(threadId)?.sessionId ?? null;
}

export function setIdentitySession(threadId, sessionId) {
  db.prepare(
    `INSERT INTO identity_sessions (threadId, sessionId) VALUES (?, ?)
     ON CONFLICT(threadId) DO UPDATE SET sessionId = excluded.sessionId`,
  ).run(threadId, sessionId);
}

export function clearIdentitySession(threadId) {
  db.prepare(`DELETE FROM identity_sessions WHERE threadId = ?`).run(threadId);
}

export function createThread() {
  const id = crypto.randomUUID();
  db.prepare(`INSERT INTO threads (id) VALUES (?)`).run(id);
  return { id, sessionId: null, account: "nathan" };
}

export function getThread(threadId) {
  return (
    db.prepare(`SELECT id, sessionId, account FROM threads WHERE id = ?`).get(threadId) ?? null
  );
}

export function isThreadUnlocked(threadId) {
  return !!db.prepare(`SELECT 1 FROM unlocked_threads WHERE threadId = ?`).get(threadId);
}

/** Profil verifie d un thread (prenom + email), ou null. Sert notamment a
 * prefixer le lien de paiement Stripe avec l email deja donne. */
export function getUnlockedProfile(threadId) {
  return (
    db.prepare(`SELECT firstName, email FROM unlocked_threads WHERE threadId = ?`).get(threadId) ??
    null
  );
}

export function createPendingVerification(threadId, firstName, email, intent) {
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  db.prepare(
    `INSERT INTO pending_verifications (threadId, firstName, email, intent, token, expiresAt)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(threadId) DO UPDATE SET
       firstName = excluded.firstName,
       email = excluded.email,
       intent = excluded.intent,
       token = excluded.token,
       createdAt = datetime('now'),
       expiresAt = excluded.expiresAt`,
  ).run(threadId, firstName, email, intent ?? null, token, expiresAt);
  return token;
}

/**
 * Lecture seule de la verification en attente d'un thread (ne consomme rien).
 * Sert a savoir qu'un lien a deja ete envoye et qu'on attend le clic : sans ca,
 * le thread reste verrouille et on relance la collecte d'identite a chaque
 * message, ce qui fait boucler Nate sur "c'est quoi ton prenom ?".
 * Renvoie null si absent ou expire.
 */
export function getPendingVerification(threadId) {
  const row = db
    .prepare(`SELECT firstName, email, expiresAt FROM pending_verifications WHERE threadId = ?`)
    .get(threadId);
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) return null;
  return row;
}

/** Valide un token : renvoie {threadId, firstName, email, intent} ou null si invalide/expiré. */
export function consumeVerificationToken(token) {
  const row = db
    .prepare(`SELECT * FROM pending_verifications WHERE token = ?`)
    .get(token);
  if (!row) return null;
  if (new Date(row.expiresAt).getTime() < Date.now()) {
    db.prepare(`DELETE FROM pending_verifications WHERE token = ?`).run(token);
    return null;
  }
  db.prepare(
    `INSERT INTO unlocked_threads (threadId, firstName, email) VALUES (?, ?, ?)
     ON CONFLICT(threadId) DO UPDATE SET firstName = excluded.firstName, email = excluded.email`,
  ).run(row.threadId, row.firstName, row.email);
  db.prepare(`DELETE FROM pending_verifications WHERE threadId = ?`).run(row.threadId);
  return row;
}

export function touchThread(threadId, sessionId, account) {
  db.prepare(
    `UPDATE threads SET lastMessageAt = datetime('now'), sessionId = ?, account = ? WHERE id = ?`,
  ).run(sessionId, account, threadId);
}

export function addMessage(threadId, role, content) {
  db.prepare(`INSERT INTO messages (id, threadId, role, content) VALUES (?, ?, ?, ?)`).run(
    crypto.randomUUID(),
    threadId,
    role,
    content,
  );
}

export function getMessages(threadId) {
  return db
    .prepare(`SELECT role, content, createdAt FROM messages WHERE threadId = ? ORDER BY createdAt ASC`)
    .all(threadId);
}

/** Derniers messages du thread, formates pour un replay en --append-system-prompt. */
export function getRecentHistory(threadId, limit = 12) {
  const rows = db
    .prepare(
      `SELECT role, content FROM messages WHERE threadId = ? ORDER BY createdAt DESC LIMIT ?`,
    )
    .all(threadId, limit);
  return rows
    .reverse()
    .map((m) => `${m.role === "USER" ? "Visiteur" : "Nate"}: ${m.content}`)
    .join("\n");
}
