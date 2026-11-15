import type { Metadata } from "next";
import { workPage } from "@/content";
import { Section } from "@/components/ui";
import { FadeUp, RevealText } from "@/components/motion";
import { WorkFilter } from "@/components/work/WorkFilter";

export const metadata: Metadata = { title: "Work · Nicko Balmes" };

export default function WorkPage() {
  return (
    <>
      <Section tone="ink" className="pt-[calc(var(--nav-h)+var(--sec)*0.6)] pb-[calc(var(--sec)*0.6)]">
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-[var(--gut)]">
          <RevealText as="h1" className="t-d1">
            {workPage.title}
          </RevealText>
          <FadeUp className="md:max-w-[480px] md:justify-self-end">
            <p className="t-lead text-mute">{workPage.intro}</p>
          </FadeUp>
        </div>
      </Section>
      <Section tone="bone">
        <WorkFilter />
      </Section>
    </>
  );
}
