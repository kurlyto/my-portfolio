"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    setEnabled(canHover);
    if (!canHover) return undefined;

    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleOver = (e) => {
      setHovering(Boolean(e.target.closest("a, button, [data-cursor-hover]")));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200 ease-out"
      style={{
        width: hovering ? 48 : 20,
        height: hovering ? 48 : 20,
        backgroundColor: hovering ? "rgba(255,255,255,0.15)" : "transparent",
        mixBlendMode: "difference",
      }}
    />
  );
}
