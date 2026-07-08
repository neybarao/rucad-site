# Rucad Engenharia — Site

Novo site institucional da Rucad Engenharia. Substitui rucadengenharia.com.br, com foco em SEO orgânico e na nova identidade de marca.

## Stack

- Next.js 16 (App Router, `output: "export"` — site estático)
- CSS com custom properties (sem Tailwind)
- Fontes: Anek Latin (títulos) + DM Sans (corpo)
- Deploy fase 1: GitHub Pages via GitHub Actions. Fase 2: host de produção do domínio.

## Estrutura

- `content/` — conteúdo/copy de referência (um MD por página) + dados tipados do site (`site-data.ts`, `services.ts`).
- `docs/superpowers/specs/` — spec técnica e de conteúdo.
- `app/` — código do site (criado na fase de implementação).

## Status

Conteúdo aprovado. Arquitetura técnica aprovada. Implementação a seguir (ver `docs/superpowers/specs/`).

## Marca

Guidelines e identidade em `../Rucad Brand Guidelines/` e `../Rucad Branding/` (fora deste repo). Figma: arquivo "Rucad 2026 - Site e Marketing".
