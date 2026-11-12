import type { Metadata } from "next";
import { pageMetadata, ORG_ID } from "@/lib/seo";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import ProcessSteps from "@/app/components/ProcessSteps";
import JsonLd from "@/app/components/JsonLd";
import Reveal from "@/app/components/Reveal";
import { whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/content/site-data";

export const metadata: Metadata = pageMetadata({
  title: "Contato e orçamento",
  description:
    "Fale com a Rucad Engenharia pelo WhatsApp (67) 99650-6767, de segunda a sexta, das 7h30 às 17h30. Levantamento no local e proposta com ART.",
  path: "/contato/",
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Rucad Engenharia, ${site.address}`)}`;

const channels = [
  { label: "WhatsApp", value: site.phoneDisplay, note: "Canal mais rápido para orçamentos", href: whatsappUrl(site.phoneRaw, "Olá, gostaria de um orçamento."), external: true },
  { label: "Telefone", value: site.phoneDisplay, note: "Ligações no horário de atendimento", href: `tel:+${site.phoneRaw}`, external: false },
  { label: "E-mail", value: site.email, note: "Para envio de projetos, plantas e documentos", href: `mailto:${site.email}?subject=${encodeURIComponent("Solicitação de orçamento")}`, external: false },
  { label: "Instagram", value: "@rucadengenharia", note: "Obras e novidades", href: site.social.instagram, external: true },
  { label: "LinkedIn", value: "Rucad Engenharia", note: "Página institucional", href: site.social.linkedin, external: true },
];

const nextSteps = [
  { title: "Atendimento técnico", body: "Quem responde entende de engenharia elétrica e já avalia o que a demanda exige." },
  { title: "Levantamento no local", body: "Quando a demanda pede avaliação em campo, a visita técnica é agendada." },
  { title: "Proposta formal", body: "Escopo, prazo, valor e responsável técnico definidos por escrito." },
];

const briefing = [
  "Tipo de serviço: projeto, obra, laudo, manutenção ou usina solar",
  "Local da obra: cidade e, se rural, a propriedade",
  "Carga ou potência aproximada, se souber",
  "Fotos do padrão de entrada, quadro ou subestação",
  "Documentos existentes: projetos, laudos ou ARTs anteriores",
  "Prazo desejado ou data limite da obra",
];

export default function Contato() {
  return (
    <main>
      <Hero
        kicker="CONTATO"
        title="Fale com a engenharia da Rucad."
        subtitle={`Atendimento de segunda a sexta, das 7h30 às 17h30. Para orçamentos, o canal mais rápido é o WhatsApp.`}
        actions={
          <>
            <WhatsAppButton message="Olá, gostaria de um orçamento." />
            <a className="btn btn--ghost" href={`mailto:${site.email}?subject=${encodeURIComponent("Solicitação de orçamento")}`}>Enviar e-mail</a>
          </>
        }
      />

      <Section>
        <div className="contact">
          <Reveal as="div" className="contact__channels">
            <h2 className="section__title reveal">Canais de atendimento</h2>
            <ul className="channels">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    className="channels__row"
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="channels__label">{c.label}</span>
                    <span className="channels__value">{c.value}</span>
                    <span className="channels__note">{c.note}</span>
                    <span className="channels__arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="aside" className="office reveal">
            <p className="office__kicker">SEDE</p>
            <address className="office__address">
              Rucad Engenharia
              <br />
              {site.addressStreet}
              <br />
              Aero Rancho, {site.addressLocality} ({site.addressRegion})
              <br />
              CEP {site.postalCode}
            </address>
            <dl className="office__facts">
              <div><dt>Horário</dt><dd>{site.hours.display}</dd></div>
              <div><dt>Área de atendimento</dt><dd>{site.serviceArea.display}</dd></div>
              <div><dt>CNPJ</dt><dd>{site.cnpj}</dd></div>
            </dl>
            <a className="btn btn--ghost office__map" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              Ver no Google Maps
            </a>
          </Reveal>
        </div>
      </Section>

      <Section className="section--muted">
        <div className="contact contact--split">
          <div>
            <Reveal as="div"><h2 className="section__title reveal">O que acontece depois do contato</h2></Reveal>
            <div style={{ height: 28 }} />
            <ProcessSteps steps={nextSteps} />
          </div>
          <Reveal as="div" className="briefing reveal">
            <h3 className="briefing__title">Para agilizar o orçamento, envie:</h3>
            <ul className="briefing__list">
              {briefing.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </Reveal>
        </div>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.domain}/contato/`,
          name: "Contato e orçamento · Rucad Engenharia",
          about: { "@id": ORG_ID },
        }}
      />
    </main>
  );
}
