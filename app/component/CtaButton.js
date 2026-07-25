import Link from "next/link";

export default function CtaButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-block text-sm font-mono border border-white/30 rounded px-4 py-2 whitespace-nowrap transition-all duration-150 ease-out hover:border-white hover:bg-white hover:text-black hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}
