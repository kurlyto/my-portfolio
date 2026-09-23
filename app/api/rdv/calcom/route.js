import crypto from "node:crypto";
import { writeLead } from "@/app/lib/chat/lead-writer";

// Webhook Cal.com (23/09/2026) : chaque rendez-vous pris, deplace ou annule sur
// https://cal.com/nathan-knaebel devient un lead `rdv_calcom` dans le dossier
// surveille. Deux lecteurs le prennent ensuite, sans rien de neuf a brancher :
// Elon (message Telegram a Nathan) et outils/crm-sync-leads-site.cjs cote AIOS
// (fiche dans l'espace "Agence IA" du CRM).
//
// Cal.com signe le corps brut : HMAC-SHA256 avec le secret saisi dans son
// ecran Webhooks, en hexa dans l'en-tete `x-cal-signature-256`. Sans la bonne
// signature, rien n'est ecrit : n'importe qui pourrait sinon remplir le CRM.

const EVENEMENTS = {
  BOOKING_CREATED: "pris",
  BOOKING_RESCHEDULED: "deplace",
  BOOKING_CANCELLED: "annule",
};

const MAX = 500;
const propre = (v) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");

function signatureValide(brut, recue) {
  const secret = process.env.CALCOM_WEBHOOK_SECRET;
  if (!secret || !recue) return false;
  const attendue = crypto.createHmac("sha256", secret).update(brut).digest("hex");
  const a = Buffer.from(attendue);
  const b = Buffer.from(String(recue));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// Les reponses du formulaire de reservation arrivent sous deux formes selon
// la version de Cal.com : `{ notes: "..." }` ou `{ notes: { value: "..." } }`.
function reponse(responses, cle) {
  const v = responses?.[cle];
  return propre(typeof v === "object" && v !== null ? v.value : v);
}

// Heure du rendez-vous lisible par Nathan : toujours a l'heure de Paris.
function heureParis(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function POST(request) {
  const brut = await request.text();
  if (!signatureValide(brut, request.headers.get("x-cal-signature-256"))) {
    return Response.json({ error: "Signature invalide." }, { status: 401 });
  }

  let corps;
  try {
    corps = JSON.parse(brut);
  } catch {
    return Response.json({ error: "Requête illisible." }, { status: 400 });
  }

  // Le bouton "Ping test" de Cal.com et les evenements non suivis repondent
  // 200 sans rien ecrire : Cal.com affiche alors le webhook comme fonctionnel.
  const etat = EVENEMENTS[corps.triggerEvent];
  if (!etat) return Response.json({ ok: true, ignore: corps.triggerEvent || "inconnu" });

  const p = corps.payload || {};
  const invite = p.attendees?.[0] || {};
  const nomComplet = propre(invite.name) || reponse(p.responses, "name");
  const [prenom, ...reste] = nomComplet.split(/\s+/);
  const email = propre(invite.email) || reponse(p.responses, "email");
  const telephone = propre(invite.phoneNumber) || reponse(p.responses, "attendeePhoneNumber");
  const notes = reponse(p.responses, "notes") || propre(p.additionalNotes);
  const quand = heureParis(p.startTime);
  const rdv = propre(p.eventTitle) || propre(p.type) || propre(p.title);

  writeLead({
    kind: "rdv_calcom",
    channel: "Cal.com",
    rdvEtat: etat,
    rdvTitre: rdv,
    rdvDebut: propre(p.startTime),
    rdvQuand: quand,
    rdvLienVisio: propre(p.metadata?.videoCallUrl) || propre(p.location),
    rdvUid: propre(p.uid),
    rdvRaisonAnnulation: propre(p.cancellationReason),
    firstName: prenom || nomComplet,
    lastName: reste.join(" "),
    email,
    phone: telephone,
    summary:
      `Rendez-vous « ${rdv} » ${etat === "pris" ? "réservé" : etat === "deplace" ? "déplacé" : "annulé"}` +
      (quand ? ` pour le ${quand}` : "") +
      "." +
      (notes ? ` Message : ${notes}` : ""),
  });

  return Response.json({ ok: true });
}
