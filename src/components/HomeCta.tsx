import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ORG } from "@/lib/site";

// Bandeau or de fin d'accueil (maquette « Mélange A + B ») : il répond au bandeau or des
// chiffres clés en haut de page. Texte et boutons en charbon pour le contraste.
export default function HomeCta() {
  return (
    <section aria-labelledby="accueil-cta" className="bg-gold text-charcoal">
      <Reveal className="container-page flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em]">Prêt à démarrer ?</p>
          <h2 id="accueil-cta" className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-5xl">
            Parlons de votre prochain chantier.
          </h2>
          <p className="mt-4 leading-relaxed sm:text-[17px]">
            Institutions publiques, programmes de développement ou clients privés — MECEF ET
            FILS accompagne vos projets de construction, d&apos;aménagement et de fourniture
            d&apos;équipements.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link href="/contact" className="btn-dark">
            Nous contacter
          </Link>
          <a href={`tel:${ORG.telephone[0]}`} className="btn-outline-dark normal-case tracking-[0.08em]">
            622 06 78 37
          </a>
        </div>
      </Reveal>
    </section>
  );
}
