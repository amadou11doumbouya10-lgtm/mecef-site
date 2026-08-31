import { Building2, Shovel, Package, Users, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

interface Secteur {
  icon: LucideIcon;
  title: string;
  description: string;
}

const secteurs: Secteur[] = [
  {
    icon: Building2,
    title: "Construction & Travaux Publics",
    description: "Bâtiments, écoles, postes de santé, infrastructures routières.",
  },
  {
    icon: Shovel,
    title: "Aménagement",
    description: "Terrassement, digues, voiries.",
  },
  {
    icon: Package,
    title: "Équipements & Fourniture",
    description: "Mobilier de bureau, matériel administratif.",
  },
  {
    icon: Users,
    title: "Prestations diverses",
    description: "Selon les besoins de nos partenaires.",
  },
];

export default function Sectors() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <p className="label">Nos secteurs</p>
          <h2 className="section-title mt-3">Quatre pôles d&apos;activité</h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-12 grid gap-px overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {secteurs.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-charcoal p-6">
              <Icon size={20} className="text-laterite" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-lg font-medium text-cream">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warmgray">{description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
