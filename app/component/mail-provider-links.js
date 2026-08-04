"use client";

import { GmailToolIcon, OutlookToolIcon } from "./tool-icons";

// Raccourcis vers la messagerie du visiteur, affiches sous le message "je t'ai
// envoye un lien". Ouvrir sa boite est la seule action qui lui reste a faire, et
// c'est le moment le plus fragile du parcours : lui epargner la recherche de
// l'onglet evite des abandons.
//
// On ouvre la page d'accueil du webmail, pas une recherche filtree : les URL de
// recherche changent souvent cote fournisseur et un lien casse serait pire que
// pas de lien du tout.

function GenericMailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

// Domaines les plus courants en France. La cle est le domaine exact ; les
// suffixes regionaux de Gmail/Outlook sont geres a part (voir detectProvider).
const PROVIDERS = {
  "gmail.com": { label: "Ouvrir Gmail", url: "https://mail.google.com", Icon: GmailToolIcon },
  "googlemail.com": { label: "Ouvrir Gmail", url: "https://mail.google.com", Icon: GmailToolIcon },
  "outlook.com": { label: "Ouvrir Outlook", url: "https://outlook.live.com/mail", Icon: OutlookToolIcon },
  "hotmail.com": { label: "Ouvrir Outlook", url: "https://outlook.live.com/mail", Icon: OutlookToolIcon },
  "hotmail.fr": { label: "Ouvrir Outlook", url: "https://outlook.live.com/mail", Icon: OutlookToolIcon },
  "live.fr": { label: "Ouvrir Outlook", url: "https://outlook.live.com/mail", Icon: OutlookToolIcon },
  "msn.com": { label: "Ouvrir Outlook", url: "https://outlook.live.com/mail", Icon: OutlookToolIcon },
  "orange.fr": { label: "Ouvrir Orange", url: "https://mail.orange.fr", Icon: GenericMailIcon },
  "wanadoo.fr": { label: "Ouvrir Orange", url: "https://mail.orange.fr", Icon: GenericMailIcon },
  "free.fr": { label: "Ouvrir Free", url: "https://zimbra.free.fr", Icon: GenericMailIcon },
  "sfr.fr": { label: "Ouvrir SFR", url: "https://webmail.sfr.fr", Icon: GenericMailIcon },
  "laposte.net": { label: "Ouvrir La Poste", url: "https://www.laposte.net", Icon: GenericMailIcon },
  "yahoo.fr": { label: "Ouvrir Yahoo", url: "https://mail.yahoo.com", Icon: GenericMailIcon },
  "yahoo.com": { label: "Ouvrir Yahoo", url: "https://mail.yahoo.com", Icon: GenericMailIcon },
  "icloud.com": { label: "Ouvrir iCloud Mail", url: "https://www.icloud.com/mail", Icon: GenericMailIcon },
  "me.com": { label: "Ouvrir iCloud Mail", url: "https://www.icloud.com/mail", Icon: GenericMailIcon },
  "protonmail.com": { label: "Ouvrir Proton Mail", url: "https://mail.proton.me", Icon: GenericMailIcon },
  "proton.me": { label: "Ouvrir Proton Mail", url: "https://mail.proton.me", Icon: GenericMailIcon },
};

function detectProvider(email) {
  const domain = String(email).split("@")[1]?.toLowerCase();
  if (!domain) return null;

  const exact = PROVIDERS[domain];
  if (exact) return exact;

  // Adresses professionnelles hebergees chez Google ou Microsoft : le domaine
  // est celui de l'entreprise, on ne peut pas le deviner. On ne propose alors
  // aucun raccourci plutot qu'un lien qui menerait a la mauvaise boite.
  return null;
}

/** Rendu du bloc ---WEBMAIL--- : un bouton vers la messagerie du visiteur. */
export default function MailProviderLinks({ email }) {
  const provider = detectProvider(email);
  if (!provider) return null;

  const { label, url, Icon } = provider;

  // `hidden sm:inline-flex` : masque sur mobile. Il n'existe aucun moyen fiable
  // d'ouvrir l'APPLICATION mail d'un telephone depuis une page web - les
  // schemas d'URL type googlegmail:// sont bloques par plusieurs navigateurs et
  // echouent en silence. Le lien enverrait donc l'utilisateur vers la version
  // web du webmail, ou il n'est souvent pas connecte : pire que pas de bouton.
  // Sur mobile il arrive de toute facon depuis son app mail, le raccourci n'a
  // pas d'interet.
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className="hidden sm:inline-flex items-center gap-2 text-[12px] font-mono px-3 py-1.5 rounded border border-black/15 hover:border-black/40 hover:-translate-y-0.5 transition-all duration-150 ease-out"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}
