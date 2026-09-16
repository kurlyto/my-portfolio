import Reveal from "./Reveal";

// Temoignages de vrais clients du site agents, TOUS visibles d'un coup dans
// leur propre section (demande de Nathan, 14/09) : l'ancien carrousel du hero
// n'en montrait qu'un a la fois et la colonne droite du hero revient a Nate.
//
// Regle posee par Nathan : seuls les temoignages NOMMES restent (prenom +
// initiale du nom). Pour ajouter une photo, deposer un carre de 200x200 minimum
// dans public/testimonials/ et renseigner `photo` ; sans photo la pastille
// affiche les initiales.
export const TESTIMONIALS = [
  {
    quote:
      "Mes mails de prospection partent tout seuls chaque matin vers les organisateurs d'événements. Je ne cherche plus mes dates et elles arrivent quand même.",
    name: "Yann L.",
    jobTitle: "Gérant de foodtruck",
    useCase: "Prospection événementielle",
    initials: "YL",
    photo: null,
  },
  {
    quote:
      "L'agent épluche les sites d'annonces immobilières à ma place. Il estime chaque bien à partir des ventes réelles du quartier et me dit s'il vaut le coup. Je décide sur des chiffres et plus au feeling.",
    name: "Nicolas L.",
    jobTitle: "Investisseur immobilier",
    useCase: "Veille d'annonces et estimation",
    initials: "NL",
    photo: null,
  },
  {
    quote:
      "Ma recherche d'emploi tourne en continu. L'agent cible les offres qui collent vraiment à mon CV et prépare mes candidatures avec moi.",
    name: "Mathilde C.",
    jobTitle: "En recherche d'emploi",
    useCase: "Candidatures ciblées",
    initials: "MC",
    photo: null,
  },
  {
    quote:
      "On cherchait des endroits où jouer dans notre ville sans y passer nos soirées. Maintenant le démarchage tourne tout seul et on se concentre sur la musique.",
    name: "Victor G.",
    jobTitle: "Groupe AIMELAVIE",
    useCase: "Recherche de dates",
    initials: "VG",
    photo: null,
  },
];

// Cinq etoiles pleines, dans l'accent du site qui les affiche : le code visuel
// universel de l'avis client. Reutilisees par l'accueil Foxy.
export function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="var(--accent)"
          aria-hidden="true"
          className="w-[18px] h-[18px]"
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      ))}
    </div>
  );
}

function Identity({ item }) {
  return (
    <div className="pt-1 flex items-center gap-3 border-t border-black/10">
      {item.photo ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatar de 44px
        // servi depuis /public : next/image n'apporte rien ici.
        <img
          src={item.photo}
          alt=""
          className="mt-4 w-11 h-11 shrink-0 rounded-full object-cover border border-black/10"
        />
      ) : (
        <div className="mt-4 w-11 h-11 shrink-0 rounded-full bg-accent flex items-center justify-center text-[13px] font-mono font-bold text-accent-ink">
          {item.initials}
        </div>
      )}
      <div className="mt-4 min-w-0">
        <p className="text-[15px] font-semibold leading-tight">{item.name}</p>
        {/* Metier et usage sur deux lignes : en carte etroite (4 par ligne),
            la ligne unique en capitales passait sur trois lignes. */}
        <p className="text-[13px] opacity-60 leading-snug mt-1">{item.jobTitle}</p>
        <p className="text-[12px] font-mono uppercase tracking-wider opacity-45 leading-snug mt-1">
          {item.useCase}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white text-black border-t border-black/10">
      <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-28">
        <span
          id="temoignages"
          className="kicker scroll-mt-10 text-xs font-mono uppercase tracking-widest"
        >
          Témoignages
        </span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
          Ce qu&apos;en disent nos clients
        </h2>

        {/* Mobile : une rangee qu'on fait glisser au doigt, une carte a la fois
            et le bord de la suivante visible pour inviter au geste (4 cartes
            empilees faisaient un long tunnel a faire defiler). Tablette : 2x2.
            Bureau : 4 cartes sur une ligne (demande de Nathan, 14/09).
            -mx-6/px-6 : la rangee deborde jusqu'aux bords de l'ecran. */}
        <div className="mt-10 md:mt-14 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-4 lg:gap-5">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-auto flex flex-col rounded-2xl border-2 border-accent/35 bg-[#faf8f5] p-6 shadow-[0_16px_40px_-20px_rgba(255,107,53,0.25)]"
            >
              <Stars />
              <blockquote className="mt-4 font-display text-[17px] leading-snug font-semibold">
                {item.quote}
              </blockquote>
              {/* mt-auto ICI et non dans Identity : c'est figcaption l'enfant
                  de la colonne flex, c'est lui qui doit etre pousse en bas. */}
              <figcaption className="mt-auto pt-6">
                <Identity item={item} />
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
