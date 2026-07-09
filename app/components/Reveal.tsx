"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
  delay?: number;
};

export default function Reveal({ children, className, as = "div", stagger = false, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Non-stagger: animate the wrapper AND any .reveal children together, so
    // children that carry .reveal (and would otherwise stay hidden) also reveal.
    const targets = stagger
      ? Array.from(el.children)
      : [el, ...Array.from(el.querySelectorAll<HTMLElement>(":scope .reveal"))];
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, delay]);

  const Tag = as as React.ElementType;
  // When stagger, children individually carry .reveal; else the wrapper does.
  return (
    <Tag ref={ref} className={[stagger ? "" : "reveal", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
