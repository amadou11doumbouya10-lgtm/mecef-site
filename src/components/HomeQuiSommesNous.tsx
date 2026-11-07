import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

// Résumé de /qui-sommes-nous pour l'accueil. Textes repris de docs/CONTENU_SITE.md
// (§2 Présentation, Direction, chiffres clés de l'accueil) — rien d'ajouté.
// Section crème (maquette « Mélange A + B ») pour rompre la suite de sections charbon.
const reperes = [
  { label: "Création", value: "2016" },
  { label: "Siège", value: "Siguiri Koura I, Commune de Siguiri" },
  { label: "Présence", value: "Haute Guinée et Conakry" },
  { label: "Direction", value: "Mamby DOUMBOUYA, Directeur Général" },
];

export default function HomeQuiSommesNous() {
  return (
    <section aria-labelledby="accueil-qsn" className="section bg-cream text-charcoal">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="label text-warmgray-dark">Qui sommes-nous</p>
          <h2 id="accueil-qsn" className="section-title mt-3 text-charcoal lg:text-5xl lg:leading-[1.08]">
            Une entreprise guinéenne, ancrée à Siguiri depuis 2016.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-muted sm:text-[17px]">
            MECEF ET FILS (Mamby Electronique Construction Équipement Fourniture et Fils) est une
            entreprise individuelle guinéenne, créée en 2016 et basée à Siguiri Koura I, Commune de
            Siguiri. Depuis sa création, l&apos;entreprise s&apos;est développée autour de quatre
            pôles d&apos;activité complémentaires : la construction, l&apos;aménagement, la
            fourniture d&apos;équipements, et les prestations de services.
          </p>
          <div className="mt-8">
            <Link href="/qui-sommes-nous" className="btn-dark">
              Découvrir qui nous sommes
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/qui-sommes-nous.jpg"
              alt="Suivi de chantier : l'équipe MECEF sur le ferraillage de la voirie du Lot 10"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl>
            {reperes.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-cream-border py-4 last:border-b-0"
              >
                <dt className="label text-warmgray-dark">{label}</dt>
                <dd className="text-[15px] text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
