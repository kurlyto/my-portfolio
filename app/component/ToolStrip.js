"use client";

import { useState } from "react";
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
function Logo({ tool }) {
  const { Icon } = tool;
  return (
    <div
      title={tool.name}
      aria-label={tool.name}
      role="img"
      className="shrink-0 grayscale-0 opacity-90 transition-all duration-200 hover:opacity-100 hover:-translate-y-0.5"
    >
      <Icon className="w-10 h-10 md:w-11 md:h-11" />
    </div>
  );
}

// Bandeau compact place sous le texte du hero. Largeur limitee a la colonne
// gauche : le fondu de droite marque la coupure sans bord net.
export default function ToolStrip() {
  const [paused, setPaused] = useState(false);
  const doubled = [...TOOLS, ...TOOLS];

  // min-w-0 + overflow-hidden : sans ca, la piste en w-max impose sa largeur
  // totale a la colonne de grille parente et ecrase la colonne voisine.
  return (
    <div className="mt-12 min-w-0 overflow-hidden">
      <p className="text-[11px] font-mono uppercase tracking-widest opacity-40">
        Connectable à vos outils
      </p>

      <div
        className="relative mt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 z-10 bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden">
          <div
            className="flex items-center gap-7 w-max"
            style={{
              animation: "marquee 80s linear infinite",
              animationPlayState: paused ? "paused" : "running",
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
