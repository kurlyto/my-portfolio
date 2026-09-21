"use client";

import { useEffect, useState } from "react";
import { siWhatsapp, siX, siFacebook } from "simple-icons";
import { nomClic } from "../lib/suivi-clics";

// LinkedIn a quitte simple-icons (marque protegee) : son trace est garde ici.
const LINKEDIN =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

// Boutons de partage d'un article (blog et pages metier) : le logo de chaque
// reseau, qui prend sa couleur au survol. De simples liens vers les pages de
// partage : aucun script tiers, aucun traceur. Sur telephone, le bouton
// "Partager" ouvre la feuille de partage du systeme.
function reseaux(url, titre) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(titre);
  return [
    { nom: "LinkedIn", couleur: "#0A66C2", trace: LINKEDIN, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { nom: "WhatsApp", couleur: `#${siWhatsapp.hex}`, trace: siWhatsapp.path, href: `https://wa.me/?text=${t}%20${u}` },
    { nom: "X", couleur: "#000000", trace: siX.path, href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { nom: "Facebook", couleur: `#${siFacebook.hex}`, trace: siFacebook.path, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { nom: "E-mail", couleur: "var(--accent)", href: `mailto:?subject=${t}&body=${u}` },
  ];
}

const BOUTON =
  "inline-flex min-h-[40px] items-center rounded-full border border-black/15 bg-white px-4 font-mono text-[12px] uppercase tracking-wider text-black/70 transition-colors hover:border-[#ff6b35] hover:text-[#ff6b35]";

// Pastille ronde d'un reseau : logo gris au repos, couleur de la marque au survol.
const PASTILLE =
  "group inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black/60 transition-colors hover:border-[var(--marque)] hover:bg-[var(--marque)] hover:text-white";

function Logo({ trace }) {
  if (trace) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d={trace} />
      </svg>
    );
  }
  // Pas de marque pour le mail : une enveloppe.
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

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
        <button type="button" onClick={partagerNatif} data-cursor-hover data-umami-event="clic-partager-menu-du-telephone" className={`${BOUTON} sm:hidden`}>
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
          data-umami-event={nomClic("partager", r.nom)}
          aria-label={`Partager sur ${r.nom}`}
          title={r.nom}
          style={{ "--marque": r.couleur }}
          className={PASTILLE}
        >
          <Logo trace={r.trace} />
        </a>
      ))}
      <button type="button" onClick={copier} data-cursor-hover data-umami-event="clic-partager-copier-le-lien" className={`${BOUTON} gap-2`} aria-live="polite">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
        </svg>
        {copie ? "Lien copié" : "Copier le lien"}
      </button>
    </div>
  );
}
