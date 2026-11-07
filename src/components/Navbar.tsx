"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/materiel", label: "Matériel" },
  { href: "/partenariats", label: "Partenariats" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparente en haut de page (la photo du hero passe dessous, cf. -mt-20 dans Hero.tsx),
  // fond charbon dès qu'on défile ou que le menu mobile est ouvert, pour rester lisible.
  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-charcoal-border bg-charcoal/95 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo/mecef-mark.png" alt="" width={40} height={40} className="size-10 object-contain" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cream">
            MECEF ET FILS
          </span>
        </Link>

        {/* Le lien Contact est remplacé sur desktop par le bouton « Nous contacter ». */}
        <nav className="hidden lg:block" aria-label="Navigation principale">
          <ul className="flex items-center gap-7">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-block border-b-2 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-gold text-gold"
                        : "border-transparent text-cream/80 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="btn-primary hidden min-h-11 px-5 lg:inline-flex">
          Nous contacter
        </Link>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-sm text-cream lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-charcoal-border bg-charcoal lg:hidden" aria-label="Navigation mobile">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded px-2 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] ${
                      active ? "text-gold" : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-3">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
