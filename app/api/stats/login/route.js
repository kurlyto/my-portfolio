import { cookies } from "next/headers";
import { createSessionCookie, isPasswordCorrect } from "@/app/lib/stats/auth";

// Fenetre anti-force-brute en memoire du process. Suffisant ici : un seul
// lecteur legitime, et un attaquant serieux serait de toute facon arrete par
// la longueur du mot de passe. Repart a zero au redemarrage, c'est assume.
const attempts = new Map();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function tooManyAttempts(ip) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.since > WINDOW_MS) {
    attempts.set(ip, { count: 1, since: now });
    return false;
  }

  record.count += 1;
  return record.count > MAX_ATTEMPTS;
}

export async function POST(request) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    "inconnu";

  if (tooManyAttempts(ip)) {
    return Response.json(
      { error: "Trop de tentatives. Reessaye dans 15 minutes." },
      { status: 429 },
    );
  }

  let password = "";
  try {
    ({ password = "" } = await request.json());
  } catch {
    return Response.json({ error: "Requete invalide" }, { status: 400 });
  }

  if (!isPasswordCorrect(password)) {
    return Response.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const cookie = createSessionCookie();
  (await cookies()).set(cookie.name, cookie.value, cookie.options);

  return Response.json({ ok: true });
}
