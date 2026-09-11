import Link from "next/link";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";
import { t } from "../lib/i18n-projects";

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
// `homeHref` : depuis la scission des deux sites (08/09/2026), "retour a
// l'accueil" ne veut plus dire la meme chose partout. Les pages annexes
// (projets, mentions, flyers metiers) appartiennent a l'activite agents, leur
// accueil est donc /agents ; le site AIOS, lui, EST la racine et n'affiche pas
// ce lien.
export default function Footer({
  showHomeLink = true,
  lang = "fr",
  homeHref = "/agents",
  // Le site AIOS ferme sur un brun profond (sa palette chaude) plutot que sur
  // le noir pur du site agents.
  surfaceClass = "bg-black text-white",
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
      </div>
    </footer>
  );
}
