"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import Faq from "./Faq";
import TestimonialCarousel from "./TestimonialCarousel";
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
      <div className="max-w-7xl mx-auto px-6 py-2.5 pr-12 text-center text-[13px] font-mono tracking-wide">
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

export default function HomePageContent() {
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState(null);

  function openChatWithVoice(text) {
    setVoiceMessage(text);
    setChatOpen(true);
  }

  return (
    <div className="bg-white text-black">
      <OfferBanner />
      <Header />

      <section
        // Colonne gauche a largeur fixe : le hero garde exactement la meme
        // place que le chat soit ouvert ou non, seule la colonne droite change.
        // pt-24 -> pt-14 en desktop : le chat ouvert (colonne droite) depassait
        // sous la ligne de flottaison sur les ecrans courts (1366x768). On
        // remonte l'ensemble du hero pour que le panneau tienne en entier.
        // Mobile : le hero occupe la hauteur utile restante (100dvh moins le
        // header et le bandeau) et centre son contenu, pour que titre +
        // sous-titre + CTA soient visibles d'un coup d'oeil sans scroll, quelle
        // que soit la taille de l'ecran. dvh et non vh : sur iOS/Android la
        // barre d'URL retractable fausse vh et coupait le bas du CTA.
        className="max-w-7xl mx-auto px-6 pt-8 pb-8 lg:pb-20 lg:pt-14 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] gap-12 lg:gap-14 items-stretch lg:min-h-0 content-start lg:content-stretch"
      >
        <ScrambleHero
          onOpenChat={() => setChatOpen(true)}
          onVoiceResult={openChatWithVoice}
        />
        {/* Le carrousel reste en colonne droite sur desktop uniquement. Sur
            mobile il devient une section a part entiere (voir plus bas) pour
            que le hero tienne seul dans le premier ecran. */}
        <div className="hidden lg:block lg:sticky lg:top-6 lg:self-start">
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <ChatPanel
                key="chat"
                onClose={() => setChatOpen(false)}
                initialMessage={voiceMessage}
              />
            ) : (
              <div key="testimonials">
                <TestimonialCarousel />
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

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

      <AgentMarquee />
      <HowItWorks />
      <Faq />
      <Footer showHomeLink={false} />
    </div>
  );
}
