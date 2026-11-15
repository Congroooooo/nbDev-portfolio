/**
 * Geometry of the `<nbDev/>` mark core: the glyphs `<`, `/`, `>` as bold geometric strokes
 * already converted to filled outlines. Units: the mark is exactly 1 tall (y -0.5..0.5) and
 * centered on x = 0 (point-symmetric). y points up (three.js convention); the SVG fallback
 * flips it. This file is the single source of truth for both the 3D mark and the SVG.
 * It must stay free of three.js imports: HomeScene and MarkFallback load it in the initial bundle.
 */
export type MarkPoint = readonly [x: number, y: number];
export type MarkGlyph = { id: "lt" | "slash" | "gt"; points: readonly MarkPoint[] };

/** Perpendicular stroke weight shared by all three glyphs. */
const STROKE = 0.17;

/** `<`: tip at x0, arms run to x0+w at ±h, vertical end cuts. */
function chevron(tipX: number, w: number, h: number, dir: 1 | -1): MarkPoint[] {
  const s = h / w;
  const dx = (STROKE * Math.sqrt(1 + s * s)) / s; // horizontal offset that yields STROKE perpendicular
  const e = tipX + dir * w;
  const inner = s * (w - dx);
  const pts: MarkPoint[] = [
    [tipX, 0],
    [e, h],
    [e, inner],
    [tipX + dir * dx, 0],
    [e, -inner],
    [e, -h],
  ];
  // keep the same winding for both glyphs
  return dir === 1 ? pts : pts.reverse();
}

/** `/`: parallelogram from bottom-left to top-right, horizontal end cuts, full height. */
function slash(lean: number): MarkPoint[] {
  const c = lean / 2; // centerline x at the top; -c at the bottom
  const hw = (STROKE * Math.sqrt(1 + lean * lean)) / 2;
  return [
    [-c - hw, -0.5],
    [-c + hw, -0.5],
    [c + hw, 0.5],
    [c - hw, 0.5],
  ];
}

const r = (n: number) => Math.round(n * 10000) / 10000;
const round = (pts: MarkPoint[]): MarkPoint[] => pts.map(([x, y]) => [r(x), r(y)] as const);

export const MARK_POINTS: readonly MarkGlyph[] = [
  { id: "lt", points: round(chevron(-0.68, 0.34, 0.37, 1)) },
  { id: "slash", points: round(slash(0.36)) },
  { id: "gt", points: round(chevron(0.68, 0.34, 0.37, -1)) },
];

/** Bounding box of the mark (x -0.68..0.68, y -0.5..0.5). */
export const MARK_BOUNDS = { minX: -0.68, maxX: 0.68, minY: -0.5, maxY: 0.5 } as const;

/**
 * Horizontal hatch segments clipped to a glyph outline (the "inner grid lines" of the wire
 * look). Even-odd scanline fill; returns [x1, x2, y] triples.
 */
export function glyphHatch(points: readonly MarkPoint[], step = 0.0625): [number, number, number][] {
  const out: [number, number, number][] = [];
  const ys = points.map((p) => p[1]);
  const lo = Math.min(...ys);
  const hi = Math.max(...ys);
  for (let y = lo + step / 2; y < hi; y += step) {
    const xs: number[] = [];
    for (let i = 0; i < points.length; i++) {
      const [ax, ay] = points[i];
      const [bx, by] = points[(i + 1) % points.length];
      if (ay === by) continue;
      if ((y >= ay && y < by) || (y >= by && y < ay)) xs.push(ax + ((y - ay) / (by - ay)) * (bx - ax));
    }
    xs.sort((a, b) => a - b);
    for (let i = 0; i + 1 < xs.length; i += 2) out.push([r(xs[i]), r(xs[i + 1]), r(y)]);
  }
  return out;
}

/**
 * Mutable scene state shared between the GSAP timeline (HomeScene, writer) and the R3F
 * scene (MarkScene, reader). Plain data so the main bundle never needs three.js for it.
 */
export type MarkSceneState = {
  /** wireframe edges + hatch opacity */
  wire: number;
  /** solid face opacity */
  solid: number;
  /** grid floor opacity */
  grid: number;
  /** accent rim light (0..1) */
  rim: number;
  /** center glow sprite (0..1) */
  glow: number;
  /** weight of idle rotation + pointer parallax (1 in hero → 0 after dissolve) */
  idle: number;
  camX: number;
  camY: number;
  camZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  /** z offset of the slash glyph (sits slightly forward) */
  slashZ: number;
  /** pointer target, -1..1 */
  pointerX: number;
  pointerY: number;
  /** true while the scene's scroll range is on screen; drives invalidation */
  active: boolean;
};

export function createSceneState(): MarkSceneState {
  return {
    wire: 0,
    solid: 1,
    grid: 0,
    rim: 0,
    glow: 1,
    idle: 1,
    camX: 0,
    camY: 0,
    camZ: 4.2,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    slashZ: 0.12,
    pointerX: 0,
    pointerY: 0,
    active: true,
  };
}
