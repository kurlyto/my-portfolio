"use client";

import Link from "next/link";
import { useState } from "react";
import { AGENTS } from "../agents/agents-data";
import { AGENT_PITCHES } from "./agent-pitches";

// Agents disposant d'un portrait dans public/images/agents/. Les autres
// tombent sur l'initiale : meme regle que la page /agents.
const AGENTS_WITH_PHOTO = new Set([
  "didier",
  "marcel",
  "simone",
  "hugo",
  "kylian",
  "camille",
  "mike",
  "lea",
  "soul",
  "nate",
  "jensen",
  "ousmane",
]);

function AgentCard({ agent }) {
  const hasPhoto = AGENTS_WITH_PHOTO.has(agent.slug);
  const pitch = AGENT_PITCHES[agent.slug];
  const label = pitch?.label ?? `Agent ${agent.title}`;
  const text = pitch?.pitch ?? agent.shortDescription;

  return (
    <Link
      href="/agents"
      data-cursor-hover
      className="group shrink-0 w-[420px] rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 flex flex-col transition-all duration-300 hover:border-[#ff6b35]/50 hover:from-white/[0.11] hover:-translate-y-1"
    >
      <div className="flex items-center gap-5">
        <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center ring-1 ring-white/10">
          {hasPhoto ? (
            <img
              src={`/images/agents/${agent.slug}.png`}
              alt={agent.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-2xl opacity-40">{agent.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-tight text-[#ff6b35]">{label}</p>
          <p className="text-[12px] font-mono uppercase tracking-widest opacity-50 mt-1">
            {agent.name}
          </p>
        </div>
      </div>

      <p className="mt-6 text-[16px] leading-relaxed opacity-80">{text}</p>
    </Link>
  );
}

export default function AgentMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = [...AGENTS, ...AGENTS];

  return (
    <section className="bg-black text-white py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b35]">
          Cas d&apos;usage
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl text-balance">
          Des milliers de cas d&apos;usage. Quel est le vôtre ?
        </h2>
        <p className="mt-4 text-sm md:text-base opacity-60 max-w-xl">
          Voici des agents déjà construits. Le vôtre sera différent : il sera
          fait pour vous.
        </p>
      </div>

      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 z-10 bg-gradient-to-l from-black to-transparent" />

        <div className="overflow-hidden">
          <div
            className="flex items-stretch gap-5 w-max"
            style={{
              animation: "marquee 140s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {doubled.map((agent, i) => (
              <AgentCard key={`${agent.slug}-${i}`} agent={agent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
