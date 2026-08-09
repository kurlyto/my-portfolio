import Link from "next/link";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Conditions d'utilisation — Nathan Knaebel",
  description:
    "Conditions d'utilisation du service de conception et d'hébergement d'agents automatisés sur mesure.",
  robots: { index: true, follow: true },
};

const MAJ = "9 août 2026";

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl md:text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-black/75">{children}</div>
    </section>
  );
}

export default function ConditionsPage() {
  return (
    <div className="bg-white text-black">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Conditions d&apos;utilisation</h1>
        <p className="mt-2 text-[13px] text-black/50">Dernière mise à jour : {MAJ}</p>

        <p className="mt-6 text-[15px] leading-relaxed text-black/75">
          Ces conditions encadrent l&apos;utilisation du service de conception, d&apos;hébergement et
          de maintenance d&apos;agents automatisés sur mesure. Elles sont écrites pour être comprises
          sans connaissance juridique.
        </p>

        <Section title="Le service">
          <p>
            Le service consiste à concevoir, construire, héberger et maintenir un agent automatisé
            adapté à votre besoin. Le périmètre exact de chaque agent — ce qu&apos;il fait, les outils
            auxquels il se connecte, ce qu&apos;il ne fait pas — est défini avec vous lors du cadrage,
            avant toute mise en place.
          </p>
          <p>
            Le prestataire est Nathan Knaebel, micro-entrepreneur. Voir les{" "}
            <Link href="/mentions-legales">mentions légales</Link> pour les informations
            d&apos;identification.
          </p>
        </Section>

        <Section title="Vos comptes et vos accès">
          <p>
            Votre agent peut avoir besoin d&apos;accéder à vos outils (messagerie, tableurs, comptes
            tiers). Ces accès sont demandés un par un, expliqués, et vous les accordez vous-même.
            Vous pouvez les retirer à tout moment depuis le service concerné.
          </p>
          <p>
            Retirer un accès nécessaire au fonctionnement de votre agent l&apos;empêchera de remplir
            la mission correspondante : ce n&apos;est pas un dysfonctionnement du service.
          </p>
          <p>
            Vous restez responsable de la légalité de l&apos;usage que vous faites de votre agent et
            des données que vous lui confiez, notamment vis-à-vis des personnes dont vous traitez les
            données.
          </p>
        </Section>

        <Section title="Ce que vous vous engagez à ne pas faire">
          <p>
            Utiliser un agent pour envoyer des messages non sollicités en masse, usurper une identité,
            collecter des données de manière illicite, contourner les conditions d&apos;utilisation
            d&apos;un service tiers, ou pour toute activité illégale.
          </p>
          <p>
            En cas d&apos;usage manifestement contraire à ces règles, le service peut être suspendu,
            après vous en avoir informé lorsque c&apos;est possible.
          </p>
        </Section>

        <Section title="Disponibilité et limites">
          <p>
            Un agent repose sur des services tiers (modèles d&apos;intelligence artificielle, API des
            outils auxquels il se connecte, hébergement). Une interruption ou une modification de ces
            services peut affecter son fonctionnement, sans que cela constitue un manquement.
          </p>
          <p>
            Un agent automatisé peut se tromper. Les actions sensibles ou irréversibles sont conçues
            pour passer par une validation de votre part. Il vous appartient de vérifier ce qui est
            produit avant d&apos;en faire un usage engageant.
          </p>
          <p>
            Aucune garantie de disponibilité continue n&apos;est promise. Les incidents sont traités
            dans des délais raisonnables.
          </p>
        </Section>

        <Section title="Tarifs et paiement">
          <p>
            Le prix, son mode de calcul et sa périodicité sont convenus par écrit avant le démarrage
            du projet. Toute évolution du périmètre de l&apos;agent fait l&apos;objet d&apos;un accord
            préalable.
          </p>
        </Section>

        <Section title="Vos données">
          <p>
            Le traitement des données personnelles est décrit dans la{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>, qui fait partie
            intégrante de ces conditions.
          </p>
        </Section>

        <Section title="Fin du contrat">
          <p>
            Vous pouvez mettre fin au service à tout moment. À la résiliation, votre agent est arrêté
            et les autorisations d&apos;accès à vos comptes sont supprimées dans les 30 jours, ou
            immédiatement sur demande.
          </p>
          <p>
            Vous pouvez demander l&apos;export de vos données à tout moment, y compris après la
            résiliation.
          </p>
        </Section>

        <Section title="Modifications">
          <p>
            Ces conditions peuvent évoluer si le service change. La date de dernière mise à jour
            figure en haut de page. Pour toute question :{" "}
            <a href="mailto:nathan.knaebel@gmail.com">nathan.knaebel@gmail.com</a>.
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
