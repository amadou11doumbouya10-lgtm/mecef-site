import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, Users } from "lucide-react";
import Reveal from "@/components/Reveal";

// Résumé de /qui-sommes-nous pour l'accueil, sur fond crème (maquette « Mélange A + B »).
// Disposition inspirée du bloc « Notre entreprise » de centralgroupgn.com : texte + étiquettes
// à gauche, photo + 3 cartes à droite. Textes repris de docs/CONTENU_SITE.md §2 et des 3 points
// de NotreMission.tsx (mêmes formulations) — rien d'ajouté.
const reperes = ["Créée en 2016", "Siège à Siguiri Koura I", "Haute Guinée et Conakry", "Dirigée par Mamby DOUMBOUYA"];

const mission = [
  {
    icon: ShieldCheck,
    titre: "Rigueur et disponibilité",
    texte: "Chantiers menés avec rigueur, pour institutions publiques comme clients privés.",
  },
  { icon: MapPin, titre: "Ancrage régional", texte: "Implantée en Haute Guinée, active jusqu'à Conakry." },
  { icon: Users, titre: "Vision familiale", texte: "Le nom « & FILS » reflète un engagement dans la durée." },
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
          <ul className="mt-6 flex flex-wrap gap-2">
            {reperes.map((repere) => (
              <li key={repere} className="rounded-full border border-cream-border px-3.5 py-1.5 text-sm text-charcoal">
                {repere}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link href="/qui-sommes-nous" className="btn-dark">
              Découvrir qui nous sommes
            </Link>
          </div>
        </Reveal>

        <div>
          <Reveal variant="wipe" className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
            <Image
              src="/images/qui-sommes-nous.jpg"
              alt="Suivi de chantier : l'équipe MECEF sur le ferraillage de la voirie du Lot 10"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <ul className="mt-4 grid gap-3">
            {mission.map(({ icon: Icon, titre, texte }, i) => (
              <Reveal
                as="li"
                key={titre}
                delay={150 + i * 90}
                className="flex gap-4 rounded-sm border border-cream-border bg-cream p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-charcoal text-gold">
                  <Icon size={17} strokeWidth={1.5} aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-warmgray-dark">
                    {titre}
                  </span>
                  <span className="mt-1 block text-[15px] leading-snug text-charcoal">{texte}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
