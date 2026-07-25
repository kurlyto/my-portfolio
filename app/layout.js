import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
