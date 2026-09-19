"use client";

import { useEffect } from "react";
import { suivreClic } from "../lib/suivi-clics";

// Suivi des clics (evenements Umami), lu par le tableau de bord d'audience.
//
// DEUX attributs, une seule regle :
// - `data-umami-event="clic-..."` (natif Umami, zero JS) sur un <button> et
//   sur un lien qui s'ouvre dans un NOUVEL onglet (target="_blank").
// - `data-clic="clic-..."` sur un lien qui s'ouvre dans le MEME onglet
//   (<Link> de Next, ancre #, mailto:, tel:). Pourquoi pas l'attribut natif :
//   sur un tel lien, le script Umami bloque le clic, attend la reponse du
//   serveur de stats puis recharge la page entiere (location.href). On perdrait
//   la navigation instantanee de Next, et un serveur de stats lent donnerait
//   un lien qui semble mort. Ici on envoie l'evenement sans toucher au clic.
//
// Convention de nommage : prefixe `clic-`, minuscules, tirets, sans accents,
// zone + action (clic-hero-..., clic-nav-..., clic-footer-...). Le tableau de
// bord retire `clic-` et remplace les tirets par des espaces.
export default function SuiviClics() {
  useEffect(() => {
    function onClick(event) {
      const cible = event.target instanceof Element ? event.target.closest("[data-clic]") : null;
      if (cible) suivreClic(cible.getAttribute("data-clic"));
    }
    // Phase de capture : l'evenement part avec l'adresse de la page ou le clic
    // a eu lieu, avant que Next ne change de page.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
