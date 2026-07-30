import Link from "next/link";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon } from "./icons";
import EmailButton from "./EmailButton";

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
  "w-12 h-12 flex items-center justify-center rounded-full border border-white/20 opacity-80 hover:opacity-100 hover:border-[#ff6b35] hover:text-[#ff6b35] hover:-translate-y-0.5 transition-all duration-150 ease-out";

export default function Footer({ showHomeLink = true }) {
  return (
    <footer className="bg-black text-white text-center px-6 py-20">
      <h2 className="font-display text-3xl md:text-4xl font-bold">Me contacter</h2>
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
          href="/"
          className="inline-block mt-12 text-xs font-mono opacity-50 hover:opacity-100 hover:text-[#ff6b35] transition-colors"
        >
          &larr; retour à l&apos;accueil
        </Link>
      )}
      {/* Liens legaux : obligatoires des lors que le site collecte des donnees
          personnelles (prenom, email, conversations via l'assistant). */}
      <div className="mt-10 flex items-center justify-center gap-5 text-[11px] font-mono opacity-40">
        <Link href="/mentions-legales" className="hover:opacity-100 hover:text-[#ff6b35] transition-colors">
          Mentions légales
        </Link>
        <span aria-hidden>·</span>
        <Link href="/confidentialite" className="hover:opacity-100 hover:text-[#ff6b35] transition-colors">
          Confidentialité
        </Link>
      </div>
    </footer>
  );
}
