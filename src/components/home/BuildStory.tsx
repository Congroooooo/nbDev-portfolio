import { storyFrames, storyFrameTag } from "@/content";
import { FadeUp } from "@/components/motion";
import { MarkFallback } from "@/components/three/MarkFallback";
import { cn } from "@/lib/cn";

/**
 * "The build" scroll story. `pinned`: a tall section with a sticky full-viewport panel whose
 * frames, counter and labels are driven by the single scene timeline in HomeScene (via the
 * data-story-* hooks). `static` (reduced motion / no WebGL): four stacked, unpinned frames.
 */
export function BuildStory({ mode }: { mode: "pinned" | "static" }) {
  if (mode === "static") return <StaticStory />;

  return (
    <section
      data-testid="build-story"
      aria-label="The build"
      className="relative h-[250vh] text-bone md:h-[400vh]"
    >
      {/* The animated panel shows one frame at a time; screen readers get all four here instead. */}
      <ol className="sr-only">
        {storyFrames.map((f, i) => (
          <li key={f.index}>
            {storyFrameTag(i + 1)}. {f.index}. {f.sentence} {f.counter}, {f.caption}.
          </li>
        ))}
      </ol>
      <div data-story-panel aria-hidden className="sticky top-0 h-svh overflow-hidden">
        <div className="wrap relative h-full">
          {/* top row: index label left, frame tag right (one per frame, crossfaded) */}
          {storyFrames.map((f, i) => (
            <div
              key={f.index}
              data-story-fx={i}
              className={cn(
                "t-label pointer-events-none absolute inset-x-[var(--pad)] top-[calc(var(--nav-h)+16px)] flex justify-between gap-4 mix-blend-difference",
                hidden(i),
              )}
            >
              <p>{f.index}</p>
              <p className="text-right">{storyFrameTag(i + 1)}</p>
            </div>
          ))}

          {/* Bottom stack: the counter block is anchored to the top of the sentence area, so the
              two can never overlap. All four sentences share one grid cell, so the cell is as tall
              as the longest sentence and the counter does not jump between frames. */}
          <div className="pointer-events-none absolute inset-x-[var(--pad)] bottom-10 flex flex-col md:bottom-12">
            {/* counter: one element, text written by the timeline. It sits over the bright solid
                in f3/f4, so it gets a soft ink scrim (accent keeps AA for large text) and the
                caption an ink pill. */}
            <div className="mb-10 flex flex-col items-center md:mb-14">
              <div className="relative isolate">
                <div
                  className="absolute -inset-x-[45%] -inset-y-[40%] -z-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgb(11 12 12 / 0.88), rgb(11 12 12 / 0.8) 55%, rgb(11 12 12 / 0) 100%)",
                  }}
                />
                <p data-testid="story-counter" className="t-mega font-mono text-accent tabular-nums will-change-[filter]">
                  {storyFrames[0].counter}
                </p>
              </div>
              <div className="mt-3 grid">
                {storyFrames.map((f, i) => (
                  <p
                    key={f.index}
                    data-story-fx={i}
                    className={cn(
                      "t-label col-start-1 row-start-1 justify-self-center rounded-full bg-ink/85 px-3 py-0.5 text-center text-bone",
                      hidden(i),
                    )}
                  >
                    {f.caption}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid">
              {storyFrames.map((f, i) => (
                // animated leaves carry their own blend mode (an animated parent would isolate it)
                <p
                  key={f.index}
                  data-story-fx={i}
                  className={cn(
                    "t-h1 md:t-d3 col-start-1 row-start-1 max-w-[15ch] self-end mix-blend-difference md:max-w-[20ch]",
                    hidden(i),
                  )}
                >
                  {f.sentence}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Frames after the first start hidden until the timeline takes over (no flash before hydration). */
const hidden = (i: number) => (i > 0 ? "invisible opacity-0" : undefined);

function StaticStory() {
  return (
    <section data-testid="build-story" aria-label="The build" className="relative bg-ink py-[var(--sec)] text-bone">
      <div className="wrap flex flex-col">
        {storyFrames.map((f, i) => (
          <FadeUp key={f.index} className="border-t border-line py-12 md:py-16">
            <article className="grid gap-8 md:grid-cols-12 md:gap-[var(--gut)]">
              <div className="t-label flex justify-between gap-4 text-mute md:col-span-12">
                <p>{f.index}</p>
                <p className="text-right">{storyFrameTag(i + 1)}</p>
              </div>
              <p className="t-d3 md:col-span-7 md:max-w-[17ch]">{f.sentence}</p>
              <div className="flex items-end justify-between gap-6 md:col-span-5 md:flex-col md:items-end">
                <MarkFallback variant={i < 2 ? "wire" : "solid"} className="w-28 md:w-36" />
                <p className="text-right">
                  <span className="t-mega block font-mono text-accent">{f.counter}</span>
                  <span className="t-label mt-2 block text-mute">{f.caption}</span>
                </p>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
