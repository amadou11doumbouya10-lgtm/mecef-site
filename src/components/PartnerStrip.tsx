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

export default function PartnerStrip() {
  return (
    <section className="border-b border-charcoal-border bg-charcoal py-10">
      <div className="container-page">
        <p className="label text-center">Partenaires institutionnels</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((partner) =>
            partner.logo ? (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center rounded-sm bg-cream px-4 transition-opacity hover:opacity-80"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain sm:h-9"
                />
              </a>
            ) : (
              <span
                key={partner.name}
                className="font-mono text-xs uppercase tracking-[0.15em] text-warmgray"
              >
                {partner.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
