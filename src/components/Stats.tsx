"use client";

import { useEffect, useRef, useState } from "react";
import { realisations } from "@/data/realisations";

interface Stat {
  target: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 9, suffix: " ans", label: "d'expérience dans le BTP en Guinée" },
  { target: 10, prefix: "", suffix: " Mrds+ GNF", label: "de chantiers réalisés depuis 2016" },
  { target: realisations.length, suffix: "+", label: "références chantiers" },
  { target: 2, suffix: " régions", label: "Haute Guinée et Conakry" },
];

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
    <section ref={ref} className="border-b border-charcoal-border bg-charcoal">
      <div className="container-page grid divide-y divide-charcoal-border sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.label} className="px-4 py-10 text-center first:pt-10 sm:py-14">
            <p className="font-serif text-3xl font-medium text-laterite sm:text-4xl">
              <AnimatedCount target={stat.target} suffix={stat.suffix} started={started} />
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-warmgray">
              {stat.label}
            </p>
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
