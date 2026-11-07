import Image from "next/image";

interface Partner {
  name: string;
  logo?: string;
  href?: string;
}

// Logo + lien uniquement pour les partenaires dont la source officielle est vérifiée :
// AGEROUTE (ageroute.gov.gn) et UCEP (logo fourni directement par le client, site
// ucepguinee.org). Pas de logo officiel trouvé pour SNIES / PADER HG / PDLG — ils restent
// en texte plutôt que d'inventer un visuel. Voir docs/CONTENU_SITE.md.
const partners: Partner[] = [
  { name: "AGEROUTE", logo: "/logo/partenaires/ageroute.png", href: "https://ageroute.gov.gn" },
  { name: "UCEP", logo: "/logo/partenaires/ucep.png", href: "https://ucepguinee.org" },
  { name: "SNIES" },
  { name: "PADER HG" },
  { name: "PDLG" },
];

// Rangée fixe (plus de défilement en boucle) : avec 5 partenaires, la liste dupliquée du
// défilement apparaissait deux fois à l'écran sur desktop et ressemblait à un bug.
export default function PartnerStrip() {
  return (
    <section aria-label="Partenaires" className="border-b border-charcoal-border bg-charcoal">
      <div className="container-page flex flex-col gap-5 py-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="label shrink-0">Partenaires institutionnels</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <li key={partner.name}>
              {partner.logo ? (
                <a
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 font-serif text-lg text-cream transition-colors hover:text-gold"
                >
                  <span className="flex size-9 items-center justify-center rounded-sm bg-cream">
                    <Image src={partner.logo} alt="" width={28} height={28} className="size-7 object-contain" />
                  </span>
                  {partner.name}
                </a>
              ) : (
                <span className="font-serif text-lg text-cream">{partner.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
