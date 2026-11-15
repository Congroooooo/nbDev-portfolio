import { Shape } from "three";
import { MARK_POINTS } from "./mark-points";

/**
 * three.js side of the mark geometry. Only imported from the dynamically loaded canvas chunk
 * (and unit tests); the pure point data lives in mark-points.ts and is re-exported here.
 */
export * from "./mark-points";

/** Filled outlines for three.js (`<`, `/`, `>` in that order). */
export function markShapes(): Shape[] {
  return MARK_POINTS.map(({ points }) => {
    const shape = new Shape();
    points.forEach(([x, y], i) => (i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)));
    shape.closePath();
    return shape;
  });
}
