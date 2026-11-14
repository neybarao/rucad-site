import { site } from "@/content/site-data";
import { services, type Service, type Faq } from "@/content/services";
import { articles, type Article } from "@/content/articles";
import { homeFaq, clientNames } from "@/content/home-faq";

// Cópias em Markdown das páginas, para assistentes de IA (AEO). Seguem a
// convenção do llmstxt.org: a página /x/ tem a cópia em /x/index.html.md.
// O texto sai dos mesmos dados das páginas, então não precisa de manutenção.

export const MD_FILE = "index.html.md";

/** Caminho da cópia Markdown de uma página. Ex.: "/servicos/" -> "/servicos/index.html.md". */
export function mdPath(pagePath: string): string {
  const base = pagePath.endsWith("/") ? pagePath : `${pagePath}/`;
  return `${base}${MD_FILE}`;
}

const abs = (path: string) => (path.startsWith("http") ? path : `${site.domain}${path}`);
const withSlash = (href: string) => (href.endsWith("/") ? href : `${href}/`);

function faqBlock(faq: Faq[]): string[] {
  if (faq.length === 0) return [];
  return ["## Perguntas frequentes", "", ...faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""])];
}

function contactBlock(): string[] {
  return [
    "## Contato",
    "",
    `- WhatsApp: ${site.phoneDisplay} (https://wa.me/${site.phoneRaw})`,
    `- E-mail: ${site.email}`,
    `- Endereço: ${site.address}`,
    `- Horário: ${site.hours.display}`,
    `- Área de atendimento: ${site.serviceArea.display}`,
    "",
  ];
}

function header(title: string, pagePath: string, description: string): string[] {
  return [`# ${title}`, "", `> ${description}`, "", `Página: ${abs(pagePath)}`, ""];
}

export function serviceMarkdown(s: Service): string {
  const path = `/servicos/${s.slug}/`;
  return [
    ...header(s.title, path, s.metaDescription),
    s.hero.subtitle,
    "",
    s.intro,
    "",
    "## O que inclui",
    "",
    ...s.includes.map((i) => `- ${i}`),
    "",
    "## Aplicações",
    "",
    s.applications,
    "",
    "## Como funciona",
    "",
    ...s.steps.map((st, n) => `${n + 1}. **${st.title}**: ${st.body}`),
    "",
    "## Por que a Rucad",
    "",
    ...s.differentials.map((d) => `- **${d.title}**: ${d.body}`),
    "",
    ...faqBlock(s.faq),
    `## ${s.cta.title}`,
    "",
    s.cta.body,
    "",
    ...contactBlock(),
  ].join("\n");
}

export function articleMarkdown(a: Article): string {
  const path = `/conteudos/${a.slug}/`;
  const dates = [
    a.datePublished && `Publicado em: ${a.datePublished}`,
    a.dateModified && `Atualizado em: ${a.dateModified}`,
  ].filter(Boolean) as string[];
  return [
    ...header(a.title, path, a.metaDescription),
    ...(dates.length ? [...dates, ""] : []),
    "## Resumo",
    "",
    a.summary,
    "",
    ...a.sections.flatMap((sec) => [`## ${sec.title}`, "", ...sec.body.flatMap((p) => [p, ""])]),
    ...faqBlock(a.faq),
    ...(a.relatedServices.length
      ? ["## Serviços relacionados", "", ...a.relatedServices.map((r) => `- [${r.label}](${abs(withSlash(r.href))})`), ""]
      : []),
    `## ${a.cta.title}`,
    "",
    a.cta.body,
    "",
    ...contactBlock(),
  ].join("\n");
}

export function servicesIndexMarkdown(): string {
  return [
    ...header("Serviços de engenharia elétrica", "/servicos/", `Serviços da ${site.name}, com ART e responsável técnico definido.`),
    ...services.map((s) => `- [${s.title}](${abs(`/servicos/${s.slug}/`)}): ${s.cardSummary}`),
    "",
    ...contactBlock(),
  ].join("\n");
}

export function articlesIndexMarkdown(): string {
  return [
    ...header("Conteúdos técnicos", "/conteudos/", `Guias técnicos da ${site.name} sobre projeto, laudos, subestações e redes elétricas.`),
    ...articles.map((a) => `- [${a.title}](${abs(`/conteudos/${a.slug}/`)}): ${a.metaDescription}`),
    "",
  ].join("\n");
}

export function homeMarkdown(): string {
  return [
    ...header(site.name, "/", `Empresa de engenharia elétrica em ${site.addressLocality} (${site.addressRegion}). ${site.slogan}`),
    "## Serviços",
    "",
    ...services.map((s) => `- [${s.title}](${abs(`/servicos/${s.slug}/`)}): ${s.cardSummary}`),
    "",
    "## Números",
    "",
    ...site.stats.map((st) => `- ${st.value} ${st.label}`),
    "",
    "## Clientes",
    "",
    clientNames.join(", ") + ".",
    "",
    ...faqBlock(homeFaq),
    ...contactBlock(),
  ].join("\n");
}

export function contactMarkdown(): string {
  return [
    ...header(`Contato · ${site.name}`, "/contato/", "Fale com a engenharia da Rucad. Levantamento no local e proposta com prazo e responsável técnico definidos."),
    ...contactBlock(),
    `CNPJ: ${site.cnpj}`,
    "",
  ].join("\n");
}

export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
