"use client";

import { useId, useMemo, useRef, useState } from "react";

// Palette categorielle validee (charte dataviz) : ordre fixe, jamais cycle.
// Les 7 emplacements passent tous les controles (bande de clarte, plancher de
// chroma, separation daltonisme, plancher vision normale) en clair ET en
// sombre. L'ordre n'est pas cosmetique : c'est lui qui garantit la separation
// des couleurs voisines. Ne pas reordonner sans rejouer le validateur.
const SERIES_COLORS = [
  { light: "#2a78d6", dark: "#3987e5" }, // bleu
  { light: "#eb6834", dark: "#d95926" }, // orange
  { light: "#1baf7a", dark: "#199e70" }, // aqua
  { light: "#eda100", dark: "#c98500" }, // jaune
  { light: "#e87ba4", dark: "#d55181" }, // magenta
  { light: "#008300", dark: "#008300" }, // vert
  { light: "#4a3aa7", dark: "#9085e9" }, // violet
];

const PAD = { top: 16, right: 16, bottom: 28, left: 44 };
const VIEW_W = 900;
const VIEW_H = 340;

function niceTicks(max) {
  if (max <= 0) return [0, 1];
  const rough = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? magnitude * 10;
  const ticks = [];
  for (let v = 0; v <= max + step / 2; v += step) ticks.push(Math.round(v));
  return ticks;
}

function formatDay(iso) {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}

export function VisitorsChart({ axis, series, metric }) {
  const clipId = useId();
  const svgRef = useRef(null);
  const [hidden, setHidden] = useState(() => new Set());
  const [hoverIndex, setHoverIndex] = useState(null);

  const visible = series.filter((s) => !hidden.has(s.key));

  const { max, ticks } = useMemo(() => {
    const peak = Math.max(1, ...visible.flatMap((s) => s[metric]));
    const t = niceTicks(peak);
    return { max: t[t.length - 1], ticks: t };
  }, [visible, metric]);

  const plotW = VIEW_W - PAD.left - PAD.right;
  const plotH = VIEW_H - PAD.top - PAD.bottom;

  const xAt = (i) => PAD.left + (axis.length <= 1 ? plotW / 2 : (i / (axis.length - 1)) * plotW);
  const yAt = (v) => PAD.top + plotH - (v / max) * plotH;

  const pathFor = (values) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(2)},${yAt(v).toFixed(2)}`).join(" ");

  function toggle(key) {
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  // Le pointeur vise une date, jamais une ligne de 2px : on accroche l'index
  // le plus proche sur l'axe X (crosshair) plutot que d'exiger un survol pile
  // sur la courbe.
  function handleMove(event) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect || axis.length === 0) return;

    const xInView = ((event.clientX - rect.left) / rect.width) * VIEW_W;
    const ratio = (xInView - PAD.left) / plotW;
    const index = Math.round(ratio * (axis.length - 1));
    setHoverIndex(Math.min(axis.length - 1, Math.max(0, index)));
  }

  const labelStep = Math.max(1, Math.ceil(axis.length / 8));

  return (
    <div className="viz-root">
      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-auto touch-none"
          role="img"
          aria-label={`Evolution du nombre de ${metric === "visitors" ? "visiteurs" : "pages vues"} par projet`}
          onPointerMove={handleMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <defs>
            <clipPath id={clipId}>
              <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} />
            </clipPath>
          </defs>

          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={VIEW_W - PAD.right}
                y1={yAt(t)}
                y2={yAt(t)}
                className="viz-grid"
                strokeWidth="1"
              />
              <text x={PAD.left - 8} y={yAt(t) + 4} textAnchor="end" className="viz-tick">
                {t.toLocaleString("fr-FR")}
              </text>
            </g>
          ))}

          {axis.map((day, i) =>
            i % labelStep === 0 ? (
              <text key={day} x={xAt(i)} y={VIEW_H - 8} textAnchor="middle" className="viz-tick">
                {formatDay(day)}
              </text>
            ) : null,
          )}

          {hoverIndex !== null && (
            <line
              x1={xAt(hoverIndex)}
              x2={xAt(hoverIndex)}
              y1={PAD.top}
              y2={PAD.top + plotH}
              className="viz-crosshair"
              strokeWidth="1"
            />
          )}

          <g clipPath={`url(#${clipId})`}>
            {series.map((s, i) => {
              if (hidden.has(s.key)) return null;
              const color = SERIES_COLORS[i % SERIES_COLORS.length];
              return (
                <path
                  key={s.key}
                  d={pathFor(s[metric])}
                  fill="none"
                  stroke={`var(--series-${i + 1})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ "--c-light": color.light, "--c-dark": color.dark }}
                />
              );
            })}

            {/* Anneau de 2px en couleur de surface : le point reste lisible
                la ou plusieurs courbes se croisent. */}
            {hoverIndex !== null &&
              series.map((s, i) =>
                hidden.has(s.key) ? null : (
                  <circle
                    key={s.key}
                    cx={xAt(hoverIndex)}
                    cy={yAt(s[metric][hoverIndex])}
                    r="4"
                    fill={`var(--series-${i + 1})`}
                    className="viz-dot"
                    strokeWidth="2"
                  />
                ),
              )}
          </g>
        </svg>

        {hoverIndex !== null && visible.length > 0 && (
          <div
            className="pointer-events-none absolute z-10 min-w-[168px] rounded-lg border px-3 py-2 text-xs shadow-lg viz-tooltip"
            style={{
              left: `${(xAt(hoverIndex) / VIEW_W) * 100}%`,
              top: 0,
              transform:
                xAt(hoverIndex) > VIEW_W / 2 ? "translate(calc(-100% - 12px), 0)" : "translate(12px, 0)",
            }}
          >
            <div className="viz-tooltip-date mb-1.5 font-medium">
              {new Date(`${axis[hoverIndex]}T12:00:00Z`).toLocaleDateString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
            {series.map((s, i) =>
              hidden.has(s.key) ? null : (
                <div key={s.key} className="flex items-center gap-2 py-0.5">
                  <span
                    aria-hidden
                    className="inline-block h-[2px] w-3 shrink-0 rounded-full"
                    style={{ background: `var(--series-${i + 1})` }}
                  />
                  <span className="viz-tooltip-value font-semibold tabular-nums">
                    {s[metric][hoverIndex].toLocaleString("fr-FR")}
                  </span>
                  <span className="viz-tooltip-label truncate">{s.label}</span>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* Legende toujours presente des 2 series : l'identite ne repose jamais
          sur la couleur seule. Cliquable pour isoler un projet. */}
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {series.map((s, i) => {
          const isHidden = hidden.has(s.key);
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => toggle(s.key)}
                aria-pressed={!isHidden}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-opacity hover:bg-black/5 dark:hover:bg-white/10 ${
                  isHidden ? "opacity-40" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="inline-block h-[3px] w-4 shrink-0 rounded-full"
                  style={{ background: `var(--series-${i + 1})` }}
                />
                <span className="viz-legend-label">{s.label}</span>
                <span className="viz-legend-value tabular-nums">
                  {(metric === "visitors" ? s.totalVisitors : s.totalPageviews).toLocaleString("fr-FR")}
                </span>
                {s.failed && (
                  <span className="viz-legend-warn" title="Donnees indisponibles pour ce projet">
                    !
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { SERIES_COLORS };
