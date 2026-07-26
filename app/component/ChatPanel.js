"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#ff6b35";
const GREETING =
  "Salut, je suis Elon. Décris-moi la tâche que tu veux automatiser, et je t'aide à cadrer le besoin.";

function splitButtons(reply) {
  const marker = "---BOUTONS---";
  const idx = reply.indexOf(marker);
  if (idx === -1) return { text: reply.trim(), buttons: null };
  const text = reply.slice(0, idx).trim();
  const buttons = reply
    .slice(idx + marker.length)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 6);
  return { text, buttons: buttons.length ? buttons : null };
}

function Avatar({ size = "w-7 h-7", pulse = false }) {
  return (
    <div className="relative shrink-0">
      {pulse && (
        <motion.span
          className={`absolute inset-0 rounded-full ${size}`}
          style={{ background: ACCENT }}
          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.6, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div
        className={`relative rounded-full flex items-center justify-center text-[11px] font-mono font-bold text-white ${size}`}
        style={{ background: ACCENT }}
      >
        E
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-black/30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ role, text, streaming, onQuickReply }) {
  const isUser = role === "USER";
  const { text: body, buttons } = isUser ? { text, buttons: null } : splitButtons(text);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && <Avatar />}
      <div className={`flex flex-col gap-2 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 text-[14px] leading-relaxed whitespace-pre-line rounded ${
            isUser ? "text-white" : "bg-black/[0.04] text-black"
          }`}
          style={isUser ? { background: "#111111" } : undefined}
        >
          {body}
          {streaming && !body && <TypingDots />}
        </div>
        {buttons && !streaming && (
          <div className="flex flex-wrap gap-2">
            {buttons.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onQuickReply(label)}
                className="text-[12px] font-mono px-3 py-1.5 rounded border border-black/15 hover:border-black/30 hover:-translate-y-0.5 transition-all duration-150 ease-out"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function useElonChat() {
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState(null);
  const [error, setError] = useState(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;
    fetch("/api/chat/threads", { method: "POST" })
      .then((r) => r.json())
      .then((data) => setThreadId(data.threadId))
      .catch(() => setError("Impossible d'ouvrir la discussion."));
  }, []);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || !threadId || streamingText !== null) return;

    setMessages((m) => [...m, { role: "USER", content: trimmed }]);
    setError(null);
    setStreamingText("");

    try {
      const res = await fetch(`/api/chat/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok || !res.body) throw new Error("request_failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalText = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const chunks = buffer.split("\n\n");
        buffer = chunks.pop();

        for (const chunk of chunks) {
          const eventLine = chunk.split("\n").find((l) => l.startsWith("event: "));
          const dataLine = chunk.split("\n").find((l) => l.startsWith("data: "));
          if (!eventLine || !dataLine) continue;

          const event = eventLine.slice("event: ".length).trim();
          const data = JSON.parse(dataLine.slice("data: ".length));

          if (event === "delta") {
            setStreamingText((t) => (t ?? "") + data.text);
          } else if (event === "done") {
            finalText = data.text;
          } else if (event === "error") {
            setError(data.message);
          }
        }
      }

      if (finalText !== null) {
        setMessages((m) => [...m, { role: "ASSISTANT", content: finalText }]);
      }
    } catch {
      setError("La connexion a été interrompue, réessaie.");
    } finally {
      setStreamingText(null);
    }
  }

  return { threadId, messages, streamingText, error, sendMessage };
}

function ChatBody({ threadId, messages, streamingText, error, sendMessage }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        <MessageBubble role="ASSISTANT" text={GREETING} streaming={false} onQuickReply={sendMessage} />

        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            role={m.role}
            text={m.content}
            streaming={false}
            onQuickReply={sendMessage}
          />
        ))}

        {streamingText !== null && (
          <MessageBubble role="ASSISTANT" text={streamingText} streaming onQuickReply={sendMessage} />
        )}

        {error && (
          <p className="text-[12px] font-mono text-center" style={{ color: ACCENT }}>
            {error}
          </p>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
          setInput("");
        }}
        className="flex items-center gap-2 px-4 py-3 border-t border-black/10 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écris ton message…"
          disabled={!threadId || streamingText !== null}
          className="flex-1 text-[15px] bg-transparent outline-none placeholder:text-black/30 disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={!threadId || streamingText !== null || !input.trim()}
          data-cursor-hover
          className="text-white text-[12px] font-mono font-semibold rounded px-4 py-2 transition-all duration-150 ease-out disabled:opacity-30 hover:-translate-y-0.5"
          style={{ background: ACCENT }}
        >
          Envoyer
        </button>
      </form>
    </>
  );
}

function ChatHeader({ onClose, closeLabel }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 shrink-0">
      <div className="flex items-center gap-2">
        <Avatar pulse />
        <div>
          <p className="text-[14px] font-semibold leading-tight">Elon</p>
          <p className="text-[11px] font-mono uppercase tracking-wider text-black/40 leading-tight">
            Agent créateur d&apos;agents
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        data-cursor-hover
        className="flex items-center gap-1 text-black/50 hover:text-black transition-colors duration-150 text-[13px] font-mono"
        aria-label="Fermer le chat"
      >
        {closeLabel}
      </button>
    </div>
  );
}

export default function ChatPanel({ onClose, fullScreen = false }) {
  const chat = useElonChat();

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-white flex flex-col"
        style={{ boxShadow: `inset 0 0 0 2px ${ACCENT}` }}
      >
        <ChatHeader onClose={onClose} closeLabel="← retour" />
        <ChatBody {...chat} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col h-full min-h-[560px] rounded bg-white overflow-hidden"
      style={{
        border: `2px solid ${ACCENT}`,
        boxShadow: `0 0 0 4px ${ACCENT}1a, 0 20px 40px -12px ${ACCENT}33`,
      }}
    >
      <ChatHeader onClose={onClose} closeLabel="×" />
      <ChatBody {...chat} />
    </motion.div>
  );
}
