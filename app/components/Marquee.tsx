const logos = [
  { name: "logo-suzano", label: "Suzano", width: 171 },
  { name: "logo-bracell", label: "Bracell", width: 177 },
  { name: "logo-energisa", label: "Energisa", width: 123 },
  { name: "logo-gpa", label: "GPA", width: 78 },
  { name: "logo-drogasil", label: "Drogasil", width: 214 },
  { name: "logo-paguemenos", label: "Pague Menos", width: 345 },
  { name: "logo-madero", label: "Grupo Madero", width: 137 },
  { name: "logo-origo", label: "Origo Energia", width: 122 },
  { name: "logo-cel", label: "CEL Engenharia", width: 141 },
  { name: "logo-ivi", label: "ivi energia", width: 115 },
  { name: "logo-vetorial", label: "Vetorial", width: 156 },
  { name: "logo-brasilaocubo", label: "Brasil ao Cubo", width: 163 },
  { name: "logo-tatubola", label: "Tatu Bola", width: 84 },
  { name: "logo-crecims", label: "CRECI-MS", width: 167 },
];

export default function Marquee() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const items = [...logos, ...logos];
  return (
    <section className="marquee-sec">
      <div className="marquee" aria-label="Clientes da Rucad">
        <div className="marquee__track">
          {items.map(({ name, label, width }, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${name}-${i}`}
              className="marquee__logo"
              src={`${base}/clientes/${name}.svg`}
              alt={i >= logos.length ? "" : label}
              aria-hidden={i >= logos.length}
              width={width}
              height={40}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
