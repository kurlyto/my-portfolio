"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/audience", label: "Audience" },
  { href: "/admin/comptes", label: "Comptes IA" },
  { href: "/admin/ecosysteme", label: "Écosystème IA" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2" aria-label="Sections">
      <div className="viz-controls inline-flex rounded-full border p-0.5">
        {TABS.map((tab) => {
          // Comparaison exacte plutôt que startsWith : chaque onglet a son
          // propre chemin complet, aucun n'est le préfixe d'un autre.
          const current = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={current ? "page" : undefined}
              aria-pressed={current}
              className="viz-control whitespace-nowrap rounded-full px-4 py-2 transition-colors"
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
