type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
  delay?: number;
};

export default function Reveal({ children, className, as = "div", stagger = false }: Props) {
  const Tag = as as React.ElementType;
  return (
    <Tag className={[stagger ? "" : "reveal", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
