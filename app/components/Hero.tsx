import Reveal from "./Reveal";

type Props = {
  kicker: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  dark?: boolean;
  compactTop?: boolean;
};

export default function Hero({ kicker, title, subtitle, actions, dark = true, compactTop = false }: Props) {
  return (
    <section className={`hero ${dark ? "hero--dark" : ""} ${compactTop ? "hero--compact" : ""}`}>
      <div className="wrap">
        <Reveal stagger>
          <p className="hero__kicker reveal">{kicker}</p>
          <h1 className="hero__title reveal">{title}</h1>
          <p className="hero__subtitle reveal">{subtitle}</p>
          {actions && <div className="hero__actions reveal">{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}
