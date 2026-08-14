"use client";

import { useId } from "react";
import {
  GmailToolIcon,
  GoogleCalendarIcon,
  SheetsIcon,
  DriveIcon,
  NotionIcon,
  SlackIcon,
  WhatsAppToolIcon,
  TelegramToolIcon,
  OutlookToolIcon,
  StripeIcon,
  LinkedInToolIcon,
  InstagramIcon,
  ShopifyIcon,
  ExcelIcon,
  TeamsIcon,
  ZoomIcon,
  PayPalIcon,
  PipedriveIcon,
  QontoIcon,
  PennylaneIcon,
  SageIcon,
  MetaIcon,
  GoogleBusinessIcon,
  WordPressIcon,
} from "./tool-icons";

// Melange volontaire d'outils grand public et d'outils de gestion : la bande
// doit parler autant a un artisan qu'a une PME.
const TOOLS = [
  { name: "Gmail", Icon: GmailToolIcon },
  { name: "Google Agenda", Icon: GoogleCalendarIcon },
  { name: "Google Sheets", Icon: SheetsIcon },
  { name: "Google Drive", Icon: DriveIcon },
  { name: "Outlook", Icon: OutlookToolIcon },
  { name: "Excel", Icon: ExcelIcon },
  { name: "Microsoft Teams", Icon: TeamsIcon },
  { name: "WhatsApp", Icon: WhatsAppToolIcon },
  { name: "Telegram", Icon: TelegramToolIcon },
  { name: "Zoom", Icon: ZoomIcon },
  { name: "Qonto", Icon: QontoIcon },
  { name: "Pennylane", Icon: PennylaneIcon },
  { name: "Sage", Icon: SageIcon },
  { name: "Stripe", Icon: StripeIcon },
  { name: "PayPal", Icon: PayPalIcon },
  { name: "Pipedrive", Icon: PipedriveIcon },
  { name: "Meta Business", Icon: MetaIcon },
  { name: "Fiche Google", Icon: GoogleBusinessIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "LinkedIn", Icon: LinkedInToolIcon },
  { name: "Shopify", Icon: ShopifyIcon },
  { name: "WordPress", Icon: WordPressIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "Slack", Icon: SlackIcon },
];

// Logo seul, sans pastille : le nom reste accessible au survol et aux lecteurs
// d'ecran, mais n'encombre pas la bande.
// Pas d'attribut title : l'infobulle native met une seconde a apparaitre et
// suit le curseur, ce qui est illisible sur un logo qui defile. La bulle est
// ancree au logo et se deplace donc avec lui.
// `idPrefix` rend uniques les <defs> des icones a degrade (Instagram). Deux
// niveaux de duplication existent et doivent TOUS deux etre couverts :
//   1. la piste double la liste pour boucler le defilement ;
//   2. la home monte deux ToolStrip a la fois — celle du hero (masquee en
//      desktop par `hidden`) et celle en pleine largeur.
// Un id partage se resout sur le PREMIER element du document, ici celui de la
// piste masquee : un degrade appartenant a un SVG en display:none n'est pas
// peint, donc les logos visibles s'affichaient vides. D'ou le prefixe par
// instance (useId) en plus du suffixe par copie.
function Logo({ tool, idPrefix, copy }) {
  const { Icon } = tool;
  return (
    <div className="group relative shrink-0">
      <div
        aria-label={tool.name}
        role="img"
        className="opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5"
      >
        {/* Le nom est normalise : plusieurs outils ont un espace ("Google
            Agenda"), interdit dans un id reference par `url(#...)`. */}
        <Icon
          className="w-10 h-10 md:w-11 md:h-11"
          gradientId={`${idPrefix}-${tool.name.replace(/\W/g, "")}-${copy}`}
        />
      </div>

      <span className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-black px-2.5 py-1.5 text-[11px] font-mono text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {tool.name}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-black" />
      </span>
    </div>
  );
}

// Bandeau compact place sous le texte du hero. Largeur limitee a la colonne
// gauche : le fondu de droite marque la coupure sans bord net.
/**
 * `fullWidth` : la bande occupe toute la largeur de la fenetre au lieu d'etre
 * confinee a sa colonne. Utilise en desktop, ou la bande est sortie de la
 * grille du hero et posee en pleine largeur sous les deux colonnes - un
 * defilement sur 1440px raconte bien mieux "connectable a tout" que le meme
 * sur 620px.
 */
export default function ToolStrip({ fullWidth = false }) {
  const doubled = [...TOOLS, ...TOOLS];
  // useId : identifiant stable entre le rendu serveur et le client (un
  // compteur ou Math.random casserait l'hydratation). Les ":" qu'il contient
  // sont retires : ils sont valides dans un id HTML mais cassent la reference
  // `url(#...)` cote SVG, ou ils seraient lus comme un selecteur.
  const idPrefix = `tools${useId().replace(/:/g, "")}`;

  // min-w-0 + overflow-hidden : sans ca, la piste en w-max impose sa largeur
  // totale a la colonne de grille parente et ecrase la colonne voisine.
  return (
    <div className={`min-w-0 overflow-x-hidden ${fullWidth ? "" : "mt-8 md:mt-12"}`}>
      {/* relative + z-20 : le label passe au-dessus du fondu de gauche de la
          piste, qui sinon vient manger ses premieres lettres. */}
      <p
        className={`relative z-20 text-[11px] font-mono uppercase tracking-widest opacity-40 ${
          fullWidth ? "max-w-7xl mx-auto px-6" : ""
        }`}
      >
        Connectez votre agent à tous vos logiciels
      </p>

      {/* Le survol ne met plus la bande en pause : le defilement continu est
          l'effet recherche, et la bulle suit le logo. */}
      <div className="relative -mt-4">
        {/* Fondus plus larges en pleine largeur : sur 1440px, 40px de degrade
            se voient comme une coupure nette au lieu d'un fondu. */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-white to-transparent ${
            fullWidth ? "w-24 md:w-40" : "w-10"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-white to-transparent ${
            fullWidth ? "w-24 md:w-40" : "w-14"
          }`}
        />

        {/* overflow-x seul : la bulle depasse vers le haut et ne doit pas etre
            rognee, mais la piste doit rester coupee horizontalement. Le pt-10
            lui reserve la place. */}
        <div className="overflow-x-hidden pt-10">
          <div
            className="flex items-center gap-7 w-max"
            style={{
              animation: "marquee 80s linear infinite",
            }}
          >
            {doubled.map((tool, i) => (
              <Logo
                key={`${tool.name}-${i}`}
                tool={tool}
                idPrefix={idPrefix}
                copy={i < TOOLS.length ? "a" : "b"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
