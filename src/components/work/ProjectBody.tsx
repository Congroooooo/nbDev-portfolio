import type { Project } from "@/content/types";
import { hackathons } from "@/content";
import { ArrowLink, Section } from "@/components/ui";
import { FadeUp } from "@/components/motion";

export function ProjectBody({ project }: { project: Project }) {
  const hackathon = project.hackathonId ? hackathons.find((h) => h.id === project.hackathonId) : undefined;
  const sections: { title: string; body: string }[] = [
    { title: "The problem", body: project.problem },
    { title: "What we built", body: project.built },
    ...(project.role ? [{ title: "My part", body: project.role }] : []),
    { title: "Outcome", body: project.outcome },
  ];

  return (
    <Section tone="bone">
      <div className="divide-y divide-line-l border-y border-line-l">
        {sections.map((s) => (
          <FadeUp key={s.title} className="grid gap-4 py-10 md:grid-cols-[1fr_2fr] md:gap-[var(--gut)] md:py-14">
            <h2 className="t-h3">{s.title}</h2>
            <p className="t-lead max-w-[680px]">{s.body}</p>
          </FadeUp>
        ))}
      </div>

      <div className="mt-16 md:mt-24">
        <p className="t-label text-mute">Features</p>
        <ol className="mt-6 border-t border-line-l">
          {project.features.map((f, i) => (
            <li
              key={f}
              className="grid grid-cols-[48px_1fr] items-baseline gap-4 border-b border-line-l py-5 md:grid-cols-[72px_1fr] md:py-6"
            >
              <span className="t-label text-mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-h3">{f}</span>
            </li>
          ))}
        </ol>
      </div>

      {hackathon && (
        <div className="mt-16 rounded-[16px] bg-ink p-8 text-bone md:mt-24 md:p-12">
          <p className="t-label text-accent">Hackathon</p>
          <p className="t-h2 mt-4">{hackathon.name}</p>
          <p className="t-lead mt-3 text-mute">{hackathon.placement}</p>
          <ArrowLink href={`/hackathons#${hackathon.id}`} className="t-lead mt-8">
            See it on the hackathons page
          </ArrowLink>
        </div>
      )}
    </Section>
  );
}
