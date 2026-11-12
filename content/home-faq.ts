import type { Faq } from "./services";
import { site } from "./site-data";

// Perguntas da home: respostas diretas sobre quem é a Rucad, onde atende e
// como contratar. Formato pensado para buscas e respostas de IA.
export const clientNames = [
  "Suzano",
  "Bracell",
  "Energisa",
  "GPA",
  "Drogasil",
  "Pague Menos",
  "Grupo Madero",
  "Vetorial",
  "Brasil ao Cubo",
  "CEL Engenharia",
  "Origo Energia",
  "ivi energia",
  "Tatu Bola",
  "CRECI-MS",
];

export const homeFaq: Faq[] = [
  {
    q: "O que a Rucad Engenharia faz?",
    a: "A Rucad é uma empresa de engenharia elétrica. Faz projeto elétrico e SPDA, ensaios, comissionamento e laudos técnicos, construção e manutenção de redes de baixa e média tensão e subestações, eficiência energética e usinas fotovoltaicas. Acompanha a demanda do levantamento à entrega, com ART e responsável técnico definido.",
  },
  {
    q: "Onde a Rucad atende?",
    a: `A sede fica em ${site.addressLocality} (${site.addressRegion}). O atendimento é principalmente em Mato Grosso do Sul e nos estados vizinhos: Mato Grosso, Goiás, Minas Gerais, São Paulo e Paraná, em obras urbanas, industriais e rurais.`,
  },
  {
    q: "A Rucad emite ART?",
    a: "Sim. Os serviços técnicos saem com ART (Anotação de Responsabilidade Técnica) emitida pelo engenheiro responsável pela obra ou pelo laudo.",
  },
  {
    q: "Quais empresas já contrataram a Rucad?",
    a: `Entre os clientes da Rucad estão ${clientNames.slice(0, -1).join(", ")} e ${clientNames[clientNames.length - 1]}, além de indústrias, construtoras e propriedades rurais da região.`,
  },
  {
    q: "Como pedir um orçamento?",
    a: `Pelo WhatsApp ${site.phoneDisplay}, de segunda a sexta, das 7h30 às 17h30. A Rucad faz o levantamento técnico no local antes de enviar a proposta, com prazo e responsável técnico definidos.`,
  },
];
