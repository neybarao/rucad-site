import * as THREE from "three";

// Modelos 3D procedurais dos serviços, no estilo "wireframe de modelagem":
// superfície clara sombreada + malha de linhas azul-escuras desenhada no shader
// (sem as diagonais dos triângulos) + contornos nas arestas vivas.

export type ModelTheme = "light" | "dark";

// light: cards da home (fundo branco-azulado, linha azul-escura)
// dark: hero das páginas de serviço (fundo azul, linha azul-clara)
const THEMES: Record<ModelTheme, { surface: string; line: string; fade: string; edgeOpacity: number }> = {
  light: { surface: "#f3f7fc", line: "#0d1f38", fade: "#e6edf7", edgeOpacity: 0.9 },
  dark: { surface: "#0e2f59", line: "#a9ccf7", fade: "#0b2648", edgeOpacity: 0.85 },
};

type GridMode =
  | { mode: "uv"; grid: [number, number] } // linhas seguindo a UV (cilindros, tornos, tubos)
  | { mode: "tri"; density: number }; // linhas em espaço do objeto (caixas, extrusões)

export const KEY_COLOR = new THREE.Color("#FDF24E"); // amarelo da marca (--yellow-300)
const KEY_EDGE = new THREE.Color("#0d1f38");

// Contexto de um modelo: cada card tem o seu, para o hover de um não afetar os outros.
type Ctx = {
  surface: THREE.Color;
  line: THREE.Color;
  fade: THREE.Color;
  hi: { value: number }; // 0 = normal, 1 = hover (destaque + vista explodida)
  mats: Map<string, THREE.MeshStandardMaterial>;
  edge: THREE.LineBasicMaterial;
  edgeKey: THREE.LineBasicMaterial;
  explode: { obj: THREE.Object3D; base: THREE.Vector3; offset: THREE.Vector3 }[];
};

let ctx: Ctx; // contexto ativo durante a construção de um modelo

function gridMaterial(opts: GridMode, key: boolean, alpha = 0.42): THREE.MeshStandardMaterial {
  const cacheKey = JSON.stringify(opts) + alpha + key;
  const cached = ctx.mats.get(cacheKey);
  if (cached) return cached;

  const mat = new THREE.MeshStandardMaterial({
    color: ctx.surface,
    roughness: 0.62,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  if (key) mat.defines = { KEY: 1 };
  const hi = ctx.hi;
  const { line, fade } = ctx;

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uLineColor = { value: line };
    shader.uniforms.uFade = { value: fade };
    shader.uniforms.uLineAlpha = { value: alpha };
    shader.uniforms.uKeyColor = { value: KEY_COLOR };
    shader.uniforms.uHi = hi;
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
        "#include <common>\nuniform vec3 uLineColor;\nuniform float uLineAlpha;\nuniform vec3 uKeyColor;\nuniform vec3 uFade;\nuniform float uHi;\nuniform vec2 uGrid;\nvarying vec3 vObjPos;\nvarying vec3 vObjNormal;\nvarying vec2 vGridUv;",
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         #ifdef KEY
           diffuseColor.rgb = mix(diffuseColor.rgb, uKeyColor, uHi);
         #endif`,
      )
      .replace(
        "#include <opaque_fragment>",
        `${coord}
         vec2 gd = fwidth(g);
         vec2 ga = abs(fract(g - 0.5) - 0.5) / max(gd, vec2(1e-4));
         float gl = 1.0 - min(min(ga.x, ga.y), 1.0);
         #ifdef KEY
           // sobre o amarelo, a malha da peça-chave fica azul-escura
           vec3 keyLine = mix(uLineColor, vec3(0.0042, 0.0137, 0.0395), uHi);
           outgoingLight = mix(outgoingLight, keyLine, gl * uLineAlpha);
         #else
           outgoingLight = mix(outgoingLight, uLineColor, gl * uLineAlpha * (1.0 - 0.55 * uHi));
           outgoingLight = mix(outgoingLight, uFade, uHi * 0.45);
         #endif
         #include <opaque_fragment>`,
      );
  };
  mat.customProgramCacheKey = () => cacheKey;
  ctx.mats.set(cacheKey, mat);
  return mat;
}

