import { Building2, Shovel, Package, Users, type LucideIcon } from "lucide-react";

// Source unique de vérité pour les 4 pôles d'activité. `prestations` découpe en éléments
// distincts les mots-clés fournis par le client (document "Description de l'entreprise") —
// ne rien ajouter au-delà de ce qui est listé ici (pas de description inventée par prestation).
export interface PoleActivite {
  slug: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  /** Ce que le pôle prend en charge — une carte par élément sur la page du pôle. */
  prestations: string[];
  /** Zone couverte, avec sa préposition : sert au titre SEO et à la section « Zone d'intervention ».
   *  Déduite des lieux des réalisations du pôle (Conakry seulement si une référence y est). */
  zone: string;
  /** Clés (titre + lieu si besoin de désambiguïser) vers des entrées de data/realisations.ts */
  realisations: { titre: string; lieu?: string }[];
  /** Vraie photo de chantier MECEF, recadrée en 16:9 — illustre le pôle, ce n'est pas
   *  forcément l'une des références listées dans `realisations`. */
  image: { src: string; alt: string };
}

export const activites: PoleActivite[] = [
  {
    slug: "construction-travaux-publics",
    title: "Construction & Travaux Publics",
    icon: Building2,
    intro: "Bâtiments, écoles, postes de santé, infrastructures routières.",
    prestations: [
      "Construction et rénovation de bâtiments",
      "Routes et pistes rurales",
      "Ouvrages de franchissement — buses, dalots, ponceaux, ponts",
      "Construction métallique",
      "Études topographiques",
    ],
    zone: "en Haute Guinée et à Conakry",
    realisations: [
      { titre: "Lot 10 — AGEROUTE", lieu: "Siguiri" },
      { titre: "Groupe Scolaire Ousmane Gackou", lieu: "Kankan" },
      { titre: "École primaire", lieu: "Yataya/Filamadina, Ratoma, Conakry" },
      { titre: "École primaire", lieu: "Dabompa, Matoto, Conakry" },
      { titre: "Poste de santé", lieu: "Konsakoro" },
    ],
    image: { src: "/images/activite-construction.jpg", alt: "Ouvriers au coulage d'un dalot" },
  },
  {
    slug: "amenagement",
    title: "Aménagement",
    icon: Shovel,
    intro: "Terrassement, digues, voiries.",
    prestations: ["Terrassement", "Digues", "Voiries"],
    zone: "en Haute Guinée",
    realisations: [{ titre: "Digues et routes", lieu: "Mandiana (Haute Guinée)" }],
    image: { src: "/images/activite-amenagement.jpg", alt: "Voirie en cours de terrassement, pelle hydraulique en arrière-plan" },
  },
  {
    slug: "equipements-fourniture",
    title: "Équipements & Fourniture",
    icon: Package,
    intro: "Mobilier de bureau, matériel administratif.",
    prestations: ["Mobilier de bureau", "Matériel administratif", "Fourniture de matériaux de construction"],
    zone: "en Haute Guinée",
    realisations: [
      { titre: "Direction de l'Urbanisme", lieu: "Siguiri" },
      { titre: "Préfecture de Siguiri" },
    ],
    image: { src: "/images/activite-equipements.jpg", alt: "Armatures en acier mises en place sur le chantier" },
  },
  {
    slug: "prestations-diverses",
    title: "Prestations diverses",
    icon: Users,
    intro: "Selon les besoins de nos partenaires.",
    prestations: ["Selon les besoins de nos partenaires", "Suivi-évaluation des travaux de chantier", "Études d'ingénierie"],
    zone: "en Haute Guinée et à Conakry",
    realisations: [],
    image: { src: "/images/activite-prestations.jpg", alt: "Suivi de chantier sur le ferraillage d'une voirie" },
  },
];
