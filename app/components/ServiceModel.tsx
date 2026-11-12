"use client";

import { useEffect, useRef } from "react";

// Modelo 3D do serviço. O three.js só é baixado quando o card chega perto da
// tela; fora da tela o loop para.
// Repouso: gira devagar e inclina seguindo o cursor.
// Hover (ou, no touch, card na faixa central da tela): para de girar, vai para
// uma vista isométrica quase sem perspectiva, abre a vista explodida e destaca
// o elemento-chave em amarelo.
export default function ServiceModel({ slug, theme = "light" }: { slug: string; theme?: "light" | "dark" }) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      const THREE = await import("three");
      const { buildServiceModel } = await import("@/lib/three/service-models");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // sem WebGL: o card continua com o fundo liso
      }
      const built = buildServiceModel(slug, theme);
      if (!built) return;
      const handle = built;
      const model = handle.pivot;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const touch = window.matchMedia("(hover: none)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 0xaebdd2, 1.7));
      const sun = new THREE.DirectionalLight(0xffffff, 1.9);
      sun.position.set(3, 5, 4);
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0xdfe9f7, 0.6);
      fill.position.set(-4, 1, -2);
      scene.add(fill);
      scene.add(model);

      // Enquadramento: o modelo gira em Y, então o volume ocupado é um cilindro
      // (raio máximo no plano XZ, altura do bounding box). Mede no repouso e na
      // vista explodida e usa a união, para nada sair do card na transição.
      let rXZ = 0;
      let yMin = Infinity, yMax = -Infinity;
      const measure = () => {
        const v = new THREE.Vector3();
        model.updateMatrixWorld(true);
        model.traverse((o) => {
          const m = o as import("three").Mesh;
          if (!m.isMesh) return;
          const pos = m.geometry.attributes.position;
          for (let i = 0; i < pos.count; i += 3) {
            v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
            rXZ = Math.max(rXZ, Math.hypot(v.x, v.z));
            yMin = Math.min(yMin, v.y);
            yMax = Math.max(yMax, v.y);
          }
        });
      };
      handle.setState(1);
      measure();
      handle.setState(0);
      measure();

      const center = new THREE.Vector3(0, (yMin + yMax) / 2, 0);
      const samples: import("three").Vector3[] = [];
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        for (const y of [yMin, yMax]) samples.push(new THREE.Vector3(Math.cos(a) * rXZ, y, Math.sin(a) * rXZ));
      }

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
      const baseDir = new THREE.Vector3(1.1, 0.62, 1.45).normalize();
      const isoDir = new THREE.Vector3(1, 0.816, 1).normalize(); // ~35° de elevação: isométrica
      const viewDir = new THREE.Vector3();
      const margin = 0.86;
      const BASE_FOV = 28, ISO_FOV = 9; // FOV baixo = quase ortográfica

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
      };

      const place = (t: number) => {
        viewDir.copy(baseDir).lerp(isoDir, t).normalize();
        camera.fov = BASE_FOV + (ISO_FOV - BASE_FOV) * t;
        const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * margin;
        const tanH = tanV * camera.aspect;
        const fwd = viewDir.clone().negate();
        const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
        const up = new THREE.Vector3().crossVectors(right, fwd);
        let dist = 0;
        for (const p of samples) {
          const d = p.clone().sub(center);
          const depth = d.dot(viewDir);
          dist = Math.max(dist, Math.abs(d.dot(right)) / tanH + depth, Math.abs(d.dot(up)) / tanV + depth);
        }
        camera.position.copy(viewDir).multiplyScalar(dist).add(center);
        camera.lookAt(center);
        camera.near = Math.max(0.05, dist / 50);
        camera.far = dist * 4;
        camera.updateProjectionMatrix();
      };

      // ---------------------------------------------------------- interação
      // área que reage ao cursor: o card inteiro na home, a coluna do modelo no hero
      const card = host.closest("[data-model-hover]") as HTMLElement | null;
      const pointer = { x: 0, y: 0 };
      let hover = false;
      let visible = false;
      let raf = 0;
      let last = performance.now();

      const kick = () => {
        if (!visible || document.hidden || raf) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };

      const onMove = (e: PointerEvent) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        pointer.y = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
        pointer.x = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
        kick();
      };
      const onEnter = () => { hover = true; kick(); };
      const onLeave = () => { hover = false; pointer.x = 0; pointer.y = 0; kick(); };
      if (card && !touch) {
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        card.addEventListener("focus", onEnter);
        card.addEventListener("blur", onLeave);
      }
      // touch: liga o destaque quando o card passa pela faixa central da tela
      let centerIO: IntersectionObserver | undefined;
      if (card && touch) {
        centerIO = new IntersectionObserver(([entry]) => { hover = entry.isIntersecting; kick(); }, { rootMargin: "-38% 0px -38% 0px" });
        centerIO.observe(card);
      }

      resize();
      place(0);
      const ro = new ResizeObserver(() => { resize(); place(easeInOut(state)); renderer.render(scene, camera); });
      ro.observe(host);

      // ---------------------------------------------------------- loop
      let spin = 0;
      let state = 0; // 0 repouso → 1 hover
      const tilt = { x: 0, y: 0 };
      const QUARTER = Math.PI / 2;

      function frame(now: number) {
        raf = 0;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const k = reduceMotion ? 1 : Math.min(1, dt * 4.5);
        const goal = hover ? 1 : 0;

        state += (goal - state) * k;
        if (Math.abs(state - goal) < 0.002) state = goal;

        if (hover) {
          // alinha os eixos do modelo a 45° da câmera (enquadramento isométrico)
          const target = Math.round(spin / QUARTER) * QUARTER;
          spin += (target - spin) * k;
        } else if (!reduceMotion) {
          spin += dt * 0.22;
        }
        const follow = 1 - state * 0.75;
        const tk = reduceMotion ? 1 : Math.min(1, dt * 5);
        tilt.x += (pointer.x * follow - tilt.x) * tk;
        tilt.y += (pointer.y * follow - tilt.y) * tk;

        const e = easeInOut(state);
        model.rotation.set(tilt.x, spin + tilt.y, 0);
        handle.setState(e);
        place(e);
        renderer.render(scene, camera);

        // com reduced motion, o loop dorme quando nada está mudando
        const settled = reduceMotion && state === goal;
        if (visible && !document.hidden && !settled) raf = requestAnimationFrame(frame);
      }

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      });
      io.observe(host);
      const onVis = () => kick();
      document.addEventListener("visibilitychange", onVis);
      renderer.render(scene, camera);
      host.classList.add("is-ready");

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        centerIO?.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        if (card) {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
          card.removeEventListener("focus", onEnter);
          card.removeEventListener("blur", onLeave);
        }
        handle.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // só carrega quando estiver a ~1 tela de distância
    const lazy = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        lazy.disconnect();
        start();
      }
    }, { rootMargin: "600px 0px" });
    lazy.observe(host);

    return () => {
      disposed = true;
      lazy.disconnect();
      cleanup?.();
    };
  }, [slug, theme]);

  return <span ref={hostRef} className="smodel" />;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
