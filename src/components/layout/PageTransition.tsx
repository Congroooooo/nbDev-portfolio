"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/motion";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

/** Children stay server-rendered and visible; an ink curtain wipes over them on route change only. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [prev, setPrev] = useState(pathname);
  const [wipe, setWipe] = useState(0);

  if (prev !== pathname) {
    setPrev(pathname);
    if (!reduce) setWipe((n) => n + 1);
  }

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

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
          transition={{ duration: 1.1, times: [0, 0.3, 0.4, 1], ease: [0.83, 0, 0.17, 1] }}
        />
      )}
    </>
  );
}
