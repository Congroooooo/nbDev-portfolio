import Link from "next/link";
import { projects } from "@/content";
import type { Project } from "@/content/types";

export function NextProject({ project }: { project: Project }) {
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  return (
    <section data-tone="ink" className="bg-ink text-bone">
      <div className="wrap">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-end justify-between gap-6 border-t border-line py-14 md:py-24"
        >
          <span className="t-d2">
            <span className="t-label mb-4 block text-mute">Next project</span>
            Next — {next.name}
          </span>
          <span
            aria-hidden
            className="t-d2 transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
