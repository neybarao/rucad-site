import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import StatsBar from "@/app/components/StatsBar";
import ProcessSteps from "@/app/components/ProcessSteps";
import CtaSection from "@/app/components/CtaSection";
import Marquee from "@/app/components/Marquee";
import Reveal from "@/app/components/Reveal";
import ParticleSymbol from "@/app/components/ParticleSymbol";
import { site } from "@/content/site-data";
import { services } from "@/content/services";

export const metadata: Metadata = pageMetadata({
  title: "Sobre a Rucad, engenharia elétrica em MS",
  description:
    "Empresa de engenharia elétrica de Campo Grande (MS): projeto, execução, ensaios e laudos em baixa e média tensão, com ART e equipe própria.",
  path: "/sobre/",
});

const steps = [
  { title: "Levantamento", body: "Visita técnica ao local para entender a demanda, as cargas e as condições de execução." },
  { title: "Proposta", body: "Escopo, prazo e responsável técnico definidos por escrito antes do início." },
  { title: "Execução", body: "Equipe e equipamentos próprios, com acompanhamento do engenheiro responsável." },
  { title: "Entrega", body: "ART, laudos, relatórios de ensaio e regularização junto à distribuidora, conforme o escopo." },
];

const commitments = [
  { title: "Responsabilidade técnica", body: "Todo serviço técnico tem engenheiro responsável identificado e ART registrada no CREA." },
  { title: "Prazo definido", body: "O cronograma é parte da proposta e acompanha a obra do levantamento à entrega." },
  { title: "Estrutura própria", body: "Equipe e equipamentos próprios reduzem a dependência de terceiros durante a execução." },
  { title: "Documentação completa", body: "A entrega inclui os documentos que distribuidora, fiscalização e seguradora pedem." },
];

export default function Sobre() {
  return (
    <main>
      <Hero
        kicker="SOBRE A RUCAD"
        title="Engenharia elétrica, do projeto à energização."
        subtitle="A Rucad projeta, executa, ensaia e documenta instalações elétricas de baixa e média tensão para indústrias, construtoras, distribuidoras e propriedades rurais."
        visual={<ParticleSymbol />}
      />

      <Section>
        <div className="profile">
          <Reveal as="div" className="profile__text">
            <h2 className="section__title reveal">Perfil da empresa</h2>
            <p className="section__lead reveal">
              A Rucad Engenharia é uma empresa de engenharia elétrica sediada em {site.addressLocality} ({site.addressRegion}).
            </p>
            <p className="section__lead reveal">
              A empresa atua em todo o ciclo da instalação elétrica: projeto e SPDA, construção e manutenção de redes e subestações, usinas fotovoltaicas, eficiência energética, ensaios, comissionamento e laudos técnicos. Uma única contratada responde pela demanda, do levantamento à documentação final.
            </p>
          </Reveal>
          <Reveal as="dl" className="factsheet reveal">
            <div><dt>Sede</dt><dd>{site.address}</dd></div>
            <div><dt>Área de atendimento</dt><dd>{site.serviceArea.display}</dd></div>
            <div><dt>Horário</dt><dd>{site.hours.display}</dd></div>
            <div><dt>CNPJ</dt><dd>{site.cnpj}</dd></div>
            <div><dt>Responsabilidade técnica</dt><dd>ART em todos os serviços técnicos</dd></div>
          </Reveal>
        </div>
      </Section>

      <StatsBar stats={site.stats} />

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Áreas de atuação</h2></Reveal>
        <div style={{ height: 28 }} />
        <Reveal as="ul" stagger className="caps">
          {services.map((s) => (
            <li className="reveal" key={s.slug}>
              <Link href={`/servicos/${s.slug}`} className="caps__row">
                <span className="caps__title">{s.title}</span>
                <span className="caps__summary">{s.cardSummary}</span>
                <span className="caps__arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section>
        <Reveal as="div"><h2 className="section__title reveal">Como trabalhamos</h2></Reveal>
        <div style={{ height: 32 }} />
        <ProcessSteps steps={steps} />
      </Section>

      <Section dark>
        <Reveal as="div"><h2 className="section__title reveal">Compromissos em cada contrato</h2></Reveal>
        <div style={{ height: 32 }} />
        <Reveal as="div" stagger className="pillars pillars--4">
          {commitments.map((c) => (
            <div className="pillar reveal" key={c.title}>
              <h3 className="pillar__title">{c.title}</h3>
              <p className="pillar__body">{c.body}</p>
            </div>
          ))}
        </Reveal>
      </Section>

      <Section className="section--clients">
        <Reveal as="div"><h2 className="section__title reveal">Empresas que já contrataram a Rucad</h2></Reveal>
      </Section>
      <Marquee />

      <CtaSection
        title="Fale com a engenharia da Rucad."
        body="Levantamento no local e proposta com escopo, prazo e responsável técnico definidos."
      />
    </main>
  );
}
