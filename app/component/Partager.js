"use client";

import { useEffect, useState } from "react";

// Boutons de partage d'un article (blog et pages metier). De simples liens vers
// les pages de partage des reseaux : aucun script tiers, aucun traceur. Sur
// telephone, le bouton "Partager" ouvre la feuille de partage du systeme.
function reseaux(url, titre) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titre);
  return [
    { nom: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { nom: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { nom: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { nom: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { nom: "E-mail", href: `mailto:?subject=${t}&body=${u}` },
  ];
}

const BOUTON =
  "inline-flex min-h-[40px] items-center rounded-full border border-black/15 bg-white px-4 font-mono text-[12px] uppercase tracking-wider text-black/70 transition-colors hover:border-[#ff6b35] hover:text-[#ff6b35]";

export default function Partager({ url, titre, libelle = "Partager cet article" }) {
  const [natif, setNatif] = useState(false);
  const [copie, setCopie] = useState(false);

  // navigator.share n'existe que dans le navigateur : on ne le teste qu'apres
  // le premier rendu, sinon le HTML du serveur et celui du client divergent.
  useEffect(() => {
    setNatif(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  async function copier() {
    try {
      await navigator.clipboard.writeText(url);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers refuse (vieux navigateur) : les liens restent utilisables.
    }
  }

  async function partagerNatif() {
    try {
      await navigator.share({ title: titre, url });
    } catch {
      // Feuille de partage fermee sans choisir : rien a faire.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={libelle}>
      <span className="mr-1 font-mono text-[11px] uppercase tracking-widest text-black/50">{libelle}</span>
      {natif && (
        <button type="button" onClick={partagerNatif} data-cursor-hover className={`${BOUTON} sm:hidden`}>
          Partager
        </button>
      )}
      {reseaux(url, titre).map((r) => (
        <a
          key={r.nom}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className={BOUTON}
        >
          {r.nom}
        </a>
      ))}
      <button type="button" onClick={copier} data-cursor-hover className={BOUTON} aria-live="polite">
        {copie ? "Lien copié" : "Copier le lien"}
      </button>
    </div>
  );
}
