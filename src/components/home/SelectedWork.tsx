import { featuredProjects, selectedWork } from "@/content";
import { ArrowLink, Section } from "@/components/ui";
import { FadeUp, RevealText } from "@/components/motion";
import { WorkList } from "@/components/work/WorkList";

export function SelectedWork() {
  return (
    <Section tone="bone" id="work">
      <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-2 md:items-end md:gap-[var(--gut)]">
        <RevealText as="h2" className="t-d1">
          {selectedWork.title}
        </RevealText>
        <FadeUp className="md:max-w-[480px] md:justify-self-end">
          <p className="t-lead text-mute">{selectedWork.intro}</p>
        </FadeUp>
      </div>
      <WorkList projects={featuredProjects()} tone="bone" />
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="t-label text-mute">{selectedWork.footerNote}</p>
        <ArrowLink href="/work" className="t-lead">
          {selectedWork.footerLink}
        </ArrowLink>
      </div>
    </Section>
  );
}
