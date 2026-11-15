import { describe, expect, test } from "vitest";
import { formatClock } from "../../src/lib/time";

describe("formatClock", () => {
  test("formatClock renders Manila time", () => {
    expect(formatClock(new Date("2026-11-16T06:05:00Z"))).toBe("14:05");
  });
  test("pads midnight", () => {
    expect(formatClock(new Date("2026-11-16T16:00:00Z"))).toBe("00:00");
  });
});
