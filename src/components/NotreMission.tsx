import Image from "next/image";
import { ShieldCheck, MapPin, Users } from "lucide-react";
import Reveal from "@/components/Reveal";

// Les 3 points reprennent des faits déjà établis ailleurs sur le site (accueil, Notre
// ancrage, Direction) — reformulés pour cette section, rien de nouveau n'est affirmé.
const points = [
  {
    icon: ShieldCheck,
    title: "Rigueur et disponibilité",
    description: "Chantiers menés avec rigueur, pour institutions publiques comme clients privés.",
  },
  {
    icon: MapPin,
    title: "Ancrage régional",
    description: "Implantée en Haute Guinée, active jusqu'à Conakry.",
  },
  {
    icon: Users,
    title: "Vision familiale",
    description: "Le nom « & FILS » reflète un engagement dans la durée.",
  },
];

export default function NotreMission() {
  return (
    <section className="section border-t border-charcoal-border">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card">
          <Image
            src="/images/hero-4.jpg"
            alt="Chantier de construction résidentiel"
            fill
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100}>
          <p className="label">Notre mission</p>
          <h2 className="section-title mt-3">
            Construire des chantiers qui inspirent confiance
            <span className="text-laterite">.</span>
          </h2>

          <div className="mt-8 space-y-6">
            {points.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded bg-laterite/10 text-laterite">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-base font-medium text-cream">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-warmgray">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
