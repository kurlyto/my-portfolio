// Bloc de section de la page ecosysteme : surtitre mono, titre, chapeau.
// Le chapeau porte le "pourquoi c'est la" - la page sert aussi de support
// en rendez-vous client, une section sans explication n'aide personne.
export function Section({ label, title, lead, children }) {
  return (
    <section className="mt-14 first:mt-0">
      {label && <p className="eco-section-label">{label}</p>}
      <h2 className="eco-section-title mt-1.5">{title}</h2>
      {lead && <p className="eco-lead mt-3 max-w-3xl">{lead}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Sources({ items }) {
  if (!items?.length) return null;
  return (
    <p className="eco-source mt-3">
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
