"use client";

import { motion, useReducedMotion as useRM } from "motion/react";
import { cn } from "@/lib/cn";

/** Hairline that draws left → right on enter. */
export function DrawLine({ className, tone = "ink" }: { className?: string; tone?: "ink" | "bone" }) {
  const reduce = useRM() ?? false;
  const color = tone === "ink" ? "bg-line" : "bg-line-l";
  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left", color, className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
