import { writeLead } from "@/app/lib/chat/lead-writer";

// Demande de place pour l'acces anticipe a l'AIOS (bouton "Reserver ma place"
// du site racine). Avant le 08/09/2026 ce bouton ouvrait le chat de Nate :
// une conversation est un bon outil de decouverte, mais un dirigeant qui a
// DEJA decide veut laisser ses coordonnees en trente secondes, pas discuter.
//
// La demande repart par le tuyau qui existe deja : un fichier JSON depose dans
// le dossier surveille par Elon, qui previent Nathan sur Telegram. Aucun
// nouveau canal, aucune base a maintenir.

const CHAMPS_OBLIGATOIRES = ["prenom", "nom", "email", "telephone", "entreprise", "fonction"];

// Bornes larges : elles ne sont pas la pour juger la saisie, seulement pour
// qu'un robot ne puisse pas ecrire un roman dans le dossier de leads.
const MAX = 200;

function propre(valeur) {
  return typeof valeur === "string" ? valeur.trim().slice(0, MAX) : "";
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête illisible." }, { status: 400 });
  }

  // Piege a robots : un champ cache que personne ne remplit a la main. Rempli
  // = on repond 200 sans rien ecrire, le robot croit avoir reussi.
  if (propre(body.site)) {
    return Response.json({ ok: true });
  }

  const lead = {
    prenom: propre(body.prenom),
    nom: propre(body.nom),
    email: propre(body.email),
    telephone: propre(body.telephone),
    entreprise: propre(body.entreprise),
    fonction: propre(body.fonction),
    utilisateurs: propre(body.utilisateurs),
    message: propre(body.message),
  };

  const manquant = CHAMPS_OBLIGATOIRES.find((champ) => !lead[champ]);
  if (manquant) {
    return Response.json({ error: `Champ manquant : ${manquant}.` }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  try {
    // `firstName` / `email` / `phone` portent les noms attendus par le
    // redacteur d'Elon (voir Elon/telegram-bot/src/leads.js) : les renommer
    // ici priverait le message Telegram du prenom et du telephone.
    writeLead({
      kind: "aios_early_access",
      channel: "site AIOS",
      firstName: lead.prenom,
      lastName: lead.nom,
      email: lead.email,
      phone: lead.telephone,
      company: lead.entreprise,
      role: lead.fonction,
      seats: lead.utilisateurs,
      summary:
        `${lead.prenom} ${lead.nom}, ${lead.fonction} chez ${lead.entreprise}. ` +
        `Personnes intéressées : ${lead.utilisateurs || "non précisé"}.` +
        (lead.message ? ` Message : ${lead.message}` : ""),
    });
  } catch (err) {
    console.error("Ecriture du lead AIOS echouee:", err);
    return Response.json(
      { error: "Enregistrement impossible pour le moment." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
