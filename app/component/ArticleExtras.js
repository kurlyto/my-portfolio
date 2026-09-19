import Link from "next/link";

// Les trois blocs communs aux articles du blog et des pages metier : la ligne
// auteur (photo, nom, dates), les mots-cles et le "A lire aussi".
// Retour de Nathan le 18/09/2026 : un article doit faire vrai, avec un auteur
// visible, des mots-cles, et des liens qui menent vers d'autres lectures.

export function LigneAuteur({ dateTexte, majTexte, minutes }) {
  return (
    <div className="mt-6 flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/nathan-auteur.webp"
        alt="Nathan Knaebel"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover"
      />
      <div className="text-[14px] leading-snug">
        <p className="font-semibold text-black">
          Par{" "}
          <Link href="/projects" data-cursor-hover data-clic="clic-article-auteur" className="underline-offset-4 hover:text-[#ff6b35] hover:underline">
            Nathan Knaebel
          </Link>
        </p>
        <p className="text-black/60">
          Publié le {dateTexte}
          {majTexte && <> · mis à jour le {majTexte}</>}
          {minutes ? <> · {minutes} min de lecture</> : null}
        </p>
      </div>
    </div>
  );
}

export function MotsCles({ mots }) {
  if (!mots || mots.length === 0) return null;
  return (
    <div className="mt-12 flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-widest text-black/50">Mots-clés</span>
      {mots.map((m) => (
        <span key={m} className="rounded-full bg-black/5 px-3 py-1 text-[13px] text-black/70">
          {m}
        </span>
      ))}
    </div>
  );
}

// `large` : trois cartes cote a cote sur la page large du blog ; la colonne
// etroite des pages metier les empile.
export function LireAussi({ liens, large = false }) {
  if (!liens || liens.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="lire-aussi">
      <h2 id="lire-aussi" className="font-display text-2xl font-bold">
        À lire aussi
      </h2>
      <ul className={`mt-5 grid gap-3 ${large ? "md:grid-cols-3" : ""}`}>
        {liens.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              data-cursor-hover
              data-clic="clic-article-lire-aussi"
              className="group block h-full rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-[#ff6b35]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-black/50">{l.etiquette}</p>
              <p className="mt-1.5 font-display text-[17px] font-bold leading-snug transition-colors group-hover:text-[#ff6b35]">
                {l.titre}
              </p>
              {l.description && (
                <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-black/60">{l.description}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
