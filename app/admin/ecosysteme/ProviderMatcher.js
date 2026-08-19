"use client";

import { useMemo, useState } from "react";
import { ComparisonTable } from "./ComparisonTable";
import { CRITERIA, USAGE_LEVELS, CHANNEL_CRITERIA } from "../data/criteria";
import { recommend } from "../data/recommend";

// Barre de contraintes collante + montage recommandé + tableau filtré.
//
// Composant client obligatoire : les règles d'exclusion sont des fonctions,
// et une page serveur ne peut pas en passer à un composant client. Elles
// sont donc importées ici, pas reçues en props.
export function ProviderMatcher({ columns, rows }) {
  const [active, setActive] = useState([]);
  const [usage, setUsage] = useState("medium");
  const [channel, setChannel] = useState(null);
  const [showExcluded, setShowExcluded] = useState(false);

  const toggle = (id) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const { visible, excludedCount } = useMemo(() => {
    const selected = CRITERIA.filter((c) => active.includes(c.id));
    if (selected.length === 0) return { visible: rows, excludedCount: 0 };

    const evaluated = rows.map((row) => {
      const reasons = selected.map((c) => c.excludes(row)).filter(Boolean);
      return { ...row, _status: reasons.length ? "ko" : "ok", _reasons: reasons };
    });

    return {
      visible: showExcluded ? evaluated : evaluated.filter((r) => r._status === "ok"),
      excludedCount: evaluated.filter((r) => r._status === "ko").length,
    };
  }, [rows, active, showExcluded]);

  const setup = useMemo(
    () => recommend({ criteria: active, usage, channel }),
    [active, usage, channel]
  );

  const okCount = rows.length - excludedCount;
  const filtering = active.length > 0;

  return (
    <>
      <div className="eco-sticky">
        <div className="eco-filters-block">
          <div className="eco-filter-group">
            <span className="eco-filters-title">Usage</span>
            <div className="eco-filters">
              {USAGE_LEVELS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUsage(u.id)}
                  aria-pressed={usage === u.id}
                  title={u.hint}
                  className="eco-filter"
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          <div className="eco-filter-group">
            <span className="eco-filters-title">Contraintes</span>
            <div className="eco-filters">
              {CRITERIA.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  aria-pressed={active.includes(c.id)}
                  title={c.hint}
                  className="eco-filter"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="eco-filter-group">
            <span className="eco-filters-title">Canal</span>
            <div className="eco-filters">
              {CHANNEL_CRITERIA.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel((prev) => (prev === c.id ? null : c.id))}
                  aria-pressed={channel === c.id}
                  title={c.why}
                  className="eco-filter"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {(filtering || channel) && (
            <p className="eco-filters-result">
              <strong>{okCount}</strong> fournisseur{okCount > 1 ? "s" : ""} sur {rows.length}
              {excludedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setShowExcluded((v) => !v)}
                  className="eco-filters-reset"
                >
                  {showExcluded ? "Masquer les exclus" : `Voir les ${excludedCount} exclus`}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setActive([]);
                  setChannel(null);
                }}
                className="eco-filters-reset"
              >
                Tout effacer
              </button>
            </p>
          )}
        </div>
      </div>

      <div className="eco-setup">
        <p className="eco-setup-label">Montage recommandé</p>
        <p className="eco-setup-title">{setup.title}</p>
        <dl className="eco-setup-grid">
          <div>
            <dt>Hébergement</dt>
            <dd>{setup.hosting}</dd>
          </div>
          <div>
            <dt>Modèle</dt>
            <dd>{setup.model}</dd>
          </div>
          <div>
            <dt>Exécution</dt>
            <dd>{setup.runtime}</dd>
          </div>
          <div>
            <dt>Canal</dt>
            <dd>
              {setup.channel}
              <span className="eco-setup-why"> {setup.channelWhy}</span>
            </dd>
          </div>
          <div>
            <dt>Coût</dt>
            <dd>{setup.cost}</dd>
          </div>
        </dl>
        {setup.caveats?.length > 0 && (
          <ul className="eco-setup-caveats">
            {setup.caveats.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
      </div>

      {visible.length > 0 ? (
        <ComparisonTable
          columns={columns}
          rows={visible}
          statusKey={filtering && showExcluded ? "_status" : undefined}
          reasonsKey={filtering && showExcluded ? "_reasons" : undefined}
        />
      ) : (
        <p className="eco-empty">
          Aucun fournisseur ne satisfait ces contraintes simultanément. Retirez un critère, ou
          suivez le montage recommandé ci-dessus.
        </p>
      )}
    </>
  );
}
