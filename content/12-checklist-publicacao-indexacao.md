# Checklist de publicação e auditoria de indexação

Documento de trabalho. A auditoria só faz sentido depois que o site estiver no domínio final (`rucadengenharia.com.br`). Antes disso, o GitHub Pages serve uma cópia em outro endereço que não deve ser indexada.

## Antes de publicar

- [ ] (Opcional) Imagens de preview por serviço. Os cards e heros usam os modelos 3D.
- [ ] Preencher `datePublished` nos artigos de `content/articles.ts` com a data real de publicação.
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
- [ ] Perfil da Empresa no Google (Google Business Profile) com o mesmo nome, endereço e telefone do site, link para o site e categoria de engenharia elétrica. Costuma pesar muito em buscas como "engenharia elétrica Campo Grande".

### Busca com IA
- [ ] Conferir se `/llms.txt` e `/robots.txt` respondem no domínio final.
- [ ] Testar perguntas reais em ChatGPT (com busca), Perplexity, Gemini e Google (AI Overviews): "empresa de projeto elétrico em Campo Grande", "quem faz laudo SPDA em MS", "construção de rede elétrica rural MS". Registrar se a Rucad aparece e qual página é citada.
- [ ] Repetir o teste mensalmente nos primeiros meses.
