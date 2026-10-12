import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import CtaSection from "@/app/components/CtaSection";
import Reveal from "@/app/components/Reveal";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Conteúdos de engenharia elétrica",
  description:
    "Guias técnicos da Rucad sobre subestações, laudos, SPDA, redes elétricas, energia rural e conformidade para empresas e propriedades.",
};

export default function ConteudosIndex() {
  return (
    <main>
      <Hero
        kicker="CONTEÚDOS"
        title="Guias técnicos para decidir com segurança."
        subtitle="Conteúdos para quem precisa contratar engenharia elétrica, entender documentos, reduzir risco de obra e manter a operação em conformidade."
        compactTop
      />
      <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Conteúdos", href: "/conteudos" }]} />
      <Section>
        <Reveal as="div" stagger className="article-grid">
          {articles.map((article) => (
            <Link className="article-card reveal" href={`/conteudos/${article.slug}`} key={article.slug}>
              <span className="article-card__kicker">{article.hero.kicker}</span>
              <h2>{article.title}</h2>
              <p>{article.metaDescription}</p>
              <span className="article-card__cta">Ler guia</span>
            </Link>
          ))}
        </Reveal>
      </Section>
      <CtaSection
        title="Tem uma demanda técnica?"
        body="Fale com a Rucad para entender o caminho certo: projeto, laudo, execução, regularização ou manutenção."
      />
    </main>
  );
}
