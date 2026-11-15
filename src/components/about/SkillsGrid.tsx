import type { SkillGroup } from "@/content/types";
import { Chip } from "@/components/ui";

export function SkillsGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((g, i) => (
        <div key={g.title} className="border-t border-line pt-5">
          <p className="t-label text-mute">
            {String(i + 1).padStart(2, "0")} · {g.title}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {g.items.map((s) => (
              <li key={s}>
                <Chip className="whitespace-normal">{s}</Chip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
