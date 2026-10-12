# Plano SEO/AEO para Conteudos Rucad

Documento de trabalho para orientar a revisao das paginas atuais e a criacao de novos conteudos. Nao vira pagina publica sem revisao.

## Criterio editorial

O conteudo deve nascer para responder uma duvida real do cliente, nao apenas para ocupar uma palavra-chave. O criterio operacional e:

- SEO: a pagina precisa ter uma intencao de busca clara, title/meta objetivos, H1 especifico, estrutura com H2 e links internos.
- AEO: a pagina precisa responder perguntas em linguagem direta, com trechos que possam ser entendidos fora do contexto da pagina.
- Comercial: todo conteudo deve conduzir para uma pagina de servico ou WhatsApp, sem virar texto generico de blog.
- Confianca: evitar promessas absolutas, alarmismo e numeros sem fonte confirmada.

## Personas e dores que devem guiar os conteudos

### Produtor rural

Busca energia funcionando na propriedade, sem travar na concessionaria e sem pagar por projeto que nao seja aprovado.

Linguagem que conecta:

- projeto eletrico rural
- rede eletrica rural
- transformador para fazenda
- regularizacao com concessionaria
- aprovacao e ligacao de energia
- ART do engenheiro responsavel

Conteudos devem responder:

- Por onde comecar?
- O que precisa para a concessionaria aprovar?
- Como dimensionar transformador, rede e carga?
- Quanto da burocracia a Rucad resolve?

### Construtora ou incorporadora

Busca regularizar rede, loteamento ou instalacao sem atraso, multa, embargo ou surpresa no preco.

Linguagem que conecta:

- rede eletrica para loteamento
- infraestrutura eletrica de loteamento
- projeto, execucao e documentacao
- prazo e orcamento definidos
- regularizacao com concessionaria, prefeitura, bombeiros e fiscalizacao

Conteudos devem responder:

- Quais etapas existem em uma rede de loteamento?
- Que documentos precisam estar prontos antes da entrega?
- Como evitar preco que estoura no meio da obra?
- Quais responsabilidades ficam com a empresa de engenharia?

### Industria, frigorifico e manutencao

Busca conformidade, laudos e manutencao sem parada de planta.

Linguagem que conecta:

- laudo eletrico
- laudo NR-10
- laudo SPDA
- comissionamento eletrico
- manutencao de subestacao
- ensaios eletricos
- parada nao programada

Conteudos devem responder:

- Que laudos a fiscalizacao pode exigir?
- Quando fazer comissionamento?
- O que deve constar no relatorio?
- Como planejar ensaio sem parar a planta?

### Empreiteira e obras industriais

Busca agilidade no canteiro, ART no prazo e fornecedor que resolva no campo.

Linguagem que conecta:

- projeto eletrico para canteiro de obra
- SPDA para obra industrial
- laudo para liberar fiscalizacao
- ART no prazo
- atendimento no interior
- obra industrial no MS

Conteudos devem responder:

- O que precisa para nao travar o cronograma?
- Quais documentos liberam a proxima etapa?
- Como evitar retrabalho por levantamento mal feito?

## Arquitetura recomendada

### Money pages atuais

Estas paginas devem continuar sendo as paginas comerciais principais:

- `/servicos/projetos-eletricos-spda`
- `/servicos/ensaios-comissionamento-laudos`
- `/servicos/construcao-manutencao-redes`
- `/servicos/eficiencia-energetica`
- `/servicos/ufv-fotovoltaica`

Artigos nao devem competir diretamente com elas. O papel do artigo e capturar duvidas especificas e direcionar para a pagina de servico.

### Novo hub de conteudo

Criar uma area `/conteudos` quando houver pelo menos tres artigos prontos. Antes disso, manter os rascunhos em `content/` e implementar a rota somente quando o padrao estiver aprovado.

Estrutura sugerida:

- `/conteudos`
- `/conteudos/checklist-instalacao-subestacao`
- `/conteudos/projeto-eletrico-rural`
- `/conteudos/laudo-nr-10`

## Gaps atuais

### Tecnicos

- Nao existe ainda uma area de conteudos/artigos.
- O sitemap so inclui rotas estaticas e servicos. Quando houver conteudos, precisa incluir as novas rotas.
- As paginas de servico ja usam `Service` e `FAQPage`, o que e bom. Para artigos, avaliar `Article` e `FAQPage` somente quando houver FAQ oficial escrito pela Rucad.
- Metadados de artigos ainda nao existem.
- Imagens especificas por conteudo ainda nao existem.

### Conteudo

- O site atual esta forte em servicos, mas ainda fraco em educacao do cliente.
- O principal gap competitivo apontado pela pesquisa e ausencia de cases publicados.
- Existe oportunidade de conteudo tecnico para Google, especialmente NR-10, SPDA, laudos, subestacoes e eletrificacao rural.
- Conteudos devem mostrar experiencia pratica da Rucad, nao apenas explicar norma de forma generica.

### Dados a validar antes de publicar

Nao publicar como fato sem verificacao:

- percentuais de mercado
- valores de investimento regional
- datas de programas publicos
- obrigatoriedades normativas detalhadas
- numeros historicos de satisfacao
- clientes/cases sem autorizacao

## Priorizacao editorial

### Prioridade 1

