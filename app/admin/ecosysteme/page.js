import { ComparisonTable } from "./ComparisonTable";
import { ProviderMatcher } from "./ProviderMatcher";
import { Section, Sources } from "./Section";
import { Freshness } from "./Freshness";
import { Faq } from "./Faq";
import { Toc } from "./Toc";
import { PROVIDERS, PROVIDER_COLUMNS, PROVIDER_SOURCES } from "../data/providers";
import {
  LOCAL_MODELS,
  LOCAL_MODEL_COLUMNS,
  HARDWARE,
  HARDWARE_COLUMNS,
  RUNTIMES,
  RUNTIME_COLUMNS,
  HARDWARE_SOURCES,
} from "../data/hardware";
import { GATEWAYS, GATEWAY_COLUMNS, GATEWAY_SOURCES } from "../data/gateways";
import { RAG_TOOLS, RAG_TOOL_COLUMNS, RAG_SOURCES } from "../data/rag";
import { CLIENT_QUESTIONS } from "../data/questions";

export const metadata = {
  title: "Écosystème IA",
  robots: { index: false, follow: false },
};

// Un seul endroit qui décide de l'ordre et des libellés : le sommaire et
// les sections lisent la même liste, ils ne peuvent pas diverger.
const SECTIONS = [
  { id: "fournisseurs", label: "Fournisseurs", count: `${PROVIDERS.length} fournisseurs` },
  { id: "machines", label: "Machines et coûts", count: `${HARDWARE.length} configurations` },
  { id: "messagerie", label: "Messagerie", count: `${GATEWAYS.length} passerelles` },
  { id: "execution", label: "Logiciels d'exécution", count: `${RUNTIMES.length} logiciels` },
  { id: "rag", label: "Outils RAG", count: `${RAG_TOOLS.length} outils` },
  { id: "modeles-locaux", label: "Modèles locaux", count: `${LOCAL_MODELS.length} modèles` },
  { id: "faq", label: "Questions clients", count: `${CLIENT_QUESTIONS.length} objections` },
];

export default function EcosystemePage() {
  return (
    <>
      <header className="mb-12">
        <p className="viz-mono viz-text-muted text-[11px]">Référence</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl viz-text-primary">
          Écosystème IA
        </h1>
        <div className="mt-5">
          <Freshness />
        </div>
        <div className="mt-6">
          <Toc items={SECTIONS} />
        </div>
      </header>

      <Section id="fournisseurs" title="Fournisseurs">
        <ProviderMatcher columns={PROVIDER_COLUMNS} rows={PROVIDERS} />
        <Sources items={PROVIDER_SOURCES} />
      </Section>

      <Section id="machines" title="Machines et coûts">
        <ComparisonTable columns={HARDWARE_COLUMNS} rows={HARDWARE} />
      </Section>

      <Section id="messagerie" title="Messagerie">
        <ComparisonTable columns={GATEWAY_COLUMNS} rows={GATEWAYS} />
        <Sources items={GATEWAY_SOURCES} />
      </Section>

      <Section id="execution" title="Logiciels d'exécution">
        <ComparisonTable columns={RUNTIME_COLUMNS} rows={RUNTIMES} />
        <Sources items={HARDWARE_SOURCES} />
      </Section>

      <Section id="rag" title="Outils RAG">
        <ComparisonTable columns={RAG_TOOL_COLUMNS} rows={RAG_TOOLS} />
        <Sources items={RAG_SOURCES} />
      </Section>

      <Section id="modeles-locaux" title="Modèles locaux">
        <ComparisonTable columns={LOCAL_MODEL_COLUMNS} rows={LOCAL_MODELS} />
      </Section>

      <Section id="faq" title="Questions clients">
        <Faq items={CLIENT_QUESTIONS} />
      </Section>
    </>
  );
}
