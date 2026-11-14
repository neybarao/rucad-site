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

**Mato Grosso do Sul e imediações.** O foco de busca e de conteúdo é Campo Grande (MS), o estado e as regiões vizinhas (Goiás, Mato Grosso, Paraná e São Paulo, na divisa). Termos locais podem e devem aparecer em títulos, meta descriptions, headings e textos, quando forem naturais: "Campo Grande, MS", "Mato Grosso do Sul". Não repetir a cidade em todo parágrafo; o texto deve soar natural para quem lê.

Regras práticas:
- Títulos de serviço e de conteúdo: incluir a cidade ou o estado quando couber no limite de 60 caracteres.
- Páginas de serviço: citar a atuação em MS e a concessionária local onde fizer sentido (ex.: aprovação e padrão de entrada junto à concessionária).
- Projetos e obras citados: indicar a região sempre que houver dado confirmado. Sem dado, não inventar.
- Termos nacionais continuam válidos quando o assunto for nacional (normas ABNT, NR-10, NBR 5419), mas o público principal é regional.

## Tom de voz (resumo operacional)

- Técnica: dados concretos, sem promessa vaga.
- Confiável: firmeza e consistência, prazo e responsável técnico definidos.
- Ousada: posicionamento sem arrogância.
- **A Rucad diz:** "Entregamos antes do prazo." / "Nossa equipe é certificada para esta operação." / "Conte com a Rucad para resolver."
- **A Rucad não diz:** "Somos os melhores do mercado." / "Fazemos tudo que você precisar." / "Preço imbatível."
- Sem tom de vendedor, sem linguagem infantil, sem exagero.

## Palavras-chave por página

Foco em termos de intenção de busca do setor, com o recorte regional de MS aplicado quando couber. Termos com cidade ou estado (ex.: "engenharia elétrica Campo Grande MS") entram como secundários nas páginas que atendem a região.

| Página | Palavra-chave principal | Secundárias |
|---|---|---|
| Home | engenharia elétrica | soluções em engenharia elétrica, empresa de engenharia elétrica |
| Serviços (índice) | serviços de engenharia elétrica | projeto elétrico, laudo elétrico, subestação, energia solar |
| Projetos Elétricos e SPDA | projeto elétrico | projeto SPDA, projeto de para-raios, ART projeto elétrico, projeto elétrico industrial |
| Ensaios, Comissionamento e Laudos | laudo elétrico | comissionamento elétrico, laudo SPDA, ensaio SEP, laudo NR-10 |
| Construção e Manutenção de Redes | construção de redes elétricas | rede de distribuição, subestação de média tensão, manutenção de subestação, rede de loteamento |
| Eficiência Energética | eficiência energética | gestão de energia, redução de custo de energia, diagnóstico energético |
| UFV / Fotovoltaica | usina fotovoltaica | energia solar, projeto fotovoltaico, UFV, instalação de painéis solares |
| Sobre | empresa de engenharia elétrica | Rucad Engenharia, corpo técnico qualificado |
| Contato | contato Rucad Engenharia | orçamento engenharia elétrica |

## Padrões técnicos de SEO

- **Title:** até 60 caracteres. Padrão: `<Assunto> · Rucad Engenharia`.
- **Meta description:** 70 a 155 caracteres, com verbo de ação e a palavra-chave principal.
- **Um H1 por página**, contendo a palavra-chave principal de forma natural.
- **URLs** em kebab-case, sem acento (exigência do export estático).
- **Dados estruturados (JSON-LD):**
  - `Organization` / `ProfessionalService` no layout global (nome, logo, telefone, endereço, área de atuação Mato Grosso do Sul e região).
  - `Service` em cada página de serviço.
  - `FAQPage` nas páginas de serviço que têm FAQ (elegível a rich snippet).
  - `BreadcrumbList` nas páginas internas.
- **OpenGraph + Twitter** com título e descrição por página, `locale: pt_BR`.
- **Sitemap.xml e robots.txt** gerados no build.
- **Imagens** com `alt` descritivo e nomes de arquivo com palavra-chave. Placeholders agora, mídia real depois.
- **Performance:** export estático, imagens otimizadas, fontes com `display: swap`. Núcleo do ganho de SEO orgânico frente ao site atual.

## Blog e conteúdo (ativo)

- O blog está ativo em `/conteudos/`. Os artigos são guias técnicos que atraem busca orgânica fora da marca e levam ao serviço certo.
- Cada artigo tem palavra-chave principal própria, título com cidade ou estado quando couber, e link para a página de serviço relacionada.
- Evitar sobreposição entre artigos. Antes de criar um novo, conferir os existentes.
- Artigos seguem o padrão de título e meta deste documento e incluem um CTA para o serviço ou para o WhatsApp.

## Fora de escopo nesta fase

- Formulário de contato (CTA é WhatsApp).
- Páginas dedicadas por persona.
- Cases / portfólio detalhado de projetos (sem material fechado).

## Fontes internas e regras de uso

- **Estudo de marketing (planilha):** personas, concorrentes e gaps. Uso interno. Não vai ao site como dado, só orienta o texto e as palavras-chave.
- **Ficha cadastral (PDF):** endereço e data de constituição. Dados pessoais, bancários, fiscais e de contato dos sócios nunca vão ao site.
- **Endereço oficial:** Av. Gunter Hans, 3281, Conjunto Aero Rancho, CEP 79085-108, Campo Grande/MS. Substitui qualquer rascunho anterior.
- **Gap principal:** a empresa tem muitos projetos e nenhum case publicado. Cases com antes e depois, localizados em MS, são a prioridade de prova social. Dependem de fotos e autorização do cliente.
- **Regra "só o necessário":** nada entra no site sem razão ligada a lead, confiança ou busca. Número, prazo ou tempo de mercado sem fonte só entra com confirmação do Ney.

## Pendências de dados (a confirmar com a Rucad)

Reunidas aqui para facilitar a validação. Cada `[COLCHETE]` no conteúdo remete a um destes itens.

- Número real de projetos/obras realizados (site atual diz "500+").
- Índice de satisfação/fidelização real (site atual diz "100%").
- Número do CREA-MS da empresa e do responsável técnico.
- Tamanho atual da equipe. (Ano de fundação: constituída em 06/12/2021, pela ficha cadastral; confirmar se o site usa esse marco.)
- Número do CREA-MS: não consta na ficha cadastral.
- Menção à Energisa MS como concessionária nas páginas: confirmar com o Ney.
- Ano de fundação (constituição em 06/12/2021, pela ficha): confirmar se entra no site.
- Composição societária: fora do site até confirmação. Não há nome de sócio no texto.
- Dados de mercado (MS Trifásico, investimento industrial, eletrificação rural): precisam de fonte antes de qualquer uso.
- Anos de atuação: confirmar.
- Lista de clientes/logos que podem ser exibidos publicamente.
- Números específicos para as provas dos pilares (obras no prazo, tempo médio de resposta, etc.).
