// Le flyer d'un metier : la meme carte sert dans la modale de la home et sur
// la page partageable /metiers/[slug]. Purement presentiel, aucun etat : les
// actions (partage, fermeture) vivent chez les parents.
export default function MetierFlyer({ metier }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-black bg-white text-black">
      {/* Barre haute : identite du site, comme l'en-tete d'un vrai flyer. */}
      <div className="flex items-center justify-between gap-4 bg-[#ff6b35] px-5 sm:px-7 py-2.5 text-white">
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
          Votre agent IA
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest opacity-90">
          nathan-knaebel.com
        </span>
      </div>

      <div className="px-5 sm:px-7 pt-6 sm:pt-7">
        <div className="flex items-center gap-4">
          <span className="text-4xl sm:text-5xl leading-none" aria-hidden="true">
            {metier.emoji}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-[1.55rem] sm:text-[1.9rem] font-black tracking-tight leading-tight text-balance">
              {metier.title}
            </h2>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#ff6b35]">
              6 demandes que votre agent sait traiter
            </p>
          </div>
        </div>

        {/* Les demandes sont citees entre guillemets : ce sont des phrases a
            dire telles quelles a l'agent, pas une liste de fonctionnalites. */}
        <ol className="mt-5 sm:mt-6 border-t border-black/10">
          {metier.demandes.map((demande, i) => (
            <li
              key={demande}
              className="flex items-start gap-4 border-b border-black/10 py-3 sm:py-3.5 last:border-b-0"
            >
              <span className="shrink-0 pt-0.5 font-mono text-[11px] sm:text-xs font-bold text-[#ff6b35]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13.5px] sm:text-[15px] leading-relaxed">
                &laquo;&nbsp;{demande}&nbsp;&raquo;
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pied noir : l'offre, reprise du bandeau de la home. */}
      <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-black px-5 sm:px-7 py-4 sm:py-5 text-white">
        <div>
          <p className="font-display text-base sm:text-lg font-bold leading-tight">
            1 mois d&apos;essai 100% gratuit
          </p>
          <p className="mt-0.5 text-[11px] sm:text-[12px] opacity-70">
            Sans engagement. Un agent qui connaît votre business.
          </p>
        </div>
        <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#ff6b35]">
          nathan-knaebel.com &rarr;
        </span>
      </div>
    </div>
  );
}
