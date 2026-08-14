import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Photography",
  description: "Photographies — a venir.",
  alternates: { canonical: "https://nathan-knaebel.com/photography" },
  // Page vide ("a venir") : hors index tant qu'il n'y a pas de contenu.
  // A repasser en index des que les photos sont publiees.
  robots: { index: false, follow: true },
};

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest opacity-50">Photography</p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">A venir</h1>
          <p className="mt-4 opacity-60 max-w-md mx-auto">
            Cette page aura sa propre direction artistique, distincte du reste du site.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
