const logos = [
  { name: "logo-suzano", width: 171 },
  { name: "logo-bracell", width: 177 },
  { name: "logo-energisa", width: 123 },
  { name: "logo-gpa", width: 78 },
  { name: "logo-drogasil", width: 214 },
  { name: "logo-paguemenos", width: 345 },
  { name: "logo-madero", width: 137 },
  { name: "logo-origo", width: 122 },
  { name: "logo-cel", width: 141 },
  { name: "logo-ivi", width: 115 },
  { name: "logo-vetorial", width: 156 },
  { name: "logo-brasilaocubo", width: 163 },
  { name: "logo-tatubola", width: 84 },
  { name: "logo-crecims", width: 167 },
];

export default function Marquee() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const items = [...logos, ...logos];
  return (
    <section className="marquee-sec">
      <div className="marquee" aria-label="Clientes da Rucad">
        <div className="marquee__track">
          {items.map(({ name, width }, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${name}-${i}`}
              className="marquee__logo"
              src={`${base}/clientes/${name}.svg`}
              alt={name.replace("logo-", "")}
              aria-hidden={i >= logos.length}
              width={width}
              height={40}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