type PartOpts = {
  pos?: [number, number, number];
  rot?: [number, number, number];
  edges?: number | false;
  /** elemento-chave: fica amarelo no hover */
  key?: boolean;
  /** deslocamento na vista explodida (no espaço do pai) */
  explode?: [number, number, number];
};

function explodeAs(obj: THREE.Object3D, offset?: [number, number, number]) {
  if (offset) ctx.explode.push({ obj, base: new THREE.Vector3(), offset: new THREE.Vector3(...offset) });
}

function group(parent: THREE.Object3D, opts: { pos?: [number, number, number]; rot?: [number, number, number]; explode?: [number, number, number] } = {}) {
  const g = new THREE.Group();
  if (opts.pos) g.position.set(...opts.pos);
  if (opts.rot) g.rotation.set(...opts.rot);
  explodeAs(g, opts.explode);
  parent.add(g);
  return g;
}

function part(parent: THREE.Object3D, geo: THREE.BufferGeometry, grid: GridMode, opts: PartOpts = {}): THREE.Mesh {
  const mesh = new THREE.Mesh(geo, gridMaterial(grid, !!opts.key));
  if (opts.pos) mesh.position.set(...opts.pos);
  if (opts.rot) mesh.rotation.set(...opts.rot);
  if (opts.edges !== false) {
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, opts.edges ?? 28), opts.key ? ctx.edgeKey : ctx.edge));
  }
  explodeAs(mesh, opts.explode);
  parent.add(mesh);
  return mesh;
}

const T = (density = 10): GridMode => ({ mode: "tri", density });
const U = (u: number, v: number): GridMode => ({ mode: "uv", grid: [u, v] });

function rod(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, r: number, opts: Pick<PartOpts, "key" | "explode"> = {}) {
  const len = a.distanceTo(b);
  const geo = new THREE.CylinderGeometry(r, r, len, 10, 1);
  const mesh = part(parent, geo, U(10, Math.max(2, Math.round(len * 10))), { edges: false, ...opts });
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
}

function tube(parent: THREE.Object3D, points: THREE.Vector3[], r: number, opts: Pick<PartOpts, "key" | "explode"> = {}) {
  const curve = new THREE.CatmullRomCurve3(points);
  const len = curve.getLength();
  part(parent, new THREE.TubeGeometry(curve, 64, r, 8, false), U(Math.round(len * 14), 4), { edges: false, ...opts });
}

// ------------------------------------------------------------------ modelos

