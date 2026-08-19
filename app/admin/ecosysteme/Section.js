// Bloc de section : surtitre mono, titre, note factuelle optionnelle.
// L'id sert d'ancre au sommaire ; scroll-margin-top évite que le titre
// passe sous l'en-tête collant du tableau précédent.
export function Section({ id, label, title, note, children }) {
  return (
    <section id={id} className="eco-section mt-16 first:mt-0">
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
