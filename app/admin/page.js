import { redirect } from "next/navigation";

// La racine de l'espace n'a pas de contenu propre : elle ouvre sur
// l'audience, la vue consultee tous les jours.
export default function AdminPage() {
  redirect("/admin/audience");
}
