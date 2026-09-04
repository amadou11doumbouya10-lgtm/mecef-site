import type { Metadata } from "next";
import { activites } from "@/data/activites";
import PoleActiviteDetail from "@/components/PoleActiviteDetail";

const pole = activites.find((p) => p.slug === "amenagement")!;

export const metadata: Metadata = {
  title: `${pole.title} — MECEF ET FILS`,
};

export default function Page() {
  return <PoleActiviteDetail pole={pole} />;
}
