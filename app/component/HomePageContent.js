"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import Faq from "./Faq";
import TestimonialCarousel from "./TestimonialCarousel";
import ToolStrip from "./ToolStrip";
import ChatPanel from "./ChatPanel";
import AgentMarquee from "./AgentMarquee";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

// Bandeau d'offre en haut de page. Refermable : une banniere qu'on ne peut pas
// fermer irrite le visiteur qui revient. Le choix n'est pas persiste
// volontairement (pas de localStorage) : l'offre reste visible d'une visite a
// l'autre, elle disparait seulement pour la session en cours.
function OfferBanner() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className="relative bg-[#ff6b35] text-white">
      {/* py-1.5 et non py-2.5 : chaque pixel pris ici est pris au hero, qui doit
          tenir en entier dans le premier ecran. */}
      <div className="max-w-7xl mx-auto px-6 py-1.5 pr-12 text-center text-[13px] font-mono tracking-wide">
        <span className="font-bold uppercase">1 mois d&apos;essai 100% gratuit</span>
        <span className="hidden sm:inline opacity-85"> - testez votre agent personnel sans aucun engagement d&apos;achat.</span>
      </div>
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label="Fermer le bandeau"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors text-[16px] leading-none"
      >
        ×
      </button>
    </div>
  );
}

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
            style={{ background: "#ff6b35" }}
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
      const wantsChat = new URLSearchParams(window.location.search).get("chat") === "1";
      if (!wantsChat) return;
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

  function openChatWithVoice(text) {
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
  }

  // "Continuer mon projet" : on garde le fil et on envoie le vocal dedans.
  function keepAndSendVoice() {
    setVoiceMessage(pendingVoice);
    setPendingVoice(null);
    setChatOpen(true);
  }

  return (
    <div className="bg-white text-black">
      {/* Voile leger quand le chat est ouvert en desktop : il assombrit la page
          derriere le panneau pour ramener l'oeil dessus, sans masquer le
          contenu ni empecher de cliquer ailleurs (pointer-events-none). Un clic
          reste possible sur le reste de la page, le voile n'est pas une modale.
          Inutile en mobile : le chat y est deja en plein ecran. */}
      <AnimatePresence>
        {chatOpen && (
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

      <OfferBanner />
      <Header compactY />

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
        className="max-w-7xl mx-auto px-6 pt-3 pb-8 lg:pb-10 lg:pt-6 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] gap-12 lg:gap-14 items-stretch lg:min-h-0 content-start lg:content-stretch"
      >
        <ScrambleHero
          onOpenChat={() => setChatOpen(true)}
          onVoiceResult={openChatWithVoice}
        />
        {/* Le carrousel reste en colonne droite sur desktop uniquement. Sur
            mobile il devient une section a part entiere (voir plus bas) pour
            que le hero tienne seul dans le premier ecran. */}
        {/* z-40 quand le chat est ouvert : le panneau doit passer au-dessus du
            voile (z-30), sinon il serait assombri avec le reste. */}
        {/* min-w-0 sur la colonne elle-meme : la piste d'outils en `w-max`
            (ToolStrip) gonfle sinon cette piste de grille, qui ecrase alors la
            colonne du hero jusqu'a un mot par ligne. */}
        <div
          className={`hidden lg:block lg:sticky lg:top-6 lg:self-start min-w-0 ${
            chatOpen ? "relative z-40" : ""
          }`}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <ChatPanel
                key="chat"
                onClose={() => setChatOpen(false)}
                initialMessage={voiceMessage}
              />
            ) : (
              <div key="testimonials" className="min-w-0">
                <TestimonialCarousel />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bande d'outils pleine largeur, hors de la grille du hero : un
          defilement sur toute la fenetre raconte mieux "connectable a tout"
          qu'un defilement confine a une colonne de 620px. Elle s'efface quand
          le chat s'ouvre, pour que le panneau reste l'unique point d'attention.
          Reservee au desktop : en mobile la bande vit dans le hero. */}
      <AnimatePresence>
        {!chatOpen && (
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

      {/* Temoignages avant la grille d'agents : ils servent d'amorce concrete
          ("ah, on peut faire ca"), pas de preuve sociale. Le visiteur doit y
          reconnaitre sa propre situation avant de parcourir le catalogue. */}
      <div className="lg:hidden px-6 pb-16">
        <TestimonialCarousel />
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

      {pendingVoice && (
        <ResetConfirm onKeep={keepAndSendVoice} onRestart={restartWithVoice} />
      )}

      <AgentMarquee />
      <HowItWorks />
      {/* La FAQ remplace la section "Explorer" (WorkGateway) : en fin de page,
          des questions qui levent les derniers doutes convertissent mieux que
          des liens vers les pages projets/agents, deja accessibles depuis le
          header. */}
      <Faq />
      <Footer showHomeLink={false} />
    </div>
  );
}
