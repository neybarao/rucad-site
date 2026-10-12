import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/servicos/${service.slug}`} className={`scard scard--${index + 1} reveal`}>
      <span className="scard__media" aria-hidden="true">
        <span className="scard__mediaGlow" />
      </span>
      <span className="scard__copy">
        <span className="scard__eyebrow">0{index + 1}</span>
        <h3 className="scard__title">{service.title}</h3>
        <p className="scard__summary">{service.cardSummary}</p>
        <span className="scard__cta">Saiba mais</span>
      </span>
    </Link>
  );
}
