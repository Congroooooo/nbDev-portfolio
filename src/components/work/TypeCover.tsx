import { cn } from "@/lib/cn";

/** Generated typographic cover for projects without a photo. */
export function TypeCover({ name, className }: { name: string; className?: string }) {
  return (
    <div
      data-testid="type-cover"
      role="img"
      aria-label={`${name} cover`}
      className={cn("h-full w-full overflow-hidden border border-line bg-ink-2 text-bone", className)}
      style={{ containerType: "inline-size" }}
    >
      {/* Padding lives on an inner element so cqw resolves against the outer container. */}
      <div className="flex h-full w-full flex-col justify-end p-[6cqw]">
        <p
          aria-hidden
          className="font-mono font-medium break-words"
          style={{ fontSize: "clamp(20px, 9cqw, 150px)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
        >
          {name}
        </p>
        <span aria-hidden className="mt-[2.5cqw] block h-[0.8cqw] min-h-[3px] w-[18cqw] bg-accent" />
      </div>
    </div>
  );
}
