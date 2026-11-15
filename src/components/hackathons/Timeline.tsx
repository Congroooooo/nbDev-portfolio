import Image from "next/image";
import type { Hackathon } from "@/content/types";
import { ArrowLink } from "@/components/ui";
import { FadeUp } from "@/components/motion";
import { PlacementBadge } from "./PlacementBadge";

export function Timeline({ items }: { items: Hackathon[] }) {
  return (
    <ol className="border-t border-line-l">
      {items.map((h, i) => (
        <li key={h.id} id={h.id} className="scroll-mt-[calc(var(--nav-h)+24px)] border-b border-line-l py-10 md:py-14">
          <FadeUp>
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-3">
                <p className="t-label text-mute">
                  {String(i + 1).padStart(2, "0")} · {h.date}
                </p>
              </div>
              <div className="md:col-span-5">
                <h2 className="t-h1">{h.name}</h2>
                <div className="mt-5">
                  <PlacementBadge tier={h.tier}>{h.placement}</PlacementBadge>
                </div>
                <p className="t-body mt-6 max-w-[56ch]">{h.story}</p>
                {h.projectSlug ? (
                  <ArrowLink href={`/work/${h.projectSlug}`} arrow="→" className="t-label mt-6">
                    View project
                  </ArrowLink>
                ) : null}
              </div>
              {h.image ? (
                <div className="md:col-span-4">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] bg-ink-2">
                    <Image
                      src={h.image.src}
                      alt={h.image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--e-out)] group-hover:scale-105"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </FadeUp>
        </li>
      ))}
    </ol>
  );
}
