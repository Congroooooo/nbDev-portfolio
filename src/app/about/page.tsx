import type { Metadata } from "next";
import { aboutPage, awards, certificates, events, experience, site, skillGroups } from "@/content";
import { Section, SectionLabel, PillButton, Chip } from "@/components/ui";
import { ExperienceList } from "@/components/about/ExperienceList";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { Recognition } from "@/components/about/Recognition";
import { CertificatesGrid } from "@/components/about/CertificatesGrid";

export const metadata: Metadata = { title: "About · Nicko Balmes" };

export default function AboutPage() {
  return (
    <>
      <Section tone="ink" className="pt-[calc(var(--nav-h)+64px)] md:pt-[calc(var(--nav-h)+120px)]">
        <SectionLabel className="text-mute">01 · About</SectionLabel>
        <h1 className="t-d1 mt-8">{aboutPage.title}</h1>
        <p className="t-lead mt-10 max-w-[60ch] text-bone-2">{aboutPage.summary}</p>
        <p className="t-label mt-8 text-mute">{aboutPage.meta}</p>
        <ul className="mt-10 flex flex-wrap gap-2">
          {aboutPage.interests.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <PillButton href={site.cv} download tone="bone" size="lg">
            {aboutPage.cvLabel}
          </PillButton>
        </div>
      </Section>
      <Section tone="bone" id="experience">
        <SectionLabel className="mb-10 text-mute">02 · Experience</SectionLabel>
        <ExperienceList items={experience} />
      </Section>
      <Section tone="ink" id="skills">
        <SectionLabel className="mb-10 text-mute">03 · Skills</SectionLabel>
        <SkillsGrid groups={skillGroups} />
      </Section>
      <Section tone="bone" id="recognition">
        <SectionLabel className="mb-10 text-mute">04 · Recognition</SectionLabel>
        <Recognition awards={awards} events={events} />
      </Section>
      <Section tone="ink" id="certificates">
        <SectionLabel className="mb-10 text-mute">05 · Certificates</SectionLabel>
        <CertificatesGrid items={certificates} />
      </Section>
    </>
  );
}
