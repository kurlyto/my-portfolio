import { ClaudeUsageBar } from "../ClaudeUsageBar";

export const metadata = {
  title: "Comptes IA",
  robots: { index: false, follow: false },
};

export default function ComptesPage() {
  return (
    <>
      <header className="mb-8">
        <p className="viz-mono viz-text-muted text-[11px]">Consommation</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl viz-text-primary">
          Comptes IA
        </h1>
      </header>

      <ClaudeUsageBar />
    </>
  );
}
