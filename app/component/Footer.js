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
    href: "https://github.com/kurlyto",
    Icon: GitHubIcon,
  },
];

export default function Footer({ showHomeLink = true }) {
  return (
    <footer className="bg-black text-white text-center px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold">Me contacter</h2>
      <div className="mt-10 flex items-center justify-center gap-6">
        {CONTACTS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            data-cursor-hover
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 opacity-80 hover:opacity-100 hover:border-[#ff6b35] hover:text-[#ff6b35] hover:-translate-y-0.5 transition-all duration-150 ease-out"
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
    </footer>
  );
}
