import type { Article } from "./articles";

// Artigos da estratégia editorial (content/10-plano-seo-aeo.md, prioridades 1 a 3).
// Fatos normativos conferidos em fontes primárias em 11/11/2026:
// - NR-10 vigente (Portaria 598/2004 e alterações) e nova redação (Portaria MTE 737/2026, vigência 01/06/2027)
// - ABNT NBR 5419:2026 (publicada em 10/03/2026, substitui a edição de 2015)
// - REN ANEEL 1.000/2021 (grupos A e B, limite de 75 kW em rede aérea, obra executada pelo interessado)
// - Lei 6.766/1979, art. 2º, §5º (infraestrutura básica de loteamentos)
// - Lei 6.496/1977 e Resolução Confea 1.137/2023 (ART)
// - Lei 15.269/2025 e Decreto 13.097/2026 (abertura do mercado livre para baixa tensão)
// Revisar estes pontos se a publicação atrasar ou se alguma norma mudar.

const SERVICES = {
  projetos: { label: "Projeto Elétrico e SPDA", href: "/servicos/projetos-eletricos-spda" },
  laudos: { label: "Ensaios, Comissionamento e Laudos Técnicos", href: "/servicos/ensaios-comissionamento-laudos" },
  redes: { label: "Construção e Manutenção de Redes Elétricas", href: "/servicos/construcao-manutencao-redes" },
  eficiencia: { label: "Eficiência Energética", href: "/servicos/eficiencia-energetica" },
  ufv: { label: "Usinas e Sistemas Fotovoltaicos (UFV)", href: "/servicos/ufv-fotovoltaica" },
};

const PUBLISHED = "2026-11-12";

