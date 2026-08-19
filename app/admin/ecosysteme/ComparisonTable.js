"use client";

import { ProviderLogo } from "./ProviderLogo";

// Tableau generique de l'espace ecosysteme. Le survol eclaire la LIGNE
// doucement (on suit la lecture horizontale) et la CELLULE sous le curseur
// d'un cran de plus (on sait quelle case on lit) - voir stats.css .eco-table.
//
// Rendu volontairement dumb : toute la donnee vient de data/, la mise en
// forme d'une valeur se decide ici et nulle part ailleurs.
// rowKey est le NOM d'un champ, pas une fonction : une page serveur ne peut
// pas passer de fonction a un composant client.
export function ComparisonTable({ columns, rows, rowKey = "name" }) {
  return (
    <div className="eco-scroll">
      <table className="eco-table">
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
                      {row.name}
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

// Une valeur peut etre une chaine, ou un objet {label, tone} qui s'affiche
// en pastille. La couleur ne porte jamais l'information seule : le texte de
// la pastille se suffit a lui-meme.
function renderCell(value) {
  if (value == null || value === "") return <span className="viz-text-muted">-</span>;

  if (typeof value === "object" && value.label) {
    return <span className={`eco-badge eco-badge-${value.tone ?? "neutral"}`}>{value.label}</span>;
  }

  return value;
}
