import { ComparisonTable } from "./ComparisonTable";
import { Section, Sources } from "./Section";
import { RagSection } from "./RagSection";
import { Freshness } from "./Freshness";
import { GATEWAYS, GATEWAY_COLUMNS, GATEWAY_SOURCES } from "../data/gateways";
import { CLIENT_QUESTIONS } from "../data/questions";

export const metadata = {
  title: "Ecosysteme IA",
  robots: { index: false, follow: false },
};

export default function EcosystemePage() {
  return (
    <>
      <header className="mb-10">
        <p className="viz-mono viz-text-muted text-[11px]">Aide a la vente</p>
        <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl viz-text-primary">
          Ecosysteme IA
        </h1>
        <p className="eco-lead mt-4 max-w-3xl">
          De quoi repondre aux questions qui reviennent en rendez-vous : ou partent les donnees,
          ce qui reste en France, ce qui peut tourner sans jamais sortir du bureau du client.
        </p>
        <div className="mt-5">
          <Freshness />
        </div>
      </header>

      <Section
        label="Les objections qui reviennent"
        title="Ce que demandent les clients, et quoi repondre"
        lead="Deux maillons a distinguer systematiquement : ou vit l'agent, et ou vit le modele qu'il appelle. La confusion entre les deux est a l'origine de presque toutes les mauvaises reponses sur ce sujet."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {CLIENT_QUESTIONS.map((item) => (
            <div key={item.q} className="eco-card">
              <p className="eco-card-q">{item.q}</p>
              <p className="eco-card-a mt-2">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <RagSection />

      <Section
        label="Interface"
        title="Par quelle messagerie le client parle a son agent"
        lead="Le piege a connaitre avant tout le reste : un agent est une extremite de la conversation. Le chiffrement de bout en bout protege le message pendant le transport, mais l'agent doit le dechiffrer pour le comprendre. Le contenu est donc toujours en clair sur le serveur qui heberge l'agent. Une messagerie chiffree protege contre son operateur, jamais contre l'hebergeur de l'agent."
      >
        <ComparisonTable
          columns={GATEWAY_COLUMNS}
          rows={GATEWAYS}
          getRowKey={(r) => r.name}
        />
        <Sources items={GATEWAY_SOURCES} />
      </Section>
    </>
  );
}
