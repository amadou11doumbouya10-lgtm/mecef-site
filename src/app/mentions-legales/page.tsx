import type { Metadata } from "next";
import Link from "next/link";
import { ORG, TELEPHONES_AFFICHES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — MECEF ET FILS",
  robots: { index: false },
};

// Contenu à faire valider par MECEF (docs/CONTENU_SITE.md §9). Le nom du responsable de la
// publication n'est pas confirmé : on reste sur « la direction de MECEF ET FILS ».
const blocs: { titre: string; lignes: React.ReactNode[] }[] = [
  {
    titre: "Éditeur du site",
    lignes: [
      "MECEF ET FILS (Mamby Electronique Construction Équipement Fourniture et Fils), entreprise individuelle",
      "Siège social : Siguiri Koura I, Commune de Siguiri, République de Guinée",
      "N° Entreprise (RCCM) : RCCM/GC-KAL/069.093A/2016 — N° Formalité : RCCM/GC-KAL/076.047/2016",
      "NIF : 966123945",
      <>
        Téléphone : {TELEPHONES_AFFICHES.join(" / ")} — Email :{" "}
        <a href={`mailto:${ORG.email}`} className="text-gold hover:text-cream">
          {ORG.email}
        </a>
      </>,
    ],
  },
  { titre: "Responsable de la publication", lignes: ["La direction de MECEF ET FILS."] },
  {
    titre: "Hébergement",
    lignes: ["Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com"],
  },
  {
    titre: "Conception et réalisation",
    lignes: [
      <>
        Vision Amah —{" "}
        <a href="https://vision-amah.vercel.app" target="_blank" rel="noopener" className="text-gold hover:text-cream">
          vision-amah.vercel.app
        </a>
      </>,
    ],
  },
  {
    titre: "Propriété intellectuelle",
    lignes: [
      "Les textes, le logo et les photographies de chantier présentés sur ce site appartiennent à MECEF ET FILS. Toute reproduction sans autorisation préalable est interdite.",
      "Fonds de carte de la page Qui sommes-nous : © contributeurs OpenStreetMap.",
    ],
  },
  {
    titre: "Données personnelles",
    lignes: [
      <>
        Le traitement des informations envoyées par le formulaire de contact est décrit dans la{" "}
        <Link href="/confidentialite" className="text-gold hover:text-cream">
          politique de confidentialité
        </Link>
        .
      </>,
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="section">
      <div className="container-page max-w-3xl">
        <p className="label">Informations légales</p>
        <h1 className="section-title mt-3">
          Mentions légales<span className="text-gold">.</span>
        </h1>
        <div className="mt-12 space-y-10">
          {blocs.map((bloc) => (
            <section key={bloc.titre} className="border-t border-charcoal-border pt-6">
              <h2 className="font-serif text-xl font-medium text-cream">{bloc.titre}</h2>
              <div className="mt-3 space-y-2 leading-relaxed text-warmgray">
                {bloc.lignes.map((ligne, i) => (
                  <p key={i}>{ligne}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
