// Compte les fichiers plans/leads produits par Nate, pour detecter qu un audit
// vient reellement d aboutir.
//
// Pourquoi compter des fichiers plutot que de lire le texte de la reponse :
// un audit est "termine" quand Nate a ECRIT le plan et le lead, pas quand il
// dit qu il a fini. Se fier a une tournure de phrase ("j'ai toutes les
// informations") serait fragile - le modele reformule librement, et un
// prospect pourrait declencher le decompte en lui faisant repeter la phrase.
import * as fs from "node:fs";
import * as path from "node:path";

const LEADS_DIR = "/data/nathan/my-agents/Nate/data/leads";

/** Nombre de leads actuellement sur disque. 0 si le dossier n existe pas. */
export function countPlans() {
  try {
    return fs.readdirSync(LEADS_DIR).filter((f) => f.endsWith(".json")).length;
  } catch {
    return 0;
  }
}

/**
 * Vrai si un audit a deja abouti pour cet email (un lead `audit_completed`
 * existe). Sert a accueillir un visiteur qui revient au bon endroit : lui
 * reproposer de cadrer son besoin alors que son plan est ecrit serait absurde,
 * et il faut au contraire lui remettre le bouton de reglement sous les yeux.
 *
 * On filtre par email et non par threadId : les leads de fin de funnel sont
 * ecrits par Nate lui-meme (outil Write), et il ne connait pas le threadId.
 * L'email, lui, a ete verifie et figure toujours dans le lead.
 */
export function hasCompletedAudit(email) {
  if (!email) return false;
  const target = email.trim().toLowerCase();

  try {
    return fs
      .readdirSync(LEADS_DIR)
      .filter((f) => f.endsWith(".json"))
      .some((f) => {
        try {
          const lead = JSON.parse(fs.readFileSync(path.join(LEADS_DIR, f), "utf8"));
          return lead.kind === "audit_completed" && lead.email?.trim().toLowerCase() === target;
        } catch {
          // Lead illisible : il ne doit pas faire echouer la detection entiere.
          return false;
        }
      });
  } catch {
    return false;
  }
}
