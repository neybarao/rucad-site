import { site } from "@/content/site-data";
import { services } from "@/content/services";
import { articles } from "@/content/articles";
import { clientNames } from "@/content/home-faq";

export const dynamic = "force-static";

// /llms.txt: resumo do site em Markdown para assistentes de IA, no formato
// proposto em llmstxt.org. É gerado a partir dos mesmos dados das páginas,
// então não precisa de manutenção manual.
export function GET() {
  const url = (path: string) => `${site.domain}${path}`;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> Empresa de engenharia elétrica com sede em ${site.addressLocality} (${site.addressRegion}) e atendimento em Mato Grosso do Sul e estados vizinhos (MT, GO, MG, SP e PR). Faz projeto elétrico e SPDA, ensaios, comissionamento e laudos técnicos, construção e manutenção de redes de baixa e média tensão e subestações, eficiência energética e usinas fotovoltaicas, com ART e responsável técnico definido.`,
    "",
    "Atende indústrias, frigoríficos, construtoras e loteamentos, empreiteiras, propriedades rurais e empresas que querem reduzir custo de energia. O contato comercial é feito pelo WhatsApp, com levantamento técnico no local antes da proposta.",
    "",
    "## Serviços",
    "",
    ...services.map((s) => `- [${s.title}](${url(`/servicos/${s.slug}/`)}): ${s.cardSummary} Inclui: ${s.includes.join("; ")}. Aplicações: ${s.applications}`),
    "",
  ];

  if (articles.length > 0) {
    lines.push(
      "## Conteúdos técnicos",
      "",
      ...articles.map((a) => `- [${a.title}](${url(`/conteudos/${a.slug}/`)}): ${a.metaDescription}`),
      "",
    );
  }

  lines.push(
    "## Empresa e contato",
    "",
    `- [Sobre a Rucad](${url("/sobre/")}): história, estrutura e forma de trabalho.`,
    `- [Contato](${url("/contato/")}): WhatsApp ${site.phoneDisplay}, e-mail ${site.email}.`,
    `- Endereço: ${site.address}.`,
    `- Área de atendimento: ${site.serviceArea.display}.`,
    `- Horário: ${site.hours.display}.`,
    `- Clientes: ${clientNames.join(", ")}.`,
    `- CNPJ: ${site.cnpj}.`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
