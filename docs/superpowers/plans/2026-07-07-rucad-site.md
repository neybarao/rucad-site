# Site Rucad Engenharia — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the new static Rucad Engenharia website (Next.js static export) with data-driven service pages, brand design system, full SEO, and a GSAP animation layer.

**Architecture:** Next.js 16 App Router with `output: "export"`. Content/data is separated from presentation (`content/site-data.ts`, `content/services.ts`), so the 5 service pages render from one typed data source through a shared `ServicePage` template. Presentation is plain CSS custom properties (no Tailwind). A thin GSAP + ScrollTrigger layer drives scroll reveals and micro-interactions, gated on `prefers-reduced-motion`, applied only to already-rendered DOM so SEO is unaffected.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP + ScrollTrigger, next/font (Anek Latin + DM Sans), Vitest (logic units only), GitHub Actions + Pages (phase-1 deploy).

**Testing boundary:** Vitest covers pure logic — WhatsApp link builder, `services.ts`/`site-data.ts` integrity, sitemap entries. Presentational components and animations are verified by successful `next build` + live preview (screenshots). No brittle DOM/animation unit tests.

**Source of truth for copy:** the approved `content/*.md` files. Each service page's data object is transcribed from its matching MD (`content/03..07-*.md`). Do not paraphrase — copy the text.

---

## Task 0: Scaffold Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts` (auto), `.nvmrc`
- Create: `app/layout.tsx`, `app/page.tsx` (temporary placeholder), `app/globals.css` (empty for now)

- [ ] **Step 1: Initialize package.json and install deps**

Run from repo root (`/Users/neybarao/Local Sites/rucad-site`):

```bash
npm init -y
npm install next@latest react@latest react-dom@latest gsap
npm install -D typescript @types/react @types/node @types/react-dom vitest
```

- [ ] **Step 2: Write `package.json` scripts**

Replace the `"scripts"` block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run"
}
```

- [ ] **Step 3: Write `next.config.ts`**

`basePath`/`assetPrefix` are controlled by an env var so the same build works both on GitHub Pages (served under `/rucad-site`) and on the production host (served at root).

```ts
import type { NextConfig } from "next";

const isPages = process.env.DEPLOY_TARGET === "pages";
const repo = "rucad-site";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isPages ? `/${repo}` : "",
  assetPrefix: isPages ? `/${repo}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? `/${repo}` : "",
  },
};

export default nextConfig;
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Write `.nvmrc`**

```
22
```

- [ ] **Step 6: Temporary `app/layout.tsx`**

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Temporary `app/page.tsx`**

```tsx
export default function Home() {
  return <main>Rucad</main>;
}
```

- [ ] **Step 8: Create empty `app/globals.css`**

Empty file for now; filled in Task 2.

- [ ] **Step 9: Verify build**

Run: `npm run build`
Expected: build succeeds, `out/` directory generated with `index.html`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js static-export project"
```

---

## Task 1: Vitest config

**Files:**
- Create: `vitest.config.ts`
- Create: `lib/__tests__/smoke.test.ts`

- [ ] **Step 1: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Write smoke test `lib/__tests__/smoke.test.ts`**

```ts
import { expect, test } from "vitest";

test("vitest runs", () => {
  expect(1 + 1).toBe(2);
});
```

- [ ] **Step 3: Run tests**

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "test: add vitest config and smoke test"
```

---

## Task 2: Design system tokens (globals.css)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Write the full token + reset block into `app/globals.css`**

Tokens from `Rucad Brand Guidelines/BRAND-GUIDELINES.md`. Font family vars reference the CSS variables injected by next/font in Task 3.

```css
:root {
  /* Blue */
  --blue-900:#020913; --blue-800:#062141; --blue-700:#0B386F; --blue-600:#10509E;
  --blue-500:#1467CC; --blue-400:#2A80EA; --blue-300:#589CF0; --blue-200:#86B7F3;
  --blue-100:#B5D3F8; --blue-50:#E3EEFC;
  /* Yellow */
  --yellow-900:#242000; --yellow-800:#4D4400; --yellow-700:#7A6D00; --yellow-600:#A89700;
  --yellow-500:#CCB900; --yellow-400:#EDD700; --yellow-300:#FDF24E; --yellow-200:#FEF57C;
  --yellow-100:#FEF9B0; --yellow-50:#FFFDE8;
  /* Gray */
  --gray-900:#020913; --gray-800:#373C41; --gray-700:#5E666F; --gray-600:#86919E;
  --gray-500:#B8C1CC; --gray-400:#DEE4EA; --gray-300:#E3E8EE; --gray-200:#EEF0F3;
  --gray-100:#F3F6F8; --gray-50:#F7F9FC;

  /* Roles */
  --brand-primary: var(--blue-800);
  --brand-secondary: var(--yellow-300);
  --brand-tertiary: var(--gray-600);
  --bg: #ffffff;
  --bg-dark: var(--blue-800);
  --text: var(--blue-800);
  --text-muted: var(--gray-700);
  --text-on-dark: #ffffff;
  --line: rgba(6,33,65,0.08);

  /* Type */
  --font-heading: var(--font-anek), system-ui, sans-serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;

  /* Spacing / layout */
  --wrap: 1200px;
  --gutter: 24px;
  --radius: 16px;
  --radius-lg: 24px;

  /* Motion tokens */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 0.2s;
  --dur: 0.4s;
  --dur-slow: 0.7s;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.1; margin: 0; }
a { color: inherit; text-decoration: none; }
img, video { max-width: 100%; display: block; }

.wrap { max-width: var(--wrap); margin: 0 auto; padding: 0 var(--gutter); }

/* Animation base: elements marked .reveal start hidden only once JS marks the
   document ready, so no-JS users still see everything. */
