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
  XIcon,
  InstagramIcon,
  ShopifyIcon,
  HubspotIcon,
} from "./tool-icons";

const TOOLS = [
  { name: "Gmail", Icon: GmailToolIcon },
  { name: "Google Agenda", Icon: GoogleCalendarIcon },
  { name: "Sheets", Icon: SheetsIcon },
  { name: "Drive", Icon: DriveIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "Slack", Icon: SlackIcon },
  { name: "WhatsApp", Icon: WhatsAppToolIcon },
  { name: "Telegram", Icon: TelegramToolIcon },
  { name: "Outlook", Icon: OutlookToolIcon },
  { name: "Stripe", Icon: StripeIcon },
  { name: "LinkedIn", Icon: LinkedInToolIcon },
  { name: "X", Icon: XIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "Shopify", Icon: ShopifyIcon },
  { name: "HubSpot", Icon: HubspotIcon },
];

function Chip({ tool }) {
  const { Icon } = tool;
  return (
    <div className="shrink-0 flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 transition-all duration-200 hover:border-[#ff6b35]/50 hover:-translate-y-0.5 hover:shadow-sm">
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-[12px] font-mono whitespace-nowrap">{tool.name}</span>
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
        Connectable a vos outils
      </p>

      <div
        className="relative mt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white via-white/80 to-transparent" />

        <div className="overflow-hidden">
          <div
            className="flex gap-2.5 w-max"
            style={{
              animation: "marquee 52s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {doubled.map((tool, i) => (
              <Chip key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
