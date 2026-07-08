# Estratégia de conteúdo e SEO

Documento de referência. Não vira página no site. Guia as decisões de copy e otimização das demais páginas.

## Objetivo do site

1. **Informar** sobre os serviços de engenharia elétrica que a Rucad presta.
2. **Captar** novos clientes, sendo um dos pontos de contato para aquisição.

A home é objetiva e direciona. O aprofundamento acontece nas páginas de serviço.

## Público (implícito, nunca rotulado no site)

O conteúdo é escrito considerando quatro perfis de decisor, sem nomeá-los:

- Produtor rural que precisa levar ou ampliar energia na propriedade.
- Diretor de construtora/incorporadora que precisa regularizar redes e instalações de loteamentos.
- Gestor de manutenção de indústria/frigorífico que precisa de conformidade e laudos sem parar a planta.
- Gerente de obras de empreiteira que precisa de agilidade no canteiro e ART no prazo.

**Objeções recorrentes a neutralizar no texto:** medo de burocracia e demora, medo de pagar por projeto que não é aprovado, medo de atraso que trava a obra, preço que estoura por falta de levantamento correto, desconfiança de empresa sem estrutura. Preferência forte por indicação e por quem já fez serviço parecido.

**Palavras que conectam:** solução completa, sem burocracia, a gente resolve com a concessionária, dentro do prazo e do orçamento, conformidade, segurança, sem parada, agilidade, resolve no campo, ART no prazo.

## Foco geográfico

**Nacional, sem ênfase regional.** Mantém o posicionamento de atuação em todo o Brasil. A sede em Campo Grande (MS) aparece apenas nos dados de contato e na página Sobre, sem otimizar títulos ou headings para termos locais.

## Tom de voz (resumo operacional)

- Técnica: dados concretos, sem promessa vaga.
- Confiável: firmeza e consistência, prazo e responsável técnico definidos.
- Ousada: posicionamento sem arrogância.
- **A Rucad diz:** "Entregamos antes do prazo." / "Nossa equipe é certificada para esta operação." / "Conte com a Rucad para resolver."
- **A Rucad não diz:** "Somos os melhores do mercado." / "Fazemos tudo que você precisar." / "Preço imbatível."
- Sem tom de vendedor, sem linguagem infantil, sem exagero.

## Palavras-chave por página

Foco em termos de intenção de busca do setor, sem recorte regional.

| Página | Palavra-chave principal | Secundárias |
|---|---|---|
| Home | engenharia elétrica | soluções em engenharia elétrica, empresa de engenharia elétrica |
| Serviços (índice) | serviços de engenharia elétrica | projeto elétrico, laudo elétrico, subestação, energia solar |
| Projetos Elétricos e SPDA | projeto elétrico | projeto SPDA, projeto de para-raios, ART projeto elétrico, projeto elétrico industrial |
| Ensaios, Comissionamento e Laudos | laudo elétrico | comissionamento elétrico, laudo SPDA, ensaio SEP, laudo NR-10 |
| Construção e Manutenção de Redes | construção de redes elétricas | rede de distribuição, subestação de média tensão, manutenção de subestação, rede de loteamento |
| Eficiência Energética | eficiência energética | gestão de energia, redução de custo de energia, diagnóstico energético |
| UFV / Fotovoltaica | usina fotovoltaica | energia solar, projeto fotovoltaico, UFV, instalação de painéis solares |
| Sobre | empresa de engenharia elétrica | Rucad Engenharia, corpo técnico CREA |
| Contato | contato Rucad Engenharia | orçamento engenharia elétrica |

## Padrões técnicos de SEO

- **Title:** até 60 caracteres. Padrão: `<Assunto> · Rucad Engenharia`.
- **Meta description:** 70 a 155 caracteres, com verbo de ação e a palavra-chave principal.
- **Um H1 por página**, contendo a palavra-chave principal de forma natural.
- **URLs** em kebab-case, sem acento (exigência do export estático).
- **Dados estruturados (JSON-LD):**
  - `Organization` / `ProfessionalService` no layout global (nome, logo, telefone, endereço, área de atuação nacional, CREA).
  - `Service` em cada página de serviço.
  - `FAQPage` nas páginas de serviço que têm FAQ (elegível a rich snippet).
  - `BreadcrumbList` nas páginas internas.
- **OpenGraph + Twitter** com título e descrição por página, `locale: pt_BR`.
- **Sitemap.xml e robots.txt** gerados no build.
- **Imagens** com `alt` descritivo e nomes de arquivo com palavra-chave. Placeholders agora, mídia real depois.
- **Performance:** export estático, imagens otimizadas, fontes com `display: swap`. Núcleo do ganho de SEO orgânico frente ao site atual.

## Fora de escopo nesta fase

- Blog / artigos (fase 2).
- Formulário de contato (CTA é WhatsApp).
- Páginas dedicadas por persona.
- Cases / portfólio detalhado de projetos (sem material fechado).

## Pendências de dados (a confirmar com a Rucad)

Reunidas aqui para facilitar a validação. Cada `[COLCHETE]` no conteúdo remete a um destes itens.

- Número real de projetos/obras realizados (site atual diz "500+").
- Índice de satisfação/fidelização real (site atual diz "100%").
- Número do CREA-MS da empresa e do responsável técnico.
- Ano de fundação exato e tamanho atual da equipe.
- Lista de clientes/logos que podem ser exibidos publicamente.
- Números específicos para as provas dos pilares (obras no prazo, tempo médio de resposta, etc.).
