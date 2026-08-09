import { cookies } from "next/headers";
import { getClaudeAccountsUsage } from "@/app/lib/stats/claude-usage";
import { isValidSession, STATS_COOKIE_NAME } from "@/app/lib/stats/auth";

// `/usage` prend 1-2s par compte (spawn du CLI) : un cache court evite de
// relancer les 3 appels a chaque focus d'onglet ou refresh rapide, tout en
// restant proche du temps reel demande (pas de cron, appel a la demande).
const CACHE_TTL_MS = 2 * 60 * 1000;
let cache = null;

export async function GET() {
  const session = (await cookies()).get(STATS_COOKIE_NAME)?.value;
  if (!isValidSession(session)) {
    return Response.json({ error: "Non authentifie" }, { status: 401 });
  }

  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return Response.json(cache.data);
  }

  const accounts = await getClaudeAccountsUsage();
  const data = { accounts, fetchedAt: Date.now() };
  cache = { at: Date.now(), data };
  return Response.json(data);
}
