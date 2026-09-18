import Link from "next/link";
import Header from "../component/Header";
import Footer from "../component/FooterAvecArticles";
import { tousLesArticles, FORMATS, SITE_URL, dateLisible } from "./blog-data";

const articles = tousLesArticles();

export const metadata = {
  title: "Blog : agents IA et intelligence artificielle au travail",
  description:
    "Comprendre les agents IA, les mettre au travail dans une petite entreprise, suivre l'actualité utile. Écrit par Nathan Knaebel, qui en construit.",
  alternates: { canonical: `${SITE_URL}/blog` },
  // Un index vide est une page maigre : on ne le montre a Google qu'a partir
  // du premier article publie.
  robots: { index: articles.length > 0, follow: true },
};

export default function BlogPage() {
  return (
    <div className="bg-white text-black">
      <Header />

      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Le blog</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-black/70">
          Les agents IA expliqués sans jargon, des tutoriels à refaire chez vous et l&apos;actualité
          qui change vraiment quelque chose pour une petite entreprise.
        </p>

        {articles.length === 0 ? (
          <p className="mt-12 font-mono text-sm text-black/50">Premier article très bientôt.</p>
        ) : (
          <ul className="mt-12 divide-y divide-black/10">
            {articles.map((a) => (
              <li key={a.slug} className="py-8">
                <p className="font-mono text-[12px] uppercase tracking-widest text-black/50">
                  {FORMATS[a.format] || a.format} · {dateLisible(a.date)} · {a.minutes} min
                  {a.statut !== "publie" && <span className="ml-2 text-[#ff6b35]">brouillon</span>}
                </p>
                <h2 className="mt-2 font-display text-xl md:text-2xl font-bold">
                  <Link href={`/blog/${a.slug}`} data-cursor-hover className="hover:text-[#ff6b35] transition-colors">
                    {a.titre}
                  </Link>
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-black/70">{a.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
