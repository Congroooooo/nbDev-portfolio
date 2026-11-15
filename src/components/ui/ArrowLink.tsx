import Link from "next/link";
import { cn } from "@/lib/cn";

/** Text link with trailing arrow; underline draws on hover. */
export function ArrowLink({
  href,
  children,
  className,
  external,
  arrow = "↗",
  download,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  arrow?: "↗" | "→" | "↑";
  download?: boolean;
}) {
  const cls = cn("group relative inline-flex items-center gap-2 pb-1", className);
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="text-[0.8em] transition-transform duration-500 ease-[var(--e-out)] group-hover:translate-x-0.5">
        {arrow}
      </span>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[var(--e-out)] group-hover:scale-x-100"
      />
    </>
  );
  if (external || download || href.startsWith("mailto:") || href.startsWith("#")) {
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
