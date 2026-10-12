import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Faq from "@/app/components/Faq";
import CtaSection from "@/app/components/CtaSection";
import JsonLd from "@/app/components/JsonLd";
import Reveal from "@/app/components/Reveal";
import { articles, getArticle } from "@/content/articles";
import { site } from "@/content/site-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    openGraph: {
      title: `${article.seoTitle} · Rucad Engenharia`,
      description: article.metaDescription,
      type: "article",
    },
  };
}

export default async function ConteudoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = `${site.domain}/conteudos/${article.slug}/`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url,
    author: { "@type": "Organization", name: site.name, url: site.domain },
    publisher: { "@type": "Organization", name: site.name, url: site.domain },
    inLanguage: "pt-BR",
    mainEntityOfPage: url,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <Hero
        kicker={article.hero.kicker}
        title={article.title}
        subtitle={article.hero.subtitle}
        compactTop
      />
      <Breadcrumbs items={[
        { name: "Início", href: "/" },
        { name: "Conteúdos", href: "/conteudos" },
        { name: article.title, href: `/conteudos/${article.slug}` },
      ]} />

      <Section>
        <article className="article">
          <Reveal as="div">
            <p className="article__summary reveal">{article.summary}</p>
          </Reveal>

          <Reveal as="div" className="article__meta">
            <div>
              <span>Palavra-chave</span>
              <strong>{article.primaryKeyword}</strong>
            </div>
            <div>
              <span>Serviços relacionados</span>
              {article.relatedServices.map((service) => (
                <Link href={service.href} key={service.href}>{service.label}</Link>
              ))}
            </div>
          </Reveal>

          <Reveal as="div" stagger className="article__body">
            {article.sections.map((section) => (
              <section className="article__section reveal" key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </Reveal>
        </article>
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Perguntas frequentes</h2></Reveal>
        <div style={{ height: 24 }} />
        <Faq items={article.faq} />
      </Section>

      <CtaSection title={article.cta.title} body={article.cta.body} message={article.cta.message} />

      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
    </main>
  );
}
