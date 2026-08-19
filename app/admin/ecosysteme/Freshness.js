import { VERIFIED_ON, VERIFIED_LABEL, STALE_AFTER_DAYS } from "../data/meta";

// Bandeau de fraicheur. Passe l'age en clair plutot qu'un simple "verifie
// le X" : devant un client, ce qui compte est de savoir si le tableau est
// encore d'actualite, pas la date brute.
export function Freshness() {
  const days = Math.floor((Date.now() - new Date(VERIFIED_ON).getTime()) / 86_400_000);
  const stale = days > STALE_AFTER_DAYS;

  return (
    <div className={`eco-freshness ${stale ? "eco-freshness-stale" : ""}`}>
      <span className={`eco-badge eco-badge-${stale ? "warn" : "neutral"}`}>
        {stale ? "A reverifier" : "A jour"}
      </span>
      <span>
        Donnees verifiees le {VERIFIED_LABEL}
        {days > 0 && ` - il y a ${days} jour${days > 1 ? "s" : ""}`}.
        {stale
          ? " Les tarifs et les certifications ont probablement change : a reverifier avant de montrer ces tableaux a un client."
          : " Tarifs, certifications et modeles evoluent vite : revalider avant tout engagement."}
      </span>
    </div>
  );
}
