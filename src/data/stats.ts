import { realisations } from "@/data/realisations";

export interface Stat {
  target: number;
  suffix: string;
  label: string;
}

// Source unique de vérité pour les chiffres clés — utilisée par le bandeau Stats.tsx
// (les 4) et par les cartes flottantes du Hero (les 3 premières).
export const stats: Stat[] = [
  { target: 9, suffix: " ans", label: "d'expérience dans le BTP en Guinée" },
  { target: 10, suffix: " Mrds+ GNF", label: "de chantiers réalisés depuis 2016" },
  { target: realisations.length, suffix: "+", label: "références chantiers" },
  { target: 2, suffix: " régions", label: "Haute Guinée et Conakry" },
];
