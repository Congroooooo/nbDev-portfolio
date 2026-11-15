"use client";

import { useReducedMotion as useRM } from "motion/react";

export function useReducedMotion(): boolean {
  return useRM() ?? false;
}

export { RevealText } from "./RevealText";
export { FadeUp } from "./FadeUp";
export { DrawLine } from "./DrawLine";
export { CountUp } from "./CountUp";
