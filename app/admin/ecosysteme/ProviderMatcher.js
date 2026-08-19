"use client";

import { useMemo, useState } from "react";
import { ComparisonTable } from "./ComparisonTable";
import { CRITERIA } from "../data/criteria";

// Filtre du tableau des fournisseurs : on coche les contraintes du client,
// chaque ligne devient compatible ou exclue avec son motif.
//
// Composant client obligatoire : les règles d'exclusion sont des fonctions,
// et une page serveur ne peut pas passer de fonction à un composant client.
// Elles sont donc importées ici, pas reçues en props.
//
// Aucun tri, aucune ligne masquée : voir qu'un fournisseur est exclu et
// pourquoi vaut mieux que de le faire disparaître. C'est ce qui se dit en
// rendez-vous.
export function ProviderMatcher({ columns, rows }) {
  const [active, setActive] = useState([]);

  const toggle = (id) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const evaluated = useMemo(() => {
    const selected = CRITERIA.filter((c) => active.includes(c.id));

    return rows.map((row) => {
      const reasons = selected.map((c) => c.excludes(row)).filter(Boolean);
      return { ...row, _status: selected.length === 0 ? null : reasons.length ? "ko" : "ok", _reasons: reasons };
    });
  }, [rows, active]);

  const okCount = evaluated.filter((r) => r._status === "ok").length;

  return (
    <>
      <div className="eco-filters-block">
        <p className="eco-filters-title">Contraintes du client</p>
        <div className="eco-filters mt-3">
          {CRITERIA.map((c) => {
            const on = active.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggle(c.id)}
                aria-pressed={on}
                title={c.hint}
                className="eco-filter"
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {active.length > 0 && (
          <p className="eco-filters-result mt-3">
            <strong>{okCount}</strong> fournisseur{okCount > 1 ? "s" : ""} compatible
            {okCount > 1 ? "s" : ""} sur {rows.length}
            {okCount === 0 && " : aucune option ne satisfait toutes ces contraintes simultanément."}
            <button type="button" onClick={() => setActive([])} className="eco-filters-reset">
              Tout effacer
            </button>
          </p>
        )}
      </div>

      <ComparisonTable columns={columns} rows={evaluated} statusKey="_status" reasonsKey="_reasons" />
    </>
  );
}
