// Sommaire des tableaux. Ancres natives, aucun JavaScript : la page est
// longue, on doit pouvoir sauter directement au tableau qu'on cherche.
export function Toc({ items }) {
  return (
    <nav className="eco-toc" aria-label="Sommaire">
      {items.map((item, i) => (
        <a key={item.id} href={`#${item.id}`} className="eco-toc-item">
          <span className="eco-toc-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="eco-toc-label">{item.label}</span>
          <span className="eco-toc-count">{item.count}</span>
        </a>
      ))}
    </nav>
  );
}
