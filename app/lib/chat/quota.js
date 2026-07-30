// Quotas par adresse IP sur le chat public de Nate.
//
// Le chat est ouvert a tout visiteur et chaque tour consomme des tokens du
// compte Claude de Nathan. Sans limite, un seul visiteur (ou un script) peut
// vider le quota du compte. Deux compteurs distincts, remis a zero chaque jour :
//
// 1. Tours AVANT verification email (IDENTITY_DAILY_LIMIT) : c'est la partie
//    reellement exposee, un inconnu peut l'atteindre sans rien prouver. C'est
//    la principale surface d'abus.
//    /!\ L'unite est le TOUR DE CONVERSATION, pas le prospect. Le parcours
//    demande l'identite APRES avoir compris le metier, les difficultes et le
//    besoin (~8-12 tours), et non des l'entree : un plafond trop bas coupe le
//    prospect en plein cadrage, avant meme la demande d'email — on perd alors
//    et l'email et le besoin, apres avoir paye tous les appels modele.
// 2. Audits termines (AUDIT_DAILY_LIMIT) : un audit complet est long (funnel
//    entier), donc cher. Meme verifie, on ne laisse pas une IP en enchainer
//    un nombre illimite.
//
// Les tours du funnel APRES verification ne sont volontairement pas plafonnes
// separement : ils sont deja bornes par le nombre d'audits autorises, et
// couper un prospect verifie en plein cadrage serait pire que le cout evite.
//
// Choix du jour glissant vs calendaire : on utilise la date calendaire
// (YYYY-MM-DD en heure du serveur). Plus simple a expliquer a un visiteur
// ("reessayez demain") et suffisant pour de l'anti-abus.
import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "data", "chat.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS ip_usage (
    ip TEXT NOT NULL,
    day TEXT NOT NULL,
    identityTurns INTEGER NOT NULL DEFAULT 0,
    audits INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (ip, day)
  );
`);

// La table existe deja en production sans cette colonne : CREATE TABLE IF NOT
// EXISTS ne l'ajouterait jamais. On la migre explicitement, en ignorant l'erreur
// si elle est deja la (SQLite n'a pas de ADD COLUMN IF NOT EXISTS).
try {
  db.exec(`ALTER TABLE ip_usage ADD COLUMN voiceNotes INTEGER NOT NULL DEFAULT 0`);
} catch {
  // Colonne deja presente : rien a faire.
}

// 60 tours anonymes = environ 5 prospects qui vont au bout du cadrage avant
// verification (~12 tours chacun). Au-dela, ce n'est plus un prospect qui
// hesite : quelqu'un exploite le canal gratuit.
// /!\ Ne PAS confondre avec un nombre de prospects : l'unite est le TOUR de
// conversation. Descendre ce chiffre a 5 couperait le premier prospect en plein
// cadrage, avant meme que Nate lui ait demande son email.
export const IDENTITY_DAILY_LIMIT = 60;
export const AUDIT_DAILY_LIMIT = 3;

export const IDENTITY_LIMIT_MESSAGE =
  "Je ne peux pas progresser sans la validation de ton adresse email. " +
  "On reprendra demain si tu veux : clique sur le lien que je t'ai envoye par email pour continuer des maintenant.";

export const AUDIT_LIMIT_MESSAGE =
  "Tu as deja cadre plusieurs projets aujourd'hui, je prefere m'arreter la pour le moment. " +
  "Reviens demain pour en cadrer un nouveau, ou appelle Nathan au 06 22 16 47 58 si tu veux avancer tout de suite.";

function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * IP reelle du visiteur. On lit X-Real-IP, pose par nginx lui-meme (voir
 * /etc/nginx/sites-enabled/nathan-knaebel.com) et donc non falsifiable par le
 * client, plutot que X-Forwarded-For qu un visiteur peut fabriquer de toutes
 * pieces pour se donner une identite neuve a chaque requete.
 */
export function clientIp(request) {
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function usageFor(ip) {
  return (
    db.prepare(`SELECT identityTurns, audits FROM ip_usage WHERE ip = ? AND day = ?`).get(ip, today()) ?? {
      identityTurns: 0,
      audits: 0,
    }
  );
}

function bump(ip, column) {
  db.prepare(
    `INSERT INTO ip_usage (ip, day, ${column}) VALUES (?, ?, 1)
     ON CONFLICT(ip, day) DO UPDATE SET ${column} = ${column} + 1`,
  ).run(ip, today());
}

/** true si l IP a encore droit a un tour de collecte d identite aujourd hui. */
export function canSpendIdentityTurn(ip) {
  return usageFor(ip).identityTurns < IDENTITY_DAILY_LIMIT;
}

export function recordIdentityTurn(ip) {
  bump(ip, "identityTurns");
}

/** true si l IP a encore droit a terminer un audit aujourd hui. */
export function canStartAudit(ip) {
  return usageFor(ip).audits < AUDIT_DAILY_LIMIT;
}

export function recordAudit(ip) {
  bump(ip, "audits");
}

/**
 * Transcriptions vocales. Chaque envoi appelle Whisper chez Groq : c'est une
 * surface d'abus distincte du chat (on peut envoyer de l'audio sans jamais
 * ecrire un mot), donc son propre compteur.
 */
export const VOICE_DAILY_LIMIT = 20;

export const VOICE_LIMIT_MESSAGE =
  "Tu as envoye beaucoup de messages vocaux aujourd'hui. Ecris-moi ton besoin, ou reviens demain.";

export function canTranscribe(ip) {
  const row = db
    .prepare(`SELECT voiceNotes FROM ip_usage WHERE ip = ? AND day = ?`)
    .get(ip, today());
  return (row?.voiceNotes ?? 0) < VOICE_DAILY_LIMIT;
}

export function recordTranscription(ip) {
  bump(ip, "voiceNotes");
}

export function usageSnapshot(ip) {
  const u = usageFor(ip);
  return {
    identityTurns: u.identityTurns,
    identityLimit: IDENTITY_DAILY_LIMIT,
    audits: u.audits,
    auditLimit: AUDIT_DAILY_LIMIT,
  };
}
