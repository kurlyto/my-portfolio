import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
        <ScrambleHero />
        <TestimonialCarousel />
      </section>

      <WorkGateway />
    </div>
  );
}
