import type { Experience } from "@/content/types";
import { FadeUp } from "@/components/motion";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="border-t border-line-l">
      {items.map((e, i) => (
        <li key={e.role + e.company} className="border-b border-line-l py-10 md:py-14">
          <FadeUp>
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <p className="t-label text-mute md:col-span-3">
                {String(i + 1).padStart(2, "0")} · {e.dates}
              </p>
              <div className="md:col-span-9">
                <h3 className="t-h1">{e.company}</h3>
                <p className="t-label mt-4 text-mute">
                  {e.role} · {e.location}
                </p>
                <ul className="t-body mt-8 max-w-[68ch] space-y-3">
                  {e.bullets.map((b) => (
                    <li key={b} className="border-t border-line-l pt-3">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </li>
      ))}
    </ol>
  );
}
