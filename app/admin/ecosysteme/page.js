import { ComparisonTable } from "./ComparisonTable";
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
import { RAG_TOOLS, RAG_TOOL_COLUMNS, RAG_SOURCES, RAG_LICENSE_WARNING } from "../data/rag";
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
      <header className="mb-10">
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

      <Section
        id="fournisseurs"
        label="Fournisseurs"
        title="Modèles, localisation, conformité"
        note="L'hébergement de l'agent et le fournisseur du modèle sont deux maillons distincts. Un serveur français certifié HDS ne protège rien si le modèle appelé est hors UE. La colonne « droit » prime sur la localisation des serveurs : une filiale européenne d'un éditeur américain reste soumise au droit américain."
      >
        <ComparisonTable columns={PROVIDER_COLUMNS} rows={PROVIDERS} />
        <Sources items={PROVIDER_SOURCES} />
      </Section>

      <Section
        id="machines"
        label="Matériel"
        title="Machines et coûts"
        note="Repère de lecture : un humain lit à environ 10 tokens par seconde. 10 tok/s suit la lecture, 30 tok/s est confortable, 5 tok/s est pénible. La vitesse dépend de la bande passante mémoire, pas de la puissance de calcul."
      >
        <ComparisonTable columns={HARDWARE_COLUMNS} rows={HARDWARE} />
      </Section>

      <Section
        id="messagerie"
        label="Interface"
        title="Passerelles de messagerie"
        note="Un bot est une extrémité de la conversation : le contenu est toujours en clair sur le serveur qui héberge l'agent. Le chiffrement de bout en bout protège contre l'opérateur de la messagerie, jamais contre l'hébergeur de l'agent."
      >
        <ComparisonTable columns={GATEWAY_COLUMNS} rows={GATEWAYS} />
        <Sources items={GATEWAY_SOURCES} />
      </Section>

      <Section
        id="execution"
        label="Exécution"
        title="Logiciels d'exécution"
        note="Deux familles à ne pas confondre : les runtimes de poste optimisent un utilisateur sur une machine, les runtimes de serveur optimisent plusieurs utilisateurs sur du matériel partagé. vLLM est mauvais sur un portable, Ollama est mauvais en production multi-utilisateurs."
      >
        <ComparisonTable columns={RUNTIME_COLUMNS} rows={RUNTIMES} />
        <Sources items={HARDWARE_SOURCES} />
      </Section>

      <Section id="rag" label="RAG" title="Outils de recherche documentaire">
        <ComparisonTable columns={RAG_TOOL_COLUMNS} rows={RAG_TOOLS} />
        <div className="eco-verdict mt-5">
          <p className="eco-verdict-title">{RAG_LICENSE_WARNING.title}</p>
          <p className="eco-verdict-body mt-2">{RAG_LICENSE_WARNING.body}</p>
        </div>
        <Sources items={RAG_SOURCES} />
      </Section>

      <Section
        id="modeles-locaux"
        label="Matériel"
        title="Modèles exécutables localement"
        note="En Q4_K_M, compter environ 0,6 Go par milliard de paramètres, plus 2 à 8 Go de cache de contexte. Pour un modèle MoE, ce sont les paramètres totaux qui doivent tenir en mémoire, pas les paramètres actifs."
      >
        <ComparisonTable columns={LOCAL_MODEL_COLUMNS} rows={LOCAL_MODELS} />
      </Section>

      <Section id="faq" label="Objections" title="Questions fréquentes des clients">
        <Faq items={CLIENT_QUESTIONS} />
      </Section>
    </>
  );
}
