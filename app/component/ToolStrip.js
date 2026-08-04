"use client";

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
function Logo({ tool }) {
  const { Icon } = tool;
  return (
    <div className="group relative shrink-0">
      <div
        aria-label={tool.name}
        role="img"
        className="opacity-90 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5"
      >
        <Icon className="w-10 h-10 md:w-11 md:h-11" />
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
export default function ToolStrip() {
  const doubled = [...TOOLS, ...TOOLS];

  // min-w-0 + overflow-hidden : sans ca, la piste en w-max impose sa largeur
  // totale a la colonne de grille parente et ecrase la colonne voisine.
  return (
    <div className="mt-8 md:mt-12 min-w-0 overflow-x-hidden">
      {/* relative + z-20 : le label passe au-dessus du fondu de gauche de la
          piste, qui sinon vient manger ses premieres lettres. */}
      <p className="relative z-20 text-[11px] font-mono uppercase tracking-widest opacity-40">
        Connectez votre agent à tous vos logiciels
      </p>

      {/* Le survol ne met plus la bande en pause : le defilement continu est
          l'effet recherche, et la bulle suit le logo. */}
      <div className="relative -mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 z-10 bg-gradient-to-l from-white to-transparent" />

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
              <Logo key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
