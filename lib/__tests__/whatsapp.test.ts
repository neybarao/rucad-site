import { expect, test } from "vitest";
import { whatsappUrl } from "../whatsapp";

test("builds wa.me url with country code and stripped punctuation", () => {
  expect(whatsappUrl("(67) 99650-6767")).toBe("https://wa.me/5567996506767");
});

test("appends url-encoded message when provided", () => {
  const url = whatsappUrl("(67) 99650-6767", "Olá, quero um orçamento");
  expect(url).toBe(
    "https://wa.me/5567996506767?text=Ol%C3%A1%2C%20quero%20um%20or%C3%A7amento"
  );
});

test("does not double-add country code if already present", () => {
  expect(whatsappUrl("5567996506767")).toBe("https://wa.me/5567996506767");
});
