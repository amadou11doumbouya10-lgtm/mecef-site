import { MapPin, Phone, Mail } from "lucide-react";
import { ORG, TELEPHONES_AFFICHES } from "@/lib/site";

// Barre fine de coordonnées au-dessus de la Navbar (structure inspirée de centralgroupgn.com).
// Elle défile avec la page ; seule la Navbar reste collée en haut. Le hero garde son -mt-20,
// qui ne dépend que de la hauteur de la Navbar.
export default function TopBar() {
  return (
    <div className="border-b border-charcoal-border bg-charcoal-card text-xs text-warmgray">
      <div className="container-page flex h-9 items-center justify-between gap-6 xl:max-w-7xl">
        <p className="hidden items-center gap-2 sm:flex">
          <MapPin size={13} className="text-gold" aria-hidden />
          Siguiri Koura I, Commune de Siguiri — Guinée
        </p>
        <div className="flex items-center gap-5">
          <a href={`tel:${ORG.telephone[0]}`} className="flex items-center gap-2 transition-colors hover:text-cream">
            <Phone size={13} className="text-gold" aria-hidden />
            {TELEPHONES_AFFICHES[0]}
            <span className="hidden md:inline">/ {TELEPHONES_AFFICHES[1]}</span>
          </a>
          <a href={`mailto:${ORG.email}`} className="hidden items-center gap-2 transition-colors hover:text-cream md:flex">
            <Mail size={13} className="text-gold" aria-hidden />
            {ORG.email}
          </a>
        </div>
      </div>
    </div>
  );
}
