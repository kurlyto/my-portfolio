"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TOOL_ICONS } from "./tool-icons";

function ToolIcon({ tool, size }) {
  const [hovered, setHovered] = useState(false);
  const Icon = TOOL_ICONS[tool];

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-black/15 text-black/50 transition-all duration-150 ease-out hover:border-[#ff6b35] hover:text-[#ff6b35] hover:-translate-y-0.5 ${size}`}
      >
        {Icon ? <Icon className="w-[55%] h-[55%]" /> : (
          <span className="text-[9px] font-mono">{tool.charAt(0)}</span>
        )}
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 whitespace-nowrap"
          >
            <div className="bg-black text-white text-[11px] font-mono px-2.5 py-1.5 rounded shadow-lg">
              {tool}
            </div>
            <div className="w-2 h-2 bg-black rotate-45 mx-auto -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ToolStack({ tools, size = "w-7 h-7" }) {
  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      {tools.map((tool) => (
        <ToolIcon key={tool} tool={tool} size={size} />
      ))}
    </div>
  );
}
