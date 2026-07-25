"use client";

import Link from "next/link";
import { useState } from "react";

function NavDropdown({ label, items }) {
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
          <div className="flex flex-col bg-black border border-white/30 min-w-[160px]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 text-xs normal-case tracking-normal text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 py-8">
      <Link href="/" className="text-sm font-mono opacity-80 hover:opacity-100 transition-opacity">
        NK
      </Link>

      <nav className="flex items-center gap-10 text-sm font-mono uppercase tracking-widest">
        <NavDropdown
          label="Work"
          items={[
            { href: "/projects", label: "Projects" },
            { href: "/agents", label: "Agents" },
          ]}
        />
        <NavDropdown
          label="More"
          items={[
            { href: "/travel", label: "Travel" },
            { href: "/photography", label: "Photography" },
          ]}
        />
      </nav>

      <a
        href="mailto:nathan.knaebel@gmail.com"
        className="text-sm font-mono border border-white/30 rounded px-4 py-2 whitespace-nowrap transition-all duration-150 ease-out hover:border-white hover:bg-white hover:text-black hover:-translate-y-0.5"
      >
        Contact
      </a>
    </header>
  );
}
