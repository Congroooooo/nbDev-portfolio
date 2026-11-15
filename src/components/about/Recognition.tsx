import Image from "next/image";
import Link from "next/link";
import type { Award, EventItem } from "@/content/types";
import { Chip } from "@/components/ui";

export function Recognition({ awards, events }: { awards: Award[]; events: EventItem[] }) {
  return (
    <div>
      <ul className="grid gap-px border-y border-line-l md:grid-cols-2">
        {awards.map((a) => (
          <li key={a.title} className="py-8 md:pr-10">
            <h3 className="t-h2">{a.title}</h3>
            <p className="t-label mt-3 text-mute">{a.detail}</p>
          </li>
        ))}
      </ul>
      <ul className="mt-16 grid gap-12 md:grid-cols-3">
        {events.map((e) => (
          <li key={e.title} className="flex flex-col">
            {e.image ? (
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[var(--radius-m)] bg-bone-2">
                <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-3">
              <Chip>{e.badge}</Chip>
              <span className="t-label text-mute">{e.date}</span>
            </div>
            <h3 className="t-h3 mt-5">{e.title}</h3>
            <p className="t-body mt-3 text-ink/75">{e.body}</p>
            {e.projectSlug ? (
              <Link href={`/work/${e.projectSlug}`} className="t-label mt-4 underline underline-offset-4">
                View project →
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
