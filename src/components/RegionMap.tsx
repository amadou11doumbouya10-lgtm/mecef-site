"use client";

import dynamic from "next/dynamic";

// Leaflet touche `window` au chargement — ssr:false est obligatoire, et n'est permis
// par Next que depuis un composant client (d'où ce wrapper "use client").
const LeafletMap = dynamic(() => import("@/components/LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex size-full items-center justify-center font-mono text-xs uppercase tracking-wide text-warmgray">
      Chargement de la carte…
    </div>
  ),
});

export default function RegionMap() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card sm:h-[380px]">
      <LeafletMap />
    </div>
  );
}
