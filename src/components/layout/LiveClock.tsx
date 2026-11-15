"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content";
import { formatClock } from "@/lib/time";

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => formatClock(new Date(), site.timezone);
const getServerSnapshot = () => "--:--";

/** Server renders `--:--`; the real time swaps in after hydration (no mismatch). */
export function LiveClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={className} suppressHydrationWarning>
      {site.locationShort} · {time} GMT+8
    </span>
  );
}
