import { hero } from "@/content";
import { PillButton } from "@/components/ui";
import { FadeUp, RevealText } from "@/components/motion";
import { LiveClock } from "@/components/layout/LiveClock";

/**
 * Home hero (ink, 100svh). Owns the page's only <h1>. The mark itself lives in HomeScene's
 * scene layer behind this content, so hero and story share one object.
 */
export function Hero() {
  return (
    <section
      data-testid="hero"
      className="relative flex h-svh min-h-[560px] flex-col text-bone"
      aria-labelledby="hero-title"
    >
      <div className="wrap flex h-full flex-col pt-[calc(var(--nav-h)+16px)] pb-8 md:pb-10">
        <div className="t-label flex items-center justify-between gap-4 text-mute">
          <p>{hero.label}</p>
          <LiveClock className="text-right" />
        </div>

        <h1
          id="hero-title"
          aria-label={`${hero.line1} ${hero.line2}`}
          className="t-d1 flex flex-1 flex-col justify-between py-[5svh] md:py-[4svh]"
        >
          <RevealText as="span" className="block self-start">
            {hero.line1}
          </RevealText>
          <RevealText as="span" className="block self-end text-right" delay={0.25}>
            {hero.line2}
          </RevealText>
        </h1>

        <FadeUp delay={0.45} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[44ch]">
            <p className="t-lead text-bone/85">{hero.lead}</p>
            <p className="t-label mt-4 text-mute">{hero.meta}</p>
          </div>
          <div className="flex items-end gap-6">
            <p className="t-label hidden text-mute lg:block" aria-hidden>
              {hero.scrollHint} ↓
            </p>
            <PillButton href={hero.cta.href} tone="bone" size="lg">
              {hero.cta.label}
            </PillButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
