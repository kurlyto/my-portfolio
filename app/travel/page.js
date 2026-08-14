import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Travel",
  description: "Carnet de voyage — a venir.",
  alternates: { canonical: "https://nathan-knaebel.com/travel" },
  // Page vide ("a venir") : hors index tant qu'il n'y a pas de contenu. Une
  // page sans substance indexee tire la qualite percue du domaine vers le bas.
  // A repasser en index des que le carnet est publie.
  robots: { index: false, follow: true },
};

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest opacity-50">Travel</p>
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
