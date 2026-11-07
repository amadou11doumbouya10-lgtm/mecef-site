import Link from "next/link";
import { MapPin } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";

// Les chiffres clés ne sont plus en cartes flottantes ici : ils sont dans le bandeau or
// (Stats.tsx) juste sous le hero — les afficher aux deux endroits faisait doublon.

// Vraies photos de chantier MECEF (fournies par le client, novembre 2026). Sources en portrait :
// `position` règle la bande visible sur desktop, le mobile affiche la photo presque entière.
const heroImages: { src: string; alt: string; position?: string }[] = [
  { src: "/images/hero-1.jpg", alt: "Équipe MECEF au coulage du béton d'un ouvrage", position: "50% 40%" },
  { src: "/images/hero-2.jpg", alt: "Compactage d'une voirie, équipe de chantier sur la plateforme", position: "50% 30%" },
  { src: "/images/hero-3.jpg", alt: "Ferraillage d'un dalot dans son coffrage" },
  { src: "/images/hero-4.jpg", alt: "Lame de niveleuse au réglage de la plateforme en latérite" },
  { src: "/images/hero-5.jpg", alt: "Ferraillage en double nappe d'une voirie en béton armé", position: "50% 40%" },
];

export default function Hero() {
  return (
    // -mt-20 = hauteur de la Navbar (h-20) : la photo remonte sous la barre transparente.
    <section className="relative -mt-20 flex min-h-screen w-full items-center justify-center overflow-hidden bg-charcoal">
      <HeroBackground images={heroImages} />

      <div className="container-page relative z-10 flex flex-col items-start py-28 text-left sm:py-36">
        <span className="badge border-cream/30 text-cream">
          <span className="size-1.5 rounded-full bg-gold" />
          Siguiri — Conakry — Depuis 2016
        </span>

        <h1 className="mt-8 max-w-2xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl lg:max-w-xl lg:text-7xl xl:max-w-2xl">
          Construction, aménagement, équipements en Guinée depuis 2016
          <span className="text-gold">.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg lg:max-w-lg">
          Une entreprise guinéenne de bâtiment et travaux publics, ancrée à Siguiri, active à
          travers la Haute Guinée et Conakry. De la construction d&apos;écoles à la réalisation de
          travaux routiers, MECEF ET FILS accompagne institutions publiques et clients privés avec
          rigueur et disponibilité.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/realisations" className="btn-primary">
            Voir nos réalisations →
          </Link>
          <Link href="/contact" className="btn-outline border-cream/50">
            Nous contacter
          </Link>
        </div>
      </div>

      {/* Toutes les photos du carrousel viennent du chantier du Lot 10 (cf. CONTENU_SITE.md). */}
      <p className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 rounded-sm bg-charcoal/75 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-cream sm:flex lg:right-12">
        <MapPin size={14} className="text-sky" aria-hidden />
        Lot 10 — AGEROUTE · Siguiri · 2023
      </p>
    </section>
  );
}
