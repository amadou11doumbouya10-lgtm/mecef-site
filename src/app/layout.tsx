import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, ORG } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Titre et description par défaut (accueil) : la localisation y figure pour le référencement local.
  title: "MECEF ET FILS — Entreprise BTP à Siguiri, en Haute Guinée et à Conakry",
  description:
    "Entreprise guinéenne de bâtiment et travaux publics, ancrée à Siguiri, active en Haute Guinée et à Conakry depuis 2016 : construction, aménagement, équipements.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: ORG.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/mecef-mark.png`,
  telephone: ORG.telephone,
  email: ORG.email,
  foundingDate: ORG.foundingDate,
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG.address.streetAddress,
    addressCountry: ORG.address.addressCountry,
  },
  areaServed: ORG.areaServed,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${plexMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <TopBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
