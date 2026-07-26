"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AGENTS } from "./agents-data";

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
  "jenseng",
]);

function Avatar({ agent, className }) {
  if (AGENTS_WITH_PHOTO.has(agent.slug)) {
    return (
      <div className={`relative shrink-0 rounded overflow-hidden ${className}`}>
        <Image
          src={`/images/agents/${agent.slug}.png`}
          alt={agent.name}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 rounded border border-black/15 bg-black/[0.03] flex items-center justify-center font-mono opacity-30 ${className}`}
    >
      {agent.name.charAt(0)}
    </div>
  );
}

function AgentChip({ agent, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      className={`flex items-center gap-2 shrink-0 rounded-full border px-3 py-1.5 text-xs font-mono transition-all duration-150 ease-out ${
        active
          ? "border-black bg-black text-white"
          : "border-black/20 opacity-60 hover:opacity-100 hover:border-black/50"
      }`}
    >
      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
        {agent.name.charAt(0)}
      </span>
      {agent.title}
    </button>
  );
}

function AgentDetail({ agent }) {
  return (
    <motion.div
      key={agent.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 border border-black/10 p-8"
    >
      <Avatar agent={agent} className="w-28 aspect-[2/3] text-lg mx-auto sm:mx-0" />
      <div>
        <span className="text-xs font-mono uppercase tracking-widest opacity-40">
          {agent.name}
        </span>
        <h3 className="mt-1 text-2xl font-bold leading-snug">{agent.title}</h3>
        <p className="mt-4 text-base opacity-80 leading-relaxed">{agent.longDescription}</p>

        <div className="mt-5 border-l-2 border-black/10 pl-4">
          <p className="text-sm italic opacity-70 leading-relaxed">{agent.useCase}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {agent.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-mono border border-black/20 rounded px-2.5 py-1 opacity-70"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-black/10 flex flex-col gap-1 text-xs font-mono opacity-50">
          <span>format : {agent.format.toLowerCase()}</span>
          <span>canal : {agent.channel.toLowerCase()}</span>
        </div>
      </div>
    </motion.div>
  );
}

function DesktopExplorer() {
  const [focusedSlug, setFocusedSlug] = useState(null);
  const focused = AGENTS.find((a) => a.slug === focusedSlug);

  if (focused) {
    return (
      <div>
        <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-black/10">
          {AGENTS.map((agent) => (
            <AgentChip
              key={agent.slug}
              agent={agent}
              active={agent.slug === focusedSlug}
              onClick={() => setFocusedSlug(agent.slug)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setFocusedSlug(null)}
          data-cursor-hover
          className="mb-6 text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
        >
          &larr; retour a la grille
        </button>

        <AnimatePresence mode="wait">
          <AgentDetail agent={focused} />
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-14 gap-y-20">
      {AGENTS.map((agent) => (
        <button
          type="button"
          key={agent.slug}
          onClick={() => setFocusedSlug(agent.slug)}
          data-cursor-hover
          className="group flex flex-col text-left transition-transform duration-200 ease-out hover:-translate-y-1 cursor-pointer"
        >
          <h2 className="text-lg font-bold leading-snug">{agent.title}</h2>

          <div className="mt-4 flex items-start gap-4">
            <Avatar
              agent={agent}
              className="w-20 aspect-[2/3] text-sm transition-transform duration-200 ease-out group-hover:scale-105"
            />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                {agent.name}
              </span>
              <p className="mt-1 text-sm opacity-70 leading-relaxed">{agent.shortDescription}</p>
              <span className="mt-2 inline-block text-xs font-mono underline opacity-60 group-hover:opacity-100">
                En savoir plus
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function MobileExplorer() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const agent = AGENTS[index];

  const goTo = (i) => {
    setExpanded(false);
    setIndex((i + AGENTS.length) % AGENTS.length);
  };

  const handleDragEnd = (_e, info) => {
    if (info.offset.x < -60) goTo(index + 1);
    else if (info.offset.x > 60) goTo(index - 1);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={agent.slug}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="border border-black/10 p-6"
        >
          <h2 className="text-lg font-bold leading-snug">{agent.title}</h2>

          <div className="mt-4 flex items-start gap-4">
            <Avatar agent={agent} className="w-16 aspect-[2/3] text-sm" />
            <div>
              <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                {agent.name}
              </span>
              <p className="mt-1 text-sm opacity-70 leading-relaxed">{agent.shortDescription}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 text-xs font-mono underline opacity-60"
          >
            {expanded ? "voir moins" : "En savoir plus"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 overflow-hidden"
            >
              <div className="pt-4 border-t border-black/10">
                <p className="text-sm opacity-80 leading-relaxed">{agent.longDescription}</p>
                <p className="mt-3 text-sm italic opacity-70 leading-relaxed border-l-2 border-black/10 pl-3">
                  {agent.useCase}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono border border-black/20 rounded px-2.5 py-1 opacity-70"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          className="text-xs font-mono opacity-50"
          aria-label="Agent précédent"
        >
          &larr; précédent
        </button>
        <div className="flex gap-1.5">
          {AGENTS.map((a, i) => (
            <button
              key={a.slug}
              type="button"
              aria-label={`Voir ${a.title}`}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-black" : "bg-black/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          className="text-xs font-mono opacity-50"
          aria-label="Agent suivant"
        >
          suivant &rarr;
        </button>
      </div>
    </div>
  );
}

export default function AgentsExplorer() {
  return (
    <>
      <div className="hidden sm:block">
        <DesktopExplorer />
      </div>
      <div className="sm:hidden">
        <MobileExplorer />
      </div>
    </>
  );
}
