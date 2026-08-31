import Link from "next/link";
import { Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const partenaires = [
  {
    sigle: "SNIES",
    nom: "Service National des Infrastructures et Équipements Scolaires",
    description: "Collaboration établie sur plusieurs projets scolaires à Conakry.",
  },
  {
    sigle: "AGEROUTE",
    nom: "Agence Guinéenne des Routes",
    description: "Référence sur travaux routiers (Lot 10).",
  },
  {
    sigle: "PADER HG",
    nom: "Programme de développement agricole, Haute Guinée",
    description: "Réalisation de digues et routes à Mandiana.",
  },
  {
    sigle: "PDLG",
    nom: "Programme de développement local",
    description: "Construction du poste de santé de Konsakoro.",
  },
];

export default function Partenariats() {
  return (
    <>
      <section className="section border-b border-charcoal-border">
        <div className="container-page">
          <Reveal>
            <p className="label">Partenariats</p>
            <h2 className="section-title mt-3">Nos partenaires institutionnels</h2>
            <p className="section-intro">
              MECEF ET FILS développe activement des relations de collaboration avec les
              institutions publiques et les programmes de développement en Guinée, dans une
              logique de partenariat durable.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-12 grid gap-6 sm:grid-cols-2">
            {partenaires.map((partenaire) => (
              <div key={partenaire.sigle} className="card flex gap-4">
                <Handshake size={20} className="mt-1 shrink-0 text-laterite" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-lg font-medium text-cream">{partenaire.sigle}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-warmgray-dark">
                    {partenaire.nom}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-warmgray">{partenaire.description}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section border-b border-charcoal-border">
        <Reveal className="container-page sm:mx-auto sm:max-w-2xl sm:text-center">
          <h2 className="section-title">Notre démarche</h2>
          <p className="section-intro sm:mx-auto">
            Nous sommes ouverts à toute opportunité de collaboration avec les ministères, agences
            et projets financés par des bailleurs internationaux (BAD, Banque Mondiale, etc.),
            notamment dans les domaines de la construction, de l&apos;aménagement et de la
            fourniture d&apos;équipements.
          </p>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="container-page flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-xl font-serif text-2xl font-medium text-cream">
            Vous portez un projet et cherchez un partenaire local de confiance
            <span className="text-laterite">.</span>
          </h2>
          <Link href="/contact" className="btn-primary shrink-0">
            Contactez-nous
          </Link>
        </Reveal>
      </section>
    </>
  );
}
