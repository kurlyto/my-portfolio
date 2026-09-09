"use client";

// Maquettes d'ecran de l'AIOS : une fenetre de navigateur et un telephone.
//
// Volontairement dessinees en CSS plutot que capturees : une vraie capture
// montrerait les donnees personnelles de Nathan, et resterait floue au
// redimensionnement. Extraites de l'ancienne AiosSection le 08/09/2026, quand
// l'AIOS a pris son propre site : elles servent maintenant a plusieurs
// sections.
//
// `tone` : "dark" (posees sur un fond fonce) ou "light" (posees sur le creme
// du hero depuis la refonte chaleureuse du 08/09/2026). Le meme dessin ne peut
// pas servir dans les deux cas : des traits blancs a 12 % d'opacite
// disparaissent completement sur un fond clair.

const TILES = [
  {
    label: "Mails",
    lines: [
      { w: "w-4/5", strong: true },
      { w: "w-3/5" },
      { w: "w-2/3" },
    ],
    badge: "3",
  },
  {
    label: "Agenda",
    lines: [{ w: "w-2/3", strong: true }, { w: "w-1/2" }, { w: "w-3/5" }],
    badge: null,
  },
  {
    label: "Clients",
    lines: [{ w: "w-3/4", strong: true }, { w: "w-3/5" }, { w: "w-1/2" }],
    badge: "1",
  },
  {
    label: "Tâches",
    lines: [{ w: "w-3/5", strong: true }, { w: "w-4/5" }, { w: "w-2/5" }],
    badge: null,
  },
];

const TONES = {
  dark: {
    frame: "border-white/15 bg-white/[0.03]",
    bar: "border-white/10",
    dot: "bg-white/15",
    url: "text-white/40",
    tile: "bg-white/[0.06] border-white/10",
    tileLabel: "text-white/50",
    lineStrong: "bg-white/30",
    line: "bg-white/[0.12]",
    field: "bg-white/[0.04]",
    fieldText: "text-white/35",
    shadow: "",
  },
  light: {
    frame: "border-black/10 bg-white",
    bar: "border-black/[0.07]",
    dot: "bg-black/10",
    url: "text-black/35",
    tile: "bg-[#faf6f0] border-black/[0.07]",
    tileLabel: "text-black/45",
    lineStrong: "bg-black/25",
    line: "bg-black/[0.09]",
    field: "bg-white",
    fieldText: "text-black/35",
    shadow: "shadow-[0_24px_60px_-30px_rgba(40,22,14,0.45)]",
  },
};

function MockTile({ tile, compact = false, t }) {
  return (
    <div className={`rounded border ${t.tile} ${compact ? "p-2.5" : "p-3.5"}`}>
      <div className="flex items-center justify-between">
        <span
          className={`font-mono uppercase tracking-wider ${t.tileLabel} ${
            compact ? "text-[8px]" : "text-[10px]"
          }`}
        >
          {tile.label}
        </span>
        {tile.badge && (
          <span
            className={`flex items-center justify-center rounded-full bg-accent text-white font-mono font-bold ${
              compact ? "w-3.5 h-3.5 text-[7px]" : "w-[18px] h-[18px] text-[9px]"
            }`}
          >
            {tile.badge}
          </span>
        )}
      </div>
      <div className={`flex flex-col ${compact ? "mt-2 gap-1.5" : "mt-3 gap-2"}`}>
        {tile.lines.map((line, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full ${line.w} ${
              line.strong ? t.lineStrong : t.line
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Fenetre navigateur stylisee : la barre de titre aux trois points, les tuiles
// metier, et la barre de commande unique en bas, la signature du produit.
export function DesktopMock({ tone = "dark" }) {
  const t = TONES[tone] ?? TONES.dark;

  return (
    <div className={`rounded-lg border overflow-hidden ${t.frame} ${t.shadow}`}>
      <div className={`flex items-center gap-1.5 px-4 py-2.5 border-b ${t.bar}`}>
        <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
        <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
        <span className={`w-2.5 h-2.5 rounded-full ${t.dot}`} />
        <div className="ml-3 flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo local
              a taille fixe, next/image n'apporte rien ici. */}
          <img src="/images/cover-aios.png" alt="" className="w-4 h-4 object-contain" />
          <span className={`text-[10px] font-mono ${t.url}`}>votre-entreprise.foxy</span>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {TILES.map((tile) => (
          <MockTile key={tile.label} tile={tile} t={t} />
        ))}
      </div>
      <div className="px-4 pb-4">
        <div className={`flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2.5 ${t.field}`}>
          <span className={`flex-1 text-[11px] ${t.fieldText}`}>
            Demandez n&apos;importe quoi...
          </span>
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-[10px]">
            &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

// Le meme poste de commande dans un cadre de telephone : c'est l'argument
// "depuis votre PC ou votre poche", montre plutot que raconte.
export function PhoneMock({ tone = "dark" }) {
  const t = TONES[tone] ?? TONES.dark;

  return (
    <div className={`w-[130px] shrink-0 rounded-[22px] border p-2.5 ${t.frame} ${t.shadow}`}>
      <div className={`mx-auto w-8 h-1 rounded-full mb-2.5 ${t.dot}`} />
      <div className="flex flex-col gap-2">
        <MockTile compact tile={TILES[0]} t={t} />
        <MockTile compact tile={TILES[2]} t={t} />
      </div>
      <div className="mt-2.5 flex items-center gap-1.5 rounded-full border border-accent/50 px-2.5 py-1.5">
        <span className={`flex-1 h-1.5 rounded-full ${t.line}`} />
        <span className="w-3.5 h-3.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}
