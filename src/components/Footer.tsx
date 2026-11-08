import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { activites } from "@/data/activites";
import { ORG, TELEPHONES_AFFICHES, DEVIS_HREF } from "@/lib/site";

const liens = [
  { href: "/", label: "Accueil" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/materiel", label: "Matériel" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-border bg-charcoal">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo/mecef-mark.png" alt="" width={40} height={40} className="size-10 object-contain" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cream">MECEF ET FILS</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-warmgray">
            Construction, aménagement et équipements en Guinée depuis 2016.
          </p>
          <Link href={DEVIS_HREF} className="btn-primary mt-6">
            Demander un devis
          </Link>
        </div>

        <div>
          <p className="label">Navigation</p>
          <ul className="mt-4 space-y-2">
            {liens.map((lien) => (
              <li key={lien.href}>
                <Link href={lien.href} className="text-sm text-warmgray transition-colors hover:text-gold">
                  {lien.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Nos pôles</p>
          <ul className="mt-4 space-y-2">
            {activites.map((pole) => (
              <li key={pole.slug}>
                <Link href={`/activites/${pole.slug}`} className="text-sm text-warmgray transition-colors hover:text-gold">
                  {pole.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-warmgray">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
              <span>Siguiri Koura I, Commune de Siguiri, République de Guinée</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold" aria-hidden />
              <span>
                {TELEPHONES_AFFICHES.map((numero, i) => (
                  <span key={numero}>
                    {i > 0 && " / "}
                    <a href={`tel:${ORG.telephone[i]}`} className="hover:text-gold">
                      {numero}
                    </a>
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold" aria-hidden />
              <a href={`mailto:${ORG.email}`} className="hover:text-gold">
                {ORG.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-border">
        <div className="container-page flex flex-col gap-3 py-6 font-mono text-[11px] uppercase tracking-wide text-warmgray lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} MECEF ET FILS · RCCM/GC-KAL/069.093A/2016 · NIF 966123945</p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/mentions-legales" className="transition-colors hover:text-gold">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="transition-colors hover:text-gold">
              Confidentialité
            </Link>
            <span>
              Site réalisé par{" "}
              <a
                href="https://vision-amah.vercel.app"
                target="_blank"
                rel="noopener"
                className="text-cream transition-colors hover:text-gold"
              >
                Vision Amah
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
