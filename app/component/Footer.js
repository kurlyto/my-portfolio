import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 pt-16 pb-16 text-center max-w-6xl mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-bold">Me contacter</h2>
      <div className="mt-6 flex flex-col items-center gap-2 text-sm font-mono opacity-70">
        <a href="mailto:nathan.knaebel@gmail.com" className="hover:opacity-100 underline">
          nathan.knaebel@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/nathanknaebel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 underline"
        >
          linkedin.com/in/nathanknaebel
        </a>
        <a
          href="https://github.com/nknaebel"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100 underline"
        >
          github.com/nknaebel
        </a>
      </div>
      <Link
        href="/"
        className="inline-block mt-10 text-xs font-mono opacity-50 hover:opacity-100 transition-opacity"
      >
        &larr; retour a l&apos;accueil
      </Link>
    </footer>
  );
}
