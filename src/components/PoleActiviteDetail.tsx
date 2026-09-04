import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { PoleActivite } from "@/data/activites";
import { realisations, type Realisation } from "@/data/realisations";
import { RealisationCard } from "@/components/Realisations";

export default function PoleActiviteDetail({ pole }: { pole: PoleActivite }) {
  const Icon = pole.icon;

  const items = pole.realisations
    .map(({ titre, lieu }) =>
      realisations.find((r) => r.titre === titre && (r.lieu ?? "") === (lieu ?? ""))
    )
    .filter((r): r is Realisation => Boolean(r));

  return (
    <main>
      <section className="section">
        <div className="container-page">
          <div className="flex size-12 items-center justify-center rounded bg-laterite/10 text-laterite">
            <Icon size={24} strokeWidth={1.5} />
          </div>

          <p className="label mt-6">Nos secteurs</p>
          <h1 className="section-title mt-3">
            {pole.title}
            <span className="text-laterite">.</span>
          </h1>
          <p className="section-intro">{pole.intro}</p>

          <div className="mt-10 max-w-2xl space-y-4">
            {pole.description.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-warmgray">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Illustration générique du secteur — pas une photo du chantier MECEF cité ci-dessous. */}
          <div className="relative mt-10 aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card">
            <Image src={pole.image.src} alt={pole.image.alt} fill className="object-cover" />
          </div>

          {items.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-xl font-medium text-cream">Références liées</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((realisation) => (
                  <RealisationCard key={realisation.titre + (realisation.lieu ?? "")} realisation={realisation} />
                ))}
              </div>
            </div>
          )}

          <Link
            href="/"
            className="mt-16 inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-laterite hover:text-cream"
          >
            <ArrowLeft size={14} />
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
