// Meme format que nate/mission.md : le message se termine par un bloc
// ---BOUTONS--- suivi d'une option par ligne (voir nate/telegram-bot/src/index.js
// pour la version Telegram equivalente, meme marqueur, meme limite de 6).
const MARKER = "---BOUTONS---";

export function splitButtons(reply) {
  const idx = reply.indexOf(MARKER);
  if (idx === -1) return { text: reply.trim(), buttons: null };

  const text = reply.slice(0, idx).trim();
  const buttons = reply
    .slice(idx + MARKER.length)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 12);

  return { text, buttons: buttons.length ? buttons : null };
}
