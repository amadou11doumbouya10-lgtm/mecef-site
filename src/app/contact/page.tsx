import type { Metadata } from "next";
import Contact from "@/components/Contact";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact et demande de devis — MECEF ET FILS, BTP à Siguiri",
  description:
    "Contactez MECEF ET FILS à Siguiri pour un devis de construction, d'aménagement ou de fourniture d'équipements en Haute Guinée et à Conakry.",
};

// Les boutons « Demander un devis » pointent vers /contact?objet=devis : l'objet du
// formulaire est alors présélectionné. (Lire searchParams rend cette page dynamique.)
export default function ContactPage({ searchParams }: { searchParams: { objet?: string } }) {
  const objet = searchParams.objet;
  const defaultSubject = objet === "devis" || objet === "partenariat" || objet === "question" ? objet : undefined;

  return (
    <main>
      <PageHero
        image={{ src: "/images/hero-1.jpg", alt: "Équipe MECEF au coulage du béton d'un ouvrage", position: "50% 40%" }}
        label={defaultSubject === "devis" ? "Demande de devis" : "Contact"}
        title="Parlons de votre projet"
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: defaultSubject === "devis" ? "Demande de devis" : "Contact" }]}
      />

      <Contact defaultSubject={defaultSubject} />
    </main>
  );
}
