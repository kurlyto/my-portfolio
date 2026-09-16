import Link from "next/link";
import Reveal from "./Reveal";
import { AIOS_OFFER } from "./aios-offer";
import { DesktopMock, PhoneMock } from "./AiosMockup";

// Passerelle du site "agents" vers le site "AIOS".
//
// Cette section remplace l'ancienne AiosSection, qui vendait l'AIOS EN ENTIER
// au milieu de la page des agents : deux promesses voisines sur un meme ecran,
// le visiteur ne savait plus ce qu'il achetait. Ici on ne vend pas, on oriente :
// une phrase qui pose la difference (une mission precise / tout le business),
// un lien. La vente se fait sur le site d'en face.
//
// `theme-aios` : la section porte les couleurs de Foxy (brun profond, rouge du
// renard) et non le noir/orange du site des agents (demande de Nathan, 14/09).
// C'est la porte vers l'autre marque, elle en porte deja les couleurs : miroir
// exact du bouton `accent-agents` en fin du site Foxy.
//
// Gabarit d'une VRAIE section (demande de Nathan, 14/09) : memes marges et meme
// taille de titre que les autres sections de la page, et les maquettes d'ecrans
// du hero Foxy a droite pour montrer le produit. En bande de 400 px de haut
// elle se lisait comme un bandeau de pied de page.
export default function AiosTeaser() {
  return (
    <section className="theme-aios on-dark bg-deep text-white">
      <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo local
                  a taille fixe, next/image n'apporte rien ici. */}
              <img src="/images/cover-aios.png" alt="" className="w-12 h-12 object-contain" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                Foxy - Votre bras droit
              </span>
            </div>
            <h2 className="font-display mt-5 text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Vous ne cherchez pas un agent mais un bras droit ?
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed">
              Un agent prend en charge <span className="surligne">une mission précise</span>{" "}
              comme relancer, trier ou surveiller. Foxy est un système complet qui
              connaît <span className="surligne">tout votre business</span> et à qui vous
              parlez toute la journée. C&apos;est un produit plus complet et adapté
              pour <span className="surligne">les chefs d&apos;entreprise</span>.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              {/* Aplat ROUGE Foxy (demande de Nathan, 14/09) : meme gabarit que
                  le bouton orange de la section miroir en fin du site Foxy. */}
              <Link
                href="/"
                data-cursor-hover
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-ink px-7 py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-all duration-150 hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg"
              >
                Découvrir Foxy
                <span aria-hidden>&rarr;</span>
              </Link>
              <p className="text-[12px] font-mono text-white/50 text-center sm:text-left">
                Accès anticipé, {AIOS_OFFER.placesRestantes} places sur {AIOS_OFFER.placesTotal}
              </p>
            </div>
          </div>

          {/* Les maquettes sont illisibles a 390 px (meme choix que le hero
              Foxy) : on les montre a partir de la tablette. */}
          <div className="hidden sm:flex items-end gap-4">
            <div className="flex-1 min-w-0">
              <DesktopMock tone="dark" />
            </div>
            <PhoneMock tone="dark" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
