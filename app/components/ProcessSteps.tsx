import Reveal from "./Reveal";

type Step = { title: string; body: string };

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <Reveal as="ol" stagger className="steps">
      {steps.map((s, i) => (
        <li className="step reveal" key={i}>
          <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="step__title">{s.title}</h3>
          <p className="step__body">{s.body}</p>
        </li>
      ))}
    </Reveal>
  );
}
