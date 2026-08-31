/* Diagramme géométrique (pas une carte géographique précise) reliant les deux zones
   d'implantation de MECEF ET FILS, dans le même esprit "plan de chantier" que le hero. */
export default function RegionMap() {
  return (
    <div className="blueprint-grid relative aspect-[21/9] w-full overflow-hidden rounded-sm border border-charcoal-border bg-charcoal-card">
      <svg viewBox="0 0 840 360" className="size-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path
          d="M 160 180 C 320 60, 520 300, 700 150"
          fill="none"
          stroke="#D9622B"
          strokeWidth="2"
          strokeDasharray="6 8"
        />

        <circle cx="160" cy="180" r="8" fill="#D9622B" />
        <circle cx="160" cy="180" r="16" fill="none" stroke="#D9622B" strokeWidth="1.5" opacity="0.5" />
        <text x="160" y="220" textAnchor="middle" fill="#F3EFE7" fontSize="18" fontFamily="Georgia, serif">
          Siguiri
        </text>
        <text
          x="160"
          y="240"
          textAnchor="middle"
          fill="#9C9A94"
          fontSize="10"
          fontFamily="'Courier New', monospace"
          letterSpacing="2"
        >
          SIÈGE SOCIAL
        </text>

        <circle cx="700" cy="150" r="8" fill="#F3EFE7" />
        <circle cx="700" cy="150" r="16" fill="none" stroke="#F3EFE7" strokeWidth="1.5" opacity="0.4" />
        <text x="700" y="190" textAnchor="middle" fill="#F3EFE7" fontSize="18" fontFamily="Georgia, serif">
          Conakry
        </text>
        <text
          x="700"
          y="210"
          textAnchor="middle"
          fill="#9C9A94"
          fontSize="10"
          fontFamily="'Courier New', monospace"
          letterSpacing="2"
        >
          CHANTIERS SNIES
        </text>

        <text
          x="420"
          y="90"
          textAnchor="middle"
          fill="#6E6C67"
          fontSize="10"
          fontFamily="'Courier New', monospace"
          letterSpacing="3"
        >
          HAUTE GUINÉE — CONAKRY
        </text>
      </svg>
    </div>
  );
}
