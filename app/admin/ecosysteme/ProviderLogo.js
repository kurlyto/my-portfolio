"use client";

import { useState } from "react";

// Logos recuperes via le service de favicons de Google a partir du domaine
// du fournisseur : pas de binaire a versionner ni a re-telecharger quand un
// editeur refait sa marque.
//
// Deux consequences assumees :
//  - un appel externe par logo (page privee, consultee par une personne) ;
//  - un favicon peut disparaitre ou renvoyer un globe generique, d'ou le
//    repli sur l'initiale plutot qu'une image cassee.
function faviconUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

export function ProviderLogo({ domain, name }) {
  const [failed, setFailed] = useState(false);

  if (!domain || failed) {
    return (
      <span className="eco-logo eco-logo-fallback" aria-hidden>
        {name?.[0] ?? "?"}
      </span>
    );
  }

  return (
    <img
      src={faviconUrl(domain)}
      alt=""
      aria-hidden
      width={16}
      height={16}
      loading="lazy"
      className="eco-logo"
      onError={() => setFailed(true)}
    />
  );
}