1. Checklist para instalacao de subestacao
   - URL: `/conteudos/checklist-instalacao-subestacao`
   - Persona principal: industria/frigorifico e obra industrial
   - Servicos conectados: construcao de redes e subestacoes; ensaios, comissionamento e laudos
   - Intencao: usuario quer saber o que exigir antes de contratar ou receber a obra
   - CTA: falar com engenheiro para instalar, comissionar ou regularizar subestacao

2. Projeto eletrico rural
   - URL: `/conteudos/projeto-eletrico-rural`
   - Persona principal: produtor rural
   - Servicos conectados: projetos eletricos e SPDA; construcao e manutencao de redes
   - Intencao: usuario quer entender como aprovar, construir e ligar energia na propriedade
   - CTA: levantamento no local e projeto com ART

3. Laudo NR-10
   - URL: `/conteudos/laudo-nr-10`
   - Persona principal: industria/frigorifico
   - Servicos conectados: ensaios, comissionamento e laudos
   - Intencao: usuario quer saber quando precisa, o que contem e como se preparar para fiscalizacao
   - CTA: avaliacao no local e laudo com ART

### Prioridade 2

4. Rede eletrica para loteamento
   - Persona: construtora/incorporadora
   - Servicos conectados: construcao e manutencao de redes; projetos eletricos

5. Comissionamento eletrico de subestacao
   - Persona: industria e obra industrial
   - Servicos conectados: ensaios, comissionamento e laudos; construcao e manutencao de redes

6. Manutencao de subestacao
   - Persona: manutencao industrial
   - Servicos conectados: construcao e manutencao de redes; ensaios e laudos

### Prioridade 3

7. SPDA: o que e, quando fazer e por que o laudo importa
8. ART em projeto eletrico: o que ela garante e por que exigir
9. Como evitar atraso eletrico em obras industriais
10. Mercado Livre de Energia: o que revisar na infraestrutura eletrica

## Reescrita do ARTIGOS.md

O artigo atual deve ser preservado como fonte de ideias, mas nao publicado no formato atual.

Problemas principais:

- titulo longo demais
- tom sensacionalista
- promessas e riscos descritos de forma absoluta
- falta de title/meta/FAQ/CTA
- falta de links internos
- falta de separacao entre requisito legal, boa pratica e recomendacao da Rucad

Versao recomendada:

- Title: `Checklist para instalacao de subestacao`
- Meta description: `Veja documentos, ensaios e laudos que ajudam a receber uma subestacao com seguranca, ART e conformidade. Checklist tecnico da Rucad.`
- H1: `Checklist para instalacao de subestacao: 8 itens que voce deve exigir`
- CTA inicial: `Vai instalar, ampliar ou regularizar uma subestacao? Fale com um engenheiro da Rucad.`

Estrutura sugerida:

1. Introducao: por que subestacao nao pode ser recebida so "ligando e testando".
2. Checklist resumido.
3. Oito secoes, uma por item:
   - prontuario das instalacoes eletricas
   - estudo de coordenacao e seletividade
   - relatorio de comissionamento
   - laudo de aterramento e SPDA quando aplicavel
   - termografia na entrega quando houver operacao sob carga
   - ensaios de cabos, oleo e isolacao quando aplicavel
   - treinamento operacional
   - ART de projeto e execucao
4. O que a Rucad entrega.
5. FAQ.
6. CTA final.

## Modelo de pagina de conteudo

Cada artigo deve seguir este esqueleto:

```md
# [H1 com intencao clara]

**Rota:** `/conteudos/[slug]`

## Bloco SEO

- **Title:** `[ate 60 caracteres]`
- **Meta description:** `[70 a 155 caracteres]`
- **Palavra-chave principal:** `[termo]`
- **Secundarias:** `[termos]`
- **Servico relacionado:** `[servico]`
- **Persona principal:** `[persona]`

## Resposta curta para AEO

Paragrafo de 40 a 70 palavras respondendo a pergunta principal de forma direta.

## Secoes

H2 por pergunta ou etapa.

## FAQ

Perguntas reais que a Rucad consegue responder oficialmente.

## CTA

Chamada conectada ao servico relacionado.
```

## Regras de escrita

- Comecar com resposta direta, depois aprofundar.
- Usar frases curtas, mas sem simplificar demais a tecnica.
- Trocar medo por criterio tecnico.
- Evitar "ninguem te conta", "voce sera responsabilizado" e afirmacoes absolutas sem fonte.
- Dizer "pode", "ajuda a", "reduz o risco", quando a consequencia depende do caso.
- Quando houver norma, laudo ou obrigacao legal, marcar para verificacao tecnica antes de publicar.
- Linkar sempre para uma pagina de servico relacionada.
- Fechar com CTA de WhatsApp e promessa operacional concreta: levantamento, proposta, prazo, ART, laudo ou regularizacao.

## Checklist antes de publicar

- O title e unico e descreve a pagina?
- A meta description ajuda o usuario a decidir clicar?
- O H1 responde a intencao principal?
- Ha uma resposta curta no inicio?
- O texto demonstra experiencia pratica da Rucad?
- Ha links internos para servicos?
- Ha FAQ com perguntas oficiais e respostas claras?
- O CTA esta conectado ao problema do artigo?
- Algum numero ou afirmacao tecnica precisa de fonte primaria?
- O sitemap inclui a rota?
