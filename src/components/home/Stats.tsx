"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { stats } from "@/content";
import type { Stat } from "@/content";
import { Section } from "@/components/ui";
import { CountUp, DrawLine, useReducedMotion } from "@/components/motion";

function Row({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 45%"] });
  const color = useTransform(scrollYProgress, [0, 1], ["#d2d0c9", "#0b0c0c"]);
  const right = index % 2 === 1;
  const from = stat.format === "year" ? 2022 : 0;

  return (
    <div ref={ref}>
      <DrawLine tone="bone" />
      <div
        className={`flex flex-col gap-4 py-10 md:items-center md:justify-between md:py-14 ${
          right ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <motion.div className="t-mega tabular-nums" style={reduce ? undefined : { color }}>
          <CountUp to={stat.value} from={from} />
        </motion.div>
        <div className={right ? "md:text-left" : "md:text-right"}>
          <div className="t-h3">{stat.label}</div>
          <div className="t-label mt-2 text-mute">{stat.sub}</div>
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    <Section tone="bone" id="stats">
      {stats.map((s, i) => (
        <Row key={s.label} stat={s} index={i} />
      ))}
      <DrawLine tone="bone" />
    </Section>
  );
}
