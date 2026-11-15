import { cn } from "@/lib/cn";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("t-label", className)}>{children}</p>;
}
