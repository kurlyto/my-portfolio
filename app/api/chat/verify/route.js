import { consumeVerificationToken } from "@/app/lib/chat/db";
import { ensureCodeFor } from "@/app/lib/chat/codes";
import { writeLead } from "@/app/lib/chat/lead-writer";

// Route de callback du lien envoyé par email (voir mailer.js). Contrairement
// au canal Telegram (qui notifie via bot.telegram.sendMessage), ici il n'y a
// rien à "notifier" côté serveur : le visiteur clique le lien dans un nouvel
// onglet, cette page confirme, puis il revient sur l'onglet du chat où le
// prochain message qu'il enverra passera par handleFunnelTurn (isThreadUnlocked
// devient vrai dès que le token est consommé, avant même qu'il revienne).
export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const profile = consumeVerificationToken(token);

  const html = (body) =>
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Vérification</title>
<style>body{font-family:system-ui,sans-serif;max-width:480px;margin:80px auto;padding:0 20px;line-height:1.5;color:#1a1a1a;text-align:center}</style>
</head><body>${body}</body></html>`;

  if (!profile) {
    return new Response(html("<h1>Lien invalide ou expiré</h1><p>Retourne sur ton onglet de discussion et redemande un lien.</p>"), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Un email valide = un prospect reel qui demarre son audit. C est le moment
  // ou Nathan veut etre prevenu (et recevoir le code gratuit associe), sans
  // attendre la fin du funnel que beaucoup n atteindront jamais.
  //
  // Best-effort volontaire : si la generation du code ou l ecriture du lead
  // echoue, le visiteur doit quand meme voir sa page de confirmation. Il a
  // fait sa part, ce serait absurde de le bloquer sur un probleme interne.
  try {
    const freeCode = ensureCodeFor({
      email: profile.email,
      firstName: profile.firstName,
      threadId: profile.threadId,
    });

    writeLead({
      kind: "audit_started",
      firstName: profile.firstName,
      email: profile.email,
      threadId: profile.threadId,
      freeCode: freeCode?.code ?? null,
      channel: "web",
    });
  } catch (err) {
    console.error("Notification de demarrage d audit echouee:", err);
  }

  return new Response(
    html(`<h1>C'est confirmé !</h1><p>Tu peux retourner sur ton onglet de discussion, Nate t attend.</p>`),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
