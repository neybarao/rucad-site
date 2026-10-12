import Reveal from "./Reveal";
import ServiceCard from "./ServiceCard";
import { services } from "@/content/services";

export default function ServicesGrid() {
  return (
    <Reveal as="div" stagger className="sgrid">
      {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
    </Reveal>
  );
}
