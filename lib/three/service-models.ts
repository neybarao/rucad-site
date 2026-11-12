import * as THREE from "three";

// Modelos 3D procedurais dos serviços, no estilo "wireframe de modelagem":
// superfície clara sombreada + malha de linhas azul-escuras desenhada no shader
// (sem as diagonais dos triângulos) + contornos nas arestas vivas.

export const MODEL_COLORS = {
  surface: new THREE.Color("#f3f7fc"),
  line: new THREE.Color("#0d1f38"),
};

type GridMode =
  | { mode: "uv"; grid: [number, number] } // linhas seguindo a UV (cilindros, tornos, tubos)
  | { mode: "tri"; density: number }; // linhas em espaço do objeto (caixas, extrusões)

const materialCache = new Map<string, THREE.MeshStandardMaterial>();

function gridMaterial(opts: GridMode, alpha = 0.42): THREE.MeshStandardMaterial {
  const key = JSON.stringify(opts) + alpha;
  const cached = materialCache.get(key);
  if (cached) return cached;

  const mat = new THREE.MeshStandardMaterial({
    color: MODEL_COLORS.surface,
    roughness: 0.62,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uLineColor = { value: MODEL_COLORS.line };
    shader.uniforms.uLineAlpha = { value: alpha };
    shader.uniforms.uGrid = { value: opts.mode === "uv" ? new THREE.Vector2(...opts.grid) : new THREE.Vector2(opts.density, opts.density) };

    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vObjPos;\nvarying vec3 vObjNormal;\nvarying vec2 vGridUv;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvObjPos = position;\nvObjNormal = normal;\nvGridUv = uv;");

    const coord =
      opts.mode === "uv"
        ? "vec2 g = vGridUv * uGrid;"
        : `vec3 an = abs(vObjNormal);
           vec2 p = (an.x > an.y && an.x > an.z) ? vObjPos.zy : ((an.y > an.z) ? vObjPos.xz : vObjPos.xy);
           vec2 g = p * uGrid;`;

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform vec3 uLineColor;\nuniform float uLineAlpha;\nuniform vec2 uGrid;\nvarying vec3 vObjPos;\nvarying vec3 vObjNormal;\nvarying vec2 vGridUv;",
      )
      .replace(
        "#include <opaque_fragment>",
        `${coord}
         vec2 gd = fwidth(g);
         vec2 ga = abs(fract(g - 0.5) - 0.5) / max(gd, vec2(1e-4));
         float gl = 1.0 - min(min(ga.x, ga.y), 1.0);
         outgoingLight = mix(outgoingLight, uLineColor, gl * uLineAlpha);
         #include <opaque_fragment>`,
      );
  };
  mat.customProgramCacheKey = () => key;
  materialCache.set(key, mat);
  return mat;
}

const edgeMaterial = new THREE.LineBasicMaterial({ color: MODEL_COLORS.line, transparent: true, opacity: 0.9 });

function part(
  parent: THREE.Object3D,
  geo: THREE.BufferGeometry,
  grid: GridMode,
  opts: { pos?: [number, number, number]; rot?: [number, number, number]; edges?: number | false } = {},
): THREE.Mesh {
  const mesh = new THREE.Mesh(geo, gridMaterial(grid));
  if (opts.pos) mesh.position.set(...opts.pos);
  if (opts.rot) mesh.rotation.set(...opts.rot);
  if (opts.edges !== false) {
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, opts.edges ?? 28), edgeMaterial));
  }
  parent.add(mesh);
  return mesh;
}

const T = (density = 10): GridMode => ({ mode: "tri", density });
const U = (u: number, v: number): GridMode => ({ mode: "uv", grid: [u, v] });

function rod(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number) {
  const len = a.distanceTo(b);
  const geo = new THREE.CylinderGeometry(r, r, len, 10, 1);
  const mesh = part(parent, geo, U(10, Math.max(2, Math.round(len * 10))), { edges: false });
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
}

