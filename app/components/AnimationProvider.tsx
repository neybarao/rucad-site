"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Animações de entrada das seções, sem dependências.
// - O HTML sai do build com tudo visível (SEO, sem JS, robôs de IA).
// - No navegador, o que já está na tela ao carregar continua visível (nada pisca
//   e o LCP não atrasa). Só o que está abaixo da dobra fica oculto e surge ao rolar.
// - Filhos .reveal de um mesmo pai entram em sequência (--rv-i).
// - Com prefers-reduced-motion, nada é escondido.
export default function AnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not([data-rv])"));
    const vh = window.innerHeight;
    for (const el of els) {
      el.dataset.rv = "";
      // índice entre irmãos .reveal, para entrar em sequência
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [];
      if (siblings.length > 1) el.style.setProperty("--rv-i", String(Math.min(siblings.indexOf(el), 8)));
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add("is-in", "is-instant");
      else io.observe(el);
    }
    root.classList.add("js-anim");

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
