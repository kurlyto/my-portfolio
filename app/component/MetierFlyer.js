import {
  TelegramToolIcon,
  WhatsAppToolIcon,
  DiscordIcon,
  SlackIcon,
} from "./tool-icons";

// Le flyer d'un metier : la meme carte sert dans la modale de la home et sur
// la page partageable /metiers/[slug]. Purement presentiel, aucun etat : les
// actions (partage, fermeture) vivent chez les parents.
//
// Densite volontairement serree : le flyer doit tenir en entier dans un ecran
// d'ordinateur SANS scroll (raison du passage de 6 a 5 demandes). Avant
// d'ajouter du contenu ou de l'espacement, verifier qu'il tient toujours dans
// une fenetre de 720px de haut.
export default function MetierFlyer({ metier }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-black bg-white text-black">
      {/* Barre haute : identite du site, comme l'en-tete d'un vrai flyer. */}
      <div className="flex items-center justify-between gap-4 bg-[#ff6b35] px-5 sm:px-6 py-2 text-white">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
          Votre agent IA
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-90">
          nathan-knaebel.com
        </span>
      </div>

      <div className="px-5 sm:px-6 pt-4 sm:pt-5">
        <div className="flex items-center gap-3.5">
          <span className="text-3xl sm:text-4xl leading-none" aria-hidden="true">
            {metier.emoji}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-[1.35rem] sm:text-[1.6rem] font-black tracking-tight leading-tight text-balance">
              {metier.title}
            </h2>
            <p className="mt-0.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-widest text-[#ff6b35]">
              5 demandes que votre agent sait traiter
            </p>
          </div>
        </div>

        {/* Il connait le contexte, et on lui parle la ou on parle deja :
            l'argument tient sur une ligne, avec les canaux en logos. */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 rounded-lg border border-black/10 bg-black/[0.03] px-3.5 py-2">
          <span className="font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest">
            Il connaît votre business
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-mono text-[9.5px] sm:text-[10px] uppercase tracking-widest opacity-60">
              Parlez-lui sur
            </span>
            <TelegramToolIcon className="w-4 h-4" aria-label="Telegram" />
            <WhatsAppToolIcon className="w-4 h-4" aria-label="WhatsApp" />
            <DiscordIcon className="w-4 h-4" aria-label="Discord" />
            <SlackIcon className="w-4 h-4" aria-label="Slack" />
          </span>
        </div>

        {/* Les demandes sont citees entre guillemets : ce sont des phrases a
            dire telles quelles a l'agent, pas une liste de fonctionnalites. */}
        <ol className="mt-3.5 border-t border-black/10">
          {metier.demandes.map((demande, i) => (
            <li
              key={demande}
              className="flex items-start gap-3.5 border-b border-black/10 py-2 sm:py-2.5 last:border-b-0"
            >
              <span className="shrink-0 pt-0.5 font-mono text-[10px] sm:text-[11px] font-bold text-[#ff6b35]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13px] sm:text-[13.5px] leading-snug">
                &laquo;&nbsp;{demande}&nbsp;&raquo;
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Pied noir : l'offre, reprise du bandeau de la home. */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 bg-black px-5 sm:px-6 py-3 sm:py-3.5 text-white">
        <div>
          <p className="font-display text-[15px] sm:text-base font-bold leading-tight">
            1 mois d&apos;essai 100% gratuit
          </p>
          <p className="mt-0.5 text-[11px] opacity-70">Sans engagement.</p>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#ff6b35]">
          nathan-knaebel.com &rarr;
        </span>
      </div>
    </div>
  );
}