/** Galpão industrial com SPDA. Chave: captores, cumeeira e descidas. */
function spda(): THREE.Group {
  const g = new THREE.Group();
  const W = 2.4, D = 1.4, H = 1.0, R = 0.45;
  part(g, new THREE.BoxGeometry(3.2, 0.05, 2.2), T(5), { pos: [0, -0.025, 0], explode: [0, -0.2, 0] });
  part(g, new THREE.BoxGeometry(W, H, D), T(10), { pos: [0, H / 2, 0] });

  // telhado + SPDA da cobertura sobem juntos na vista explodida
  const top = group(g, { explode: [0, 0.4, 0] });
  const roof = new THREE.Shape([new THREE.Vector2(-D / 2 - 0.05, 0), new THREE.Vector2(D / 2 + 0.05, 0), new THREE.Vector2(0, R)]);
  const roofGeo = new THREE.ExtrudeGeometry(roof, { depth: W + 0.1, bevelEnabled: false });
  roofGeo.translate(0, 0, -(W + 0.1) / 2);
  part(top, roofGeo, T(10), { pos: [0, H, 0], rot: [0, Math.PI / 2, 0] });

  const spdaTop = group(top, { explode: [0, 0.3, 0] });
  const ridgeY = H + R + 0.01;
  rod(spdaTop, new THREE.Vector3(-W / 2, ridgeY, 0), new THREE.Vector3(W / 2, ridgeY, 0), 0.014, { key: true });
  for (let i = 0; i < 5; i++) {
    const x = -W / 2 + 0.1 + (i * (W - 0.2)) / 4;
    rod(spdaTop, new THREE.Vector3(x, ridgeY, 0), new THREE.Vector3(x, ridgeY + 0.32, 0), 0.014, { key: true });
    part(spdaTop, new THREE.SphereGeometry(0.035, 12, 8), U(12, 6), { pos: [x, ridgeY + 0.34, 0], edges: false, key: true });
  }

  // porta e faixa de janelas saem para a frente
  part(g, new THREE.BoxGeometry(0.6, 0.7, 0.03), T(10), { pos: [-0.5, 0.35, D / 2 + 0.015], explode: [0, 0, 0.2] });
  part(g, new THREE.BoxGeometry(1.7, 0.12, 0.03), T(12), { pos: [0.2, 0.82, D / 2 + 0.015], explode: [0, 0, 0.2] });

  // descidas afastam das quinas
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (W / 2 + 0.015), z = sz * (D / 2 + 0.015);
    rod(g, new THREE.Vector3(x, 0, z), new THREE.Vector3(x, H, z), 0.014, { key: true, explode: [sx * 0.18, 0, sz * 0.18] });
  }
  return g;
}

/** Painel de média tensão + instrumento de ensaio. Chave: instrumento e cabos. */
function ensaios(): THREE.Group {
  const g = new THREE.Group();
  part(g, new THREE.BoxGeometry(1.1, 0.08, 0.8), T(6), { pos: [0, 0.04, 0], explode: [0, -0.15, 0] });
  part(g, new THREE.BoxGeometry(1.0, 1.9, 0.7), T(10), { pos: [0, 0.08 + 0.95, 0] });
  const front = 0.35 + 0.015;
  part(g, new THREE.BoxGeometry(0.44, 0.95, 0.03), T(10), { pos: [-0.24, 1.38, front], explode: [-0.08, 0, 0.25] });
  part(g, new THREE.BoxGeometry(0.44, 0.95, 0.03), T(10), { pos: [0.24, 1.38, front], explode: [0.08, 0, 0.25] });
  part(g, new THREE.BoxGeometry(0.92, 0.6, 0.03), T(10), { pos: [0, 0.5, front], explode: [0, 0, 0.18] });
  part(g, new THREE.BoxGeometry(0.24, 0.14, 0.02), T(30), { pos: [-0.24, 1.7, front + 0.02], explode: [-0.08, 0, 0.32] });
  for (const x of [-0.06, 0.06]) {
    part(g, new THREE.CylinderGeometry(0.02, 0.02, 0.16, 12), U(12, 4), { pos: [x, 1.3, front + 0.035], explode: [x * 1.3, 0, 0.3] });
  }
  for (let i = 0; i < 3; i++) {
    part(g, new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16), U(16, 2), { pos: [-0.2 + i * 0.2, 0.62, front + 0.02], rot: [Math.PI / 2, 0, 0], explode: [0, 0, 0.22] });
  }

  // instrumento e cabos (chave) afastam juntos
  const kit = group(g, { explode: [0.3, 0.1, 0.35] });
  const tester = group(kit, { pos: [0.95, 0, 0.35], rot: [0, -0.5, 0] });
  part(tester, new THREE.BoxGeometry(0.5, 0.28, 0.38), T(9), { pos: [0, 0.14, 0], key: true });
  part(tester, new THREE.CylinderGeometry(0.07, 0.07, 0.03, 24), U(24, 2), { pos: [0.1, 0.29, 0], key: true });
  part(tester, new THREE.BoxGeometry(0.16, 0.01, 0.1), T(30), { pos: [-0.1, 0.285, 0], key: true });
  part(tester, new THREE.TorusGeometry(0.12, 0.015, 8, 24, Math.PI), U(24, 4), { pos: [0, 0.3, 0], edges: false, key: true });
  tube(kit, [new THREE.Vector3(0.82, 0.3, 0.36), new THREE.Vector3(0.65, 0.12, 0.7), new THREE.Vector3(0.3, 0.2, 0.62), new THREE.Vector3(0.0, 0.62, front + 0.03)], 0.014, { key: true });
  tube(kit, [new THREE.Vector3(0.88, 0.3, 0.48), new THREE.Vector3(0.7, 0.06, 0.85), new THREE.Vector3(0.35, 0.15, 0.75), new THREE.Vector3(0.2, 0.62, front + 0.03)], 0.014, { key: true });
  return g;
}

