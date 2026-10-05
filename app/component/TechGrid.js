import {
  siHtml5, siCss, siJavascript, siTypescript, siPython, siGnubash,
  siNextdotjs, siReact, siNodedotjs, siExpress, siVite, siTailwindcss,
  siFramer, siPrisma, siSocketdotio,
  siPostgresql, siSqlite, siSupabase,
  siLinux, siDocker, siGit, siNginx, siCaddy, siPm2,
  siAnthropic, siModelcontextprotocol, siPuppeteer, siAuth0,
  siGooglecalendar, siUmami, siGooglesearchconsole,
} from "simple-icons";
import { t as tr } from "../lib/i18n-projects";

// Bloc "Deja utilises dans mes projets", FIXE et range par categories (demande
// de Nathan du 05/10/2026 : plus de bandeau qui defile, les vrais logos, et tous
// les connecteurs deja branches). Remplace TechMarquee (garde dans le depot pour
// un retour arriere d'une ligne dans PortfolioPage.js).
//
// Deux sources de logos :
// - `img` : le logo officiel en image, dans public/logos/tech/ (la plupart copies
//   des connecteurs de l'AIOS, /data/nathan/aios/public/logos, le 05/10/2026) ;
// - `si` : une icone simple-icons, dessinee dans la couleur de la marque.
// Chaque logo est pose sur une petite tuile BLANCHE : il garde ses vraies
// couleurs, y compris les marques sombres (Next.js, Notion, GitHub, X).
const img = (label, file) => ({ label, src: `/logos/tech/${file}` });
const si = (label, icon) => ({ label, icon });

const OPENAI = { hex: "000000", path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" };

const CATEGORIES = [
  { fr: "Langages", en: "Languages", items: [
    si("HTML", siHtml5), si("CSS", siCss), si("JavaScript", siJavascript),
    si("TypeScript", siTypescript), si("Python", siPython), si("Bash", siGnubash),
  ] },
  { fr: "Frameworks", en: "Frameworks", items: [
    si("Next.js", siNextdotjs), si("React", siReact), si("Node.js", siNodedotjs),
    si("Express", siExpress), si("Vite", siVite), si("Tailwind CSS", siTailwindcss),
    si("Framer Motion", siFramer), si("Prisma", siPrisma), si("Socket.io", siSocketdotio),
  ] },
  { fr: "Bases de données", en: "Databases", items: [
    si("PostgreSQL", siPostgresql), si("SQLite", siSqlite), si("Supabase", siSupabase),
  ] },
  { fr: "Infra & DevOps", en: "Infra & DevOps", items: [
    si("Linux", siLinux), si("Docker", siDocker), si("Git", siGit), img("GitHub", "github.svg"),
    si("Nginx", siNginx), si("Caddy", siCaddy), si("PM2", siPm2),
  ] },
  { fr: "IA & Agents", en: "AI & Agents", items: [
    si("Claude", siAnthropic), img("Claude Code", "claude.png"), si("OpenAI", OPENAI),
    si("MCP", siModelcontextprotocol), img("Groq", "groq.svg"), img("fal.ai", "fal.png"),
    img("WaveSpeed", "wavespeed.svg"), img("TypeSafe", "typesafe.png"),
  ] },
  { fr: "Automatisation & scraping", en: "Automation & scraping", items: [
    img("Playwright", "playwright.svg"), si("Puppeteer", siPuppeteer), img("Apify", "apify.png"), si("OAuth", siAuth0),
  ] },
  { fr: "Google & Microsoft", en: "Google & Microsoft", items: [
    img("Gmail", "gmail.png"), si("Google Agenda", siGooglecalendar), img("Google Sheets", "sheets.svg"),
    img("Google Drive", "drive.png"), img("Outlook", "outlook.png"), img("Excel", "excel.svg"),
  ] },
  { fr: "Organisation & équipes", en: "Workspace & teams", items: [
    img("Notion", "notion.png"), img("Trello", "trello.svg"), img("Slack", "slack.svg"),
    img("Jira & Confluence", "atlassian.svg"), img("Linear", "linear.svg"),
  ] },
  { fr: "Clients & ventes", en: "Customers & sales", items: [
    img("Lemlist", "lemlist.png"), img("HubSpot", "hubspot.png"), img("Pipedrive", "pipedrive.png"),
    img("Brevo", "brevo.svg"), img("Calendly", "calendly.svg"), img("Twenty", "twenty.svg"),
    img("Crisp", "crisp.png"), img("Zendesk", "zendesk.svg"), img("Intercom", "intercom.svg"),
  ] },
  { fr: "Marketing & analytics", en: "Marketing & analytics", items: [
    si("Search Console", siGooglesearchconsole), si("Umami", siUmami), img("Microsoft Clarity", "clarity.png"),
    img("Buffer", "buffer.svg"), img("Fathom", "fathom.png"), img("tl;dv", "tldv.png"),
  ] },
  { fr: "Réseaux & messageries", en: "Social & messaging", items: [
    img("LinkedIn", "linkedin.png"), img("X", "x.svg"), img("Instagram", "instagram.svg"),
    img("Meta Business", "meta.svg"), img("Telegram", "telegram.svg"), img("Discord", "discord.svg"),
    img("Welcome to the Jungle", "wttj.png"),
  ] },
  { fr: "Paiement & compta", en: "Payments & accounting", items: [
    img("Stripe", "stripe.svg"), img("PayPal", "paypal.svg"), img("Qonto", "qonto.png"),
    img("Pennylane", "pennylane.png"), img("Sage", "sage.svg"),
  ] },
  { fr: "RH & paie", en: "HR & payroll", items: [
    img("PayFit", "payfit.png"), img("Factorial", "factorial.png"), img("Lucca", "lucca.png"),
    img("Cegid HR", "cegid-hr.png"), img("Silae", "silae.png"), img("Combo", "combo.png"),
  ] },
  { fr: "E-commerce & sites", en: "E-commerce & websites", items: [
    img("Shopify", "shopify.svg"), img("WooCommerce", "woocommerce.svg"), img("PrestaShop", "prestashop.svg"),
    img("WordPress", "wordpress.svg"), img("La Poste (suivi de colis)", "laposte.svg"),
  ] },
  { fr: "Données publiques", en: "Public data", items: [
    img("BODACC", "bodacc.png"),
  ] },
];

// Couleur de marque trop claire pour une tuile blanche (OpenAI blanc...) : en noir.
function teinte(hex) {
  const n = parseInt(hex, 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 225 ? "#111111" : `#${hex}`;
}

function Logo({ item }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white p-1">
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt="" className="h-full w-full object-contain" />
      ) : (
        <svg viewBox={item.icon.viewBox || "0 0 24 24"} aria-hidden className="h-full w-full" fill={teinte(item.icon.hex)}>
          <path d={item.icon.path} />
        </svg>
      )}
    </span>
  );
}

export default function TechGrid({ lang = "fr" }) {
  return (
    <section className="snap-screen bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          {tr(lang).tech.title}
        </h2>
        <div className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3 md:mt-14">
          {CATEGORIES.map((cat) => (
            <div key={cat.fr} className="mb-9 break-inside-avoid">
              <h3 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                {lang === "en" ? cat.en : cat.fr}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-1 pl-1 pr-3.5 text-[13px] font-medium text-white/85"
                  >
                    <Logo item={item} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
