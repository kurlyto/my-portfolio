// Meme agent Elon que le bot Telegram (my-agents/Elon), second canal d'entree.
// Difference cle avec Elon/telegram-bot/src/chat-runner.js : ici on streame la
// reponse token par token (--output-format stream-json --include-partial-messages)
// au lieu d'attendre le JSON complet, via un callback onTextDelta appele a
// chaque fragment de texte recu.
import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";
import crypto from "node:crypto";

const CLAUDE_BIN = "/root/.local/bin/claude";
const AGENT_DIR = "/data/nathan/my-agents/Elon";
const RUN_TIMEOUT_MS = 180_000;
const HARD_PATH =
  "/root/.local/bin:/usr/local/bin:/usr/bin:/bin";

const ACCOUNT_HOMES = {
  nathan: "/claude-accounts/nathan",
  admin: "/claude-accounts/admin-mdd",
};

const MODEL = "sonnet";
const ALLOWED_TOOLS = "Write";

export class ElonChatError extends Error {
  constructor(message, kind, stderr, quotaExceeded = false) {
    super(message);
    this.name = "ElonChatError";
    this.kind = kind;
    this.stderr = stderr;
    this.quotaExceeded = quotaExceeded;
  }
}

function safeRead(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

// IMPORTANT : identite reinjectee A CHAQUE tour (premier tour ET --resume),
// meme regle que le chat-runner Telegram - cf. appris.md de Camille (24/07/2026).
function buildTurnContext(historyReplay) {
  const mission = safeRead(path.join(AGENT_DIR, "mission.md"));
  const appris = safeRead(path.join(AGENT_DIR, "appris.md"));
  const memory = safeRead(path.join(AGENT_DIR, "memory.md"));

  const parts = [
    "Tu es Elon, l'agent createur d'agents.",
    "Ce canal est le chat web integre au site vitrine nathan-knaebel.com (PAS Telegram) : le visiteur te parle directement depuis une fenetre de discussion sur la page, pas via l'app Telegram.",
    "Quand tu produis le document final, ecris-le avec l'outil Write dans le dossier data/plans/ (nom de fichier : plan-<slug-court>.md), puis colle aussi le contenu complet dans ta reponse.",
    "",
    "--- TA MISSION ---",
    mission,
    "",
    "--- CE QUE TU AS APPRIS (a appliquer) ---",
    appris,
    "",
    "--- TA MEMOIRE (tours precedents) ---",
    memory,
  ];

  if (historyReplay) {
    parts.push(
      "",
      "--- REPRISE DE DISCUSSION (ta session a ete interrompue, voici les derniers echanges) ---",
      historyReplay,
      "Reprends la discussion naturellement la ou elle en etait, sans re-saluer ni t excuser de la coupure.",
    );
  }

  return parts.join("\n");
}

function runOnceStreaming({ sessionId, message, isFirstTurn, historyReplay, home, onTextDelta }) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(CLAUDE_BIN)) {
      reject(
        new ElonChatError(
          "Le chat n'est disponible que sur le serveur de production (binaire claude introuvable).",
          "unavailable",
        ),
      );
      return;
    }

    const argv = [
      "-p",
      "--output-format",
      "stream-json",
      "--include-partial-messages",
      "--verbose",
      "--model",
      MODEL,
    ];

    if (isFirstTurn) {
      argv.push("--session-id", sessionId);
    } else {
      argv.push("--resume", sessionId);
    }
    argv.push("--append-system-prompt", buildTurnContext(historyReplay));
    argv.push("--allowedTools", ALLOWED_TOOLS);

    const child = spawn(CLAUDE_BIN, argv, {
      cwd: AGENT_DIR,
      env: { PATH: HARD_PATH, HOME: home },
      stdio: ["pipe", "pipe", "pipe"],
    });
    child.stdin?.on("error", () => {});
    child.stdin?.write(message, "utf8");
    child.stdin?.end();

    let stderr = "";
    let fullText = "";
    let finalResult = null;
    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      child.kill("SIGKILL");
      reject(
        new ElonChatError(
          `Elon n'a pas repondu dans le temps imparti (${RUN_TIMEOUT_MS / 1000}s).`,
          "timeout",
          stderr.slice(0, 2000),
        ),
      );
    }, RUN_TIMEOUT_MS);

    const rl = readline.createInterface({ input: child.stdout });
    rl.on("line", (line) => {
      if (!line.trim()) return;
      let evt;
      try {
        evt = JSON.parse(line);
      } catch {
        return;
      }

      if (evt.type === "stream_event" && evt.event?.type === "content_block_delta") {
        const delta = evt.event.delta;
        if (delta?.type === "text_delta" && typeof delta.text === "string") {
          fullText += delta.text;
          onTextDelta(delta.text);
        }
      } else if (evt.type === "result") {
        finalResult = evt;
      }
    });

    child.stderr?.on("data", (c) => {
      stderr += c.toString("utf8");
    });

    child.on("error", (err) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      reject(
        new ElonChatError(`Lancement de claude echoue : ${err.message}`, "spawn", stderr.slice(0, 2000)),
      );
    });

    child.on("close", (code) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      rl.close();

      if (finalResult?.is_error) {
        const quotaExceeded = finalResult.api_error_status === 429;
        reject(
          new ElonChatError(
            finalResult.result || "Elon a renvoye une erreur.",
            "exit",
            stderr.slice(0, 2000),
            quotaExceeded,
          ),
        );
        return;
      }

      if (code !== 0 && !finalResult) {
        reject(
          new ElonChatError(`claude a termine avec le code ${code}.`, "exit", stderr.slice(0, 2000)),
        );
        return;
      }

      resolve({
        reply: finalResult?.result ?? fullText,
        costUsd: typeof finalResult?.total_cost_usd === "number" ? finalResult.total_cost_usd : null,
      });
    });
  });
}

/**
 * Invoque Elon en streaming : onTextDelta est appele a chaque fragment de
 * texte recu (le vrai texte de reponse, pas le raisonnement interne). Resout
 * avec le texte complet une fois termine. Bascule automatique de compte
 * Claude sur 429, meme mecanisme que le canal Telegram.
 */
export async function runElonChatStreaming({
  sessionId,
  message,
  isFirstTurn,
  historyReplay,
  preferredAccount = "nathan",
  fallbackHistoryReplay,
  onTextDelta,
}) {
  const primaryHome = ACCOUNT_HOMES[preferredAccount] ?? ACCOUNT_HOMES.nathan;
  try {
    const result = await runOnceStreaming({
      sessionId,
      message,
      isFirstTurn,
      historyReplay,
      home: primaryHome,
      onTextDelta,
    });
    return { ...result, usedAccount: preferredAccount, newSessionId: null };
  } catch (err) {
    if (!(err instanceof ElonChatError) || !err.quotaExceeded) throw err;

    const fallbackAccount = preferredAccount === "nathan" ? "admin" : "nathan";
    const fallbackHome = ACCOUNT_HOMES[fallbackAccount];
    const freshSessionId = crypto.randomUUID();
    const result = await runOnceStreaming({
      sessionId: freshSessionId,
      message,
      isFirstTurn: true,
      historyReplay: isFirstTurn ? historyReplay : fallbackHistoryReplay,
      home: fallbackHome,
      onTextDelta,
    });
    return { ...result, usedAccount: fallbackAccount, newSessionId: freshSessionId };
  }
}
