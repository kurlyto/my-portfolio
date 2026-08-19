import { ComparisonTable } from "./ComparisonTable";
import { Section } from "./Section";
import { RAG_STEPS, RAG_BUILD_VS_BUY, RAG_HARDWARE, RAG_WARNING } from "../data/rag";

const BUILD_COLUMNS = [
  { key: "name", label: "Solution" },
  { key: "approach", label: "Approche" },
  { key: "setup", label: "Mise en place" },
  { key: "handles", label: "Ce que ca gere deja" },
  { key: "limits", label: "Limites" },
  { key: "verdict", label: "Verdict" },
];

const HARDWARE_COLUMNS = [
  { key: "name", label: "Configuration" },
  { key: "scope", label: "Pour qui" },
  { key: "detail", label: "Detail" },
  { key: "cost", label: "Cout" },
  { key: "verdict", label: "Verdict" },
];

export function RagSection() {
  return (
    <>
      <Section
        label="Repondre sur les documents du client"
        title="Le RAG, sans que rien ne sorte du cabinet"
        lead="Un notaire avec 20 000 actes veut une IA qui repond sur SES dossiers. Le modele ne peut pas tout lire d'un coup : sa memoire de travail vaut quelques centaines de pages. On procede donc autrement - on retrouve les bons passages, puis on ne donne que ceux-la au modele. C'est ce qui permet de traiter une grosse base sur une machine posee dans le bureau."
      >
        <div className="grid gap-3">
          {RAG_STEPS.map((s) => (
            <div key={s.step} className="eco-step">
              <span className="eco-step-num" aria-hidden>
                {s.step}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="eco-step-title">{s.title}</span>
                  <span className="eco-step-when">{s.when}</span>
                </div>
                <p className="eco-step-what mt-2">{s.what}</p>
                <p className="eco-step-cost mt-2">{s.cost}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="eco-warning mt-5">
          <p className="eco-card-q">{RAG_WARNING.title}</p>
          <p className="eco-card-a mt-2">{RAG_WARNING.body}</p>
        </div>
      </Section>

      <Section
        label="Construire l'offre"
        title="Outil du marche ou developpement maison"
        lead="Un RAG de demonstration se code en 200 lignes. Ce qui coute, c'est tout le reste : les PDF scannes, le decoupage qui ne casse pas un article en deux, la reindexation, les droits par utilisateur, l'affichage des sources. Ce travail est deja fait dans les outils existants. La valeur ajoutee est ailleurs : comprendre le metier, brancher les vrais fichiers, regler ce qui derape."
      >
        <ComparisonTable
          columns={BUILD_COLUMNS}
          rows={RAG_BUILD_VS_BUY}
          getRowKey={(r) => r.name}
        />
      </Section>

      <Section
        label="Materiel"
        title="Sur quelle machine faire tourner tout ca"
        lead="Un modele local repond plus lentement qu'une API. Sur de la recherche documentaire c'est acceptable : le client attend quelques secondes une reponse sourcee, la ou il passerait vingt minutes a fouiller. L'indexation initiale d'une grosse base tourne une nuit, une seule fois."
      >
        <ComparisonTable
          columns={HARDWARE_COLUMNS}
          rows={RAG_HARDWARE}
          getRowKey={(r) => r.name}
        />
      </Section>
    </>
  );
}
