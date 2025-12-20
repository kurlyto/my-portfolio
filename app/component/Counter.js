//création d'un composant React simple, avec une propriété "title" qui affiche une chaîne de caractères passée en tant que prop.
//la commande "use client" indique que ce composant doit être rendu côté client dans une application Next.js.
// la commande "use server" aurait permis de rendre le composant côté serveur.
//la ligne "export default Counter;" permet d'exporter le composant pour qu'il puisse être importé et utilisé dans d'autres fichiers de l'application (notamment dans app/page.js).

"use client";
import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-gray-300 p-6 shadow-lg">
      <h2 className="text-2xl font-bold">{props.title}</h2>

      <div className="flex items-center gap-4">
        <button onClick={() => setCount((prev) => prev - 1)} className="btn btn-circle btn-outline">
          -
        </button>

        <span className="text-2xl font-medium w-16 text-center">{count}</span>

        <button onClick={() => setCount((prev) => prev + 1)} className="btn btn-circle btn-outline">
          +
        </button>
      </div>
    </div>
  );
}
export default Counter;
