import { ComparisonTable } from "./ComparisonTable";
import { Section, Sources } from "./Section";
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
import {
  RAG_TOOLS,
  RAG_TOOL_COLUMNS,
  RAG_SOURCES,
  RAG_SCALE,
  RAG_LICENSE_WARNING,
} from "../data/rag";
import { CLIENT_QUESTIONS } from "../data/questions";

export const metadata = {
  title: "Écosystème IA",
  robots: { index: false, follow: false },
};

function Verdict({ title, body, checks }) {
  return (
    <div className="eco-verdict">
      <p className="eco-verdict-title">{title}</p>
      <p className="eco-verdict-body mt-2">{body}</p>
      {checks && (
        <ul className="eco-checklist mt-4">
          {checks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
        <ComparisonTable columns={PROVIDER_COLUMNS} rows={PROVIDERS} />
        <Sources items={PROVIDER_SOURCES} />
      </Section>

      <Section
        label="Matériel"
        title="Modèles exécutables localement"
        note="En Q4_K_M, compter environ 0,6 Go par milliard de paramètres, plus 2 à 8 Go de cache de contexte. Pour un modèle MoE, ce sont les paramètres totaux qui doivent tenir en mémoire, pas les paramètres actifs."
      >
        <ComparisonTable columns={LOCAL_MODEL_COLUMNS} rows={LOCAL_MODELS} />
      </Section>

      <Section
        label="Matériel"
        title="Machines et coûts"
        note="Repère de lecture : un humain lit à environ 10 tokens par seconde. 10 tok/s suit la lecture, 30 tok/s est confortable, 5 tok/s est pénible. La vitesse dépend de la bande passante mémoire, pas de la puissance de calcul."
      >
        <ComparisonTable columns={HARDWARE_COLUMNS} rows={HARDWARE} />
      </Section>

      <Section
        label="Matériel"
        title="Logiciels d'exécution"
        note="Deux familles à ne pas confondre : les runtimes de poste optimisent un utilisateur sur une machine, les runtimes de serveur optimisent plusieurs utilisateurs sur du matériel partagé. vLLM est mauvais sur un portable, Ollama est mauvais en production multi-utilisateurs."
      >
        <ComparisonTable columns={RUNTIME_COLUMNS} rows={RUNTIMES} />
        <Sources items={HARDWARE_SOURCES} />
      </Section>

      <Section
        label="Interface"
        title="Passerelles de messagerie"
        note="Un bot est une extrémité de la conversation : le contenu est toujours en clair sur le serveur qui héberge l'agent. Le chiffrement de bout en bout protège contre l'opérateur de la messagerie, jamais contre l'hébergeur de l'agent."
      >
        <ComparisonTable columns={GATEWAY_COLUMNS} rows={GATEWAYS} />
        <Sources items={GATEWAY_SOURCES} />
      </Section>

      <Section label="RAG" title="Outils de recherche documentaire">
        <ComparisonTable columns={RAG_TOOL_COLUMNS} rows={RAG_TOOLS} />
        <div className="mt-5">
          <Verdict {...RAG_SCALE} />
        </div>
        <div className="mt-4">
          <Verdict {...RAG_LICENSE_WARNING} />
        </div>
        <Sources items={RAG_SOURCES} />
      </Section>

      <Section label="Objections" title="Questions fréquentes des clients">
        <Faq items={CLIENT_QUESTIONS} />
      </Section>
    </>
  );
}
