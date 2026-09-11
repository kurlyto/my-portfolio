"use client";

import { useEffect, useState } from "react";
import { t } from "../lib/i18n-projects";

// Les deux versions du CV vivent dans public/cv/. La modale se contente de
// pointer l'iframe vers le bon fichier selon la langue choisie ; le PDF est
// rendu par le lecteur natif du navigateur (zoom, pagination, telechargement
// gratuits), on ne reimplemente rien.
const CVS = {
  fr: { label: "Français", file: "/cv/CV-Nathan-Knaebel-FR.pdf" },
  en: { label: "English", file: "/cv/CV-Nathan-Knaebel-EN.pdf" },
};

// Le CV existe DEJA dans les deux langues : la langue de la page ne fait donc
// que preselectionner le bon PDF (un anglais ouvre le CV anglais d'emblee), les
// deux boutons restent la pour basculer a la main.
export default function CvModal({ open, onClose, lang = "fr" }) {
  const [cvLang, setCvLang] = useState(lang);

  useEffect(() => {
    setCvLang(lang);
  }, [lang]);

  // Fermeture au clavier (Echap) et blocage du scroll de la page derriere la
  // modale : sans ca, la molette fait defiler le portfolio sous le PDF.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const tr = t(lang);
  const current = CVS[cvLang];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tr.cv.title}
    >
      {/* stopPropagation : un clic dans le cadre ne doit pas fermer la modale,
          seul le clic sur le fond noir ferme. */}
      <div
        className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            {Object.entries(CVS).map(([key, { label }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCvLang(key)}
                data-cursor-hover
                className={`rounded-full px-3.5 py-1.5 text-[12px] font-mono uppercase tracking-widest transition-colors duration-150 ${
                  cvLang === key
                    ? "bg-black text-white"
                    : "bg-black/[0.05] text-black/60 hover:bg-black/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={current.file}
              download
              data-cursor-hover
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-[12px] font-mono font-bold uppercase tracking-widest text-accent-ink transition-colors duration-150 hover:bg-accent-dark"
            >
              {tr.cv.download}
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={tr.cv.close}
              data-cursor-hover
              className="flex h-8 w-8 items-center justify-center rounded-full text-2xl leading-none text-black/50 transition-colors hover:bg-black/[0.05] hover:text-black"
            >
              &times;
            </button>
          </div>
        </div>

        {/* La cle force le rechargement de l'iframe quand la langue change, sinon
            certains navigateurs gardent le PDF precedent en cache d'affichage. */}
        {/* #toolbar=0&navpanes=0 : masque la barre d'outils native de Chrome
            (Imprimer, Telecharger, Google Drive...) et le volet de vignettes,
            pour un rendu propre et cadre. Le telechargement reste possible via
            notre bouton "Telecharger" ci-dessus. view=FitH ajuste a la largeur. */}
        <iframe
          key={current.file}
          src={`${current.file}#toolbar=0&navpanes=0&view=FitH`}
          title={`CV Nathan Knaebel (${current.label})`}
          className="min-h-0 flex-1 bg-neutral-100"
        />
      </div>
    </div>
  );
}
