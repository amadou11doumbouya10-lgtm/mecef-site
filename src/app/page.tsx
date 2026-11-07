import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PartnerStrip from "@/components/PartnerStrip";
import HomeQuiSommesNous from "@/components/HomeQuiSommesNous";
import Sectors from "@/components/Sectors";
import HomeRealisations from "@/components/HomeRealisations";
import HomeCta from "@/components/HomeCta";

// Ordre de la maquette « Mélange A + B » : rythme sombre → or → sombre → crème → sombre → or.
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <PartnerStrip />
      <HomeQuiSommesNous />
      <Sectors />
      <HomeRealisations />
      <HomeCta />
    </main>
  );
}
