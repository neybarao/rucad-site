"use client";

import { useEffect, useRef } from "react";

// Símbolo da Rucad formado por partículas de luz (canvas 2D, sem bibliotecas).
// As partículas são sorteadas dentro das formas do SVG da marca, convergem para
// formar o símbolo e depois pulsam em ondas que saem do centro. O cursor afasta
// as partículas próximas, que voltam por mola. Fora da tela, o loop para.

const VIEW_W = 41;
const VIEW_H = 49;
const PATHS = [
  "M23.9543 42.6156C26.1881 42.069 28.1792 46.5902 16.3485 48.7623C15.1348 48.9851 13.9574 48.2382 13.706 47.0301C13.4546 45.8221 14.2301 44.6391 15.4382 44.3877L23.9543 42.6156Z",
  "M20.387 0C31.6464 0 40.7739 9.12758 40.7739 20.387C40.7739 29.1928 35.8757 34.6631 30.1911 37.9418C24.6153 41.1577 18.1122 42.3964 14.1732 42.949C12.7985 43.1418 11.5277 42.1837 11.3349 40.809C11.1421 39.4343 12.1002 38.1635 13.4749 37.9707C17.2507 37.4411 22.9659 36.3059 27.6796 33.5873C32.2844 30.9314 35.747 26.9064 35.747 20.387C35.747 11.9039 28.8701 5.02693 20.387 5.02693C11.9038 5.02693 5.02692 11.9039 5.02692 20.387C5.02692 24.9849 8.40368 30.495 14.6619 31.3729C16.0366 31.5657 16.9947 32.8365 16.8019 34.2112C16.609 35.5858 15.3383 36.5439 13.9636 36.3511C4.79199 35.0646 0 27.0299 0 20.387C1.15183e-06 9.12758 9.12755 0 20.387 0Z",
  "M17.512 16.6867C17.7025 16.6867 17.9168 16.7466 18.1489 16.8783L23.2744 19.6386L27.5902 17.1417C28.3105 16.7346 28.8939 17.4831 28.4177 18.0878L24.0364 23.6563C23.7982 23.9617 23.5482 24.0875 23.2744 24.0875C23.0779 24.0875 22.8755 24.0156 22.6374 23.8959L17.5179 21.1355L13.2021 23.6144C12.5473 23.9976 11.8211 23.4049 12.3865 22.6744L16.756 17.1178C16.9941 16.8125 17.2322 16.6867 17.512 16.6867Z",
];

type Particle = {
  u: number; // posição alvo normalizada no viewBox (0..1)
  v: number;
  edge: number; // 1 = na borda, 0 = no miolo
  sx: number; // posição inicial (fração do canvas), para a entrada
  sy: number;
  ox: number; // deslocamento pelo cursor (px), volta por mola
  oy: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  orbit: number;
  size: number;
};

type Sample = { u: number; v: number; edge: number };

// Rasteriza o símbolo e sorteia pontos com peso maior perto das bordas
// (distância até a borda calculada por transformada de distância). Resultado:
// contorno denso e brilhante, miolo esparso, como uma casca iluminada.
function samplePoints(count: number, only?: number): Sample[] {
  const S = 8; // resolução por unidade do viewBox
  const w = VIEW_W * S, h = VIEW_H * S;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return [];
  g.scale(S, S);
  g.fillStyle = "#fff";
  PATHS.forEach((d, i) => { if (only === undefined || only === i) g.fill(new Path2D(d)); });
  const data = g.getImageData(0, 0, w, h).data;

  // transformada de distância (chamfer 3-4) até o pixel vazio mais próximo
  const INF = 1e9;
  const dist = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) dist[i] = data[i * 4 + 3] > 128 ? INF : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (!dist[i]) continue;
    let m = dist[i];
    if (x > 0) m = Math.min(m, dist[i - 1] + 3);
    if (y > 0) {
      m = Math.min(m, dist[i - w] + 3);
      if (x > 0) m = Math.min(m, dist[i - w - 1] + 4);
      if (x < w - 1) m = Math.min(m, dist[i - w + 1] + 4);
    }
    dist[i] = m;
  }
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x;
    if (!dist[i]) continue;
    let m = dist[i];
    if (x < w - 1) m = Math.min(m, dist[i + 1] + 3);
    if (y < h - 1) {
      m = Math.min(m, dist[i + w] + 3);
      if (x < w - 1) m = Math.min(m, dist[i + w + 1] + 4);
      if (x > 0) m = Math.min(m, dist[i + w - 1] + 4);
    }
    dist[i] = m;
  }

  // pesos: borda (distância pequena) pesa muito mais que o miolo
  const idx: number[] = [];
  const cum: number[] = [];
  let total = 0;
  for (let i = 0; i < w * h; i++) {
    if (!dist[i]) continue;
    const d = dist[i] / 3; // em pixels da amostragem
    total += 0.06 + Math.exp(-d / 2.2);
    idx.push(i);
    cum.push(total);
  }
  const pick = () => {
    const r = Math.random() * total;
    let lo = 0, hi = cum.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < r) lo = mid + 1; else hi = mid; }
    return idx[lo];
  };

  const pts: Sample[] = [];
  for (let k = 0; k < count; k++) {
    const i = pick();
    let x = (i % w) + Math.random();
    let y = Math.floor(i / w) + Math.random();
    const d = dist[i] / 3;
    const edge = Math.exp(-d / 3);
    // parte das partículas da borda escapa um pouco para fora: halo granulado
    if (edge > 0.5 && Math.random() < 0.18) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.abs(gauss()) * 3.2;
      x += Math.cos(a) * r;
      y += Math.sin(a) * r;
    }
    pts.push({ u: x / w, v: y / h, edge });
  }
  return pts;
}

