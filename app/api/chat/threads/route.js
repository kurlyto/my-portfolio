import { NextResponse } from "next/server";
import { createThread } from "@/app/lib/chat/db";
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

  const thread = createThread();
  return NextResponse.json({ threadId: thread.id });
}