/** Poste de distribuição. Chave: isoladores e condutores. */
function redes(): THREE.Group {
  const g = new THREE.Group();
  part(g, new THREE.CylinderGeometry(0.06, 0.095, 2.3, 24, 1), U(24, 34), { pos: [0, 1.15, 0] });

  const arm = group(g, { explode: [0, 0.22, 0] });
  part(arm, new THREE.BoxGeometry(1.6, 0.09, 0.09), T(14), { pos: [0, 2.0, 0] });
  rod(arm, new THREE.Vector3(-0.45, 1.96, 0), new THREE.Vector3(0, 1.65, 0), 0.012);
  rod(arm, new THREE.Vector3(0.45, 1.96, 0), new THREE.Vector3(0, 1.65, 0), 0.012);

  const line = group(arm, { explode: [0, 0.2, 0] });
  const insulatorProfile: THREE.Vector2[] = [new THREE.Vector2(0, 0)];
  for (let i = 0; i < 3; i++) {
    const y = i * 0.055;
    insulatorProfile.push(new THREE.Vector2(0.025, y), new THREE.Vector2(0.06, y + 0.015), new THREE.Vector2(0.06, y + 0.025), new THREE.Vector2(0.025, y + 0.045));
  }
  insulatorProfile.push(new THREE.Vector2(0.025, 0.18), new THREE.Vector2(0, 0.19));
  const insulatorGeo = new THREE.LatheGeometry(insulatorProfile, 24);
  const xs = [-0.7, 0, 0.7];
  for (const x of xs) part(line, insulatorGeo, U(24, 16), { pos: [x, 2.045, 0], edges: 50, key: true });
  for (const x of xs) {
    const top = new THREE.Vector3(x, 2.235, 0);
    tube(line, [top.clone().setZ(-1.1).setY(2.1), top.clone().setZ(-0.55).setY(2.18), top], 0.01, { key: true });
    tube(line, [top, top.clone().setZ(0.55).setY(2.18), top.clone().setZ(1.1).setY(2.1)], 0.01, { key: true });
  }

  const tr = group(g, { pos: [0, 1.2, 0.26], explode: [0, 0, 0.4] });
  part(tr, new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32, 1), U(32, 10), {});
  part(tr, new THREE.CylinderGeometry(0.21, 0.21, 0.04, 32, 1), U(32, 1), { pos: [0, 0.27, 0], explode: [0, 0.12, 0] });
  for (let i = 0; i < 2; i++) {
    part(tr, new THREE.CylinderGeometry(0.025, 0.025, 0.12, 12), U(12, 4), { pos: [-0.08 + i * 0.16, 0.35, 0], explode: [0, 0.2, 0] });
  }
  part(g, new THREE.BoxGeometry(0.08, 0.3, 0.12), T(16), { pos: [0, 1.2, 0.1], explode: [0, 0, 0.18] });
  return g;
}

