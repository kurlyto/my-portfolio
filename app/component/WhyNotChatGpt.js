"use client";

import Reveal from "./Reveal";

// Repond a l'objection n°1 du visiteur : "j'ai deja ChatGPT, pourquoi payer ?".
// Un face-a-face ligne a ligne, factuel, sans denigrer : le chat generaliste
// est un bon outil, il ne fait juste pas le meme metier qu'un agent branche.
const ROWS = [
  {
    generic: "Il oublie tout entre deux conversations",
    agent: "Il connaît vos clients, vos règles, vos habitudes : vous expliquez une fois, il s'en souvient pour de bon",
  },
  {
    generic: "Il répond quand vous lui écrivez, puis s'arrête",
    agent: "Il travaille 24h/24, même quand votre ordinateur est éteint",
  },
  {
    generic: "Il vous donne du texte, à vous de faire le reste",
    agent: "Il agit : il envoie, relance, classe, remplit vos outils à votre place",
  },
  {
    generic: "Il ne connaît pas vos mails, vos factures, votre agenda",
    agent: "Il est branché à vos outils et s'en sert comme un employé",
  },
];

function CrossGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhyNotChatGpt() {
  return (
    <section className="bg-white border-t border-black/10">
      <Reveal className="max-w-5xl mx-auto px-6 py-28 md:py-36">
        <span className="text-xs font-mono uppercase tracking-widest text-accent">
          Face à face
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Quelle différence entre ChatGPT et votre agent ?
        </h2>
        <p className="mt-6 text-base md:text-lg opacity-70 leading-relaxed max-w-2xl">
          ChatGPT ou Gemini répondent à vos questions. Un agent, lui, fait le travail.
        </p>

        {/* Deux colonnes symetriques : le grise a gauche, la carte accentuee a
            droite. En mobile les colonnes s'empilent, chaque ligne reste un
            face-a-face lisible grace aux icones. */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded border border-black/10 p-6 md:p-8">
            <p className="text-[12px] font-mono uppercase tracking-widest text-black/40">
              Un chat IA généraliste
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {ROWS.map((row) => (
                <li key={row.generic} className="flex items-start gap-3">
                  <CrossGlyph className="mt-0.5 w-4 h-4 shrink-0 text-black/30" />
                  <span className="text-[15px] leading-relaxed text-black/55">{row.generic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded border-2 border-accent/40 bg-[#faf8f5] p-6 md:p-8 shadow-[0_20px_50px_-20px_rgba(255,107,53,0.25)]">
            <p className="text-[12px] font-mono uppercase tracking-widest text-accent">
              Votre agent
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {ROWS.map((row) => (
                <li key={row.agent} className="flex items-start gap-3">
                  <CheckGlyph className="mt-0.5 w-4 h-4 shrink-0 text-accent" />
                  <span className="text-[15px] leading-relaxed font-medium">{row.agent}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
