//dans ce fichier app/page.js, nous importons le composant Counter depuis app/component/Counter.js et l'utilisons pour afficher trois compteurs avec des titres différents.

import Counter from "./component/Counter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:items-start">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Counter title="Counter#1" />
        <Counter title="Counter#2" />
        <Counter title="Counter#3" />
      </main>
      <Link href="/photographie" className="underline">photographies</Link>
    </div>
  );
}
