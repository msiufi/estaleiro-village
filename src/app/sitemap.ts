import type { MetadataRoute } from "next";

import { rooms } from "@/data/accommodations";
import { siteConfig } from "@/lib/metadata";

const STATIC_PATHS = [
  "",
  "/a-pousada",
  "/a-historia",
  "/acomodacoes",
  "/atividades",
  "/galeria",
  "/eventos",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const roomRoutes: MetadataRoute.Sitemap = rooms.map((room) => ({
    url: `${siteConfig.url}/acomodacoes/${room.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...roomRoutes];
}
