import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { activites } from "@/data/activites";

const routes = [
  "",
  "/qui-sommes-nous",
  "/realisations",
  "/materiel",
  "/partenariats",
  "/contact",
  ...activites.map((pole) => `/activites/${pole.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
