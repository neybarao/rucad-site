import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { articles } from "@/content/articles";
import { site } from "@/content/site-data";
import { getServiceImagePath } from "@/lib/service-media";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticRoutes = ["", "/servicos", "/conteudos", "/sobre", "/contato"];
  const serviceRoutes = services.map((s) => `/servicos/${s.slug}`);
  const articleRoutes = articles.map((article) => `/conteudos/${article.slug}`);
  const imageFor = (path: string) => {
    const slug = path.startsWith("/servicos/") ? path.slice("/servicos/".length) : null;
    const img = slug ? getServiceImagePath(slug) : undefined;
    return img ? { images: [`${base}${img}`] } : {};
  };
  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((path) => ({
    url: `${base}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    ...imageFor(path),
  }));
}
