import { ComparisonTable } from "./ComparisonTable";
import { Section, Sources, Pending } from "./Section";
import { Freshness } from "./Freshness";
import { Faq } from "./Faq";
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
      </header>

      <Section
        label="Fournisseurs"
        title="Modèles, localisation, conformité"
        note="L'hébergement de l'agent et le fournisseur du modèle sont deux maillons distincts. Un serveur français certifié HDS ne protège rien si le modèle appelé est hors UE. La colonne « droit applicable » prime sur la localisation des serveurs : une filiale européenne d'un éditeur américain reste soumise au droit américain."
      >
        {PROVIDERS.length > 0 ? (
          <>
            <ComparisonTable columns={PROVIDER_COLUMNS} rows={PROVIDERS} />
            <Sources items={PROVIDER_SOURCES} />
          </>
        ) : (
          <Pending what="tarifs, localisation des serveurs et périmètre HDS des fournisseurs d'inférence" />
        )}
      </Section>

      <Section
        label="Matériel"
        title="Modèles exécutables localement"
        note="Modèles à poids ouverts, téléchargeables et exécutables sans connexion. La nationalité de l'éditeur n'a pas d'incidence sur la confidentialité dès lors que le calcul se fait sur une machine maîtrisée."
      >
        {LOCAL_MODELS.length > 0 ? (
          <ComparisonTable columns={LOCAL_MODEL_COLUMNS} rows={LOCAL_MODELS} />
        ) : (
          <Pending what="tailles, mémoire requise et licences des modèles à poids ouverts" />
        )}
      </Section>

      <Section label="Matériel" title="Machines et coûts">
        {HARDWARE.length > 0 ? (
          <ComparisonTable columns={HARDWARE_COLUMNS} rows={HARDWARE} />
        ) : (
          <Pending what="prix 2026, vitesses réelles et seuils de bascule achat / API" />
        )}
      </Section>

      <Section label="Matériel" title="Logiciels d'exécution">
        {RUNTIMES.length > 0 ? (
          <>
            <ComparisonTable columns={RUNTIME_COLUMNS} rows={RUNTIMES} />
            <Sources items={HARDWARE_SOURCES} />
          </>
        ) : (
          <Pending what="comparatif Ollama, vLLM, LM Studio et llama.cpp" />
        )}
      </Section>

      <Section
        label="Interface"
        title="Passerelles de messagerie"
        note="Un bot est une extrémité de la conversation : le contenu est toujours en clair sur le serveur qui héberge l'agent. Le chiffrement de bout en bout protège contre l'opérateur de la messagerie, jamais contre l'hébergeur de l'agent."
      >
        <ComparisonTable columns={GATEWAY_COLUMNS} rows={GATEWAYS} />
        <Sources items={GATEWAY_SOURCES} />
      </Section>

      <Section
        label="RAG"
        title="Outils de recherche documentaire"
        note="Pour faire répondre un modèle sur les documents d'un client sans qu'ils sortent de son infrastructure."
      >
        {RAG_TOOLS.length > 0 ? (
          <>
            <ComparisonTable columns={RAG_TOOL_COLUMNS} rows={RAG_TOOLS} />
            <Sources items={RAG_SOURCES} />
          </>
        ) : (
          <Pending what="licences, OCR, gestion des droits et limites des outils RAG" />
        )}
      </Section>

      <Section label="Objections" title="Questions fréquentes des clients">
        <Faq items={CLIENT_QUESTIONS} />
      </Section>
    </>
  );
}
