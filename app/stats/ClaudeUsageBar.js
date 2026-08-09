"use client";

import { useEffect, useState } from "react";

// Rafraichi moins souvent que les stats d'audience : chaque appel spawn le
// CLI claude 3 fois (1-2s chacun), pas la peine de le faire toutes les minutes.
const REFRESH_MS = 3 * 60 * 1000;

// Meme slot de couleurs que la charte dataviz du site (stats.css --series-*),
// dans l'ordre : orange, bleu, vert.
const SERIES_COLORS = ["#ff6b35", "#2a78d6", "#1baf7a"];

// Toute la carte parle en % RESTANT, jamais en % consomme : un compte a
// 100% consomme (donc 0% restant, inutilisable) ne doit JAMAIS afficher un
// segment plein ou un "100%" qui se lirait comme "tout va bien".
function accountConsumedPct(account) {
  if (account.error) return null;
  const { sessionPct, weekPct } = account;
  if (sessionPct == null && weekPct == null) return null;
  return Math.max(sessionPct ?? 0, weekPct ?? 0);
}

function remainingPct(pct) {
  return pct == null ? null : Math.max(0, 100 - pct);
}

// Mode A : chaque segment = part de CE compte dans la marge encore
// disponible totale (100 - consomme, normalise sur 3 comptes). Repond a
// "% total restant" : la barre entiere = la capacite qu'il reste, tous
// comptes confondus.
function remainingShareWidths(accounts) {
  const remaining = accounts.map((a) => remainingPct(accountConsumedPct(a)) ?? 0);
  const total = remaining.reduce((s, v) => s + v, 0);
  if (total <= 0) return accounts.map(() => 0);
  return remaining.map((v) => (v / total) * 100);
}

function AccountTooltip({ account }) {
  if (account.error) {
    return <>{account.label} : indisponible ({account.error})</>;
  }
  const parts = [];
  if (account.sessionPct != null) parts.push(`session ${remainingPct(account.sessionPct)}% restant`);
  if (account.weekPct != null) parts.push(`semaine ${remainingPct(account.weekPct)}% restant`);
  if (account.weekResetLabel) parts.push(`reset ${account.weekResetLabel}`);
  return (
    <>
      {account.label} : {parts.join(" · ") || "pas de donnees"}
    </>
  );
}

function RemainingShareBar({ accounts }) {
  const widths = remainingShareWidths(accounts);
  return (
    <div className="viz-surface flex h-8 w-full overflow-hidden">
      {accounts.map((a, i) => {
        const remaining = remainingPct(accountConsumedPct(a));
        const w = widths[i];
        if (w <= 0) return null;
        return (
          <div
            key={a.key}
            className="group relative flex h-full items-center justify-center transition-opacity hover:opacity-90"
            style={{ width: `${w}%`, background: SERIES_COLORS[i] }}
          >
            <span className="viz-mono pointer-events-none text-[10px] font-bold text-white opacity-90">
              {remaining != null ? `${remaining}%` : ""}
            </span>
            <div className="viz-tooltip viz-mono pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[10px] normal-case opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <AccountTooltip account={a} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Une jauge "% restant" : le rempli represente la marge encore disponible,
// pas la consommation. Meme lecture que RemainingShareBar (rempli = bon
// signe), juste appliquee a UNE seule fenetre (semaine ou session) a la fois.
//
// `dimmed` : la semaine est a 0% restant, donc le compte est inutilisable
// quoi que dise la session (elle peut etre fraiche, ca ne change rien au
// fait qu'on ne peut plus appeler ce compte). Le vrai chiffre reste affiche
// (jamais invente un 0% qui serait faux), mais la jauge passe en gris pour
// dire "cette ligne ne compte plus tant que la semaine n'a pas reset".
function RemainingGauge({ pctRemaining, color, label, dimmed = false }) {
  const value = pctRemaining ?? 0;
  const fillColor = dimmed ? "var(--text-muted)" : color;
  return (
    <div className={`flex items-center gap-2 ${dimmed ? "opacity-50" : ""}`}>
      <span className="viz-mono w-14 shrink-0 text-[9px] viz-text-muted">{label}</span>
      <div className="viz-surface relative h-4 flex-1 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 transition-[width]"
          style={{ width: `${value}%`, background: fillColor }}
        />
      </div>
      <span className="viz-mono w-9 shrink-0 text-right text-[10px] font-bold viz-text-primary">
        {pctRemaining != null ? `${pctRemaining}%` : "?"}
      </span>
    </div>
  );
}

// Mode B : chaque compte occupe toujours 1/3 de la largeur, avec 2 jauges
// distinctes (semaine, session) : un compte peut avoir une session fraiche
// (0% consomme) mais une semaine epuisee (100% consomme), et l'inverse
// serait faux a fusionner en un seul chiffre.
function PerAccountBar({ accounts }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {accounts.map((a, i) => {
        const weekRemaining = remainingPct(a.weekPct);
        // Semaine epuisee = le compte est inutilisable point final ; la
        // session (qui reset toutes les ~5h) redevient hors-sujet tant que
        // la fenetre hebdo n'a pas reset elle-meme.
        const weekExhausted = weekRemaining === 0;
        return (
          <div key={a.key} className="viz-surface group relative space-y-1.5 p-3">
            <p className="viz-mono text-[10px] font-bold viz-text-primary">{a.label}</p>
            <RemainingGauge
              pctRemaining={remainingPct(a.sessionPct)}
              color={SERIES_COLORS[i]}
              label="Session"
              dimmed={weekExhausted}
            />
            <RemainingGauge
              pctRemaining={weekRemaining}
              color={SERIES_COLORS[i]}
              label="Semaine"
            />
            <div className="viz-tooltip viz-mono pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max -translate-x-1/2 whitespace-nowrap px-2 py-1 text-[10px] normal-case opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
              <AccountTooltip account={a} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ClaudeUsageBar() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("remaining"); // "remaining" | "fixed"

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/stats/claude-usage");
        if (!res.ok) throw new Error((await res.json())?.error ?? "Erreur inconnue");
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    };

    load();
    const timer = setInterval(() => {
      if (!document.hidden) load();
    }, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  const accounts = data?.accounts ?? [];
  const totalRemainingPct =
    accounts.length > 0
      ? Math.round(
          accounts.reduce((sum, a) => sum + (remainingPct(accountConsumedPct(a)) ?? 0), 0) /
            accounts.length,
        )
      : null;

  return (
    <div className="viz-surface mb-8 p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <p className="viz-mono viz-text-muted text-[11px]">Comptes Claude</p>
          {totalRemainingPct !== null && (
            <span className="viz-mono text-[11px] font-bold viz-text-primary">
              {totalRemainingPct}% restant
            </span>
          )}
        </div>
        <div className="viz-controls inline-flex rounded-full border p-0.5">
          {[
            { key: "remaining", label: "Marge restante" },
            { key: "fixed", label: "Par compte" },
          ].map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              aria-pressed={mode === m.key}
              className="viz-control rounded-full px-3 py-1.5 transition-colors"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-[13px] text-[#d03b3b]">{error}</p>}

      {!error && accounts.length === 0 && (
        <div className="h-8 w-full animate-pulse bg-black/5" />
      )}

      {!error && accounts.length > 0 && (
        <>
          {mode === "remaining" ? (
            <RemainingShareBar accounts={accounts} />
          ) : (
            <PerAccountBar accounts={accounts} />
          )}
          <div className="viz-mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] viz-text-muted">
            {accounts.map((a, i) => (
              <span key={a.key} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: SERIES_COLORS[i] }}
                />
                {a.label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
