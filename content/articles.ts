import type { Faq } from "./services";

export type ArticleSection = {
  title: string;
  body: string[];
};

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  hero: {
    kicker: string;
    subtitle: string;
  };
  summary: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  relatedServices: { label: string; href: string }[];
  sections: ArticleSection[];
  faq: Faq[];
  cta: {
    title: string;
    body: string;
    message: string;
  };
};

export const articles: Article[] = [
  {
    slug: "checklist-instalacao-subestacao",
    title: "Checklist para instalação de subestação",
    seoTitle: "Checklist para Instalação de Subestação",
    metaDescription:
      "Veja documentos, ensaios e laudos que ajudam a receber uma subestação com segurança, ART e conformidade. Checklist técnico da Rucad.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle:
        "O que conferir antes de receber, energizar ou regularizar uma subestação, com menos improviso e mais segurança técnica.",
    },
    summary:
      "Na instalação de uma subestação, o cliente deve conferir se a entrega inclui documentação técnica, ART, comissionamento, ensaios aplicáveis e registros de segurança. Esses itens ajudam a reduzir risco de retrabalho, falha de proteção, parada não programada e dificuldade em auditorias, fiscalizações ou futuras manutenções.",
    primaryKeyword: "instalação de subestação",
    secondaryKeywords: [
      "comissionamento de subestação",
      "ART de subestação",
      "laudo de subestação",
      "manutenção de subestação",
      "subestação de média tensão",
    ],
    relatedServices: [
      { label: "Construção e Manutenção de Redes Elétricas", href: "/servicos/construcao-manutencao-redes" },
      { label: "Ensaios, Comissionamento e Laudos Técnicos", href: "/servicos/ensaios-comissionamento-laudos" },
      { label: "Projeto Elétrico e SPDA", href: "/servicos/projetos-eletricos-spda" },
    ],
    sections: [
      {
        title: "1. Prontuário e documentação técnica",
        body: [
          "A documentação técnica organiza o histórico da instalação: projetos, diagramas, relatórios, laudos, registros de segurança e informações necessárias para operação e manutenção.",
          "Antes de receber a subestação, confirme se a empresa entregou os documentos combinados em proposta e se eles estão coerentes com o que foi executado em campo. Quando aplicável, o prontuário das instalações elétricas deve ser mantido atualizado pelo responsável pela instalação.",
        ],
      },
      {
        title: "2. Estudo de coordenação e seletividade",
        body: [
          "A proteção elétrica precisa atuar no ponto correto e no tempo correto. O estudo de coordenação e seletividade ajuda a definir os ajustes de proteção para reduzir o risco de desligamentos indevidos ou falhas em cascata.",
          "Na prática, não basta instalar relés e disjuntores. É importante conferir se houve estudo, parametrização e registro técnico dos ajustes aplicados aos equipamentos.",
        ],
      },
      {
        title: "3. Relatório de comissionamento",
        body: [
          "O comissionamento verifica se a subestação foi montada, ligada e testada conforme o projeto e as condições de operação previstas.",
          "O relatório deve registrar inspeções, testes, medições e eventuais pendências. Ele funciona como uma evidência técnica de que a instalação foi conferida antes da entrada em operação.",
        ],
      },
      {
        title: "4. Aterramento e SPDA quando aplicável",
        body: [
          "Aterramento e proteção contra descargas atmosféricas não devem ser tratados como detalhe de obra. Eles influenciam segurança de pessoas, equipamentos e continuidade operacional.",
          "Quando o escopo envolver SPDA ou sistema de aterramento, solicite medições, laudos e registros compatíveis com o projeto e com as normas aplicáveis. A avaliação deve ser feita por profissional habilitado.",
        ],
      },
      {
        title: "5. Termografia na entrega ou na primeira operação",
        body: [
          "A termografia ajuda a identificar aquecimento anormal em conexões, barramentos, cabos e equipamentos. Em muitos casos, os problemas aparecem apenas com a instalação energizada e em carga.",
          "Quando fizer sentido para o tipo de instalação, combine uma inspeção termográfica na entrega ou após o início da operação. O objetivo é detectar pontos críticos antes que eles virem falha ou parada.",
        ],
      },
      {
        title: "6. Ensaios de cabos, óleo e isolação quando aplicável",
        body: [
          "Cabos, transformadores e equipamentos de manobra podem exigir ensaios específicos, conforme o projeto, o tipo de equipamento e o histórico da instalação.",
          "Em subestações com transformador a óleo, por exemplo, pode ser necessário verificar condições do óleo e da isolação. O importante é que o escopo de ensaios esteja claro antes da entrega.",
        ],
      },
      {
        title: "7. Treinamento operacional e orientação de manobra",
        body: [
          "Depois da entrega, alguém precisa operar a instalação com segurança. A equipe responsável deve saber quais manobras pode executar, quais situações exigem suporte técnico e quais procedimentos seguir em caso de atuação da proteção.",
          "Peça registro do treinamento ou da orientação operacional quando isso estiver dentro do escopo contratado. Esse cuidado reduz improviso na primeira ocorrência real.",
        ],
      },
      {
        title: "8. ART de projeto e execução",
        body: [
          "A ART registra a responsabilidade técnica pelo serviço contratado. Em uma subestação, é comum que projeto, execução, laudos e comissionamento tenham escopos técnicos diferentes.",
          "Antes de encerrar a obra, confira se a ART corresponde ao serviço realizado, se os dados do contratante estão corretos e se o responsável técnico está identificado.",
        ],
      },
    ],
    faq: [
      {
        q: "Toda instalação de subestação precisa de comissionamento?",
        a: "O comissionamento é uma prática técnica importante para verificar montagem, testes e condições de operação antes da entrega. O escopo exato depende do porte da subestação, do projeto e das exigências aplicáveis.",
      },
      {
        q: "A ART substitui laudos e relatórios técnicos?",
        a: "Não. A ART registra responsabilidade técnica, mas não substitui relatórios, medições, ensaios ou laudos que comprovam o que foi verificado na instalação.",
      },
      {
        q: "A Rucad faz instalação e comissionamento de subestação?",
        a: "Sim. A Rucad atua em construção, expansão, manutenção, ensaios, comissionamento e laudos de subestações, com responsável técnico e ART conforme o escopo contratado.",
      },
      {
        q: "Dá para regularizar uma subestação já instalada?",
        a: "Em muitos casos, sim. O primeiro passo é uma avaliação técnica para entender o estado da instalação, a documentação existente e as adequações necessárias.",
      },
    ],
    cta: {
      title: "Vai instalar ou regularizar uma subestação?",
      body: "Fale com um engenheiro da Rucad. Avaliação técnica, proposta com escopo claro, ART e documentação alinhada ao serviço.",
      message: "Olá, quero avaliar a instalação, regularização ou comissionamento de uma subestação.",
    },
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
