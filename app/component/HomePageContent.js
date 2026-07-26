"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";
import ChatPanel from "./ChatPanel";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

export default function HomePageContent() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="bg-white text-black">
      <Header />

      <section
        className={`max-w-6xl mx-auto px-6 pt-16 pb-28 md:pt-24 md:pb-36 w-full grid grid-cols-1 gap-12 lg:gap-16 items-stretch transition-[grid-template-columns] duration-300 ${
          chatOpen ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-[3fr_2fr]"
        }`}
      >
        <ScrambleHero onOpenChat={() => setChatOpen(true)} />
        <div className="hidden lg:block">
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

      <WorkGateway />
      <HowItWorks />
      <Footer showHomeLink={false} />
    </div>
  );
}
