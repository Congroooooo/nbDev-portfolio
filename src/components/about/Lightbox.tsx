"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { Img } from "@/content/types";

export function Lightbox({
  images,
  titles,
  index,
  onClose,
  onIndex,
}: {
  images: Img[];
  titles: string[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = images.length;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onIndex((index + 1) % n);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onIndex((index - 1 + n) % n);
      } else if (e.key === "Tab") {
        const f = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!f || f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement;
        if (!dialogRef.current?.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onClose, onIndex]);

  const btn = "t-label rounded-full border border-current px-4 py-2 hover:bg-bone/10";

  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={titles[index]}
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95 text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4 p-5 md:p-8">
            <p className="t-label">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} ·{" "}
              <span data-testid="lightbox-title">{titles[index]}</span>
            </p>
            <button ref={closeRef} type="button" onClick={onClose} className={btn}>
              Close
            </button>
          </div>
          <div className="relative mx-5 mb-5 flex-1 md:mx-16">
            <Image
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex justify-between gap-4 p-5 pt-0 md:p-8 md:pt-0">
            <button type="button" onClick={() => onIndex((index - 1 + n) % n)} className={btn} aria-label="Previous certificate">
              ← Prev
            </button>
            <button type="button" onClick={() => onIndex((index + 1) % n)} className={btn} aria-label="Next certificate">
              Next →
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
