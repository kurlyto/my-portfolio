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
// rowKey est le NOM d'un champ, pas une fonction : une page serveur ne peut
// pas passer de fonction à un composant client.
export function ComparisonTable({ columns, rows, rowKey = "name" }) {
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
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.key === "name" && row.domain !== undefined ? (
                    <span className="eco-name">
                      <ProviderLogo domain={row.domain} name={row.name} />
                      <span>{row.name}</span>
                    </span>
                  ) : (
                    renderCell(row[col.key])
                  )}
                </td>
              ))}
            </tr>
          ))}
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
