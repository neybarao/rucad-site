export default function Section({
  children,
  dark = false,
  className,
  id,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={["section", dark ? "section--dark" : "", className].filter(Boolean).join(" ")}>
      <div className="wrap">{children}</div>
    </section>
  );
}
