import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ScrambleHero />
      <WorkGateway />
      <TestimonialCarousel />
    </div>
  );
}
