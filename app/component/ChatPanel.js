"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TelegramToolIcon } from "./tool-icons";

const ACCENT = "#ff6b35";

// Lien vers le meme agent sur Telegram, propose en haut du chat pour les
// visiteurs qui preferent continuer depuis leur messagerie.
const TELEGRAM_URL = "https://t.me/AssistantNate_bot";

// Premier message, envoyé avant toute vérification (voir mission.md étape -2
// et nate/telegram-bot/src/index.js askInitialChoice pour le même flow côté
// Telegram). Les 3 boutons matchent exactement les libellés attendus par
// app/api/chat/threads/[threadId]/messages/route.js.
const GREETING =
  "Bienvenue ! As-tu déjà une idée précise en tête, tu veux qu'on t'aide à en trouver une, ou tu préfères d'abord voir les agents qu'on a déjà créés ?\n\n" +
  "---BOUTONS---\nJ'ai une idée en tête\nJe n'ai pas encore d'idée\nVoir les agents existants";

const UNLOCKED_RESUME_TEXT = "C'est confirmé, merci ! On reprend juste où on en était.";

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
    .slice(0, 12);
  return { text, buttons: buttons.length ? buttons : null };
}

function Avatar({ size = "w-7 h-7", pulse = false }) {
  // Repli sur l'initiale si le portrait ne charge pas : l'avatar reste lisible
  // plutot que d'afficher une image cassee.
  const [failed, setFailed] = useState(false);

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
        className={`relative rounded-full overflow-hidden flex items-center justify-center text-[11px] font-mono font-bold text-white ${size}`}
        style={{ background: ACCENT }}
      >
        {failed ? (
          "N"
        ) : (
          <img
            src="/images/agents/nate-sm.webp"
            alt="Nate"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

// Carte d'un agent du catalogue : portrait + nom + role, sur une ligne.
// Repli sur l'initiale si le portrait ne charge pas, meme principe qu'Avatar.
function AgentCard({ slug, name, role }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <div
        className="relative w-9 h-9 shrink-0 rounded-full overflow-hidden flex items-center justify-center text-[12px] font-mono font-bold text-white"
        style={{ background: ACCENT }}
      >
        {failed ? (
          name.charAt(0)
        ) : (
          <img
            // Vignette 96px generee avec sharp (voir -sm.webp) : les portraits
            // d'origine font ~1 Mo chacun, soit 4 Mo pour afficher 4 pastilles
            // de 44px. La version optimisee pese ~1,3 Ko.
            src={`/images/agents/${slug}-sm.webp`}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold leading-tight">{name}</div>
        <div className="text-[12px] text-black/55 leading-snug">{role}</div>
      </div>
    </div>
  );
}

// Le bloc ---AGENTS--- porte une ligne par agent : "slug|Nom|Role".
// Meme principe que ---BOUTONS--- : un marqueur en fin de message, retire du
// texte affiche et rendu comme un composant a part.
function splitAgents(reply) {
  const marker = "---AGENTS---";
  const idx = reply.indexOf(marker);
  if (idx === -1) return { text: reply, agents: null };

  const text = reply.slice(0, idx).trimEnd();
  const rest = reply.slice(idx + marker.length);

  // Le bloc s'arrete au marqueur suivant s'il y en a un (ex: ---BOUTONS---),
  // pour que les deux puissent coexister dans le meme message.
  const nextMarker = rest.indexOf("---");
  const block = nextMarker === -1 ? rest : rest.slice(0, nextMarker);
  const tail = nextMarker === -1 ? "" : rest.slice(nextMarker);

  const agents = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [slug, name, ...roleParts] = l.split("|").map((p) => p.trim());
      return slug && name ? { slug, name, role: roleParts.join(" | ") } : null;
    })
    .filter(Boolean)
    .slice(0, 8);

  return { text: text + (tail ? `\n${tail}` : ""), agents: agents.length ? agents : null };
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

// Bouton de fin de parcours : reglement Stripe ou appel telephonique. Rendu
// comme un lien (pas un bouton de reponse rapide) parce qu il quitte le chat.
// tel: ouvre directement le composeur sur mobile.
function ActionLink({ action }) {
  const isPayment = action.kind === "payment";
  return (
    <a
      href={action.href}
      target={isPayment ? "_blank" : undefined}
      rel={isPayment ? "noopener noreferrer" : undefined}
      data-cursor-hover
      className="inline-flex items-center gap-2 text-[13px] font-mono font-semibold rounded px-4 py-2.5 text-white transition-all duration-150 ease-out hover:-translate-y-0.5"
      style={{ background: isPayment ? "#16a34a" : "#111111" }}
    >
      {action.label}
    </a>
  );
}

function MessageBubble({ role, text, streaming, onQuickReply, disableButtons, action }) {
  const isUser = role === "USER";
  // Ordre important : on extrait d'abord les agents (qui peuvent preceder un
  // bloc ---BOUTONS---), puis les boutons dans ce qu'il reste.
  const { text: withoutAgents, agents } = isUser
    ? { text, agents: null }
    : splitAgents(text);
  const { text: body, buttons } = isUser
    ? { text, buttons: null }
    : splitButtons(withoutAgents);

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
          {agents && !streaming && (
            // whitespace-normal : la bulle est en whitespace-pre-line (pour
            // respecter les sauts de ligne du texte), ce qui ferait aussi
            // s'afficher ceux du JSX entre les cartes et les aererait a l'exces.
            <div className="mt-3 whitespace-normal divide-y divide-black/[0.06]">
              {agents.map((a) => (
                <AgentCard key={a.slug} slug={a.slug} name={a.name} role={a.role} />
              ))}
            </div>
          )}
        </div>
        {action && !streaming && <ActionLink action={action} />}
        {buttons && !streaming && (
          <div className="flex flex-wrap gap-2">
            {buttons.map((label) => (
              <button
                key={label}
                type="button"
                disabled={disableButtons}
                onClick={() => onQuickReply(label)}
                className="text-[12px] font-mono px-3 py-1.5 rounded border border-black/15 hover:border-black/30 hover:-translate-y-0.5 transition-all duration-150 ease-out disabled:opacity-30 disabled:pointer-events-none"
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

// Le threadId est persiste cote navigateur : sans ca, fermer le panneau,
// rafraichir la page ou basculer desktop/mobile demonte le composant, cree un
// thread neuf et oblige le visiteur a refaire la verification email en perdant
// tout son cadrage (un audit dure ~15 min). Cote serveur rien n'etait perdu -
// threads, messages et unlocked_threads vivent en base - il manquait juste de
// quoi retrouver le fil.
const THREAD_STORAGE_KEY = "nate-chat-thread-id";

function loadStoredThreadId() {
  try {
    return window.localStorage.getItem(THREAD_STORAGE_KEY);
  } catch {
    // localStorage indisponible (navigation privee stricte, cookies bloques) :
    // on repart simplement sur un thread neuf, sans casser le chat.
    return null;
  }
}

function storeThreadId(id) {
  try {
    window.localStorage.setItem(THREAD_STORAGE_KEY, id);
  } catch {
    // Persistance impossible : le chat fonctionne, il ne survivra juste pas
    // a un rechargement.
  }
}

function clearStoredThreadId() {
  try {
    window.localStorage.removeItem(THREAD_STORAGE_KEY);
  } catch {
    // Rien a faire de plus.
  }
}

function useNateChat() {
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamingText, setStreamingText] = useState(null);
  const [error, setError] = useState(null);
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [restoring, setRestoring] = useState(true);
  // 5 des l'ouverture, avant tout message : la barre doit donner le signal
  // "ca a deja commence" plutot que partir de zero.
  const [progress, setProgress] = useState(5);
  const initRef = useRef(false);
  const pollRef = useRef(null);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    async function start() {
      const stored = loadStoredThreadId();

      // Thread connu : on recharge son historique. Un 404 signifie que le
      // thread n'existe plus cote serveur (base nettoyee, id bricole) - on
      // repart alors proprement sur un thread neuf plutot que de bloquer.
      if (stored) {
        try {
          const res = await fetch(`/api/chat/threads/${stored}/messages`);
          if (res.ok) {
            const data = await res.json();
            const restored = data.messages ?? [];
            setThreadId(stored);
            setMessages(restored);
            setRestoring(false);
            // Message de reprise redige par Nate : sans lui, le visiteur qui
            // revient retombe au milieu de sa conversation sans savoir ou il en
            // est. C'est un vrai resume de son projet (le modele a vu tout le
            // cadrage), pas une reprise de ses mots bruts. Non bloquant : le fil
            // est deja affiche, le message arrive quelques secondes apres.
            if (restored.length > 0) {
              fetch(`/api/chat/threads/${stored}/resume`, { method: "POST" })
                .then((r) => (r.ok ? r.json() : null))
                .then((d) => {
                  if (d?.text) setMessages((m) => [...m, { role: "ASSISTANT", content: d.text }]);
                })
                .catch(() => {
                  // Echec du resume : le visiteur voit son fil restaure sans
                  // message d'accueil, ce qui reste utilisable. On n'affiche
                  // pas d'erreur pour si peu.
                });
            }
            return;
          }
          clearStoredThreadId();
        } catch {
          // Reseau indisponible : on tente quand meme un thread neuf ci-dessous.
          clearStoredThreadId();
        }
      }

      try {
        const res = await fetch("/api/chat/threads", { method: "POST" });
        const data = await res.json();
        if (!res.ok || !data.threadId) throw new Error(data.error ?? "no_thread");
        setThreadId(data.threadId);
        storeThreadId(data.threadId);
      } catch {
        setError("Impossible d'ouvrir la discussion.");
      } finally {
        setRestoring(false);
      }
    }

    start();
  }, []);

  // Après l'envoi d'un lien de vérification, on poll périodiquement le
  // statut du thread : dès que le visiteur a cliqué le lien reçu par email
  // (dans un autre onglet), on reprend automatiquement la conversation sans
  // qu'il ait besoin de retaper un message pour "réveiller" le fil.
  useEffect(() => {
    if (!awaitingVerification || !threadId) return;

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/chat/threads/${threadId}/status`);
        const data = await res.json();
        if (data.unlocked) {
          clearInterval(pollRef.current);
          setAwaitingVerification(false);
          setMessages((m) => [...m, { role: "ASSISTANT", content: UNLOCKED_RESUME_TEXT }]);
        }
      } catch {
        // Erreur réseau ponctuelle : on retente au prochain tick, pas la peine
        // d'afficher une erreur pour un simple poll silencieux.
      }
    }, 3000);

    return () => clearInterval(pollRef.current);
  }, [awaitingVerification, threadId]);

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
      let finalAction = null;

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
            finalAction = data.action ?? null;
            if (typeof data.progress === "number") {
              // Ne recule jamais visuellement : un palier plus bas ici viendrait
              // d'une branche de secours (quota, attente verification) plutot
              // que d'un vrai retour en arriere du visiteur dans le funnel.
              setProgress((p) => Math.max(p, data.progress));
            }
          } else if (event === "error") {
            setError(data.message);
          }
        }
      }

      if (finalText !== null) {
        setMessages((m) => [...m, { role: "ASSISTANT", content: finalText, action: finalAction }]);
        // Détecte qu'on vient d'envoyer un lien de vérification pour démarrer
        // le polling, sans dépendre d'un champ structuré côté API (le texte
        // de confirmation est stable, défini dans messages/route.js).
        if (finalText.includes("Je t'ai envoyé un lien à")) {
          setAwaitingVerification(true);
        }
      }
    } catch {
      setError("La connexion a été interrompue, réessaie.");
    } finally {
      setStreamingText(null);
    }
  }

  return { threadId, messages, streamingText, error, sendMessage, awaitingVerification, restoring, progress };
}

function ChatBody({ threadId, messages, streamingText, error, sendMessage, awaitingVerification, restoring }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // scrollTop plutot que scrollIntoView : on defile le conteneur des messages
  // sans jamais toucher au scroll de la page, sinon chaque reponse tire le
  // visiteur vers le bas de la landing.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streamingText]);

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Message d'accueil reserve aux nouvelles discussions : sur un fil
            restaure, le visiteur verrait "Bienvenue ! As-tu deja une idee ?"
            au-dessus d'une conversation deja bien avancee. */}
        {!restoring && messages.length === 0 && (
          <MessageBubble role="ASSISTANT" text={GREETING} streaming={false} onQuickReply={sendMessage} disableButtons={false} />
        )}

        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            role={m.role}
            text={m.content}
            streaming={false}
            onQuickReply={sendMessage}
            disableButtons={i < messages.length - 1}
            action={m.action}
          />
        ))}

        {streamingText !== null && (
          <MessageBubble role="ASSISTANT" text={streamingText} streaming onQuickReply={sendMessage} />
        )}

        {awaitingVerification && (
          <p className="text-[12px] font-mono text-center text-black/40">
            En attente de la vérification par email…
          </p>
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

function ChatHeader({ onClose, closeLabel, progress = 5 }) {
  return (
    <div className="flex flex-col border-b border-black/10 shrink-0">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar pulse />
          <div>
            <p className="text-[14px] font-semibold leading-tight">Nate</p>
            <p className="text-[11px] font-mono uppercase tracking-wider text-black/40 leading-tight">
              Votre conseiller gratuit
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-[12px] font-mono text-black/50 hover:text-black transition-colors duration-150"
          >
            <TelegramToolIcon className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Parler avec Nate dans Telegram</span>
            <span className="sm:hidden">Ouvrir dans Telegram</span>
          </a>
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
      </div>
      <div className="h-[3px] w-full bg-black/[0.06] overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: ACCENT }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function ChatPanel({ onClose, fullScreen = false }) {
  const chat = useNateChat();

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
        <ChatHeader onClose={onClose} closeLabel="← retour" progress={chat.progress} />
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
      // min-h en vh plutot qu'un plancher fixe de 560px : sur un portable en
      // 1366x768, 560px + le padding du hero faisaient deborder le chat sous la
      // ligne de flottaison. Le plancher suit desormais la hauteur reelle de
      // l'ecran, avec un minimum absolu pour rester utilisable.
      className="flex flex-col h-full min-h-[min(560px,60vh)] max-h-[calc(100vh-6.5rem)] rounded bg-white overflow-hidden"
      style={{
        border: `2px solid ${ACCENT}`,
        boxShadow: `0 0 0 4px ${ACCENT}1a, 0 20px 40px -12px ${ACCENT}33`,
      }}
    >
      <ChatHeader onClose={onClose} closeLabel="×" progress={chat.progress} />
      <ChatBody {...chat} />
    </motion.div>
  );
}
