const logos = [
  "logo-suzano",
  "logo-bracell",
  "logo-energisa",
  "logo-gpa",
  "logo-drogasil",
  "logo-paguemenos",
  "logo-madero",
  "logo-origo",
  "logo-cel",
  "logo-ivi",
  "logo-vetorial",
  "logo-brasilaocubo",
  "logo-tatubola",
  "logo-crecims",
];

export default function Marquee() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const items = [...logos, ...logos];
  return (
    <section className="marquee-sec">
      <div className="marquee" aria-label="Clientes da Rucad">
        <div className="marquee__track">
          {items.map((name, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${name}-${i}`}
              className="marquee__logo"
              src={`${base}/clientes/${name}.svg`}
              alt={name.replace("logo-", "")}
              aria-hidden={i >= logos.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
