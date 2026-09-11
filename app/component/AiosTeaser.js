import Link from "next/link";
import Reveal from "./Reveal";
import { AIOS_OFFER } from "./aios-offer";

// Passerelle du site "agents" vers le site "AIOS".
//
// Cette section remplace l'ancienne AiosSection, qui vendait l'AIOS EN ENTIER
// au milieu de la page des agents : deux promesses voisines sur un meme ecran,
// le visiteur ne savait plus ce qu'il achetait. Ici on ne vend pas, on oriente :
// une phrase qui pose la difference (une mission precise / tout le business),
// un lien. La vente se fait sur le site d'en face.
export default function AiosTeaser() {
  return (
    <section className="on-dark bg-black text-white">
      <Reveal className="max-w-6xl mx-auto px-6 py-14 md:py-24">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo local
                  a taille fixe, next/image n'apporte rien ici. */}
              <img src="/images/cover-aios.png" alt="" className="w-8 h-8 object-contain" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                L&apos;autre offre
              </span>
            </div>
            <h2 className="font-display mt-4 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">
              Vous ne cherchez pas un agent, mais un bras droit ?
            </h2>
            <p className="mt-4 text-[15px] md:text-base text-white/70 leading-relaxed max-w-2xl">
              Un agent prend en charge <span className="text-white">une mission précise</span> :
              relancer, trier, surveiller. Foxy, lui, est un système complet qui
              connaît <span className="text-white">tout votre business</span> - mails, agenda,
              clients, tâches - et à qui vous parlez toute la journée. C&apos;est un autre
              produit, avec son propre site.
            </p>
          </div>

          <div className="shrink-0">
            {/* Bouton en contour et non plein : c'est une passerelle, pas
                l'action principale de la page. Meme gabarit que la section
                miroir en fin du site Foxy, qui renvoie ici. */}
            <Link
              href="/"
              data-cursor-hover
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 hover:border-accent hover:text-accent-text"
            >
              Découvrir Foxy
              <span aria-hidden>&rarr;</span>
            </Link>
            <p className="mt-3 text-[12px] font-mono text-white/45 text-center">
              Accès anticipé, {AIOS_OFFER.placesRestantes} places sur {AIOS_OFFER.placesTotal}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
