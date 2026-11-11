import { expect, test } from "vitest";
import { pageMetadata, DEFAULT_OG_IMAGE } from "../seo";
import { services } from "@/content/services";

test("pageMetadata sets canonical, og:url and a default share image", () => {
  const m = pageMetadata({ title: "Contato", description: "x".repeat(80), path: "/contato/" });
  expect(m.alternates?.canonical).toBe("/contato/");
  expect(m.openGraph?.url).toBe("/contato/");
  expect(m.openGraph?.images).toEqual([DEFAULT_OG_IMAGE]);
  expect(m.openGraph?.title).toBe("Contato · Rucad Engenharia");
});

test("absoluteTitle skips the template", () => {
  const m = pageMetadata({ title: "Home", description: "d", path: "/", absoluteTitle: true });
  expect(m.title).toEqual({ absolute: "Home" });
  expect(m.openGraph?.title).toBe("Home");
});

test("every service has a descriptive image alt", () => {
  for (const s of services) expect(s.imageAlt.length).toBeGreaterThan(20);
});
