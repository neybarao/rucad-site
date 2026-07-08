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
