import { NextResponse } from "next/server";
import { getThread, isThreadUnlocked } from "@/app/lib/chat/db";

// Utilisé par ChatPanel.js pour savoir, en pollant légèrement après l'envoi
// du lien de vérification, si le visiteur a cliqué (donc revenir tout seul
// sur le funnel sans qu'il ait besoin de retaper un message pour "réveiller"
// la conversation).
export async function GET(request, { params }) {
  const { threadId } = await params;
  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }
  return NextResponse.json({ unlocked: isThreadUnlocked(threadId) });
}
