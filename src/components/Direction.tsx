import Image from "next/image";

interface DirectionProps {
  /** Portrait du Directeur Général, à fournir dès que disponible (public/images/direction.jpg). */
  portraitUrl?: string;
}

export default function Direction({ portraitUrl }: DirectionProps) {
  return (
    <div className="card flex flex-col gap-5 sm:flex-row">
      {/* Emplacement réservé tant qu'aucun portrait n'est fourni : fond uni + bordure,
          jamais de silhouette générique ni de photo de stock. */}
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-sm border border-charcoal-border bg-charcoal sm:w-32">
        {portraitUrl && (
          <Image src={portraitUrl} alt="Mamby DOUMBOUYA, Directeur Général" fill className="object-cover" />
        )}
      </div>

      <div>
        <h2 className="font-serif text-lg font-medium text-cream">Direction</h2>
        <p className="mt-2 text-sm leading-relaxed text-warmgray">
          <span className="font-medium text-cream">Mamby DOUMBOUYA</span>, Directeur Général,
          dirige l&apos;entreprise et porte une vision familiale du métier — le nom
          &laquo;&nbsp;&amp; FILS&nbsp;&raquo; reflète cet engagement dans la durée.
        </p>
      </div>
    </div>
  );
}
