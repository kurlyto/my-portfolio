// Sommaire cliquable d'un article (blog et pages metier), tire de ses H2.
// Sous trois chapitres il n'apporte rien : on ne l'affiche pas.
export default function Sommaire({ chapitres }) {
  if (!chapitres || chapitres.length <= 2) return null;
  return (
    <nav aria-label="Sommaire" className="mt-8 rounded-xl border border-black/10 bg-white px-5 py-4">
      <p className="font-mono text-[11px] uppercase tracking-widest text-black/50">Sommaire</p>
      <ol className="mt-2">
        {chapitres.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              data-cursor-hover
              className="flex gap-3 py-1.5 text-[15px] leading-snug transition-colors hover:text-[#ff6b35]"
            >
              <span className="font-mono text-[13px] text-[#ff6b35]">{String(i + 1).padStart(2, "0")}</span>
              {c.texte}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
