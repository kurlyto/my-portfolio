//dans ce fichier app/page.js, nous importons le composant Counter depuis app/component/Counter.js et l'utilisons pour afficher trois compteurs avec des titres différents.
//le composant Link de Next.js fournit la balise Link et remplace la balise anchor HTML classique pour la navigation entre les pages de l'application.


import Counter from "./component/Counter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] justify-items-center min-h-screen p-8 pb-40 gap-16">
      <header className="row-start-1 w-full flex items-center justify-center gap-10 text-xl">
        <Link href="/projets" className="whitespace-nowrap">
          Expertise
        </Link>
        <Link href="/projets" className="whitespace-nowrap">
          Projets
        </Link>
        <Link href="/photographie" className="whitespace-nowrap">
          A propos
        </Link>
        <Link href="/photographie" className="whitespace-nowrap">
          Témoignages
        </Link>
      </header>

      <main className="row-start-2 flex flex-col gap-4 items-center">
        <Counter title="Counter#1" />
        <Counter title="Counter#2" />
        <Counter title="Counter#3" />
      </main>
    </div>
  );
}
