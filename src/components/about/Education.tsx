import type { education as Education } from "@/content";

export function EducationList({ items }: { items: typeof Education }) {
  return (
    <ul className="border-t border-line-l">
      {items.map((e) => (
        <li
          key={e.degree}
          className="grid gap-3 border-b border-line-l py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-10"
        >
          <div>
            <h3 className="t-h2">{e.degree}</h3>
            <p className="t-body mt-3 text-ink/75">{e.school}</p>
          </div>
          <p className="t-label text-mute">{e.dates}</p>
        </li>
      ))}
    </ul>
  );
}
