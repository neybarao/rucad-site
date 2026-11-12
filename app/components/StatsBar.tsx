"use client";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
  countTo?: number;
  decimals?: number;
  suffix?: string;
};

function formatStatValue(value: number, decimals = 0, suffix = "") {
  return `${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)}${suffix}`;
}

// O HTML sai do build com o valor real (é o que buscadores e robôs de IA leem,
// muitos sem rodar JavaScript). No navegador, se a faixa ainda está fora da
// tela, o número zera sem ninguém ver e conta até o valor quando aparece.
function useCountUp(stat: Stat, active: boolean, offscreen: boolean) {
  const countTo = stat.countTo;
  const [text, setText] = useState(stat.value);

  useEffect(() => {
    if (!offscreen || active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText(typeof countTo === "number" ? formatStatValue(0, stat.decimals, stat.suffix) : stat.value.replace(/[\d]/g, "0"));
  }, [offscreen, active, countTo, stat.decimals, stat.suffix, stat.value]);

  useEffect(() => {
    if (!active || !offscreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(stat.value); return; }
    if (typeof countTo !== "number") { setText(stat.value); return; }

    let raf = 0; const start = performance.now(); const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(formatStatValue(countTo * eased, stat.decimals, stat.suffix));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, offscreen, countTo, stat.decimals, stat.suffix, stat.value]);
  return text;
}

function StatItem({ active, offscreen, ...stat }: Stat & { active: boolean; offscreen: boolean }) {
  const shown = useCountUp(stat, active, offscreen);
  return (
    <div className="stat">
      <div className="stat__value">{shown}</div>
      <div className="stat__label">{stat.label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // só anima se a faixa começou fora da tela; se já está visível, fica o valor real
    setOffscreen(el.getBoundingClientRect().top > window.innerHeight);
    let timer = 0;
    const startCount = () => {
      timer = window.setTimeout(() => setActive(true), 180);
    };
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { startCount(); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);
  return (
    <div className="statsbar" ref={ref}>
      <div className="wrap statsbar__grid">
        {stats.map((s, i) => <StatItem key={i} {...s} active={active} offscreen={offscreen} />)}
      </div>
    </div>
  );
}
