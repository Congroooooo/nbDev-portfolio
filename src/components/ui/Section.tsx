import { cn } from "@/lib/cn";

/** Full-bleed tonal section; children sit in the shared wrap/pad container. */
export function Section({
  tone,
  id,
  className,
  innerClassName,
  children,
}: {
  tone: "ink" | "bone";
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={cn(
        "relative py-[var(--sec)]",
        tone === "ink" ? "bg-ink text-bone" : "bg-bone text-ink",
        className,
      )}
    >
      <div className={cn("wrap", innerClassName)}>{children}</div>
    </section>
  );
}
