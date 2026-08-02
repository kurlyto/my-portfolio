import { cookies } from "next/headers";
import { isValidSession, STATS_COOKIE_NAME } from "@/app/lib/stats/auth";
import { StatsDashboard } from "./StatsDashboard";
import { LoginForm } from "./LoginForm";
import "./stats.css";

// Page privee : ni indexee, ni prerendue. Le cookie est lu a chaque requete,
// donc rien ne doit etre mis en cache statiquement.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Audience",
  robots: { index: false, follow: false },
};

export default async function StatsPage() {
  const session = (await cookies()).get(STATS_COOKIE_NAME)?.value;

  // Le garde est ici ET dans /api/stats : la page ne fait que cacher l'UI,
  // c'est la route API qui protege reellement les donnees.
  if (!isValidSession(session)) return <LoginForm />;

  return <StatsDashboard />;
}
