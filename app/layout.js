import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Serif arrondi reserve aux titres : rechauffe la page sans nuire a la
// lisibilite du texte courant, qui reste en Inter.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  // Sans la variante italique chargee, le navigateur incline artificiellement
  // les glyphes au lieu d'utiliser le vrai dessin de la fonte.
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nathan Knaebel",
  description: "Une tâche que vous n'aimez pas faire ? On l'automatise.",
  metadataBase: new URL("https://nathan-knaebel.com"),
  icons: {
    icon: [{ url: "/images/ascension.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Nathan Knaebel",
    description: "Une tâche que vous n'aimez pas faire ? On l'automatise.",
    url: "https://nathan-knaebel.com",
    siteName: "Nathan Knaebel",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Nathan Knaebel",
    description: "Une tâche que vous n'aimez pas faire ? On l'automatise.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
