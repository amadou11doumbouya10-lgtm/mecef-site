import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function HomeCta() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="rounded-sm border border-charcoal-border bg-charcoal-card px-8 py-16 text-center sm:px-16">
          <p className="label">Prêt à démarrer ?</p>
          <h2 className="section-title mt-3">
            Parlons de votre prochain chantier
            <span className="text-laterite">.</span>
          </h2>
          <p className="section-intro mx-auto">
            Institutions publiques, programmes de développement ou clients privés — MECEF ET
            FILS accompagne vos projets de construction, d&apos;aménagement et de fourniture
            d&apos;équipements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Nous contacter
            </Link>
            <Link href="/realisations" className="btn-outline">
              Voir nos réalisations
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
