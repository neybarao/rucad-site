import Reveal from "./Reveal";

type Props = {
  kicker?: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  dark?: boolean;
  compactTop?: boolean;
  bgImage?: string;
};

export default function Hero({ kicker, title, subtitle, actions, dark = true, compactTop = false, bgImage }: Props) {
  const classes = ["hero"];
  if (dark) classes.push("hero--dark");
  if (compactTop) classes.push("hero--compact");
  if (bgImage) classes.push("hero--image");
  return (
    <section
      className={classes.join(" ")}
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      {bgImage && <div className="hero__overlay" aria-hidden />}
      <div className="wrap hero__inner">
        <Reveal stagger>
          {kicker && <p className="hero__kicker reveal">{kicker}</p>}
          <h1 className="hero__title reveal">{title}</h1>
          <p className="hero__subtitle reveal">{subtitle}</p>
          {actions && <div className="hero__actions reveal">{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}