function roundedBox(w: number, h: number, d: number, r: number): THREE.BufferGeometry {
  const sh = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  sh.moveTo(x + r, y);
  sh.lineTo(x + w - r, y);
  sh.quadraticCurveTo(x + w, y, x + w, y + r);
  sh.lineTo(x + w, y + h - r);
  sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  sh.lineTo(x + r, y + h);
  sh.quadraticCurveTo(x, y + h, x, y + h - r);
  sh.lineTo(x, y + r);
  sh.quadraticCurveTo(x, y, x + r, y);
  const bevel = Math.min(0.03, r * 0.5);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: d - bevel * 2, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 3, curveSegments: 8 });
  geo.translate(0, 0, -(d - bevel * 2) / 2);
  return geo;
}

/** Medidor de energia inteligente. Chave: visor (tela e dígitos). */
function eficiencia(): THREE.Group {
  const g = new THREE.Group();
  const D = 0.36;
  const front = D / 2;

  part(g, roundedBox(0.9, 1.2, D, 0.08), T(10), { pos: [0, 1.1, 0], edges: 35 });
  part(g, roundedBox(0.26, 0.12, 0.06, 0.04), T(14), { pos: [0, 1.74, -0.1], edges: 35, explode: [0, 0.18, 0] });

  // visor em camadas
  part(g, roundedBox(0.66, 0.3, 0.03, 0.03), T(16), { pos: [0, 1.42, front + 0.005], edges: 35, explode: [0, 0, 0.14] });
  part(g, new THREE.BoxGeometry(0.58, 0.22, 0.012), T(30), { pos: [0, 1.42, front + 0.026], key: true, explode: [0, 0, 0.28] });
  for (let i = 0; i < 6; i++) {
    part(g, new THREE.BoxGeometry(0.055, 0.11, 0.006), T(40), { pos: [-0.2 + i * 0.075, 1.43, front + 0.034], key: true, explode: [0, 0, 0.4] });
  }
  part(g, new THREE.BoxGeometry(0.1, 0.03, 0.006), T(40), { pos: [0.19, 1.355, front + 0.034], key: true, explode: [0, 0, 0.4] });

  for (const x of [-0.27, -0.15]) {
    part(g, new THREE.CylinderGeometry(0.04, 0.04, 0.03, 24), U(24, 2), { pos: [x, 1.15, front + 0.012], rot: [Math.PI / 2, 0, 0], explode: [0, 0, 0.12] });
  }
  part(g, new THREE.CylinderGeometry(0.018, 0.018, 0.02, 16), U(16, 2), { pos: [0.05, 1.15, front + 0.008], rot: [Math.PI / 2, 0, 0], explode: [0, 0, 0.12] });
  part(g, new THREE.TorusGeometry(0.07, 0.016, 10, 32), U(32, 6), { pos: [0.24, 1.13, front + 0.005], edges: false, explode: [0, 0, 0.12] });
  part(g, new THREE.CylinderGeometry(0.05, 0.05, 0.012, 32), U(32, 2), { pos: [0.24, 1.13, front + 0.004], rot: [Math.PI / 2, 0, 0], explode: [0, 0, 0.12] });
  part(g, new THREE.BoxGeometry(0.62, 0.16, 0.008), T(26), { pos: [0, 0.86, front + 0.004], explode: [0, 0, 0.1] });

  const bottom = group(g, { explode: [0, -0.28, 0.04] });
  part(bottom, roundedBox(0.84, 0.3, D * 0.82, 0.05), T(12), { pos: [0, 0.32, -D * 0.05], edges: 35 });
  for (const x of [-0.3, 0.3]) {
    part(bottom, new THREE.CylinderGeometry(0.025, 0.025, 0.02, 16), U(16, 2), { pos: [x, 0.38, front - D * 0.05 + 0.01], rot: [Math.PI / 2, 0, 0] });
  }
  const cables = group(g, { explode: [0, -0.45, 0.06] });
  for (let i = 0; i < 4; i++) {
    const x = -0.27 + i * 0.18;
    tube(cables, [new THREE.Vector3(x, 0.18, 0), new THREE.Vector3(x, -0.05, 0.02), new THREE.Vector3(x * 1.15, -0.25, 0.14), new THREE.Vector3(x * 1.3, -0.4, 0.34)], 0.025);
  }
  return g;
}

