import { MARK_POINTS, glyphHatch, type MarkPoint } from "./mark-points";
import { cn } from "@/lib/cn";

/** Fake extrusion offset (SVG units; y already flipped). */
const DEPTH: MarkPoint = [0.05, 0.045];
const LAYERS = 10;

const toPath = (pts: readonly MarkPoint[], dx = 0, dy = 0) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${(x + dx).toFixed(4)} ${(-y + dy).toFixed(4)}`).join("") + "Z";

/**
 * Static SVG of the mark built from the same MARK_POINTS as the 3D extrusion.
 * `solid` = bone faces over a stepped dark extrusion (LCP-safe first paint, permanent fallback);
 * `wire` = front/back outlines, depth edges and hatch, like the story's wireframe.
 */
export function MarkFallback({ variant, className }: { variant: "solid" | "wire"; className?: string }) {
  return (
    <svg
      data-testid="mark-fallback"
      viewBox="-0.82 -0.62 1.64 1.24"
      className={cn("block overflow-visible", className)}
      role="img"
      aria-label="nbDev mark: angle brackets around a slash"
    >
      {variant === "solid" ? (
        <g>
          {Array.from({ length: LAYERS }, (_, k) => {
            const t = (LAYERS - k) / LAYERS;
            return (
              <g key={k} fill={k === LAYERS - 1 ? "#8a8c88" : "#1d201f"} opacity={1 - t * 0.5}>
                {MARK_POINTS.map((g) => (
                  <path key={g.id} d={toPath(g.points, DEPTH[0] * t, DEPTH[1] * t)} />
                ))}
              </g>
            );
          })}
          <g fill="#ecebe6">
            {MARK_POINTS.map((g) => (
              <path key={g.id} d={toPath(g.points)} />
            ))}
          </g>
        </g>
      ) : (
        <g fill="none" stroke="#ecebe6" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeLinejoin="round">
          {MARK_POINTS.map((g) => (
            <g key={g.id}>
              <path d={toPath(g.points, DEPTH[0], DEPTH[1])} opacity={0.3} vectorEffect="non-scaling-stroke" />
              {g.points.map(([x, y], i) => (
                <line
                  key={i}
                  x1={x}
                  y1={-y}
                  x2={x + DEPTH[0]}
                  y2={-y + DEPTH[1]}
                  opacity={0.35}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {glyphHatch(g.points).map(([x1, x2, y], i) => (
                <line key={`h${i}`} x1={x1} y1={-y} x2={x2} y2={-y} opacity={0.22} vectorEffect="non-scaling-stroke" />
              ))}
              <path d={toPath(g.points)} opacity={0.8} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
