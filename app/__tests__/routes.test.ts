import { expect, test } from "vitest";
import { services } from "@/content/services";
import { articles } from "@/content/articles";

test("all static routes are accounted for", () => {
  const routes = [
    "/", "/servicos", "/conteudos", "/sobre", "/contato",
    ...services.map((s) => `/servicos/${s.slug}`),
    ...articles.map((article) => `/conteudos/${article.slug}`),
  ];
  expect(routes).toContain("/servicos/ufv-fotovoltaica");
  expect(routes).toContain("/conteudos/checklist-instalacao-subestacao");
  expect(new Set(routes).size).toBe(routes.length);
  expect(routes.length).toBe(5 + services.length + articles.length);
});
