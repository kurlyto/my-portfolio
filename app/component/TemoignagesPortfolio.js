import { TESTIMONIALS } from "./Testimonials";

// Temoignages sur le portfolio (demande de Nathan, 28/10/2026), entre les
// rubriques et le pied de page. MEME liste que le site agents (Testimonials.js) :
// un temoignage ajoute la-bas apparait ici aussi. Cartes habillees comme les
// cartes projets (blanc, bord fin, ombre douce), citation dans la police du haut
// de page. Les logos clients viendront au-dessus quand il y en aura plusieurs.
// Les citations restent en francais, comme le blog.
const TITRE = { fr: "Ils me font confiance", en: "They trust me" };

export default function TemoignagesPortfolio({ lang = "fr" }) {
  return (
    <section id="temoignages" className="scroll-mt-24 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-24 max-sm:py-16">
        <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl">
          {TITRE[lang] || TITRE.fr}
        </h2>

        <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-4">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex w-[84%] shrink-0 snap-start flex-col rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)] sm:w-[60%] md:w-auto"
            >
              <span aria-hidden className="font-display text-7xl font-black leading-[0.6] text-accent">
                &ldquo;
              </span>
              <blockquote className="mb-7 mt-5 font-display text-[19px] font-semibold leading-snug">
                {item.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-black/[0.06] pt-5">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- avatar servi depuis /public
                  <img
                    src={item.photo}
                    alt=""
                    className={`h-12 w-12 shrink-0 rounded-full ring-1 ring-black/10 ${item.logo ? "bg-white object-contain p-[3px]" : "object-cover"}`}
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-[13px] font-bold text-white">
                    {item.initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-tight">{item.name}</p>
                  <p className="mt-1 text-[13px] leading-snug text-black/55">{item.jobTitle}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
