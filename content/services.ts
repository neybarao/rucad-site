export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string; // H1
  cardSummary: string; // one-line for home/index cards
  seoTitle: string; // <= 60 chars, template appends " · Rucad Engenharia"
  metaDescription: string;
  hero: { kicker: string; subtitle: string };
  intro: string; // "o que é / o que inclui" lead paragraph
  includes: string[]; // "Inclui:" bullets
  applications: string; // "Aplicações:" sentence
  steps: { title: string; body: string }[]; // Como funciona
  differentials: { title: string; body: string }[]; // Por que a Rucad
  faq: Faq[];
  cta: { title: string; body: string };
};

export const services: Service[] = [
  {
    slug: "projetos-eletricos-spda",
    title: "Projeto Elétrico e SPDA",
    cardSummary:
      "Projeto elétrico e de proteção contra descargas atmosféricas, com ART emitida no prazo.",
    seoTitle: "Projeto Elétrico e SPDA",
    metaDescription:
      "Projeto elétrico e de SPDA dimensionado por engenheiro, com ART emitida no prazo. Para indústrias, galpões, loteamentos, obras e propriedades rurais.",
    hero: {
      kicker: "SERVIÇO",
      subtitle:
        "O projeto que sai do papel aprovado, no prazo e com ART. Da instalação da propriedade rural à indústria de grande porte.",
    },
    intro:
      "A Rucad desenvolve o projeto elétrico completo da sua instalação e o sistema de proteção contra descargas atmosféricas (SPDA). Trabalhamos com dimensionamento correto desde o início, para o projeto ser aprovado sem retrabalho e a obra não travar por falta de documento.",
    includes: [
      "Levantamento técnico no local",
      "Projeto elétrico de baixa e média tensão",
      "Dimensionamento de carga, transformador e proteção",
      "Projeto de SPDA (para-raios e aterramento)",
      "Adequação às normas técnicas e às exigências da concessionária",
      "Emissão de ART pelo engenheiro responsável",
      "Acompanhamento até a aprovação e a ligação",
    ],
    applications:
      "Indústrias, frigoríficos, galpões, alojamentos e escritórios de obra, loteamentos, subestações, propriedades rurais (pivô, silo, secador, ordenha, casa sede).",
    steps: [
      { title: "Levantamento", body: "Um engenheiro vai até o local, entende a demanda e avalia as condições da instalação." },
      { title: "Dimensionamento e projeto", body: "Calculamos carga, proteção e SPDA, e desenhamos o projeto dentro das normas e das exigências da concessionária." },
      { title: "Documentação e ART", body: "Emitimos a ART e organizamos a documentação necessária para aprovação." },
      { title: "Aprovação e acompanhamento", body: "Acompanhamos o processo até a aprovação e a efetivação da ligação. Você não corre atrás da concessionária sozinho." },
    ],
    differentials: [
      { title: "Dimensionamento certo na primeira vez", body: "Projeto feito para ser aprovado, sem retrabalho que atrasa a obra." },
      { title: "ART no prazo combinado", body: "Responsável técnico definido e ART emitida sem demora." },
      { title: "A gente resolve a burocracia", body: "Cuidamos do processo com a concessionária para você não travar na ligação." },
      { title: "Experiência no seu tipo de obra", body: "Do rural ao industrial, já projetamos para contextos parecidos com o seu." },
    ],
    faq: [
      { q: "O projeto já vem com a ART?", a: "Sim. A ART é emitida pelo engenheiro responsável e faz parte da entrega." },
      { q: "Vocês resolvem a aprovação com a concessionária?", a: "Sim. Acompanhamos o processo até a aprovação e a efetivação da ligação, para você não precisar correr atrás." },
      { q: "E se o projeto não for aprovado?", a: "Projetamos com o dimensionamento correto desde o início justamente para evitar reprovação. Se houver exigência do órgão ou da concessionária, fazemos a adequação como parte do acompanhamento." },
      { q: "Atendem projeto de SPDA separado do projeto elétrico?", a: "Sim. Podemos fazer só o SPDA ou o pacote completo, conforme a sua necessidade." },
      { q: "Fazem projeto para propriedade rural?", a: "Sim. Projeto elétrico rural, dimensionamento de transformador e adequação às normas da concessionária para viabilizar equipamentos e regularizar a instalação." },
      { q: "Quanto tempo leva?", a: "Depende do porte e da complexidade. Definimos o prazo na proposta, após o levantamento, e ele fica registrado desde o dia 1." },
    ],
    cta: {
      title: "Precisa de projeto elétrico ou SPDA?",
      body: "Fale com um engenheiro da Rucad. Levantamento no local e proposta com prazo e ART definidos.",
    },
  },
  {
    slug: "ensaios-comissionamento-laudos",
    title: "Ensaios, Comissionamento e Laudos Técnicos",
    cardSummary:
      "Laudos e ensaios de SEP, UFV e SPDA para operar em conformidade e liberar a fiscalização.",
    seoTitle: "Laudo Elétrico, Ensaios e Comissionamento",
    metaDescription:
      "Laudos e ensaios de SEP, UFV e SPDA, comissionamento e apoio à conformidade NR-10. A documentação que libera a operação e a fiscalização.",
    hero: {
      kicker: "SERVIÇO",
      subtitle:
        "A documentação que comprova conformidade e mantém a planta operando. Laudo no prazo, sem improviso, com responsável técnico.",
    },
    intro:
      "A Rucad executa ensaios, comissionamento e laudos técnicos que comprovam que a sua instalação está dentro das normas e pronta para operar. É a documentação que a fiscalização, a seguradora e a concessionária exigem, entregue com relatório claro e ART.",
    includes: [
      "Laudos técnicos de SEP (Sistema Elétrico de Potência)",
      "Laudos de UFV (usinas fotovoltaicas)",
      "Laudos de SPDA (proteção contra descargas atmosféricas)",
      "Comissionamento de instalações e subestações",
      "Ensaios elétricos periódicos",
      "Apoio à adequação às normas (NR-10 e correlatas) em caso de fiscalização",
      "Relatório técnico e emissão de ART",
    ],
    applications:
      "Indústrias, frigoríficos, subestações, usinas fotovoltaicas, canteiros de obra, edificações que precisam de laudo periódico obrigatório.",
    steps: [
      { title: "Avaliação no local", body: "A equipe vai até a planta, avalia a instalação e já traz a proposta técnica." },
      { title: "Ensaios e inspeção", body: "Executamos os ensaios e a inspeção necessários com equipamento próprio." },
      { title: "Relatório e laudo", body: "Você recebe relatório claro, com as não conformidades apontadas quando houver, e o laudo com ART." },
      { title: "Apoio à adequação", body: "Se a fiscalização exigir ajustes, damos suporte para a adequação às normas." },
    ],
    differentials: [
      { title: "Prazo cumprido", body: "Laudo no prazo combinado, para não parar a fiscalização nem a planta." },
      { title: "Relatório claro", body: "Documento objetivo, sem enrolação, com o que precisa ser feito quando algo está fora de conformidade." },
      { title: "Quem conhece indústria", body: "Equipe com experiência industrial, que entende o ritmo de uma planta que não pode parar." },
      { title: "CREA ativo e ART", body: "Responsável técnico registrado e ART emitida, do jeito que a fiscalização exige." },
    ],
    faq: [
      { q: "Que tipos de laudo vocês emitem?", a: "Laudos de SEP, UFV e SPDA, além de ensaios elétricos periódicos e comissionamento. Todos com relatório técnico e ART." },
      { q: "O laudo serve para a fiscalização e para a NR-10?", a: "Sim. Nossos laudos e relatórios comprovam conformidade e dão suporte à adequação às normas, incluindo NR-10, em caso de fiscalização." },
      { q: "Vocês fazem o laudo periódico obrigatório?", a: "Sim. Executamos o laudo periódico e podemos acompanhar as renovações no prazo, para você não ser pego pela fiscalização." },
      { q: "Precisam parar a planta para fazer os ensaios?", a: "Planejamos a execução para reduzir ao máximo o impacto na operação. Definimos janela e escopo junto com a sua equipe de manutenção." },
      { q: "Se o laudo apontar não conformidade, vocês resolvem?", a: "Apontamos com clareza o que está fora da norma e damos suporte à adequação. A Rucad também executa os serviços de correção quando necessário." },
      { q: "Quem assina o laudo?", a: "O engenheiro responsável, com CREA ativo e ART emitida." },
    ],
    cta: {
      title: "Precisa de laudo ou está com fiscalização à vista?",
      body: "Fale com um engenheiro da Rucad. Avaliação no local e laudo no prazo, com ART.",
    },
  },
  {
    slug: "construcao-manutencao-redes",
    title: "Construção e Manutenção de Redes Elétricas",
    cardSummary:
      "Redes de distribuição de baixa e média tensão, subestações e loteamentos, do rural ao urbano.",
    seoTitle: "Construção de Redes e Subestações",
    metaDescription:
      "Construção, expansão e manutenção de redes de baixa e média tensão, subestações e loteamentos. Equipe e equipamentos próprios, do rural ao urbano.",
    hero: {
      kicker: "SERVIÇO",
      subtitle:
        "Redes de baixa e média tensão, subestações e loteamentos. Com equipe e equipamentos próprios, a Rucad constrói, amplia e mantém a sua infraestrutura elétrica.",
    },
    intro:
      "A Rucad constrói, expande e mantém a infraestrutura elétrica que leva e distribui energia. Do loteamento urbano à rede da propriedade rural, da subestação de média tensão à manutenção que evita a parada da planta. Lastro de equipamentos próprios e equipe qualificada para não depender de terceiros no meio da obra.",
    includes: [
      "Construção de redes de distribuição de baixa e média tensão",
      "Redes urbanas e rurais",
      "Infraestrutura elétrica de loteamentos",
      "Construção e expansão de subestações de média tensão",
      "Manutenção de redes e subestações",
      "Regularização junto à concessionária",
    ],
    applications:
      "Loteamentos e incorporações, indústrias e frigoríficos, obras industriais e canteiros, propriedades rurais, concessionárias e grandes empresas de infraestrutura.",
    steps: [
      { title: "Levantamento no local", body: "A equipe avalia o terreno, a demanda e as condições de execução, no mesmo dia quando a obra exige." },
      { title: "Proposta com escopo fechado", body: "Você recebe escopo, prazo e orçamento definidos, com levantamento técnico correto para o preço não estourar depois." },
      { title: "Execução com equipe própria", body: "Construção ou manutenção com equipamentos próprios e acompanhamento técnico, no ritmo que a obra precisa." },
      { title: "Regularização e entrega", body: "Documentação, ART e regularização junto à concessionária. Infraestrutura pronta e regularizada." },
    ],
    differentials: [
      { title: "Equipamentos próprios", body: "Lastro de equipamento próprio para não depender de terceiros e não travar no meio da obra." },
      { title: "Agilidade no campo", body: "Equipe que se desloca até o interior e resolve no canteiro, sem enrolação." },
      { title: "Dentro do prazo e do orçamento", body: "Levantamento correto na frente, para o preço fechado não estourar por surpresa técnica." },
      { title: "A Rucad não pára", body: "Manutenção para manter a planta e a rede operando sem parada não programada." },
    ],
    faq: [
      { q: "Vocês têm equipe e equipamento próprios?", a: "Sim. Trabalhamos com equipe qualificada e lastro de equipamentos próprios, o que dá agilidade e reduz o risco de parada por falta de terceiros." },
      { q: "Atendem obras no interior?", a: "Sim. Nossa equipe se desloca até o local da obra, inclusive no interior, para levantamento e execução." },
      { q: "Fazem a rede de loteamento e a regularização com a concessionária?", a: "Sim. Construímos a infraestrutura elétrica do loteamento e cuidamos da regularização junto à concessionária." },
      { q: "Constroem e mantêm subestação de média tensão?", a: "Sim. Construção, expansão e manutenção de subestações de média tensão fazem parte do serviço." },
      { q: "Como evito que o preço estoure no meio da obra?", a: "Com levantamento técnico correto antes da proposta. O escopo e o orçamento são fechados a partir desse levantamento, para evitar surpresa depois." },
      { q: "Fazem manutenção preventiva, não só corretiva?", a: "Sim. A manutenção preventiva de redes e subestações reduz o risco de parada não programada na sua operação." },
    ],
    cta: {
      title: "Precisa construir, ampliar ou manter uma rede?",
      body: "Fale com um engenheiro da Rucad. Levantamento no local e proposta com escopo, prazo e orçamento definidos.",
    },
  },
  {
    slug: "eficiencia-energetica",
    title: "Eficiência Energética",
    cardSummary:
      "Diagnóstico e gestão de custos para consumir melhor e pagar menos pela energia.",
    seoTitle: "Eficiência Energética",
    metaDescription:
      "Diagnóstico de consumo e gestão estratégica de custos de energia. Reduza a conta e planeje investimentos com dado técnico, não com achismo.",
    hero: {
      kicker: "SERVIÇO",
      subtitle:
        "Consumir melhor para pagar menos. A Rucad analisa a sua conta, identifica o desperdício e transforma energia em vantagem de custo.",
    },
    intro:
      "Energia é um dos maiores custos fixos de quem produz. A Rucad faz o diagnóstico técnico do seu consumo, aponta onde está o desperdício e propõe a gestão estratégica dos custos. Decisão com dado, não com achismo, para reduzir a conta e planejar o próximo investimento com segurança.",
    includes: [
      "Diagnóstico do consumo e da instalação",
      "Análise da fatura e do enquadramento tarifário",
      "Identificação de perdas e desperdício",
      "Recomendações técnicas de adequação e melhoria",
      "Gestão estratégica de custos de energia",
      "Estudo para investimentos de retorno (inclusive geração própria)",
    ],
    applications:
      "Indústrias, frigoríficos, propriedades rurais de médio e grande porte, empresas com conta de energia relevante no custo.",
    steps: [
      { title: "Coleta de dados", body: "Reunimos faturas, dados de consumo e as condições da instalação." },
      { title: "Diagnóstico", body: "Um engenheiro analisa onde está o custo e o desperdício, e o que pode ser otimizado." },
      { title: "Plano de ação", body: "Você recebe recomendações técnicas priorizadas, com estimativa de impacto no custo." },
      { title: "Execução e acompanhamento", body: "A Rucad executa as melhorias e acompanha o resultado na conta." },
    ],
    differentials: [
      { title: "Diagnóstico técnico, não palpite", body: "Análise feita por engenheiro, com base em dado de consumo real." },
      { title: "Foco no seu custo", body: "O objetivo é reduzir a conta e melhorar o enquadramento, com retorno calculado." },
      { title: "Solução completa", body: "Do diagnóstico à execução, incluindo geração própria quando fizer sentido. Uma empresa só." },
      { title: "Visão de longo prazo", body: "Planejamento de investimento de energia com base no seu perfil de consumo." },
    ],
    faq: [
      { q: "Como a eficiência energética reduz a minha conta?", a: "Identificando desperdício, corrigindo o enquadramento tarifário e adequando a instalação. Você passa a pagar pelo que precisa, não pelo que perde." },
      { q: "Preciso trocar toda a minha instalação?", a: "Não necessariamente. O diagnóstico prioriza as ações de maior retorno. Muitas melhorias são pontuais." },
      { q: "Vocês também fazem geração própria?", a: "Sim. Quando o estudo aponta retorno, a Rucad projeta e implanta a geração fotovoltaica. Veja a página de UFV / Fotovoltaica." },
      { q: "Serve para propriedade rural?", a: "Sim. Propriedades com pivô, secador, silo e ordenha costumam ter consumo alto e boa margem de otimização." },
      { q: "Como sei que o investimento vale a pena?", a: "O diagnóstico traz estimativa de impacto no custo. Você decide com número na mão, não com promessa." },
    ],
    cta: {
      title: "Sua conta de energia pesa no custo?",
      body: "Fale com um engenheiro da Rucad. Diagnóstico técnico e plano de ação com retorno estimado.",
    },
  },
  {
    slug: "ufv-fotovoltaica",
    title: "Usinas e Sistemas Fotovoltaicos (UFV)",
    cardSummary:
      "Projeto e implantação de usinas e sistemas fotovoltaicos, do dimensionamento à conexão.",
    seoTitle: "Usina Fotovoltaica e Energia Solar",
    metaDescription:
      "Projeto e implantação de usinas e sistemas fotovoltaicos, do dimensionamento à conexão com a rede. Energia própria com retorno calculado e laudo de UFV.",
    hero: {
      kicker: "SERVIÇO",
      subtitle:
        "Energia própria, com retorno calculado. A Rucad projeta e implanta a sua usina fotovoltaica, do dimensionamento à conexão com a rede.",
    },
    intro:
      "Gerar a própria energia é uma das formas mais diretas de reduzir custo e ganhar previsibilidade. A Rucad cuida da usina fotovoltaica de ponta a ponta: dimensiona conforme o seu consumo, projeta dentro das normas, executa a instalação e conecta à rede. Com engenharia por trás, o retorno é calculado, não prometido.",
    includes: [
      "Estudo de viabilidade e dimensionamento pelo consumo",
      "Projeto fotovoltaico dentro das normas e das exigências da concessionária",
      "Implantação de usinas (UFV) e sistemas fotovoltaicos",
      "Conexão à rede e regularização",
      "Comissionamento e laudo de UFV",
      "ART do engenheiro responsável",
    ],
    applications:
      "Indústrias, propriedades rurais, empresas com consumo relevante, investidores em geração.",
    steps: [
      { title: "Estudo de viabilidade", body: "Analisamos o seu consumo e as condições do local para dimensionar a usina e estimar o retorno." },
      { title: "Projeto", body: "Desenvolvemos o projeto fotovoltaico dentro das normas e das exigências da concessionária, com ART." },
      { title: "Implantação", body: "Executamos a instalação com equipe própria e equipamento adequado." },
      { title: "Conexão e laudo", body: "Conectamos à rede, regularizamos junto à concessionária e entregamos o comissionamento com laudo de UFV." },
    ],
    differentials: [
      { title: "Retorno calculado", body: "Dimensionamento pelo seu consumo real, com estimativa de retorno antes de você investir." },
      { title: "Engenharia de verdade", body: "Projeto, ART e laudo de UFV. Não é só instalar painel, é entregar usina em conformidade." },
      { title: "Solução completa", body: "Do estudo à conexão com a rede, incluindo a regularização. Uma empresa só." },
      { title: "Quem também faz laudo de UFV", body: "A mesma empresa que implanta também comissiona e emite o laudo técnico." },
    ],
    faq: [
      { q: "Como sei quanto vou economizar?", a: "O estudo de viabilidade dimensiona a usina pelo seu consumo e traz a estimativa de retorno. Você decide com número, não com promessa." },
      { q: "Vocês cuidam da conexão e da regularização com a concessionária?", a: "Sim. Fazemos a conexão à rede e a regularização, além do comissionamento e do laudo de UFV." },
      { q: "Fazem usina para propriedade rural?", a: "Sim. Propriedades rurais com consumo alto de irrigação, secagem e refrigeração são casos típicos de bom retorno." },
      { q: "A usina vem com laudo e ART?", a: "Sim. Entregamos o comissionamento com laudo de UFV e a ART do engenheiro responsável." },
      { q: "Vocês só instalam ou também projetam?", a: "As duas coisas. Projeto fotovoltaico completo e implantação, de ponta a ponta." },
      { q: "Já tenho instalação. Dá para saber se compensa antes de investir?", a: "Sim. É exatamente para isso que serve o estudo de viabilidade. Também podemos combinar com o diagnóstico de eficiência energética." },
    ],
    cta: {
      title: "Quer gerar a própria energia?",
      body: "Fale com um engenheiro da Rucad. Estudo de viabilidade e projeto com retorno estimado e laudo de UFV.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
