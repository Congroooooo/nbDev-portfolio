import { stack } from "@/content";
import { Section, Chip, ArrowLink } from "@/components/ui";
import { FadeUp, DrawLine } from "@/components/motion";

type Col = typeof stack.front;

function Column({ col, side }: { col: Col; side: "left" | "right" }) {
  const right = side === "right";
  return (
    <div className={right ? "md:pl-[var(--gut)] md:text-right" : "md:pr-[var(--gut)]"}>
      <div className={`t-label flex items-baseline justify-between gap-4 text-mute ${right ? "md:flex-row-reverse" : ""}`}>
        <span className="text-bone">{col.title}</span>
        <span>{col.meta}</span>
      </div>
      <ul className="mt-8 md:mt-12">
        {col.items.map((it) => (
          <li
            key={it.key}
            className={`flex items-baseline gap-4 border-t border-line py-4 md:py-5 ${right ? "md:flex-row-reverse" : ""}`}
          >
            <span className="t-label w-8 shrink-0 text-mute">{it.key}</span>
            <span className="t-h3 flex-1">{it.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackColumns() {
  return (
    <Section tone="ink" id="stack">
      <FadeUp>
        <div className="relative grid md:grid-cols-2">
          <span aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-line md:block" />
          <Column col={stack.front} side="left" />
          <div className="mt-16 md:mt-0">
            <Column col={stack.back} side="right" />
          </div>
        </div>
      </FadeUp>
      <div className="mt-16 md:mt-24">
        <DrawLine />
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
          <h3 className="t-label text-mute">{stack.agents.title}</h3>
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {stack.agents.items.map((a) => (
              <li key={a}>
                <Chip>{a}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <ArrowLink href="/about#skills" className="t-lead">
            {stack.link}
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
