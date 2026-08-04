import { consumeVerificationToken, rememberVisitor } from "@/app/lib/chat/db";
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
    return new Response(html(`<h1>Lien invalide ou expiré</h1>
<p>Retourne sur ta discussion et demande à Nate de te renvoyer le lien.</p>
<button id="back" style="margin-top:24px;padding:14px 28px;font:inherit;font-weight:700;font-size:14px;border:0;border-radius:6px;background:#ff6b35;color:#fff;cursor:pointer">Revenir à la discussion</button>
<script>
  document.getElementById("back").addEventListener("click", function () {
    window.close();
    setTimeout(function () { window.location.href = "/"; }, 120);
  });
</script>`), {
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
  // Retient la personne au-dela de ce thread : sans ca, un client qui repart
  // sur un nouveau projet devrait redonner son email et recliquer un lien.
  try {
    if (profile.visitorId) {
      rememberVisitor(profile.visitorId, profile.firstName, profile.email);
    }
  } catch (err) {
    console.error("Memorisation du visiteur echouee:", err);
  }

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

  // Le visiteur a clique le lien depuis sa boite mail : cet onglet est un
  // detour, sa conversation est restee ouverte ailleurs. On lui rend la main en
  // un clic plutot que de le laisser chercher son onglet.
  //
  // window.close() ne fonctionne que si l'onglet a ete ouvert par un script
  // (cas du clic depuis le chat). Depuis un client mail, le navigateur refuse :
  // on retombe alors sur une redirection vers l'accueil, ou le chat se restaure
  // tout seul depuis le localStorage.
  return new Response(
    html(`<h1>C'est confirmé !</h1>
<p id="msg">Tu peux reprendre ta discussion avec Nate.</p>
<button id="back" style="margin-top:24px;padding:14px 28px;font:inherit;font-weight:700;font-size:14px;border:0;border-radius:6px;background:#ff6b35;color:#fff;cursor:pointer">Revenir à la discussion</button>
<p id="hint" style="margin-top:16px;font-size:13px;opacity:.55"></p>
<script>
  // Un navigateur ne permet PAS de savoir si un autre onglet est ouvert, ni d'y
  // basculer : ce serait un vecteur de pistage. Ce qu'on peut faire, c'est
  // diffuser un message a tous les onglets du meme site (BroadcastChannel) et
  // laisser celui du chat se signaler lui-meme.
  //   - quelqu'un repond  -> son onglet se remet au premier plan, on ferme celui-ci
  //   - personne ne repond -> le chat a ete ferme, on rouvre le site
  var back = document.getElementById("back");
  var hint = document.getElementById("hint");

  function openHere() {
    window.location.href = "/?chat=1";
  }

  back.addEventListener("click", function () {
    back.disabled = true;
    back.textContent = "Un instant...";

    var chan = null;
    try {
      chan = new BroadcastChannel("nate-chat");
    } catch (e) {
      // Navigateur sans BroadcastChannel : on rouvre directement.
      openHere();
      return;
    }

    var answered = false;
    chan.onmessage = function (ev) {
      if (!ev.data || ev.data.type !== "here") return;
      answered = true;
      // L'onglet du chat s'est signale : il vient de se remettre au premier
      // plan de son cote. On s'efface.
      window.close();
      // Si la fermeture est refusee (onglet ouvert depuis un client mail et non
      // par un script), on affiche au moins un message honnete.
      setTimeout(function () {
        back.style.display = "none";
        document.getElementById("msg").textContent =
          "Ta discussion a repris dans ton autre onglet.";
        hint.textContent = "Tu peux fermer cette page.";
      }, 200);
    };

    chan.postMessage({ type: "ping" });

    // Personne n'a repondu : le chat n'est plus ouvert, on le rouvre ici.
    setTimeout(function () {
      if (!answered) openHere();
    }, 400);
  });
</script>`),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
