"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Délai en ms avant le déclenchement de l'animation, une fois l'élément visible (sert à échelonner). */
  delay?: number;
  className?: string;
  /** "fade-up" (défaut) : fondu + légère montée. "wipe" : dévoilement de bas en haut, pour les photos. */
  variant?: "fade-up" | "wipe";
  /** Balise rendue : "li" pour animer les lignes d'une liste sans casser le HTML. */
  as?: "div" | "li";
}

const styles = {
  "fade-up": {
    base: "transition-all duration-700 ease-out",
    hidden: "translate-y-4 opacity-0",
    shown: "translate-y-0 opacity-100",
  },
  wipe: {
    base: "transition-[clip-path] duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]",
    hidden: "[clip-path:inset(100%_0_0_0)]",
    shown: "[clip-path:inset(0_0_0_0)]",
  },
};

export default function Reveal({ children, delay = 0, className, variant = "fade-up", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respecte la préférence utilisateur : pas d'animation si "réduire les animations" est activé.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { base, hidden, shown } = styles[variant];
  const transitionDelay = visible ? `${delay}ms` : "0ms";

  // "wipe" : le clip-path est posé sur un conteneur intérieur, jamais sur l'élément observé —
  // Chrome tient compte du clip-path de la cible, qui, masquée à 100 %, ne serait jamais
  // déclarée visible par l'IntersectionObserver (constaté : la mosaïque restait vide).
  if (variant === "wipe") {
    return createElement(
      as,
      { ref, className },
      <div
        className={`relative h-full w-full ${base} motion-reduce:transition-none ${visible ? shown : hidden}`}
        style={{ transitionDelay }}
      >
        {children}
      </div>
    );
  }

  return createElement(
    as,
    {
      ref,
      className: `${base} motion-reduce:transition-none ${visible ? shown : hidden} ${className ?? ""}`,
      style: { transitionDelay },
    },
    children
  );
}
