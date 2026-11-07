import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import { realisations, realisationSlug, type Realisation } from "@/data/realisations";

// Bloc réalisations de l'accueil (maquette « Mélange A + B ») :
// 1. « Réalisation phare » — la réalisation marquée `enAvant` dans data/realisations.ts,
//    en mosaïque (photo de `couverture` + 4 photos de sa galerie) avec ses `chiffres` ;
// 2. « Autres références » — tableau des 4 plus gros montants, du plus récent au plus ancien.

const montantEnGnf = (r: Realisation) => Number((r.montant ?? "").replace(/\D/g, "")) || 0;

/** n photos réparties sur toute la galerie (donc sur toutes les phases du chantier). */
function echantillon<T>(liste: T[], n: number): T[] {
  if (liste.length <= n) return liste;
  return Array.from({ length: n }, (_, i) => liste[Math.round((i * (liste.length - 1)) / (n - 1))]);
}

export default function HomeRealisations() {
  const phare = realisations.find((r) => r.enAvant);
  const autres = realisations
    .filter((r) => r !== phare && r.montant)
    .sort((a, b) => montantEnGnf(b) - montantEnGnf(a))
    .slice(0, 4)
    .sort((a, b) => (b.annee ?? 0) - (a.annee ?? 0));

  return (
    <>
      {phare && <RealisationPhare realisation={phare} />}

      <section aria-labelledby="accueil-references" className="section">
        <div className="container-page">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label">Autres références</p>
              <h2 id="accueil-references" className="section-title mt-3">
                Des chantiers menés à bien depuis 2016<span className="text-gold">.</span>
              </h2>
            </div>
            <Link
              href="/realisations"
              className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:text-cream"
            >
              Toutes nos réalisations →
            </Link>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div className="hidden grid-cols-[80px_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)_190px] gap-6 border-b border-charcoal-border pb-3 md:grid">
              {["Année", "Chantier", "Lieu", "Bénéficiaire", "Montant"].map((titre) => (
                <span key={titre} className={`label ${titre === "Montant" ? "text-right" : ""}`}>
                  {titre}
                </span>
              ))}
            </div>
            <ul>
              {autres.map((r) => (
                <li
                  key={realisationSlug(r)}
                  className="grid gap-1 border-b border-charcoal-border py-5 md:grid-cols-[80px_minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)_190px] md:items-baseline md:gap-6"
                >
                  <span className="font-mono text-sm text-warmgray">{r.annee ?? "—"}</span>
                  <span className="font-serif text-lg text-cream md:text-xl">{r.titre}</span>
                  {/* Sur mobile (lignes empilées), un champ vide est masqué au lieu d'afficher un « — » isolé. */}
                  <span className={`text-[15px] text-warmgray ${r.lieu ? "" : "hidden md:block"}`}>{r.lieu ?? "—"}</span>
                  <span className={`text-[15px] text-warmgray ${r.beneficiaire ? "" : "hidden md:block"}`}>
                    {r.beneficiaire ?? "—"}
                  </span>
                  <span className="font-serif text-lg text-gold md:text-right">{r.montant}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function RealisationPhare({ realisation }: { realisation: Realisation }) {
  const { titre, lieu, annee, beneficiaire, description, couverture, chiffres = [], photos = [] } = realisation;
  const vignettes = echantillon(photos, 4);

  return (
    <section aria-labelledby="accueil-phare" className="section border-y border-charcoal-border bg-charcoal-card">
      <div className="container-page">
        <Reveal className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label">Réalisation phare</p>
            <h2 id="accueil-phare" className="section-title mt-3 lg:text-5xl">
              {titre}
              <span className="text-gold">.</span>
            </h2>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-cream">
              {lieu && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-sky" aria-hidden />
                  {lieu}
                </span>
              )}
              {annee && <span>{annee}</span>}
              {beneficiaire && <span>{beneficiaire}</span>}
            </p>
            {description && <p className="mt-5 leading-relaxed text-warmgray">{description}</p>}
          </div>

          {chiffres.length > 0 && (
            <dl className="grid grid-cols-3 border-y border-charcoal-border">
              {chiffres.map(({ valeur, label }, i) => (
                // flex-col-reverse : la valeur s'affiche au-dessus, mais dt (libellé) reste lu en premier.
                <div
                  key={label}
                  className={`flex flex-col-reverse py-5 ${i > 0 ? "border-l border-charcoal-border pl-4" : "pr-4"}`}
                >
                  <dt className="mt-2 text-[13px] leading-snug text-warmgray">{label}</dt>
                  <dd className={`font-serif text-2xl leading-none sm:text-3xl ${i === 0 ? "text-gold" : "text-cream"}`}>
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>

        {(couverture || vignettes.length > 0) && (
          <Reveal
            delay={100}
            className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:auto-rows-[220px] lg:grid-cols-4"
          >
            {couverture && (
              <div className="relative col-span-2 row-span-2 overflow-hidden rounded-sm">
                <Image src={couverture.src} alt={couverture.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            )}
            {vignettes.map((photo) => (
              <div key={photo.src} className="relative overflow-hidden rounded-sm">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        )}

        {photos.length > 0 && (
          <div className="mt-8">
            <Link href={`/realisations#${realisationSlug(realisation)}`} className="btn-outline">
              Le chantier en images ({photos.length}) →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
