import type { Metadata } from "next";
import { Truck, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";

export const metadata: Metadata = {
  title: "Moyens matériels — MECEF ET FILS",
};

// Photos libres de droits (Pexels), illustrations génériques de matériel de chantier —
// pas des photos du parc matériel réel de MECEF.
const materielImages: { src: string; alt: string }[] = [
  { src: "/images/materiel-1.jpg", alt: "Camion benne déchargeant des matériaux" },
  { src: "/images/materiel-2.jpg", alt: "Compacteur et finisseur sur un chantier routier" },
  { src: "/images/materiel-3.jpg", alt: "Rouleau vibrant sur enrobé" },
  { src: "/images/materiel-4.jpg", alt: "Pelleteuse et camion sur un chantier" },
  { src: "/images/materiel-5.jpg", alt: "Ferraillage sur un chantier" },
];

const materielPropre = [
  "Camion Benne (10 m³, DAF 3600, 2019)",
  "Véhicules de liaison (Toyota TIC-CUP, Toyota Land Cruiser)",
  "Bétonnière (450 litres)",
  "Niveleuse RICHIER Horizonméra (2019)",
  "Moto JUV Cross 125",
  "Poste à souder SODEFA",
  "Vibreur à béton ROBIN",
  "Compacteur BOMAG",
  "Motopompe",
];

const materielLocation = [
  "Excavateur Caterpillar DX6N/90Z5",
  "Bulldozer D9/D10 Luoyang",
  "Compacteur SD22",
  "Camion Grue Zoomlion Q4R",
];

const equipementsSecurite = [
  "30 casques",
  "30 paires de chaussures de sécurité",
  "30 paires de gants",
  "30 lunettes de protection",
  "30 gilets",
  "250 protections antibruit",
  "250 kits de protection individuelle",
  "Matériel sanitaire de chantier",
];

function MaterielList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-warmgray">
          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-laterite" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MaterielPage() {
  return (
    <main>
      <section className="relative flex h-[60vh] min-h-[420px] w-full items-end overflow-hidden bg-charcoal">
        <HeroBackground images={materielImages} />
        <div className="container-page relative z-10 pb-14">
          <p className="label">Moyens matériels</p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl font-medium leading-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-4xl">
            Un parc matériel propre, complété en location<span className="text-laterite">.</span>
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <p className="section-intro">
            MECEF ET FILS dispose d&apos;un parc matériel propre, complété par des équipements en
            location, permettant une exécution autonome et rapide de ses chantiers.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="card">
              <Truck size={20} className="text-laterite" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-lg font-medium text-cream">Matériel en propre</h2>
              <MaterielList items={materielPropre} />
            </div>

            <div className="card">
              <Wrench size={20} className="text-laterite" strokeWidth={1.5} />
              <h2 className="mt-4 font-serif text-lg font-medium text-cream">Matériel en location</h2>
              <MaterielList items={materielLocation} />
            </div>
          </div>

          <div className="card mt-6">
            <ShieldCheck size={20} className="text-laterite" strokeWidth={1.5} />
            <h2 className="mt-4 font-serif text-lg font-medium text-cream">Équipements de sécurité</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {equipementsSecurite.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-warmgray">
                  <CheckCircle2 size={16} className="shrink-0 text-laterite" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
