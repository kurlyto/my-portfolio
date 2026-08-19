// Bloc de section : titre centré, contenu, sources. Rien d'autre.
// L'id sert d'ancre au sommaire.
export function Section({ id, title, children }) {
  return (
    <section id={id} className="eco-section">
      <h2 className="eco-section-title">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Sources({ items }) {
  if (!items?.length) return null;
  return (
    <p className="eco-source mt-4">
      Sources :{" "}
      {items.map((s, i) => (
        <span key={s.url}>
          {i > 0 && " - "}
          <a href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label}
          </a>
        </span>
      ))}
    </p>
  );
}
