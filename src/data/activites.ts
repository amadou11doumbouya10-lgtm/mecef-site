import { Building2, Shovel, Package, Users, type LucideIcon } from "lucide-react";

// Source unique de vérité pour les 4 pôles d'activité. Les phrases de `description` sont
// des reformulations minimales des mots-clés fournis par le client (document "Description
// de l'entreprise") — ne rien ajouter au-delà de ce qui est listé ici.
export interface PoleActivite {
  slug: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  description: string[];
  /** Clés (titre + lieu si besoin de désambiguïser) vers des entrées de data/realisations.ts */
  realisations: { titre: string; lieu?: string }[];
  /** Illustration générique (pas un chantier MECEF documenté) — même pool que le carrousel du hero. */
  image: { src: string; alt: string };
}

export const activites: PoleActivite[] = [
  {
    slug: "construction-travaux-publics",
    title: "Construction & Travaux Publics",
    icon: Building2,
    intro: "Bâtiments, écoles, postes de santé, infrastructures routières.",
    description: [
      "Construction et rénovation de bâtiments, routes et pistes rurales.",
      "Ouvrages de franchissement — buses, dalots, ponceaux, ponts.",
      "Construction métallique et études topographiques.",
    ],
    realisations: [
      { titre: "Lot 10 — AGEROUTE" },
      { titre: "Groupe Scolaire Ousmane Gackou", lieu: "Kankan" },
      { titre: "École primaire", lieu: "Yataya/Filamadina, Ratoma, Conakry" },
      { titre: "École primaire", lieu: "Dabompa, Matoto, Conakry" },
      { titre: "Poste de santé", lieu: "Konsakoro" },
    ],
    image: { src: "/images/hero-1.jpg", alt: "Ouvriers sur un chantier de construction" },
  },
  {
    slug: "amenagement",
    title: "Aménagement",
    icon: Shovel,
    intro: "Terrassement, digues, voiries.",
    description: ["Terrassement, digues, voiries."],
    realisations: [{ titre: "Digues et routes", lieu: "Mandiana (Haute Guinée)" }],
    image: { src: "/images/hero-5.jpg", alt: "Travaux de maçonnerie sur un chantier" },
  },
  {
    slug: "equipements-fourniture",
    title: "Équipements & Fourniture",
    icon: Package,
    intro: "Mobilier de bureau, matériel administratif.",
    description: ["Mobilier de bureau, matériel administratif et fourniture de matériaux de construction."],
    realisations: [
      { titre: "Direction de l'Urbanisme", lieu: "Siguiri" },
      { titre: "Préfecture de Siguiri" },
    ],
    image: { src: "/images/hero-2.jpg", alt: "Matériaux et structures sur un chantier" },
  },
  {
    slug: "prestations-diverses",
    title: "Prestations diverses",
    icon: Users,
    intro: "Selon les besoins de nos partenaires.",
    description: ["Selon les besoins de nos partenaires.", "Suivi-évaluation des travaux de chantier et études d'ingénierie."],
    realisations: [],
    image: { src: "/images/hero-3.jpg", alt: "Bâtiment en fin de construction" },
  },
];
