"use client";

import { useState } from "react";
import { projects, workPage } from "@/content";
import { cn } from "@/lib/cn";
import { WorkList } from "./WorkList";

type Filter = (typeof workPage.filters)[number];

export function WorkFilter() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2 md:mb-14">
        {workPage.filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "t-label h-10 cursor-pointer rounded-full border px-5 transition-colors duration-300 ease-[var(--e-out)]",
              filter === f ? "border-ink bg-ink text-bone" : "border-line-l hover:border-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <WorkList projects={shown} tone="bone" />
    </div>
  );
}
