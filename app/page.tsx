import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Section from "./components/Section";
import ServicesGrid from "./components/ServicesGrid";
import Pillars from "./components/Pillars";
import ProcessSteps from "./components/ProcessSteps";
import CtaSection from "./components/CtaSection";
import Marquee from "./components/Marquee";
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
        title={"Sua demanda,\nnossa solução."}
        subtitle={"Projeto, execução e laudo com responsável técnico\ndefinido desde o primeiro dia."}
        bgImage={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero-bg.png`}
        actions={<>
          <WhatsAppButton />
          <Link className="btn btn--ghost" href="/servicos">Ver serviços</Link>
        </>}
      />
      <StatsBar stats={site.stats} />

      <Section>
        <Reveal as="div" stagger>
          <h2 className="section__title reveal">Um parceiro para toda a demanda elétrica.</h2>
          <p className="section__lead reveal">Da rede da fazenda à subestação da indústria, do loteamento ao laudo que libera a fiscalização. Você resolve tudo com uma empresa só, sem gerenciar vários fornecedores e sem correr atrás da concessionária. A gente cuida do projeto, da execução e da documentação.</p>
        </Reveal>
      </Section>

      <Marquee />

      <Section>
        <Reveal as="div" stagger><h2 className="section__title reveal">Serviços</h2></Reveal>
        <div style={{ height: 32 }} />
        <ServicesGrid />
        <div style={{ marginTop: 32 }}>
          <Link className="btn btn--ghost" href="/servicos">Ver todos os serviços</Link>
        </div>
      </Section>

      <Section dark>
        <Reveal as="div" stagger><h2 className="section__title reveal">Por que a Rucad</h2></Reveal>
        <div style={{ height: 32 }} />
        <Pillars />
      </Section>

      <Section>
        <Reveal as="div" stagger><h2 className="section__title reveal">Como funciona</h2></Reveal>
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
