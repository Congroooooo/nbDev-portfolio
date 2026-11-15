"use client";

import { useEffect } from "react";
import { useLenis } from "./SmoothScroll";

/** Locks page scroll while `locked`: stops Lenis (wheel/touch) and sets body overflow hidden (native fallback). */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!locked) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [locked, lenis]);
}
