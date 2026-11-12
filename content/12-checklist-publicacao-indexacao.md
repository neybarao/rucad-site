# Checklist de publicação e auditoria de indexação

Documento de trabalho. A auditoria só faz sentido depois que o site estiver no domínio final (`rucadengenharia.com.br`). Antes disso, o GitHub Pages serve uma cópia em outro endereço que não deve ser indexada.

## Antes de publicar

- [x] `public/hero-bg.png` (7,9 MB, sem uso) removido.
- [x] FAQ na home e nomes dos clientes em texto.
- [x] 9 artigos novos da estratégia editorial (fatos normativos conferidos em 11/11/2026; ver cabeçalho de `content/articles-extra.ts`).

- [ ] (Opcional) Imagens de preview por serviço. Os cards e heros usam os modelos 3D.
- [x] `datePublished` preenchido com 2026-11-12 em todos os artigos (`content/articles.ts` e `content/articles-extra.ts`). Se a publicação for em outra data, trocar a constante `PUBLISHED` e a data do checklist de subestação.
- [x] Área de atendimento confirmada: MS e estados vizinhos (MT, GO, MG, SP, PR). Aplicada no schema, no contato e no llms.txt.
- [x] Horário confirmado: segunda a sexta, 7h30 às 17h30. Aplicado no schema, no contato e no rodapé.
- [x] Números do StatsBar e logos de clientes confirmados pela Rucad.
- [ ] Build de produção sem `DEPLOY_TARGET=pages` (sem basePath) e deploy no host do domínio.
- [ ] Configurar redirecionamentos 301 das URLs do site antigo para as novas, se o site antigo tiver páginas indexadas. Levantar as URLs antigas no Search Console ou com `site:rucadengenharia.com.br` antes de trocar.
- [ ] Garantir que o GitHub Pages não fique público como cópia duplicada depois da migração (desativar ou apontar canonical, que já aponta para o domínio final).

## Depois de publicar (auditoria de indexação)

### Google Search Console
- [ ] Verificar a propriedade de domínio (registro TXT no Registro.br).
- [ ] Enviar `https://rucadengenharia.com.br/sitemap.xml`.
- [ ] Inspeção de URL na home, em `/servicos/` e nas 5 páginas de serviço. Pedir indexação.
- [ ] Conferir em 1 a 2 semanas: relatório de Páginas (indexadas x não indexadas e motivos), canonical escolhido pelo Google x canonical declarado.
- [ ] Relatório de Melhorias: breadcrumbs e dados estruturados sem erro.

### Bing Webmaster Tools
- [ ] Importar a propriedade do Search Console e enviar o sitemap. O índice do Bing alimenta parte das buscas com IA (ex.: Copilot e outros assistentes que usam Bing).

### Dados estruturados e compartilhamento
- [ ] Rich Results Test em uma página de serviço e no artigo.
- [ ] Schema Markup Validator (validator.schema.org) na home.
- [ ] Testar o preview de link no WhatsApp e no LinkedIn (imagem OG).

### Performance
- [ ] PageSpeed Insights na home e em uma página de serviço (mobile). Atenção ao LCP do hero.
- [ ] Depois de ~28 dias de tráfego, olhar Core Web Vitals no Search Console.

### Presença local
- [x] Perfil da Empresa no Google existe (12 avaliações, nota 5). Nome, endereço, telefone e horário batem com o site. Link incluído no schema (`sameAs`).
- [ ] No painel do perfil: trocar a categoria principal de "Empreiteira" para uma de engenharia elétrica, apontar o campo Site para o domínio novo e conferir o horário de segunda a sexta, 7h30 às 17h30.

### Busca com IA
- [ ] Conferir se `/llms.txt` e `/robots.txt` respondem no domínio final.
- [ ] Testar perguntas reais em ChatGPT (com busca), Perplexity, Gemini e Google (AI Overviews): "empresa de projeto elétrico em Campo Grande", "quem faz laudo SPDA em MS", "construção de rede elétrica rural MS". Registrar se a Rucad aparece e qual página é citada.
- [ ] Repetir o teste mensalmente nos primeiros meses.
