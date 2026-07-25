import Header from "../component/Header";
import Footer from "../component/Footer";

export const metadata = {
  title: "Photography | Nathan Knaebel",
  description: "Photographies — a venir.",
};

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
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
