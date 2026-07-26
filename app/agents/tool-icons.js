// Icones outillage pour la stack visible sur chaque agent. Icones de marque
// quand elles existent (Gmail, Telegram, Google Sheets/Calendar/Analytics,
// LinkedIn), icones generiques stylees sinon (meme trait fin, coherent).

function Base(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props} />;
}

export function GmailIcon(props) {
  return (
    <Base {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6.5l9 6.5 9-6.5" />
    </Base>
  );
}

export function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.85 4.147a1.5 1.5 0 00-1.53-.256L2.79 10.61a1.35 1.35 0 00.06 2.54l4.44 1.45 1.71 5.51a1 1 0 001.66.4l2.47-2.34 4.36 3.22a1.35 1.35 0 002.13-.82l3.02-14.53a1.5 1.5 0 00-.76-1.89zM9.6 14.86l-.4 3.06-1.3-4.19 9.4-7.02z" />
    </svg>
  );
}

export function GoogleSheetsIcon(props) {
  return (
    <Base {...props}>
      <rect x="4" y="2.5" width="16" height="19" rx="1.5" />
      <path d="M8 11h8M8 14.5h8M8 18h5" />
    </Base>
  );
}

export function GoogleCalendarIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <circle cx="12" cy="14.5" r="1.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function GoogleAnalyticsIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 20V13M12 20V6M18 20V9.5" />
    </Base>
  );
}

export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function CodeIcon(props) {
  return (
    <Base {...props}>
      <path d="M8.5 8L4 12l4.5 4M15.5 8L20 12l-4.5 4" />
    </Base>
  );
}

export function ServerIcon(props) {
  return (
    <Base {...props}>
      <rect x="3.5" y="4" width="17" height="6" rx="1.2" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.2" />
      <circle cx="7" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function SearchIcon(props) {
  return (
    <Base {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
    </Base>
  );
}

export function DatabaseIcon(props) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5V18.5c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5V5.5" />
      <path d="M4.5 12c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5" />
    </Base>
  );
}

export function DocumentIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 2.5h9l3.5 3.5V21.5H6z" />
      <path d="M15 2.5V6h3.5" />
      <path d="M8.5 12h7M8.5 15.5h7M8.5 18.5h4" />
    </Base>
  );
}

export function BackupIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 12a8 8 0 1 1 2.34 5.66" />
      <path d="M4 17v-4h4" />
    </Base>
  );
}

export function TrainIcon(props) {
  return (
    <Base {...props}>
      <rect x="5" y="3.5" width="14" height="13" rx="4" />
      <path d="M5 12h14M9 3.5v13M15 3.5v13" />
      <path d="M7 20l-1.5 2M17 20l1.5 2" />
    </Base>
  );
}

export function PlaneIcon(props) {
  return (
    <Base {...props}>
      <path d="M10.5 3.5l3 7 5-1.5a1.5 1.5 0 011 2.83L13 15.5l.5 4-2-1-1-3.5-4 1-1-1.5 3-2-3.5-2.5 1.5-1.5 4 1 1.5-4.5z" />
    </Base>
  );
}

export function AgendaIcon(props) {
  return (
    <Base {...props}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17M8 2.5v4M16 2.5v4" />
    </Base>
  );
}

export const TOOL_ICONS = {
  Gmail: GmailIcon,
  Telegram: TelegramIcon,
  "Google Sheets": GoogleSheetsIcon,
  "Google Calendar": GoogleCalendarIcon,
  "Google Analytics": GoogleAnalyticsIcon,
  LinkedIn: LinkedInIcon,
  "Code source": CodeIcon,
  "Logs serveur": CodeIcon,
  "Serveurs (VPS)": ServerIcon,
  "Recherche web": SearchIcon,
  "Base de données": DatabaseIcon,
  "Documents PDF": DocumentIcon,
  "Sauvegardes automatiques": BackupIcon,
  SNCF: TrainIcon,
  "Comparateurs de vols": PlaneIcon,
  Agenda: AgendaIcon,
};
