import Reveal from "./Reveal";

const pillars = [
  { title: "Técnica", body: "Corpo técnico qualificado e equipamentos próprios. Cada obra tem responsável técnico e ART. Sem improviso." },
  { title: "Confiável", body: "Prazo e responsável definidos desde o dia 1. Entregamos no prazo contratual, muitas vezes antes." },
  { title: "Ousada", body: "Enquanto outros param, a Rucad continua. É assim que se constrói referência." },
];

export default function Pillars() {
  return (
    <Reveal as="div" stagger className="pillars">
      {pillars.map((p) => (
        <div className="pillar reveal" key={p.title}>
          <h3 className="pillar__title">{p.title}</h3>
          <p className="pillar__body">{p.body}</p>
        </div>
      ))}
    </Reveal>
  );
}
