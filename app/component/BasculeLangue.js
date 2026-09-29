"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LANG, LANGS, rememberLang } from "../lib/i18n-projects";

// Bascule FR/EN de l'accueil perso, dans son menu. Meme mecanique que la nav de
// /projects (ProjectsNav) : le choix s'ecrit dans le cookie lu par la page
// serveur, puis router.refresh() la redemande. Les textes reviennent traduits
// sans rechargement, et le choix vaut aussi pour /projects.
export default function BasculeLangue({ lang = DEFAULT_LANG }) {
  const router = useRouter();

  // Le <html lang="fr"> vit dans le layout partage : on le corrige tant que la
  // page est affichee, et on le rend en la quittant. Sans ce retour, Foxy ouvert
  // depuis l'accueil anglais resterait annonce en anglais (bouton rendez-vous
  // compris, qui suit cet attribut).
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = DEFAULT_LANG;
    };
  }, [lang]);

  function choisir(code) {
    if (code === lang) return;
    rememberLang(code);
    router.refresh();
  }

  // Deux cibles de 35 x 29 px (au-dessus du minimum touchable de 24 px), la
  // langue active a l'encre pleine, l'autre en creux.
  return (
    <div className="flex items-center gap-0.5 rounded-full p-0.5 ring-1 ring-ink/15">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => choisir(code)}
          aria-pressed={code === lang}
          data-cursor-hover
          data-umami-event={`clic-accueil-langue-${code}`}
          className={`rounded-full px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 ${
            code === lang ? "bg-ink text-surface" : "text-ink/55 hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
