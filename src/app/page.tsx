import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Sectors from "@/components/Sectors";
import Realisations from "@/components/Realisations";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Sectors />
      <Realisations variant="featured" />
    </main>
  );
}
