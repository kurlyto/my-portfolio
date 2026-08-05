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
// `short` evite que "Visiteurs uniques" passe sur deux lignes et deforme la
// pilule sur les petits ecrans.
const METRICS = [
  { key: "visitors", label: "Visiteurs uniques", short: "Uniques", noun: "visiteurs uniques" },
  { key: "visits", label: "Visites", short: "Visites", noun: "visites" },
  { key: "pageviews", label: "Pages vues", short: "Pages", noun: "pages vues" },
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

// Les series changent lentement (agregation au jour) : une minute suffit.
const REFRESH_MS = 60 * 1000;
// Umami compte les actifs sur une fenetre glissante de 5 min ; 15 s donne un
// compteur qui reagit sans marteler le serveur.
const ACTIVE_REFRESH_MS = 15 * 1000;

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
  const [active, setActive] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // `silent` distingue le rafraichissement automatique du changement de
  // periode : un refresh de fond ne doit ni griser le graphique ni afficher
  // une erreur passagere par-dessus des chiffres encore valables.
  const load = useCallback(async (range, { silent = false } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await fetch(`/api/stats?days=${range}`);
      if (!res.ok) throw new Error((await res.json())?.error ?? "Erreur inconnue");
      setData(await res.json());
      setError(null);
      setLastUpdate(Date.now());
    } catch (err) {
      if (!silent) setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(days);
  }, [days, load]);

  // Rafraichissement automatique des series, en arriere-plan.
  //
  // Suspendu quand l'onglet est masque : inutile d'interroger Umami toutes
  // les minutes pour un onglet que personne ne regarde, et au retour on
  // recharge immediatement plutot que d'afficher des chiffres figes.
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) load(days, { silent: true });
    }, REFRESH_MS);

    const onVisible = () => {
      if (!document.hidden) load(days, { silent: true });
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [days, load]);

  // Compteur temps reel, sur son propre rythme : il doit rester vivant meme
  // entre deux rafraichissements des courbes.
  useEffect(() => {
    let cancelled = false;

    const fetchActive = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/stats/active");
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled) setActive(json);
      } catch {
        // Silencieux : le compteur est un bonus, pas une donnee critique.
      }
    };

    fetchActive();
    const timer = setInterval(fetchActive, ACTIVE_REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

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
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="viz-mono viz-text-muted text-[11px]">Analytics</p>
          {active && active.total > 0 && (
            <span
              className="viz-mono viz-live text-[11px] font-bold"
              title={active.byProject.map((p) => `${p.label} : ${p.active}`).join(" - ")}
            >
              <span aria-hidden className="viz-live-dot" />
              {active.total} en ligne
            </span>
          )}
        </div>
        <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl viz-text-primary">
          Audience
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed viz-text-secondary">
          Tous mes projets, sur un meme graphique.
        </p>
      </header>

      {/* Les filtres scopent tout ce qui est en dessous : une seule rangee,
          au-dessus du contenu, jamais dans la carte du graphique. */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <div className="viz-controls inline-flex rounded-full border p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.days}
              type="button"
              onClick={() => setDays(r.days)}
              aria-pressed={days === r.days}
              className="viz-control rounded-full px-4 py-2 transition-colors"
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="viz-controls inline-flex rounded-full border p-0.5">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMetric(m.key)}
              aria-pressed={metric === m.key}
              className="viz-control whitespace-nowrap rounded-full px-4 py-2 transition-colors"
            >
              <span className="sm:hidden">{m.short}</span>
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="border border-[#d03b3b] px-4 py-3 text-sm text-[#d03b3b]">{error}</div>
      )}

      {data && (
        <>
          {/* Un seul chiffre-heros par vue, dans la serif display du site. */}
          <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-display text-6xl font-bold leading-none viz-text-primary sm:text-7xl">
              {compact(totalCurrent)}
            </span>
            <span className="viz-mono text-[11px] viz-text-muted">
              {metricNoun} / {days} jours
            </span>
            {delta !== null && (
              <span
                className={`viz-mono text-[11px] font-bold ${delta >= 0 ? "viz-delta-up" : "viz-delta-down"}`}
              >
                {delta >= 0 ? "+" : ""}
                {delta}% vs periode precedente
              </span>
            )}
          </div>

          {/* Pendant un rechargement, le graphique garde son rendu precedent en
              opacite reduite : pas de skeleton, pas de saut de mise en page. */}
          <div className={`p-4 transition-opacity sm:p-6 viz-surface ${loading ? "opacity-60" : ""}`}>
            <VisitorsChart axis={data.axis} series={data.series} metric={metric} />
          </div>

          {/* Umami n'expose pas de serie journaliere des visites : la courbe
              est la meme que celle des visiteurs uniques, seul le total
              change. Le dire plutot que laisser croire a deux courbes
              differentes. */}
          {metric === "visits" && (
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed viz-text-muted">
              Le total est le nombre exact de visites. La courbe, elle, montre les visiteurs
              uniques par jour : Umami ne publie pas de detail journalier des visites.
            </p>
          )}

          {failed.length > 0 && (
            <p className="mt-4 text-[13px] viz-text-muted">
              Donnees indisponibles pour : {failed.map((s) => s.label).join(", ")}.
            </p>
          )}
          {data.stale && (
            <p className="mt-4 text-[13px] viz-text-muted">
              Umami est injoignable : chiffres issus du dernier cache.
            </p>
          )}

          {lastUpdate && (
            <p className="viz-mono mt-4 text-[10px] viz-text-muted">
              Mis a jour a{" "}
              {new Date(lastUpdate).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" - actualisation automatique"}
            </p>
          )}

          {/* Vue tableau : garantit que toute valeur reste accessible sans
              survol (regle de secours imposee par le contraste de certaines
              teintes claires en mode clair). */}
          <details className="mt-6">
            <summary className="viz-summary cursor-pointer">
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

      {!data && !error && <div className="h-64 animate-pulse bg-black/5" />}
    </div>
  );
}
