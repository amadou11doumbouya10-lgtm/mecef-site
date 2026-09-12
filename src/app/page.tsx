import Hero from "@/components/Hero";
import PartnerStrip from "@/components/PartnerStrip";
import Stats from "@/components/Stats";
import Sectors from "@/components/Sectors";
import Realisations from "@/components/Realisations";
import HomeCta from "@/components/HomeCta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PartnerStrip />
      <Stats />
      <Sectors />
      <Realisations variant="featured" />
      <HomeCta />
    </main>
  );
}
