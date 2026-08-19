import { VERIFIED_ON, VERIFIED_LABEL, STALE_AFTER_DAYS } from "../data/meta";

// Bandeau de fraîcheur. Affiche l'âge des données en clair : devant un
// client, ce qui compte est de savoir si le tableau est encore d'actualité.
export function Freshness() {
  const days = Math.floor((Date.now() - new Date(VERIFIED_ON).getTime()) / 86_400_000);
  const stale = days > STALE_AFTER_DAYS;

  return (
    <div className={`eco-freshness ${stale ? "eco-freshness-stale" : ""}`}>
      <span className={`eco-badge eco-badge-${stale ? "warn" : "neutral"}`}>
        {stale ? "À revérifier" : "À jour"}
      </span>
      <span>
        Vérifié le {VERIFIED_LABEL}
        {days > 0 && `, il y a ${days} jour${days > 1 ? "s" : ""}`}. Tarifs, certifications et
        modèles évoluent vite : revalider avant tout engagement client.
      </span>
    </div>
  );
}
