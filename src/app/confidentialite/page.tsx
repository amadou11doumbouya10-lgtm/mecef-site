import type { Metadata } from "next";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MECEF ET FILS",
  robots: { index: false },
};

// Décrit le fonctionnement réel du site (formulaire → Resend, aucun cookie de mesure
// d'audience, tuiles OpenStreetMap). À faire valider par MECEF (docs/CONTENU_SITE.md §9).
// Si un outil d'analyse ou de nouveaux champs sont ajoutés, mettre cette page à jour.
const blocs = [
  {
    titre: "Données collectées",
    texte:
      "Le site ne collecte que les informations que vous saisissez dans le formulaire de contact : nom, structure ou institution (facultatif), adresse email, téléphone (facultatif), objet de la demande et message.",
  },
  {
    titre: "Utilisation",
    texte:
      "Ces informations servent uniquement à répondre à votre demande (devis, partenariat ou question). Elles ne sont ni vendues ni utilisées à des fins publicitaires.",
  },
  {
    titre: "Transmission",
    texte:
      "Les messages du formulaire sont transmis par email à MECEF ET FILS au moyen du service d'envoi Resend.",
  },
  {
    titre: "Cookies et services tiers",
    texte:
      "Le site n'utilise pas de cookies de mesure d'audience ni de publicité. La carte de la page Qui sommes-nous charge ses fonds de plan depuis les serveurs d'OpenStreetMap, qui reçoivent à cette occasion l'adresse IP de votre appareil.",
  },
];

export default function ConfidentialitePage() {
  return (
    <main className="section">
      <div className="container-page max-w-3xl">
        <p className="label">Informations légales</p>
        <h1 className="section-title mt-3">
          Politique de confidentialité<span className="text-gold">.</span>
        </h1>
        <div className="mt-12 space-y-10">
          {blocs.map((bloc) => (
            <section key={bloc.titre} className="border-t border-charcoal-border pt-6">
              <h2 className="font-serif text-xl font-medium text-cream">{bloc.titre}</h2>
              <p className="mt-3 leading-relaxed text-warmgray">{bloc.texte}</p>
            </section>
          ))}
          <section className="border-t border-charcoal-border pt-6">
            <h2 className="font-serif text-xl font-medium text-cream">Vos droits</h2>
            <p className="mt-3 leading-relaxed text-warmgray">
              Pour consulter, corriger ou faire supprimer les informations que vous nous avez
              transmises, écrivez à{" "}
              <a href={`mailto:${ORG.email}`} className="text-gold hover:text-cream">
                {ORG.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
