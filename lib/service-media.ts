import { existsSync } from "node:fs";
import path from "node:path";

// Imagens de serviço ficam em public/servicos/<slug>.(webp|jpg|png).
// A checagem roda no build (export estático), então basta soltar o arquivo
// na pasta e rodar o build de novo: o card, o hero e o OG passam a usar a imagem.
const EXTENSIONS = ["webp", "jpg", "jpeg", "png"] as const;

export function getServiceImagePath(slug: string): string | undefined {
  for (const ext of EXTENSIONS) {
    const rel = `/servicos/${slug}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return undefined;
}

/** URL relativa com basePath (para <img>). */
export function getServiceImageSrc(slug: string): string | undefined {
  const rel = getServiceImagePath(slug);
  return rel ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${rel}` : undefined;
}
