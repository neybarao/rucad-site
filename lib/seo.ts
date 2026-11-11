import type { Metadata } from "next";
import { site } from "@/content/site-data";

// IDs estáveis para ligar os blocos JSON-LD entre si (Organization, WebSite,
// Service, Article). Buscadores e LLMs usam isso para entender que tudo
// pertence à mesma entidade.
export const ORG_ID = `${site.domain}/#organization`;
export const WEBSITE_ID = `${site.domain}/#website`;

export const DEFAULT_OG_IMAGE = {
  url: "/og/rucad-og.jpg",
  width: 1200,
  height: 630,
  alt: "Rucad Engenharia: sua demanda, nossa solução.",
};

export const LOGO_URL = `${site.domain}/logo-rucad-512.png`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${site.domain}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  /** Título curto; o template do layout acrescenta " · Rucad Engenharia". */
  title: string;
  description: string;
  /** Caminho com barra final, ex.: "/servicos/". Vira canonical e og:url. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  /** Usa o título exatamente como está, sem template (home). */
  absoluteTitle?: boolean;
};

// No Next, o openGraph de uma página substitui o do layout por inteiro.
// Por isso toda página monta o bloco completo por aqui, com imagem e canonical.
export function pageMetadata({ title, description, path, image, type = "website", absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "pt_BR",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [img.url],
    },
  };
}
