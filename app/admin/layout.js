import { cookies } from "next/headers";
import { isValidSession, STATS_COOKIE_NAME } from "@/app/lib/stats/auth";
import { LoginForm } from "./LoginForm";
import { AdminNav } from "./AdminNav";
import "./admin.css";

// Espace prive : ni indexe, ni prerendu. Le cookie est lu a chaque requete,
// donc rien ne doit etre mis en cache statiquement.
export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

// Le garde vit ici plutot que dans chaque page : une nouvelle sous-page de
// /admin est protegee par construction, sans avoir a y penser. Les routes
// /api/stats gardent le leur - c'est elles qui protegent reellement les
// donnees, le layout ne fait que cacher l'UI.
export default async function AdminLayout({ children }) {
  const session = (await cookies()).get(STATS_COOKIE_NAME)?.value;

  if (!isValidSession(session)) return <LoginForm />;

  return (
    <div className="viz-page mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
      <AdminNav />
      {children}
    </div>
  );
}
