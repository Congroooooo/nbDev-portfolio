import { describe, expect, test } from "vitest";
import * as THREE from "three";
import { MARK_POINTS, glyphHatch, markShapes } from "../../src/components/three/mark-path";

describe("mark-path", () => {
  test("markShapes returns 3 shapes, bbox height ≈ 1, centered at x≈0", () => {
    const shapes = markShapes();
    expect(shapes).toHaveLength(3);
    const geo = new THREE.ShapeGeometry(shapes);
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    expect(box.max.y - box.min.y).toBeCloseTo(1, 3);
    expect((box.max.x + box.min.x) / 2).toBeCloseTo(0, 3);
    expect((box.max.y + box.min.y) / 2).toBeCloseTo(0, 3);
  });

  test("glyphs read left to right: <, /, >", () => {
    expect(MARK_POINTS.map((g) => g.id)).toEqual(["lt", "slash", "gt"]);
    const cx = MARK_POINTS.map((g) => g.points.reduce((s, p) => s + p[0], 0) / g.points.length);
    expect(cx[0]).toBeLessThan(cx[1]);
    expect(cx[1]).toBeLessThan(cx[2]);
  });

  test("glyphs do not overlap and hatch stays inside each glyph", () => {
    const xs = MARK_POINTS.map((g) => g.points.map((p) => p[0]));
    expect(Math.max(...xs[0])).toBeLessThan(Math.min(...xs[2]));
    for (const g of MARK_POINTS) {
      const minX = Math.min(...g.points.map((p) => p[0]));
      const maxX = Math.max(...g.points.map((p) => p[0]));
      const hatch = glyphHatch(g.points);
      expect(hatch.length).toBeGreaterThan(4);
      for (const [a, b] of hatch) {
        expect(a).toBeGreaterThanOrEqual(minX - 1e-6);
        expect(b).toBeLessThanOrEqual(maxX + 1e-6);
        expect(b).toBeGreaterThan(a);
      }
    }
  });
});
