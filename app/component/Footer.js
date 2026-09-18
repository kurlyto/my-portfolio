import Link from "next/link";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";
import { t } from "../lib/i18n-projects";
import { BLOG_OUVERT } from "../blog/blog-ouvert";
import { METIERS } from "../metiers/metiers-data";

// Les offres de l'agence, dans l'ordre de l'accueil.
const PRODUITS = [
  { label: "Foxy, l'assistant de votre entreprise", href: "/foxy" },
  { label: "Agents IA sur mesure", href: "/agents" },
  { label: "Exemples d'agents", href: "/agents/exemples" },
  { label: "Réalisations", href: "/projects" },
];

const LIEN_PLAN_CLASS =
  "inline-block py-2 text-[13px] leading-snug opacity-70 hover:opacity-100 hover:text-accent-text transition-colors";
const TITRE_PLAN_CLASS = "font-mono text-[11px] uppercase tracking-widest opacity-50";

const CONTACTS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/33622164758",
    Icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nathan-knaebel",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/kurlyto",
    Icon: GitHubIcon,
  },
];

const CONTACT_BUTTON_CLASS =
  "w-12 h-12 flex items-center justify-center rounded-full border border-white/20 opacity-80 hover:opacity-100 hover:border-accent hover:text-accent-text hover:-translate-y-0.5 transition-all duration-150 ease-out";

// `lang` n'est passe que par la page /projects (seule page bilingue) : partout
// ailleurs le pied de page reste en francais, comme le reste du site.
//
// `homeHref` : depuis le 16/09/2026 la racine est l'accueil de l'agence, qui
// mene a toutes les offres : c'est le "retour a l'accueil" par defaut. Les
// accueils eux-memes (agence, Foxy) n'affichent pas ce lien.
export default function Footer({
  showHomeLink = true,
  lang = "fr",
  homeHref = "/",
  // Le site AIOS ferme sur un brun profond (sa palette chaude) plutot que sur
  // le noir pur du site agents.
  surfaceClass = "bg-black text-white",
  // Derniers articles du blog ({ slug, titre }). Le pied de page est aussi
  // rendu par des composants client : il ne lit donc jamais le disque, la page
  // serveur lui passe la liste (voir FooterAvecArticles).
  articles = [],
}) {
  const tr = t(lang);

  return (
    // on-dark : le pied de page est sombre dans tous les cas, l'accent doit
    // s'y eclaircir (sinon le rouge du renard au survol devient illisible).
    <footer className={`on-dark ${surfaceClass} text-center px-6 py-14 md:py-20`}>
      <h2 className="font-display text-3xl md:text-4xl font-bold">{tr.footer.contact}</h2>
      <div className="mt-10 flex items-center justify-center gap-6">
        <EmailButton
          className={CONTACT_BUTTON_CLASS}
          iconClassName="w-5 h-5"
          dark
        />
        {CONTACTS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-cursor-hover
            className={CONTACT_BUTTON_CLASS}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      {/* Plan du site : les offres, une page par metier et les derniers
          articles. En francais seulement (la page /projects en anglais garde
          le pied de page court). */}
      {lang === "fr" && (
        <nav
          aria-label="Plan du site"
          className="mx-auto mt-14 grid max-w-5xl gap-10 border-t border-white/10 pt-12 text-left sm:grid-cols-2 lg:grid-cols-[1fr_1.6fr_1.2fr]"
        >
          <div>
            <h3 className={TITRE_PLAN_CLASS}>Produits</h3>
            <ul className="mt-4">
              {PRODUITS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={LIEN_PLAN_CLASS}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={TITRE_PLAN_CLASS}>Un agent IA pour votre métier</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {METIERS.map(({ slug, badge }) => (
                <li key={slug}>
                  <Link href={`/metiers/${slug}`} className={LIEN_PLAN_CLASS}>
                    {badge}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {BLOG_OUVERT && (
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className={TITRE_PLAN_CLASS}>Articles</h3>
              <ul className="mt-4">
                {articles.map(({ slug, titre }) => (
                  <li key={slug}>
                    <Link href={`/blog/${slug}`} className={LIEN_PLAN_CLASS}>
                      {titre}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/blog" className={LIEN_PLAN_CLASS}>
                    Tous les articles &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
      {showHomeLink && (
        <Link
          href={homeHref}
          className="inline-block mt-12 text-xs font-mono opacity-50 hover:opacity-100 hover:text-accent-text transition-colors"
        >
          &larr; {tr.footer.home}
        </Link>
      )}
      {/* Liens legaux : obligatoires des lors que le site collecte des donnees
          personnelles (prenom, email, conversations via l'assistant). */}
      {/* py-2 sur les liens : sans lui, la zone tactile fait 17 px de haut,
          sous le minimum touchable au doigt (mesure du 08/09). */}
      <div className="mt-8 flex items-center justify-center gap-3 text-[11px] font-mono opacity-40">
        <Link
          href="/mentions-legales"
          className="inline-flex items-center px-2 py-2 hover:opacity-100 hover:text-accent-text transition-colors"
        >
          {tr.footer.legal}
        </Link>
        <span aria-hidden>·</span>
        <Link
          href="/confidentialite"
          className="inline-flex items-center px-2 py-2 hover:opacity-100 hover:text-accent-text transition-colors"
        >
          {tr.footer.privacy}
        </Link>
        {BLOG_OUVERT && (
          <>
            <span aria-hidden>·</span>
            <Link
              href="/blog"
              className="inline-flex items-center px-2 py-2 hover:opacity-100 hover:text-accent-text transition-colors"
            >
              Blog
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}
