import Link from "next/link";

export default function CtaButton({ href, children }) {
  return (
    <Link href={href} className="btn btn-primary whitespace-nowrap">
      {children}
    </Link>
  );
}
