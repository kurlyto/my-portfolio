import { redirect } from "next/navigation";

// Ancienne adresse de l'espace prive, gardee pour que les liens et favoris
// existants continuent de fonctionner. L'espace a ete renomme /admin quand
// il a cesse d'etre uniquement des statistiques d'audience.
export default function LegacyStatsPage() {
  redirect("/admin/audience");
}
