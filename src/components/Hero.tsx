import Link from "next/link";
import { Clock, Coins, Building2 } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import { stats } from "@/data/stats";

// Les 3 chiffres les plus parlants, en cartes flottantes sur l'image — le bandeau complet
// (4 chiffres) reste juste en dessous du hero (Stats.tsx), rien n'est retiré ni dupliqué en trop.
const heroStats = [
  { icon: Clock, title: "Expérience", stat: stats[0] },
  { icon: Coins, title: "Chantiers réalisés", stat: stats[1] },
  { icon: Building2, title: "Références", stat: stats[2] },
];

// Photos libres de droits (Pexels / Unsplash, licences gratuites) — pas encore de vraies photos
// de chantier MECEF. À remplacer dès que le client en fournit.
const heroImages: { src: string; alt: string }[] = [
  { src: "/images/hero-1.jpg", alt: "Ouvriers sur un chantier de construction" },
  { src: "/images/hero-2.jpg", alt: "Travaux de gros œuvre" },
  { src: "/images/hero-3.jpg", alt: "Bâtiment en construction" },
  { src: "/images/hero-4.jpg", alt: "Chantier de construction résidentielle" },
  { src: "/images/hero-5.jpg", alt: "Chantier de maçonnerie" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-charcoal">
      <HeroBackground images={heroImages} />

      <div className="container-page relative z-10 flex flex-col items-center py-24 text-center sm:py-32">
        <span className="badge">
          <span className="size-1.5 rounded-full bg-laterite" />
          Siguiri — Conakry — Depuis 2016
        </span>

        <h1 className="mt-8 max-w-3xl font-serif text-4xl font-medium leading-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl">
          Construction, Aménagement, Équipements en Guinée depuis 2016
          <span className="text-laterite">.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-warmgray sm:text-lg">
          Une entreprise guinéenne de bâtiment et travaux publics, ancrée à Siguiri, active à
          travers la Haute Guinée et Conakry. De la construction d&apos;écoles à la réalisation de
          travaux routiers, MECEF ET FILS accompagne institutions publiques et clients privés avec
          rigueur et disponibilité.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/realisations" className="btn-primary">
            Voir nos réalisations
          </Link>
          <Link href="/contact" className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </div>

      <div className="absolute right-6 top-28 z-10 hidden w-64 flex-col gap-4 lg:flex xl:right-16">
        {heroStats.map(({ icon: Icon, title, stat }) => (
          <div
            key={title}
            className="rounded-sm border border-charcoal-border/60 bg-charcoal/60 p-4 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-charcoal-card/80 text-laterite">
                <Icon size={14} strokeWidth={1.5} />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-warmgray">{title}</p>
            </div>
            <p className="mt-3 font-serif text-2xl font-medium text-cream">
              {stat.target}
              {stat.suffix}
            </p>
            <p className="mt-1 text-xs text-warmgray">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
