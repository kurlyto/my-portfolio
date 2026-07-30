"use client";

import Link from "next/link";
import { useState } from "react";
import { AGENTS } from "../agents/agents-data";

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
]);

function AgentCard({ agent }) {
  const hasPhoto = AGENTS_WITH_PHOTO.has(agent.slug);

  return (
    <Link
      href="/agents"
      data-cursor-hover
      className="group shrink-0 w-[300px] border border-white/15 bg-white/[0.03] p-5 flex gap-4 transition-colors duration-200 hover:border-[#ff6b35]/60 hover:bg-white/[0.06]"
    >
      <div className="shrink-0 w-16 aspect-[2/3] rounded overflow-hidden bg-white/10 flex items-center justify-center">
        {hasPhoto ? (
          <img
            src={`/images/agents/${agent.slug}.png`}
            alt={agent.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-mono text-lg opacity-40">{agent.name.charAt(0)}</span>
        )}
      </div>

      <div className="min-w-0 flex flex-col">
        <p className="text-sm font-bold leading-tight">{agent.name}</p>
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#ff6b35] mt-0.5">
          {agent.title}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed opacity-60 line-clamp-4">
          {agent.shortDescription}
        </p>
      </div>
    </Link>
  );
}

export default function AgentMarquee() {
  const [paused, setPaused] = useState(false);
  const doubled = [...AGENTS, ...AGENTS];

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
          Voici des agents deja construits. Le vôtre sera different : il sera
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
            className="flex gap-4 w-max"
            style={{
              animation: "marquee 70s linear infinite",
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
