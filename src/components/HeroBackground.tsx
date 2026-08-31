"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroBackgroundProps {
  /** Photos réelles de chantier. Tant que ce tableau est vide, un motif géométrique
   *  de repli s'affiche à la place — jamais de photo de stock générique. */
  images?: { src: string; alt: string }[];
}

const INTERVAL_MS = 4500;

export default function HeroBackground({ images = [] }: HeroBackgroundProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal">
      {images.length > 0 ? (
        images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      ) : (
        <div className="blueprint-grid absolute inset-0">
          <HeroPlaceholder />
        </div>
      )}

      {/* Dégradés pour garder le texte lisible par-dessus les photos, teintés charbon
          plutôt que noir pur pour rester dans la palette de marque. */}
      <div className="absolute inset-0 bg-charcoal/40" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(24,26,27,0.75)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,26,27,0.6)_0%,transparent_25%,transparent_65%,rgba(24,26,27,0.95)_100%)]"
        aria-hidden
      />

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
          {images.map((image, index) => (
            <span
              key={image.src}
              className={`size-1.5 rounded-full transition-colors ${
                index === active ? "bg-laterite" : "bg-cream/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* Motif géométrique en attendant des photos de chantier libres de droits : toits stylisés + lignes de plan + accent orange */
function HeroPlaceholder() {
  return (
    <svg
      viewBox="0 0 800 450"
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <line x1="0" y1="112" x2="800" y2="112" stroke="#2C2E2F" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="0" y1="225" x2="800" y2="225" stroke="#2C2E2F" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="0" y1="337" x2="800" y2="337" stroke="#2C2E2F" strokeWidth="1" strokeDasharray="4 6" />

      <path d="M 60 400 L 220 220 L 380 400 Z" fill="none" stroke="#8A8985" strokeWidth="1.5" />
      <path d="M 300 400 L 460 180 L 620 400 Z" fill="none" stroke="#6E6C67" strokeWidth="1.5" />
      <path d="M 500 400 L 660 260 L 800 400 Z" fill="none" stroke="#8A8985" strokeWidth="1.5" />

      <circle cx="640" cy="120" r="46" fill="none" stroke="#D9622B" strokeWidth="1.5" />
    </svg>
  );
}
