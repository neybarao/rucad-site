import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import ServicesGrid from "@/app/components/ServicesGrid";
import CtaSection from "@/app/components/CtaSection";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Serviços de engenharia elétrica",
  description:
    "Projetos e SPDA, laudos e ensaios, construção de redes e subestações, eficiência energética e usinas solares. Conheça as soluções da Rucad Engenharia.",
};

export default function ServicosIndex() {
  return (
    <main>
      <Hero
        kicker="SERVIÇOS"
        title="Serviços de engenharia elétrica"
        subtitle="Um portfólio completo para quem precisa de energia funcionando com segurança e dentro das normas. Projetamos, executamos e documentamos. Escolha a frente que resolve a sua demanda."
        compactTop
      />
      <Breadcrumbs items={[{ name: "Início", href: "/" }, { name: "Serviços", href: "/servicos" }]} />
      <Section>
        <ServicesGrid />
      </Section>
      <CtaSection
        title="Não sabe qual serviço precisa? A gente identifica."
        body="Você fala com a gente uma vez e a Rucad organiza a solução completa."
      />
    </main>
  );
}
