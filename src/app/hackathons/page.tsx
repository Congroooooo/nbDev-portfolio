import type { Metadata } from "next";
import { hackathons, hackathonsPage } from "@/content";
import { Section, SectionLabel, ArrowLink } from "@/components/ui";
import { Timeline } from "@/components/hackathons/Timeline";

export const metadata: Metadata = { title: "Hackathons · Nicko Balmes" };

export default function HackathonsPage() {
  return (
    <>
      <Section tone="ink" className="pt-[calc(var(--nav-h)+64px)] md:pt-[calc(var(--nav-h)+120px)]">
        <SectionLabel className="text-mute">01 · Competitions</SectionLabel>
        <h1 className="t-d1 mt-8">{hackathonsPage.title}</h1>
        <p className="t-lead mt-10 max-w-[48ch] text-bone-2">{hackathonsPage.intro}</p>
        <p className="t-label mt-10 border-t border-line pt-5 text-accent">{hackathonsPage.summary}</p>
      </Section>
      <Section tone="bone">
        <SectionLabel className="mb-10 text-mute">02 · Timeline</SectionLabel>
        <Timeline items={hackathons} />
        <div className="mt-14">
          <ArrowLink href="/about#certificates" arrow="→" className="t-h3">
            {hackathonsPage.certificatesLink}
          </ArrowLink>
        </div>
      </Section>
    </>
  );
}
