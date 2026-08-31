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
}

export const realisations: Realisation[] = [
  {
    titre: "Lot 10 — AGEROUTE",
    beneficiaire: "AGEROUTE (Agence Guinéenne des Routes)",
    categorie: "Travaux routiers",
    description:
      "Travaux routiers réalisés pour le compte de l'Agence Guinéenne des Routes. Référence la plus significative de MECEF ET FILS dans le domaine routier à ce jour.",
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
