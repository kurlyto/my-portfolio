import { cookies, headers } from "next/headers";
import Footer from "../component/FooterAvecArticles";
import ProjectCards from "../component/ProjectCards";
import ProjectsNav from "../component/ProjectsNav";
import ProjectsHero from "../component/ProjectsHero";
import TechMarquee from "../component/TechMarquee";
import { LANG_COOKIE, detectLang, t } from "../lib/i18n-projects";

// Seule page bilingue du site (cf app/lib/i18n-projects.js). Lire l'en-tete
// Accept-Language la rend forcement dynamique : c'est voulu, une page mise en
// cache servirait la meme langue a tout le monde.
async function currentLang() {
  const [h, c] = await Promise.all([headers(), cookies()]);
  return detectLang(h.get("accept-language"), c.get(LANG_COOKIE)?.value);
}

export async function generateMetadata() {
  const lang = await currentLang();
  const { meta } = t(lang);

  return {
    // `absolute` : le template du layout ajoute "| Votre Agent IA", suffixe
    // francais du site vitrine. Sur un portfolio autonome, et surtout dans son
    // rendu anglais, il n'a rien a faire dans l'onglet.
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: "https://nathan-knaebel.com/projects" },
  };
}

// Page volontairement DETACHEE du site d'agents : sa propre nav (ProjectsNav),
// pas le Header "Votre Agent IA" / Metiers / Agents / FAQ. C'est un portfolio
// qui se tient seul.
export default async function ProjectsPage() {
  const lang = await currentLang();

  return (
    <div className="min-h-screen bg-black text-white">
      <ProjectsNav lang={lang} />

      <ProjectsHero lang={lang} />

      <TechMarquee lang={lang} />

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
