import Footer from "./FooterAvecArticles";
import ProjectCards from "./ProjectCards";
import ProjectsNav from "./ProjectsNav";
import ProjectsHero from "./ProjectsHero";

// Le portfolio, servi a DEUX adresses depuis le 05/10/2026 : la racine
// (decision de Nathan : "la page principale, c'est projets") et /projects,
// gardee car ce lien a ete envoye a des recruteurs. Les deux pages ne font
// que choisir la langue et les meta ; le contenu vit ici, une seule fois.
// L'ancien accueil perso (PersoHomeContent) reste dans le depot pour un
// retour arriere d'une ligne dans app/page.js.
// Page volontairement DETACHEE du site d'agents : sa propre nav (ProjectsNav),
// pas le Header "Votre Agent IA" / Metiers / Agents / FAQ. C'est un portfolio
// qui se tient seul.
export default function PortfolioPage({ lang }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <ProjectsNav lang={lang} />

      <ProjectsHero lang={lang} />

      {/* Les outils vivent dans une pop-up ouverte depuis le haut de page
          (TechPopup, 06/10/2026). Retour au bloc pleine page : <TechGrid lang={lang} />
          ; au bandeau qui defile (avant le 05/10) : <TechMarquee lang={lang} /> */}

      {/* Section blanche PLEINE LARGEUR (plus de boite blanche flottante au
          milieu du noir) : le blanc va bord a bord, seul le contenu reste
          contraint a max-w-7xl. Un degrade doux fait la jointure avec le noir
          du bandeau techs au-dessus. */}
      {/* Sur telephone, pt/pb sont annules : chaque carte est un ecran plein, pas
          de marge parasite qui decalerait le snap. Le px-6 reste (les cartes le
          neutralisent avec -mx-6 pour aller bord a bord). */}
      <main className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 max-sm:pt-0 max-sm:pb-0">
          {/* Pas de titre : la grille parle d'elle-meme. On garde juste l'ancre
              invisible pour que le lien "Mes projets" de la nav descende ici. */}
          <span id="projets" className="block scroll-mt-24" aria-hidden />

          <ProjectCards lang={lang} />
        </div>
      </main>

      {/* Pas de lien "retour a l'accueil" : la page est autonome, elle ne renvoie
          pas vers le site d'agents. Sur mobile, dernier ecran net du deck
          (snap-screen) pour que le geste depuis la derniere carte s'y pose. */}
      <div className="snap-screen max-sm:flex max-sm:min-h-[100dvh] max-sm:flex-col max-sm:justify-end">
        <Footer showHomeLink={false} lang={lang} />
      </div>
    </div>
  );
}
