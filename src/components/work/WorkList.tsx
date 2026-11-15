"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "motion/react";
import type { Project } from "@/content/types";
import { useReducedMotion } from "@/components/motion";
import { cn } from "@/lib/cn";
import { TypeCover } from "./TypeCover";

const CARD_W = 360;
const CARD_H = 225; // 16:10

export function WorkList({ projects, tone }: { projects: Project[]; tone: "ink" | "bone" }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });
  const vx = useSpring(useVelocity(mx), { stiffness: 200, damping: 30 });
  const tilt = useTransform(vx, [-2000, 2000], [-8, 8], { clamp: true });

  const line = tone === "ink" ? "border-line" : "border-line-l";
  const dim = tone === "ink" ? "text-mute" : "text-bone-2";
  const preview = projects.find((p) => p.slug === active);

  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX - CARD_W / 2);
    my.set(e.clientY - CARD_H / 2);
  };

  return (
    <div onPointerMove={track} onPointerLeave={() => setActive(null)}>
      <ul className={cn("border-t", line)}>
        <AnimatePresence initial={false} mode="popLayout">
          {projects.map((p, i) => {
            const dimmed = active !== null && active !== p.slug;
            return (
              <motion.li
                key={p.slug}
                data-testid="work-row"
                layout={!reduce}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn("border-b", line)}
              >
                <Link
                  href={`/work/${p.slug}`}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    const px = e.clientX - CARD_W / 2;
                    const py = e.clientY - CARD_H / 2;
                    mx.jump(px);
                    my.jump(py);
                    x.jump(px);
                    y.jump(py);
                    setActive(p.slug);
                  }}
                  className={cn(
                    "group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3 py-7 transition-colors duration-500 ease-[var(--e-out)] md:grid-cols-[72px_minmax(0,1fr)_minmax(0,340px)] md:gap-x-8 md:py-10",
                    dimmed && dim,
                  )}
                >
                  <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-d3 block">{p.name}</span>
                  <span className="col-start-2 flex flex-col gap-2 md:col-start-3 md:items-end md:text-right">
                    <span className="t-label">
                      {p.category} · {p.tagline}
                    </span>
                    <span className="t-label inline-flex items-center gap-2">
                      Open the project
                      <span
                        aria-hidden
                        className="transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </span>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {/* Cursor-following preview: mouse pointers only, never on touch. */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key="preview"
            aria-hidden
            data-testid="work-preview"
            className="pointer-events-none fixed top-0 left-0 z-40 hidden overflow-hidden rounded-[8px] bg-ink shadow-2xl [@media(pointer:fine)]:block"
            style={{ x, y, rotate: reduce ? 0 : tilt, width: CARD_W, height: CARD_H }}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {preview.image ? (
              <Image src={preview.image.src} alt="" fill sizes="360px" className="object-cover" />
            ) : (
              <TypeCover name={preview.name} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
