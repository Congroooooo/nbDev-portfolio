"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/content/types";
import { useReducedMotion } from "@/components/motion";
import { PillButton, Section } from "@/components/ui";
import { TypeCover } from "./TypeCover";

export function ProjectHero({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4.5%", "4.5%"]);

  const meta: { label: string; value: string }[] = [];
  if (project.year) meta.push({ label: "Year", value: project.year });
  meta.push({ label: "Context", value: project.category });
  if (project.role) meta.push({ label: "Role", value: project.role });
  if (project.stack?.length) meta.push({ label: "Stack", value: project.stack.join(" · ") });
  if (project.award) meta.push({ label: "Award", value: project.award });

  return (
    <Section tone="ink" className="pt-[calc(var(--nav-h)+var(--sec)*0.5)] pb-[calc(var(--sec)*0.6)]">
      <nav aria-label="Breadcrumb" className="t-label mb-8 text-mute md:mb-12">
        <Link href="/work" className="transition-colors hover:text-bone">
          Work
        </Link>
        <span aria-hidden> / </span>
        <span className="text-bone">{project.name}</span>
      </nav>

      <h1 className="t-d1 max-w-[16ch]">{project.name}</h1>
      <p className="t-lead mt-6 max-w-[620px] text-mute md:mt-8">{project.summary}</p>

      <dl className="mt-12 grid grid-cols-2 gap-x-[var(--gut)] gap-y-8 border-t border-line pt-8 md:mt-16 md:grid-cols-4">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="t-label text-mute">{m.label}</dt>
            <dd className="t-body mt-2">{m.value}</dd>
          </div>
        ))}
      </dl>

      {project.liveUrl && (
        <div className="mt-10">
          <PillButton href={project.liveUrl} external size="lg">
            Live demo
          </PillButton>
        </div>
      )}

      <div ref={coverRef} className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[16px] bg-ink-2 md:mt-20">
        {project.image ? (
          <motion.div className="absolute inset-x-0 -top-[5%] h-[110%]" style={reduce ? undefined : { y }}>
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="(min-width: 1680px) 1584px, (min-width: 768px) calc(100vw - 96px), calc(100vw - 40px)"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <TypeCover name={project.name} />
        )}
      </div>
    </Section>
  );
}
