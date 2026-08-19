// FAQ en accordéon natif : details/summary, aucun JavaScript, accessible
// au clavier par défaut.
export function Faq({ items }) {
  return (
    <div className="eco-faq">
      {items.map((item) => (
        <details key={item.q} className="eco-faq-item">
          <summary>{item.q}</summary>
          <div className="eco-faq-answer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
