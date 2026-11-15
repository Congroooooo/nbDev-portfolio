"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion as useRM, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from `from` to `to` once when scrolled into view. Server HTML shows the final value. */
export function CountUp({
  to,
  from = 0,
  className,
  duration = 1.6,
}: {
  to: number;
  from?: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useRM() ?? false;
  const mv = useMotionValue(to);
  const rounded = useTransform(mv, (v) => String(Math.round(v)));
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    if (!inView) {
      mv.set(from);
      return;
    }
    started.current = true;
    const controls = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduce, from, to, duration, mv]);

  return (
    <span ref={ref} className={className} aria-label={String(to)}>
      <motion.span aria-hidden>{rounded}</motion.span>
    </span>
  );
}