function tube(parent: THREE.Object3D, points: THREE.Vector3[], r: number) {
  const curve = new THREE.CatmullRomCurve3(points);
  const len = curve.getLength();
  part(parent, new THREE.TubeGeometry(curve, 64, r, 8, false), U(Math.round(len * 14), 4), { edges: false });
}

// ------------------------------------------------------------------ modelos

/** Galpão industrial com SPDA: captores na cumeeira e descidas nas quinas. */
function spda(): THREE.Group {
  const g = new THREE.Group();
  const W = 2.4, D = 1.4, H = 1.0, R = 0.45;
  part(g, new THREE.BoxGeometry(3.2, 0.05, 2.2), T(5), { pos: [0, -0.025, 0] });
  part(g, new THREE.BoxGeometry(W, H, D), T(10), { pos: [0, H / 2, 0] });

  const roof = new THREE.Shape([new THREE.Vector2(-D / 2 - 0.05, 0), new THREE.Vector2(D / 2 + 0.05, 0), new THREE.Vector2(0, R)]);
  const roofGeo = new THREE.ExtrudeGeometry(roof, { depth: W + 0.1, bevelEnabled: false });
  roofGeo.translate(0, 0, -(W + 0.1) / 2);
  part(g, roofGeo, T(10), { pos: [0, H, 0], rot: [0, Math.PI / 2, 0] });

  // porta e faixa de janelas na fachada
  part(g, new THREE.BoxGeometry(0.6, 0.7, 0.03), T(10), { pos: [-0.5, 0.35, D / 2 + 0.015] });
  part(g, new THREE.BoxGeometry(1.7, 0.12, 0.03), T(12), { pos: [0.2, 0.82, D / 2 + 0.015] });

  // cumeeira: condutor + captores
  const ridgeY = H + R + 0.01;
  rod(g, new THREE.Vector3(-W / 2, ridgeY, 0), new THREE.Vector3(W / 2, ridgeY, 0), 0.012);
  for (let i = 0; i < 5; i++) {
    const x = -W / 2 + 0.1 + (i * (W - 0.2)) / 4;
    rod(g, new THREE.Vector3(x, ridgeY, 0), new THREE.Vector3(x, ridgeY + 0.32, 0), 0.012);
    part(g, new THREE.SphereGeometry(0.03, 12, 8), U(12, 6), { pos: [x, ridgeY + 0.34, 0], edges: false });
  }
  // descidas
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (W / 2 + 0.015), z = sz * (D / 2 + 0.015);
    rod(g, new THREE.Vector3(x, 0, z), new THREE.Vector3(x, H, z), 0.012);
  }
  return g;
}

