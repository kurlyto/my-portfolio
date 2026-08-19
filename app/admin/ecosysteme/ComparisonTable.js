"use client";

import { ProviderLogo } from "./ProviderLogo";

// Tableau générique de l'espace écosystème. Le survol éclaire la LIGNE
// doucement (on suit la lecture horizontale) et la CELLULE sous le curseur
// d'un cran de plus (on sait quelle case on lit) - voir admin.css .eco-table.
//
// Rendu volontairement passif : toute la donnée vient de data/, la mise en
// forme d'une valeur se décide ici et nulle part ailleurs.
//
// Le tableau est en table-layout: fixed, donc chaque colonne DOIT déclarer
// sa largeur via `width` dans la définition de colonne. Sans ça, une seule
// cellule bavarde décide de la largeur de tout le tableau et pousse le reste
// hors de l'écran.
//
// statusKey / reasonsKey : quand des filtres sont actifs, chaque ligne porte
// "ok" ou "ko" et la liste de ses motifs d'exclusion. Le motif s'affiche sous
// le nom : un rouge sans explication ne se dit pas à voix haute en rendez-vous.
//
// rowKey est le NOM d'un champ, pas une fonction : une page serveur ne peut
// pas passer de fonction à un composant client.
export function ComparisonTable({ columns, rows, rowKey = "name", statusKey, reasonsKey }) {
  return (
    <div className="eco-scroll">
      <table className="eco-table">
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const status = statusKey ? row[statusKey] : null;
            const reasons = reasonsKey ? (row[reasonsKey] ?? []) : [];

            // `ours` met en évidence notre propre serveur dans le tableau
            // matériel : c'est un repère, pas un verdict de filtre.
            const rowClass = row.ours ? "eco-row-ours" : status ? `eco-row-${status}` : undefined;

            return (
              <tr key={row[rowKey] ?? i} className={rowClass}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "name" ? (
                      <>
                        <span className="eco-name">
                          {row.domain !== undefined && (
                            <ProviderLogo domain={row.domain} name={row.name} />
                          )}
                          <span>{row.name}</span>
                        </span>
                        {row.ours && <span className="eco-ours-tag">Notre serveur</span>}
                        {status && (
                          <span className={`eco-verdict-tag eco-verdict-tag-${status}`}>
                            {status === "ok" ? "Compatible" : "Exclu"}
                          </span>
                        )}
                        {reasons.length > 0 && (
                          <ul className="eco-reasons">
                            {reasons.map((r) => (
                              <li key={r}>{r}</li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      renderCell(row[col.key])
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// Une valeur est soit une chaîne, soit un objet {label, tone} affiché en
// pastille. La couleur ne porte jamais l'information seule : le texte de la
// pastille se suffit à lui-même.
function renderCell(value) {
  if (value == null || value === "") return <span className="viz-text-muted">-</span>;

  if (typeof value === "object" && value.label) {
    return <span className={`eco-badge eco-badge-${value.tone ?? "neutral"}`}>{value.label}</span>;
  }

  return value;
}
