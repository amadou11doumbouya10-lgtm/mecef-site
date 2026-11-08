import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { actualites, formatDateFr } from "@/data/actualites";
import { realisations, realisationSlug } from "@/data/realisations";

export const metadata: Metadata = {
  title: "Actualités — Chantier du Lot 10 à Siguiri — MECEF ET FILS",
  description:
    "Les étapes du chantier du Lot 10 — AGEROUTE à Siguiri : pose de la première pierre, visites officielles, dalots et ferraillage de la voirie du fleuve Niger.",
};

const lot10 = realisations.find((r) => r.titre === "Lot 10 — AGEROUTE");

export default function ActualitesPage() {
  return (
    <main>
      <PageHero
        image={{ src: "/images/hero-4.jpg", alt: "Lame de niveleuse au réglage de la plateforme en latérite, Lot 10 à Siguiri" }}
        label="Actualités"
        title="Le chantier du Lot 10, étape par étape"
        intro="Les étapes du chantier du Lot 10 — AGEROUTE, voirie du fleuve Niger à Siguiri, telles que publiées par MECEF ET FILS sur sa page Facebook en 2023."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
      />

      <section aria-label="Fil des actualités" className="py-16 sm:py-24">
        <div className="container-page">
          {/* Frise : un filet vertical à gauche, une pastille or par publication (la plus récente en haut). */}
          <ol className="relative border-l border-charcoal-border pl-6 sm:pl-10">
            {actualites.map((actu, i) => (
              <Reveal as="li" key={actu.date + actu.titre} delay={Math.min(i, 3) * 80} className="relative pb-12 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[29px] top-1.5 size-2.5 rounded-full bg-gold ring-4 ring-charcoal sm:-left-[45px]"
                />
                <div className={`grid gap-6 ${actu.photo ? "md:grid-cols-[minmax(0,1fr)_280px]" : ""}`}>
                  <div>
                    <time dateTime={actu.date} className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                      {formatDateFr(actu.date)}
                    </time>
                    <h2 className="mt-2 font-serif text-2xl font-medium leading-snug text-cream">{actu.titre}</h2>
                    <p className="mt-3 max-w-2xl leading-relaxed text-warmgray">{actu.texte}</p>
                  </div>
                  {actu.photo && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-charcoal-border">
                      <Image src={actu.photo.src} alt={actu.photo.alt} fill sizes="(min-width: 768px) 280px, 100vw" className="object-cover" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>

          {lot10 && (
            <div className="mt-14 flex flex-col gap-4 border-t border-charcoal-border pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-warmgray">Source : page Facebook « Mecef &amp; Fils ».</p>
              <Link href={`/realisations#${realisationSlug(lot10)}`} className="btn-outline">
                Voir le chantier en images →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
