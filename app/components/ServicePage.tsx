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
            <h3>Aplicações</h3>
            <p>{service.applications}</p>
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