/** Painel de média tensão + instrumento de ensaio com cabos. */
function ensaios(): THREE.Group {
  const g = new THREE.Group();
  part(g, new THREE.BoxGeometry(1.1, 0.08, 0.8), T(6), { pos: [0, 0.04, 0] });
  part(g, new THREE.BoxGeometry(1.0, 1.9, 0.7), T(10), { pos: [0, 0.08 + 0.95, 0] });
  const front = 0.35 + 0.015;
  part(g, new THREE.BoxGeometry(0.44, 0.95, 0.03), T(10), { pos: [-0.24, 1.38, front] });
  part(g, new THREE.BoxGeometry(0.44, 0.95, 0.03), T(10), { pos: [0.24, 1.38, front] });
  part(g, new THREE.BoxGeometry(0.92, 0.6, 0.03), T(10), { pos: [0, 0.5, front] });
  part(g, new THREE.BoxGeometry(0.24, 0.14, 0.02), T(30), { pos: [-0.24, 1.7, front + 0.02] });
  for (const x of [-0.06, 0.06]) {
    part(g, new THREE.CylinderGeometry(0.02, 0.02, 0.16, 12), U(12, 4), { pos: [x, 1.3, front + 0.035] });
  }
  for (let i = 0; i < 3; i++) {
    part(g, new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16), U(16, 2), { pos: [-0.2 + i * 0.2, 0.62, front + 0.02], rot: [Math.PI / 2, 0, 0] });
  }

  // instrumento
  const tester = new THREE.Group();
  tester.position.set(0.95, 0, 0.35);
  tester.rotation.y = -0.5;
  g.add(tester);
  part(tester, new THREE.BoxGeometry(0.5, 0.28, 0.38), T(9), { pos: [0, 0.14, 0] });
  part(tester, new THREE.CylinderGeometry(0.07, 0.07, 0.03, 24), U(24, 2), { pos: [0.1, 0.29, 0] });
  part(tester, new THREE.BoxGeometry(0.16, 0.01, 0.1), T(30), { pos: [-0.1, 0.285, 0] });
  part(tester, new THREE.TorusGeometry(0.12, 0.015, 8, 24, Math.PI), U(24, 4), { pos: [0, 0.3, 0], edges: false });

  tube(g, [new THREE.Vector3(0.82, 0.3, 0.36), new THREE.Vector3(0.65, 0.12, 0.7), new THREE.Vector3(0.3, 0.2, 0.62), new THREE.Vector3(0.0, 0.62, front + 0.03)], 0.012);
  tube(g, [new THREE.Vector3(0.88, 0.3, 0.48), new THREE.Vector3(0.7, 0.06, 0.85), new THREE.Vector3(0.35, 0.15, 0.75), new THREE.Vector3(0.2, 0.62, front + 0.03)], 0.012);
  return g;
}

/** Poste de distribuição com cruzeta, isoladores, transformador e condutores. */
function redes(): THREE.Group {
  const g = new THREE.Group();
  part(g, new THREE.CylinderGeometry(0.06, 0.095, 2.3, 24, 1), U(24, 34), { pos: [0, 1.15, 0] });
  part(g, new THREE.BoxGeometry(1.6, 0.09, 0.09), T(14), { pos: [0, 2.0, 0] });
  // mão-francesa
  rod(g, new THREE.Vector3(-0.45, 1.96, 0), new THREE.Vector3(0, 1.65, 0), 0.012);
  rod(g, new THREE.Vector3(0.45, 1.96, 0), new THREE.Vector3(0, 1.65, 0), 0.012);

  const insulatorProfile: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  for (let i = 0; i < 3; i++) {
    const y = i * 0.055;
    insulatorProfile.push(new THREE.Vector2(0.025, y), new THREE.Vector2(0.06, y + 0.015), new THREE.Vector2(0.06, y + 0.025), new THREE.Vector2(0.025, y + 0.045));
  }
  insulatorProfile.push(new THREE.Vector2(0.025, 0.18), new THREE.Vector2(0, 0.19));
  const insulatorGeo = new THREE.LatheGeometry(insulatorProfile, 24);
  const xs = [-0.7, 0, 0.7];
  for (const x of xs) part(g, insulatorGeo, U(24, 16), { pos: [x, 2.045, 0], edges: 50 });

  // condutores saindo do enquadramento com catenária
  for (const x of xs) {
    const top = new THREE.Vector3(x, 2.235, 0);
    tube(g, [top.clone().setZ(-1.1).setY(2.1), top.clone().setZ(-0.55).setY(2.18), top], 0.008);
    tube(g, [top, top.clone().setZ(0.55).setY(2.18), top.clone().setZ(1.1).setY(2.1)], 0.008);
  }

  // transformador
  const tr = new THREE.Group();
  tr.position.set(0, 1.2, 0.26);
  g.add(tr);
  part(tr, new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32, 1), U(32, 10), {});
  part(tr, new THREE.CylinderGeometry(0.21, 0.21, 0.04, 32, 1), U(32, 1), { pos: [0, 0.27, 0] });
  for (let i = 0; i < 2; i++) {
    part(tr, new THREE.CylinderGeometry(0.025, 0.025, 0.12, 12), U(12, 4), { pos: [-0.08 + i * 0.16, 0.35, 0] });
  }
  part(g, new THREE.BoxGeometry(0.08, 0.3, 0.12), T(16), { pos: [0, 1.2, 0.1] });
  return g;
}

