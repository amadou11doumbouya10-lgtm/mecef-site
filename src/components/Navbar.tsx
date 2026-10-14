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
  { href: "/contact", label: "Contact" },
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
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo/mecef-mark.png" alt="" width={40} height={40} className="size-10 object-contain" />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-cream">
            MECEF <span className="text-warmgray">/ FILS</span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-mono text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                      active ? "text-gold" : "text-warmgray hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="text-cream md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-charcoal-border bg-charcoal md:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded px-2 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] ${
                      active ? "text-gold" : "text-warmgray hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
