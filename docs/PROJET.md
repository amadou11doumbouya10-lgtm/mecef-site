# MECEF ET FILS — Documentation technique

## Objectif

Site vitrine pour MECEF ET FILS, entreprise guinéenne de bâtiment et travaux publics (BTP),
basée à Siguiri, active en Haute Guinée et à Conakry depuis 2016. Six pages statiques,
sans base de données : le contenu vient soit de `src/data/`, soit est écrit directement
dans les composants de section.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — palette et polices personnalisées dans `tailwind.config.ts`
- **`next/font/google`** — Fraunces (titres serif) + IBM Plex Mono (navigation, labels, métadonnées)
- **Resend** — envoi du formulaire de contact via `src/app/contact/actions.ts`
- **Zod** — validation côté serveur du formulaire de contact
- **`react-leaflet` + `leaflet`** — carte interactive Siguiri/Conakry sur `/qui-sommes-nous`, tuiles OpenStreetMap gratuites (sans clé API), rendu sombre par filtre CSS

## Structure

```
src/
  app/                     un dossier par route, chacun avec page.tsx
    activites/
      construction-travaux-publics/page.tsx
      amenagement/page.tsx
      equipements-fourniture/page.tsx
      prestations-diverses/page.tsx
    contact/
      page.tsx
      actions.ts           Server Action "use server" (sendContactMessage)
    sitemap.ts              généré automatiquement par Next (route /sitemap.xml)
    robots.ts               généré automatiquement par Next (route /robots.txt)
    icon.png                favicon (convention App Router, détecté automatiquement)
    apple-icon.png          icône iOS, fond charbon plein
    opengraph-image.png     image de partage social (convention App Router)
  components/               un composant par section de page
    Navbar.tsx
    Hero.tsx / HeroBackground.tsx   hero plein écran, carrousel photo en fondu enchaîné (fallback SVG géométrique si aucune image)
    Sectors.tsx              4 pôles, cliquables vers /activites/[slug]
    Stats.tsx                bandeau de chiffres clés, compteur animé au scroll
    Realisations.tsx         variant="featured" (accueil) | variant="full" (filtres par catégorie) ; exporte aussi RealisationCard
    PoleActiviteDetail.tsx   template partagé par les 4 pages /activites/*
    Direction.tsx            bloc "Direction" avec emplacement portrait (prop portraitUrl optionnelle)
    Partenariats.tsx
    Contact.tsx
    Footer.tsx
    Reveal.tsx               wrapper animation fade-in au scroll (respecte prefers-reduced-motion)
    RegionMap.tsx            wrapper "use client" + next/dynamic(ssr:false) autour de LeafletMapInner
    LeafletMapInner.tsx      la vraie carte Leaflet (marqueurs Siguiri/Conakry, tuiles OSM + filtre sombre)
  data/
    realisations.ts         source unique de vérité des chantiers (année, montant, bénéficiaire)
    activites.ts             les 4 pôles d'activité (description + réalisations liées par titre/lieu)
  lib/
    site.ts                 SITE_URL + coordonnées de l'entreprise, réutilisés par metadataBase/sitemap/JSON-LD
public/
  logo/
    mecef-mark.png           pictogramme seul, fond transparent — usage inline (Navbar, Footer)
    mecef-logo.png            logo complet (pictogramme + "MECEF"), fond transparent
  images/
    hero-1.jpg … hero-5.jpg  photos libres de droits (Pexels/Unsplash) pour le carrousel du hero — à remplacer par de vraies photos de chantier MECEF dès réception
docs/
  PROJET.md                  ce fichier
  CONTENU_SITE.md            contenu texte source de toutes les pages
```

### Carte Siguiri/Conakry (`RegionMap.tsx` / `LeafletMapInner.tsx`)

Leaflet touche `window` au chargement du module, donc le composant qui contient `MapContainer`
(`LeafletMapInner.tsx`) est chargé via `next/dynamic(..., { ssr: false })` — ce qui n'est permis
par Next que depuis un composant client, d'où le wrapper `"use client"` dans `RegionMap.tsx`.

