// Depose un lead JSON dans le dossier surveille par Elon (voir
// Elon/telegram-bot/src/leads.js), qui le transforme en message Telegram
// pour Nathan.
//
// Deux types de leads coexistent, distingues par le champ `kind` :
// - "audit_started" : ecrit ICI par le code, des que le prospect a valide son
//   email. Porte le code gratuit a communiquer eventuellement.
// - "audit_completed" : ecrit par Nate lui-meme (outil Write, voir mission.md)
//   quand le funnel aboutit et que le plan existe.
//
// Un lead "started" arrive donc typiquement bien avant le "completed", et
// beaucoup de prospects ne produiront jamais de "completed" (abandon en cours
// de route). C est voulu : Nathan veut pouvoir relancer justement ceux-la.
import * as fs from "node:fs";
import * as path from "node:path";
import crypto from "node:crypto";

const LEADS_DIR = "/data/nathan/my-agents/Nate/data/leads";

export function writeLead(lead) {
  fs.mkdirSync(LEADS_DIR, { recursive: true });

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const suffix = crypto.randomBytes(3).toString("hex");
  const file = path.join(LEADS_DIR, `lead-${lead.kind ?? "event"}-${stamp}-${suffix}.json`);

  const payload = { createdAt: new Date().toISOString(), ...lead };

  // Ecriture atomique : le watcher d Elon poll ce dossier toutes les 60s et
  // pourrait lire un fichier a moitie ecrit. On ecrit a cote puis on renomme
  // (rename est atomique sur le meme systeme de fichiers).
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2));
  fs.renameSync(tmp, file);

  return file;
}
