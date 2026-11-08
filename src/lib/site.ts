// Constantes partagées entre metadataBase, sitemap.ts, robots.ts et le schéma JSON-LD.
// SITE_URL doit être mis à jour dans .env.local dès que MECEF ET FILS possède un nom de domaine réel.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mecefetfils.com";

export const ORG = {
  name: "MECEF ET FILS",
  telephone: ["+224622067837", "+224664700544"],
  email: "2017fakolymamby@gmail.com",
  address: {
    streetAddress: "Siguiri Koura I, Commune de Siguiri",
    addressCountry: "GN",
  },
  foundingDate: "2016",
  areaServed: ["Haute Guinée", "Conakry"],
};

/** Numéros tels qu'affichés (même ordre que ORG.telephone, qui sert aux liens tel:). */
export const TELEPHONES_AFFICHES = ["622 06 78 37", "664 70 05 44"];

/** Cible de tous les boutons « Demander un devis » : présélectionne l'objet du formulaire. */
export const DEVIS_HREF = "/contact?objet=devis";
