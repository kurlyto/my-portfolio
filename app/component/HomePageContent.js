import Link from "next/link";
import Image from "next/image";
import CtaButton from "./CtaButton";

export default function HomePageContent() {
  return (
    <div className="min-h-screen px-6 py-8">
      <header className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div />

        <nav className="flex items-center justify-center gap-10 text-lg">
          <Link href="#expertise" className="whitespace-nowrap">
            Expertise
          </Link>
          <Link href="#projets" className="whitespace-nowrap">
            Projets
          </Link>
          <Link href="#a-propos" className="whitespace-nowrap">
            A propos
          </Link>
          <Link href="#temoignages" className="whitespace-nowrap">
            Témoignages
          </Link>
        </nav>

        <div className="justify-self-end">
          <CtaButton href="#contact">Me contacter</CtaButton>
        </div>
      </header>

      <main className="mx-auto max-w-5xl pt-10 space-y-16">
        <section id="expertise" className="scroll-mt-24">
          <h2 className="text-3xl font-bold">Expertise</h2>
          <p className="mt-4">Mon expertise</p>
        </section>

        <section id="projets" className="scroll-mt-24">
          <h2 className="text-3xl font-bold">Projets</h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Image
                  src="/images/velo.jpg"
                  alt="Aperçu du projet AI or Not"
                  width={384}
                  height={256}
                  className="w-full h-auto"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">AI or Not</h3>
                <p>Un jeu quotidien où on devine si une photo est générée par IA ou non.</p>
                <div className="card-actions justify-end">
                  <button type="button" className="btn btn-primary">
                    En cours
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <Image
                  src="/images/riga.jpg"
                  alt="Aperçu du futur site photographies"
                  width={384}
                  height={256}
                  className="w-full h-auto"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Photographies</h3>
                <p>
                  Site de présentation de mes photos. Il redirigera vers une page dédiée du même domaine, avec une direction artistique complètement
                  différente.
                </p>
                <div className="card-actions justify-end">
                  <a className="btn btn-primary" href="https://nathan-knaebel.com/photographies">
                    Voir la page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="a-propos" className="scroll-mt-24">
          <h2 className="text-3xl font-bold">A propos</h2>
          <p className="mt-4">Bio / parcours</p>
        </section>

        <section id="temoignages" className="scroll-mt-24">
          <h2 className="text-3xl font-bold">Témoignages</h2>
          <p className="mt-4">TBD</p>
        </section>

        <section id="contact" className="scroll-mt-24 pb-20">
          <h2 className="text-3xl font-bold">Me contacter</h2>
          <p className="mt-4">Mail / formulaire / réseaux</p>
        </section>
      </main>
    </div>
  );
}
