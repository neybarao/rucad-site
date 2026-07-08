# Spec técnica — Site Rucad Engenharia

Data: 2026-07-07
Status: aprovada para planejamento

## 1. Objetivo

Construir o novo site institucional da Rucad Engenharia, substituindo rucadengenharia.com.br. Metas: (1) informar sobre os serviços, (2) captar clientes via WhatsApp, (3) corrigir a fraqueza de SEO orgânico do site atual, (4) refletir a nova identidade de marca.

Conteúdo (copy) já aprovado e versionado em `content/*.md`. Esta spec cobre a arquitetura técnica de implementação.

## 2. Stack

- **Framework:** Next.js 16, App Router, `output: "export"` (site 100% estático, uma página HTML pré-renderada por rota).
- **CSS:** custom properties em `app/globals.css`. Sem Tailwind.
- **Fontes:** `next/font/google` — Anek Latin (headings) e DM Sans (body). Genos e DM Mono ficam de fora nesta versão.
- **Animação:** GSAP + ScrollTrigger. Site propositalmente dinâmico: micro-interações e animações de scroll são parte da identidade, não enfeite. Ver seção 6.1.
- **JS:** enxuto, mas com camada de animação. Client components onde há interação ou animação (menu mobile, acordeão de FAQ, seções com scroll reveal, banner de cookies se necessário).
- **Node:** 22.x. Gerenciador: npm.

## 3. Rotas (App Router)

```
app/
  layout.tsx                        → layout global (fontes, header, footer, JSON-LD org, metadata base)
  page.tsx                          → Home  (/)
  servicos/
    page.tsx                        → Índice de serviços  (/servicos)
    projetos-eletricos-spda/page.tsx
    ensaios-comissionamento-laudos/page.tsx
    construcao-manutencao-redes/page.tsx
    eficiencia-energetica/page.tsx
    ufv-fotovoltaica/page.tsx
  sobre/page.tsx
  contato/page.tsx
  sitemap.ts                        → gera sitemap.xml
  robots.ts                         → gera robots.txt
  not-found.tsx                     → 404
```

URLs em kebab-case sem acento (exigência do export estático e boa prática de SEO).

## 4. Arquitetura de conteúdo

Separar copy/dados de apresentação. As páginas de serviço compartilham a mesma anatomia, então são orientadas a dados.

```
content/
  site-data.ts        → dados globais: contato, WhatsApp, endereço, CREA, redes, stats. Placeholders [A CONFIRMAR] aqui.
  services.ts         → array tipado das 5 linhas de serviço: slug, título, SEO, hero, "o que inclui",
                        etapas, diferenciais, FAQ[]. Fonte única para cards da home, índice e páginas.
```

- Cada página de serviço lê seu objeto de `services.ts` pelo slug e renderiza com um template compartilhado (`ServicePage`).
- Os cards de serviço na Home e no índice mapeiam o mesmo array. Sem duplicação de texto.
- Os blocos SEO dos MD viram os objetos `metadata` e os dados de FAQ viram tanto UI quanto JSON-LD `FAQPage`.

## 5. Componentes

Reutilizáveis, uma responsabilidade cada, em `app/components/`:

| Componente | Papel | Client? |
|---|---|---|
| `Header` | Nav fixa, logo, links, CTA WhatsApp; menu hamburguer no mobile | sim (toggle menu) |
| `Footer` | Contato, nav, redes, CREA, endereço | não |
| `Hero` | Chapéu + H1 + subtítulo + CTAs; variante com mídia de fundo | não |
| `StatsBar` | Barra de números (prova rápida) | não |
| `ServiceCard` | Card de serviço (título, resumo, link) | não |
| `ServicesGrid` | Grade das 5 linhas, alimentada por `services.ts` | não |
| `ProcessSteps` | Lista numerada de etapas | não |
| `Pillars` | Os 3 pilares (técnica, confiável, ousada) | não |
| `FAQ` | Acordeão de perguntas; emite também JSON-LD FAQPage | sim (acordeão) |
| `CTASection` | Bloco de chamada final + WhatsApp | não |
| `WhatsAppButton` | Link `wa.me` com mensagem pré-preenchida por contexto | não |
| `Breadcrumbs` | Trilha nas páginas internas + JSON-LD BreadcrumbList | não |
| `ServicePage` | Template que compõe uma página de serviço a partir de um objeto de serviço | não |
| `JsonLd` | Helper que injeta `<script type="application/ld+json">` | não |

