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
