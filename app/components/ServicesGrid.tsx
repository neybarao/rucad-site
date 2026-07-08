import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "@/content/services";

export default function ServicesGrid() {
  return (
    <Reveal as="div" stagger className="sgrid">
      {services.map((s) => <ServiceCard key={s.slug} service={s} />)}
    </Reveal>
  );
}
