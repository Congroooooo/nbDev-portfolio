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
      <div data-story-panel className="sticky top-0 h-svh overflow-hidden">
        <div className="wrap relative h-full">
          {/* centered counter: one element, text written by the timeline */}
          <div className="pointer-events-none absolute inset-x-0 top-[34%] flex flex-col items-center md:top-[56%]">
            <p
              data-testid="story-counter"
              aria-hidden
              className="t-mega font-mono text-accent tabular-nums will-change-[filter]"
            >
              {storyFrames[0].counter}
            </p>
            <div className="mt-3 grid" aria-hidden>
              {storyFrames.map((f, i) => (
                <p
                  key={f.index}
                  data-story-fx={i}
                  className={cn("t-label col-start-1 row-start-1 text-center text-mute", hidden(i))}
                >
                  {f.caption}
                </p>
              ))}
            </div>
          </div>

          {storyFrames.map((f, i) => (
            <article
              key={f.index}
                            aria-label={storyFrameTag(i + 1)}
              className="pointer-events-none absolute inset-0"
            >
              {/* animated leaves carry their own blend mode (an animated parent would isolate it) */}
              <div
                data-story-fx={i}
                className={cn(
                  "t-label absolute inset-x-[var(--pad)] top-[calc(var(--nav-h)+16px)] flex justify-between gap-4 mix-blend-difference",
                  hidden(i),
                )}
              >
                <p>{f.index}</p>
                <p className="text-right">{storyFrameTag(i + 1)}</p>
              </div>
              <p
                data-story-fx={i}
                className={cn(
                  "t-d3 absolute bottom-10 left-[var(--pad)] max-w-[15ch] mix-blend-difference md:bottom-12 md:max-w-[17ch]",
                  hidden(i),
                )}
              >
                {f.sentence}
                <span className="sr-only">
                  {" "}
                  {f.counter} · {f.caption}
                </span>
              </p>
            </article>
          ))}
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
