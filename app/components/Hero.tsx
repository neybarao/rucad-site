type Props = {
  kicker?: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  dark?: boolean;
  compactTop?: boolean;
  bgImage?: string;
  bgImageMobile?: string;
  /** ilustração no lado direito (ex.: modelo 3D do serviço) */
  visual?: React.ReactNode;
};

export default function Hero({ kicker, title, subtitle, actions, dark = true, compactTop = false, bgImage, bgImageMobile, visual }: Props) {
  const classes = ["hero"];
  if (dark) classes.push("hero--dark");
  if (compactTop) classes.push("hero--compact");
  if (bgImage) classes.push("hero--image");
  if (visual) classes.push("hero--visual");
  return (
    <section className={classes.join(" ")}>
      {bgImage && (
        <img
          className="hero__bg"
          src={bgImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          srcSet={bgImageMobile ? `${bgImageMobile} 900w, ${bgImage} 1920w` : undefined}
          sizes="100vw"
        />
      )}
      {bgImage && <div className="hero__overlay" aria-hidden />}
      <div className="wrap hero__inner">
        {kicker && <p className="hero__kicker">{kicker}</p>}
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        {actions && <div className="hero__actions">{actions}</div>}
      </div>
      {visual && (
        <div className="hero__visual" data-model-hover aria-hidden="true">
          {visual}
        </div>
      )}
    </section>
  );
}
