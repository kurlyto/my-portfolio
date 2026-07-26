import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getThread, touchThread, addMessage, getRecentHistory } from "@/app/lib/chat/db";
import { runElonChatStreaming, ElonChatError } from "@/app/lib/chat/elon-chat-runner";

export const maxDuration = 200;

// Verrou anti-concurrence par thread : un visiteur ne peut avoir qu'une
// requete en vol a la fois sur son propre thread (memoire process, comme
// l'openspace admin devis_dentaire).
const busyThreads = new Set();

function sseEvent(event, data) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request, { params }) {
  const { threadId } = await params;
  const { message } = await request.json();

  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message vide." }, { status: 400 });
  }

  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }

  if (busyThreads.has(threadId)) {
    return NextResponse.json({ error: "Une reponse est deja en cours." }, { status: 429 });
  }
  busyThreads.add(threadId);

  const isFirstTurn = !thread.sessionId;
  const sessionId = thread.sessionId ?? crypto.randomUUID();
  const historyReplay = isFirstTurn ? null : getRecentHistory(threadId);

  addMessage(threadId, "USER", message);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const send = (event, data) => controller.enqueue(encoder.encode(sseEvent(event, data)));

      try {
        const result = await runElonChatStreaming({
          sessionId,
          message,
          isFirstTurn,
          historyReplay,
          preferredAccount: thread.account,
          fallbackHistoryReplay: getRecentHistory(threadId),
          onTextDelta: (text) => send("delta", { text }),
        });

        addMessage(threadId, "ASSISTANT", result.reply);
        touchThread(threadId, result.newSessionId ?? sessionId, result.usedAccount);

        send("done", { text: result.reply });
      } catch (err) {
        const message =
          err instanceof ElonChatError
            ? err.quotaExceeded
              ? "Elon est tres sollicite en ce moment, reessaie dans quelques minutes."
              : "Une erreur est survenue, reessaie."
            : "Une erreur inattendue est survenue.";
        send("error", { message });
      } finally {
        busyThreads.delete(threadId);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function GET(request, { params }) {
  const { threadId } = await params;
  const thread = getThread(threadId);
  if (!thread) {
    return NextResponse.json({ error: "Session de discussion introuvable." }, { status: 404 });
  }
  const { getMessages } = await import("@/app/lib/chat/db");
  return NextResponse.json({ messages: getMessages(threadId) });
}