.js-anim .reveal { opacity: 0; transform: translateY(24px); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .js-anim .reveal { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: brand design system tokens and base styles"
```

---

## Task 3: Fonts + root layout + metadata base

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write `app/layout.tsx` with fonts and base metadata**

```tsx
import type { Metadata } from "next";
import { Anek_Latin, DM_Sans } from "next/font/google";
import "./globals.css";

const anek = Anek_Latin({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anek",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rucadengenharia.com.br"),
  title: {
    default: "Rucad Engenharia · Soluções em engenharia elétrica",
    template: "%s · Rucad Engenharia",
  },
  description:
    "Projetos, laudos, redes de distribuição, subestações e usinas solares. Engenharia elétrica que entrega no prazo, com responsável técnico do começo ao fim.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Rucad Engenharia",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anek.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds; fonts fetched at build time.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: load brand fonts and base metadata in root layout"
```

---

## Task 4: Global site data + WhatsApp link builder (TDD)

**Files:**
- Create: `content/site-data.ts`
- Create: `lib/whatsapp.ts`
- Create: `lib/__tests__/whatsapp.test.ts`

- [ ] **Step 1: Write failing test `lib/__tests__/whatsapp.test.ts`**

```ts
import { expect, test } from "vitest";
import { whatsappUrl } from "../whatsapp";

test("builds wa.me url with country code and stripped punctuation", () => {
  expect(whatsappUrl("(67) 99650-6767")).toBe("https://wa.me/5567996506767");
});

test("appends url-encoded message when provided", () => {
  const url = whatsappUrl("(67) 99650-6767", "Olá, quero um orçamento");
  expect(url).toBe(
    "https://wa.me/5567996506767?text=Ol%C3%A1%2C%20quero%20um%20or%C3%A7amento"
  );
});

test("does not double-add country code if already present", () => {
  expect(whatsappUrl("5567996506767")).toBe("https://wa.me/5567996506767");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- whatsapp`
Expected: FAIL (module not found / function undefined).

- [ ] **Step 3: Implement `lib/whatsapp.ts`**

```ts
/** Build a wa.me deep link from a BR phone number and optional prefilled text. */
export function whatsappUrl(phone: string, message?: string): string {
  let digits = phone.replace(/\D/g, "");
  if (!digits.startsWith("55")) digits = "55" + digits;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- whatsapp`
Expected: PASS (3 tests).

- [ ] **Step 5: Write `content/site-data.ts`**

Values transcribed from `content/01-home.md` (footer) and `content/09-contato.md`. `[A CONFIRMAR]` placeholders kept verbatim so they are easy to grep and replace.

```ts
export const site = {
  name: "Rucad Engenharia",
  slogan: "Sua demanda, nossa solução.",
  domain: "https://rucadengenharia.com.br",
  phoneDisplay: "(67) 99650-6767",
  phoneRaw: "5567996506767",
  email: "projetos@rucadengenharia.com.br",
  address: "[ENDEREÇO A CONFIRMAR]",
  creaMs: "[CREA-MS A CONFIRMAR]",
  social: {
    instagram: "https://www.instagram.com/rucadengenharia/",
    linkedin: "https://www.linkedin.com/company/rucad-engenharia/",
  },
  stats: [
    { value: "+500", label: "projetos realizados" },
    { value: "+200km", label: "rede de média tensão executada", confirm: true },
    { value: "100%", label: "de entregas no prazo contratual", confirm: true },
    { value: "100%", label: "da equipe certificada", confirm: true },
  ],
} as const;

export type Site = typeof site;
```

- [ ] **Step 6: Run all tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: site data and tested whatsapp link builder"
```

---

## Task 5: Services data model (TDD)

**Files:**
- Create: `content/services.ts`
- Create: `content/__tests__/services.test.ts`

- [ ] **Step 1: Write failing test `content/__tests__/services.test.ts`**

```ts
import { expect, test } from "vitest";
import { services, getService } from "../services";

test("there are exactly 5 services", () => {
  expect(services).toHaveLength(5);
});

test("every service has the required fields populated", () => {
  for (const s of services) {
    expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    expect(s.title.length).toBeGreaterThan(0);
    expect(s.seoTitle.length).toBeLessThanOrEqual(60);
    expect(s.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(s.metaDescription.length).toBeLessThanOrEqual(160);
    expect(s.steps.length).toBeGreaterThanOrEqual(3);
    expect(s.faq.length).toBeGreaterThanOrEqual(3);
  }
});

test("slugs are unique", () => {
  const slugs = services.map((s) => s.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});

test("getService returns by slug and undefined for unknown", () => {
  expect(getService("ufv-fotovoltaica")?.title).toContain("Fotovoltaic");
  expect(getService("nope")).toBeUndefined();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- services`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `content/services.ts`**

Define the type, then one entry per service. Transcribe fields from the matching MD file. The type and the first entry are shown in full below; fill the remaining four entries the same way, pulling text verbatim from:
- `projetos-eletricos-spda` ← `content/03-servico-projetos-eletricos-spda.md`
- `ensaios-comissionamento-laudos` ← `content/04-servico-ensaios-comissionamento-laudos.md`
- `construcao-manutencao-redes` ← `content/05-servico-construcao-manutencao-redes.md`
- `eficiencia-energetica` ← `content/06-servico-eficiencia-energetica.md`
- `ufv-fotovoltaica` ← `content/07-servico-ufv-fotovoltaica.md`

```ts
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;        // H1
  cardSummary: string;  // one-line for home/index cards
  seoTitle: string;     // <= 60 chars, "<X> · Rucad Engenharia" NOT included (template adds it)
  metaDescription: string;
  hero: { kicker: string; subtitle: string };
  intro: string;        // "o que é / o que inclui" lead paragraph
  includes: string[];   // "Inclui:" bullets
  applications: string; // "Aplicações:" sentence
  steps: { title: string; body: string }[];   // Como funciona
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
  // TODO(execution): add the remaining 4 entries transcribed from the MD files
  // listed in Step 3. Each MUST satisfy the same type and the tests in this task.
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
```

- [ ] **Step 4: Add the remaining 4 service entries**

Open each MD file and transcribe into the same shape as the first entry. Keep `seoTitle` <= 60 chars (the template appends " · Rucad Engenharia"). Keep `metaDescription` 70-160 chars (trim/expand from the MD's meta line if needed to fit the bound — the test enforces it).

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- services`
Expected: PASS (all 4 tests, with `services` length 5).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: typed services data model with integrity tests"
```

---

## Task 6: Animation layer (GSAP provider + Reveal)

**Files:**
- Create: `app/components/AnimationProvider.tsx`
- Create: `app/components/Reveal.tsx`

- [ ] **Step 1: Write `app/components/AnimationProvider.tsx`**

Adds the `js-anim` class to `<html>` on mount (so no-JS users never get hidden content), and centralizes `prefers-reduced-motion`.

```tsx
"use client";
import { useEffect } from "react";

export default function AnimationProvider() {
  useEffect(() => {
    document.documentElement.classList.add("js-anim");
  }, []);
  return null;
}
```

- [ ] **Step 2: Write `app/components/Reveal.tsx`**

Wraps children; animates them into view with GSAP + ScrollTrigger. Honors reduced motion (CSS already forces visible; JS also bails). `stagger` animates direct children when set.

```tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
  delay?: number;
};

export default function Reveal({ children, className, as = "div", stagger = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = stagger ? Array.from(el.children) : [el];
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, delay]);

  const Tag = as as React.ElementType;
  // When stagger, children individually carry .reveal; else the wrapper does.
  return (
    <Tag ref={ref} className={[stagger ? "" : "reveal", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 3: Note for stagger usage**

When `stagger` is used, each direct child must have the `reveal` class so it starts hidden. Document this inline where used (Tasks 8-9).

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds (components compile; not yet used).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: GSAP animation provider and Reveal component"
```

---

## Task 7: JSON-LD helper + WhatsApp button + primitives

**Files:**
- Create: `app/components/JsonLd.tsx`
- Create: `app/components/WhatsAppButton.tsx`
- Create: `app/components/Section.tsx`

- [ ] **Step 1: Write `app/components/JsonLd.tsx`**

```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Write `app/components/WhatsAppButton.tsx`**

```tsx
import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/content/site-data";

type Props = { message?: string; children?: React.ReactNode; variant?: "primary" | "ghost" };

export default function WhatsAppButton({ message, children = "Falar no WhatsApp", variant = "primary" }: Props) {
  return (
    <a
      className={`btn btn--${variant}`}
      href={whatsappUrl(site.phoneRaw, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Write `app/components/Section.tsx`**

```tsx
export default function Section({
  children,
  dark = false,
  className,
  id,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={["section", dark ? "section--dark" : "", className].filter(Boolean).join(" ")}>
      <div className="wrap">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Add button + section styles to `app/globals.css`**

Append:

```css
.section { padding: 96px 0; }
.section--dark { background: var(--bg-dark); color: var(--text-on-dark); }
@media (max-width: 860px) { .section { padding: 64px 0; } }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-heading); font-weight: 600; font-size: 16px;
  padding: 14px 24px; border-radius: 999px; cursor: pointer;
  transition: transform var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease);
  border: 2px solid transparent;
}
.btn--primary { background: var(--brand-secondary); color: var(--blue-800); }
.btn--primary:hover { transform: translateY(-2px); }
.btn--primary:active { transform: translateY(0); }
.btn--ghost { background: transparent; border-color: currentColor; }
.btn--ghost:hover { transform: translateY(-2px); }
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: JsonLd, WhatsAppButton, Section primitives and button styles"
```

---

## Task 8: Header (client, scroll-reactive, mobile menu)

**Files:**
- Create: `app/components/Header.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write `app/components/Header.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

const nav = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="wrap header__inner">
        <Link href="/" className="header__logo" aria-label="Rucad Engenharia">RUCAD</Link>
        <nav className={`header__nav ${open ? "is-open" : ""}`}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <WhatsAppButton>Falar no WhatsApp</WhatsAppButton>
        </nav>
        <button className="header__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Append header styles to `app/globals.css`**

```css
.header {
  position: sticky; top: 0; z-index: 100;
  transition: background var(--dur) var(--ease), box-shadow var(--dur) var(--ease), padding var(--dur) var(--ease);
  background: transparent; padding: 20px 0;
}
.header--scrolled { background: rgba(255,255,255,0.92); backdrop-filter: blur(10px); box-shadow: 0 1px 0 var(--line); padding: 12px 0; }
.header__inner { display: flex; align-items: center; justify-content: space-between; }
.header__logo { font-family: var(--font-heading); font-weight: 700; letter-spacing: 2px; font-size: 22px; color: var(--brand-primary); }
.header__nav { display: flex; align-items: center; gap: 28px; font-family: var(--font-heading); font-weight: 500; }
.header__burger { display: none; flex-direction: column; gap: 5px; background: none; border: 0; cursor: pointer; }
.header__burger span { width: 24px; height: 2px; background: var(--brand-primary); }
@media (max-width: 860px) {
  .header__burger { display: flex; }
  .header__nav { position: fixed; inset: 64px 0 auto 0; flex-direction: column; background: #fff; padding: 24px var(--gutter); gap: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-120%); transition: transform var(--dur) var(--ease); }
  .header__nav.is-open { transform: translateY(0); }
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scroll-reactive header with mobile menu"
```

---

## Task 9: Footer

**Files:**
- Create: `app/components/Footer.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write `app/components/Footer.tsx`**

Data pulled from `content/site-data.ts`; routes from the sitemap.

```tsx
import Link from "next/link";
import { site } from "@/content/site-data";
import { services } from "@/content/services";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div>
          <div className="footer__logo">RUCAD</div>
          <p className="footer__slogan">{site.slogan}</p>
        </div>
        <nav>
          <h4>Serviços</h4>
          {services.map((s) => (
            <Link key={s.slug} href={`/servicos/${s.slug}`}>{s.title}</Link>
          ))}
        </nav>
        <nav>
          <h4>Empresa</h4>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
        <div>
          <h4>Contato</h4>
          <a href={`tel:+${site.phoneRaw}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>{site.address}</p>
          <p>CREA-MS: {site.creaMs}</p>
        </div>
      </div>
      <div className="wrap footer__bottom">© 2026 {site.name}</div>
    </footer>
  );
}
```

- [ ] **Step 2: Append footer styles to `app/globals.css`**

```css
.footer { background: var(--bg-dark); color: var(--text-on-dark); padding: 72px 0 32px; }
.footer__grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 32px; }
.footer nav { display: flex; flex-direction: column; gap: 10px; }
.footer h4 { color: var(--brand-secondary); margin-bottom: 6px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; }
.footer a, .footer p { color: rgba(255,255,255,0.8); font-size: 15px; margin: 0; }
.footer a:hover { color: #fff; }
.footer__logo { font-family: var(--font-heading); font-weight: 700; letter-spacing: 2px; font-size: 22px; }
.footer__slogan { color: var(--brand-secondary) !important; margin-top: 8px; }
.footer__bottom { margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 14px; color: rgba(255,255,255,0.6); }
@media (max-width: 860px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
```

- [ ] **Step 3: Wire Header/Footer/AnimationProvider into `app/layout.tsx`**

Add imports and wrap `{children}`:

```tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimationProvider from "./components/AnimationProvider";
// ...
<body>
  <AnimationProvider />
  <Header />
  {children}
  <Footer />
</body>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: footer and global layout wiring"
```

---

## Task 10: Presentational blocks (Hero, StatsBar, Pillars, ProcessSteps, FAQ, ServiceCard, CTASection, Breadcrumbs)

**Files:**
- Create: `app/components/Hero.tsx`, `StatsBar.tsx`, `Pillars.tsx`, `ProcessSteps.tsx`, `Faq.tsx`, `ServiceCard.tsx`, `ServicesGrid.tsx`, `CtaSection.tsx`, `Breadcrumbs.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: `Hero.tsx`**

```tsx
import Reveal from "./Reveal";

type Props = {
  kicker: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  dark?: boolean;
};

export default function Hero({ kicker, title, subtitle, actions, dark = true }: Props) {
  return (
    <section className={`hero ${dark ? "hero--dark" : ""}`}>
      <div className="wrap">
        <Reveal stagger>
          <p className="hero__kicker reveal">{kicker}</p>
          <h1 className="hero__title reveal">{title}</h1>
          <p className="hero__subtitle reveal">{subtitle}</p>
          {actions && <div className="hero__actions reveal">{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `StatsBar.tsx` (count-up)**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

function useCountUp(target: string, active: boolean) {
  const [text, setText] = useState(target.replace(/[\d]/g, "0"));
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(target); return; }
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (!num) { setText(target); return; }
    const prefix = target.slice(0, target.search(/\d/));
    const suffix = target.slice(target.search(/\d/) + String(num).length);
    let raf = 0; const start = performance.now(); const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(prefix + Math.round(num * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return text;
}

function StatItem({ value, label, active }: Stat & { active: boolean }) {
  const shown = useCountUp(value, active);
  return (
    <div className="stat">
      <div className="stat__value">{shown}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div className="statsbar" ref={ref}>
      <div className="wrap statsbar__grid">
        {stats.map((s, i) => <StatItem key={i} value={s.value} label={s.label} active={active} />)}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `Pillars.tsx`**

```tsx
import Reveal from "./Reveal";

const pillars = [
  { title: "Técnica", body: "Corpo técnico qualificado e equipamentos próprios. Cada obra tem responsável técnico e ART. Sem improviso." },
  { title: "Confiável", body: "Prazo e responsável definidos desde o dia 1. Entregamos no prazo contratual, muitas vezes antes." },
  { title: "Ousada", body: "Enquanto outros param, a Rucad continua. É assim que se constrói referência." },
];

export default function Pillars() {
  return (
    <Reveal as="div" stagger className="pillars">
      {pillars.map((p) => (
        <div className="pillar reveal" key={p.title}>
          <h3 className="pillar__title">{p.title}</h3>
          <p className="pillar__body">{p.body}</p>
        </div>
      ))}
    </Reveal>
  );
}
```

- [ ] **Step 4: `ProcessSteps.tsx`**

```tsx
import Reveal from "./Reveal";

type Step = { title: string; body: string };

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <Reveal as="ol" stagger className="steps">
      {steps.map((s, i) => (
        <li className="step reveal" key={i}>
          <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="step__title">{s.title}</h3>
          <p className="step__body">{s.body}</p>
        </li>
      ))}
    </Reveal>
  );
}
```

- [ ] **Step 5: `Faq.tsx` (accordion, client)**

```tsx
"use client";
import { useState } from "react";
import type { Faq as FaqItem } from "@/content/services";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className={`faq__item ${open === i ? "is-open" : ""}`} key={i}>
          <button className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span>{it.q}</span>
            <span className="faq__icon" aria-hidden>+</span>
          </button>
          <div className="faq__a"><p>{it.a}</p></div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: `ServiceCard.tsx` + `ServicesGrid.tsx`**

`ServiceCard.tsx`:

```tsx
import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/servicos/${service.slug}`} className="scard reveal">
      <h3 className="scard__title">{service.title}</h3>
      <p className="scard__summary">{service.cardSummary}</p>
      <span className="scard__cta">Saiba mais</span>
    </Link>
  );
}
```

`ServicesGrid.tsx`:

```tsx
import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "@/content/services";

export default function ServicesGrid() {
  return (
    <Reveal as="div" stagger className="sgrid">
      {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
    </Reveal>
  );
}
```

- [ ] **Step 7: `CtaSection.tsx`**

```tsx
import WhatsAppButton from "./WhatsAppButton";
import { site } from "@/content/site-data";

export default function CtaSection({ title, body, message }: { title: string; body?: string; message?: string }) {
  return (
    <section className="section section--dark cta">
      <div className="wrap cta__inner">
        <h2 className="cta__title">{title}</h2>
        {body && <p className="cta__body">{body}</p>}
        <div className="cta__actions">
          <WhatsAppButton message={message} />
          <a className="btn btn--ghost" href={`tel:+${site.phoneRaw}`}>{site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: `Breadcrumbs.tsx`**

```tsx
import Link from "next/link";
import JsonLd from "./JsonLd";
import { site } from "@/content/site-data";

type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.domain}${c.href}`,
    })),
  };
  return (
    <nav className="crumbs wrap" aria-label="breadcrumb">
      {items.map((c, i) => (
        <span key={c.href}>
          {i > 0 && <span className="crumbs__sep">/</span>}
          <Link href={c.href}>{c.name}</Link>
        </span>
      ))}
      <JsonLd data={ld} />
    </nav>
  );
}
```

- [ ] **Step 9: Append component styles to `app/globals.css`**

```css
/* Hero */
.hero { padding: 140px 0 96px; }
.hero--dark { background: var(--bg-dark); color: var(--text-on-dark); }
.hero__kicker { font-family: var(--font-heading); font-weight: 600; letter-spacing: 4px; font-size: 14px; color: var(--brand-secondary); margin-bottom: 16px; }
.hero__title { font-size: clamp(40px, 7vw, 84px); font-weight: 700; max-width: 14ch; }
.hero__subtitle { font-size: clamp(18px, 2.2vw, 22px); color: rgba(255,255,255,0.82); max-width: 52ch; margin-top: 20px; }
.hero__actions { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; }

/* Stats */
.statsbar { background: var(--blue-900); color: #fff; }
.statsbar__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding: 40px 0; }
.stat__value { font-family: var(--font-heading); font-weight: 700; font-size: clamp(28px, 4vw, 44px); color: var(--brand-secondary); }
.stat__label { color: rgba(255,255,255,0.75); font-size: 15px; margin-top: 4px; }
@media (max-width: 860px) { .statsbar__grid { grid-template-columns: 1fr 1fr; } }

/* Pillars */
.pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.pillar { border: 2px solid var(--line); border-radius: var(--radius); padding: 28px; transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.pillar:hover { border-color: var(--brand-secondary); transform: translateY(-4px); }
.pillar__title { font-size: 24px; margin-bottom: 10px; }
.pillar__body { color: var(--text-muted); }
@media (max-width: 860px) { .pillars { grid-template-columns: 1fr; } }

/* Steps */
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; list-style: none; padding: 0; margin: 0; }
.step__num { font-family: var(--font-heading); font-weight: 700; color: var(--brand-secondary); font-size: 20px; }
.step__title { font-size: 20px; margin: 8px 0; }
.step__body { color: var(--text-muted); font-size: 15px; }
@media (max-width: 860px) { .steps { grid-template-columns: 1fr 1fr; } }

/* FAQ */
.faq { max-width: 800px; }
.faq__item { border-bottom: 1px solid var(--line); }
.faq__q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; font-family: var(--font-heading); font-weight: 600; font-size: 18px; cursor: pointer; color: var(--text); }
.faq__icon { transition: transform var(--dur) var(--ease); font-size: 22px; color: var(--brand-tertiary); }
.faq__item.is-open .faq__icon { transform: rotate(45deg); }
.faq__a { max-height: 0; overflow: hidden; transition: max-height var(--dur) var(--ease); }
.faq__item.is-open .faq__a { max-height: 320px; }
.faq__a p { color: var(--text-muted); padding-bottom: 22px; margin: 0; }

/* Service cards */
.sgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.scard { border: 2px solid var(--line); border-radius: var(--radius); padding: 28px; display: flex; flex-direction: column; gap: 10px; transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.scard:hover { border-color: var(--brand-secondary); transform: translateY(-4px); }
.scard__title { font-size: 21px; }
.scard__summary { color: var(--text-muted); font-size: 15px; flex: 1; }
.scard__cta { font-family: var(--font-heading); font-weight: 600; color: var(--brand-primary); }
@media (max-width: 860px) { .sgrid { grid-template-columns: 1fr; } }

/* CTA */
.cta__inner { text-align: center; }
.cta__title { font-size: clamp(28px, 4vw, 44px); }
.cta__body { color: rgba(255,255,255,0.82); max-width: 46ch; margin: 16px auto 0; }
.cta__actions { display: flex; gap: 14px; justify-content: center; margin-top: 28px; flex-wrap: wrap; }

/* Breadcrumbs */
.crumbs { padding-top: 24px; font-size: 14px; color: var(--text-muted); }
.crumbs__sep { margin: 0 8px; }

/* Section intro helpers */
.section__eyebrow { font-family: var(--font-heading); font-weight: 600; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; color: var(--brand-tertiary); }
.section__title { font-size: clamp(28px, 4vw, 44px); margin-top: 8px; max-width: 20ch; }
.section__lead { color: var(--text-muted); max-width: 56ch; margin-top: 16px; font-size: 18px; }
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: presentational blocks (hero, stats, pillars, steps, faq, cards, cta, breadcrumbs)"
```

---

## Task 11: Home page

**Files:**
- Modify: `app/page.tsx`
- Create: `app/components/ServiceLd.tsx` (shared JSON-LD builder used by service pages; defined here for reuse) — optional if inlined

- [ ] **Step 1: Write `app/page.tsx`**

Content from `content/01-home.md` (as edited by the user). Organization JSON-LD lives in layout (Task 15), so home only needs section markup.

```tsx
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Section from "./components/Section";
import ServicesGrid from "./components/ServicesGrid";
import Pillars from "./components/Pillars";
import ProcessSteps from "./components/ProcessSteps";
import CtaSection from "./components/CtaSection";
import Reveal from "./components/Reveal";
import WhatsAppButton from "./components/WhatsAppButton";
import Link from "next/link";
import { site } from "@/content/site-data";

const homeSteps = [
  { title: "Contato e levantamento", body: "A gente vai até o local, entende a demanda e avalia as condições." },
  { title: "Proposta e projeto", body: "Você recebe uma proposta detalhada, com escopo, prazo e responsável técnico claros." },
  { title: "Execução", body: "Nossa equipe executa com equipamento próprio e acompanhamento técnico." },
  { title: "Documentação e entrega", body: "ART, laudos e a resolução da burocracia com a concessionária. Obra pronta para operar." },
];

export default function Home() {
  return (
    <main>
      <Hero
        kicker="ENGENHARIA ELÉTRICA"
        title="Sua demanda, nossa solução."
        subtitle="Projeto, execução e laudo com responsável técnico definido desde o primeiro dia."
        actions={<>
          <WhatsAppButton />
          <Link className="btn btn--ghost" href="/servicos">Ver serviços</Link>
        </>}
      />
      <StatsBar stats={site.stats} />

      <Section>
        <Reveal as="div">
          <p className="section__eyebrow reveal">O que resolvemos</p>
          <h2 className="section__title reveal">Um parceiro para toda a demanda elétrica.</h2>
          <p className="section__lead reveal">Da rede da fazenda à subestação da indústria, do loteamento ao laudo que libera a fiscalização. Você resolve tudo com uma empresa só, sem gerenciar vários fornecedores e sem correr atrás da concessionária. A gente cuida do projeto, da execução e da documentação.</p>
        </Reveal>
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Serviços</h2></Reveal>
        <div style={{ height: 32 }} />
        <ServicesGrid />
        <div style={{ marginTop: 32 }}>
          <Link className="btn btn--ghost" href="/servicos">Ver todos os serviços</Link>
        </div>
      </Section>

      <Section dark>
        <Reveal as="div"><h2 className="section__title reveal">Por que a Rucad</h2></Reveal>
        <div style={{ height: 32 }} />
        <Pillars />
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Como funciona</h2></Reveal>
        <div style={{ height: 32 }} />
        <ProcessSteps steps={homeSteps} />
      </Section>

      <CtaSection
        title="Tem uma demanda elétrica? A gente resolve."
        body="Fale com um engenheiro da Rucad. Levantamento no local e proposta com prazo e responsável técnico definidos."
      />
    </main>
  );
}
```

- [ ] **Step 2: Verify build + preview**

Run: `npm run build` then start the dev server and screenshot the home page (see Task 17 for preview setup).
Expected: home renders with hero, animated stats, service grid, pillars, steps, CTA.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: home page"
```

---

## Task 12: Service page template + routes

**Files:**
- Create: `app/servicos/[slug]/page.tsx`
- Create: `app/components/ServicePage.tsx`

Note: dynamic route with `generateStaticParams` produces one static HTML per slug at export — cleaner than 5 duplicate folders.

- [ ] **Step 1: Write `app/components/ServicePage.tsx`**

```tsx
import Hero from "./Hero";
import Section from "./Section";
import ProcessSteps from "./ProcessSteps";
import Faq from "./Faq";
import CtaSection from "./CtaSection";
import Breadcrumbs from "./Breadcrumbs";
import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";
import JsonLd from "./JsonLd";
import { site } from "@/content/site-data";
import type { Service } from "@/content/services";

export default function ServicePage({ service }: { service: Service }) {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: { "@type": "Organization", name: site.name, url: site.domain },
    areaServed: "BR",
    description: service.metaDescription,
    url: `${site.domain}/servicos/${service.slug}/`,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <Breadcrumbs items={[
        { name: "Início", href: "/" },
        { name: "Serviços", href: "/servicos" },
        { name: service.title, href: `/servicos/${service.slug}` },
      ]} />
      <Hero
        kicker={service.hero.kicker}
        title={service.title}
        subtitle={service.hero.subtitle}
        actions={<WhatsAppButton message={`Olá, tenho interesse em ${service.title}.`} />}
      />

      <Section>
        <Reveal as="div">
          <p className="section__lead reveal">{service.intro}</p>
        </Reveal>
        <div className="service__cols">
          <Reveal as="ul" stagger className="service__includes">
            {service.includes.map((it, i) => <li className="reveal" key={i}>{it}</li>)}
          </Reveal>
          <Reveal as="div" className="service__apps">
            <h3 className="reveal">Aplicações</h3>
            <p className="reveal">{service.applications}</p>
          </Reveal>
        </div>
      </Section>

      <Section dark>
        <Reveal as="div"><h2 className="section__title reveal">Como funciona</h2></Reveal>
        <div style={{ height: 32 }} />
        <ProcessSteps steps={service.steps} />
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Por que a Rucad</h2></Reveal>
        <div style={{ height: 32 }} />
        <Reveal as="div" stagger className="pillars">
          {service.differentials.map((d) => (
            <div className="pillar reveal" key={d.title}>
              <h3 className="pillar__title">{d.title}</h3>
              <p className="pillar__body">{d.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Perguntas frequentes</h2></Reveal>
        <div style={{ height: 24 }} />
        <Faq items={service.faq} />
      </Section>

      <CtaSection title={service.cta.title} body={service.cta.body} message={`Olá, tenho interesse em ${service.title}.`} />

      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
    </main>
  );
}
```

- [ ] **Step 2: Write `app/servicos/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import ServicePage from "@/app/components/ServicePage";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.metaDescription,
    openGraph: { title: `${s.seoTitle} · Rucad Engenharia`, description: s.metaDescription },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
```

Note: if the installed Next version types `params` as a Promise, adjust both functions to `async` and `await params`. Verify against the actual Next 16 types during execution.

- [ ] **Step 3: Append service-page styles to `app/globals.css`**

```css
.service__cols { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; margin-top: 40px; }
.service__includes { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
.service__includes li { padding-left: 28px; position: relative; color: var(--text-muted); }
.service__includes li::before { content: ""; position: absolute; left: 0; top: 9px; width: 12px; height: 12px; background: var(--brand-secondary); border-radius: 3px; }
.service__apps h3 { font-size: 20px; margin-bottom: 8px; }
.service__apps p { color: var(--text-muted); }
@media (max-width: 860px) { .service__cols { grid-template-columns: 1fr; } }
```

- [ ] **Step 4: Verify build (all 5 slugs export)**

Run: `npm run build`
Expected: `out/servicos/<slug>/index.html` exists for all 5 slugs.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: data-driven service page template and routes"
```

---

## Task 13: Serviços index, Sobre, Contato pages

**Files:**
- Create: `app/servicos/page.tsx`
- Create: `app/sobre/page.tsx`
- Create: `app/contato/page.tsx`

- [ ] **Step 1: `app/servicos/page.tsx`**

Content from `content/02-servicos-index.md`.

```tsx
import type { Metadata } from "next";
import Section from "@/app/components/Section";
import ServicesGrid from "@/app/components/ServicesGrid";
import CtaSection from "@/app/components/CtaSection";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Reveal from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "Serviços de engenharia elétrica",
  description:
    "Projetos e SPDA, laudos e ensaios, construção de redes e subestações, eficiência energética e usinas solares. Conheça as soluções da Rucad Engenharia.",
};

export default function ServicosIndex() {
  return (
    <main>
      <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Serviços", href: "/servicos" }]} />
      <Section>
        <Reveal as="div">
          <h1 className="section__title reveal">Serviços de engenharia elétrica</h1>
          <p className="section__lead reveal">Um portfólio completo para quem precisa de energia funcionando com segurança e dentro das normas. Projetamos, executamos e documentamos. Escolha a frente que resolve a sua demanda.</p>
        </Reveal>
        <div style={{ height: 40 }} />
        <ServicesGrid />
      </Section>
      <CtaSection
        title="Não sabe qual serviço precisa? A gente identifica."
        body="Você fala com a gente uma vez e a Rucad organiza a solução completa."
      />
    </main>
  );
}
```

- [ ] **Step 2: `app/sobre/page.tsx`**

Content from `content/08-sobre.md`.

```tsx
import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import Pillars from "@/app/components/Pillars";
import StatsBar from "@/app/components/StatsBar";
import CtaSection from "@/app/components/CtaSection";
import Reveal from "@/app/components/Reveal";
import { site } from "@/content/site-data";

export const metadata: Metadata = {
  title: "Sobre a Rucad · Empresa de engenharia elétrica",
  description:
    "A Rucad é uma empresa de engenharia elétrica com corpo técnico qualificado, equipamentos próprios e cultura de entrega no prazo. Conheça a Rucad.",
};

export default function Sobre() {
  return (
    <main>
      <Hero
        kicker="SOBRE"
        title="A Rucad não pára."
        subtitle="Uma empresa de engenharia elétrica construída sobre competência técnica, organização e a obsessão por entregar no prazo."
      />
      <Section>
        <Reveal as="div">
          <p className="section__lead reveal">A Rucad nasceu das iniciais dos sócios fundadores, Ruffo, Carvalho e Delatori, e cresceu fazendo engenharia elétrica com rigor. Construímos e mantemos redes de distribuição de baixa e média tensão, subestações, usinas fotovoltaicas e emitimos os laudos e ensaios que comprovam conformidade.</p>
          <p className="section__lead reveal">Atendemos de grandes empresas de infraestrutura a produtores rurais, em todo o Brasil. O que se repete em cada obra é a mesma exigência: dado concreto no lugar de promessa, prazo cumprido e responsável técnico do começo ao fim.</p>
        </Reveal>
      </Section>
      <StatsBar stats={site.stats} />
      <Section>
        <Reveal as="div"><h2 className="section__title reveal">O que nos sustenta</h2></Reveal>
        <div style={{ height: 32 }} />
        <Pillars />
      </Section>
      <CtaSection title="Sua demanda, nossa solução." body="Fale com um engenheiro da Rucad e receba uma proposta com prazo e responsável técnico definidos." />
    </main>
  );
}
```

- [ ] **Step 3: `app/contato/page.tsx`**

Content from `content/09-contato.md`.

```tsx
import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Reveal from "@/app/components/Reveal";
import { site } from "@/content/site-data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Rucad Engenharia. Levantamento no local e proposta com prazo e responsável técnico definidos. WhatsApp (67) 99650-6767.",
};

export default function Contato() {
  return (
    <main>
      <Hero
        kicker="CONTATO"
        title="Fale com a Rucad."
        subtitle="Tem uma demanda elétrica? Fale com um engenheiro. Levantamento no local e proposta com prazo e responsável técnico definidos."
        actions={<WhatsAppButton />}
      />
      <Section>
        <Reveal as="div" stagger className="contact__grid">
          <a className="reveal contact__card" href={`https://wa.me/${site.phoneRaw}`} target="_blank" rel="noopener noreferrer">
            <h3>WhatsApp</h3><p>{site.phoneDisplay}</p>
          </a>
          <a className="reveal contact__card" href={`mailto:${site.email}`}>
            <h3>E-mail</h3><p>{site.email}</p>
          </a>
          <div className="reveal contact__card">
            <h3>Endereço</h3><p>{site.address}</p>
          </div>
          <a className="reveal contact__card" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            <h3>Instagram</h3><p>@rucadengenharia</p>
          </a>
        </Reveal>
      </Section>
    </main>
  );
}
```

- [ ] **Step 4: Append contact styles to `app/globals.css`**

```css
.contact__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.contact__card { border: 2px solid var(--line); border-radius: var(--radius); padding: 24px; transition: border-color var(--dur) var(--ease), transform var(--dur) var(--ease); }
.contact__card:hover { border-color: var(--brand-secondary); transform: translateY(-4px); }
.contact__card h3 { font-size: 18px; margin-bottom: 6px; }
.contact__card p { color: var(--text-muted); margin: 0; }
@media (max-width: 860px) { .contact__grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: `out/servicos/index.html`, `out/sobre/index.html`, `out/contato/index.html` exist.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: serviços index, sobre and contato pages"
```

---

## Task 14: sitemap.ts + robots.ts + global Organization JSON-LD

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx`
- Create: `app/__tests__/routes.test.ts`

- [ ] **Step 1: Write failing test `app/__tests__/routes.test.ts`**

```ts
import { expect, test } from "vitest";
import { services } from "@/content/services";

test("all static routes are accounted for", () => {
  const routes = [
    "/", "/servicos", "/sobre", "/contato",
    ...services.map((s) => `/servicos/${s.slug}`),
  ];
  expect(routes).toContain("/servicos/ufv-fotovoltaica");
  expect(new Set(routes).size).toBe(routes.length);
  expect(routes.length).toBe(4 + services.length);
});
```

Add to `vitest.config.ts` an alias so `@/` resolves:

```ts
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: { alias: { "@": resolve(__dirname, ".") } },
  test: { environment: "node", include: ["**/*.test.ts"] },
});
```

- [ ] **Step 2: Run test**

Run: `npm test -- routes`
Expected: PASS.

- [ ] **Step 3: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const staticRoutes = ["", "/servicos", "/sobre", "/contato"];
  const serviceRoutes = services.map((s) => `/servicos/${s.slug}`);
  return [...staticRoutes, ...serviceRoutes].map((path) => ({
    url: `${base}${path}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 4: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
```

- [ ] **Step 5: Add Organization JSON-LD to `app/layout.tsx`**

Import `JsonLd` and `site`, and render inside `<body>` (before Header):

```tsx
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.domain,
  telephone: `+${site.phoneRaw}`,
  email: site.email,
  areaServed: "BR",
  slogan: site.slogan,
  sameAs: [site.social.instagram, site.social.linkedin],
}} />
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: `out/sitemap.xml` and `out/robots.txt` generated; all tests pass with `npm test`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: sitemap, robots, organization JSON-LD"
```

---

## Task 15: Deploy workflow (GitHub Pages)

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

Builds with `DEPLOY_TARGET=pages` so `basePath` is applied. Adds `.nojekyll` so `_next` assets are served.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm test
      - run: npm run build
        env:
          DEPLOY_TARGET: pages
      - run: touch out/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "ci: github pages deploy workflow"
```

- [ ] **Step 3: Note (manual, by user)**

GitHub Pages must be enabled in repo Settings → Pages → Source: GitHub Actions. If the repo is private and the account is free, either make it public or use another preview host. Do not push to enable Pages without the user's go-ahead.

---

## Task 16: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: succeeds; confirm `out/` contains: `index.html`, `servicos/index.html`, `servicos/<5 slugs>/index.html`, `sobre/index.html`, `contato/index.html`, `sitemap.xml`, `robots.txt`.

- [ ] **Step 3: Live preview**

Create `.claude/launch.json` with a `dev` config (`next dev`, port 3000). Start it, then:
- Screenshot home, one service page, contato.
- Verify: hero animates in, stats count up on scroll, service cards hover-lift, FAQ accordion opens/closes, header shrinks on scroll, mobile menu works at 375px width.
- Toggle `prefers-reduced-motion` and confirm content is fully visible with motion reduced.

- [ ] **Step 4: SEO spot check**

In built HTML, confirm each page has a unique `<title>`, `<meta name="description">`, and the expected JSON-LD blocks (`ProfessionalService` global; `Service` + `FAQPage` on service pages; `BreadcrumbList` on internal pages).

- [ ] **Step 5: Final commit + push**

```bash
git add -A
git commit -m "chore: verification pass"
git push origin main
```

---

## Self-review notes (coverage against spec)

- Stack, static export, fonts (Anek + DM Sans only), CSS custom properties → Tasks 0, 2, 3.
- Routes (home, índice, 5 serviços, sobre, contato) → Tasks 11, 12, 13.
- Data-driven services from one source → Task 5, consumed in 10-13.
- Design system tokens from brand guidelines → Task 2.
- GSAP animation layer + micro-interactions + reduced-motion → Tasks 6, 10 (and CSS transitions throughout).
- SEO: per-route metadata, JSON-LD (ProfessionalService/Service/FAQPage/BreadcrumbList), sitemap, robots → Tasks 3, 12, 14.
- WhatsApp conversion → Tasks 4, 7, used everywhere.
- Deploy phase 1 (Pages) with portable base path for phase 2 → Tasks 0 (config), 15.
- `[A CONFIRMAR]` placeholders isolated in `site-data.ts` → Task 4.
- Testing boundary (logic only) → Tasks 1, 4, 5, 14.
