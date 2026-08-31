import Footer from "../component/Footer";
import ProjectCards from "../component/ProjectCards";
import ProjectsNav from "../component/ProjectsNav";
import ProjectsHero from "../component/ProjectsHero";
import TechMarquee from "../component/TechMarquee";

export const metadata = {
  title: "Projets — Nathan Knaebel",
  description: "Ce que j'ai construit : SaaS, jeux, agents IA, outils metier, cartes.",
  alternates: { canonical: "https://nathan-knaebel.com/projects" },
};

// Page volontairement DETACHEE du site d'agents : sa propre nav (ProjectsNav),
// pas le Header "Votre Agent IA" / Metiers / Agents / FAQ. C'est un portfolio
// qui se tient seul.
export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ProjectsNav />

      <ProjectsHero />

      <TechMarquee />

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

          <ProjectCards />
        </div>
      </main>

      {/* Pas de lien "retour a l'accueil" : la page est autonome, elle ne renvoie
          pas vers le site d'agents. Sur mobile, dernier ecran net du deck
          (snap-screen) pour que le geste depuis la derniere carte s'y pose. */}
      <div className="snap-screen max-sm:flex max-sm:min-h-[100dvh] max-sm:flex-col max-sm:justify-end">
        <Footer showHomeLink={false} />
      </div>
    </div>
  );
}
