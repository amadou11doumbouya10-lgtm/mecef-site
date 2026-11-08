"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroBackgroundProps {
  /** Photos réelles de chantier. Tant que ce tableau est vide, un motif géométrique
   *  de repli s'affiche à la place — jamais de photo de stock générique.
   *  `position` (CSS object-position, ex. "50% 30%") choisit la bande visible quand une
   *  photo portrait est recadrée en paysage sur desktop ; centrée par défaut. */
  images?: { src: string; alt: string; position?: string }[];
  /** Remonte les barres de progression (md+) quand le hero porte des onglets en bas (accueil). */
  indicateursHaut?: boolean;
}

// 6 s par photo : assez long pour que le zoom lent (« Ken Burns ») se voie sans presser la lecture.
const INTERVAL_MS = 6000;

export default function HeroBackground({ images = [], indicateursHaut = false }: HeroBackgroundProps) {
  const [active, setActive] = useState(0);
  // Le zoom ne démarre qu'après le premier rendu, sinon la 1re photo s'afficherait déjà zoomée.
  const [mounted, setMounted] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimated(true);

    const id = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-charcoal">
      {images.length > 0 ? (
        images.map((image, index) => (
          // Le conteneur gère le fondu (1 s), l'image le zoom lent (7 s) : la photo sortante finit
          // de dézoomer pendant qu'elle est invisible, elle est donc prête pour son prochain tour.
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              style={{ objectPosition: image.position }}
              className={`object-cover transition-transform duration-[7000ms] ease-out motion-reduce:scale-100 motion-reduce:transition-none ${
                mounted && index === active ? "scale-[1.08]" : "scale-100"
              }`}
            />
          </div>
        ))
      ) : (
        <div className="blueprint-grid absolute inset-0">
          <HeroPlaceholder />
        </div>
      )}

      {/* Voiles teintés charbon (pas noir pur, pour rester dans la palette), dosés pour que
          la photo reste bien visible :
          - mobile : le texte occupe toute la largeur → voile uniforme léger ;
          - desktop : le texte est à gauche → dégradé gauche→droite, photo dégagée à droite ;
          - haut (sous la Navbar transparente) et bas (raccord avec la section suivante). */}
      <div
        className="absolute inset-0 bg-charcoal/45 lg:bg-transparent lg:bg-[linear-gradient(to_right,rgba(24,26,27,0.8)_0%,rgba(24,26,27,0.5)_35%,rgba(24,26,27,0.1)_60%,transparent_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,26,27,0.5)_0%,transparent_20%,transparent_75%,rgba(24,26,27,0.8)_100%)]"
        aria-hidden
      />

      {/* Une barre par photo : celle en cours se remplit pendant son affichage (relancée à
          chaque changement grâce à la clé), les autres restent vides. Décoratif. */}
      {images.length > 1 && (
        <div
          className={`absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2 ${indicateursHaut ? "md:bottom-32" : ""}`}
          aria-hidden
        >
          {images.map((image, index) => (
            <span key={image.src} className="relative h-0.5 w-8 overflow-hidden rounded-full bg-cream/30">
              {index === active && (
                <span
                  key={active}
                  className="absolute inset-0 origin-left bg-gold"
                  style={animated ? { animation: `hero-progress ${INTERVAL_MS}ms linear forwards` } : undefined}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* Motif géométrique de repli quand aucune photo n'est fournie : toits stylisés + lignes de plan + accent doré */
function HeroPlaceholder() {
  return (
    <svg
      viewBox="0 0 800 450"
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <line x1="0" y1="112" x2="800" y2="112" className="stroke-charcoal-border" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="0" y1="225" x2="800" y2="225" className="stroke-charcoal-border" strokeWidth="1" strokeDasharray="4 6" />
      <line x1="0" y1="337" x2="800" y2="337" className="stroke-charcoal-border" strokeWidth="1" strokeDasharray="4 6" />

      <path d="M 60 400 L 220 220 L 380 400 Z" fill="none" className="stroke-warmgray-light" strokeWidth="1.5" />
      <path d="M 300 400 L 460 180 L 620 400 Z" fill="none" className="stroke-warmgray-dark" strokeWidth="1.5" />
      <path d="M 500 400 L 660 260 L 800 400 Z" fill="none" className="stroke-warmgray-light" strokeWidth="1.5" />

      <circle cx="640" cy="120" r="46" fill="none" className="stroke-gold" strokeWidth="1.5" />
    </svg>
  );
}
