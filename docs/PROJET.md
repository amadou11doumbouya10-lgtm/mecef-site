# MECEF ET FILS — Documentation technique

## Objectif

Site vitrine pour MECEF ET FILS, entreprise guinéenne de bâtiment et travaux publics (BTP),
basée à Siguiri, active en Haute Guinée et à Conakry depuis 2016. Six pages principales et
quatre pages de pôle d'activité, toutes statiques, sans base de données : le contenu vient
soit de `src/data/`, soit est écrit directement dans les composants de section.

En ligne sur https://mecef-site.vercel.app (voir [Déploiement](#déploiement)).

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
    Navbar.tsx               transparente en haut de page, fond charbon au défilement, bouton « Nous contacter » (voir plus bas)
    Hero.tsx / HeroBackground.tsx   hero plein écran, carrousel photo en fondu enchaîné (fallback SVG géométrique si aucune image), légende « Lot 10 · Siguiri · 2023 »
    Stats.tsx                bandeau or des chiffres clés sous le hero, compteur animé au scroll
    PartnerStrip.tsx         rangée fixe des partenaires (logo officiel pour AGEROUTE et UCEP, texte pour les autres)
    HomeQuiSommesNous.tsx    section crème : résumé de /qui-sommes-nous (présentation, repères, photo, lien)
    Sectors.tsx              4 cartes photo des pôles, cliquables vers /activites/[slug]
    HomeRealisations.tsx     « Réalisation phare » (Lot 10 : mosaïque + chiffres) puis tableau « Autres références »
    HomeCta.tsx              bandeau or d'appel à l'action final de l'accueil
    Realisations.tsx         grille filtrable par catégorie de /realisations ; exporte aussi RealisationCard (avec badge de statut Achevé / En cours)
    RealisationGallery.tsx   galerie photo d'un chantier (champ `photos` de realisations.ts), en bas de /realisations
    PoleActiviteDetail.tsx   template partagé par les 4 pages /activites/*
    Direction.tsx            bloc "Direction" avec emplacement portrait (prop portraitUrl optionnelle, pas encore fournie)
    NotreMission.tsx         section "Notre mission" de /qui-sommes-nous
    Partenariats.tsx
    Contact.tsx
    Footer.tsx               coordonnées, mentions légales (RCCM/NIF) et signature "Site réalisé par Vision Amah"
    Reveal.tsx               wrapper animation fade-in au scroll (respecte prefers-reduced-motion)
    RegionMap.tsx            wrapper "use client" + next/dynamic(ssr:false) autour de LeafletMapInner
    LeafletMapInner.tsx      la vraie carte Leaflet (marqueurs Siguiri/Conakry, tuiles OSM + filtre sombre)
  data/
    realisations.ts         source unique de vérité des chantiers (année, montant, bénéficiaire)
    activites.ts             les 4 pôles d'activité (description + réalisations liées par titre/lieu)
    stats.ts                 chiffres clés, affichés dans le bandeau or Stats.tsx
  lib/
    site.ts                 SITE_URL + coordonnées de l'entreprise, réutilisés par metadataBase/sitemap/JSON-LD
public/
  logo/
    mecef-mark.png           pictogramme seul, fond transparent — usage inline (Navbar, Footer)
    mecef-logo.png            logo complet (pictogramme + "MECEF"), fond transparent
    partenaires/              logos officiels vérifiés uniquement (AGEROUTE, UCEP) ; les autres partenaires restent en texte
  images/
    hero-1.jpg … hero-5.jpg  vraies photos de chantier MECEF pour le carrousel du hero (portrait, cadrage desktop via `position`)
    materiel-1.jpg … materiel-5.jpg   vraies photos d'engins sur chantier MECEF, bandeau carrousel de /materiel
    activite-*.jpg           une photo réelle par page /activites/* (recadrée 16:9)
    realisations/lot-10-*.jpg   galerie du Lot 10 (AGEROUTE, Siguiri) — 12 photos 3:4, dans l'ordre des phases du chantier
    mission.jpg              photo réelle de la section "Notre mission" (recadrée 4:3)
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

### Barre de navigation transparente (`Navbar.tsx`)

La barre reste `sticky` mais n'a pas de fond en haut de page ; elle reprend son fond charbon
(`bg-charcoal/95` + bordure) dès que la page défile de plus de 8 px ou que le menu mobile est
ouvert. Pour que la photo passe réellement sous la barre, les sections à photo plein cadre en
haut de page (le hero de l'accueil, le bandeau de `/materiel`) ont un `-mt-20` qui compense la
hauteur de la barre (`h-20`). **Si la hauteur de la Navbar change, mettre à jour ces deux
`-mt-20`.** Les autres pages commencent sur le fond charbon : la barre transparente s'y fond
sans rien recouvrir.

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
| Accent principal | `text-gold` / `bg-gold` | `#F0B429` |
| Accents secondaires | `text-sky` / `text-leaf` | `#3F93D6` / `#63AB42` |
| Texte principal | `text-cream` | `#F3EFE7` |
| Texte secondaire | `text-warmgray` | `#9C9A94` |
| Texte tertiaire / labels | `text-warmgray-dark` / `text-warmgray-light` | `#6E6C67` / `#8A8985` |

**Typographie** : titres en serif (`font-serif`, Fraunces), navigation/labels/métadonnées en
mono majuscules espacées (`font-mono`, IBM Plex Mono), corps de texte en sans-serif système.

**Ton** : sobre, éditorial — pas de gradients, pas d'ombres portées, pas d'icônes ou de photos
génériques de stock. Le fond du hero (`src/components/HeroBackground.tsx`) prend un tableau
`images` (carrousel en fondu) ; s'il est vide, il affiche un motif géométrique discret
(`HeroPlaceholder`) plutôt qu'un placeholder générique.

Les trois accents (or, bleu, vert) reprennent les couleurs du logo client ; ils remplacent
depuis le 2026-10-14 l'accent unique latérite (`#D9622B`) du brief d'origine. L'or sert
d'accent principal, le bleu et le vert restent des touches secondaires.

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

`NEXT_PUBLIC_SITE_URL` alimente `metadataBase`, `sitemap.ts`, `robots.ts` et le schéma
JSON-LD (`src/lib/site.ts`). Sans valeur, il retombe sur `https://mecefetfils.com`, un domaine
qui n'appartient pas encore à MECEF. En production (Vercel), il vaut
`https://mecef-site.vercel.app` ; à remplacer partout dès que le vrai domaine est acheté.

## Déploiement

Hébergé sur **Vercel**, projet `vision-amah/mecef-site`, URL de production
https://mecef-site.vercel.app.

- Le dépôt GitHub (`amadou11doumbouya10-lgtm/mecef-site`) **n'est pas connecté** à
  l'intégration Git de Vercel : un `git push` ne déploie rien. Déploiement manuel depuis le
  poste, avec la CLI Vercel connectée au compte : `vercel --prod`. Pour automatiser, connecter
  le dépôt dans Vercel → Settings → Git.
- Variables définies sur Vercel (Production) : `NEXT_PUBLIC_SITE_URL=https://mecef-site.vercel.app`.
  `RESEND_API_KEY` n'y est pas définie : le formulaire de contact affiche donc aussi son
  message d'erreur en production.
- Sous Windows, arrêter le serveur de dev (`npm run dev`) avant un `npm run build` local : les
  deux utilisent `.next/` et le build échoue en `EPERM` sinon.

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
