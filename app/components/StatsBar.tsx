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

function useCountUp(stat: Stat, active: boolean) {
  const countTo = stat.countTo;
  const [text, setText] = useState(
    typeof countTo === "number" ? formatStatValue(0, stat.decimals, stat.suffix) : stat.value.replace(/[\d]/g, "0")
  );

  useEffect(() => {
    if (!active) return;
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
  }, [active, countTo, stat.decimals, stat.suffix, stat.value]);
  return text;
}

function StatItem({ active, ...stat }: Stat & { active: boolean }) {
  const shown = useCountUp(stat, active);
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
  useEffect(() => {
    const el = ref.current; if (!el) return;
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
        {stats.map((s, i) => <StatItem key={i} {...s} active={active} />)}
      </div>
    </div>
  );
}
