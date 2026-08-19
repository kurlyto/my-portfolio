// Bloc de section : surtitre mono, titre, note factuelle optionnelle.
export function Section({ label, title, note, children }) {
  return (
    <section className="mt-16 first:mt-0">
      {label && <p className="eco-section-label">{label}</p>}
      <h2 className="eco-section-title mt-1.5">{title}</h2>
      {note && <p className="eco-note mt-2 max-w-3xl">{note}</p>}
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

// Une section dont les données ne sont pas encore vérifiées affiche ce
// message plutôt qu'un tableau vide : on doit voir au premier coup d'oeil
// qu'il manque quelque chose, sans croire que la liste est complète.
export function Pending({ what }) {
  return <p className="eco-pending">Vérification en cours : {what}.</p>;
}
