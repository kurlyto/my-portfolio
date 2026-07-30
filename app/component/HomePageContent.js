"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";
import ChatPanel from "./ChatPanel";
import AgentMarquee from "./AgentMarquee";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

export default function HomePageContent() {
  const [chatOpen, setChatOpen] = useState(false);

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
              <ChatPanel key="chat" onClose={() => setChatOpen(false)} />
            ) : (
              <TestimonialCarousel key="testimonials" />
            )}
          </AnimatePresence>
        </div>
        <div className="lg:hidden">
          <TestimonialCarousel />
        </div>
      </section>

      <AnimatePresence>
        {chatOpen && (
          <div className="lg:hidden">
            <ChatPanel fullScreen onClose={() => setChatOpen(false)} />
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
