import Link from "next/link";
import Header from "../component/Header";
import Footer from "../component/FooterAvecArticles";
import { tousLesArticles, FORMATS, SITE_URL, dateLisible } from "./blog-data";

const articles = tousLesArticles();

export const metadata = {
  title: "Blog : agents IA et intelligence artificielle au travail",
  description:
    "Nathan Knaebel construit des agents IA pour des petites entreprises et raconte ici ce que ce travail lui apprend, des bases aux cas concrets.",
  alternates: { canonical: `${SITE_URL}/blog` },
  // Un index vide est une page maigre : on ne le montre a Google qu'a partir
  // du premier article publie.
  robots: { index: articles.length > 0, follow: true },
};

// Une carte par article : le visuel en haut (l'accroche), puis format, date,
// temps de lecture, titre et description bornee a trois lignes. Toute la carte
// est le lien. Trois par ligne sur ordinateur, deux sur tablette, une sur
// telephone (demande de Nathan du 22/09/2026). Meme registre de carte que
// ProjectCards (coins larges, ombre douce, levee au survol).
const CARTE =
  "group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_28px_-16px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_40px_-20px_rgba(0,0,0,0.18)]";

function CarteArticle({ a }) {
  const visuel = a.imageCarte || a.imagePartage || a.image;
  return (
    <li className="h-full">
      <Link
        href={`/blog/${a.slug}`}
        data-cursor-hover
        data-clic={`clic-blog-article-${a.slug}`}
        className={CARTE}
      >
        <div className="aspect-[16/9] overflow-hidden bg-black/[0.04]">
          {visuel && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={visuel}
              alt=""
              width="800"
              height="450"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="font-mono text-[12px] uppercase tracking-widest text-black/50">
            {FORMATS[a.format] || a.format} · {dateLisible(a.date)} · {a.minutes} min
            {a.statut !== "publie" && <span className="ml-2 text-accent">brouillon</span>}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold leading-snug transition-colors group-hover:text-accent">
            {a.titre}
          </h2>
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-black/70">{a.description}</p>
        </div>
      </Link>
    </li>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-white text-black">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-14 pb-24">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Mes articles</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-black/70">
            Je construis des agents IA pour des petites entreprises et j&apos;écris ici ce que ce
            travail m&apos;apprend. Des explications, quelques tutoriels et mon avis sur l&apos;actualité
            quand elle vaut qu&apos;on s&apos;y arrête.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="mt-12 font-mono text-sm text-black/50">Premier article très bientôt.</p>
        ) : (
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {articles.map((a) => (
              <CarteArticle key={a.slug} a={a} />
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
