import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";
import HowItWorks from "./HowItWorks";

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="min-h-screen flex flex-col">
        <Header />

        <section className="flex-1 flex items-center max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16">
          <ScrambleHero />
          <TestimonialCarousel />
        </section>
      </div>

      <WorkGateway />
      <HowItWorks />
    </div>
  );
}
