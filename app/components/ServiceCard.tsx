import Link from "next/link";
import type { Service } from "@/content/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/servicos/${service.slug}`} className="scard reveal">
      <h3 className="scard__title">{service.title}</h3>
      <p className="scard__summary">{service.cardSummary}</p>
      <span className="scard__cta">Saiba mais</span>
    </Link>
  );
}
