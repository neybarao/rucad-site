"use client";
import { useState } from "react";
import type { Faq as FaqItem } from "@/content/services";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => (
        <div className={`faq__item ${open === i ? "is-open" : ""}`} key={i}>
          <button className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span>{it.q}</span>
            <span className="faq__icon" aria-hidden>+</span>
          </button>
          <div className="faq__a"><p>{it.a}</p></div>
        </div>
      ))}
    </div>
  );
}
