import { cookies, headers } from "next/headers";
import PortfolioPage from "../component/PortfolioPage";
import { LANG_COOKIE, detectLang, t } from "../lib/i18n-projects";

// Copie conforme de la racine (le portfolio y vit depuis le 05/10/2026) :
// /projects reste ouvert pour les liens deja envoyes. Canonique = la racine,
// pour que Google ne voie qu'une page.
async function currentLang() {
  const [h, c] = await Promise.all([headers(), cookies()]);
  return detectLang(h.get("accept-language"), c.get(LANG_COOKIE)?.value);
}

export async function generateMetadata() {
  const lang = await currentLang();
  const { meta } = t(lang);

  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: "https://nathan-knaebel.com" },
  };
}

export default async function ProjectsPage() {
  const lang = await currentLang();
  return <PortfolioPage lang={lang} />;
}
