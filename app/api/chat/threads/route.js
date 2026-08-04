import { NextResponse } from "next/server";
import { createThread, getKnownVisitor, unlockThreadFor } from "@/app/lib/chat/db";
import { clientIp, canSpendIdentityTurn, canStartAudit } from "@/app/lib/chat/quota";

// Ouvrir un thread ne coute aucun token, mais on refuse quand meme quand l IP
// a epuise ses deux quotas du jour : sans ca, un visiteur bloque pourrait
// ouvrir des threads a l infini pour reessayer. Les compteurs etant par IP (et
// non par thread), un thread neuf ne redonne de toute facon aucun credit - ce
// garde-fou evite juste d accumuler des threads vides en base.
export async function POST(request) {
  const ip = clientIp(request);

  if (!canSpendIdentityTurn(ip) && !canStartAudit(ip)) {
    return NextResponse.json(
      { error: "Tu as atteint la limite d'utilisation pour aujourd'hui. Reviens demain." },
      { status: 429 },
    );
  }

  // Personne deja verifiee (elle a clique son lien email lors d'un projet
  // precedent) : on deverrouille directement le thread neuf. Sans ca, un client
  // qui repart sur un nouveau projet redonnerait son email a chaque fois.
  let visitorId = null;
  try {
    const body = await request.json();
    visitorId = typeof body?.visitorId === "string" ? body.visitorId : null;
  } catch {
    // Corps absent ou illisible : on cree un thread anonyme, comportement
    // historique.
  }

  const thread = createThread();

  const known = visitorId ? getKnownVisitor(visitorId) : null;
  if (known) {
    unlockThreadFor(thread.id, known.firstName, known.email);
  }

  return NextResponse.json({ threadId: thread.id, knownVisitor: !!known });
}
