"use client";

import { useMemo, useState } from "react";
import { ComparisonTable } from "./ComparisonTable";
import { CRITERIA } from "../data/criteria";

// Filtre du tableau des fournisseurs : on coche les contraintes du client,
// les lignes incompatibles disparaissent.
//
// Composant client obligatoire : les règles d'exclusion sont des fonctions,
// et une page serveur ne peut pas passer de fonction à un composant client.
// Elles sont donc importées ici, pas reçues en props.
//
// Les exclus sont masqués par défaut (lecture face au client) mais restent
// affichables avec leur motif : en préparation, savoir POURQUOI un
// fournisseur est écarté est ce qui permet de répondre à « et Claude, on
// ne peut pas ? ».
export function ProviderMatcher({ columns, rows }) {
  const [active, setActive] = useState([]);
  const [showExcluded, setShowExcluded] = useState(false);

  const toggle = (id) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const { visible, excludedCount } = useMemo(() => {
    const selected = CRITERIA.filter((c) => active.includes(c.id));

    if (selected.length === 0) {
      return { visible: rows, excludedCount: 0 };
    }

    const evaluated = rows.map((row) => {
      const reasons = selected.map((c) => c.excludes(row)).filter(Boolean);
      return { ...row, _status: reasons.length ? "ko" : "ok", _reasons: reasons };
    });

    const kept = showExcluded ? evaluated : evaluated.filter((r) => r._status === "ok");
    return { visible: kept, excludedCount: evaluated.filter((r) => r._status === "ko").length };
  }, [rows, active, showExcluded]);

  const okCount = rows.length - excludedCount;
  const filtering = active.length > 0;

  return (
    <>
      <div className="eco-filters-block">
        <p className="eco-filters-title">Contraintes du client</p>
        <div className="eco-filters mt-3">
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

        {filtering && (
          <p className="eco-filters-result mt-3">
            <strong>{okCount}</strong> fournisseur{okCount > 1 ? "s" : ""} compatible
            {okCount > 1 ? "s" : ""} sur {rows.length}
            {okCount === 0 && " : aucune option ne satisfait toutes ces contraintes."}
            {excludedCount > 0 && (
              <button
                type="button"
                onClick={() => setShowExcluded((v) => !v)}
                className="eco-filters-reset"
              >
                {showExcluded ? "Masquer les exclus" : `Voir les ${excludedCount} exclus`}
              </button>
            )}
            <button type="button" onClick={() => setActive([])} className="eco-filters-reset">
              Tout effacer
            </button>
          </p>
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
          orientez le client vers un modèle à poids ouverts auto-hébergé.
        </p>
      )}
    </>
  );
}