/** Mesas fotovoltaicas. Chave: módulos. */
function ufv(): THREE.Group {
  const g = new THREE.Group();
  const tilt = 0.5;
  const table = (z: number) => {
    const t = group(g, { pos: [0, 0, z] });
    const panels = group(t, { pos: [0, 0.75, 0], rot: [tilt, 0, 0] });
    for (let i = 0; i < 3; i++) {
      part(panels, new THREE.BoxGeometry(0.62, 0.04, 1.05), U(6, 10), { pos: [-0.66 + i * 0.66, 0, 0], key: true, explode: [(i - 1) * 0.08, 0.3, 0] });
    }
    part(panels, new THREE.BoxGeometry(2.0, 0.04, 0.05), T(14), { pos: [0, -0.04, -0.32], explode: [0, 0.1, 0] });
    part(panels, new THREE.BoxGeometry(2.0, 0.04, 0.05), T(14), { pos: [0, -0.04, 0.32], explode: [0, 0.1, 0] });
    // hastes: do chão até a face de baixo de cada trilho, calculado a partir
    // da transformação real da mesa (assim encostam certinho na estrutura)
    panels.updateMatrix();
    for (const x of [-0.85, 0, 0.85]) {
      for (const zz of [-0.32, 0.32]) {
        const top = new THREE.Vector3(x, -0.06, zz).applyMatrix4(panels.matrix);
        rod(t, new THREE.Vector3(top.x, 0, top.z), top, 0.02);
      }
    }
  };
  table(-0.62);
  table(0.62);
  part(g, new THREE.BoxGeometry(2.5, 0.03, 2.4), T(5), { pos: [0, -0.015, 0], explode: [0, -0.15, 0] });
  return g;
}

const builders: Record<string, () => THREE.Group> = {
  "projetos-eletricos-spda": spda,
  "ensaios-comissionamento-laudos": ensaios,
  "construcao-manutencao-redes": redes,
  "eficiencia-energetica": eficiencia,
  "ufv-fotovoltaica": ufv,
};

export type ServiceModelHandle = {
  pivot: THREE.Group;
  /** 0 = normal, 1 = hover: destaca o elemento-chave e abre a vista explodida */
  setState: (t: number) => void;
  dispose: () => void;
};

export function buildServiceModel(slug: string, theme: ModelTheme = "light"): ServiceModelHandle | null {
  const build = builders[slug];
  if (!build) return null;
  const th = THEMES[theme];
  const lineColor = new THREE.Color(th.line);
  ctx = {
    surface: new THREE.Color(th.surface),
    line: lineColor,
    fade: new THREE.Color(th.fade),
    hi: { value: 0 },
    mats: new Map(),
    edge: new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: th.edgeOpacity }),
    edgeKey: new THREE.LineBasicMaterial({ color: lineColor.clone(), transparent: true, opacity: 0.95 }),
    explode: [],
  };
  const c = ctx;
  const model = build();
  for (const e of c.explode) e.base.copy(e.obj.position);

  // centraliza na origem para girar em torno do próprio eixo
  const box = new THREE.Box3().setFromObject(model);
  model.position.sub(box.getCenter(new THREE.Vector3()));
  const pivot = new THREE.Group();
  pivot.add(model);

  return {
    pivot,
    setState(t: number) {
      c.hi.value = t;
      c.edge.opacity = th.edgeOpacity - 0.55 * t;
      // no hover, o contorno da peça-chave fica azul-escuro para ler sobre o amarelo
      c.edgeKey.color.copy(lineColor).lerp(KEY_EDGE, t);
      for (const e of c.explode) e.obj.position.copy(e.base).addScaledVector(e.offset, t);
    },
    dispose() {
      pivot.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
      c.mats.forEach((m) => m.dispose());
      c.edge.dispose();
      c.edgeKey.dispose();
    },
  };
}
