import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content";
import { ProjectHero } from "@/components/work/ProjectHero";
import { ProjectBody } from "@/components/work/ProjectBody";
import { NextProject } from "@/components/work/NextProject";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.name} · Nicko Balmes` : "Work · Nicko Balmes" };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <ProjectHero project={project} />
      <ProjectBody project={project} />
      <NextProject project={project} />
    </>
  );
}
