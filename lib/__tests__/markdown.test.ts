import { expect, test } from "vitest";
import { services } from "@/content/services";
import { articles } from "@/content/articles";
import { mdPath, serviceMarkdown, articleMarkdown, homeMarkdown } from "@/lib/markdown";

test("mdPath segue a convenção do llmstxt.org", () => {
  expect(mdPath("/")).toBe("/index.html.md");
  expect(mdPath("/servicos/x/")).toBe("/servicos/x/index.html.md");
  expect(mdPath("/servicos/x")).toBe("/servicos/x/index.html.md");
});

test.each(services)("serviço $slug vira Markdown com título, FAQ e link canônico", (s) => {
  const md = serviceMarkdown(s);
  expect(md.startsWith(`# ${s.title}\n`)).toBe(true);
  expect(md).toContain(`https://rucadengenharia.com.br/servicos/${s.slug}/`);
  for (const f of s.faq) expect(md).toContain(`### ${f.q}`);
  expect(md).not.toContain("undefined");
});

test.each(articles)("artigo $slug vira Markdown com todas as seções", (a) => {
  const md = articleMarkdown(a);
  expect(md.startsWith(`# ${a.title}\n`)).toBe(true);
  for (const sec of a.sections) expect(md).toContain(`## ${sec.title}`);
  expect(md).not.toContain("undefined");
});

test("home em Markdown lista todos os serviços", () => {
  const md = homeMarkdown();
  for (const s of services) expect(md).toContain(s.title);
});
