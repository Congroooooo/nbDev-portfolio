import type { HackathonTier } from "@/content/types";
import { cn } from "@/lib/cn";

const styles: Record<HackathonTier, string> = {
  champion: "bg-accent text-ink border-transparent",
  podium: "bg-accent text-ink border-transparent",
  top10: "border-current bg-transparent",
  participant: "border-transparent bg-current/10 text-mute",
};

export function PlacementBadge({ tier, children }: { tier: HackathonTier; children: React.ReactNode }) {
  return (
    <span
      data-tier={tier}
      className={cn("t-label inline-flex items-center rounded-full border px-3 py-1", styles[tier])}
    >
      {children}
    </span>
  );
}
