"use client";

import { useEffect, useRef } from "react";

// Modelo 3D do serviço. O three.js só é baixado quando o card chega perto da
// tela; fora da tela o loop para. Gira devagar sozinho e inclina seguindo o
// cursor dentro do card (sem arrastar, para não brigar com o clique do link).
export default function ServiceModel({ slug, interactive = "hover" }: { slug: string; interactive?: "hover" | "none" }) {
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
      const model = buildServiceModel(slug);
      if (!model) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      // (raio máximo no plano XZ, altura do bounding box). Amostra pontos desse
      // cilindro e calcula a distância mínima para todos caberem com margem.
      const box = new THREE.Box3().setFromObject(model);
      let rXZ = 0;
      model.traverse((o) => {
        const m = o as import("three").Mesh;
        if (!m.isMesh) return;
        const pos = m.geometry.attributes.position;
        const v = new THREE.Vector3();
        m.updateWorldMatrix(true, false);
        for (let i = 0; i < pos.count; i += 3) {
          v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
          rXZ = Math.max(rXZ, Math.hypot(v.x, v.z));
        }
      });
      const center = new THREE.Vector3(0, (box.min.y + box.max.y) / 2, 0);
      const samples: import("three").Vector3[] = [];
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        for (const y of [box.min.y, box.max.y]) samples.push(new THREE.Vector3(Math.cos(a) * rXZ, y, Math.sin(a) * rXZ));
      }
      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
      const viewDir = new THREE.Vector3(1.1, 0.62, 1.45).normalize();
      const margin = 0.86;

      const fit = () => {
        const w = host.clientWidth, h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * margin;
        const tanH = tanV * camera.aspect;
        // base ortonormal da câmera
        const fwd = viewDir.clone().negate();
        const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
        const up = new THREE.Vector3().crossVectors(right, fwd);
        let dist = 0;
        for (const p of samples) {
          const d = p.clone().sub(center);
          const depth = d.dot(viewDir); // quanto o ponto está "na frente" do centro, em direção à câmera
          dist = Math.max(dist, Math.abs(d.dot(right)) / tanH + depth, Math.abs(d.dot(up)) / tanV + depth);
        }
        camera.position.copy(viewDir).multiplyScalar(dist).add(center);
        camera.lookAt(center);
        camera.near = Math.max(0.05, dist / 50);
        camera.updateProjectionMatrix();
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(host);

      // interação
      const card = host.closest(".scard") as HTMLElement | null;
      const target = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        if (!card) return;
        const r = card.getBoundingClientRect();
        target.y = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
        target.x = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
      };
      const onLeave = () => { target.x = 0; target.y = 0; };
      if (interactive === "hover" && card) {
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
      }

      let visible = false;
      let raf = 0;
      let last = performance.now();
      let spin = 0;
      const tilt = { x: 0, y: 0 };
      const frame = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        if (!reduceMotion) spin += dt * 0.22;
        tilt.x += (target.x - tilt.x) * Math.min(1, dt * 5);
        tilt.y += (target.y - tilt.y) * Math.min(1, dt * 5);
        model.rotation.set(tilt.x, spin + tilt.y, 0);
        renderer.render(scene, camera);
        if (visible && !document.hidden) raf = requestAnimationFrame(frame);
      };
      const run = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame); };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) run();
      });
      io.observe(host);
      const onVis = () => { if (visible && !document.hidden) run(); };
      document.addEventListener("visibilitychange", onVis);
      renderer.render(scene, camera);
      host.classList.add("is-ready");

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        card?.removeEventListener("pointermove", onMove);
        card?.removeEventListener("pointerleave", onLeave);
        model.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose();
        });
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
  }, [slug, interactive]);

  return <span ref={hostRef} className="smodel" />;
}
