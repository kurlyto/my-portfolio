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
    <div className="shrink-0 flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2.5 transition-all duration-200 hover:border-[#ff6b35]/50 hover:-translate-y-0.5 hover:shadow-sm">
      <Icon className="w-5 h-5 shrink-0" />
      <span className="text-[13px] font-mono whitespace-nowrap">{tool.name}</span>
    </div>
  );
}

export default function ToolStrip() {
  const [paused, setPaused] = useState(false);
  const doubled = [...TOOLS, ...TOOLS];

  return (
    <section className="border-y border-black/10 bg-[#fafafa] py-10 overflow-hidden">
      <p className="text-center text-xs font-mono uppercase tracking-widest opacity-40">
        Connectable a vos outils
      </p>

      <div
        className="relative mt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Degrades lateraux : les chips entrent et sortent en fondu au lieu
            d'etre coupees net au bord de l'ecran. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#fafafa] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#fafafa] to-transparent" />

        <div className="overflow-hidden">
          <div
            className="flex gap-3 w-max"
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

      <p className="mt-6 text-center text-xs font-mono opacity-40">
        et tout outil disposant d&apos;une API
      </p>
    </section>
  );
}
