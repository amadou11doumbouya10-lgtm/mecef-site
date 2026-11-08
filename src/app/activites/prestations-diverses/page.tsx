import type { Metadata } from "next";
import { activites } from "@/data/activites";
import PoleActiviteDetail from "@/components/PoleActiviteDetail";

const pole = activites.find((p) => p.slug === "prestations-diverses")!;

// Titre et description avec la zone (« en Haute Guinée… ») pour le référencement local.
export const metadata: Metadata = {
  title: `${pole.title} ${pole.zone} — MECEF ET FILS`,
  description: `${pole.intro} MECEF ET FILS, entreprise BTP basée à Siguiri, intervient ${pole.zone}.`,
};

export default function Page() {
  return <PoleActiviteDetail pole={pole} />;
}
