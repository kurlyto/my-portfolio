"use client";

import { useState } from "react";

// Deux rangees qui defilent en sens inverse : le mouvement croise donne de la
// profondeur et evite l'effet "bandeau publicitaire" d'une seule ligne.
const ROW_ONE = [
  { title: "Prospection", desc: "Trouve les contacts, ecrit, relance." },
  { title: "Comptabilite", desc: "Surveille les comptes, alerte, classe." },
  { title: "Reseaux sociaux", desc: "Ecrit dans votre voix, publie, repond." },
  { title: "Relances clients", desc: "Suit les impayes jusqu'au reglement." },
  { title: "Veille", desc: "Lit tout, ne garde que ce qui compte." },
  { title: "Prise de RDV", desc: "Gere l'agenda et confirme les creneaux." },
];

const ROW_TWO = [
  { title: "Recherche d'emploi", desc: "Cible les offres, prepare les dossiers." },
  { title: "Devis & factures", desc: "Redige, envoie, archive." },
  { title: "Support client", desc: "Repond 24/7 sur vos propres reponses." },
  { title: "Assistant vocal", desc: "Un vocal suffit, il execute." },
  { title: "Controle qualite", desc: "Relit vos documents, signale les erreurs." },
  { title: "Reporting", desc: "Compile les chiffres, envoie le resume." },
];

function Card({ item }) {
  return (
    <div className="shrink-0 w-[260px] border border-white/15 bg-white/[0.03] px-6 py-5 transition-colors duration-200 hover:border-[#ff6b35]/60 hover:bg-white/[0.06]">
      <p className="text-sm font-mono uppercase tracking-widest text-[#ff6b35]">
        {item.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed opacity-70">{item.desc}</p>
    </div>
  );
}

// La piste contient deux copies identiques de la liste : quand la premiere a
// entierement defile, la seconde est exactement a sa place de depart, donc la
// boucle CSS ne saute pas.
function Row({ items, reverse = false, paused }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 46s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <Card key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function AgentMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-black text-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Cas d&apos;usage
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl text-balance">
          Des milliers de cas d&apos;usage. Quel est le vôtre ?
        </h2>
        <p className="mt-4 text-sm md:text-base opacity-60 max-w-xl">
          Chaque agent est construit pour un besoin precis. En voici quelques-uns.
        </p>
      </div>

      <div
        className="relative mt-14 flex flex-col gap-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 z-10 bg-gradient-to-l from-black to-transparent" />
        <Row items={ROW_ONE} paused={paused} />
        <Row items={ROW_TWO} reverse paused={paused} />
      </div>
    </section>
  );
}
