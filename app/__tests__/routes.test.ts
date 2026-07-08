import { expect, test } from "vitest";
import { services } from "@/content/services";

test("all static routes are accounted for", () => {
  const routes = [
    "/", "/servicos", "/sobre", "/contato",
    ...services.map((s) => `/servicos/${s.slug}`),
  ];
  expect(routes).toContain("/servicos/ufv-fotovoltaica");
  expect(new Set(routes).size).toBe(routes.length);
  expect(routes.length).toBe(4 + services.length);
});
