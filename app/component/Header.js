"use client";

import Link from "next/link";
import { useState } from "react";

function NavDropdown({ label, items, dark }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="whitespace-nowrap hover:opacity-100 opacity-80 transition-opacity"
      >
        {label}
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-20">
          <div
            className={`flex flex-col min-w-[160px] ${
              dark ? "bg-black border border-white/30" : "bg-white border border-black/30"
            }`}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 text-xs normal-case tracking-normal transition-colors ${
                  dark
                    ? "text-white/60 hover:text-white hover:bg-white/5"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ dark = false }) {
  return (
    <header className="w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 py-8">
      <Link href="/" className="text-sm font-mono opacity-80 hover:opacity-100 transition-opacity">
        NK
      </Link>

      <nav className="flex items-center gap-10 text-sm font-mono uppercase tracking-widest">
        <NavDropdown
          label="Work"
          dark={dark}
          items={[
            { href: "/projects", label: "Projects" },
            { href: "/agents", label: "Agents" },
          ]}
        />
        <NavDropdown
          label="More"
          dark={dark}
          items={[
            { href: "/travel", label: "Travel" },
            { href: "/photography", label: "Photography" },
          ]}
        />
      </nav>

      <a
        href="mailto:nathan.knaebel@gmail.com"
        className={`text-sm font-mono border rounded px-4 py-2 whitespace-nowrap transition-all duration-150 ease-out hover:-translate-y-0.5 ${
          dark
            ? "border-white/30 hover:border-white hover:bg-white hover:text-black"
            : "border-black/30 hover:border-black hover:bg-black hover:text-white"
        }`}
      >
        Contact
      </a>
    </header>
  );
}
