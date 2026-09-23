// SMTP Gmail (mot de passe d'application, PAS le mot de passe du compte).
// Compte perso de Nathan, aucun lien avec Brevo/MDD. Memes credentials que
// nate/telegram-bot/src/mailer.js (SMTP_USER/SMTP_APP_PASSWORD), a definir
// aussi dans le .env de my-portfolio.
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

// Nouvelle demande "Reserver ma place" : un mail a Nathan lui-meme, en plus du
// message Telegram d'Elon. `replyTo` = le prospect, pour repondre en un clic.
export async function sendReservationNotice(lead) {
  const lignes = [
    `${lead.prenom} ${lead.nom}`,
    `${lead.fonction} chez ${lead.entreprise}`,
    `Mail : ${lead.email}`,
    `Téléphone : ${lead.telephone}`,
    `Personnes intéressées : ${lead.utilisateurs || "non précisé"}`,
  ];
  if (lead.message) lignes.push("", `Message : ${lead.message}`);
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    replyTo: lead.email,
    subject: `Foxy : ${lead.prenom} ${lead.nom} (${lead.entreprise}) réserve sa place`,
    text: lignes.join("\n"),
  });
}

export async function sendVerificationEmail({ to, firstName, verifyUrl }) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Confirme ton accès à Nate",
    text:
      `Salut ${firstName},\n\n` +
      `Clique sur ce lien pour confirmer ton accès et reprendre la conversation avec Nate :\n${verifyUrl}\n\n` +
      `Ce lien expire dans 30 minutes.`,
  });
}
