"use client";

import { useState } from "react";

// Lien partage : il n'envoie PAS vers la page du flyer mais vers le chat Nate
// deja amorce sur le metier (cf. HomePageContent, qui lit ?chat=1&metier=).
// Celui qui recoit la carte tombe donc sur une conversation qualifiee, pas sur
// une page a lire.
function chatUrl(metier) {
  return `${window.location.origin}/?chat=1&metier=${metier.slug}`;
}

// Rasterise le flyer tel qu'il est affiche a l'ecran. On copie le DOM existant
// plutot que de redessiner la carte : c'est la seule facon de garantir que
// l'image partagee reste fidele au flyer quand celui-ci evolue.
async function buildPng(node, metier) {
  const { toBlob } = await import("html-to-image");

  const rect = node.getBoundingClientRect();
  // Marge autour de la carte : sans elle, la rasterisation rogne la bordure
  // noire de 2px et l'arrondi des angles, et le flyer sort colle aux bords.
  const PAD = 16;

  const blob = await toBlob(node, {
    // x2 : sur un ecran de telephone le flyer fait ~500px de large, ce qui
    // donnerait une image floue une fois ouverte en grand dans WhatsApp.
    pixelRatio: 2,
    // Le flyer est transparent par-dessus le fond de la page : sans fond
    // explicite, le PNG sort avec des angles transparents qui virent au noir
    // dans la plupart des messageries.
    backgroundColor: "#ffffff",
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
    style: { margin: `${PAD}px` },
    // Le bouton de partage et la croix de fermeture ne font pas partie de la
    // carte : ils sont hors du noeud capture, mais on protege aussi les
    // eventuels elements marques comme non imprimables.
    filter: (el) => !el.dataset?.noShare,
  });

  if (!blob) throw new Error("rasterisation vide");

  return new File([blob], `agent-ia-${metier.slug}.png`, { type: "image/png" });
}

// Bouton de partage d'un flyer metier. Trois niveaux, du plus riche au plus
// pauvre, selon ce que le navigateur accepte :
//   1. partage natif de l'image + du lien (mobile) ;
//   2. telechargement du PNG + copie du lien (desktop, ou navigator.share
//      n'accepte pas de fichier) ;
//   3. copie du lien seul (si la rasterisation echoue).
// Utilise dans la modale de la home et sur la page /metiers/[slug] : une seule
// logique de partage pour les deux. `flyerRef` pointe la carte a capturer.
export default function FlyerShareButton({ metier, flyerRef }) {
  const [state, setState] = useState("idle");

  async function share() {
    if (state === "working") return;

    const url = chatUrl(metier);
    const node = flyerRef?.current;
    setState("working");

    let file = null;
    if (node) {
      try {
        file = await buildPng(node, metier);
      } catch {
        // Rasterisation impossible : on partagera le lien seul plutot que de
        // ne rien faire.
      }
    }

    const payload = { title: `Agent IA - ${metier.title}`, url };
    // canShare({files}) est le seul test fiable : Chrome desktop expose
    // navigator.share mais refuse les fichiers, et l'appel echouerait.
    const canShareFile =
      file &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] });

    if (canShareFile) {
      try {
        await navigator.share({ ...payload, files: [file] });
        setState("idle");
        return;
      } catch (err) {
        // Partage annule par l'utilisateur : on ne fait rien a sa place.
        if (err?.name === "AbortError") {
          setState("idle");
          return;
        }
        // Vrai echec du partage : on continue vers le repli.
      }
    }

    // Repli desktop : le fichier ne peut pas transiter par le partage natif,
    // on le depose donc dans les telechargements et on met le lien dans le
    // presse-papier. L'utilisateur a les deux morceaux a coller.
    let done = "link";
    if (file) {
      try {
        const href = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = href;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(href);
        done = "image";
      } catch {
        // Telechargement refuse : il reste le lien.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard indisponible (http, permissions) : l'image est deja
      // telechargee, on ne peut rien de plus.
      if (done === "link") {
        setState("idle");
        return;
      }
    }

    setState(done);
    setTimeout(() => setState("idle"), 2600);
  }

  const label = {
    idle: "Partager ce flyer",
    working: "Préparation...",
    image: "Image enregistrée, lien copié !",
    link: "Lien copié !",
  }[state];

  return (
    <button
      type="button"
      onClick={share}
      disabled={state === "working"}
      data-cursor-hover
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-colors duration-150 ease-out hover:bg-[#e2531f] disabled:opacity-70"
    >
      {label}
    </button>
  );
}
