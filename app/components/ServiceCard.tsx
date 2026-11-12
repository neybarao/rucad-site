import Link from "next/link";
import type { Service } from "@/content/services";
import ServiceModel from "./ServiceModel";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Link href={`/servicos/${service.slug}`} className={`scard scard--${index + 1} reveal`}>
      <span className="scard__stage" aria-hidden="true">
        <ServiceModel slug={service.slug} />
      </span>
      <span className="scard__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
      <span className="scard__copy">
        <span className="scard__index">{number}</span>
        <h3 className="scard__title">{service.title}</h3>
        <p className="scard__summary">{service.cardSummary}</p>
      </span>
    </Link>
  );
}