Tuiles : `https://tile.openstreetmap.org/{z}/{x}/{y}.png` (domaine nu, **sans** rotation de
sous-domaines `{s}`) — gratuites, sans clé API. Les tuiles "dark" de CARTO
(`basemaps.cartocdn.com/dark_all`), souvent citées comme alternative sombre gratuite, affichent
désormais un filigrane "API KEY REQUIRED" sans compte — à éviter. Le rendu sombre vient d'un
filtre CSS (`filter: invert(1) hue-rotate(180deg) ...`) appliqué uniquement à
`.leaflet-tile-pane` dans `globals.css`, pour ne pas affecter les marqueurs/popups. Marqueurs
custom en `L.divIcon` (jamais `L.Icon.Default`, dont les chemins d'icônes par défaut sont cassés
par les bundlers).

### Pages pôles d'activité (`src/app/activites/*`, `src/data/activites.ts`)

Les 4 pôles ne correspondent **pas** un-à-un aux `categorie` de `realisations.ts` (ex. "Digues et
routes de Mandiana" est catégorisé `Travaux routiers` mais rattaché au pôle `Aménagement`) — chaque
pôle référence donc ses réalisations par `{ titre, lieu }` exact dans `activites.ts`, jamais par un
filtre générique sur `categorie`. Les paragraphes de description sont des reformulations minimales
des mots-clés fournis par le client (document "Description de l'entreprise") — ne rien étoffer
au-delà de ce qui figure dans `activites.ts`.

## Identité visuelle

**Palette** (définie dans `tailwind.config.ts`, jamais en hex en dur dans les composants) :

| Rôle | Token Tailwind | Valeur |
|---|---|---|
| Fond principal | `bg-charcoal` | `#181A1B` |
| Fond cartes/sections | `bg-charcoal-card` | `#212325` |
| Bordures | `border-charcoal-border` | `#2C2E2F` |
| Accent | `text-laterite` / `bg-laterite` | `#D9622B` |
| Texte principal | `text-cream` | `#F3EFE7` |
| Texte secondaire | `text-warmgray` | `#9C9A94` |
| Texte tertiaire / labels | `text-warmgray-dark` / `text-warmgray-light` | `#6E6C67` / `#8A8985` |

**Typographie** : titres en serif (`font-serif`, Fraunces), navigation/labels/métadonnées en
mono majuscules espacées (`font-mono`, IBM Plex Mono), corps de texte en sans-serif système.

**Ton** : sobre, éditorial — pas de gradients, pas d'ombres portées, pas d'icônes ou de photos
génériques de stock. Le hero (`src/components/Hero.tsx`) accepte une prop `imageUrl` optionnelle ;
tant qu'aucune photo réelle de chantier n'est fournie, il affiche un motif géométrique discret
(`HeroPlaceholder`) plutôt qu'un placeholder générique.

## Contenu

Tous les textes, chiffres et références proviennent de `docs/CONTENU_SITE.md` — c'est la
source de vérité. Ne rien inventer : toute nouvelle réalisation, tout nouveau chiffre doit
d'abord être ajouté à ce fichier, puis reporté dans `src/data/realisations.ts` ou le composant
concerné.

## Variables d'environnement

`.env.local` :

```
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://mecefetfils.com
```

Tant que `RESEND_API_KEY` est vide, `sendContactMessage` (`src/app/contact/actions.ts`) échoue
proprement avec un message invitant à contacter MECEF par téléphone, plutôt que de laisser
Resend renvoyer une erreur d'authentification.

`NEXT_PUBLIC_SITE_URL` est un placeholder tant que MECEF ET FILS n'a pas de nom de domaine
réel — il alimente `metadataBase`, `sitemap.ts`, `robots.ts` et le schéma JSON-LD
(`src/lib/site.ts`). À mettre à jour dès que le vrai domaine est acheté.

## SEO

- **Schéma JSON-LD** (`GeneralContractor`) injecté dans `src/app/layout.tsx`, alimenté par
  `src/lib/site.ts`.
- **Sitemap** (`src/app/sitemap.ts`) et **robots.txt** (`src/app/robots.ts`) — conventions
  App Router, aucune configuration manuelle nécessaire.
- **Favicon / icône iOS / image Open Graph** — `src/app/icon.png`, `apple-icon.png`,
  `opengraph-image.png`, générés depuis le logo HD fourni par le client (voir
  `public/logo/mecef-mark.png` pour le pictogramme source).

## Commandes

- `npm install` — première installation
- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — démarrer le build de production
- `npm run lint` — vérifications ESLint

Aucune suite de tests n'est configurée pour l'instant.
