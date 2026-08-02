import { cookies } from "next/headers";
import { getStats } from "@/app/lib/stats/umami";
import { isValidSession, STATS_COOKIE_NAME } from "@/app/lib/stats/auth";

// Umami est interroge au plus une fois par periode toutes les 5 minutes :
// changer de periode dans l'UI ne doit pas relancer 7 requetes a chaque clic.
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

const ALLOWED_DAYS = [7, 30, 90];

export async function GET(request) {
  const session = (await cookies()).get(STATS_COOKIE_NAME)?.value;
  if (!isValidSession(session)) {
    return Response.json({ error: "Non authentifie" }, { status: 401 });
  }

  const requested = Number(new URL(request.url).searchParams.get("days"));
  const days = ALLOWED_DAYS.includes(requested) ? requested : 30;

  const cached = cache.get(days);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return Response.json(cached.data);
  }

  try {
    const data = await getStats({ days });
    cache.set(days, { at: Date.now(), data });
    return Response.json(data);
  } catch (error) {
    // Si Umami est injoignable mais qu'on a une version en cache, mieux vaut
    // afficher des chiffres un peu datés qu'une page en erreur.
    if (cached) return Response.json({ ...cached.data, stale: true });

    return Response.json(
      { error: error?.message ?? "Umami injoignable" },
      { status: 502 },
    );
  }
}
