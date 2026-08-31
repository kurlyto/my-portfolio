"use client";

import { motion } from "framer-motion";

// Petit utilitaire d'apparition en cascade : chaque bloc monte legerement avec
// un delai croissant, ce qui donne du rythme a l'arrivee sur la page.
function rise(delay) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  };
}

// Hero volontairement SOBRE et centre : une photo ronde discrete, le nom, une
// phrase simple, un bouton. Sur telephone c'est un ecran plein (snap-screen) sur
// lequel on se pose net avant de faire defiler les projets ; sur desktop il
// respire dans sa hauteur naturelle. Photo ronde et cadree sur le haut pour ne
// jamais couper le visage.
export default function ProjectsHero() {
  return (
    <section className="snap-screen mx-auto flex min-h-[100dvh] max-w-2xl flex-col items-center justify-center gap-5 px-6 py-16 text-center sm:min-h-0 sm:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute -inset-3 -z-10 rounded-full bg-[#ff6b35]/25 blur-2xl" />
        <img
          src="/images/profile-pic.png"
          alt="Nathan Knaebel"
          className="h-24 w-24 rounded-full border border-white/15 object-cover object-top shadow-2xl sm:h-32 sm:w-32"
        />
      </motion.div>

      <motion.span
        {...rise(0.06)}
        className="font-mono text-xs uppercase tracking-widest text-[#ff6b35]"
      >
        Portfolio
      </motion.span>

      <motion.h1
        {...rise(0.12)}
        className="font-display text-4xl font-black tracking-tight sm:text-6xl"
      >
        Nathan Knaebel
      </motion.h1>

      <motion.p
        {...rise(0.2)}
        className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
      >
        Ingénieur. Je construis des applications, des produits et des agents IA.
      </motion.p>

      <motion.a
        {...rise(0.28)}
        href="#projets"
        data-cursor-hover
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#ff6b35] px-6 py-3 font-mono text-[13px] font-bold uppercase tracking-wide text-black transition-colors duration-150 hover:bg-[#e2531f]"
      >
        Voir mes projets <span aria-hidden>&darr;</span>
      </motion.a>
    </section>
  );
}
