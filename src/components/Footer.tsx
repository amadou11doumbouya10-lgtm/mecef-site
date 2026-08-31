import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/materiel", label: "Matériel" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-charcoal-border bg-charcoal">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Image src="/logo/mecef-mark.png" alt="MECEF ET FILS" width={40} height={40} className="size-10 object-contain" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-warmgray">
            Construction, aménagement et équipements en Guinée depuis 2016.
          </p>
        </div>

        <div>
          <p className="label">Navigation</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-warmgray transition-colors hover:text-laterite">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-warmgray">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-laterite" />
              <span>Siguiri Koura I, Commune de Siguiri, République de Guinée</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-laterite" />
              <span>622 06 78 37 / 664 70 05 44</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-laterite" />
              <a href="mailto:2017fakolymamby@gmail.com" className="hover:text-laterite">
                2017fakolymamby@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-border">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-[11px] uppercase tracking-wide text-warmgray-dark sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MECEF ET FILS. Tous droits réservés.</p>
          <p>RCCM : RCCM/GC-KAL/069.093A/2016 · NIF : 966123945</p>
        </div>
      </div>
    </footer>
  );
}
