import Link from "next/link";
import { WhatsAppIcon, LinkedInIcon, GitHubIcon, MailIcon } from "./icons";

const CONTACTS = [
  {
    label: "Email",
    href: "mailto:nathan.knaebel@gmail.com",
    Icon: MailIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/33622164758",
    Icon: WhatsAppIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nathanknaebel",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/nknaebel",
    Icon: GitHubIcon,
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 pt-16 pb-16 text-center max-w-6xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold">Me contacter</h2>
      <div className="mt-8 flex items-center justify-center gap-6">
        {CONTACTS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            data-cursor-hover
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 opacity-70 hover:opacity-100 hover:border-white/60 hover:-translate-y-0.5 transition-all duration-150 ease-out"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <Link
        href="/"
        className="inline-block mt-10 text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
      >
        &larr; retour a l&apos;accueil
      </Link>
    </footer>
  );
}
