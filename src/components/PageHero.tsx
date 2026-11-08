import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeroProps {
  image: { src: string; alt: string; position?: string };
  /** Petit libellé au-dessus du titre (ex. « Pôle d'activité 01 »). */
  label: string;
  title: string;
  /** Ligne sous le titre, en serif (ex. la zone d'intervention). */
  subtitle?: string;
  intro?: ReactNode;
  /** Fil d'Ariane ; le dernier élément est la page courante (sans lien). */
  breadcrumb?: { label: string; href?: string }[];
  /** Boutons d'action sous le texte. */
  actions?: ReactNode;
}

// Bandeau photo en tête des pages intérieures (mise en page inspirée des pages piliers de
// centralgroupgn.com : fil d'Ariane, grand titre, boutons sur une photo pleine largeur).
// -mt-20 = hauteur de la Navbar (h-20), comme le hero de l'accueil : la photo passe sous la
// barre transparente. Voiles charbon dosés comme dans HeroBackground (texte à gauche).
export default function PageHero({ image, label, title, subtitle, intro, breadcrumb, actions }: PageHeroProps) {
  return (
    <section className="relative -mt-20 flex min-h-[480px] items-end overflow-hidden bg-charcoal sm:min-h-[540px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: image.position }}
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-charcoal/60 lg:bg-transparent lg:bg-[linear-gradient(to_right,rgba(24,26,27,0.88)_0%,rgba(24,26,27,0.6)_45%,rgba(24,26,27,0.2)_75%,rgba(24,26,27,0.1)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(24,26,27,0.6)_0%,transparent_30%,transparent_70%,rgba(24,26,27,0.85)_100%)]"
      />

      <div className="container-page relative z-10 pb-14 pt-36 sm:pb-16">
        {breadcrumb && (
          <nav aria-label="Fil d'Ariane" className="animate-fade-up motion-reduce:animate-none">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-cream/75">
              {breadcrumb.map((item, i) => (
                <li key={item.label} aria-current={i === breadcrumb.length - 1 ? "page" : undefined} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={12} aria-hidden />}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-cream">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-cream">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="label mt-6 animate-fade-up text-gold [animation-delay:80ms] motion-reduce:animate-none">{label}</p>
        <h1 className="mt-3 max-w-3xl animate-fade-up font-serif text-4xl font-medium leading-[1.05] tracking-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] [animation-delay:160ms] motion-reduce:animate-none sm:text-5xl lg:text-6xl">
          {title}
          <span className="text-gold">.</span>
        </h1>
        {subtitle && (
          <p className="mt-3 animate-fade-up font-serif text-xl text-cream/85 [animation-delay:220ms] motion-reduce:animate-none sm:text-2xl">
            {subtitle}
          </p>
        )}
        {intro && (
          <div className="mt-5 max-w-2xl animate-fade-up leading-relaxed text-cream/80 [animation-delay:280ms] motion-reduce:animate-none sm:text-lg">
            {intro}
          </div>
        )}
        {actions && (
          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:340ms] motion-reduce:animate-none sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