/** Lâmpada com rosca: eficiência energética (e eco do símbolo da marca). */
function eficiencia(): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, 0), new THREE.Vector2(0.08, 0), new THREE.Vector2(0.12, 0.03), new THREE.Vector2(0.16, 0.06)];
  for (let i = 0; i < 8; i++) {
    const y = 0.08 + i * 0.05;
    pts.push(new THREE.Vector2(0.2, y), new THREE.Vector2(0.225, y + 0.025));
  }
  pts.push(new THREE.Vector2(0.2, 0.5), new THREE.Vector2(0.235, 0.53), new THREE.Vector2(0.24, 0.6));
  const glass = new THREE.SplineCurve([
    new THREE.Vector2(0.24, 0.6),
    new THREE.Vector2(0.3, 0.72),
    new THREE.Vector2(0.45, 0.92),
    new THREE.Vector2(0.62, 1.18),
    new THREE.Vector2(0.69, 1.45),
    new THREE.Vector2(0.64, 1.75),
    new THREE.Vector2(0.45, 1.97),
    new THREE.Vector2(0.2, 2.06),
    new THREE.Vector2(0, 2.08),
  ]);
  pts.push(...glass.getPoints(40).slice(1));
  part(g, new THREE.LatheGeometry(pts, 56), U(28, 44), { edges: 60 });
  return g;
}

/** Mesas de módulos fotovoltaicos sobre estrutura. */
function ufv(): THREE.Group {
  const g = new THREE.Group();
  const tilt = -0.5;
  const table = (z: number) => {
    const t = new THREE.Group();
    t.position.z = z;
    g.add(t);
    const panels = new THREE.Group();
    panels.position.y = 0.75;
    panels.rotation.x = tilt;
    t.add(panels);
    for (let i = 0; i < 3; i++) {
      part(panels, new THREE.BoxGeometry(0.62, 0.04, 1.05), U(6, 10), { pos: [-0.66 + i * 0.66, 0, 0] });
    }
    part(panels, new THREE.BoxGeometry(2.0, 0.04, 0.05), T(14), { pos: [0, -0.04, -0.32] });
    part(panels, new THREE.BoxGeometry(2.0, 0.04, 0.05), T(14), { pos: [0, -0.04, 0.32] });
    for (const x of [-0.85, 0, 0.85]) {
      const back = new THREE.Vector3(x, 0, -0.3), front = new THREE.Vector3(x, 0, 0.3);
      rod(t, back, back.clone().setY(0.75 + Math.sin(-tilt) * 0.3 - 0.06), 0.02);
      rod(t, front, front.clone().setY(0.75 - Math.sin(-tilt) * 0.3 - 0.06), 0.02);
    }
  };
  table(-0.62);
  table(0.62);
  part(g, new THREE.BoxGeometry(2.5, 0.03, 2.4), T(5), { pos: [0, -0.015, 0] });
  return g;
}

const builders: Record<string, () => THREE.Group> = {
  "projetos-eletricos-spda": spda,
  "ensaios-comissionamento-laudos": ensaios,
  "construcao-manutencao-redes": redes,
  "eficiencia-energetica": eficiencia,
  "ufv-fotovoltaica": ufv,
};

export function buildServiceModel(slug: string): THREE.Group | null {
  const build = builders[slug];
  if (!build) return null;
  const model = build();
  // centraliza no chão e na origem para girar em torno do próprio eixo
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  const pivot = new THREE.Group();
  pivot.add(model);
  return pivot;
}
