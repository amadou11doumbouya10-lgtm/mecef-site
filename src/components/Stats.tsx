"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/stats";

// Bandeau or juste sous le hero (maquette « Mélange A + B ») : texte charbon sur or (≈ 9:1).
// Remplace l'ancien bandeau charbon à 4 couleurs, jugé dispersé.
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Chiffres clés" className="bg-gold text-charcoal">
      <div className="container-page grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-8 pr-4 sm:py-10 lg:border-l lg:border-charcoal/20 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="font-serif text-3xl font-semibold leading-none sm:text-4xl">
              <AnimatedCount target={stat.target} suffix={stat.suffix} started={started} />
            </p>
            <p className="mt-3 text-sm leading-snug sm:text-[15px]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnimatedCount({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 900;
    const startTime = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}
