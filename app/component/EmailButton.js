"use client";

import { useEffect, useRef, useState } from "react";
import { MailIcon } from "./icons";

export const EMAIL = "nathan.knaebel@gmail.com";

const SUBJECT = "Contact via nathan-knaebel.com";

export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

const WEBMAILS = [
  {
    label: "Gmail",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      EMAIL
    )}&su=${encodeURIComponent(SUBJECT)}`,
  },
  {
    label: "Outlook",
    href: `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      EMAIL
    )}&subject=${encodeURIComponent(SUBJECT)}`,
  },
  {
    label: "Application mail",
    href: MAILTO,
    native: true,
  },
];

export default function EmailButton({ className, iconClassName, dark = false }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef(null);

  // Sur tactile, mailto: ouvre le sélecteur d'applis natif du téléphone : on
  // laisse l'OS faire le choix plutôt que d'afficher notre menu de webmails.
  // Détecté après montage pour ne pas casser l'hydratation.
  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const hasTouchPoints = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    setIsTouch(coarse || hasTouchPoints);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Le badge "Copié" disparaît tout seul, sans refermer le menu.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Contexte non sécurisé ou permission refusée : repli sur une sélection manuelle.
      const field = document.createElement("textarea");
      field.value = EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
  }

  const panelTone = dark
    ? "bg-black border-white/30 text-white"
    : "bg-white border-black/30 text-black";
  const itemTone = dark
    ? "text-white/70 hover:text-white hover:bg-white/5"
    : "text-black/70 hover:text-black hover:bg-black/5";

  if (isTouch) {
    return (
      <a href={MAILTO} aria-label="Email" data-cursor-hover className={className}>
        <MailIcon className={iconClassName} />
      </a>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Email"
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor-hover
        className={className}
      >
        <MailIcon className={iconClassName} />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-full right-0 mt-3 z-30 min-w-[190px] border ${panelTone}`}
        >
          {WEBMAILS.map(({ label, href, native }) => (
            <a
              key={label}
              href={href}
              role="menuitem"
              target={native ? undefined : "_blank"}
              rel={native ? undefined : "noopener noreferrer"}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-xs normal-case tracking-normal transition-colors ${itemTone}`}
            >
              {label}
            </a>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={copyEmail}
            className={`block w-full text-left px-4 py-2.5 text-xs normal-case tracking-normal border-t transition-colors ${itemTone} ${
              dark ? "border-white/15" : "border-black/15"
            }`}
          >
            {copied ? "Copié !" : "Copier l'adresse"}
          </button>
        </div>
      )}
    </div>
  );
}
