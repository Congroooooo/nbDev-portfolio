"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content";
import { PillButton } from "@/components/ui";
import { useReducedMotion } from "@/components/motion";
import { useLenis } from "./SmoothScroll";
import { LiveClock } from "./LiveClock";

const items = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/hackathons", label: "Hackathons" },
  { href: "/about", label: "About" },
];

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const closed = "inset(0 0 100% 0)";
  const shown = "inset(0 0 0% 0)";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col bg-ink-2 text-bone md:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: closed }}
          animate={reduce ? { opacity: 1 } : { clipPath: shown }}
          exit={reduce ? { opacity: 0 } : { clipPath: closed }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="wrap flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <span className="font-mono text-[17px]">{site.brand}</span>
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-full border border-current px-5 text-[15px]"
            >
              Close
            </button>
          </div>
          <ul className="wrap flex flex-1 flex-col justify-center gap-2">
            {items.map((it, i) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className="t-d1 flex items-baseline gap-4 py-1"
                >
                  <span className="t-label font-mono text-mute">{String(i + 1).padStart(2, "0")}</span>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="wrap flex flex-col gap-6 pb-8">
            <div
              className="self-start"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                window.setTimeout(() => {
                  const el = document.getElementById("contact");
                  if (!el) return;
                  if (lenis) lenis.scrollTo(el);
                  else el.scrollIntoView();
                }, 650);
              }}
            >
              <PillButton href="#contact" tone="bone">
                Get in touch
              </PillButton>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-mute hover:text-bone">
                  {s.label}
                </a>
              ))}
            </div>
            <LiveClock className="t-label font-mono text-mute" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
