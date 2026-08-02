"use client";

import { useCallback, useEffect, useState } from "react";
import { VisitorsChart } from "./VisitorsChart";

const RANGES = [
  { days: 7, label: "7 jours" },
  { days: 30, label: "30 jours" },
  { days: 90, label: "90 jours" },
];

// Definitions d'Umami (getWebsiteSessionStats.ts) :
//   visiteurs uniques = count(distinct session_id)
//   visites           = count(distinct visit_id)
// Une personne qui revient plus tard compte 1 visiteur mais 2 visites.
const METRICS = [
  { key: "visitors", label: "Visiteurs uniques", noun: "visiteurs uniques" },
  { key: "visits", label: "Visites", noun: "visites" },
  { key: "pageviews", label: "Pages vues", noun: "pages vues" },
];

const TOTAL_FIELD = {
  visitors: "totalVisitors",
  visits: "totalVisits",
  pageviews: "totalPageviews",
};

const PREVIOUS_FIELD = {
  visitors: "previousVisitors",
  visits: "previousVisits",
  pageviews: "previousPageviews",
};

function compact(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(1).replace(".0", "")}K`;
  return n.toLocaleString("fr-FR");
}

export function StatsDashboard() {
  const [days, setDays] = useState(30);
  const [metric, setMetric] = useState("visitors");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (range) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stats?days=${range}`);
      if (!res.ok) throw new Error((await res.json())?.error ?? "Erreur inconnue");
      setData(await res.json());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(days);
  }, [days, load]);

  // Les totaux viennent de /stats (comptage exact sur la periode), jamais
  // d'une somme des series journalieres : additionner les visiteurs uniques
  // de chaque jour recompte la meme personne a chaque retour.
  const totalCurrent = data?.series.reduce((sum, s) => sum + s[TOTAL_FIELD[metric]], 0) ?? 0;
  const totalPrevious = data?.series.reduce((sum, s) => sum + s[PREVIOUS_FIELD[metric]], 0) ?? 0;

  // Seuil volontaire : sous 30 sur la periode precedente, le pourcentage
  // devient absurde (passer de 5 a 26 affiche "+420%" et donne l'illusion
  // d'une explosion d'audience). Tant qu'un projet vient d'etre instrumente,
  // mieux vaut ne rien afficher qu'un chiffre trompeur.
  const MIN_BASE_FOR_DELTA = 30;
  const delta =
    totalPrevious >= MIN_BASE_FOR_DELTA
      ? Math.round(((totalCurrent - totalPrevious) / totalPrevious) * 100)
      : null;

  const metricNoun = METRICS.find((m) => m.key === metric)?.noun ?? "";

  const failed = data?.series.filter((s) => s.failed) ?? [];

  return (
    <div className="viz-page mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl viz-text-primary">Audience</h1>
        <p className="mt-1 text-sm viz-text-muted">Tous les projets, sur un meme graphique.</p>
      </header>

      {/* Les filtres scopent tout ce qui est en dessous : une seule rangee,
          au-dessus du contenu, jamais dans la carte du graphique. */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="viz-controls inline-flex rounded-lg border p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              aria-pressed={days === r.days}
              className="viz-control rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="viz-controls inline-flex rounded-lg border p-0.5">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMetric(m.key)}
              aria-pressed={metric === m.key}
              className="viz-control rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </div>
      )}

      {data && (
        <>
          {/* Un seul chiffre-heros par vue. */}
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-5xl font-semibold tracking-tight viz-text-primary">{compact(totalCurrent)}</span>
            <span className="text-sm viz-text-muted">
              {metricNoun} sur {days} jours
            </span>
            {delta !== null && (
              <span className={`text-sm font-medium ${delta >= 0 ? "viz-delta-up" : "viz-delta-down"}`}>
                {delta >= 0 ? "+" : ""}
                {delta}% vs {days} jours precedents
              </span>
            )}
          </div>

          {/* Pendant un rechargement, le graphique garde son rendu precedent en
              opacite reduite : pas de skeleton, pas de saut de mise en page. */}
          <div
            className={`rounded-xl p-4 transition-opacity sm:p-5 viz-surface ${loading ? "opacity-60" : ""}`}
          >
            <VisitorsChart axis={data.axis} series={data.series} metric={metric} />
          </div>

          {/* Umami n'expose pas de serie journaliere des visites : la courbe
              est la meme que celle des visiteurs uniques, seul le total
              change. Le dire plutot que laisser croire a deux courbes
              differentes. */}
          {metric === "visits" && (
            <p className="mt-3 text-xs viz-text-muted">
              Le total est le nombre exact de visites. La courbe, elle, montre les visiteurs
              uniques par jour : Umami ne publie pas de detail journalier des visites.
            </p>
          )}

          {failed.length > 0 && (
            <p className="mt-3 text-xs viz-text-muted">
              Donnees indisponibles pour : {failed.map((s) => s.label).join(", ")}.
            </p>
          )}
          {data.stale && (
            <p className="mt-3 text-xs viz-text-muted">
              Umami est injoignable : chiffres issus du dernier cache.
            </p>
          )}

          {/* Vue tableau : garantit que toute valeur reste accessible sans
              survol (regle de secours imposee par le contraste de certaines
              teintes claires en mode clair). */}
          <details className="mt-6">
            <summary className="viz-summary cursor-pointer text-sm">
              Voir le tableau
            </summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="viz-table-head border-b text-left">
                    <th className="py-2 pr-4 font-medium">Projet</th>
                    <th className="py-2 pr-4 text-right font-medium">Visiteurs uniques</th>
                    <th className="py-2 pr-4 text-right font-medium">Visites</th>
                    <th className="py-2 text-right font-medium">Pages vues</th>
                  </tr>
                </thead>
                <tbody>
                  {data.series.map((s) => (
                    <tr key={s.key} className="viz-table-row border-b">
                      <td className="py-2 pr-4">{s.label}</td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {s.totalVisitors.toLocaleString("fr-FR")}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {s.totalVisits.toLocaleString("fr-FR")}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {s.totalPageviews.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      )}

      {!data && !error && <div className="h-64 animate-pulse rounded-xl bg-black/5 dark:bg-white/5" />}
    </div>
  );
}
