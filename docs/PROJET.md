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

## Structure

```
src/
  app/                     un dossier par route, chacun avec page.tsx
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
    Hero.tsx
    Sectors.tsx
    Stats.tsx               bandeau de chiffres clés, compteur animé au scroll
    Realisations.tsx        variant="featured" (accueil) | variant="full" (filtres par catégorie)
    Partenariats.tsx
    Contact.tsx
    Footer.tsx
    Reveal.tsx              wrapper animation fade-in au scroll (respecte prefers-reduced-motion)
    RegionMap.tsx           diagramme géométrique Siguiri/Conakry, pas une carte géographique réelle
  data/
    realisations.ts         source unique de vérité des chantiers (année, montant, bénéficiaire)
  lib/
    site.ts                 SITE_URL + coordonnées de l'entreprise, réutilisés par metadataBase/sitemap/JSON-LD
public/
  logo/
    mecef-mark.png           pictogramme seul, fond transparent — usage inline (Navbar, Footer)
    mecef-logo.png            logo complet (pictogramme + "MECEF"), fond transparent
  images/                    photos de chantier (à venir du client)
docs/
  PROJET.md                  ce fichier
  CONTENU_SITE.md            contenu texte source de toutes les pages
```

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
