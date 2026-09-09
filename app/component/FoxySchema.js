"use client";

import Image from "next/image";
import { useState } from "react";

// Le schema qui explique ce qu'EST un AIOS, la ou le reste du site explique ce
// qu'il FAIT. Un dirigeant qui n'a jamais vu ca se represente "un chatbot avec
// des acces" : le schema doit montrer qu'il y a des ORGANES (un moteur, une
// memoire, des competences, un apprentissage, une horloge) branches sur SES
// outils a lui.
//
// Deux anneaux, jamais melanges, parce que ce sont deux natures differentes :
//   - anneau interieur = ce dont Foxy est FAIT (traits pleins, couleur d'accent) ;
//   - anneau exterieur = ce a quoi il est BRANCHE (traits pointilles, neutre).
// Melanger les deux donnerait une roue decorative qui n'explique rien.

// Un cylindre de donnees plutot qu'un cerveau : dessine en 20 px, un cerveau au
// trait devient une tache illisible, alors que le cylindre se reconnait tout de
// suite comme "ce qui est stocke".
function IconeCerveau(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <ellipse cx="12" cy="6.5" rx="6.5" ry="2.8" />
      <path d="M5.5 6.5v11c0 1.55 2.91 2.8 6.5 2.8s6.5-1.25 6.5-2.8v-11" strokeLinecap="round" />
      <path d="M5.5 12c0 1.55 2.91 2.8 6.5 2.8s6.5-1.25 6.5-2.8" strokeLinecap="round" />
    </svg>
  );
}

function IconePuce(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path
        d="M10 4v3M14 4v3M10 17v3M14 17v3M4 10h3M4 14h3M17 10h3M17 14h3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Quatre blocs : des savoir-faire qu'on ajoute un par un. Une cle a molette
// disait "reparation", pas "competences".
function IconeOutils(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <path d="M16.5 13.5v6M13.5 16.5h6" strokeLinecap="round" />
    </svg>
  );
}

function IconeCourbe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="M7 16c3 0 4-2.5 5.5-5S16 6.5 19 6.5" strokeLinecap="round" />
    </svg>
  );
}

