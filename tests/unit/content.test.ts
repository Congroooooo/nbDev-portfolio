import { describe, test, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import * as content from '../../src/content';

const { projects, hackathons, certificates, experience, events } = content;

const imageSrcs = (): string[] => {
  const out: string[] = [];
  const walk = (v: unknown) => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach(walk);
    const o = v as Record<string, unknown>;
    if (typeof o.src === 'string' && typeof o.alt === 'string') out.push(o.src);
    Object.values(o).forEach(walk);
  };
  walk(content);
  return out;
};

describe('content', () => {
  test('project slugs unique', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });
  test('exactly 5 featured: alertify, preptalk-ai, pamo, work-hive, bayanimo', () => {
    expect(content.featuredProjects().map((p) => p.slug)).toEqual(['alertify', 'preptalk-ai', 'pamo', 'work-hive', 'bayanimo']);
  });
  test('7 projects, 7 hackathons, 11 certificates, 3 experience entries', () => {
    expect(projects).toHaveLength(7);
    expect(hackathons).toHaveLength(7);
    expect(certificates).toHaveLength(11);
    expect(experience).toHaveLength(3);
  });
  test('hackathonId / projectSlug cross-references resolve', () => {
    const hIds = new Set(hackathons.map((h) => h.id));
    const slugs = new Set(projects.map((p) => p.slug));
    projects.forEach((p) => p.hackathonId && expect(hIds.has(p.hackathonId)).toBe(true));
    hackathons.forEach((h) => h.projectSlug && expect(slugs.has(h.projectSlug)).toBe(true));
    events.forEach((e) => e.projectSlug && expect(slugs.has(e.projectSlug)).toBe(true));
    content.wins.forEach((w) => expect(hIds.has(w.hackathonId)).toBe(true));
  });
  test('FEU is podium and says 2nd Runner-Up, never 1st Place', () => {
    const feu = hackathons.find((h) => h.id === 'feu-2025')!;
    expect(feu.tier).toBe('podium');
    expect(feu.placement).toContain('2nd Runner-Up');
    expect(JSON.stringify(content)).not.toMatch(/1st Place/);
  });
  test('no [TBC], "inferred", or phone digits in content', () => {
    expect(JSON.stringify(content)).not.toMatch(/\[TBC\]|inferred|963 ?490|09634902175/);
  });
  test('every image src exists under public/', () => {
    const srcs = imageSrcs();
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', src)), src).toBe(true);
    }
  });
  test('hackathons sorted newest first by sortKey', () => {
    const keys = hackathons.map((h) => h.sortKey);
    expect(keys).toEqual([...keys].sort().reverse());
    expect(hackathons.map((h) => h.id)).toEqual([
      'innolympics-2026', 'openit-nov-2025', 'hackercup-dlsu-2025', 'inventi-2025',
      'hack-the-flood-2025', 'openit-jul-2025', 'feu-2025',
    ]);
  });
  test('no project has a code/repo URL field', () => {
    projects.forEach((p) => {
      const keys = Object.keys(p);
      expect(keys).not.toContain('codeUrl');
      expect(keys).not.toContain('repo');
    });
  });
});
