"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "./useReducedMotion";
import { cn } from "@/lib/cn";

/** Hairline that draws left → right on enter. */
export function DrawLine({ className, tone = "ink" }: { className?: string; tone?: "ink" | "bone" }) {
  const reduce = useReducedMotion();
  const color = tone === "ink" ? "bg-line" : "bg-line-l";
  if (reduce) return <div aria-hidden className={cn("h-px w-full", color, className)} />;
  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left", color, className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
