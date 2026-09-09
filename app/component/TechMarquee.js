"use client";

import {
  siHtml5, siCss, siJavascript, siTypescript, siPython, siGnubash,
  siNextdotjs, siReact, siNodedotjs, siExpress, siVite, siTailwindcss,
  siFramer, siPrisma, siSocketdotio,
  siPostgresql, siSqlite, siSupabase,
  siLinux, siDocker, siGit, siNginx, siCaddy, siPm2,
  siAnthropic, siClaude,
  siPuppeteer, siAuth0,
  siStripe, siTelegram, siGmail, siGooglecalendar, siGooglesheets, siGoogledrive,
  siNotion, siTrello,
  siHubspot, siUmami, siGooglesearchconsole,
  siX, siInstagram, siMeta, siDiscord,
  siPaypal, siSage, siShopify, siWordpress,
} from "simple-icons";
// Renomme : ce fichier a deja son propre helper `t()` pour construire une pill.
import { t as tr } from "../lib/i18n-projects";

// Bandeau "tout ce que j'ai deja utilise". Volontairement exhaustif : langages,
// frameworks, bases, infra, IA, APIs, outils, marketing, social, paiement. Chaque
// item porte le VRAI logo officiel (simple-icons) quand il existe, sinon reste en
// texte seul. Les categories (puces orange) rythment la liste.
//
// Certaines marques (LinkedIn, OpenAI, Slack, Groq, Apify...) ont ete retirees
// de simple-icons ou n'y sont jamais entrees (marque protegee, trop niche) :
// on les redefinit ici a la main (path + couleur), recuperees sur leurs sites
// officiels le 30/08/2026.
const LINKEDIN = { hex: "0A66C2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" };
const OPENAI = { hex: "FFFFFF", path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" };
const SLACK = { hex: "FFFFFF", path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" };
const GROQ = { hex: "F43E01", viewBox: "0 0 33 33", path: "m18.445 4.406-9.468 13.74 7.341.665-1.69 9.578 9.469-13.74-7.342-.664 1.69-9.579Z" };
const APIFY = { hex: "246DFF", viewBox: "0 0 1080 1080", paths: [
  "M607.859 78.2218H987.785C995.513 78.2218 1001.78 84.4868 1001.78 92.2151V672.834C1001.78 686.742 983.69 692.134 976.075 680.496L596.15 99.877C590.06 90.5703 596.737 78.2218 607.859 78.2218Z",
  "M472.141 78.2218H92.215C84.4867 78.2218 78.2217 84.4868 78.2217 92.2151V672.834C78.2217 686.742 96.3094 692.134 103.924 680.496L483.85 99.877C489.94 90.5703 483.263 78.2218 472.141 78.2218Z",
  "M533.491 543.086L101.895 977.927C93.1302 986.758 99.3849 1001.78 111.826 1001.78H968.529C980.919 1001.78 987.197 986.863 978.535 978.003L553.429 543.161C547.969 537.576 538.993 537.542 533.491 543.086Z",
] };

// Helpers de construction : `t(label, icon)` = item avec logo, `x(label)` = texte
// seul (marque sans logo officiel : Hermes, MCP, VPS...), `c(cat)` = puce categorie.
// Un `x()` sans logo affiche quand meme un mini-monogramme (voir Item) : jamais
// de pill "nue" a cote des pills a logo.
const t = (label, icon) => ({ label, icon });
const x = (label) => ({ label });
const c = (cat) => ({ cat });

const ALL_ITEMS = [
  c("Langages"),
  t("HTML", siHtml5), t("CSS", siCss), t("JavaScript", siJavascript), t("TypeScript", siTypescript), t("Python", siPython), x("SQL"), t("Bash", siGnubash),
  c("Frameworks"),
  t("Next.js", siNextdotjs), t("React", siReact), t("Node.js", siNodedotjs), t("Express", siExpress), t("Vite", siVite), t("Tailwind CSS", siTailwindcss), t("Framer Motion", siFramer), t("Prisma", siPrisma), t("Socket.io", siSocketdotio),
  c("Bases de données"),
  t("PostgreSQL", siPostgresql), t("SQLite", siSqlite), t("Supabase", siSupabase),
  c("Infra & DevOps"),
  t("Linux", siLinux), t("Docker", siDocker), t("Git", siGit), t("Nginx", siNginx), t("Caddy", siCaddy), t("PM2", siPm2), x("VPS"),
  c("IA & Agents"),
  t("Claude", siAnthropic), t("Claude Code", siClaude), t("OpenAI", OPENAI), x("MCP"), t("Groq Whisper", GROQ), x("Hermes"),
  c("Automatisation"),
  x("Playwright"), t("Puppeteer", siPuppeteer), t("Apify", APIFY), t("OAuth", siAuth0), x("Cron"),
  c("API"),
  x("API gouv.fr / BODACC"), t("Stripe API", siStripe), t("Telegram Bot API", siTelegram), t("Gmail API", siGmail), t("Google Calendar API", siGooglecalendar), t("Sheets API", siGooglesheets), t("Drive API", siGoogledrive),
  c("Outils"),
  t("Notion", siNotion), t("Google Sheets", siGooglesheets), t("Google Drive", siGoogledrive), t("Slack", SLACK), x("Excel"), t("Trello", siTrello),
  c("Marketing & Analytics"),
  x("Lemlist"), x("Pipedrive"), t("HubSpot", siHubspot), t("Umami", siUmami), t("Search Console", siGooglesearchconsole), x("Microsoft Clarity"), x("SEO / GEO"),
  c("Social"),
  t("LinkedIn", LINKEDIN), t("X", siX), t("Instagram", siInstagram), t("Meta Business", siMeta), t("Discord", siDiscord),
  c("Paiement & Compta"),
  t("Stripe", siStripe), t("PayPal", siPaypal), x("Qonto"), x("Pennylane"), t("Sage", siSage),
  c("E-commerce & CMS"),
  t("Shopify", siShopify), t("WordPress", siWordpress),
];

// Luminance perceptuelle : un logo dont la couleur de marque est trop sombre
// (Next.js, X, Notion, Anthropic...) serait invisible sur le fond noir. On le
// bascule alors en blanc. Les couleurs claires gardent leur teinte de marque.
function tintFor(hex) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 80 ? "#ffffff" : `#${hex}`;
}

// Premiere lettre alphanumerique du label, en majuscule : monogramme de secours
// pour les marques sans logo officiel (Hermes, MCP, VPS...), afin qu'aucune pill
// ne paraisse "cassee" a cote des pills a logo.
function initial(label) {
  const m = label.match(/[a-zA-Z0-9]/);
  return m ? m[0].toUpperCase() : "?";
}

function Item({ item }) {
  if (item.cat) {
    return (
      <span className="shrink-0 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-[11px]">
        {item.cat}
      </span>
    );
  }
  return (
    <span className="flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-3 pr-5 text-sm font-medium text-white/85 sm:gap-2.5 sm:py-2 sm:pl-2.5 sm:pr-4 sm:text-[13px]">
      {item.icon ? (
        <svg
          viewBox={item.icon.viewBox || "0 0 24 24"}
          aria-hidden
          className="h-5 w-5 shrink-0 sm:h-[18px] sm:w-[18px]"
          fill={tintFor(item.icon.hex)}
        >
          {item.icon.paths
            ? item.icon.paths.map((d, i) => <path key={i} d={d} />)
            : <path d={item.icon.path} />}
        </svg>
      ) : (
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/55 sm:h-[18px] sm:w-[18px] sm:text-[9px]"
        >
          {initial(item.label)}
        </span>
      )}
      {item.label}
    </span>
  );
}

function Row({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-x-hidden py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent md:w-40" />
      <div
        className="flex w-max items-center gap-4"
        style={{ animation: "marquee 260s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee({ lang = "fr" }) {
  return (
    <section className="snap-screen flex flex-col justify-center overflow-hidden bg-black py-16 text-white max-sm:min-h-[100dvh] md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          {tr(lang).tech.title}
        </h2>
      </div>
      <div className="mt-12 md:mt-14">
        <Row items={ALL_ITEMS} />
      </div>
    </section>
  );
}
