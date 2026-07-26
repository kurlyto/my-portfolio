import Header from "./Header";
import ScrambleHero from "./ScrambleHero";
import WorkGateway from "./WorkGateway";
import TestimonialCarousel from "./TestimonialCarousel";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

export default function HomePageContent() {
  return (
    <div className="bg-white text-black">
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-28 md:pt-24 md:pb-36 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
        <ScrambleHero />
        <TestimonialCarousel />
      </section>

      <WorkGateway />
      <HowItWorks />
      <Footer showHomeLink={false} />
    </div>
  );
}
