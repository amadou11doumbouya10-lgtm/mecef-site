import Link from "next/link";
import HeroBackground from "@/components/HeroBackground";

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
    </section>
  );
}
