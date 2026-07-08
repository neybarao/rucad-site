import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticRoutes = ["", "/servicos", "/sobre", "/contato"];
  const serviceRoutes = services.map((s) => `/servicos/${s.slug}`);
  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${base}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
