"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Landmark } from "lucide-react";
import { realisations, type Realisation, type CategorieRealisation } from "@/data/realisations";
import Reveal from "@/components/Reveal";

interface RealisationsProps {
  /** "featured" : les 2 chantiers mis en avant sur l'accueil. "full" : la grille filtrable par catégorie. */
  variant?: "featured" | "full";
}

const categories: CategorieRealisation[] = [
  "Travaux routiers",
  "Constructions scolaires",
  "Santé",
  "Fournitures et équipements",
];

export default function Realisations({ variant = "full" }: RealisationsProps) {
  if (variant === "featured") {
    const agerouteLot10 = realisations.find((r) => r.titre === "Lot 10 — AGEROUTE")!;
    const sniesEcole = realisations.find((r) => r.beneficiaire === "SNIES")!;

    return (
      <section className="section border-b border-charcoal-border">
        <div className="container-page">
          <Reveal>
            <p className="label">Nos réalisations</p>
            <h2 className="section-title mt-3">Des chantiers menés à bien depuis 2016</h2>
            <p className="section-intro">
              Depuis 2016, MECEF ET FILS a mené à bien des chantiers variés, pour le compte
              d&apos;agences nationales, de programmes de développement et d&apos;institutions
              locales.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12 grid gap-6 lg:grid-cols-2">
            <RealisationCard realisation={agerouteLot10} accent />
            <RealisationCard realisation={sniesEcole} />
          </Reveal>

          <Link
            href="/realisations"
            className="mt-8 inline-block font-mono text-xs font-medium uppercase tracking-[0.15em] text-laterite hover:text-cream"
          >
            Voir toutes nos réalisations →
          </Link>
        </div>
      </section>
    );
  }

  return <FullGrid />;
}

function FullGrid() {
  const [active, setActive] = useState<CategorieRealisation | "Tous">("Tous");

  const visibleCategories = active === "Tous" ? categories : [active];
  const total = realisations.length;

  return (
    <div>
      <div className="container-page pb-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          <FilterChip label={`Tous (${total})`} active={active === "Tous"} onClick={() => setActive("Tous")} />
          {categories.map((categorie) => {
            const count = realisations.filter((r) => r.categorie === categorie).length;
            if (count === 0) return null;
            return (
              <FilterChip
                key={categorie}
                label={`${categorie} (${count})`}
                active={active === categorie}
                onClick={() => setActive(categorie)}
              />
            );
          })}
        </div>
      </div>

      {visibleCategories.map((categorie) => {
        const items = realisations.filter((r) => r.categorie === categorie);
        if (items.length === 0) return null;

        return (
          <section key={categorie} className="section border-b border-charcoal-border pt-0 last:border-b-0">
            <div className="container-page">
              {active === "Tous" && <h2 className="section-title">{categorie}</h2>}
              <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${active === "Tous" ? "mt-8" : ""}`}>
                {items.map((realisation) => (
                  <RealisationCard key={realisation.titre + (realisation.lieu ?? "")} realisation={realisation} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
        active
          ? "border-laterite bg-laterite text-cream"
          : "border-charcoal-border text-warmgray hover:border-laterite hover:text-cream"
      }`}
    >
      {label}
    </button>
  );
}

export function RealisationCard({ realisation, accent }: { realisation: Realisation; accent?: boolean }) {
  const { titre, lieu, annee, montant, beneficiaire, description } = realisation;

  return (
    <div className={`card flex h-full flex-col ${accent ? "border-l-4 border-l-laterite" : ""}`}>
      <h3 className="font-serif text-lg font-medium text-cream">{titre}</h3>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-warmgray">
        {lieu && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} className="text-laterite" />
            {lieu}
          </span>
        )}
        {beneficiaire && (
          <span className="inline-flex items-center gap-1.5">
            <Landmark size={13} className="text-laterite" />
            {beneficiaire}
          </span>
        )}
      </div>

      {description && <p className="mt-3 text-sm leading-relaxed text-warmgray">{description}</p>}

      {(annee || montant) && (
        <div className="mt-auto flex divide-x divide-charcoal-border border-t border-charcoal-border pt-4">
          {annee && (
            <div className={montant ? "pr-4" : ""}>
              <p className="label">Année</p>
              <p className="mt-1 font-serif text-base font-medium text-cream">{annee}</p>
            </div>
          )}
          {montant && (
            <div className={annee ? "pl-4" : ""}>
              <p className="label">Montant</p>
              <p className="mt-1 font-serif text-base font-medium text-laterite">{montant}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
