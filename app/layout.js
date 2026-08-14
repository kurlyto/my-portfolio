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

const SITE_URL = "https://nathan-knaebel.com";
const SITE_NAME = "Votre Agent IA";
const SITE_DESCRIPTION =
  "Un agent IA clé en main qui connaît votre business et vous assiste 24h/24. Mails, prospection, administratif : il s'occupe de tout. Audit gratuit.";

export const metadata = {
  // `default` s'applique aux pages sans titre propre ; `template` habille
  // celles qui en declarent un, sans avoir a repeter le nom du site partout.
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  // Canonical de la home seulement. Chaque page qui n'est pas la home DOIT
  // declarer le sien : sans ca, Next fait heriter celui-ci et Google recoit
  // "cette page est un doublon de l'accueil" sur tout le site.
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/images/logo-nk.png", type: "image/png" }],
    apple: [{ url: "/images/logo-nk.png" }],
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo-nk.png",
        width: 1024,
        height: 1024,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    // summary_large_image demande un visuel en 1.91:1 ; le logo est carre,
    // donc on reste sur la carte compacte qui l'affiche sans le rogner.
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/images/logo-nk.png"],
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
