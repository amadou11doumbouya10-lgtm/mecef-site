import type { Metadata } from "next";
import Partenariats from "@/components/Partenariats";

export const metadata: Metadata = {
  title: "Partenariats — MECEF ET FILS",
};

export default function PartenariatsPage() {
  return (
    <main>
      <section className="pb-4 pt-16 sm:pt-24">
        <div className="container-page">
          <p className="label">Partenariats</p>
          <h1 className="section-title mt-3">
            Des collaborations durables avec les institutions<span className="text-laterite">.</span>
          </h1>
        </div>
      </section>

      <Partenariats />
    </main>
  );
}