function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) * 1.6;
}

function makeSprite(): HTMLCanvasElement {
  // ponto de luz com halo, desenhado uma vez e reaproveitado
  const s = 32;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  // núcleo branco bem definido e halo curto: ponto pequeno e brilhante
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.28, "rgba(255,255,255,1)");
  grad.addColorStop(0.45, "rgba(225,240,255,0.5)");
  grad.addColorStop(1, "rgba(180,215,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

export default function ParticleSymbol() {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 700;
    const COUNT = small ? 5200 : 12000;
    const sprite = makeSprite();
    // o raio central é a forma mais fina: recebe partículas extras para ter o mesmo brilho
    const points = [...samplePoints(COUNT), ...samplePoints(Math.round(COUNT * 0.12), 2)];
    const particles: Particle[] = points.map(({ u, v, edge }) => ({
      u,
      v,
      edge,
      sx: Math.random(),
      sy: Math.random(),
      ox: 0,
      oy: 0,
      vx: 0,
      vy: 0,
      phase: Math.random() * Math.PI * 2,
      speed: 0.9 + Math.random() * 1.8,
      orbit: 0.5 + Math.random() * 1.8,
      size: (Math.random() < 0.05 ? 1.2 + Math.random() * 0.5 : 0.5 + Math.random() * 0.4) * (0.8 + edge * 0.45),
    }));

    // camada de glow: as partículas são desenhadas também num canvas menor que
    // vai por cima borrado (bloom). Só onde o navegador suporta filtro em canvas.
    // O borrão é aplicado em baixa resolução (barato) e depois ampliado.
    const bloom = document.createElement("canvas");
    const bctx = bloom.getContext("2d");
    const glow = document.createElement("canvas");
    const gctx = glow.getContext("2d");
    const BLOOM_SCALE = 0.33;
    let hasFilter = !!bctx && !!gctx && "filter" in ctx && !small;

    let W = 0, H = 0, dpr = 1;
    let box = { x: 0, y: 0, s: 1 }; // posição e escala do símbolo no canvas
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth;
      H = host.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      bloom.width = glow.width = Math.max(1, Math.round(W * BLOOM_SCALE));
      bloom.height = glow.height = Math.max(1, Math.round(H * BLOOM_SCALE));
      const s = Math.min((W * 0.92) / VIEW_W, (H * 0.96) / VIEW_H);
      box = { s, x: (W - VIEW_W * s) / 2, y: (H - VIEW_H * s) / 2 };
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); kick(); });
    ro.observe(host);

    const pointer = { x: -9999, y: -9999 };
    const zone = (host.closest("[data-model-hover]") as HTMLElement | null) ?? host;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let frameNo = 0;
    let slowAvg = 1 / 60;
    let visible = false;
    const t0 = performance.now();
    let last = t0;
    const INTRO = reduceMotion ? 0 : 2.2; // segundos de convergência

    function frame(now: number) {
      raf = 0;
      const t = (now - t0) / 1000;
      const rawDt = (now - last) / 1000;
      const dt = Math.min(rawDt, 0.05);
      // proteção para máquinas fracas: se a média passar de ~28 ms por quadro
      // depois da entrada, desliga o glow (as partículas continuam)
      if (hasFilter && t > INTRO + 0.5 && rawDt < 0.5) {
        slowAvg = slowAvg * 0.95 + rawDt * 0.05;
        if (slowAvg > 0.028 && t > INTRO + 2.5) hasFilter = false;
      }
      last = now;
      const intro = INTRO ? Math.min(1, t / INTRO) : 1;
      const ease = 1 - Math.pow(1 - intro, 3);
      const breathe = reduceMotion ? 1 : 1 + Math.sin(t * 1.1) * 0.012;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const cx = box.x + (VIEW_W * box.s) / 2;
      const cy = box.y + (VIEW_H * box.s) / 2;

      // luz de lâmpada atrás do símbolo, pulsando junto com as partículas
      const lamp = reduceMotion ? 0.7 : 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2.4));
      // o raio da luz não passa da borda mais próxima do canvas: assim ela some
      // por completo antes da borda e não aparece cortada em linha reta
      const ly = cy - box.s * 4;
      const lr = Math.max(1, Math.min(VIEW_W * box.s * 0.75, cx, W - cx, ly, H - ly));
      const lg = ctx!.createRadialGradient(cx, ly, 0, cx, ly, lr);
      lg.addColorStop(0, `rgba(185,215,255,${0.24 * lamp * ease})`);
      lg.addColorStop(0.6, `rgba(130,180,255,${0.09 * lamp * ease})`);
      lg.addColorStop(1, "rgba(100,150,255,0)");
      ctx!.fillStyle = lg;
      ctx!.fillRect(0, 0, W, H);

      ctx!.globalCompositeOperation = "lighter";
      // o glow muda devagar: recalculado a cada 3 quadros, reaproveitado nos outros
      const redrawGlow = hasFilter && frameNo++ % 3 === 0;
      if (redrawGlow) {
        bctx!.setTransform(BLOOM_SCALE, 0, 0, BLOOM_SCALE, 0, 0);
        bctx!.clearRect(0, 0, W, H);
        bctx!.globalCompositeOperation = "lighter";
      }
      const unit = box.s / 6; // escala do movimento fino relativa ao tamanho do símbolo
      const R = Math.max(40, box.s * 5); // raio de influência do cursor

      for (const p of particles) {
        // alvo no símbolo (com respiração em torno do centro)
        let x = cx + (box.x + p.u * VIEW_W * box.s - cx) * breathe;
        let y = cy + (box.y + p.v * VIEW_H * box.s - cy) * breathe;
        // movimento: micro-órbita própria + ondulação que percorre o contorno
        if (!reduceMotion) {
          x += Math.cos(t * p.speed + p.phase) * p.orbit * unit;
          y += Math.sin(t * p.speed * 1.3 + p.phase) * p.orbit * unit;
          const flow = (0.5 + p.edge) * unit * 1.6;
          x += Math.sin(t * 1.9 + p.v * 26 + p.u * 9) * flow;
          y += Math.cos(t * 1.6 + p.u * 24 - p.v * 7) * flow;
        }
        // entrada: vêm de posições aleatórias
        if (ease < 1) {
          x = p.sx * W + (x - p.sx * W) * ease;
          y = p.sy * H + (y - p.sy * H) * ease;
        }
        // cursor empurra, mola traz de volta
        if (!reduceMotion) {
          const dx = x + p.ox - pointer.x;
          const dy = y + p.oy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 900;
            p.vx += (dx / d) * f * dt;
            p.vy += (dy / d) * f * dt;
          }
          p.vx += -p.ox * 14 * dt;
          p.vy += -p.oy * 14 * dt;
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.ox += p.vx * dt;
          p.oy += p.vy * dt;
        }
        x += p.ox;
        y += p.oy;

        // pulso: onda de brilho que sai do centro
        const dist = Math.hypot(x - cx, y - cy) / (box.s * 10);
        const wave = reduceMotion ? 0.6 : 0.5 + 0.5 * Math.sin(t * 2.4 - dist * 2.2 + p.phase * 0.35);
        // cintilação: de tempos em tempos a partícula acende forte por um instante
        const twinkle = reduceMotion ? 0 : Math.max(0, Math.sin(t * p.speed * 3.1 + p.phase * 7) - 0.92) * 9;
        const alpha = Math.min(1, ((0.35 + 0.9 * p.edge) * (0.65 + 0.6 * wave) + twinkle) * (0.35 + 0.65 * ease));
        const size = p.size * (0.9 + wave * 0.3 + twinkle * 0.4) * Math.min(1.4, Math.max(1, box.s / 12));

        ctx!.globalAlpha = alpha;
        const s = size * 3.2;
        ctx!.drawImage(sprite, x - s / 2, y - s / 2, s, s);
        if (redrawGlow && p.edge > 0.35) {
          bctx!.globalAlpha = alpha;
          bctx!.drawImage(sprite, x - s, y - s, s * 2, s * 2);
        }
      }
      if (hasFilter) {
        // glow: borra a camada de bordas em baixa resolução e amplia por cima, em modo aditivo
        if (redrawGlow) {
          gctx!.setTransform(1, 0, 0, 1, 0, 0);
          gctx!.clearRect(0, 0, glow.width, glow.height);
          gctx!.filter = "blur(2.5px)";
          gctx!.drawImage(bloom, 0, 0);
          gctx!.filter = "none";
        }
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.globalAlpha = 1;
        ctx!.drawImage(glow, 0, 0, canvas.width, canvas.height);
        ctx!.globalAlpha = 0.45;
        ctx!.drawImage(glow, 0, 0, canvas.width, canvas.height);
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = "source-over";

      const settled = reduceMotion && intro >= 1;
      if (visible && !document.hidden && !settled) raf = requestAnimationFrame(frame);
    }

    const kick = () => {
      if (!visible || document.hidden || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); });
    io.observe(host);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);
    zone.addEventListener("pointermove", kick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointermove", kick);
      zone.removeEventListener("pointerleave", onLeave);
      canvas.remove();
    };
  }, []);

  return <span ref={hostRef} className="psymbol" />;
}
