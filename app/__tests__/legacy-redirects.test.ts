import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import { services } from "@/content/services";

// URLs do site antigo que ainda aparecem no Google. O GitHub Pages não faz 301,
// então cada uma é uma página estática em public/ com meta refresh 0 + canonical.
const legacy: Record<string, string> = {
  "services/index.html": "/servicos/",
  "services/cabines-primarias-e-postos-de-transformacao/index.html": "/servicos/construcao-manutencao-redes/",
};

const validTargets = new Set(["/servicos/", ...services.map((s) => `/servicos/${s.slug}/`)]);

test.each(Object.entries(legacy))("%s redireciona para %s", (file, target) => {
  expect(validTargets.has(target)).toBe(true);
  const html = readFileSync(join(process.cwd(), "public", file), "utf8");
  const url = `https://rucadengenharia.com.br${target}`;
  expect(html).toContain(`<meta http-equiv="refresh" content="0; url=${url}">`);
  expect(html).toContain(`<link rel="canonical" href="${url}">`);
  expect(html).not.toMatch(/noindex/i);
});
