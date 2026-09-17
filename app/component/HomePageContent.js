"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "./Header";
import ScrambleHero, { AUDIT_MESSAGE } from "./ScrambleHero";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import ToolStrip from "./ToolStrip";
import ChatPanel from "./ChatPanel";
import DemoPanel from "./DemoPanel";
import { DEMOS, getDemo } from "./demo-scenarios";
import AgentMarquee from "./AgentMarquee";
import MetierBadges from "./MetierBadges";
import { getMetier } from "../metiers/metiers-data";
import HowItWorks from "./HowItWorks";
import WhyNotChatGpt from "./WhyNotChatGpt";
import AiosTeaser from "./AiosTeaser";
import SecuritySection from "./SecuritySection";
import Footer from "./Footer";
import OfferBanner from "./OfferBanner";
import CallButton from "./CallButton";

// Demande de confirmation avant d'ecraser un cadrage en cours. Le bouton vocal
// demarre une NOUVELLE conversation : si un projet est deja en cours, l'envoyer
// sans prevenir ferait perdre le fil au visiteur sans qu'il comprenne pourquoi.
function ResetConfirm({ onKeep, onRestart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40">
      <div className="w-full max-w-sm bg-white rounded p-6 text-center">
        <p className="text-[15px] leading-relaxed">
          Tu as déjà un projet en cours avec Nate. Tu veux repartir de zéro sur un nouveau
          besoin, ou continuer celui-là ?
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onRestart}
            className="w-full rounded px-4 py-2.5 text-[13px] font-mono font-bold uppercase tracking-wide text-white transition-all duration-150 hover:-translate-y-0.5"
            style={{ background: "var(--accent)" }}
          >
            Repartir de zéro
          </button>
          <button
            type="button"
            onClick={onKeep}
            className="w-full rounded border border-black/15 px-4 py-2.5 text-[13px] font-mono transition-colors hover:border-black/40"
          >
            Continuer mon projet
          </button>
        </div>
      </div>
    </div>
  );
}

// Colonne droite du hero au bureau, tant que ni le chat ni une demo ne l'occupent :
// le visage de Nate et la porte vers lui (demande de Nathan, 14/09). Avant, un
// carrousel de temoignages tenait cette place ; ils ont maintenant leur section.
function NateCard({ onStart }) {
  return (
    // Photo A COTE du nom et non au-dessus (14/09) : empilee, la carte etait
    // aussi haute que le texte d'en face, elle ne pouvait pas se centrer sur
    // lui et semblait posee trop haut.
    <div className="mx-auto w-full max-w-[380px] rounded-3xl border-2 border-accent/35 bg-[#faf8f5] p-5 shadow-[0_20px_50px_-20px_rgba(255,107,53,0.25)]">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element -- portrait local a
            taille fixe, deja compresse en webp (16 Ko). */}
        <img
          src="/images/agents/nate-hero.webp"
          alt="Nate, l'agent qui cadre votre besoin"
          width={640}
          height={640}
          className="shrink-0 w-20 h-20 xl:w-24 xl:h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="min-w-0 text-left">
          <p className="font-display text-2xl font-bold">Nate</p>
          <p className="mt-0.5 text-[14px] leading-snug text-black/60">L&apos;agent qui cadre votre besoin</p>
        </div>
      </div>
      {/* Deux portes cote a cote (14/09) : l'audit avec Nate pour qui veut
          ecrire, l'appel (WhatsApp au bureau) pour qui prefere parler. Meme
          largeur pour les deux, l'une sous l'autre : la carte est etroite. */}
      <div className="mt-4 w-full flex flex-col gap-2.5">
        {/* Fleche au grand ecran seulement : a 1024 px la carte n'a que 300 px
            et le libelle passait sur deux lignes. */}
        <button
          type="button"
          onClick={onStart}
          data-cursor-hover
          className="inline-flex items-center justify-center gap-2 w-full text-center whitespace-nowrap rounded-full bg-accent text-accent-ink px-4 py-3 text-[12px] font-mono font-bold uppercase tracking-wide transition-all duration-150 ease-out hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg"
        >
          Faire un audit 100% gratuit
          <span aria-hidden className="hidden xl:inline">&rarr;</span>
        </button>
        <CallButton className="inline-flex items-center justify-center gap-2 w-full text-center rounded-full border-2 border-black/15 bg-white px-5 py-2.5 text-[12px] font-mono font-bold uppercase tracking-wide text-black transition-colors duration-150 ease-out hover:border-accent">
          Passer un appel
        </CallButton>
      </div>
    </div>
  );
}

const THREAD_STORAGE_KEY = "nate-chat-thread-id";

