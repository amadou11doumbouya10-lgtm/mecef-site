// Actualités : publications datées de la page Facebook « Mecef & Fils » (captures fournies par
// le client le 07/11/2026), toutes liées au chantier du Lot 10 — AGEROUTE à Siguiri.
// Textes = reformulation minimale des légendes d'origine, sans rien ajouter (voir
// docs/CONTENU_SITE.md §Actualités). Photo seulement quand la vraie photo de la publication
// existe aussi hors capture d'écran.

export interface Actualite {
  /** Date de l'événement (AAAA-MM-JJ). */
  date: string;
  titre: string;
  texte: string;
  photo?: { src: string; alt: string };
}

export const actualites: Actualite[] = [
  {
    date: "2023-06-25",
    titre: "Construction du troisième dalot",
    texte: "Travaux de construction du troisième dalot sur la route du fleuve Niger, à Siguiri.",
    photo: { src: "/images/realisations/lot-10-01.jpg", alt: "Pelle hydraulique en terrassement pour le troisième dalot" },
  },
  {
    date: "2023-06-23",
    titre: "Débouchage de l'ouvrage de fossé",
    texte: "Travaux de débouchage de l'ouvrage de fossé sur la voirie du fleuve Niger, à Siguiri.",
    photo: { src: "/images/realisations/lot-10-02.jpg", alt: "Débouchage d'un fossé à la pelle hydraulique" },
  },
  {
    date: "2023-06-06",
    titre: "Ferraillage en double nappe",
    texte: "Ferraillage en double nappe de la voirie du fleuve Niger, à Siguiri.",
    photo: { src: "/images/realisations/lot-10-06.jpg", alt: "Ferraillage en double nappe de la voirie, suivi des travaux" },
  },
  {
    date: "2023-05-26",
    titre: "Coulage du deuxième dalot",
    texte: "Coulage des voiles des ailes et du tablier du deuxième dalot.",
    photo: { src: "/images/mission.jpg", alt: "Équipe au coulage du béton du deuxième dalot" },
  },
  {
    date: "2023-05-24",
    titre: "Visite du Directeur des travaux publics de Kankan",
    texte:
      "MECEF ET FILS remercie le Directeur des travaux publics de Kankan pour sa visite du chantier, ses remarques et ses suggestions.",
  },
  {
    date: "2023-05-17",
    titre: "Visite du préfet sur le chantier",
    texte: "Visite inopinée du préfet sur le chantier après 24 jours de travaux : il s'est dit satisfait.",
  },
  {
    date: "2023-05-15",
    titre: "Travaux d'entretien mécanisés",
    texte: "Travaux d'entretien mécanisés sur la voirie du fleuve Niger, à Siguiri.",
    photo: { src: "/images/realisations/lot-10-03.jpg", alt: "Niveleuse sur la plateforme en latérite" },
  },
  {
    date: "2023-04-17",
    titre: "Pose de la première pierre",
    texte:
      "En présence du préfet et du président de la délégation spéciale de Siguiri, MECEF ET FILS pose la première pierre de la route du grand fleuve Niger de Siguiri : 1 164 m de voirie en béton armé.",
  },
];

/** « 25 juin 2023 » — formaté en français, sans dépendre du fuseau horaire. */
export function formatDateFr(iso: string): string {
  const [annee, mois, jour] = iso.split("-").map(Number);
  const nomsMois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  return `${jour === 1 ? "1er" : jour} ${nomsMois[mois - 1]} ${annee}`;
}
