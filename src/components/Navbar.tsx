"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { activites } from "@/data/activites";
import { DEVIS_HREF } from "@/lib/site";

// Desktop : « Accueil » est porté par le logo, « Contact » par le bouton « Demander un devis ».
const avantPoles = [{ href: "/qui-sommes-nous", label: "Qui sommes-nous" }];
const apresPoles = [
  { href: "/realisations", label: "Réalisations" },
  { href: "/materiel", label: "Matériel" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/actualites", label: "Actualités" },
];
const poles = activites.map((pole) => ({ href: `/activites/${pole.slug}`, label: pole.title }));

const lienDesktop = (active: boolean) =>
  `inline-flex items-center gap-1 border-b-2 py-3 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
    active ? "border-gold text-gold" : "border-transparent text-cream/80 hover:text-cream"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [polesOpen, setPolesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const polesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme les menus quand on change de page.
  useEffect(() => {
    setOpen(false);
    setPolesOpen(false);
  }, [pathname]);

  // Menu « Nos pôles » : se ferme avec Échap ou un clic en dehors.
  useEffect(() => {
    if (!polesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPolesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (polesRef.current && !polesRef.current.contains(e.target as Node)) setPolesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [polesOpen]);

  // Transparente en haut de page (la photo du hero passe dessous, cf. -mt-20 dans Hero.tsx),
  // fond charbon dès qu'on défile ou que le menu mobile est ouvert, pour rester lisible.
  const solid = scrolled || open;
  const surPole = pathname.startsWith("/activites/");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-charcoal-border bg-charcoal/95 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      {/* xl:max-w-7xl : 6 entrées + bouton ne tiennent pas dans max-w-6xl. Sous xl : menu burger. */}
      <div className="container-page flex h-20 items-center justify-between gap-6 xl:max-w-7xl">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image src="/logo/mecef-mark.png" alt="" width={40} height={40} className="size-10 object-contain" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cream">MECEF ET FILS</span>
        </Link>

        <nav className="hidden xl:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-6">
            {avantPoles.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={lienDesktop(pathname === link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              ref={polesRef}
              className="relative"
              onMouseEnter={() => setPolesOpen(true)}
              onMouseLeave={() => setPolesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={polesOpen}
                aria-controls="menu-poles"
                onClick={() => setPolesOpen((v) => !v)}
                className={lienDesktop(surPole)}
              >
                Nos pôles
                <ChevronDown size={14} aria-hidden className={`transition-transform ${polesOpen ? "rotate-180" : ""}`} />
              </button>
              {polesOpen && (
                // pt-2 : pont invisible entre le bouton et le panneau, pour ne pas perdre le survol.
                <div id="menu-poles" className="absolute left-0 top-full z-50 pt-2">
                  <ul className="w-72 rounded-sm border border-charcoal-border bg-charcoal-card p-2">
                    {poles.map((pole, index) => (
                      <li key={pole.href}>
                        <Link
                          href={pole.href}
                          aria-current={pathname === pole.href ? "page" : undefined}
                          className={`flex items-baseline gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-charcoal ${
                            pathname === pole.href ? "text-gold" : "text-cream"
                          }`}
                        >
                          <span className="font-mono text-[11px] text-gold">{String(index + 1).padStart(2, "0")}</span>
                          {pole.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            {apresPoles.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} className={lienDesktop(pathname === link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={DEVIS_HREF} className="btn-primary hidden min-h-11 shrink-0 px-5 xl:inline-flex">
          Demander un devis
        </Link>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-sm text-cream xl:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-charcoal-border bg-charcoal xl:hidden" aria-label="Navigation mobile">
          <ul className="container-page flex flex-col gap-1 py-4">
            {[{ href: "/", label: "Accueil" }, ...avantPoles].map((link) => (
              <MobileLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
            ))}
            <li className="px-2 pb-1 pt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-warmgray">Nos pôles</li>
            {poles.map((pole) => (
              <MobileLink key={pole.href} href={pole.href} label={pole.label} active={pathname === pole.href} indent />
            ))}
            <li className="mt-2 border-t border-charcoal-border" aria-hidden />
            {[...apresPoles, { href: "/contact", label: "Contact" }].map((link) => (
              <MobileLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
            ))}
            <li className="mt-3">
              <Link href={DEVIS_HREF} className="btn-primary w-full">
                Demander un devis
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function MobileLink({ href, label, active, indent }: { href: string; label: string; active: boolean; indent?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`block rounded px-2 py-3 ${
          indent ? "pl-5 text-sm" : "font-mono text-xs font-medium uppercase tracking-[0.15em]"
        } ${active ? "text-gold" : "text-cream/80 hover:text-cream"}`}
      >
        {label}
      </Link>
    </li>
  );
}
