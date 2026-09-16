"use client";

import { useEffect } from "react";

// Jusqu'au 16/09/2026 la racine etait le site de Foxy : des liens partages
// visent encore ses sections (/#capacites, /#faq...). Un fragment n'arrive
// jamais au serveur, la redirection ne peut donc se faire qu'ici. L'accueil de
// l'agence n'a aucune de ces ancres : pas de collision possible.
const ANCRES_FOXY = new Set(["#capacites", "#comparatif", "#temoignages", "#faq"]);

export default function LegacyFoxyAnchors() {
  useEffect(() => {
    if (ANCRES_FOXY.has(window.location.hash)) {
      window.location.replace(`/foxy${window.location.search}${window.location.hash}`);
    }
  }, []);

  return null;
}
