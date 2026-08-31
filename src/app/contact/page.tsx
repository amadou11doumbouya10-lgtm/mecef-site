import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — MECEF ET FILS",
};

export default function ContactPage() {
  return (
    <main>
      <section className="pb-4 pt-16 sm:pt-24">
        <div className="container-page">
          <p className="label">Contact</p>
          <h1 className="section-title mt-3">
            Parlons de votre projet<span className="text-laterite">.</span>
          </h1>
        </div>
      </section>

      <Contact />
    </main>
  );
}
