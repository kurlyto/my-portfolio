"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";

const CONTACTS = [
  { label: "WhatsApp", href: "https://wa.me/33622164758", Icon: WhatsAppIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/nathanknaebel", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/kurlyto", Icon: GitHubIcon },
];

const NAV_SECTIONS = [
  {
    label: "Work",
    items: [
      { href: "/agents", label: "Agents" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    label: "More",
    items: [
      { href: "/travel", label: "Travel" },
      { href: "/photography", label: "Photography" },
    ],
  },
];

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

function ContactIcons({ compact = false, dark = false }) {
  const buttonClass = `flex items-center justify-center rounded-full bg-[#ff6b35] text-black hover:bg-[#e2531f] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150 ease-out ${
    compact ? "w-10 h-10" : "w-9 h-9"
  }`;
  const iconClass = compact ? "w-[18px] h-[18px]" : "w-4 h-4";

  return (
    <div className="flex items-center gap-3">
      <EmailButton className={buttonClass} iconClassName={iconClass} dark={dark} />
      {CONTACTS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor-hover
          className={buttonClass}
        >
          <Icon className={iconClass} />
        </a>
      ))}
    </div>
  );
}

function MobileMenu({ dark }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        data-cursor-hover
        className="flex flex-col items-end gap-1.5 p-1"
      >
        <span className={`block w-6 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
        <span className={`block w-4 h-0.5 ${dark ? "bg-white" : "bg-black"}`} />
      </button>

      {open && (
        <div className={`fixed inset-0 z-50 flex flex-col ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
          <div className="flex items-center justify-between px-4 py-6">
            <Link href="/" className="text-sm font-mono opacity-80" onClick={() => setOpen(false)}>
              NK
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
              data-cursor-hover
              className="text-2xl leading-none px-1"
            >
              &times;
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-10 px-6">
            {NAV_SECTIONS.map((section) => (
              <div key={section.label}>
                <span className="text-xs font-mono uppercase tracking-widest opacity-40">
                  {section.label}
                </span>
                <div className="mt-3 flex flex-col gap-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-3xl font-bold tracking-tight"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-6 py-10 flex justify-center">
            <ContactIcons compact dark={dark} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ dark = false }) {
  return (
    <header className="relative w-full flex items-center justify-between gap-6 max-w-6xl mx-auto px-6 py-8">
      <Link href="/" className="text-sm font-mono opacity-80 hover:opacity-100 transition-opacity">
        NK
      </Link>

      <nav className="hidden sm:flex sm:absolute sm:left-1/2 sm:-translate-x-1/2 items-center gap-10 text-base font-mono uppercase tracking-widest">
        {NAV_SECTIONS.map((section) => (
          <NavDropdown key={section.label} label={section.label} dark={dark} items={section.items} />
        ))}
      </nav>

      <div className="hidden sm:block">
        <ContactIcons dark={dark} />
      </div>

      <MobileMenu dark={dark} />
    </header>
  );
}
