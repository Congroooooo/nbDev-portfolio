"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { wins } from "@/content";
import { Section } from "@/components/ui";
import { useReducedMotion } from "@/components/motion";

const DURATION = 7000;

export function WinsCarousel() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduce) {
      root.style.setProperty("--p", "1");
      return;
    }
    root.style.setProperty("--p", "0");
    let elapsed = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) elapsed += dt;
      const p = Math.min(elapsed / DURATION, 1);
      root.style.setProperty("--p", String(p));
      if (p >= 1) setIdx((i) => (i + 1) % wins.length);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx, reduce]);

  const win = wins[idx];
  const words = win.body.split(" ");

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % wins.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + wins.length) % wins.length;
    else return;
    e.preventDefault();
    setIdx(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section tone="bone" id="wins">
      <div
        ref={rootRef}
        style={{ "--p": reduce ? 1 : 0 } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div role="tabpanel" id="wins-panel" aria-labelledby={`wins-tab-${idx}`} className="min-h-[34rem] md:min-h-[26rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx}
              className="grid gap-10 md:grid-cols-2 md:gap-[var(--gut)]"
              initial={reduce ? false : { opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <span aria-hidden className="t-d1 block leading-none text-accent-ink">
                  &ldquo;
                </span>
                <h3 className="t-d2 mt-2">{win.headline}</h3>
              </div>
              <div className="flex flex-col justify-between gap-10">
                <p className="t-h3">
                  {words.map((w, i) => (
                    <span
                      key={i}
                      style={
                        {
                          "--s": i / words.length,
                          "--n": words.length,
                          color:
                            "color-mix(in srgb, var(--ink) calc(clamp(0, (var(--p) * 1.4 - var(--s)) * var(--n), 1) * 100%), #767873)",
                        } as CSSProperties
                      }
                    >
                      {w}
                      {i < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </p>
                <div>
                  <div aria-hidden className="h-px w-full bg-line-l" />
                  <div className="flex items-center gap-4 pt-6">
                    <span
                      aria-hidden
                      className="t-label flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-bone"
                    >
                      {win.initials}
                    </span>
                    <div>
                      <div className="t-lead">{win.event}</div>
                      <div className="t-label text-mute">{win.meta}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div role="tablist" aria-label="Hackathon wins" className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-16 md:grid-cols-4">
          {wins.map((w, i) => {
            const active = i === idx;
            return (
              <button
                key={w.hackathonId}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`wins-tab-${i}`}
                aria-selected={active}
                aria-controls="wins-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setIdx(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group text-left transition-opacity ${active ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
              >
                <span aria-hidden className="relative block h-0.5 w-full bg-line-l">
                  {active && (
                    <span
                      className="absolute inset-0 origin-left bg-accent-ink"
                      style={{ transform: "scaleX(var(--p, 0))" }}
                    />
                  )}
                </span>
                <span className="t-label mt-3 block">
                  {String(i + 1).padStart(2, "0")} / {String(wins.length).padStart(2, "0")}
                  <span className="ml-3">{w.event}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
