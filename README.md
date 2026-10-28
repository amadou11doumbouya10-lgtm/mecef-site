# MECEF ET FILS — Site vitrine

Site officiel de **MECEF ET FILS**, entreprise guinéenne de BTP, d'aménagement et de fourniture d'équipements, basée à Siguiri.

🔗 **En ligne :** [mecefetfils.com](https://mecefetfils.com)

---

## Aperçu

Site vitrine statique, rapide et pensé pour le mobile, qui présente l'entreprise, ses pôles d'activité, ses réalisations et son matériel.

**Pages**

| Page | Contenu |
|---|---|
| Accueil | Carrousel plein écran, chiffres clés, pôles d'activité, réalisations, partenaires |
| Qui sommes-nous | Présentation, mission, direction |
| Activités | 4 pages : construction et travaux publics, aménagement, équipements et fourniture, prestations diverses |
| Réalisations | Chantiers de référence, filtrables par catégorie |
| Matériel | Parc d'engins et d'équipements |
| Partenariats | Partenaires et collaborations |
| Contact | Formulaire, coordonnées et carte interactive (Siguiri, Conakry) |

**Fonctionnalités**

- 🗺️ Carte interactive **Leaflet** (OpenStreetMap, sans clé API) avec thème sombre
- ✉️ Formulaire de contact en **Server Action** Next.js, validé avec **Zod**, envoi via **Resend**
- 🔎 SEO : sitemap, robots.txt, image de partage Open Graph et données structurées JSON-LD (`GeneralContractor`)
- ♿ Animations au défilement qui respectent le réglage « réduire les animations »
- 🎨 Identité visuelle reprise du logo client (anthracite, or, bleu, vert)

---

## Stack

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Lancer le projet en local

```bash
git clone https://github.com/amadou11doumbouya10-lgtm/mecef-site.git
cd mecef-site
npm install
npm run dev
```

Le site est alors disponible sur `http://localhost:3000`.

**Variables d'environnement** (fichier `.env.local`, jamais commité) :

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Envoi des messages du formulaire de contact. Sans clé, le formulaire affiche un message d'erreur clair au lieu de planter. |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site, utilisée pour le SEO (sitemap, Open Graph). |

---

## Structure

```
src/
  app/          → une route par page (+ /activites/*), sitemap, robots
  components/   → une section par composant (Hero, Réalisations, Carte…)
  data/         → contenus typés : activités, réalisations, chiffres clés
  lib/site.ts   → URL du site et coordonnées de l'entreprise
public/
  images/       → photos du carrousel et du matériel
  logo/         → logo MECEF et logos partenaires
```

Les textes et chiffres du site sont centralisés dans `src/data/`, pour pouvoir les mettre à jour sans toucher aux composants.

---

## Crédits

Conçu et développé par **[Vision Amah](https://vision-amah.vercel.app)**, Conakry.
Certaines photos d'illustration proviennent de banques d'images libres de droits (Pexels, Unsplash).

© MECEF ET FILS. Tous droits réservés.
