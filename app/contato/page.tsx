import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import Section from "@/app/components/Section";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import Reveal from "@/app/components/Reveal";
import { site } from "@/content/site-data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Rucad Engenharia. Levantamento no local e proposta com prazo e responsável técnico definidos. WhatsApp (67) 99650-6767.",
};

export default function Contato() {
  return (
    <main>
      <Hero
        kicker="CONTATO"
        title="Fale com a Rucad."
        subtitle="Tem uma demanda elétrica? Fale com um engenheiro. Levantamento no local e proposta com prazo e responsável técnico definidos."
        actions={<WhatsAppButton />}
      />
      <Section>
        <Reveal as="div" stagger className="contact__grid">
          <a className="reveal contact__card" href={`https://wa.me/${site.phoneRaw}`} target="_blank" rel="noopener noreferrer">
            <h3>WhatsApp</h3><p>{site.phoneDisplay}</p>
          </a>
          <a className="reveal contact__card" href={`mailto:${site.email}`}>
            <h3>E-mail</h3><p>{site.email}</p>
          </a>
          <div className="reveal contact__card">
            <h3>Endereço</h3><p>{site.address}</p>
          </div>
          <a className="reveal contact__card" href={site.social.instagram} target="_blank" rel="noopener noreferrer">
            <h3>Instagram</h3><p>@rucadengenharia</p>
          </a>
        </Reveal>
      </Section>
    </main>
  );
}
