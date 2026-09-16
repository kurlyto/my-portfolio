"use client";

import Reveal from "./Reveal";

// Quatre faits verifiables, pas des promesses marketing : c'est la section qui
// leve la peur "mes donnees vont partir n'importe ou". Chaque carte tient en
// une phrase de titre et deux lignes d'explication.
const POINTS = [
  {
    title: "Un serveur dédié en France",
    text: "Votre agent tourne sur une machine à vous hébergée en France. Vos données ne côtoient jamais celles d'inconnus sur une plateforme partagée.",
  },
  {
    title: "Vos données ne servent qu'à vous",
    text: "Rien n'est croisé entre clients et rien ne sert à entraîner un modèle. Ce que votre agent apprend chez vous reste chez vous.",
  },
  {
    title: "Des accès que vous contrôlez",
    text: "Vous décidez outil par outil ce qu'il peut voir et faire. Vous retirez un accès en un clic sans rien casser.",
  },
  {
    title: "Votre validation avant l'irréversible",
    text: "Un envoi, un paiement ou une suppression attend toujours votre feu vert. Tout ce qu'il fait est tracé et vous pouvez tout relire.",
  },
];

export default function SecuritySection() {
  return (
    <section className="bg-[#fafafa] border-t border-black/10">
      <Reveal className="max-w-5xl mx-auto px-6 py-16 md:py-36">
        <span className="kicker text-xs font-mono uppercase tracking-widest">
          Sécurité
        </span>
        {/* Pas de max-w-2xl ici : a 48 px la phrase fait ~780 px et la borne
            de 672 px la cassait en deux lignes (remonte par Nathan, 14/09). */}
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight text-balance">
          Vos données restent vos données.
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {POINTS.map((point, i) => (
            <div key={point.title} className="rounded border border-black/10 bg-white p-6 md:p-8">
              <span className="kicker text-[12px] font-mono font-bold">
                0{i + 1}
              </span>
              <h3 className="font-display mt-2 text-xl md:text-[1.35rem] font-bold leading-snug">
                {point.title}
              </h3>
              <p className="mt-3 text-[15px] opacity-70 leading-relaxed">{point.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
