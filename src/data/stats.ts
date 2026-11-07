import { realisations } from "@/data/realisations";

export interface Stat {
  target: number;
  suffix: string;
  label: string;
}

// Source unique de vérité pour les chiffres clés — affichés dans le bandeau or Stats.tsx.
export const stats: Stat[] = [
  { target: 9, suffix: " ans", label: "d'expérience dans le BTP en Guinée" },
  // « GNF » est dans le libellé, pas dans le chiffre : « 10 Mrds+ GNF » passait sur 2 lignes.
  { target: 10, suffix: " Mrds+", label: "GNF de chantiers réalisés depuis 2016" },
  { target: realisations.length, suffix: "+", label: "références chantiers" },
  { target: 2, suffix: " régions", label: "Haute Guinée et Conakry" },
];
