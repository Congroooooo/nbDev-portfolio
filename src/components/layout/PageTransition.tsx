"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

function hashTarget(): HTMLElement | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  try {
    return document.getElementById(decodeURIComponent(hash));
  } catch {
    return document.getElementById(hash);
  }
}

/** Children stay server-rendered and visible; an ink curtain wipes over them on route change only. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const firstRun = useRef(true);
  const popNav = useRef(false);
  const initialHashDone = useRef(false);
  const [prev, setPrev] = useState(pathname);
  const [wipe, setWipe] = useState(0);

  if (prev !== pathname) {
    setPrev(pathname);
    if (!reduce) setWipe((n) => n + 1);
  }

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  // Back/forward: let the browser restore the previous position instead of forcing the top.
  useEffect(() => {
    const onPop = () => {
      popNav.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Direct load with a hash: once Lenis exists, sync it to the fragment target (layout may have shifted).
  useEffect(() => {
    if (!lenis || initialHashDone.current) return;
    initialHashDone.current = true;
    const el = hashTarget();
    if (el) lenis.scrollTo(el, { immediate: true, force: true });
  }, [lenis]);

  // Route changes only (keyed on pathname, not on Lenis identity).
  useEffect(() => {
    const isFirst = firstRun.current;
    firstRun.current = false;
    const wasPop = popNav.current;
    popNav.current = false;

    const scrollToEl = (el: HTMLElement) => {
      const l = lenisRef.current;
      if (l) l.scrollTo(el, { immediate: true, force: true });
      else el.scrollIntoView();
    };

    let raf = 0;
    if (isFirst) {
      // First load: keep the browser's own position; only honour a fragment.
      const el = hashTarget();
      if (el) raf = requestAnimationFrame(() => scrollToEl(el));
    } else if (!wasPop) {
      const el = hashTarget();
      if (el) {
        scrollToEl(el);
        raf = requestAnimationFrame(() => scrollToEl(el));
      } else {
        const l = lenisRef.current;
        if (l) l.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
      }
    }

    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (!wasPop) {
        const el = hashTarget();
        if (el && Math.abs(el.getBoundingClientRect().top) > window.innerHeight) scrollToEl(el);
      }
    }, 350);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(id);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {wipe > 0 && (
        <motion.div
          key={wipe}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] bg-ink-2"
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%", "-100%"] }}
          transition={{ duration: 0.6, times: [0, 0.4, 0.5, 1], ease: [0.83, 0, 0.17, 1] }}
        />
      )}
    </>
  );
}