## 6. Design system (globals.css)

Tokens derivados de `Rucad Brand Guidelines/BRAND-GUIDELINES.md`.

```css
:root {
  /* Blue */
  --blue-900:#020913; --blue-800:#062141; --blue-700:#0B386F; --blue-600:#10509E;
  --blue-500:#1467CC; --blue-400:#2A80EA; --blue-300:#589CF0; --blue-200:#86B7F3;
  --blue-100:#B5D3F8; --blue-50:#E3EEFC;
  /* Yellow */
  --yellow-300:#FDF24E; --yellow-400:#EDD700; /* + escala conforme necessário */
  /* Gray */
  --gray-900:#020913; --gray-800:#373C41; --gray-700:#5E666F; --gray-600:#86919E;
  --gray-500:#B8C1CC; --gray-400:#DEE4EA; --gray-300:#E3E8EE; --gray-200:#EEF0F3;
  --gray-100:#F3F6F8; --gray-50:#F7F9FC;
  /* Papéis */
  --brand-primary: var(--blue-800);
  --brand-secondary: var(--yellow-300);
  --brand-tertiary: var(--gray-600);
  --font-heading: 'Anek Latin', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

Regras de cor do guideline respeitadas: vermelho proibido; amarelo nunca como fundo de grande área; sem gradientes na paleta; `Yellow/300` sobre escuro, `Yellow/400` sobre claro. Um único H1 por página. Breakpoint responsivo alvo: 860px (padrão do projeto irmão).

## 6.1 Animação e micro-interações (GSAP)

O site deve transmitir energia e movimento ("A Rucad não pára"), sem cair em excesso que atrapalhe leitura ou performance. GSAP + ScrollTrigger como base.

**Setup técnico:**
- GSAP registrado uma única vez num provider/hook client (`useGsap` ou `<AnimationProvider>`); ScrollTrigger registrado junto.
- Elementos animados começam em estado inicial via CSS (ex.: `.reveal { opacity: 0 }`) e são revelados quando o ScrollTrigger dispara, para não haver "flash" de conteúdo. Fallback: se JS falhar, conteúdo permanece visível (progressive enhancement — o estado `opacity:0` só é aplicado quando o JS de animação carrega, ou via classe adicionada no client).
- `prefers-reduced-motion`: respeitado. Quando ativo, animações são desligadas/reduzidas a fades curtos. Requisito de acessibilidade.
- Animações não bloqueiam SEO: todo o conteúdo é renderizado no HTML estático; GSAP só anima o que já existe no DOM.

**Padrões de animação previstos:**
- **Scroll reveals:** títulos, cards e blocos entram com fade + leve translate/stagger ao entrarem na viewport.
- **Hero:** entrada sequenciada (chapéu, H1, subtítulo, CTAs) no load; mídia de fundo com leve parallax no scroll.
- **StatsBar:** contadores numéricos animados (count-up) quando entram na tela.
- **Grade de serviços:** stagger na entrada; hover com micro-interação (elevação, borda/acento, ícone).
- **Marquee/logos:** faixa de logos de clientes em loop contínuo.
- **Micro-interações de UI:** botões (CTA/WhatsApp) com feedback de hover/press; acordeão de FAQ com transição de altura suave; header que reage ao scroll (encolhe/muda de fundo).
- **Transições de âncora e foco** suaves onde fizer sentido.

**Limites (para não virar poluição):**
- Nada de animação que atrase o primeiro conteúdo útil acima da dobra além do necessário.
- Durações curtas (tipicamente 0.2–0.8s), easing consistente definido como token.
- Performance mobile é prioridade: animar `transform` e `opacity` (aceleradas por GPU), evitar animar layout.

**Componentes afetados:** todos os de apresentação da seção 5 ganham, quando aplicável, um wrapper de reveal. O `FAQ`, `Header`, `StatsBar` e `ServicesGrid`/`ServiceCard` passam a ser client components por causa da interação/animação.

## 7. SEO (prioridade do projeto)

- **Metadata por rota** via `export const metadata` (App Router), com os title/description já escritos nos MD. Padrão de title: `<Assunto> · Rucad Engenharia`, máx. 60 chars. Description 70-155 chars.
- **OpenGraph + Twitter** por rota, `locale: pt_BR`, imagem OG default + por página quando houver.
- **JSON-LD:**
  - `Organization` / `ProfessionalService` no layout global (nome, logo, telefone, e-mail, endereço, `areaServed: BR`, CREA quando confirmado).
  - `Service` em cada página de serviço.
  - `FAQPage` nas páginas de serviço (elegível a rich snippet).
  - `BreadcrumbList` nas páginas internas.
- **`sitemap.ts` + `robots.ts`** gerando sitemap.xml e robots.txt no build.
- **Imagens** com `alt` descritivo, `next/image` desabilitado de otimização em runtime (export estático) — usar imagens já otimizadas em `public/`.
- **Performance:** fontes com `display: swap` e subset latin; CSS enxuto. GSAP é a única lib de peso; carregada só no client, sem bloquear o HTML nem o conteúdo indexável (ver 6.1). Animar só `transform`/`opacity`. Núcleo do ganho de SEO frente ao site atual continua sendo o HTML estático pré-renderado.
- **Foco geográfico:** nacional (Brasil), sem otimização para termos locais de MS. Sede aparece só em contato/Sobre.

## 8. Captação / conversão

- WhatsApp é o CTA principal (sem formulário nesta fase).
- `WhatsAppButton` monta `https://wa.me/55<DDD><numero>?text=<mensagem>` com mensagem pré-preenchida conforme o contexto (ex.: na página de UFV, "Olá, tenho interesse em usina fotovoltaica").
- Número em `site-data.ts` (hoje (67) 99650-6767 — confirmar se WhatsApp e telefone são o mesmo).

