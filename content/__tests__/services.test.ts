import { expect, test } from "vitest";
import { services, getService } from "../services";

test("there are exactly 5 services", () => {
  expect(services).toHaveLength(5);
});

test("every service has the required fields populated", () => {
  for (const s of services) {
    expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    expect(s.title.length).toBeGreaterThan(0);
    expect(s.seoTitle.length).toBeLessThanOrEqual(60);
    expect(s.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(s.metaDescription.length).toBeLessThanOrEqual(160);
    expect(s.steps.length).toBeGreaterThanOrEqual(3);
    expect(s.faq.length).toBeGreaterThanOrEqual(3);
  }
});

test("slugs are unique", () => {
  const slugs = services.map((s) => s.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});

test("getService returns by slug and undefined for unknown", () => {
  expect(getService("ufv-fotovoltaica")?.title).toContain("Fotovoltaic");
  expect(getService("nope")).toBeUndefined();
});
