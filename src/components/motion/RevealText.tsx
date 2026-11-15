"use client";

import { motion, useReducedMotion as useRM } from "motion/react";
import { cn } from "@/lib/cn";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

/** Per-word blur + rise reveal, triggered once at 80% viewport. */
export function RevealText({
  as = "p",
  children,
  className,
  delay = 0,
}: {
  as?: Tag;
  children: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useRM() ?? false;
  const Comp = tags[as];
  const words = children.split(" ");

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      aria-label={children}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Comp>
  );
}