## 9. Deploy

- **Fase 1 (validação):** GitHub Pages via GitHub Actions. Repo novo no GitHub (conta `neybarao`). Deploy automático a cada push na `main`. URL de teste do GitHub Pages para o usuário aprovar. `basePath`/`assetPrefix` ajustados se publicado em subpath do github.io; se usar domínio/CNAME próprio de teste, não precisa.
- **Fase 2 (produção):** migrar o export estático para o host atual de rucadengenharia.com.br. Como é `output: "export"`, o resultado é uma pasta `out/` estática que sobe em qualquer host. A migração de DNS/host fica para o fim, com o cliente.
- `output: "export"` mantém o site portável entre os dois cenários sem reescrita.

## 10. Dados a confirmar (não bloqueiam o build; ficam como placeholders em `site-data.ts`)

- Número real de obras/projetos, % de entrega no prazo, km de rede, % de equipe certificada.
- CREA-MS da empresa e do responsável técnico.
- Endereço da sede (pode ter mudado — briefing menciona possível nova sede).
- Confirmar se telefone e WhatsApp são o mesmo número; horário de atendimento.
- Logos de clientes autorizados para exibição pública; depoimentos.

## 11. Fora de escopo (fase 1)

- Blog / artigos.
- Formulário de contato.
- Páginas por persona.
- Portfólio detalhado de cases.
- Multi-idioma.

## 12. Estrutura de pastas final (resumo)

```
rucad-site/
  app/
    layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts, not-found.tsx
    servicos/ (index + 5 subrotas)
    sobre/, contato/
    components/ (ver seção 5)
  content/         (MD de referência + site-data.ts + services.ts)
  public/          (logos, imagens, favicon, CNAME quando aplicável)
  docs/superpowers/specs/
  .github/workflows/deploy.yml
  next.config.ts, package.json, tsconfig.json
```
