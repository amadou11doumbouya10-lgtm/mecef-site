import type { Metadata } from "next";
import Realisations from "@/components/Realisations";
import RealisationGallery from "@/components/RealisationGallery";
import PageHero from "@/components/PageHero";
import { realisations, realisationSlug } from "@/data/realisations";

export const metadata: Metadata = {
  title: "Réalisations BTP en Haute Guinée et à Conakry — MECEF ET FILS",
  description:
    "Références de MECEF ET FILS depuis 2016 : travaux routiers (Lot 10 — AGEROUTE à Siguiri), écoles, poste de santé, fournitures pour les institutions.",
};

export default function RealisationsPage() {
  return (
    <main>
      <PageHero
        image={{ src: "/images/hero-3.jpg", alt: "Ferraillage d'un dalot dans son coffrage, Lot 10 à Siguiri" }}
        label="Nos réalisations"
        title="Des chantiers menés à bien depuis 2016"
        intro="Depuis 2016, MECEF ET FILS a mené à bien des chantiers variés, pour le compte d'agences nationales, de programmes de développement et d'institutions locales. Voici un aperçu de nos principales références."
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]}
      />

      <div className="pt-16 sm:pt-20">
        <Realisations />
      </div>

      {/* Une galerie par chantier disposant de vraies photos (aujourd'hui : Lot 10, Siguiri). */}
      {realisations
        .filter((realisation) => realisation.photos?.length)
        .map((realisation) => (
          <RealisationGallery key={realisationSlug(realisation)} realisation={realisation} />
        ))}
    </main>
  );
}
