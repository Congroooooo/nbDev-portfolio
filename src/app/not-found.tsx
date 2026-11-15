import { notFound } from "@/content";
import { PillButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-start justify-center gap-8 pt-[var(--nav-h)]">
      <p className="t-label font-mono text-accent">404</p>
      <h1 className="t-d1 max-w-[12ch]">{notFound.headline}</h1>
      <p className="t-lead max-w-[40ch] text-mute">{notFound.body}</p>
      <PillButton href="/" size="lg">
        {notFound.button}
      </PillButton>
    </section>
  );
}
