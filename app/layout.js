import Script from "next/script";
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
  title: "Votre Agent IA",
  description: "Un agent IA clé en main qui connaît votre business et vous assiste 24h/24. Mails, prospection, administratif : il s'occupe de tout. Audit gratuit.",
  metadataBase: new URL("https://nathan-knaebel.com"),
  icons: {
    icon: [{ url: "/images/ascension.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Votre Agent IA",
    description: "Un agent IA clé en main qui connaît votre business et vous assiste 24h/24. Mails, prospection, administratif : il s'occupe de tout. Audit gratuit.",
    url: "https://nathan-knaebel.com",
    siteName: "Votre Agent IA",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Votre Agent IA",
    description: "Un agent IA clé en main qui connaît votre business et vous assiste 24h/24. Mails, prospection, administratif : il s'occupe de tout. Audit gratuit.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        {children}
        <Analytics />
        {/* Umami (self-hosted). data-domains limite la collecte au domaine de
            prod : le dev en localhost ne pollue pas les stats. */}
        <Script
          strategy="afterInteractive"
          src="https://analytics.mondevisdentaire.fr/script.js"
          data-website-id="7bb33ae8-88f3-4a00-9813-3a126a89e754"
          data-domains="nathan-knaebel.com"
        />
      </body>
    </html>
  );
}
