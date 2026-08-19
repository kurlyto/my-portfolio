"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Les trois vues de l'espace prive. L'ordre est celui de la frequence
// d'usage : l'audience est consultee tous les jours, l'ecosysteme se lit
// avant un rendez-vous client.
const TABS = [
  { href: "/admin/audience", label: "Audience" },
  { href: "/admin/comptes", label: "Comptes IA" },
  { href: "/admin/ecosysteme", label: "Ecosysteme IA" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2" aria-label="Sections">
      <div className="viz-controls inline-flex rounded-full border p-0.5">
        {TABS.map((tab) => {
          // Comparaison exacte : /stats ne doit pas s'allumer quand on est
          // sur /stats/comptes, qui commence pourtant par le meme chemin.
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
