// Lit la consommation reelle des 3 comptes Claude utilises par les agents
// (admin-mdd, nathan, ben-mdd), via la commande interne `/usage` du CLI
// Claude Code, appelee en mode non-interactif (`claude -p "/usage"`).
//
// Il n'existe pas d'API HTTP pour ce chiffre (comptes abonnement, pas cle
// API) : `/usage` est la seule source, et son format est un texte pense pour
// un humain, pas un JSON stable. Le parsing ci-dessous est donc volontairement
// tolerant (regex larges, valeurs manquantes = null) plutot que de faire
// echouer toute la carte si Anthropic reformule une phrase.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const CLAUDE_BIN = "/root/.local/bin/claude";
const HARD_PATH = "/root/.local/bin:/usr/local/bin:/usr/bin:/bin";
const RUN_TIMEOUT_MS = 30_000;

// Meme trio et memes chemins HOME que ask-agent.sh (my-agents/shared) et
// nate-chat-runner.js : ces 3 comptes sont deja montes dans le conteneur
// my-portfolio (docker-compose.yml), sauf ben-mdd a ajouter.
const ACCOUNTS = [
  { key: "admin-mdd", label: "Admin", home: "/claude-accounts/admin-mdd" },
  { key: "nathan", label: "Nathan", home: "/claude-accounts/nathan" },
  { key: "ben-mdd", label: "Ben", home: "/claude-accounts/ben-mdd" },
];

// "Current session: 18% used" / "Current session: 0% used · resets ..."
const SESSION_RE = /Current session:\s*(\d{1,3})%\s*used/i;
// "Current week (all models): 39% used · resets Aug 9, 8am (UTC)"
const WEEK_RE = /Current week \(all models\):\s*(\d{1,3})%\s*used/i;
const WEEK_RESET_RE = /Current week \(all models\):.*?resets\s+([^\n]+)/i;

function parseUsageText(text) {
  if (!text) return null;
  const session = text.match(SESSION_RE);
  const week = text.match(WEEK_RE);
  const weekReset = text.match(WEEK_RESET_RE);
  if (!session && !week) return null;
  return {
    sessionPct: session ? Number(session[1]) : null,
    weekPct: week ? Number(week[1]) : null,
    weekResetLabel: weekReset ? weekReset[1].trim() : null,
  };
}

function runUsage({ home }) {
  return new Promise((resolve) => {
    if (!existsSync(CLAUDE_BIN)) {
      resolve({ error: "claude_binary_missing" });
      return;
    }

    const child = spawn(CLAUDE_BIN, ["-p", "/usage", "--output-format", "json"], {
      env: { PATH: HARD_PATH, HOME: home },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let done = false;

    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      child.kill("SIGKILL");
      resolve({ error: "timeout" });
    }, RUN_TIMEOUT_MS);

    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));

    child.on("close", () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try {
        const json = JSON.parse(stdout);
        const parsed = parseUsageText(json.result);
        if (!parsed) {
          resolve({ error: "unparsable", raw: json.result ?? null });
          return;
        }
        resolve({ ...parsed });
      } catch {
        resolve({ error: "spawn_failed", stderr: stderr || null });
      }
    });

    child.on("error", () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve({ error: "spawn_failed" });
    });
  });
}

/**
 * Interroge les 3 comptes en parallele. Chaque entree renvoie soit
 * { sessionPct, weekPct, weekResetLabel }, soit { error }. Un compte en
 * erreur ne doit jamais faire echouer les 2 autres : l'appelant decide de
 * l'affichage (ex: compte grise "indisponible").
 */
export async function getClaudeAccountsUsage() {
  const results = await Promise.all(
    ACCOUNTS.map(async (acc) => ({
      key: acc.key,
      label: acc.label,
      ...(await runUsage(acc)),
    })),
  );
  return results;
}
