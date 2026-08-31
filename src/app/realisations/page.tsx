import type { Metadata } from "next";
import Realisations from "@/components/Realisations";

export const metadata: Metadata = {
  title: "Réalisations — MECEF ET FILS",
};

export default function RealisationsPage() {
  return (
    <main>
      <section className="pb-4 pt-16 sm:pt-24">
        <div className="container-page">
          <p className="label">Nos réalisations</p>
          <h1 className="section-title mt-3">
            Des chantiers menés à bien depuis 2016<span className="text-laterite">.</span>
          </h1>
          <p className="section-intro">
            Depuis 2016, MECEF ET FILS a mené à bien des chantiers variés, pour le compte
            d&apos;agences nationales, de programmes de développement et d&apos;institutions
            locales. Voici un aperçu de nos principales références.
          </p>
        </div>
      </section>

      <Realisations variant="full" />
    </main>
  );
}
