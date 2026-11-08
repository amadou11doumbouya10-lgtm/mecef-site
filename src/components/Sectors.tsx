import Link from "next/link";
import Image from "next/image";
import { activites } from "@/data/activites";
import Reveal from "@/components/Reveal";

// Cartes photo des 4 pôles (maquette « Mélange A + B ») : la photo de chaque pôle vient
// du champ `image` de data/activites.ts, la même que sur sa page /activites/[slug].
export default function Sectors() {
  return (
    // id="poles" : cible du lien « Nos pôles » du fil d'Ariane des pages pôles (scroll-mt = Navbar).
    <section id="poles" aria-labelledby="accueil-poles" className="section scroll-mt-20">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="label">Nos secteurs</p>
            <h2 id="accueil-poles" className="section-title mt-3">
              Quatre pôles d&apos;activité<span className="text-gold">.</span>
            </h2>
          </div>
          <p className="max-w-md leading-relaxed text-warmgray">
            La construction, l&apos;aménagement, la fourniture d&apos;équipements et les
            prestations de services.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activites.map(({ slug, title, intro, image }, index) => (
            // Apparition échelonnée : chaque carte arrive 90 ms après la précédente.
            <Reveal key={slug} delay={index * 90} className="h-full">
            <Link
              href={`/activites/${slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card transition-colors hover:border-gold/60"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="font-mono text-xs tracking-[0.16em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl font-medium leading-snug text-cream group-hover:text-gold">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-warmgray">{intro}</p>
                <span className="mt-auto pt-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  Découvrir{" "}
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
