"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

const zeroOf = (s: Stat) =>
  typeof s.countTo === "number" ? formatStatValue(0, s.decimals, s.suffix) : s.value.replace(/\d/g, "0");

// Faixa de números.
// - O HTML sai do build com o valor real: é o que buscadores e robôs de IA leem.
// - No navegador, antes da primeira pintura com JS, os valores zeram (escondidos
//   por CSS até esse momento, para não piscar) e contam até o valor real quando a
//   faixa aparece na tela. Se a tela de abertura está ativa, espera ela sair.
// - Com prefers-reduced-motion, mostra o valor final direto.
function StatItem({ stat, progress }: { stat: Stat; progress: number | null }) {
  let shown = stat.value;
  if (progress !== null) {
    if (typeof stat.countTo === "number") shown = progress >= 1 ? stat.value : formatStatValue(stat.countTo * progress, stat.decimals, stat.suffix);
    else shown = progress >= 1 ? stat.value : zeroOf(stat);
  }
  return (
    <div className="stat">
      <div className="stat__value">{shown}</div>
      <div className="stat__label">{stat.label}</div>
    </div>
  );
}

export default function StatsBar({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  // null = valor real (HTML do build); 0..1 = progresso da contagem
  const [progress, setProgress] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setProgress(0);
    el.classList.add("is-ready");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer = 0;

    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // com a tela de abertura ativa, começa quando ela some (~1,3 s do carregamento)
        const loaderOn = document.documentElement.classList.contains("loader-on");
        const wait = loaderOn ? Math.max(0, 1300 - performance.now()) : 0;
        timer = window.setTimeout(run, wait + 150);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="statsbar" ref={ref}>
      <div className="wrap statsbar__grid">
        {stats.map((s, i) => <StatItem key={i} stat={s} progress={progress} />)}
      </div>
    </div>
  );
}
