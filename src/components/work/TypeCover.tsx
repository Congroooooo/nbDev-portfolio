import { cn } from "@/lib/cn";

/** Generated typographic cover for projects without a photo. */
export function TypeCover({ name, className }: { name: string; className?: string }) {
  return (
    <div
      data-testid="type-cover"
      role="img"
      aria-label={`${name} cover`}
      className={cn("flex h-full w-full flex-col justify-end overflow-hidden bg-ink p-[6cqw] text-bone", className)}
      style={{ containerType: "inline-size" }}
    >
      <p
        aria-hidden
        className="font-mono font-medium break-words"
        style={{ fontSize: "clamp(20px, 9cqw, 150px)", lineHeight: 0.95, letterSpacing: "-0.04em" }}
      >
        {name}
      </p>
      <span aria-hidden className="mt-[2.5cqw] block h-[0.8cqw] min-h-[3px] w-[18cqw] bg-accent" />
    </div>
  );
}
