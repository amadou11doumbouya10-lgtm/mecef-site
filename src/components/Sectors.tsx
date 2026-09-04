import Link from "next/link";
import { activites } from "@/data/activites";
import Reveal from "@/components/Reveal";

export default function Sectors() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <p className="label">Nos secteurs</p>
          <h2 className="section-title mt-3">Quatre pôles d&apos;activité</h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-12 grid gap-px overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {activites.map(({ slug, icon: Icon, title, intro }) => (
            <Link
              key={slug}
              href={`/activites/${slug}`}
              className="group bg-charcoal p-6 transition-colors hover:bg-charcoal-card"
            >
              <Icon size={20} className="text-laterite" strokeWidth={1.5} />
              <h3 className="mt-4 font-serif text-lg font-medium text-cream group-hover:text-laterite">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warmgray">{intro}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
