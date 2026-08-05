import { cookies } from "next/headers";
import { getActiveVisitors } from "@/app/lib/stats/umami";
import { isValidSession, STATS_COOKIE_NAME } from "@/app/lib/stats/auth";

// Cache tres court : le compteur doit rester vivant, mais plusieurs onglets
// ouverts ne doivent pas multiplier les requetes vers Umami.
let cached = null;
const CACHE_TTL_MS = 10 * 1000;

export async function GET() {
  const session = (await cookies()).get(STATS_COOKIE_NAME)?.value;
  if (!isValidSession(session)) {
    return Response.json({ error: "Non authentifie" }, { status: 401 });
  }

  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Response.json(cached.data);
  }

  try {
    const data = await getActiveVisitors();
    cached = { at: Date.now(), data };
    return Response.json(data);
  } catch {
    // Le compteur est un bonus : s'il echoue, la page principale doit
    // continuer a fonctionner sans afficher d'erreur.
    return Response.json({ total: 0, byProject: [], unavailable: true });
  }
}
