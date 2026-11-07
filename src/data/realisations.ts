// Source unique de vérité pour les réalisations MECEF ET FILS.
// Contenu repris tel quel du fichier docs/CONTENU_SITE.md — ne pas inventer de chantier ou de montant.

export type CategorieRealisation =
  | "Travaux routiers"
  | "Constructions scolaires"
  | "Santé"
  | "Fournitures et équipements";

export interface Realisation {
  titre: string;
  lieu?: string;
  annee?: number;
  montant?: string;
  beneficiaire?: string;
  categorie: CategorieRealisation;
  description?: string;
  /** Par défaut "Achevé" si absent — toutes les réalisations actuelles sont terminées. */
  statut?: "Achevé" | "En cours";
  /** Vraies photos du chantier, dans l'ordre des phases — affichées en galerie sur /realisations. */
  photos?: { src: string; alt: string }[];
  /** Réalisation phare de l'accueil (HomeRealisations.tsx) — une seule à la fois. */
  enAvant?: boolean;
  /** Grande photo du bloc « Réalisation phare » (paysage de préférence). */
  couverture?: { src: string; alt: string };
  /** Chiffres clés du chantier, affichés dans le bloc « Réalisation phare ». */
  chiffres?: { valeur: string; label: string }[];
}

// Accents combinants (U+0300 à U+036F) qui restent après normalize("NFD") : é → e + accent.
// Construit avec fromCharCode pour garder le source en ASCII lisible.
const DIACRITIQUES = new RegExp(`[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`, "g");

/** Ancre stable d'une réalisation (ex. "lot-10-ageroute-siguiri"), utilisée pour lier la carte à sa galerie. */
export function realisationSlug({ titre, lieu }: Pick<Realisation, "titre" | "lieu">): string {
  return [titre, lieu]
    .filter(Boolean)
    .join(" ")
    .normalize("NFD")
    .replace(DIACRITIQUES, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const lot10 = (n: number) => `/images/realisations/lot-10-${String(n).padStart(2, "0")}.jpg`;

export const realisations: Realisation[] = [
  {
    titre: "Lot 10 — AGEROUTE",
    lieu: "Siguiri",
    annee: 2023,
    beneficiaire: "AGEROUTE (Agence Guinéenne des Routes)",
    categorie: "Travaux routiers",
    description:
      "Travaux routiers réalisés pour le compte de l'Agence Guinéenne des Routes. Référence la plus significative de MECEF ET FILS dans le domaine routier à ce jour. Voirie du fleuve Niger à Siguiri : 1 164 m de route en béton armé, avec ouvrages de franchissement (dalots).",
    enAvant: true,
    couverture: { src: "/images/hero-3.jpg", alt: "Ferraillage d'un dalot dans son coffrage, Lot 10 à Siguiri" },
    chiffres: [
      { valeur: "1 164 m", label: "de voirie en béton armé" },
      { valeur: "Dalots", label: "ouvrages de franchissement" },
      { valeur: "2023", label: "année des travaux" },
    ],
    photos: [
      { src: lot10(1), alt: "Pelle hydraulique en terrassement" },
      { src: lot10(2), alt: "Débouchage d'un fossé à la pelle hydraulique" },
      { src: lot10(3), alt: "Niveleuse sur la plateforme en latérite" },
      { src: lot10(4), alt: "Plateforme réglée, niveleuse en bord de voie" },
      { src: lot10(5), alt: "Compactage de la voirie, équipe de chantier sur la plateforme" },
      { src: lot10(6), alt: "Ferraillage en double nappe de la voirie, suivi des travaux" },
      { src: lot10(7), alt: "Ferraillage d'un dalot" },
      { src: lot10(8), alt: "Treillis d'armatures du tablier d'un dalot sur son coffrage" },
      { src: lot10(9), alt: "Coffrage du tablier d'un dalot" },
      { src: lot10(10), alt: "Armatures en attente et coffrage des voiles d'un dalot" },
      { src: lot10(11), alt: "Coulage du béton dans le coffrage d'un voile" },
      { src: lot10(12), alt: "Équipe au coulage du béton d'un ouvrage" },
    ],
  },
  {
    titre: "Digues et routes",
    lieu: "Mandiana (Haute Guinée)",
    annee: 2020,
    montant: "943 832 700 GNF",
    beneficiaire: "PADER HG",
    categorie: "Travaux routiers",
  },
  {
    titre: "Groupe Scolaire Ousmane Gackou",
    lieu: "Kankan",
    annee: 2021,
    montant: "675 045 900 GNF",
    categorie: "Constructions scolaires",
  },
  {
    titre: "École primaire",
    lieu: "Yataya/Filamadina, Ratoma, Conakry",
    annee: 2019,
    montant: "637 805 700 GNF",
    beneficiaire: "SNIES",
    categorie: "Constructions scolaires",
  },
  {
    titre: "École primaire",
    lieu: "Dabompa, Matoto, Conakry",
    annee: 2018,
    montant: "867 645 845 GNF",
    beneficiaire: "SNIES",
    categorie: "Constructions scolaires",
  },
  {
    titre: "Poste de santé",
    lieu: "Konsakoro",
    annee: 2017,
    montant: "373 152 800 GNF",
    beneficiaire: "PDLG",
    categorie: "Santé",
  },
  {
    titre: "Direction de l'Urbanisme",
    lieu: "Siguiri",
    annee: 2022,
    montant: "74 164 000 GNF",
    categorie: "Fournitures et équipements",
  },
  {
    titre: "Préfecture de Siguiri",
    montant: "142 700 000 GNF",
    categorie: "Fournitures et équipements",
  },
];
