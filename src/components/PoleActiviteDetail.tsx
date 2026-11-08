import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { activites, type PoleActivite } from "@/data/activites";
import { realisations, type Realisation } from "@/data/realisations";
import { RealisationCard } from "@/components/Realisations";
import Reveal from "@/components/Reveal";
import HomeCta from "@/components/HomeCta";
import PageHero from "@/components/PageHero";
import { DEVIS_HREF, ORG, TELEPHONES_AFFICHES } from "@/lib/site";

// Gabarit commun des 4 pages /activites/* (structure et mise en page inspirées des pages piliers
// de centralgroupgn.com — aucun texte repris) : bandeau photo · prestations · références ·
// zone d'intervention · bandeau devis · autres pôles, titres centrés et fonds alternés.
// Les sections « méthode » et « questions fréquentes » attendent le contenu du client
// (docs/CONTENU_SITE.md §7) — ne pas les remplir avec du texte inventé.
export default function PoleActiviteDetail({ pole }: { pole: PoleActivite }) {
  const numero = String(activites.findIndex((p) => p.slug === pole.slug) + 1).padStart(2, "0");
  const zoneTitre = pole.zone.charAt(0).toUpperCase() + pole.zone.slice(1);

  const items = pole.realisations
    .map(({ titre, lieu }) => realisations.find((r) => r.titre === titre && (r.lieu ?? "") === (lieu ?? "")))
    .filter((r): r is Realisation => Boolean(r));
  const lieux = Array.from(new Set(items.map((r) => r.lieu).filter((l): l is string => Boolean(l))));
  const autres = activites.filter((p) => p.slug !== pole.slug);

  return (
    <main>
      <PageHero
        image={pole.image}
        label={`Pôle d'activité ${numero}`}
        title={pole.title}
        subtitle={zoneTitre}
        intro={pole.intro}
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Nos pôles", href: "/#poles" }, { label: pole.title }]}
        actions={
          <>
            <Link href={DEVIS_HREF} className="btn-primary">
              Demander un devis
            </Link>
            <a href={`tel:${ORG.telephone[0]}`} className="btn-outline border-cream/50 normal-case tracking-[0.08em]">
              <Phone size={14} aria-hidden />
              {TELEPHONES_AFFICHES[0]}
            </a>
          </>
        }
      />

      <section aria-labelledby="pole-prestations" className="section">
        <div className="container-page">
          <TitreCentre id="pole-prestations" label="Nos prestations" titre="Ce que nous prenons en charge" />
          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pole.prestations.map((prestation, i) => (
              <Reveal as="li" key={prestation} delay={i * 70} className="card flex h-full flex-col gap-4">
                <span className="flex size-9 items-center justify-center rounded-sm bg-gold/10 font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg leading-snug text-cream">{prestation}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {items.length > 0 && (
        <section aria-labelledby="pole-references" className="section border-y border-charcoal-border bg-charcoal-card">
          <div className="container-page">
            <TitreCentre id="pole-references" label="Ils nous ont fait confiance" titre="Références liées" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((realisation) => (
                <RealisationCard key={realisation.titre + (realisation.lieu ?? "")} realisation={realisation} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="pole-zone" className="section">
        <div className="container-page text-center">
          <TitreCentre id="pole-zone" label="Où nous intervenons" titre="Zone d'intervention" />
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-warmgray">
            Basée à Siguiri, MECEF ET FILS intervient {pole.zone}.
          </p>
          {lieux.length > 0 && (
            <>
              <p className="label mt-10">Chantiers de ce pôle</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {lieux.map((lieu) => (
                  <li
                    key={lieu}
                    className="inline-flex items-center gap-1.5 rounded-full border border-charcoal-border bg-charcoal-card px-3.5 py-1.5 text-sm text-cream"
                  >
                    <MapPin size={13} className="text-sky" aria-hidden />
                    {lieu}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link
            href="/qui-sommes-nous"
            className="mt-8 inline-block font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:text-cream"
          >
            Voir la carte →
          </Link>
        </div>
      </section>

      <HomeCta />

      <section aria-labelledby="pole-autres" className="section bg-charcoal-card">
        <div className="container-page">
          <TitreCentre id="pole-autres" label="Nos autres pôles" titre="Explorer nos métiers" />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {autres.map((autre) => (
              <Link
                key={autre.slug}
                href={`/activites/${autre.slug}`}
                className="group flex flex-col overflow-hidden rounded-sm border border-charcoal-border bg-charcoal transition-colors hover:border-gold/60"
              >
                <span className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={autre.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="flex items-center justify-between gap-4 p-5">
                  <span className="font-serif text-lg leading-snug text-cream group-hover:text-gold">{autre.title}</span>
                  <span aria-hidden className="text-gold transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TitreCentre({ id, label, titre }: { id: string; label: string; titre: string }) {
  return (
    <div className="text-center">
      <p className="label">{label}</p>
      <h2 id={id} className="section-title mt-3">
        {titre}
        <span className="text-gold">.</span>
      </h2>
    </div>
  );
}
