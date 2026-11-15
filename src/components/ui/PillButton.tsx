import Link from "next/link";
import { cn } from "@/lib/cn";

const tones = {
  bone: "bg-bone text-ink hover:bg-white",
  ink: "bg-ink text-bone hover:bg-ink-3",
  outline: "border border-current text-current hover:bg-current/10",
} as const;

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-6 text-[17px] md:h-[60px] md:px-7",
} as const;

export function PillButton({
  href,
  children,
  tone = "bone",
  size = "md",
  external,
  download,
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: "bone" | "ink" | "outline";
  size?: "md" | "lg";
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const cls = cn(
    "group inline-flex items-center gap-3 rounded-full whitespace-nowrap transition-colors duration-300 ease-[var(--e-out)]",
    tones[tone],
    sizes[size],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block text-[0.8em] transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </>
  );
  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
