import { cn } from "@/lib/cn";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "t-label inline-flex items-center rounded-full border border-current/25 px-3 py-1 whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}
