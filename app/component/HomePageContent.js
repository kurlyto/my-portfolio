import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <ScrambleHero />
      <WorkGateway />
      <TestimonialCarousel />
    </div>
  );
}
