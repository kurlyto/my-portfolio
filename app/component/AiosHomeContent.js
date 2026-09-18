"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import Faq from "./Faq";
import ChatPanel from "./ChatPanel";
import DemoPanel from "./DemoPanel";
import ReservationForm from "./ReservationForm";
import AiosCapacites from "./AiosCapacites";
import AiosVsChat from "./AiosVsChat";
import { AIOS_DEMOS, getAiosDemo } from "./demo-scenarios";
import FoxySchema from "./FoxySchema";
import AgentStrip from "./AgentStrip";
import { Stars } from "./Testimonials";
import { AIOS_OFFER } from "./aios-offer";
import OfferBanner from "./OfferBanner";
import { DesktopMock, PhoneMock } from "./AiosMockup";
import { ETAPES, TEMOIGNAGES_AIOS, QUESTIONS_AIOS } from "./aios-content";

// Site de l'AIOS (/foxy, a la racine jusqu'au 16/09/2026 : la racine est
// devenue l'accueil de l'agence). Le site des agents sur mesure vit sur
// /agents : deux produits, deux promesses, deux couleurs. La bascule de couleur
// tient a la classe `theme-aios` posee sur le conteneur - tout ce qui est
// `bg-accent` / `text-accent-text` en dessous passe du orange au rouge du renard.

const CTA_MESSAGE =
  "Je veux réserver ma place pour l'accès anticipé à Foxy.";

// Jauge de places : dix reperes, un eteint par place prise. Le chiffre se lit,
// la jauge se COMPREND sans lire - c'est ce qui doit passer dans les cinq
// premieres secondes. Le compte vient de aios-offer.js et se met a jour A LA
// MAIN a chaque signature : jamais de decompte automatique, un faux chiffre se
// retourne contre nous le jour ou un visiteur s'en apercoit.
function PlacesGauge({ tone = "dark" }) {
  const { placesTotal, placesRestantes } = AIOS_OFFER;
  const empty = tone === "dark" ? "bg-white/15" : "bg-ink/15";
  const label = tone === "dark" ? "text-white" : "text-ink";

  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="flex items-center gap-[3px]">
        {Array.from({ length: placesTotal }).map((_, i) => (
          <span
            key={i}
            className={`block w-[7px] h-4 rounded-sm ${
              i < placesRestantes ? "bg-accent" : empty
            }`}
          />
        ))}
      </span>
      <span className={`text-[13px] font-mono font-bold ${label}`}>
        {placesRestantes} places sur {placesTotal}
      </span>
    </div>
  );
}

function PlayGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function CtaButton({ onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover
      // Pleine largeur sur mobile : un bouton qui barre l'ecran ne se rate
      // pas et se touche au pouce sans viser. Il reprend sa largeur naturelle
      // des le premier palier.
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-accent-ink px-7 py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-colors duration-150 ease-out hover:bg-accent-dark w-full sm:w-fit ${className}`}
    >
      {children}
    </button>
  );
}

// Fenetre unique de conversation, par-dessus la page : plein ecran en mobile,
// panneau centre en desktop. Elle accueille soit une demo scriptee, soit le
// vrai chat. Un panneau ancre dans le hero (comme sur le site agents) serait
// joue hors ecran quand on l'ouvre depuis le bas de page.
function Overlay({ children, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="hidden lg:flex fixed inset-0 z-50 items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={onClose}
        aria-hidden
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative w-full max-w-lg h-[min(560px,82vh)]">{children}</div>
    </div>
  );
}

export default function AiosHomeContent({ articles = [] }) {
  const [chatOpen, setChatOpen] = useState(false);
  // Depuis le 08/09/2026, "Reserver ma place" ouvre un formulaire et non plus
  // le chat : qui clique ce bouton a decide, il veut laisser ses coordonnees.
  const [formOpen, setFormOpen] = useState(false);
  // `demoId` vaut MENU quand le panneau s'ouvre sans scenario choisi : le
  // visiteur choisit lui-meme ce qu'il veut voir. getAiosDemo rend alors null,
  // et le panneau affiche sa liste.
  const [demoId, setDemoId] = useState(null);
  const demoOuverte = demoId !== null;
  const demo = getAiosDemo(demoId);

  function openForm() {
    setDemoId(null);
    setChatOpen(false);
    setFormOpen(true);
  }

  function playDemo(id) {
    setChatOpen(false);
    setDemoId(id);
  }

  const demoPanelProps = demoOuverte && {
    demo,
    demos: AIOS_DEMOS,
    onClose: () => setDemoId(null),
    onOpenChat: () => {
      setDemoId(null);
      setFormOpen(true);
    },
    subtitle: "Démonstration : Foxy au travail",
    ctaLabel: "Réserver ma place",
    disclaimer:
      "Ceci est une démonstration écrite à l'avance. Foxy, lui, sera branché à vos vrais mails, votre agenda et vos clients.",
  };

  return (
    <div className="theme-aios bg-surface text-ink">
      <div className="bg-surface text-ink">
        {/* Meme bandeau que sur /agents, dans le rouge du renard. Les chiffres
            viennent de aios-offer.js : une signature = une valeur a changer. */}
        <OfferBanner
          titre={`Accès anticipé : plus que ${AIOS_OFFER.placesRestantes} places`}
          detail={`inscriptions jusqu'au ${AIOS_OFFER.dateLimiteTexte}, conditions de lancement gardées à vie.`}
        />
        <Header compactY site="aios" />

        {/* Premier ecran : ce que c'est, ce qu'on risque de rater (places +
            date), ou cliquer. Le detail vient plus bas, pour ceux qui defilent. */}
        <section className="max-w-6xl mx-auto px-6 pt-4 md:pt-6 pb-12 md:pb-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-10 lg:gap-16 items-start">
          <div className="lg:pt-10">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-text">
                Foxy - accès anticipé
              </span>
              {/* La jauge de places tient sur bureau, ou l'oeil balaie une
                  ligne entiere. Sur mobile elle vient s'ajouter au titre dans
                  le premier ecran, qui doit rester une seule idee : on la
                  retrouve juste sous le bouton, au moment de decider. */}
              <span className="hidden sm:block">
                <PlacesGauge tone="light" />
              </span>
            </div>

            {/* Pas de <br> force : la coupure manuelle laissait "connaît" seul
                sur sa ligne des que la fonte titre s'appliquait. On borne la
                largeur, le texte se coupe la ou il faut a chaque taille. */}
            <h1 className="font-display mt-5 text-4xl md:text-6xl font-bold tracking-tight max-w-[13ch] md:max-w-[15ch]">
              Un bras droit qui connaît tout votre business.
            </h1>

            {/* Deux versions de la meme promesse : sur mobile, le premier ecran
                doit se lire d'un coup d'oeil, pouce en bas de l'ecran. La phrase
                longue et les precisions d'inscription attendent le bureau (ou
                le defilement) : trop d'informations dans le premier ecran mobile
                et plus rien ne ressort. */}
            <p className="mt-6 text-base text-ink/65 leading-relaxed max-w-xl sm:hidden">
              Il voit vos mails, votre agenda et vos clients au même endroit. Vous lui
              parlez, il s&apos;occupe du reste.
            </p>
            <p className="hidden sm:block mt-6 text-base md:text-lg text-ink/65 leading-relaxed max-w-xl">
              Foxy voit vos mails, votre agenda, vos clients et vos tâches au même
              endroit. Vous lui parlez, il s&apos;occupe du reste - depuis votre ordinateur
              ou votre téléphone.
            </p>

            {/* Passage a l'action : un bouton qui engage, un bouton qui montre,
                rien d'autre. Sur mobile les deux barrent l'ecran l'un sous
                l'autre : le pouce n'a rien a viser. */}
            <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <CtaButton onClick={openForm}>Réserver ma place</CtaButton>
              {/* Sur mobile ce bouton JOUE la premiere demonstration au lieu
                  d'ouvrir la liste : qui clique "voir travailler" veut voir, pas
                  choisir. Le choix n'est pas perdu pour autant, le panneau garde
                  son retour vers la liste et son "voir un autre exemple". */}
              <button
                type="button"
                onClick={() => playDemo(AIOS_DEMOS[0].id)}
                data-cursor-hover
                className="sm:hidden inline-flex items-center justify-center gap-2 w-full rounded-full border border-ink/20 px-6 py-4 text-[13px] font-mono font-bold uppercase tracking-wide text-ink/70"
              >
                <PlayGlyph className="w-3 h-3 text-accent-text" />
                Voir Foxy travailler
              </button>
              <p className="hidden sm:block text-[13px] font-mono leading-relaxed text-ink/55">
                <span className="text-ink">
                  Inscriptions jusqu&apos;au {AIOS_OFFER.dateLimiteTexte}.
                </span>{" "}
                {AIOS_OFFER.garantie}.
              </p>
            </div>

            {/* La seule information chiffree du premier ecran mobile : ce qu'on
                risque de rater. Le reste (garantie, date) attend le bureau ou
                le defilement. */}
            <p className="sm:hidden mt-4 text-[12.5px] font-mono text-ink/55">
              <span className="text-ink font-bold">
                {AIOS_OFFER.placesRestantes} places sur {AIOS_OFFER.placesTotal}
              </span>
              , jusqu&apos;au {AIOS_OFFER.dateLimiteTexte}.
            </p>

            {/* Essayer vaut mieux que lire : des demandes reelles, jouees etape
                par etape, sans rien engager. Reserve au bureau : sur mobile,
                quatre puces cote a cote deviennent quatre lignes qui repoussent
                tout le reste sous la ligne de flottaison - le bouton "Voir Foxy
                travailler" y tient ce role a lui seul.
                Sur grand bureau les puces tiennent sur UNE ligne (demande de
                Nathan, 11/09) : il leur faut ~1015 px, la colonne n'en a que 560.
                La rangee deborde donc sous la colonne droite (480 px + gouttiere
                4rem), qui s'arrete ~35 px plus haut : rien ne se chevauche. */}
            <div className="hidden sm:flex mt-8 sm:mt-9 flex-wrap xl:flex-nowrap xl:w-[calc(100%+480px+4rem)] items-center gap-2">
              <span className="text-[12px] font-mono uppercase tracking-wider text-ink/40 mr-1">
                Essayez-le :
              </span>
              {AIOS_DEMOS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => playDemo(d.id)}
                  data-cursor-hover
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-ink/15 px-3.5 py-2.5 text-[12.5px] font-mono text-ink/70 transition-colors duration-150 hover:border-accent hover:text-accent"
                >
                  <PlayGlyph className="w-3 h-3 text-accent-text" />
                  {d.chip}
                </button>
              ))}
            </div>
            {/* Plus de lien "En savoir plus" sous les demos : retire a la
                demande de Nathan le 14/09, comme sur /agents. */}
          </div>

          {/* Colonne droite : la mascotte pose au-dessus de ses ecrans, comme
              une enseigne au-dessus d'une devanture. Elle etait auparavant
              centree au-dessus de TOUT le hero : elle poussait le titre vers le
              bas et laissait le premier ecran bas et decentre sur bureau. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            // order-first en mobile : la mascotte annonce la marque AVANT le
            // titre. En bas de colonne (son ordre naturel), elle n'arrivait
            // qu'apres tout le texte, donc jamais dans le premier ecran.
            className="flex flex-col order-first lg:order-none"
          >
            <div className="flex justify-center lg:justify-end lg:pr-6">
              <Image
                src="/images/cover-aios.png"
                alt="Foxy"
                width={144}
                height={144}
                priority
                unoptimized
                className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 -mb-2 lg:-mb-4"
              />
            </div>
            {/* Les maquettes d'ecrans sont illisibles a 390 px de large : elles
                ne montrent plus rien et poussent le bouton hors de vue. On les
                garde a partir du bureau ; la vraie demonstration, sur mobile,
                c'est le panneau plein ecran. */}
            <div className="hidden sm:flex items-end gap-4">
              <div className="flex-1 min-w-0">
                <DesktopMock tone="light" />
              </div>
              <div className="hidden sm:block">
                <PhoneMock tone="light" />
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Ce qu'il fait : la conversation se joue a l'ecran (AiosCapacites),
          la grille de textes ne montrait rien. */}
      <AiosCapacites />

      {/* De quoi il est fait : le schema arrive APRES ce qu'il fait et AVANT
          la comparaison avec ChatGPT. C'est lui qui rend la comparaison
          evidente : une fois qu'on a vu la memoire, l'horloge et les outils
          branches, la difference n'a plus besoin d'etre plaidee. */}
      <FoxySchema />

      {/* La question posee en premier par tout dirigeant : "et ChatGPT ?" */}
      <AiosVsChat />

      {/* Comment ca marche : trois etapes, du premier appel a l'usage. */}
      <section className="bg-surface text-ink">
        <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-32">
          <span className="text-xs font-mono uppercase tracking-widest text-accent-text">
            Démarrer
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Comment ça marche ?
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {ETAPES.map((e) => (
              <div key={e.numero} className="border-t border-ink/15 pt-6">
                <span className="text-[13px] font-mono font-bold text-accent-text">{e.numero}</span>
                <h3 className="font-display mt-3 text-xl md:text-2xl font-bold">{e.titre}</h3>
                <p className="mt-2.5 text-[15px] text-ink/60 leading-relaxed">{e.texte}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <CtaButton onClick={openForm}>Réserver ma place</CtaButton>
            <p className="text-[13px] font-mono text-ink/45">
              Il reste {AIOS_OFFER.placesRestantes} places sur {AIOS_OFFER.placesTotal},
              jusqu&apos;au {AIOS_OFFER.dateLimiteTexte}.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Temoignages des testeurs de l'acces anticipe. Les identites sont
          volontairement absentes tant qu'elles ne sont pas validees par les
          interesses (cf. aios-content.js) : on n'invente pas de client. */}
      <section className="bg-surface-2 text-ink">
        <Reveal className="max-w-6xl mx-auto px-6 py-16 md:py-32">
          {/* Ancre sur le titre, pas sur la section (padding + animation
              d'entree : le lien de nav tombait sur du vide). */}
          <span
            id="temoignages"
            className="scroll-mt-10 text-xs font-mono uppercase tracking-widest text-accent-text"
          >
            Témoignages
          </span>
          <h2 className="font-display mt-3 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Nos utilisateurs
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMOIGNAGES_AIOS.map((t) => (
              <figure
                key={t.quote}
                className="flex flex-col justify-between rounded-lg border border-black/10 p-7"
              >
                <div>
                  <Stars />
                  <blockquote className="mt-4 text-[15px] md:text-base leading-relaxed">
                    « {t.quote} »
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/10 pt-5">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-black/[0.06] text-[13px] font-mono font-bold">
                    {t.initials ?? t.usage.slice(0, 1)}
                  </span>
                  <span className="text-[13px] font-mono leading-tight">
                    <span className="block font-bold">{t.name ?? t.profil}</span>
                    <span className="block text-black/50">{t.jobTitle ?? t.usage}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Libelle neutre ici : "Nate" est l'assistant du site des agents, le
          citer sur le site AIOS melangerait a nouveau les deux marques. Le
          canal reste le meme (le Telegram de Nathan). */}
      <Faq questions={QUESTIONS_AIOS} askLabel="Écrivez-nous" surfaceClass="bg-surface text-ink" />

      {/* Passerelle vers l'autre offre : celui qui a un besoin unique et precis
          n'a pas besoin d'un systeme complet, autant l'envoyer au bon endroit
          plutot que de le perdre. Le site des agents ferme sur la meme section
          en miroir (AiosTeaser) : meme place, meme gabarit, meme ton. */}
      <section className="on-dark bg-deep text-white">
        <Reveal className="max-w-6xl mx-auto px-6 py-14 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- logo
                    local a taille fixe, next/image n'apporte rien ici. */}
                <img
                  src="/images/logo-nk.png"
                  alt=""
                  className="w-8 h-8 rounded-md object-contain"
                />
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  Votre agent IA
                </span>
              </div>
              <h2 className="font-display mt-4 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl">
                Vous avez juste une tâche à confier ?
              </h2>
              <p className="mt-4 text-[15px] md:text-base text-white/70 leading-relaxed max-w-2xl">
                Relancer vos devis, trier vos candidatures, surveiller vos concurrents :
                pour un besoin unique et bien délimité{" "}
                <span className="accent-agents surligne">un agent sur mesure</span> suffit
                et coûte <span className="accent-agents surligne">moins cher</span>{" "}
                qu&apos;un système complet.
              </p>
            </div>
            {/* `accent-agents` : le bouton prend l'ORANGE du site des agents
                (demande de Nathan, 11/09) et non le rouge Foxy. C'est la porte
                vers l'autre marque, il en porte deja la couleur. */}
            <div className="shrink-0 accent-agents">
              <Link
                href="/agents"
                data-cursor-hover
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-ink px-7 py-4 text-[13px] md:text-sm font-mono font-bold uppercase tracking-wide transition-all duration-150 hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg"
              >
                Voir les agents sur mesure
                <span aria-hidden>&rarr;</span>
              </Link>
              <p className="mt-3 text-[12px] font-mono text-white/45 text-center">
                1 mois d&apos;essai, sans engagement
              </p>
            </div>
          </div>
          <AgentStrip />
        </Reveal>
      </section>

      <Footer articles={articles} showHomeLink={false} surfaceClass="bg-deep text-white" />

      {formOpen && <ReservationForm onClose={() => setFormOpen(false)} />}

      {/* Une seule fenetre de conversation a la fois : ouvrir le chat ferme la
          demo, et inversement. */}
      <AnimatePresence>
        {demoOuverte && (
          <div key="demo">
            <div className="lg:hidden">
              <DemoPanel fullScreen {...demoPanelProps} />
            </div>
            <Overlay onClose={() => setDemoId(null)}>
              <DemoPanel {...demoPanelProps} />
            </Overlay>
          </div>
        )}

        {chatOpen && (
          <div key="chat">
            <div className="lg:hidden">
              <ChatPanel fullScreen onClose={() => setChatOpen(false)} initialMessage={CTA_MESSAGE} />
            </div>
            <Overlay onClose={() => setChatOpen(false)}>
              <ChatPanel onClose={() => setChatOpen(false)} initialMessage={CTA_MESSAGE} />
            </Overlay>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
