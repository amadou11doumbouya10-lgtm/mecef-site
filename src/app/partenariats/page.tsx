import type { Metadata } from "next";
import Partenariats from "@/components/Partenariats";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Partenariats institutionnels — MECEF ET FILS",
  description:
    "AGEROUTE, SNIES, PADER HG, PDLG, UCEP : les partenaires institutionnels de MECEF ET FILS en Guinée.",
};

export default function PartenariatsPage() {
  return (
    <main>
      <PageHero
        image={{ src: "/images/hero-5.jpg", alt: "Ferraillage en double nappe de la voirie du Lot 10, équipe de chantier", position: "50% 40%" }}
        label="Partenariats"
        title="Des collaborations durables avec les institutions"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Partenariats" }]}
      />

      <Partenariats />
    </main>
  );
}
