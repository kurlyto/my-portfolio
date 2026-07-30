import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Politique de confidentialité — Nathan Knaebel",
  description:
    "Comment sont collectées, utilisées et conservées les données personnelles sur nathan-knaebel.com.",
  robots: { index: true, follow: true },
};

const MAJ = "30 juillet 2026";

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl md:text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-black/75">{children}</div>
    </section>
  );
}

export default function ConfidentialitePage() {
  return (
    <div className="bg-white text-black">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Politique de confidentialité
        </h1>
        <p className="mt-3 text-[13px] font-mono text-black/50">
          Dernière mise à jour : {MAJ}
        </p>

        <p className="mt-8 text-[15px] leading-relaxed text-black/75">
          Cette page explique quelles données personnelles sont collectées sur ce site, pourquoi,
          combien de temps elles sont conservées, et comment exercer vos droits. Elle est écrite
          pour être comprise sans connaissance juridique.
        </p>

        <Section title="Qui est responsable">
          <p>
            Nathan Knaebel, micro-entrepreneur. Contact pour toute question ou demande relative à
            vos données :{" "}
            <a href="mailto:nathan.knaebel@gmail.com" className="underline hover:text-[#ff6b35]">
              nathan.knaebel@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="Ce qui est collecté, et pourquoi">
          <p>
            <strong>Quand vous discutez avec l&apos;assistant du site :</strong> votre prénom et
            votre adresse email, demandés une fois le besoin cadré, pour vous envoyer un lien de
            confirmation et pouvoir vous recontacter. Votre numéro de téléphone si vous choisissez
            de le donner — c&apos;est facultatif, et le refuser n&apos;empêche rien.
          </p>
          <p>
            <strong>Le contenu de la conversation</strong> est enregistré : il sert à reprendre la
            discussion si vous fermez la page, et à rédiger le document de cadrage de votre projet.
          </p>
          <p>
            <strong>Votre adresse IP</strong> est enregistrée pour limiter le nombre de
            conversations par jour et empêcher les abus automatisés. Elle n&apos;est utilisée que
            pour ça.
          </p>
          <p>
            <strong>Mesure d&apos;audience :</strong> le site utilise Umami, un outil qui compte les
            visites sans cookie de suivi ni profilage publicitaire.
          </p>
        </Section>

        <Section title="Combien de temps c'est conservé">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Conversations et documents de cadrage : 12 mois</li>
            <li>Coordonnées de prospects sans suite : 3 ans après le dernier contact</li>
            <li>Compteurs anti-abus liés à l&apos;adresse IP : 30 jours</li>
            <li>
              Données de clients ayant souscrit : pendant toute la durée du contrat, puis selon les
              durées légales applicables (facturation notamment)
            </li>
          </ul>
        </Section>

        <Section title="Avec qui ces données sont partagées">
          <p>
            Elles ne sont ni vendues, ni louées, ni transmises à des fins publicitaires. Elles
            transitent uniquement par les prestataires nécessaires au fonctionnement du service :
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Anthropic</strong> (États-Unis) — fait fonctionner l&apos;assistant
              conversationnel. Les messages échangés lui sont transmis pour générer les réponses.
            </li>
            <li>
              <strong>Brevo</strong> (France) — envoi des emails de confirmation
            </li>
            <li>
              <strong>Stripe</strong> (Irlande) — traitement des paiements, si vous souscrivez
            </li>
            <li>
              <strong>Scaleway</strong> (France) — hébergement du serveur
            </li>
          </ul>
          <p>
            Le transfert vers Anthropic (hors Union européenne) est encadré par les clauses
            contractuelles types de la Commission européenne.
          </p>
        </Section>

        <Section title="Vos droits">
          <p>
            Vous pouvez à tout moment demander à consulter vos données, les corriger, les faire
            supprimer, en obtenir une copie, ou vous opposer à leur traitement. Une simple demande
            par email suffit, sans justification à fournir. Vous recevrez une réponse sous 30 jours.
          </p>
          <p>
            Si la réponse ne vous convient pas, vous pouvez saisir la CNIL :{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#ff6b35]"
            >
              cnil.fr
            </a>
            .
          </p>
        </Section>

        <Section title="Si vous êtes client : les données que traite votre agent">
          <p>
            Un agent construit pour vous manipule vos propres données — vos emails, vos contacts,
            vos documents, selon ce que vous lui confiez. Ces données restent les vôtres. Vous en
            êtes responsable au sens du RGPD, et j&apos;interviens uniquement comme sous-traitant.
          </p>
          <p>
            Concrètement : ces données sont hébergées sur un serveur que j&apos;administre, ce qui
            implique que j&apos;y ai un accès technique — nécessaire pour installer, corriger et
            maintenir votre agent. Cet accès n&apos;est utilisé que pour faire fonctionner le
            service. Vos données ne sont exploitées à aucune autre fin : ni analyse, ni
            réutilisation pour d&apos;autres clients, ni entraînement de modèles.
          </p>
          <p>
            À la fin du contrat, l&apos;agent est arrêté et son code archivé. Vous pouvez demander
            l&apos;export de vos données à tout moment, y compris après la résiliation.
          </p>
        </Section>

        <Section title="Modifications">
          <p>
            Cette politique peut évoluer si le service change. La date de dernière mise à jour
            figure en haut de page.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
