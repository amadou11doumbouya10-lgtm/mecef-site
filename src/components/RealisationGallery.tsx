import Image from "next/image";
import { MapPin, Landmark } from "lucide-react";
import Reveal from "@/components/Reveal";
import { realisationSlug, type Realisation } from "@/data/realisations";

/** Galerie photo d'un chantier (champ `photos` de data/realisations.ts) — rien n'est affiché
 *  si la réalisation n'a pas de photos. Chaque vignette ouvre la photo en grand. */
export default function RealisationGallery({ realisation }: { realisation: Realisation }) {
  const { titre, lieu, annee, beneficiaire, photos = [] } = realisation;
  if (photos.length === 0) return null;

  return (
    // scroll-mt-24 : l'ancre (#slug) ne passe pas sous la Navbar collante (h-20).
    <section id={realisationSlug(realisation)} className="section scroll-mt-24 border-t border-charcoal-border">
      <div className="container-page">
        <Reveal>
          <p className="label">Le chantier en images</p>
          <h2 className="section-title mt-3">
            {titre}
            <span className="text-gold">.</span>
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-warmgray">
            {lieu && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-sky" />
                {lieu}
                {annee && ` — ${annee}`}
              </span>
            )}
            {beneficiaire && (
              <span className="inline-flex items-center gap-1.5">
                <Landmark size={13} className="text-gold" />
                {beneficiaire}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo) => (
            <a
              key={photo.src}
              href={photo.src}
              target="_blank"
              rel="noopener"
              title={photo.alt}
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