export const extraArticles: Article[] = [
  // ------------------------------------------------------------------ prioridade 1
  {
    slug: "projeto-eletrico-rural",
    title: "Projeto elétrico rural: como levar energia para a propriedade",
    seoTitle: "Projeto Elétrico Rural: Etapas e Aprovação",
    metaDescription:
      "Entenda as etapas do projeto elétrico rural, do levantamento de cargas à ligação pela distribuidora. Guia técnico da Rucad para propriedades em MS.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "Do levantamento de cargas à ligação: o caminho para ter energia na fazenda sem travar na distribuidora.",
    },
    summary:
      "Um projeto elétrico rural começa pelo levantamento das cargas da propriedade, como pivô, secador, ordenha e casa sede. Com isso, o engenheiro define se o atendimento será em baixa tensão ou em média tensão com transformador próprio, elabora o projeto no padrão da distribuidora, emite a ART e acompanha aprovação, execução, vistoria e ligação.",
    primaryKeyword: "projeto elétrico rural",
    datePublished: PUBLISHED,
    secondaryKeywords: ["rede elétrica rural", "transformador para fazenda", "energia na propriedade rural", "ligação de energia rural", "Energisa MS projeto"],
    relatedServices: [SERVICES.projetos, SERVICES.redes, SERVICES.ufv],
    sections: [
      {
        title: "Por onde começar: o levantamento de cargas",
        body: [
          "Tudo parte de uma lista honesta do que vai funcionar na propriedade, hoje e nos próximos anos: motores de pivô e bombas, secadores, resfriadores de leite, galpões, alojamentos e a casa sede. Potência, tipo de partida dos motores e horário de uso mudam o dimensionamento.",
          "Pular essa etapa é a causa mais comum de retrabalho. Um transformador que atende a carga de hoje pode não suportar o pivô que entra na safra seguinte. Planejar a expansão no projeto costuma sair mais barato do que refazer a rede depois.",
        ],
      },
      {
        title: "Baixa tensão ou média tensão com transformador próprio",
        body: [
          "Pela Resolução Normativa ANEEL nº 1.000/2021, unidades atendidas por rede aérea com carga instalada de até 75 kW, em geral, ficam no Grupo B (baixa tensão). Acima disso, o atendimento costuma ser em média tensão, no Grupo A, com transformador e proteção da própria unidade consumidora.",
          "A escolha não é só técnica. Ela muda o tipo de tarifa, o custo da obra e as responsabilidades de manutenção. Por isso vale comparar os cenários antes de fechar o projeto.",
        ],
      },
      {
        title: "O projeto no padrão da distribuidora",
        body: [
          "Cada distribuidora tem normas técnicas próprias para rede, entrada de energia, medição e aterramento. Em Mato Grosso do Sul, a maior parte das propriedades é atendida pela Energisa, e o projeto precisa seguir o padrão dela para ser aprovado.",
          "Um projeto completo traz memorial descritivo, cálculo de demanda, dimensionamento de condutores e transformador, proteção, aterramento, planta com o traçado da rede e a ART do engenheiro responsável.",
        ],
      },
      {
        title: "Quem executa a obra",
        body: [
          "Parte da obra fica dentro da propriedade e é responsabilidade do consumidor. Para a obra de conexão na rede, a REN 1.000/2021 prevê que o interessado pode contratar a execução com empresa legalmente habilitada, seguindo o projeto aprovado e as exigências da distribuidora.",
          "Essa opção pode encurtar prazos em regiões com fila de obras, desde que a empresa conheça o padrão da distribuidora e entregue a documentação que a vistoria pede.",
        ],
      },
      {
        title: "Vistoria e ligação",
        body: [
          "Concluída a obra, a distribuidora faz a vistoria e, estando tudo conforme o projeto, realiza a ligação. Pendências como aterramento fora do especificado ou medição fora do padrão são os motivos mais comuns de reprovação.",
          "Acompanhar a vistoria com o responsável técnico ajuda a resolver dúvidas na hora e evita uma nova rodada de agendamento.",
        ],
      },
      {
        title: "Pensando além da ligação",
        body: [
          "Propriedades com consumo alto podem combinar o projeto da rede com geração própria, como uma usina fotovoltaica, e com um estudo de eficiência para reduzir perdas em motores e bombas.",
          "Considerar essas possibilidades no projeto inicial evita trocar equipamentos ou refazer trechos de rede quando a propriedade crescer.",
        ],
      },
    ],
    faq: [
      {
        q: "Preciso de engenheiro para fazer o projeto elétrico rural?",
        a: "Sim. O projeto é uma atividade de engenharia e deve ter a ART de um profissional habilitado. A distribuidora analisa o projeto antes de aprovar a ligação.",
      },
      {
        q: "Quando a propriedade precisa de transformador próprio?",
        a: "Em geral, quando a carga instalada passa de 75 kW em rede aérea, o atendimento é em média tensão com transformador da unidade consumidora. O levantamento de cargas confirma o enquadramento de cada caso.",
      },
      {
        q: "Posso contratar uma empresa para executar a obra de conexão?",
        a: "A REN 1.000/2021 prevê essa possibilidade, com empresa legalmente habilitada e seguindo o projeto aprovado e as exigências da distribuidora.",
      },
      {
        q: "A Rucad faz projeto e obra de rede rural?",
        a: "Sim. A Rucad faz levantamento no local, projeto com ART, construção da rede, instalação de transformador e acompanhamento até a vistoria e a ligação.",
      },
    ],
    cta: {
      title: "Vai levar energia para a propriedade?",
      body: "Fale com um engenheiro da Rucad. Levantamento no local, projeto no padrão da distribuidora e ART emitida no prazo.",
      message: "Olá, quero um projeto elétrico rural para minha propriedade.",
    },
  },
  {
    slug: "laudo-nr-10",
    title: "Laudo NR-10: o que é, quando precisa e o que muda em 2027",
    seoTitle: "Laudo NR-10: O Que É e Quando Precisa",
    metaDescription:
      "Entenda o que o mercado chama de laudo NR-10, o que o Prontuário de Instalações Elétricas deve conter e o que muda com a nova NR-10 em junho de 2027.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "Prontuário, inspeções e adequações: o que a fiscalização pode pedir e como se preparar para a nova redação da norma.",
    },
    summary:
      "“Laudo NR-10” é o nome que o mercado dá ao relatório técnico das inspeções das instalações elétricas, que integra o Prontuário de Instalações Elétricas exigido pela NR-10. Hoje o prontuário é obrigatório para estabelecimentos com carga instalada acima de 75 kW. A nova redação da norma, que vale a partir de 1º de junho de 2027, muda esse critério.",
    primaryKeyword: "laudo NR-10",
    datePublished: PUBLISHED,
    secondaryKeywords: ["prontuário de instalações elétricas", "nova NR-10 2027", "Portaria MTE 737/2026", "relatório de inspeção NR-10", "adequação NR-10"],
    relatedServices: [SERVICES.laudos, SERVICES.projetos],
    sections: [
      {
        title: "O que a norma chama de laudo",
        body: [
          "A NR-10 não usa a expressão “laudo NR-10”. O que ela exige, entre outros documentos, é o relatório técnico das inspeções atualizadas, com recomendações e cronograma de adequações. É esse documento que costuma ser chamado de laudo.",
          "Ele faz parte do Prontuário de Instalações Elétricas, um conjunto de documentos que reúne projetos, esquemas unifilares, procedimentos, especificações de proteção e registros de inspeção da instalação.",
        ],
      },
      {
        title: "Quem precisa hoje",
        body: [
          "Pela redação vigente (item 10.2.4), estabelecimentos com carga instalada superior a 75 kW devem constituir e manter o Prontuário de Instalações Elétricas. A norma também determina que os documentos técnicos do prontuário sejam elaborados por profissional legalmente habilitado.",
          "O prontuário deve ficar organizado, atualizado e à disposição dos trabalhadores envolvidos nas instalações e serviços em eletricidade.",
        ],
      },
      {
        title: "O que costuma constar no relatório",
        body: [
          "Inspeção dos quadros, painéis e subestação, condição dos dispositivos de proteção, aterramento e equipotencialização, sinalização, identificação de circuitos, conformidade dos esquemas unifilares com o que existe em campo e registros de SPDA quando aplicável.",
          "Mais importante do que a lista é o plano de ação: cada não conformidade com prioridade, recomendação técnica e prazo. É isso que mostra à fiscalização que a empresa conhece seus riscos e está tratando deles.",
        ],
      },
      {
        title: "O que muda com a nova NR-10",
        body: [
          "A Portaria MTE nº 737/2026 aprovou uma nova redação da NR-10, com vigência a partir de 1º de junho de 2027. O risco elétrico passa a ser tratado dentro do Gerenciamento de Riscos Ocupacionais (GRO) da NR-1, e o arco elétrico ganha requisitos próprios, incluindo estudo de energia incidente em determinados casos.",
          "O gatilho do prontuário também muda: deixa de ser a carga de 75 kW e passa a considerar o tipo de instalação, como Sistema Elétrico de Potência e instalações de média e alta tensão. A recomendação é revisar o prontuário com antecedência para chegar a 2027 já adequado.",
        ],
      },
      {
        title: "Como se preparar para uma fiscalização",
        body: [
          "Comece pelo básico: esquemas unifilares atualizados, identificação de quadros e circuitos, e registro das últimas inspeções. Em seguida, priorize as adequações de maior risco, como partes vivas expostas e proteções incompatíveis.",
          "Manter o prontuário vivo, atualizado a cada modificação na instalação, custa menos do que reconstruir tudo às pressas quando a fiscalização chega.",
        ],
      },
    ],
    faq: [
      {
        q: "Laudo NR-10 é obrigatório?",
        a: "A NR-10 exige o Prontuário de Instalações Elétricas, que inclui o relatório técnico das inspeções, para estabelecimentos com carga instalada acima de 75 kW, pela redação vigente até 31 de maio de 2027.",
      },
      {
        q: "Quem pode elaborar o laudo NR-10?",
        a: "A norma determina que os documentos técnicos do prontuário sejam elaborados por profissional legalmente habilitado, com a respectiva ART.",
      },
      {
        q: "A nova NR-10 já está valendo?",
        a: "A nova redação foi aprovada pela Portaria MTE nº 737/2026 e entra em vigor em 1º de junho de 2027. Até lá, vale a redação atual.",
      },
      {
        q: "A Rucad faz laudo NR-10 e adequações?",
        a: "Sim. A Rucad faz inspeção no local, relatório técnico com plano de adequação e ART, e pode executar as adequações elétricas indicadas.",
      },
    ],
    cta: {
      title: "Precisa organizar o prontuário ou o laudo NR-10?",
      body: "Fale com um engenheiro da Rucad. Inspeção no local, relatório com plano de ação e ART, já pensando na nova NR-10.",
      message: "Olá, preciso de laudo NR-10 / prontuário de instalações elétricas.",
    },
  },

  // ------------------------------------------------------------------ prioridade 2
  {
    slug: "rede-eletrica-loteamento",
    title: "Rede elétrica para loteamento: etapas, documentos e responsabilidades",
    seoTitle: "Rede Elétrica para Loteamento: Etapas",
    metaDescription:
      "Veja as etapas da rede elétrica de loteamento, da viabilidade com a distribuidora à energização, e os documentos que evitam atraso na entrega dos lotes.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "O que precisa estar pronto para entregar lotes com energia, sem surpresa no prazo nem no orçamento.",
    },
    summary:
      "A Lei 6.766/1979 inclui a energia elétrica pública e domiciliar na infraestrutura básica dos loteamentos. Na prática, a rede passa por consulta de viabilidade com a distribuidora, projeto no padrão dela, aprovação, execução por empresa habilitada, vistoria e energização. Planejar essas etapas no início evita que a parte elétrica atrase a entrega dos lotes.",
    primaryKeyword: "rede elétrica para loteamento",
    datePublished: PUBLISHED,
    secondaryKeywords: ["infraestrutura elétrica de loteamento", "projeto de rede de loteamento", "iluminação pública loteamento", "Lei 6.766 energia elétrica", "incorporação de rede"],
    relatedServices: [SERVICES.redes, SERVICES.projetos],
    sections: [
      {
        title: "O que a lei exige",
        body: [
          "O artigo 2º, §5º, da Lei 6.766/1979 define a infraestrutura básica dos parcelamentos, que inclui iluminação pública e energia elétrica pública e domiciliar, ao lado de água, esgoto, drenagem e vias de circulação.",
          "As exigências detalhadas variam por município e pela norma técnica da distribuidora. Por isso o projeto elétrico deve conversar desde cedo com o projeto urbanístico.",
        ],
      },
      {
        title: "Etapa 1: viabilidade com a distribuidora",
        body: [
          "Antes do projeto, a distribuidora informa as condições de atendimento: de onde sai a alimentação, se há capacidade disponível e quais obras de reforço podem ser necessárias fora do loteamento.",
          "Essa resposta muda o orçamento. Um reforço de rede fora da gleba pode pesar mais do que a rede interna, e descobrir isso tarde é a principal causa de preço que estoura no meio da obra.",
        ],
      },
      {
        title: "Etapa 2: projeto e aprovação",
        body: [
          "O projeto define a rede de média e baixa tensão, a posição dos transformadores, a iluminação pública e os ramais para cada lote, seguindo o padrão técnico da distribuidora e o desenho urbanístico aprovado.",
          "A aprovação pela distribuidora é condição para começar a obra. Um projeto bem documentado reduz idas e vindas na análise.",
        ],
      },
      {
        title: "Etapa 3: execução e fiscalização",
        body: [
          "A obra deve ser executada por empresa legalmente habilitada, com materiais e equipamentos aceitos pela distribuidora. Durante a execução, a distribuidora pode fiscalizar etapas como posteamento, aterramento e montagem de transformadores.",
          "Coordenar a rede elétrica com terraplenagem, drenagem e pavimentação evita cruzamentos de cronograma, como postes em local que ainda vai receber corte de terreno.",
        ],
      },
      {
        title: "Etapa 4: vistoria, incorporação e energização",
        body: [
          "Concluída a obra, a distribuidora faz a vistoria e, estando tudo conforme, a rede é incorporada ao sistema de distribuição e energizada. A documentação de entrega, com projeto como construído e ARTs, entra nessa etapa.",
          "Só depois da energização os lotes passam a ter condição de pedir ligação individual. Esse é o marco que interessa ao comprador.",
        ],
      },
    ],
    faq: [
      {
        q: "Rede elétrica é obrigatória em loteamento?",
        a: "Sim. A Lei 6.766/1979 inclui energia elétrica pública e domiciliar e iluminação pública na infraestrutura básica dos parcelamentos. Exigências complementares variam por município.",
      },
      {
        q: "Quem aprova o projeto elétrico do loteamento?",
        a: "A distribuidora de energia da região, que analisa o projeto conforme suas normas técnicas antes de liberar a obra.",
      },
      {
        q: "Como evitar que o orçamento da rede estoure?",
        a: "Fazendo a consulta de viabilidade com a distribuidora antes de fechar o orçamento. Ela indica se há obras de reforço fora do loteamento, que costumam ser o maior risco de custo.",
      },
      {
        q: "A Rucad faz projeto e execução de rede para loteamento?",
        a: "Sim. A Rucad faz projeto, aprovação, construção da rede de média e baixa tensão, iluminação pública e acompanhamento até a energização.",
      },
    ],
    cta: {
      title: "Vai lançar um loteamento?",
      body: "Fale com um engenheiro da Rucad. Viabilidade, projeto, execução e entrega da rede com prazo e responsável técnico definidos.",
      message: "Olá, quero orçar a rede elétrica de um loteamento.",
    },
  },
  {
    slug: "comissionamento-subestacao",
    title: "Comissionamento de subestação: o que é e o que o relatório deve ter",
    seoTitle: "Comissionamento de Subestação: Guia",
    metaDescription:
      "Saiba o que é o comissionamento elétrico de subestação, quais testes costumam entrar no escopo e o que deve constar no relatório antes de energizar.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "A etapa que confirma que a subestação foi montada, testada e ajustada conforme o projeto antes de entrar em operação.",
    },
    summary:
      "Comissionamento de subestação é o conjunto de inspeções, ensaios e verificações que confirma, antes da energização, que equipamentos, proteção e aterramento estão conforme o projeto e prontos para operar. O resultado é um relatório com os testes realizados, os valores medidos e as pendências, que serve de referência para toda a vida útil da instalação.",
    primaryKeyword: "comissionamento de subestação",
    datePublished: PUBLISHED,
    secondaryKeywords: ["comissionamento elétrico", "ensaios em subestação", "relatório de comissionamento", "teste de relé de proteção", "energização de subestação"],
    relatedServices: [SERVICES.laudos, SERVICES.redes],
    sections: [
      {
        title: "Por que não basta ligar e ver se funciona",
        body: [
          "Uma subestação pode energizar normalmente e ainda assim ter uma proteção mal ajustada, um aterramento acima do projetado ou uma conexão frouxa. Esses problemas só aparecem na primeira falta ou sob carga, quando o custo é maior.",
          "O comissionamento antecipa essas descobertas para um momento controlado, com a instalação desenergizada e a equipe preparada.",
        ],
      },
      {
        title: "O que costuma entrar no escopo",
        body: [
          "Inspeção visual e mecânica da montagem, ensaios de resistência de isolamento em cabos e equipamentos, ensaios em transformadores (como relação de transformação e resistência dos enrolamentos), análise do óleo isolante quando aplicável e medição da malha de aterramento.",
          "Na proteção, verificam-se os ajustes dos relés por injeção de corrente, a atuação de disjuntores, os intertravamentos e a lógica de comando. O escopo exato depende do porte da subestação, do projeto e das recomendações dos fabricantes.",
        ],
      },
      {
        title: "Referências técnicas",
        body: [
          "Não existe uma única norma que liste todos os testes de comissionamento. O roteiro combina o projeto aprovado, os manuais dos fabricantes, as normas técnicas dos equipamentos e a ABNT NBR 14039, que trata de instalações elétricas de média tensão.",
          "Por isso o escopo deve ser combinado antes da obra e registrado em proposta, para não haver dúvida sobre o que será entregue.",
        ],
      },
      {
        title: "O que o relatório deve ter",
        body: [
          "Identificação da instalação e dos equipamentos, lista de ensaios com método, instrumentos utilizados e valores medidos, comparação com os critérios de aceitação, registro dos ajustes de proteção aplicados e lista de pendências com responsável.",
          "Assinatura e ART do responsável técnico completam o documento. Esse relatório vira a linha de base para comparar ensaios futuros de manutenção.",
        ],
      },
      {
        title: "Planejando sem atrasar a energização",
        body: [
          "Comissionamento bem planejado acontece em paralelo ao final da montagem. Definir cedo o roteiro de testes, os instrumentos e as janelas de desligamento evita que a energização espere pelo relatório.",
          "Em ampliações de subestações existentes, o planejamento da parada é ainda mais importante para não interromper a operação além do necessário.",
        ],
      },
    ],
    faq: [
      {
        q: "Comissionamento é obrigatório?",
        a: "Não há uma norma única que o torne obrigatório em todos os casos, mas ele é a forma técnica de comprovar que a instalação foi verificada antes de operar. Contratos, seguradoras e distribuidoras costumam pedir esse registro.",
      },
      {
        q: "Qual a diferença entre comissionamento e laudo?",
        a: "O comissionamento verifica a instalação nova ou modificada antes da energização. O laudo avalia a condição de uma instalação em operação em determinado momento.",
      },
      {
        q: "Quanto tempo leva o comissionamento?",
        a: "Depende do porte da subestação, da quantidade de equipamentos e das janelas disponíveis. O roteiro definido antes da obra dá a previsão para cada caso.",
      },
      {
        q: "A Rucad faz comissionamento de subestação?",
        a: "Sim. A Rucad executa ensaios, verificação de proteção e aterramento, relatório de comissionamento e ART, em subestações novas e ampliações.",
      },
    ],
    cta: {
      title: "Vai energizar ou ampliar uma subestação?",
      body: "Fale com um engenheiro da Rucad. Roteiro de testes combinado antes da obra, relatório completo e ART.",
      message: "Olá, preciso de comissionamento de subestação.",
    },
  },
  {
    slug: "manutencao-subestacao",
    title: "Manutenção de subestação: preventiva, preditiva e como evitar parada",
    seoTitle: "Manutenção de Subestação: Como Planejar",
    metaDescription:
      "Entenda os tipos de manutenção de subestação, os ensaios mais usados e como planejar a intervenção para reduzir o risco de parada não programada.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "Como manter transformadores, proteção e aterramento confiáveis sem parar a planta além do necessário.",
    },
    summary:
      "A manutenção de subestação combina inspeções e ensaios periódicos (preventiva), monitoramento da condição dos equipamentos (preditiva) e correção de falhas (corretiva). Termografia, análise do óleo do transformador e testes de proteção ajudam a encontrar problemas antes que virem parada. A frequência ideal depende dos equipamentos, do ambiente e do histórico da instalação.",
    primaryKeyword: "manutenção de subestação",
    datePublished: PUBLISHED,
    secondaryKeywords: ["manutenção preventiva subestação", "termografia elétrica", "análise de óleo de transformador", "parada não programada", "manutenção de cabine primária"],
    relatedServices: [SERVICES.redes, SERVICES.laudos],
    sections: [
      {
        title: "Três tipos de manutenção",
        body: [
          "Preventiva: intervenções programadas, como limpeza, reaperto de conexões, verificação de isoladores e testes de proteção. Preditiva: acompanhamento da condição dos equipamentos com ensaios que não exigem desligamento, como termografia e análise de óleo. Corretiva: reparo depois da falha.",
          "Quanto mais a manutenção se apoia em preventiva e preditiva, menor a chance de a corretiva acontecer em hora ruim.",
        ],
      },
      {
        title: "Termografia: o problema que esquenta antes de falhar",
        body: [
          "A inspeção termográfica, feita com a instalação energizada e em carga, mostra pontos com aquecimento anormal em conexões, barramentos, chaves e cabos. Muitas falhas em subestação começam assim.",
          "Por não exigir desligamento, a termografia ajuda a decidir onde a próxima parada programada deve se concentrar.",
        ],
      },
      {
        title: "Óleo do transformador: o exame de sangue",
        body: [
          "Em transformadores a óleo, a análise físico-química e a cromatografia de gases dissolvidos indicam umidade, degradação do isolamento e falhas internas incipientes.",
          "Acompanhar a tendência dos resultados ao longo do tempo vale mais do que um laudo isolado. Por isso os resultados devem ser guardados e comparados.",
        ],
      },
      {
        title: "Proteção e aterramento",
        body: [
          "Relés de proteção precisam ser testados periodicamente para confirmar que atuam nos valores e tempos ajustados. Disjuntores e chaves precisam operar quando acionados.",
          "A malha de aterramento também se altera com o tempo, por corrosão ou intervenções no terreno. Medições periódicas confirmam que ela segue cumprindo sua função de segurança.",
        ],
      },
      {
        title: "Planejando a parada",
        body: [
          "Intervenções que exigem desligamento devem ser planejadas com a operação: janela, sequência de manobras, equipe, materiais e plano de retorno. Pela NR-10, serviços em instalações elétricas devem seguir procedimentos de desenergização e medidas de controle de risco.",
          "Concentrar ensaios e reparos na mesma janela, a partir do que a termografia e a análise de óleo indicaram, reduz o número de paradas por ano.",
        ],
      },
    ],
    faq: [
      {
        q: "Com que frequência devo fazer manutenção na subestação?",
        a: "Depende dos equipamentos, do ambiente, da carga e das recomendações dos fabricantes. Um plano de manutenção define as frequências de cada atividade para a sua instalação.",
      },
      {
        q: "Termografia substitui a manutenção preventiva?",
        a: "Não. A termografia é uma ferramenta preditiva que ajuda a direcionar a preventiva, mas não substitui testes de proteção, limpeza e reaperto.",
      },
      {
        q: "Dá para fazer manutenção sem parar a produção?",
        a: "Parte sim, como termografia e coleta de óleo. Intervenções que exigem desligamento podem ser concentradas em janelas planejadas com a operação.",
      },
      {
        q: "A Rucad faz manutenção de subestação?",
        a: "Sim. A Rucad faz manutenção preventiva e corretiva, termografia, ensaios, testes de proteção e plano de manutenção para subestações e cabines primárias.",
      },
    ],
    cta: {
      title: "Quer reduzir o risco de parada na subestação?",
      body: "Fale com um engenheiro da Rucad. Diagnóstico, plano de manutenção e execução com janelas combinadas com a sua operação.",
      message: "Olá, quero um plano de manutenção para minha subestação.",
    },
  },

  // ------------------------------------------------------------------ prioridade 3
  {
    slug: "laudo-spda",
    title: "SPDA: o que é, quando é exigido e por que o laudo importa",
    seoTitle: "Laudo SPDA e Para-raios: NBR 5419",
    metaDescription:
      "Entenda o que é SPDA, como a NBR 5419:2026 define a necessidade de proteção e o que o laudo de para-raios deve conter. Guia técnico da Rucad.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "Para-raios não é só a haste no telhado: é um sistema que precisa de projeto, inspeção e laudo.",
    },
    summary:
      "SPDA é o Sistema de Proteção contra Descargas Atmosféricas, formado por captação, descidas e aterramento. A necessidade de proteção é definida por análise de risco conforme a ABNT NBR 5419, cuja edição de 2026 substituiu a de 2015. O laudo registra a inspeção e as medições do sistema e é exigido em situações como licenciamento e o prontuário da NR-10.",
    primaryKeyword: "laudo SPDA",
    datePublished: PUBLISHED,
    secondaryKeywords: ["SPDA", "NBR 5419 2026", "laudo de para-raios", "inspeção de SPDA", "projeto de SPDA"],
    relatedServices: [SERVICES.projetos, SERVICES.laudos],
    sections: [
      {
        title: "O que é SPDA",
        body: [
          "O SPDA intercepta a descarga atmosférica e conduz a corrente com segurança até o solo. Ele tem três partes: captação (hastes, cabos ou malha na cobertura), descidas (condutores que levam a corrente para baixo) e aterramento (eletrodos que dispersam a corrente no solo).",
          "A norma também trata das Medidas de Proteção contra Surtos (MPS), como os DPS, que protegem os equipamentos internos. Raio que não incendeia o prédio ainda pode queimar a automação de uma indústria.",
        ],
      },
      {
        title: "Quando é exigido",
        body: [
          "A ABNT NBR 5419 define a necessidade de proteção por análise de risco, considerando dimensões da estrutura, ocupação, conteúdo, linhas que chegam ao prédio e a densidade de descargas da região.",
          "A edição de 2026, publicada em 10 de março de 2026, substituiu a de 2015, atualizou os valores de densidade de descargas por município e revisou a metodologia de análise de risco. Estruturas que não precisavam de proteção pela edição anterior podem passar a precisar, e o contrário também pode acontecer.",
        ],
      },
      {
        title: "O que muda para quem já tem SPDA",
        body: [
          "Um SPDA instalado conforme a edição anterior não fica automaticamente irregular. Mas novos projetos, reformas e ampliações devem seguir a edição vigente, e a próxima inspeção é uma boa oportunidade para refazer a análise de risco.",
          "A edição de 2026 também revisou critérios de inspeção e manutenção. A periodicidade deve ser conferida na norma vigente para o tipo de estrutura.",
        ],
      },
      {
        title: "O que o laudo deve conter",
        body: [
          "Identificação da estrutura e do nível de proteção, inspeção visual de captação, descidas, conexões e aterramento, medições de continuidade e de aterramento, registro fotográfico, não conformidades com recomendações e conclusão do responsável técnico.",
          "O laudo deve ter a ART do profissional habilitado. Corpos de Bombeiros podem pedi-lo no licenciamento, e a NR-10 inclui a documentação das inspeções e medições do SPDA e do aterramento no prontuário das instalações elétricas.",
        ],
      },
      {
        title: "Problemas mais comuns em inspeção",
        body: [
          "Conexões corroídas ou soltas, descidas interrompidas por reformas, captores danificados, aterramento sem caixa de inspeção acessível e equipamentos novos no telhado sem proteção.",
          "Boa parte desses problemas nasce de intervenções na cobertura feitas sem considerar o SPDA. Incluir a proteção no escopo de qualquer reforma evita esse tipo de falha.",
        ],
      },
    ],
    faq: [
      {
        q: "Todo prédio precisa de SPDA?",
        a: "Não necessariamente. A necessidade é definida por análise de risco conforme a ABNT NBR 5419. Exigências de órgãos como o Corpo de Bombeiros também podem se aplicar.",
      },
      {
        q: "A NBR 5419 mudou em 2026?",
        a: "Sim. A nova edição foi publicada em 10 de março de 2026 e substituiu a de 2015, com mudanças na análise de risco, na densidade de descargas por município e em critérios técnicos de projeto e inspeção.",
      },
      {
        q: "De quanto em quanto tempo o laudo de SPDA deve ser refeito?",
        a: "A periodicidade é definida pela norma conforme o tipo de estrutura, e a edição de 2026 revisou esses critérios. Inspeções extras são indicadas após reformas ou após o sistema ser atingido por descarga.",
      },
      {
        q: "A Rucad faz projeto e laudo de SPDA?",
        a: "Sim. A Rucad faz análise de risco, projeto, instalação, inspeção e laudo de SPDA com ART, já pela NBR 5419:2026.",
      },
    ],
    cta: {
      title: "Precisa de projeto ou laudo de SPDA?",
      body: "Fale com um engenheiro da Rucad. Análise de risco pela NBR 5419:2026, inspeção, medições e laudo com ART.",
      message: "Olá, preciso de projeto ou laudo de SPDA.",
    },
  },
  {
    slug: "art-projeto-eletrico",
    title: "ART em projeto elétrico: o que ela garante e por que exigir",
    seoTitle: "ART em Projeto Elétrico: O Que Garante",
    metaDescription:
      "Entenda o que é a ART, o que ela registra, o que não substitui e como conferir a ART do seu projeto ou obra elétrica. Guia rápido da Rucad.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "O documento que diz, para efeitos legais, quem responde tecnicamente pelo serviço contratado.",
    },
    summary:
      "A ART (Anotação de Responsabilidade Técnica) foi instituída pela Lei 6.496/1977. Todo contrato de obra ou serviço de engenharia fica sujeito a ela, e é a ART que define, para efeitos legais, quem é o responsável técnico. Ela não substitui projeto, laudo ou relatório, mas identifica quem responde por eles. Por isso vale exigir e conferir.",
    primaryKeyword: "ART projeto elétrico",
    datePublished: PUBLISHED,
    secondaryKeywords: ["anotação de responsabilidade técnica", "ART CREA", "responsável técnico obra elétrica", "consultar ART", "Resolução Confea 1.137"],
    relatedServices: [SERVICES.projetos, SERVICES.laudos],
    sections: [
      {
        title: "O que a lei diz",
        body: [
          "Pela Lei 6.496/1977, todo contrato, escrito ou verbal, para execução de obras ou prestação de serviços de engenharia fica sujeito à ART. A mesma lei estabelece que a ART define, para efeitos legais, os responsáveis técnicos pelo empreendimento.",
          "A falta da ART sujeita o profissional ou a empresa a multa. As regras atuais de registro estão na Resolução Confea nº 1.137/2023.",
        ],
      },
      {
        title: "O que a ART garante para quem contrata",
        body: [
          "Identifica o profissional e a empresa responsáveis, descreve a atividade técnica contratada e cria um registro público no CREA. Em caso de problema, fica claro quem responde pelo serviço.",
          "Para órgãos como distribuidoras, prefeituras e Corpo de Bombeiros, a ART é parte do pacote de documentos que acompanha projetos e laudos.",
        ],
      },
      {
        title: "O que a ART não faz",
        body: [
          "A ART não comprova que o serviço foi bem feito nem substitui o projeto, o laudo ou o relatório de ensaios. Ela registra quem é responsável por esses documentos.",
          "Uma ART genérica, com atividade que não corresponde ao que foi executado, protege pouco. O escopo descrito precisa bater com o serviço real.",
        ],
      },
      {
        title: "Como conferir uma ART",
        body: [
          "Peça o número da ART e consulte no site do CREA do estado. Confira o nome do profissional, a atividade descrita, o endereço da obra, o contratante e se a ART foi efetivamente registrada.",
          "Em serviços com várias etapas, como projeto, execução e laudo, cada atividade pode ter sua ART. Vale conferir se todas as etapas contratadas estão cobertas.",
        ],
      },
    ],
    faq: [
      {
        q: "Todo serviço elétrico precisa de ART?",
        a: "A Lei 6.496/1977 sujeita à ART todo contrato de obra ou serviço de engenharia. Projetos, execução de instalações, laudos e ensaios elétricos estão nesse grupo.",
      },
      {
        q: "A ART substitui o laudo?",
        a: "Não. A ART registra quem é o responsável técnico. O laudo é o documento técnico que registra o que foi inspecionado e medido.",
      },
      {
        q: "Como sei se a ART é verdadeira?",
        a: "Consultando o número da ART no site do CREA do estado onde ela foi registrada e conferindo profissional, atividade, endereço e contratante.",
      },
      {
        q: "A Rucad emite ART dos serviços?",
        a: "Sim. Os serviços técnicos da Rucad saem com ART do engenheiro responsável, com a atividade descrita conforme o escopo contratado.",
      },
    ],
    cta: {
      title: "Precisa de um serviço elétrico com ART?",
      body: "Fale com um engenheiro da Rucad. Escopo claro na proposta e ART emitida no prazo, conforme o serviço contratado.",
      message: "Olá, preciso de um serviço elétrico com ART.",
    },
  },
  {
    slug: "atraso-eletrico-obras-industriais",
    title: "Como evitar atraso elétrico em obras industriais",
    seoTitle: "Como Evitar Atraso Elétrico em Obras",
    metaDescription:
      "Os pontos da parte elétrica que mais atrasam obras industriais e como antecipá-los: ligação, equipamentos, documentação e comissionamento.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "A parte elétrica costuma estar no caminho crítico. Antecipar alguns pontos evita que ela trave a entrega.",
    },
    summary:
      "Em obras industriais, os atrasos elétricos mais comuns vêm de quatro fontes: pedido de ligação feito tarde, equipamentos de longo prazo de entrega comprados no fim, documentação incompleta para a distribuidora e comissionamento sem planejamento. Antecipar essas etapas e manter um responsável técnico desde o canteiro reduz o risco de a energia ser o último item a ficar pronto.",
    primaryKeyword: "atraso em obra industrial",
    datePublished: PUBLISHED,
    secondaryKeywords: ["instalação elétrica de canteiro", "cronograma obra elétrica", "ligação provisória de obra", "obra industrial MS", "SPDA para obra industrial"],
    relatedServices: [SERVICES.projetos, SERVICES.redes, SERVICES.laudos],
    sections: [
      {
        title: "1. Pedido de ligação feito tarde",
        body: [
          "A conexão definitiva depende de análise e, muitas vezes, de obras da distribuidora. Se o pedido entra quando o prédio está pronto, a energia vira o gargalo.",
          "O ideal é iniciar a consulta de viabilidade junto com o projeto executivo, para conhecer prazos e eventuais obras de reforço enquanto a construção avança.",
        ],
      },
      {
        title: "2. Equipamentos de longo prazo de entrega",
        body: [
          "Transformadores, cubículos de média tensão e painéis sob encomenda podem levar semanas ou meses para serem fabricados. Comprar no fim da obra garante atraso.",
          "Fechar a especificação técnica cedo e acompanhar a fabricação permite encaixar a entrega no cronograma da montagem.",
        ],
      },
      {
        title: "3. Canteiro sem projeto elétrico",
        body: [
          "A NR-18 determina que as instalações elétricas temporárias e definitivas do canteiro atendam à NR-10. Canteiro improvisado gera risco, interdição e retrabalho.",
          "Um projeto simples para o canteiro, com quadros, aterramento e proteção dimensionados para as cargas da obra, evita paradas e já prepara a documentação que a fiscalização pode pedir.",
        ],
      },
      {
        title: "4. Documentação incompleta",
        body: [
          "Distribuidora, Corpo de Bombeiros e seguradoras pedem documentos: projeto aprovado, ARTs, laudos de SPDA e aterramento, relatórios de ensaio. Montar esse pacote no fim costuma revelar lacunas.",
          "Definir no início quais documentos serão entregues e quem é responsável por cada um evita que a obra pronta espere papel.",
        ],
      },
      {
        title: "5. Comissionamento sem planejamento",
        body: [
          "Testes de proteção, ensaios em transformadores e medição de aterramento precisam de tempo, instrumentos e janelas. Quando ficam para o último dia, atrasam a energização.",
          "Um roteiro de comissionamento definido junto com o projeto permite testar por etapas, à medida que a montagem avança.",
        ],
      },
    ],
    faq: [
      {
        q: "Quando devo pedir a ligação definitiva da obra?",
        a: "O mais cedo possível, idealmente com o projeto executivo pronto. A consulta de viabilidade mostra prazos e possíveis obras de reforço da distribuidora.",
      },
      {
        q: "O canteiro de obras precisa de projeto elétrico?",
        a: "A NR-18 determina que as instalações elétricas do canteiro atendam à NR-10. Um projeto adequado às cargas da obra é a forma de garantir isso.",
      },
      {
        q: "Quais documentos elétricos costumam ser pedidos na entrega?",
        a: "Projeto aprovado, ARTs, laudos de SPDA e aterramento e relatórios de ensaio e comissionamento, conforme o tipo de instalação e as exigências locais.",
      },
      {
        q: "A Rucad atende obras industriais no interior?",
        a: "Sim. A Rucad atende obras industriais em Mato Grosso do Sul e estados vizinhos, do projeto do canteiro ao comissionamento e à documentação final.",
      },
    ],
    cta: {
      title: "Tem uma obra industrial com prazo apertado?",
      body: "Fale com um engenheiro da Rucad. Planejamento da parte elétrica desde o canteiro, ART no prazo e documentação pronta na entrega.",
      message: "Olá, quero planejar a parte elétrica de uma obra industrial.",
    },
  },
  {
    slug: "mercado-livre-energia-infraestrutura",
    title: "Mercado livre de energia: o que revisar na infraestrutura elétrica",
    seoTitle: "Mercado Livre de Energia: Infraestrutura",
    metaDescription:
      "Quem pode migrar para o mercado livre de energia, o calendário da baixa tensão e o que revisar na medição, demanda e instalação antes de migrar.",
    hero: {
      kicker: "CONTEÚDO TÉCNICO",
      subtitle: "Migrar muda o contrato de energia. A instalação elétrica precisa estar pronta para isso.",
    },
    summary:
      "Consumidores de média e alta tensão (Grupo A) já podem migrar para o mercado livre de energia. Pela Lei 15.269/2025 e pelo Decreto 13.097/2026, comerciais e industriais em baixa tensão podem migrar a partir de 25 de novembro de 2027, e os demais a partir de 25 de novembro de 2028. Antes de migrar, vale revisar medição, demanda contratada, fator de potência e qualidade de energia.",
    primaryKeyword: "mercado livre de energia",
    datePublished: PUBLISHED,
    secondaryKeywords: ["migração mercado livre", "mercado livre baixa tensão", "Lei 15.269/2025", "demanda contratada", "fator de potência"],
    relatedServices: [SERVICES.eficiencia, SERVICES.redes],
    sections: [
      {
        title: "Quem pode migrar e quando",
        body: [
          "Unidades consumidoras do Grupo A, atendidas em média ou alta tensão, já podem escolher o fornecedor de energia no Ambiente de Contratação Livre.",
          "Para a baixa tensão, a Lei 15.269/2025 estabeleceu a abertura e o Decreto 13.097/2026 detalhou o calendário: consumidores comerciais e industriais a partir de 25 de novembro de 2027, e os demais, incluindo residenciais, a partir de 25 de novembro de 2028. O decreto permite a representação por um agente varejista, e regras complementares ainda dependem da ANEEL.",
        ],
      },
      {
        title: "Medição",
        body: [
          "No mercado livre, a energia consumida é contabilizada com base na medição da unidade. Dependendo da situação, pode ser necessário adequar o sistema de medição às exigências aplicáveis à migração.",
          "Verificar isso no início evita que a migração fique parada esperando adequação de cubículo ou troca de equipamentos.",
        ],
      },
      {
        title: "Demanda contratada e fator de potência",
        body: [
          "A migração muda a compra de energia, mas o uso da rede continua sendo pago à distribuidora. Demanda contratada mal dimensionada e cobrança por energia reativa continuam pesando na conta.",
          "Um estudo do perfil de consumo ajuda a ajustar a demanda e a corrigir o fator de potência, o que melhora o resultado da migração.",
        ],
      },
      {
        title: "Qualidade de energia e confiabilidade",
        body: [
          "Contratos de energia no mercado livre costumam ter flexibilidades e penalidades ligadas ao volume consumido. Paradas não programadas por falha elétrica podem desequilibrar esse planejamento.",
          "Revisar a condição da subestação, da proteção e dos principais quadros antes de migrar reduz esse risco.",
        ],
      },
      {
        title: "Migração e geração própria",
        body: [
          "Mercado livre e geração distribuída, como usinas fotovoltaicas, podem se complementar, mas as regras de cada modalidade são diferentes. Combinar as duas exige análise de caso a caso.",
          "Um diagnóstico energético antes da decisão mostra qual caminho, ou combinação, faz mais sentido para o perfil de consumo.",
        ],
      },
    ],
    faq: [
      {
        q: "Quem pode migrar para o mercado livre hoje?",
        a: "Consumidores do Grupo A, atendidos em média ou alta tensão. A baixa tensão entra a partir de 25 de novembro de 2027 (comercial e industrial) e de 25 de novembro de 2028 (demais consumidores).",
      },
      {
        q: "Preciso mudar a instalação elétrica para migrar?",
        a: "Depende. Em alguns casos é preciso adequar a medição. Também vale revisar demanda contratada, fator de potência e confiabilidade da instalação.",
      },
      {
        q: "No mercado livre deixo de pagar a distribuidora?",
        a: "Não. A energia passa a ser comprada de outro fornecedor, mas o uso da rede de distribuição continua sendo pago à distribuidora.",
      },
      {
        q: "A Rucad ajuda a preparar a instalação para a migração?",
        a: "Sim. A Rucad faz diagnóstico energético, análise de demanda e fator de potência e adequações na instalação e na subestação.",
      },
    ],
    cta: {
      title: "Pensando em migrar para o mercado livre?",
      body: "Fale com um engenheiro da Rucad. Diagnóstico da instalação, ajuste de demanda e adequações antes da migração.",
      message: "Olá, quero preparar minha instalação para o mercado livre de energia.",
    },
  },
];
