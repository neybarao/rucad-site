import type { NextConfig } from "next";

// O site é servido na raiz do domínio (rucadengenharia.com.br, via GitHub Pages
// com domínio próprio), então não há prefixo de caminho.
// Só use BASE_PATH para publicar numa subpasta, por exemplo
// BASE_PATH=/rucad-site para testar em neybarao.github.io/rucad-site.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
