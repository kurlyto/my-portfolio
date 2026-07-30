"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";
import ChatPanel from "./ChatPanel";
import AgentMarquee from "./AgentMarquee";
import VoiceRecorder from "./VoiceRecorder";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

function MicGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3" />
      <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V20H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-2.08A7 7 0 0 0 19 11" />
    </svg>
  );
}

function VoicePitch({ onResult }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-2">
      <VoiceRecorder
        onResult={onResult}
        className="inline-flex items-center gap-2.5 rounded-full border-2 border-black px-6 py-3.5 text-[13px] font-mono font-bold uppercase tracking-wide transition-all duration-150 ease-out hover:bg-black hover:text-white hover:-translate-y-0.5"
      >
        <MicGlyph className="w-4 h-4" />
        J&apos;explique mon besoin
      </VoiceRecorder>
      <p className="text-[11px] font-mono opacity-40">
        Parlez, Nate vous repond
      </p>
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
      <Header />

      <section
        // Colonne gauche a largeur fixe : le hero garde exactement la meme
        // place que le chat soit ouvert ou non, seule la colonne droite change.
        className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] gap-12 lg:gap-14 items-stretch"
      >
        <ScrambleHero onOpenChat={() => setChatOpen(true)} />
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
                <VoicePitch onResult={openChatWithVoice} />
              </div>
            )}
          </AnimatePresence>
        </div>
        <div className="lg:hidden">
          <TestimonialCarousel />
          <VoicePitch onResult={openChatWithVoice} />
        </div>
      </section>

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
      <WorkGateway />
      <Footer showHomeLink={false} />
    </div>
  );
}
