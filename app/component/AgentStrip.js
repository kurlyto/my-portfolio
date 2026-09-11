"use client";

import { AGENTS } from "../agents/agents-data";
import { AGENT_PITCHES } from "./agent-pitches";
import { AGENTS_WITH_PHOTO, HIDDEN_FROM_SHOWCASE } from "./AgentMarquee";

// Bande d'agents qui defile dans la passerelle "L'autre offre" du site Foxy
// (demande de Nathan, 11/09) : montrer des agents deja construits dit "ca
// existe" mieux qu'une phrase. Version legere de AgentMarquee (portrait +
// nom du metier) : ici c'est un teaser, la vitrine complete vit sur /agents.
//
// Decorative (aria-hidden, sans lien) : le bouton a cote reste LE chemin vers
// les agents, un defilement de liens serait inaccessible au clavier.
const SHOWN = AGENTS.filter(
  (a) => AGENTS_WITH_PHOTO.has(a.slug) && !HIDDEN_FROM_SHOWCASE.has(a.slug) && AGENT_PITCHES[a.slug]
);

export default function AgentStrip() {
  const doubled = [...SHOWN, ...SHOWN];

  return (
    <div
      aria-hidden
      className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      {/* Espacement porte par chaque carte (pr-3) et non par un gap : avec un
          gap, -50% tomberait a une demi-marge du depart et la boucle sauterait. */}
      <div className="flex w-max" style={{ animation: "marquee 60s linear infinite" }}>
        {doubled.map((agent, i) => (
          <div key={`${agent.slug}-${i}`} className="pr-3 shrink-0">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] py-1.5 pl-1.5 pr-5">
              {/* Version -sm.webp (1-2 Ko) et non le .png (~1 Mo) : pour une
                  pastille de 36 px, les PNG faisaient 10 Mo sur mobile. Pas de
                  lazy : dans une piste masquee, le navigateur les chargeait trop
                  tard et la bande defilait avec des trous. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- portrait
                  local a taille fixe. */}
              <img
                src={`/images/agents/${agent.slug}-sm.webp`}
                alt=""
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="whitespace-nowrap text-[13px] font-mono text-white/80">
                {AGENT_PITCHES[agent.slug].label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
