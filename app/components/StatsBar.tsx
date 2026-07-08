"use client";
import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string };

function useCountUp(target: string, active: boolean) {
  const [text, setText] = useState(target.replace(/[\d]/g, "0"));
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(target); return; }
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (!num) { setText(target); return; }
    const prefix = target.slice(0, target.search(/\d/));
    const suffix = target.slice(target.search(/\d/) + String(num).length);
    let raf = 0; const start = performance.now(); const dur = 1200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setText(prefix + Math.round(num * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return text;
}

function StatItem({ value, label, active }: Stat & { active: boolean }) {
  const shown = useCountUp(value, active);
  return (
    <div className="stat">
      <div className="stat__value">{shown}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <div className="statsbar" ref={ref}>
      <div className="wrap statsbar__grid">
        {stats.map((s, i) => <StatItem key={i} value={s.value} label={s.label} active={active} />)}
      </div>
    </div>
  );
}
