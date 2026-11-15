"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { storyFrames } from "@/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/components/motion";
import { cn } from "@/lib/cn";
import { MarkFallback } from "@/components/three/MarkFallback";
import { createSceneState, type MarkSceneState } from "@/components/three/mark-path";
import { Hero } from "./Hero";
import { BuildStory } from "./BuildStory";

/** three.js + R3F load in their own chunk, client-only. */
const MarkCanvas = dynamic(() => import("@/components/three/MarkCanvas"), { ssr: false });

/* ---------- client capability snapshots (server snapshot = null/false → no hydration mismatch) ---------- */

let webglCache: boolean | null = null;
function hasWebGL2(): boolean {
  if (webglCache === null) {
    try {
      webglCache = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}
const noopSubscribe = () => () => {};

const MOBILE_Q = "(max-width: 767px)";
function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia(MOBILE_Q);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** If the canvas throws (lost context, driver issue) keep the static fallback instead of crashing the page. */
class CanvasBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const pad2 = (n: number) => String(Math.round(n)).padStart(2, "0");

/**
 * Hero + "The build" as one continuous scene: a single sticky full-viewport mark layer behind
 * both, driven by one scrubbed GSAP timeline (hero → dissolve → f1..f4 → fade-out).
 */
export function HomeScene() {
  const reduce = useReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, hasWebGL2, () => null);
  const mobile = useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_Q).matches, () => false);
  const mode: "pending" | "webgl" | "static" = webgl === null ? "pending" : reduce || !webgl ? "static" : "webgl";

  const root = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const scene = useRef<MarkSceneState>(createSceneState());
  const [ready, setReady] = useState(false);

  const onReady = useCallback(() => {
    setReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  // The one scene timeline. gsap.matchMedia rebuilds it per breakpoint and reverts on unmount,
  // so leaving the route leaves no triggers, inline styles or tweened state behind.
  useEffect(() => {
    if (mode !== "webgl" || !root.current) return;
    const el = root.current;
    const st = scene.current;
    const mm = gsap.matchMedia(el);

    mm.add({ isMobile: MOBILE_Q, isDesktop: "(min-width: 768px)" }, (ctx) => {
      const storyVh = ctx.conditions?.isMobile ? 2.5 : 4; // matches BuildStory h-[250vh] / md:h-[400vh]
      const S = storyVh - 1; // sticky distance of the story panel (in viewports)
      const b = [1 + 0.233 * S, 1 + 0.617 * S, 1 + 0.833 * S]; // frame boundaries f1|f2, f2|f3, f3|f4
      const tr = 0.1 * S; // crossfade length
      const E = storyVh; // story panel releases; layer starts scrolling away
      const END = storyVh + 1; // root bottom reaches viewport top

      const fx = (i: number) => el.querySelectorAll<HTMLElement>(`[data-story-fx="${i}"]`);
      const counter = el.querySelector<HTMLElement>('[data-testid="story-counter"]');
      const hours = { h: 0 };
      let shown = storyFrames[0].counter;

      const frameAt = (t: number) => (t < b[0] ? 0 : t < b[1] ? 1 : t < b[2] ? 2 : 3);
      const writeCounter = (t: number) => {
        if (!counter) return;
        const i = frameAt(t);
        const next = i <= 1 ? `${pad2(hours.h)}h` : storyFrames[i].counter;
        if (next === shown) return;
        const swap = !/^\d+h$/.test(next) || !/^\d+h$/.test(shown); // text swap (v1, ∞), not a number tick
        shown = next;
        counter.textContent = next;
        if (swap) {
          gsap.fromTo(
            counter,
            { filter: "blur(10px)", opacity: 0.35 },
            { filter: "blur(0px)", opacity: 1, duration: 0.45, ease: "power2.out", overwrite: true },
          );
        }
      };

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
        onUpdate: () => writeCounter(tl.time()),
      });

      // hero (0 → 0.35): solid mark, idle sway + parallax at full weight (initial state).
      // dissolve (0.35 → 1): solid breaks down to the wireframe "idea"; idle weight 1 → 0.
      tl.to(st, { solid: 0, wire: 1, grid: 1, glow: 0.5, idle: 0, rotY: -0.55, rotX: 0.2, camY: 0.4, camZ: 4.8, duration: 0.65 }, 0.35);
      // f1 idea: wireframe + grid floor, slow drift.
      tl.to(st, { rotY: -0.38, duration: b[0] - 1 - tr / 2, ease: "none" }, 1);
      // f2 prototype: faces partially fill, camera dollies in.
      tl.to(hours, { h: 20, duration: tr, ease: "none" }, b[0] - tr / 2);
      tl.to(st, { solid: 0.45, wire: 0.85, grid: 0.45, glow: 0.75, camZ: 3.1, camY: 0.15, rotY: -0.18, rotX: 0.1, duration: (b[1] - b[0]) * 0.75 }, b[0] - tr / 2);
      // f3 shipped: solid bone, camera passes close by the slash.
      tl.to(st, { solid: 1, wire: 0.1, grid: 0, glow: 1, camZ: 1.3, camX: 0.18, camY: 0.05, rotY: 0.6, rotX: 0, slashZ: 0.32, duration: b[2] - b[1] + tr / 2 }, b[1] - tr / 2);
      // f4 production: lit solid at rest pose, accent rim light.
      tl.to(st, { wire: 0, rim: 1, glow: 0.9, camZ: 4.0, camX: 0, camY: 0, rotY: 0.22, rotX: -0.06, slashZ: 0.12, duration: (E - b[2]) * 0.85 }, b[2] - tr / 2);
      // fade-out: the bone "Selected work" section scrolls over; canvas fades and stops.
      if (layer.current) tl.to(layer.current, { autoAlpha: 0, duration: 0.7, ease: "none" }, E + 0.15);

      // story frame crossfades (labels, caption, sentence of frame i-1 → frame i)
      for (let i = 1; i < storyFrames.length; i++) {
        const at = b[i - 1] - tr / 2;
        tl.to(fx(i - 1), { autoAlpha: 0, y: -16, filter: "blur(8px)", duration: tr / 2, ease: "power2.in" }, at);
        tl.fromTo(
          fx(i),
          { autoAlpha: 0, y: 16, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: tr / 2, ease: "power2.out", immediateRender: false },
          at + tr / 2,
        );
      }
      // pad the timeline so its duration maps 1:1 to the scrolled viewports
      tl.set({}, {}, END);

      // render only while the scene's range is on screen (MarkScene invalidates from the ticker)
      const live = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          st.active = self.isActive;
        },
      });
      st.active = live.isActive;

      return () => {
        st.active = true;
      };
    });

    return () => mm.revert();
  }, [mode]);

  // Pointer parallax target (desktop, fine pointer). MarkScene smooths and weights it.
  useEffect(() => {
    if (mode !== "webgl" || mobile) return;
    const st = scene.current;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      st.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      st.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      st.pointerX = 0;
      st.pointerY = 0;
    };
  }, [mode, mobile]);

  const isStatic = mode === "static";

  return (
    <div ref={root} data-testid="home-scene" data-scene-mode={mode} className="relative isolate bg-ink">
      {/* scene layer: sticky behind hero + story (static: just the hero's backdrop) */}
      <div
        ref={layer}
        aria-hidden={mode === "webgl" ? true : undefined}
        className={cn(
          "pointer-events-none overflow-hidden",
          isStatic ? "absolute inset-x-0 top-0 h-svh" : "sticky top-0 -mb-[100svh] h-svh",
        )}
      >
        <div
          className="absolute top-1/2 left-1/2 h-[70svh] w-[70svh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }}
        />
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-[var(--e-out)]",
            ready && "opacity-0",
          )}
        >
          <MarkFallback variant="solid" className="w-[min(82vw,calc(59svh*1.32))]" />
        </div>
        {mode === "webgl" && (
          <div className={cn("absolute inset-0 opacity-0 transition-opacity duration-700 ease-[var(--e-out)]", ready && "opacity-100")}>
            <CanvasBoundary>
              <MarkCanvas state={scene} mobile={mobile} onReady={onReady} />
            </CanvasBoundary>
          </div>
        )}
      </div>

      <Hero />
      <BuildStory mode={isStatic ? "static" : "pinned"} />
    </div>
  );
}