export default function HomePageContent() {
  const [chatOpen, setChatOpen] = useState(false);

  // Rouvre le chat uniquement au retour de la verification email (?chat=1) :
  // la personne vient de confirmer son adresse dans un autre onglet, la
  // renvoyer sur le hero chat ferme lui ferait perdre le fil.
  //
  // On NE rouvre PLUS sur simple presence d'un thread en localStorage : tout
  // visiteur ayant deja parle a Nate retombait alors sur le chat plein ecran
  // des l'arrivee sur le site, sans l'avoir demande, et ne voyait donc jamais
  // la page d'accueil. Symptome signale sur mobile, ou le chat s'ouvre en
  // plein ecran et masque tout le reste. Le fil n'est pas perdu pour autant :
  // il est restaure a l'ouverture du chat (cf. ChatPanel/useNateChat).
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const wantsChat = params.get("chat") === "1";
      if (!wantsChat) return;
      // Arrivee depuis une page flyer (/metiers/[slug]) : le chat s'ouvre avec
      // le message pre-redige du metier, la conversation demarre qualifiee.
      const metier = getMetier(params.get("metier"));
      if (metier?.nateMessage) setVoiceMessage(metier.nateMessage);
      setChatOpen(true);
      // On nettoie l'URL : le parametre a joue son role, il ne doit pas
      // rester dans la barre d'adresse ni dans l'historique.
      window.history.replaceState({}, "", window.location.pathname);
    } catch {
      // localStorage ou URL indisponibles : on laisse le chat ferme.
    }
  }, []);

  // L'onglet de verification email demande "quelqu'un affiche le chat ?".
  // On repond, on rouvre le panneau et on se remet au premier plan : c'est ce
  // qui permet a l'autre onglet de se fermer au lieu de dupliquer la page.
  // window.focus() est bloque par certains navigateurs - dans ce cas le chat
  // est quand meme a jour, l'utilisateur revient sur son onglet a la main.
  useEffect(() => {
    let chan;
    try {
      chan = new BroadcastChannel("nate-chat");
    } catch {
      return undefined;
    }

    chan.onmessage = (ev) => {
      if (ev.data?.type !== "ping") return;
      setChatOpen(true);
      chan.postMessage({ type: "here" });
      try {
        window.focus();
      } catch {
        // Refus du navigateur : rien de plus a faire.
      }
    };

    return () => chan.close();
  }, []);

  const [voiceMessage, setVoiceMessage] = useState(null);
  const [pendingVoice, setPendingVoice] = useState(null);

  // Demonstration scriptee en cours (voir demo-scenarios.js). Elle occupe le
  // meme emplacement que le chat : ouvrir l'un ferme l'autre, il n'y a qu'une
  // seule fenetre de conversation a la fois.
  // demoId vaut DEMO_MENU quand on ouvre le lecteur sans scenario choisi : le
  // visiteur choisit lui-meme dans la liste (getDemo rend alors null).
  const [demoId, setDemoId] = useState(null);
  const demoOuverte = demoId !== null;
  const demo = getDemo(demoId);
  // Une demo lancee par le CHAMP accompagne quelqu'un en train d'ecrire : elle
  // ne doit pas se comporter comme une fenetre qui prend la main (pas de voile
  // sur la page, pas de contenu qui disparait sous ses yeux). Lancee par un
  // bouton, elle reste l'element principal et garde son voile.
  const [demoFromField, setDemoFromField] = useState(false);

  function playDemo(id) {
    setChatOpen(false);
    setDemoFromField(false);
    setDemoId(id);
    scrollToChat();
  }

  // Demo lancee par le CHAMP du hero (clic dedans, espace ou entree a vide),
  // pas par un bouton. Deux gardes :
  // - une vraie conversation ouverte a toujours priorite sur un script ;
  // - en mobile la demo s'affiche en plein ecran : elle recouvrirait le champ
  //   que le visiteur vient de cliquer, clavier ouvert. Reservee au desktop, ou
  //   elle vit dans la colonne de droite, juste a cote du champ.
  // Pas de remontee de page non plus : on est deja dans le hero, et faire
  // defiler la page sous les doigts de quelqu'un qui ecrit est desagreable.
  function playDemoFromField(id) {
    if (chatOpen) return;
    try {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
    } catch {
      return;
    }
    setDemoFromField(true);
    setDemoId(id);
  }

  // Sortie de demo vers le vrai chat : la demo a fait son travail d'amorce,
  // on enchaine sur la conversation reelle avec Nate.
  function openChatFromDemo() {
    setDemoId(null);
    setChatOpen(true);
    scrollToChat();
  }

  // Ouverture sans message (question libre depuis la FAQ) : on reprend le fil
  // existant s'il y en a un, rien a ecraser donc rien a demander.
  function openChat() {
    setDemoId(null);
    setChatOpen(true);
    scrollToChat();
  }

  // Le chat vit en haut de page (colonne droite du hero en desktop, plein
  // ecran en mobile). Ouvert depuis un bouton situe plus bas - un flyer metier
  // par exemple - il apparait hors champ : sans cette remontee, le visiteur ne
  // voit qu'un voile gris et croit que rien ne s'est passe.
  function scrollToChat() {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  function openChatWithVoice(text) {
    // Une demo qui tourne encore laisserait deux fenetres se disputer la
    // colonne droite : le chat reel a toujours priorite.
    setDemoId(null);

    // Un projet est deja en cours : on demande avant d'ecraser.
    let hasThread = false;
    try {
      hasThread = !!window.localStorage.getItem(THREAD_STORAGE_KEY);
    } catch {
      // localStorage indisponible : on considere qu'il n'y a rien a ecraser.
    }

    if (hasThread) {
      setPendingVoice(text);
      return;
    }

    setVoiceMessage(text);
    setChatOpen(true);
    scrollToChat();
  }

  // "Repartir de zero" : on purge le thread stocke, le chat en ouvrira un neuf
  // au montage. L'identite (prenom + email) est conservee cote serveur via le
  // visitorId, la personne n'a donc pas a se reverifier.
  function restartWithVoice() {
    try {
      window.localStorage.removeItem(THREAD_STORAGE_KEY);
    } catch {
      // Rien a faire de plus.
    }
    setVoiceMessage(pendingVoice);
    setPendingVoice(null);
    setChatOpen(true);
    scrollToChat();
  }

  // "Continuer mon projet" : on garde le fil et on envoie le vocal dedans.
  function keepAndSendVoice() {
    setVoiceMessage(pendingVoice);
    setPendingVoice(null);
    setChatOpen(true);
    scrollToChat();
  }

  return (
    <div className="bg-white text-black">
      {/* Voile leger quand le chat est ouvert en desktop : il assombrit la page
          derriere le panneau pour ramener l'oeil dessus, sans masquer le
          contenu ni empecher de cliquer ailleurs (pointer-events-none). Un clic
          reste possible sur le reste de la page, le voile n'est pas une modale.
          Inutile en mobile : le chat y est deja en plein ecran. */}
      <AnimatePresence>
        {(chatOpen || (demo && !demoFromField)) && (
          <motion.div
            key="chat-spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            aria-hidden="true"
            className="hidden lg:block pointer-events-none fixed inset-0 z-30 bg-black/20"
          />
        )}
      </AnimatePresence>

      <OfferBanner
        titre="1 mois d'essai 100% gratuit"
        detail="testez votre agent personnel sans aucun engagement d'achat."
      />
      <Header compactY site="agents" />

      <section
        // Colonne gauche a largeur fixe : le hero garde exactement la meme
        // place que le chat soit ouvert ou non, seule la colonne droite change.
        // pt-24 -> pt-14 en desktop : le chat ouvert (colonne droite) depassait
        // sous la ligne de flottaison sur les ecrans courts (1366x768). On
        // remonte l'ensemble du hero pour que le panneau tienne en entier.
        // lg:pb-10 et non pb-20 : la bande d'outils pleine largeur suit
        // immediatement en desktop, elle apporte sa propre respiration.
        // pt reduit encore (pt-14 -> pt-6 en desktop) : le bandeau d'offre reste
        // en haut de page, donc c'est ici que se recupere la hauteur qui
        // manquait pour que le hero tienne entier au chargement.
        // Colonne gauche elargie au grand ecran (620 -> 760 px, 14/09) : la
        // phrase d'offre sous le titre y gagne de la largeur. Pas avant xl : a
        // 1024 px la colonne droite tomberait sous la largeur de la carte.
        className="max-w-7xl mx-auto px-6 pt-3 pb-8 lg:pb-10 lg:pt-6 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] xl:grid-cols-[minmax(0,760px)_1fr] gap-12 lg:gap-14 items-stretch lg:min-h-0 content-start lg:content-stretch"
      >
        <ScrambleHero
          onSubmitNeed={openChatWithVoice}
          onPlayDemo={playDemo}
          onFieldFocus={playDemoFromField}
        />
        {/* Colonne droite au bureau uniquement : en mobile le hero tient seul
            dans le premier ecran et ses boutons menent deja a Nate. */}
        {/* z-40 quand le chat est ouvert : le panneau doit passer au-dessus du
            voile (z-30), sinon il serait assombri avec le reste. */}
        {/* min-w-0 sur la colonne elle-meme : la piste d'outils en `w-max`
            (ToolStrip) gonfle sinon cette piste de grille, qui ecrase alors la
            colonne du hero jusqu'a un mot par ligne. */}
        {/* La carte de Nate se centre en hauteur face au texte (14/09 : collee
            en haut, elle paraissait trop haute) ; le chat et la demo restent
            accroches en haut, ou ils collent a l'ecran pendant qu'on defile. */}
        <div
          className={`hidden lg:block min-w-0 ${
            chatOpen || demoOuverte ? "relative z-40 lg:sticky lg:top-6 lg:self-start" : "lg:self-center"
          }`}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <ChatPanel
                key="chat"
                onClose={() => setChatOpen(false)}
                initialMessage={voiceMessage}
              />
            ) : demoOuverte ? (
              <DemoPanel
                key="demo"
                demo={demo}
                demos={DEMOS}
                onClose={() => setDemoId(null)}
                onOpenChat={openChatFromDemo}
              />
            ) : (
              <div key="nate" className="min-w-0">
                <NateCard onStart={() => openChatWithVoice(AUDIT_MESSAGE)} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bande d'outils pleine largeur, hors de la grille du hero : un
          defilement sur toute la fenetre raconte mieux "connectable a tout"
          qu'un defilement confine a une colonne de 620px. Elle s'efface quand
          le chat s'ouvre, pour que le panneau reste l'unique point d'attention.
          Reservee au desktop : en mobile la bande vit dans le hero.
          Elle RESTE quand la demo a ete lancee par le champ : la faire
          disparaitre remonterait la page sous les yeux de quelqu'un qui ecrit. */}
      <AnimatePresence>
        {!chatOpen && (!demoOuverte || demoFromField) && (
          <motion.div
            key="toolstrip-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block pb-16"
          >
            <ToolStrip fullWidth />
          </motion.div>
        )}
      </AnimatePresence>

      {/* La bande d'outils, en mobile, vit ici et non plus dans le hero :
          "connectable a tout" est un argument, pas une accroche, il n'a rien a
          faire dans le premier ecran. Au bureau elle est plus haut, en pleine
          largeur. */}
      <div className="lg:hidden pb-16">
        <ToolStrip />
      </div>

      <AnimatePresence>
        {chatOpen && (
          <div className="lg:hidden">
            <ChatPanel
              fullScreen
              onClose={() => setChatOpen(false)}
              initialMessage={voiceMessage}
            />
          </div>
        )}
      </AnimatePresence>

      {/* En mobile la demo prend l'ecran, comme le chat : la colonne droite
          du hero n'existe pas a cette taille. */}
      <AnimatePresence>
        {!chatOpen && demoOuverte && (
          <div className="lg:hidden">
            <DemoPanel
              key="demo-mobile"
              fullScreen
              demo={demo}
              demos={DEMOS}
              onClose={() => setDemoId(null)}
              onOpenChat={openChatFromDemo}
            />
          </div>
        )}
      </AnimatePresence>

      {pendingVoice && (
        <ResetConfirm onKeep={keepAndSendVoice} onRestart={restartWithVoice} />
      )}

      {/* Entre le hero et la vitrine d'agents : le visiteur se reconnait
          d'abord dans son metier (badge -> flyer partageable), puis decouvre
          qui fait le travail. */}
      <MetierBadges />
      <AgentMarquee />
      {/* Ordre du bas de page : lever l'objection ChatGPT juste apres la
          vitrine d'agents, montrer que demarrer est simple, puis les garanties
          (securite) avant la FAQ. */}
      <WhyNotChatGpt />
      {/* La preuve juste apres l'argument : de vrais clients disent ce que leur
          agent fait pour eux, avant de montrer comment on demarre. */}
      <Testimonials />
      <HowItWorks onStart={() => openChatWithVoice(AUDIT_MESSAGE)} />
      <SecuritySection />
      {/* La FAQ remplace la section "Explorer" (WorkGateway) : en fin de page,
          des questions qui levent les derniers doutes convertissent mieux que
          des liens vers les pages projets/agents, deja accessibles depuis le
          header. */}
      <Faq onAsk={openChat} />
      {/* Passerelle vers l'autre site, en DERNIERE section : les deux sites se
          repondent en miroir (le site Foxy renvoie ici au meme endroit). Celui
          qui a lu la page entiere sans se reconnaitre dans un agent unique a
          peut-etre besoin du systeme complet : on l'oriente plutot que de le
          perdre. Avant, ce bloc coupait la page en son milieu. */}
      <AiosTeaser />
      <Footer showHomeLink={false} />
    </div>
  );
}