function IconeHorloge(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ce dont il est fait. L'ordre suit la lecture d'une horloge, en partant du
// haut : moteur, memoire, competences, apprentissage, initiative.
const ORGANES = [
  {
    id: "modele",
    label: "Le modèle",
    Icone: IconePuce,
    texte:
      "Le moteur qui comprend ce que vous dites et rédige à votre place. Foxy tourne sur les modèles Claude d'Anthropic, parmi les meilleurs du marché.",
  },
  {
    id: "memoire",
    label: "La mémoire",
    Icone: IconeCerveau,
    texte:
      "Ce qu'il sait de votre activité : vos clients, vos tarifs, ce que vous lui avez dit il y a trois mois. Un chatbot repart de zéro à chaque conversation, lui non.",
  },
  {
    id: "competences",
    label: "Les compétences",
    Icone: IconeOutils,
    texte:
      "Ses savoir-faire : préparer un devis, trier une boîte mail, monter un dossier client. On en ajoute au fil de vos besoins, sans rien reconstruire.",
  },
  {
    id: "apprentissage",
    label: "L'apprentissage",
    Icone: IconeCourbe,
    texte:
      "Chaque correction est retenue. « Trop formel », « ce client-là, je le tutoie » : il ne refait pas deux fois la même erreur.",
  },
  {
    id: "initiative",
    label: "L'horloge",
    Icone: IconeHorloge,
    texte:
      "Il n'attend pas que vous demandiez. Tous les matins à 7h30 il prépare votre journée, le vendredi il fait le point sur vos impayés. Vous fixez les rendez-vous, il s'y tient.",
  },
];

// Ce a quoi il est branche. Des categories, pas des marques : le visiteur doit
// y reconnaitre SES outils, quels qu'ils soient.
const OUTILS = [
  { id: "mails", label: "Mails", texte: "Il lit, trie et prépare les réponses. Rien ne part sans vous." },
  { id: "agenda", label: "Agenda", texte: "Il voit vos disponibilités, crée les rendez-vous et vous prépare avant." },
  { id: "clients", label: "Clients", texte: "Votre fichier clients ou votre CRM : l'historique complet de chaque relation." },
  { id: "documents", label: "Documents", texte: "Vos devis, factures et dossiers, retrouvés et rédigés au bon format." },
  { id: "facturation", label: "Facturation", texte: "Ce qui est payé, ce qui traîne, qui relancer et à quel moment." },
  { id: "web", label: "Web", texte: "Il cherche en ligne ce qu'il ne sait pas : un prospect, un tarif, une actualité." },
  { id: "voix", label: "Voix", texte: "Vous lui dictez en voiture, il exécute et vous rend compte." },
  { id: "metier", label: "Vos logiciels", texte: "Votre outil métier, votre caisse, votre banque : on branche ce que vous utilisez déjà." },
];

// Coordonnees en pourcentage du carre, calculees une fois : un cercle se lit
// mieux qu'une grille pour dire "tout passe par le centre".
function place(index, total, rayon, decalage = -90) {
  const angle = ((decalage + (360 / total) * index) * Math.PI) / 180;
  return {
    x: 50 + rayon * Math.cos(angle),
    y: 50 + rayon * Math.sin(angle),
  };
}

const R_ORGANES = 28;
const R_OUTILS = 45;
const POS_ORGANES = ORGANES.map((_, i) => place(i, ORGANES.length, R_ORGANES));
const POS_OUTILS = OUTILS.map((_, i) => place(i, OUTILS.length, R_OUTILS, -90 + 22.5));

function Bulle({ item, pos, actif, onActiver, onQuitter, variante }) {
  const estOrgane = variante === "organe";
  // Le panneau s'ouvre vers l'EXTERIEUR du cercle : une bulle a droite l'ouvre a
  // sa droite, une bulle du bas vers le bas. Ouvert vers l'interieur, il
  // recouvrait le renard et les bulles voisines, c'est-a-dire exactement ce que
  // le visiteur regarde.
  const cote =
    pos.x > 62 ? "droite" : pos.x < 38 ? "gauche" : pos.y < 50 ? "haut" : "bas";
  const placement = {
    droite: "left-full ml-3 top-1/2 -translate-y-1/2",
    gauche: "right-full mr-3 top-1/2 -translate-y-1/2",
    haut: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    bas: "top-full mt-3 left-1/2 -translate-x-1/2",
  }[cote];

  return (
    // La bulle active passe au-dessus de tout : son panneau vit dans ce
    // conteneur, un z-index pose plus bas dans l'arbre ne peut pas en sortir.
    <div
      className={`absolute ${actif ? "z-40" : "z-10"}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <div className="relative">
        <button
          type="button"
          onMouseEnter={onActiver}
          onMouseLeave={onQuitter}
          onFocus={onActiver}
          onBlur={onQuitter}
          onClick={onActiver}
          data-cursor-hover
          aria-describedby={actif ? `bulle-${item.id}` : undefined}
          className={`flex flex-col items-center justify-center gap-1 rounded-full transition-all duration-200 ${
            estOrgane
              ? "w-[86px] h-[86px] border-2 bg-surface"
              : "w-[74px] h-[74px] border border-dashed bg-surface-2"
          } ${
            actif
              ? "border-accent shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] -translate-y-0.5"
              : estOrgane
                ? "border-accent/45"
                : "border-ink/25"
          }`}
        >
          {estOrgane ? <item.Icone className="w-5 h-5 text-accent" aria-hidden /> : null}
          <span
            className={`px-1 text-center leading-tight ${
              estOrgane ? "text-[11px] font-semibold text-ink" : "text-[10.5px] font-mono text-ink/65"
            }`}
          >
            {item.label}
          </span>
        </button>

        {actif ? (
          <div
            id={`bulle-${item.id}`}
            role="tooltip"
            className={`absolute w-60 rounded bg-ink text-surface px-3.5 py-3 text-[12.5px] leading-relaxed shadow-xl ${placement}`}
          >
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-accent mb-1">
              {item.label}
            </p>
            {item.texte}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function FoxySchema() {
  const [actif, setActif] = useState(null);

  return (
    <section className="bg-surface text-ink">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs font-mono uppercase tracking-widest text-accent">De quoi il est fait</p>
        <h2 className="font-display mt-4 text-3xl md:text-5xl font-bold tracking-tight max-w-[18ch]">
          Un système, pas un chatbot.
        </h2>
        <p className="mt-5 text-base md:text-lg text-ink/65 leading-relaxed max-w-2xl">
          Foxy est branché sur vos outils, garde en mémoire tout ce qui concerne votre
          activité, apprend votre façon de faire et travaille même quand vous ne lui
          demandez rien. C&apos;est ça, un AIOS.
        </p>

        {/* Bureau : le schema. Il demande de la place et un survol, deux choses
            qu'un telephone n'a pas. */}
        <div className="hidden md:block mt-16">
          <div className="relative mx-auto w-full max-w-[620px] aspect-square">
            {/* Les traits partent tous du centre : c'est le message du schema. */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              aria-hidden
              preserveAspectRatio="none"
            >
              {POS_OUTILS.map((p, i) => (
                <line
                  key={`o${i}`}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--ink)"
                  strokeOpacity="0.18"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1.5"
                />
              ))}
              {POS_ORGANES.map((p, i) => (
                <line
                  key={`g${i}`}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--accent)"
                  strokeOpacity="0.5"
                  strokeWidth="0.4"
                />
              ))}
              <circle
                cx="50"
                cy="50"
                r={R_OUTILS}
                fill="none"
                stroke="var(--ink)"
                strokeOpacity="0.08"
                strokeWidth="0.25"
              />
            </svg>

            {/* Foxy au centre : tout converge vers lui. */}
            <div
              className="absolute z-20 flex flex-col items-center justify-center rounded-full bg-surface"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            >
              <div className="flex flex-col items-center justify-center w-[132px] h-[132px] rounded-full border-2 border-accent bg-surface">
                <Image
                  src="/images/cover-aios.png"
                  alt="Foxy"
                  width={64}
                  height={64}
                  unoptimized
                  className="w-14 h-14 object-contain"
                />
                <span className="mt-1 text-[13px] font-display font-bold">Foxy</span>
              </div>
            </div>

            {ORGANES.map((item, i) => (
              <Bulle
                key={item.id}
                item={item}
                pos={POS_ORGANES[i]}
                variante="organe"
                actif={actif === item.id}
                onActiver={() => setActif(item.id)}
                onQuitter={() => setActif(null)}
              />
            ))}
            {OUTILS.map((item, i) => (
              <Bulle
                key={item.id}
                item={item}
                pos={POS_OUTILS[i]}
                variante="outil"
                actif={actif === item.id}
                onActiver={() => setActif(item.id)}
                onQuitter={() => setActif(null)}
              />
            ))}
          </div>

          <p className="mt-8 text-center text-[12.5px] font-mono text-ink/45">
            Trait plein : ce dont il est fait. Trait pointillé : ce à quoi on le branche.
            Survolez une bulle.
          </p>
        </div>

        {/* Mobile : les memes composantes, en liste. Un cercle de 13 bulles a
            390 px devient illisible, et il n'y a pas de survol : l'explication
            est donnee directement. */}
        <div className="md:hidden mt-12 flex flex-col gap-3">
          {ORGANES.map((item) => (
            <div key={item.id} className="flex items-start gap-3 rounded border border-ink/10 bg-surface-2 p-4">
              <item.Icone className="w-5 h-5 mt-0.5 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="text-[14px] font-semibold">{item.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/65">{item.texte}</p>
              </div>
            </div>
          ))}
          <div className="mt-2">
            <p className="text-[12px] font-mono uppercase tracking-wider text-ink/40">
              Branché sur
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {OUTILS.map((o) => (
                <span
                  key={o.id}
                  className="rounded-full border border-dashed border-ink/25 px-3 py-1.5 text-[12px] font-mono text-ink/65"
                >
                  {o.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
