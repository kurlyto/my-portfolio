// SQLite local au conteneur my-portfolio, meme patron que Elon/telegram-bot/src/db.js
// (agent perso Nathan, aucun lien avec la DB MDD ni la DB Elon Telegram : threads
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
`);

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
    .map((m) => `${m.role === "USER" ? "Visiteur" : "Elon"}: ${m.content}`)
    .join("\n");
}
