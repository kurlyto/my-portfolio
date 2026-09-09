"use client";

import Reveal from "./Reveal";

// La question que TOUT dirigeant pose en premier : "j'ai deja ChatGPT, pourquoi
// payer ?" (section demandee par Nathan le 08/09/2026).
//
// Parti pris : l'honnetete plutot que le denigrement. L'AIOS tourne SUR les
// modeles d'Anthropic - dire l'inverse se verrait en trente secondes et
// coulerait la confiance. La difference n'est pas le cerveau, c'est ce qu'on
// branche autour : la memoire, les acces, les actions, la mise en route.
// Un comparatif qui reconnait la valeur du concurrent est plus credible qu'un
// tableau ou tout est vert d'un cote et rouge de l'autre.

const LIGNES = [
  {
    critere: "Ce qu'il sait de votre entreprise",
    chat: "Ce que vous lui collez dans la conversation, à chaque fois.",
    aios: "Vos mails, votre agenda, vos documents et vos clients, en permanence.",
  },
  {
    critere: "Sa mémoire",
    chat: "Il repart de zéro. Vous réexpliquez votre contexte sans arrêt.",
    aios: "Il retient vos règles, vos habitudes et vos corrections, pour de bon.",
  },
  {
    critere: "Ce qu'il vous rend",
    chat: "Du texte, que vous recopiez ailleurs.",
    aios: "Des actions : mails préparés, rendez-vous créés, suivis à jour.",
  },
  {
    critere: "Quand vous ne lui parlez pas",
    chat: "Il ne fait rien, il attend.",
    aios: "Il trie, surveille et prépare votre journée pendant que vous travaillez.",
  },
  {
    critere: "La mise en route",
    chat: "À vous de deviner quoi lui demander, et comment.",
    aios: "On le branche sur vos outils et on le règle avec vous les premières semaines.",
  },
  {
    critere: "Vos données",
    chat: "Sur un service grand public, partagé par tout le monde.",
    aios: "Sur un serveur qui vous est dédié. Vous coupez un accès quand vous voulez.",
  },
];

function CrossGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden {...props}>
      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AiosVsChat() {
  return (
    <section className="bg-deep text-white">
      <Reveal className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        {/* Ancre sur le titre, pas sur la section : viser la section faisait
            atterrir dans son padding, donc sur du vide. */}
        <span
          id="comparatif"
          className="scroll-mt-10 text-xs font-mono uppercase tracking-widest text-accent"
        >
          Face à face
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Et par rapport à ChatGPT ?
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
          Foxy tourne sur les mêmes modèles que Claude, d&apos;Anthropic. La
          différence n&apos;est donc pas le cerveau : c&apos;est tout ce qu&apos;on branche
          autour.
        </p>

        {/* En-tetes de colonnes, sur grand ecran seulement : en mobile chaque
            ligne porte ses propres etiquettes, sinon on ne sait plus qui parle
            apres deux ecrans de defilement. */}
        <div className="hidden md:grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6 mt-14 pb-4 border-b border-white/15">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/40" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
            ChatGPT, Claude, Gemini
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-accent">
            Foxy
          </span>
        </div>

        <div className="md:border-b md:border-white/10">
          {LIGNES.map((ligne) => (
            <div
              key={ligne.critere}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 md:gap-6 border-b border-white/10 md:border-b-0 md:border-t md:border-white/10 py-7 first:border-t-0 md:first:border-t-0"
            >
              <h3 className="font-display text-lg md:text-xl font-bold leading-snug">
                {ligne.critere}
              </h3>

              <div className="flex items-start gap-3">
                <CrossGlyph className="mt-0.5 w-4 h-4 shrink-0 text-white/30" />
                <p className="text-[14.5px] leading-relaxed text-white/50">
                  <span className="md:hidden block text-[11px] font-mono uppercase tracking-wider text-white/30 mb-1">
                    Un chat généraliste
                  </span>
                  {ligne.chat}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckGlyph className="mt-0.5 w-4 h-4 shrink-0 text-accent" />
                <p className="text-[14.5px] leading-relaxed text-white">
                  <span className="md:hidden block text-[11px] font-mono uppercase tracking-wider text-accent mb-1">
                    Foxy
                  </span>
                  {ligne.aios}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Le paragraphe qui desamorce : on ne demande a personne d'abandonner
            un outil qui lui suffit. Dire quand on n'est PAS la bonne reponse
            rend credible tout le reste de la page. */}
        <p className="mt-12 text-[15px] md:text-base leading-relaxed text-white/70 max-w-3xl">
          Si votre besoin est d&apos;écrire un texte de temps en temps, ChatGPT suffit :
          gardez-le. <span className="text-white">Foxy devient utile</span> le jour
          où votre problème n&apos;est plus d&apos;écrire, mais de suivre : ce qui traîne,
          ce qu&apos;on a promis, ce qu&apos;on a oublié de relancer.
        </p>
      </Reveal>
    </section>
  );
}
