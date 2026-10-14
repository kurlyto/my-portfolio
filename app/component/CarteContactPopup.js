"use client";

import { useEffect, useState } from "react";

// Carte de visite electronique (14/10/2026) : le QR code montre sur le
// telephone de Nathan mene a /carte, qui renvoie ici avec ?carte. La pop-up
// reprend le recto de la carte papier (fond anthracite, logo NK, trait orange)
// et son bouton telecharge la fiche contact (.vcf) : le telephone du visiteur
// ouvre alors sa propre fenetre "nouveau contact", deja remplie. Un site ne
// peut pas enregistrer un contact sans ce geste : un appui reste necessaire.
// Sans ?carte dans l'adresse, rien ne s'affiche.

const TEXTES = {
  fr: {
    titre: "Ingénieur et consultant IA",
    baseline: "Automatisations et IA sur mesure",
    ajouter: "Ajouter à mes contacts",
    voir: "Voir mon portfolio",
    fermer: "Fermer",
  },
  en: {
    titre: "AI engineer and consultant",
    baseline: "Custom automations and AI",
    ajouter: "Add to my contacts",
    voir: "See my portfolio",
    fermer: "Close",
  },
};

const CONTACTS = [
  { label: "06 22 16 47 58", href: "tel:+33622164758" },
  { label: "nathan.knaebel@gmail.com", href: "mailto:nathan.knaebel@gmail.com" },
  { label: "linkedin.com/in/nathan-knaebel", href: "https://linkedin.com/in/nathan-knaebel" },
];

export default function CarteContactPopup({ lang = "fr" }) {
  const [ouverte, setOuverte] = useState(false);
  const t = TEXTES[lang] || TEXTES.fr;

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("carte")) setOuverte(true);
  }, []);

  function fermer() {
    setOuverte(false);
    // Retire ?carte de l'adresse : un rechargement ou un partage du lien ne
    // rouvre pas la pop-up.
    window.history.replaceState(null, "", window.location.pathname + window.location.hash);
  }

  if (!ouverte) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      onClick={fermer}
      role="dialog"
      aria-modal="true"
      aria-label="Nathan Knaebel"
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#1b1814] text-white shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={fermer}
          aria-label={t.fermer}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-xl text-white/60 hover:bg-white/10 hover:text-white"
        >
          ×
        </button>

        <div className="flex flex-col items-center px-8 pt-10 pb-7 text-center">
          <img src="/carte/nk-blanc.png" alt="" className="w-20" />
          <img
            src="/carte/photo.jpg"
            alt="Nathan Knaebel"
            className="mt-6 h-20 w-20 rounded-full object-cover ring-2 ring-white/15"
          />
          <div className="mt-4 font-serif text-2xl font-semibold tracking-wide">Nathan Knaebel</div>
          <div className="mt-1 text-sm text-white/80">{t.titre}</div>
          <div className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#b9b2aa]">{t.baseline}</div>
          <div className="mt-4 h-0.5 w-10 bg-[#ff561a]" />

          <ul className="mt-6 space-y-1.5 text-sm text-white/85">
            {CONTACTS.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:text-white">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 px-6 pb-6">
          {/* Pas d'attribut download : sur iPhone, il range le fichier dans
              "Fichiers" au lieu d'ouvrir directement la fiche contact. */}
          <a
            href="/carte/nathan-knaebel.vcf"
            className="block w-full rounded-full bg-[#ff561a] py-4 text-center text-base font-semibold text-white shadow-lg active:scale-[0.98]"
          >
            {t.ajouter}
          </a>
          <button
            type="button"
            onClick={fermer}
            className="block w-full rounded-full py-3 text-center text-sm font-medium text-white/70 hover:text-white"
          >
            {t.voir}
          </button>
        </div>
      </div>
    </div>
  );
}
