import type { Metadata } from "next";
import RegionMap from "@/components/RegionMap";
import Direction from "@/components/Direction";
import NotreMission from "@/components/NotreMission";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Qui sommes-nous — MECEF ET FILS, entreprise BTP à Siguiri depuis 2016",
  description:
    "MECEF ET FILS, entreprise individuelle guinéenne créée en 2016 à Siguiri Koura I : construction, aménagement, fourniture d'équipements et prestations de services en Haute Guinée et à Conakry.",
};

const infosLegales = [
  { label: "N° Formalité", value: "RCCM/GC-KAL/076.047/2016" },
  { label: "N° Entreprise (RCCM)", value: "RCCM/GC-KAL/069.093A/2016" },
  { label: "NIF", value: "966123945" },
  { label: "Siège social", value: "Siguiri Koura I, Commune de Siguiri, République de Guinée" },
];

export default function QuiSommesNousPage() {
  return (
    <main>
      <PageHero
        image={{ src: "/images/hero-2.jpg", alt: "Compactage de la voirie du Lot 10 à Siguiri, équipe de chantier sur la plateforme", position: "50% 30%" }}
        label="Qui sommes-nous"
        title="MECEF ET FILS"
        subtitle="Une entreprise guinéenne, ancrée à Siguiri depuis 2016"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Qui sommes-nous" }]}
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <div>
                <h2 className="font-serif text-xl font-medium text-cream">Présentation</h2>
                <p className="section-intro">
                  MECEF ET FILS (Mamby Electronique Construction Équipement Fourniture et Fils)
                  est une entreprise individuelle guinéenne, créée en 2016 et basée à Siguiri
                  Koura I, Commune de Siguiri. Depuis sa création, l&apos;entreprise s&apos;est
                  développée autour de quatre pôles d&apos;activité complémentaires : la
                  construction, l&apos;aménagement, la fourniture d&apos;équipements, et les
                  prestations de services.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-medium text-cream">Notre ancrage</h2>
                <p className="section-intro">
                  Implantée en Haute Guinée, MECEF ET FILS a construit sa réputation sur des
                  chantiers exigeants — écoles, postes de santé, infrastructures routières —
                  réalisés pour le compte d&apos;institutions publiques et de programmes de
                  développement. L&apos;entreprise a également étendu son activité à Conakry, où
                  plusieurs réalisations scolaires témoignent de sa capacité à opérer au-delà de
                  sa base régionale.
                </p>
                <div className="mt-6">
                  <RegionMap />
                </div>
              </div>

              <Direction />
            </div>

            <div className="card h-fit">
              <h2 className="font-serif text-lg font-medium text-cream">Informations légales</h2>
              <dl className="mt-5 space-y-4">
                {infosLegales.map((info) => (
                  <div key={info.label}>
                    <dt className="label">{info.label}</dt>
                    <dd className="mt-1 text-sm text-warmgray">{info.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <NotreMission />
    </main>
  );
}
