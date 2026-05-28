import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { chainStages, type ChainStage } from "../data";

type TooltipLine = [string, string];
type TooltipState = {
  x: number;
  y: number;
  title: string;
  lines: TooltipLine[];
};

type SceneHandle = {
  setStage: (index: number) => void;
  setPlaying: (value: boolean) => void;
  dispose: () => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function fmt(value: number) {
  return `${Math.round(value * 100)}%`;
}

function diagnosticGapField(h: number, l: number) {
  let value = 0.08;
  for (const point of chainStages) {
    const dx = h - point.h;
    const dy = l - point.l;
    const distance = dx * dx + dy * dy;
    value += point.gap * Math.exp(-distance / 0.045) * 0.32;
  }
  const wave = Math.sin((h * 2.4 + l * 1.7) * Math.PI) * 0.045 + Math.cos((h - l) * Math.PI * 3) * 0.035;
  return clamp(value + wave + h * l * 0.16, 0.03, 0.98);
}

function riskSemantic(metrics: Pick<ChainStage, "formalRisk" | "gap" | "h" | "l" | "rgr">) {
  if (metrics.formalRisk === "低") return { key: "safe", label: "低風險 / 可追蹤" };
  if (metrics.formalRisk === "中") return { key: "moderate", label: "中風險 / 需共同框定" };
  if (metrics.formalRisk === "高") return { key: "danger", label: "高風險 / 責任缺口明顯" };
  if (metrics.rgr <= 0.07 || metrics.gap <= 0.18) return { key: "safe", label: "可追蹤" };
  if (metrics.h >= 0.72 && metrics.l >= 0.65 && metrics.gap >= 0.45) return { key: "danger", label: "危險責任缺口" };
  return { key: "moderate", label: "需治理" };
}

function colorForRisk(metrics: Pick<ChainStage, "formalRisk" | "gap" | "h" | "l" | "rgr">) {
  const semantic = riskSemantic(metrics);
  if (semantic.key === "safe") return new THREE.Color("#78f2a6");
  if (semantic.key === "danger") return new THREE.Color("#ff6057");
  return new THREE.Color("#f0a94a");
}

function toWorld(item: Pick<ChainStage, "h" | "l" | "gap">) {
  return new THREE.Vector3(mapRange(item.h, 0, 1, -2, 2), mapRange(item.gap, 0, 1, 0, 2.65), mapRange(item.l, 0, 1, -2, 2));
}

function buildSurfaceGeometry() {
  const segments = 68;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let zIndex = 0; zIndex <= segments; zIndex++) {
    for (let xIndex = 0; xIndex <= segments; xIndex++) {
      const h = xIndex / segments;
      const l = zIndex / segments;
      const gap = diagnosticGapField(h, l);
      positions.push(mapRange(h, 0, 1, -2, 2), mapRange(gap, 0, 1, 0, 2.65), mapRange(l, 0, 1, -2, 2));
      const color = colorForRisk({ h, l, gap, rgr: h * l * gap, formalRisk: gap > 0.62 ? "高" : gap > 0.3 ? "中" : "低" });
      color.lerp(new THREE.Color("#26392c"), 0.82).lerp(new THREE.Color("#9ba894"), clamp(gap * 0.18, 0.02, 0.18));
      colors.push(color.r, color.g, color.b);
    }
  }

  for (let zIndex = 0; zIndex < segments; zIndex++) {
    for (let xIndex = 0; xIndex < segments; xIndex++) {
      const a = zIndex * (segments + 1) + xIndex;
      const b = a + 1;
      const c = a + (segments + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function buildSilkRibbons() {
  const group = new THREE.Group();
  for (let row = 0; row < 14; row++) {
    const l = row / 13;
    const points: number[] = [];
    for (let step = 0; step <= 104; step++) {
      const h = step / 104;
      const gap = diagnosticGapField(h, l);
      const x = mapRange(h, 0, 1, -2, 2);
      const y = mapRange(gap, 0, 1, 0, 2.65) + Math.sin((h * 2.2 + row * 0.34) * Math.PI) * 0.018;
      const z = mapRange(l, 0, 1, -2, 2) + Math.sin((h * 1.8 + row) * Math.PI) * 0.018;
      points.push(x, y + 0.012, z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    const material = new THREE.LineBasicMaterial({
      color: "#b9c5b9",
      transparent: true,
      opacity: 0.11 + row * 0.005,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    group.add(new THREE.Line(geometry, material));
  }
  return group;
}

function makeLabelSprite(text: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 160;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Sprite();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "700 46px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#f4f7f2";
  ctx.shadowColor = "rgba(244, 247, 242, 0.55)";
  ctx.shadowBlur = 18;
  ctx.fillText(text, 28, 80);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  return new THREE.Sprite(material);
}

function buildAxisLabels() {
  const group = new THREE.Group();
  const labels: [string, THREE.Vector3, THREE.Vector3][] = [
    ["流程進度", new THREE.Vector3(2.55, 0.16, -2.18), new THREE.Vector3(1.02, 0.25, 1)],
    ["證據成熟度", new THREE.Vector3(-2.1, 0.2, 2.55), new THREE.Vector3(0.98, 0.25, 1)],
    ["文件／責任缺口", new THREE.Vector3(-2.18, 3.0, -2.08), new THREE.Vector3(1.22, 0.3, 1)]
  ];
  for (const [text, position, scale] of labels) {
    const sprite = makeLabelSprite(text);
    sprite.position.copy(position);
    sprite.scale.copy(scale);
    group.add(sprite);
  }
  return group;
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) material.forEach((item) => item.dispose());
    else if (material) material.dispose();
  });
}

function createWaveScene(
  canvas: HTMLCanvasElement,
  setActiveIndex: (value: number) => void,
  setTooltip: (value: TooltipState | null) => void,
  showSurface: boolean
): SceneHandle {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#070807");
  scene.fog = new THREE.FogExp2("#070807", 0.052);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(5.35, 3.55, -5.85);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.03;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0.12, 0.82, 0.04);
  controls.minDistance = 4;
  controls.maxDistance = 11;
  controls.maxPolarAngle = Math.PI * 0.47;

  scene.add(new THREE.AmbientLight("#e7efe6", 0.42));
  const keyLight = new THREE.DirectionalLight("#f7f8f2", 1.45);
  keyLight.position.set(3.2, 5, 4.4);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight("#b8c7b9", 0.9);
  rimLight.position.set(-4, 2.6, -3.5);
  scene.add(rimLight);

  if (showSurface) {
    const surface = new THREE.Mesh(
      buildSurfaceGeometry(),
      new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.48,
        roughness: 0.72,
        metalness: 0,
        clearcoat: 0.42,
        clearcoatRoughness: 0.76,
        side: THREE.DoubleSide,
        depthWrite: false,
        emissive: new THREE.Color("#111a16"),
        emissiveIntensity: 0.18
      })
    );
    scene.add(surface);
  }

  scene.add(buildSilkRibbons());

  const gridMaterial = new THREE.LineBasicMaterial({ color: "#d3e0d5", transparent: true, opacity: 0.15 });
  const gridPositions: number[] = [];
  for (let i = 0; i <= 10; i++) {
    const value = mapRange(i / 10, 0, 1, -2, 2);
    gridPositions.push(-2, 0, value, 2, 0, value);
    gridPositions.push(value, 0, -2, value, 0, 2);
  }
  gridPositions.push(-2, 0, -2, 2.25, 0, -2);
  gridPositions.push(-2, 0, -2, -2, 0, 2.25);
  gridPositions.push(-2, 0, -2, -2, 2.9, -2);
  const gridGeometry = new THREE.BufferGeometry();
  gridGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gridPositions, 3));
  scene.add(new THREE.LineSegments(gridGeometry, gridMaterial));
  scene.add(buildAxisLabels());

  const pathPoints = chainStages.map(toWorld);
  const pathCurve = new THREE.CatmullRomCurve3(pathPoints, false, "catmullrom", 0.28);
  const pathTube = new THREE.Mesh(
    new THREE.TubeGeometry(pathCurve, 180, 0.02, 12, false),
    new THREE.MeshBasicMaterial({ color: "#f3ead2", transparent: true, opacity: 0.9 })
  );
  scene.add(pathTube);

  const pointerTargets: THREE.Mesh[] = [];
  const markerGroup = new THREE.Group();
  for (const item of chainStages) {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.088 + item.rgr * 0.1, 30, 16),
      new THREE.MeshBasicMaterial({ color: colorForRisk(item) })
    );
    marker.position.copy(toWorld(item));
    marker.userData = { item };
    markerGroup.add(marker);
    pointerTargets.push(marker);
  }
  scene.add(markerGroup);

  const activeMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 38, 18),
    new THREE.MeshBasicMaterial({ color: "#f3ead2" })
  );
  scene.add(activeMarker);

  const activeRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.2, 0.008, 8, 48),
    new THREE.MeshBasicMaterial({ color: "#f26522", transparent: true, opacity: 0.9 })
  );
  activeRing.rotation.x = Math.PI / 2;
  scene.add(activeRing);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let lastFrameTime = performance.now();
  let activeIndex = 0;
  let playing = true;
  let currentTime = 0;
  let frame = 0;

  const setStage = (index: number) => {
    activeIndex = clamp(Math.round(index), 0, chainStages.length - 1);
    currentTime = activeIndex;
    const item = chainStages[activeIndex];
    const position = toWorld(item);
    activeMarker.position.copy(position);
    activeRing.position.copy(position);
    activeMarker.scale.setScalar(1 + item.rgr * 0.7);
    activeMarker.material.color.copy(colorForRisk(item));
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pointerTargets, false);
    if (!hits.length) {
      setTooltip(null);
      return;
    }
    const item = hits[0].object.userData.item as ChainStage;
    setTooltip({
      x: event.clientX,
      y: event.clientY,
      title: item.stage,
      lines: [
        ["角色", item.actor],
        ["正式風險", item.formalRisk],
        ["證據成熟度", fmt(item.l)],
        ["文件/責任缺口", fmt(item.gap)],
        ["治理回應", item.responseLabel],
        ["說明", item.note]
      ]
    });
  };

  const animate = () => {
    const now = performance.now();
    const delta = Math.min((now - lastFrameTime) / 1000, 0.04);
    lastFrameTime = now;
    if (playing) {
      currentTime = (currentTime + delta * 0.42) % chainStages.length;
      const nextIndex = Math.floor(currentTime);
      if (nextIndex !== activeIndex) {
        activeIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
      const t = Math.min(currentTime / (chainStages.length - 1), 1);
      const position = pathCurve.getPoint(t);
      activeMarker.position.copy(position);
      activeRing.position.copy(position);
      activeRing.rotation.z += delta * 0.7;
    }
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(animate);
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerleave", () => setTooltip(null));
  setStage(0);
  resize();
  animate();

  return {
    setStage,
    setPlaying(value: boolean) {
      playing = value;
    },
    dispose() {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      controls.dispose();
      disposeObject(scene);
      renderer.dispose();
    }
  };
}

export function ResponsibilityChainWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<SceneHandle | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [showSurface, setShowSurface] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const active = chainStages[activeIndex];

  useEffect(() => {
    if (window.location.hash !== "#graph") return;
    window.requestAnimationFrame(() => {
      document.getElementById("graph")?.scrollIntoView({ block: "start" });
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    sceneRef.current?.dispose();
    const scene = createWaveScene(canvasRef.current, setActiveIndex, setTooltip, showSurface);
    scene.setPlaying(playing);
    scene.setStage(activeIndex);
    sceneRef.current = scene;
    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, [showSurface]);

  useEffect(() => {
    sceneRef.current?.setPlaying(playing);
  }, [playing]);

  useEffect(() => {
    sceneRef.current?.setStage(activeIndex);
  }, [activeIndex]);

  return (
    <section className="border-t border-white/10 bg-[#070807] py-16 sm:py-20 lg:py-28" aria-labelledby="graph-title">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F26522] text-[11px] font-semibold leading-[12px] text-white sm:h-7 sm:w-7">
            3
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium leading-[13px] text-[#f7f2e8] sm:px-4 sm:py-1.5">
            Responsibility chain wave
          </span>
        </div>
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(330px,0.36fr)] lg:items-end">
          <div>
            <h2
              id="graph-title"
              className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] text-[#f7f2e8] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
            >
              How messy information becomes a shared problem.
            </h2>
          </div>
          <p className="text-[14px] font-medium leading-[1.7] text-[#b9b0a3]">
            X 軸是問題定義進度，Z 軸是證據成熟度，Y 軸是文件/責任缺口。波面是研究問題的視覺模型，不是正式風險公式。
          </p>
        </div>

        <div id="graph" className="relative min-h-[680px] scroll-mt-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#030403] shadow-[0_26px_70px_rgba(0,0,0,0.52)] sm:min-h-[720px] lg:min-h-[760px]">
          <canvas ref={canvasRef} className="wave-canvas h-full min-h-[680px] w-full sm:min-h-[720px] lg:min-h-[760px]" aria-label="3D responsibility-chain wave" />
          <div className="pointer-events-none absolute left-4 top-4 max-w-[560px] rounded-[8px] border border-white/10 bg-[#10130f]/76 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:left-6 sm:top-6 sm:p-5">
            <p className="mb-2 text-[11px] font-semibold leading-[12px] text-[#F26522]">Current stage</p>
            <h3 className="text-[22px] font-medium leading-[1.12] text-[#f7f2e8] sm:text-[28px]">{active.stage}</h3>
            <p className="mt-3 text-[13px] font-medium leading-[1.55] text-[#b9b0a3] sm:text-[14px]">{active.responseLabel}</p>
          </div>
          <div className="pointer-events-none absolute right-4 top-4 hidden w-[330px] rounded-[8px] border border-white/10 bg-[#10130f]/72 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-md lg:block">
            <p className="mb-2 text-[11px] font-semibold leading-[12px] text-[#F26522]">Selected readout</p>
            <h3 className="text-[24px] font-medium leading-[1.12] text-[#f7f2e8]">{active.actor}</h3>
            <p className="mt-4 text-[13px] font-medium leading-[1.65] text-[#b9b0a3]">{active.note}</p>
            <div className="mt-5 grid gap-3">
              {[
                ["正式風險", active.formalRisk],
                ["證據成熟度", fmt(active.l)],
                ["文件/責任缺口", fmt(active.gap)],
                ["責任鏈值", fmt(active.rgr)]
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="text-[12px] font-medium text-[#81796d]">{label}</span>
                  <span className="text-[13px] font-semibold text-[#f7f2e8]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-[8px] border border-white/10 bg-[#10130f]/78 p-4 shadow-[0_14px_30px_rgba(0,0,0,0.35)] backdrop-blur-md md:grid-cols-[auto_1fr_auto] md:items-center">
            <button
              className="h-10 rounded-full bg-[#F26522] px-5 text-[13px] font-medium text-white"
              type="button"
              onClick={() => setPlaying((value) => !value)}
            >
              {playing ? "Pause" : "Play"}
            </button>
            <label className="flex items-center gap-3 text-[13px] font-medium text-[#d8d1c4]">
              <input
                className="accent-[#F26522]"
                type="checkbox"
                checked={showSurface}
                onChange={(event) => setShowSurface(event.target.checked)}
              />
              Show conceptual wave surface
            </label>
            <label className="grid gap-1 text-[12px] font-medium text-[#b9b0a3]">
              Stage {activeIndex + 1} / {chainStages.length}
              <input
                className="w-full min-w-[170px] accent-[#F26522]"
                type="range"
                min={0}
                max={chainStages.length - 1}
                step={1}
                value={activeIndex}
                onChange={(event) => {
                  setPlaying(false);
                  setActiveIndex(Number(event.target.value));
                }}
              />
            </label>
          </div>
          {tooltip ? (
            <div
              className="pointer-events-none fixed z-[90] w-[280px] rounded-[8px] border border-white/10 bg-[#10130f] p-4 text-[#f7f2e8] shadow-2xl"
              style={{ left: Math.min(tooltip.x + 14, window.innerWidth - 300), top: Math.min(tooltip.y + 14, window.innerHeight - 240) }}
            >
              <p className="mb-3 text-[13px] font-semibold leading-[1.2]">{tooltip.title}</p>
              <div className="grid grid-cols-[88px_1fr] gap-x-3 gap-y-2 text-[12px] leading-[1.35]">
                {tooltip.lines.map(([label, value]) => (
                  <div className="contents" key={label}>
                    <span className="text-[#81796d]">{label}</span>
                    <span className="font-medium text-[#f7f2e8]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
