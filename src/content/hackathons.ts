import type { Hackathon } from './types';
import { projects } from './projects';

const img = (slug: string) => projects.find((p) => p.slug === slug)?.image;

const raw: Hackathon[] = [
  { id: 'innolympics-2026', name: 'Innolympics 2026', date: '2026', sortKey: '2026-12',
    placement: 'Top 10 (Track)', tier: 'top10', story: 'A top-ten finish in our track.' },
  { id: 'openit-nov-2025', name: 'OpenIT Hackathon — November', date: 'Nov 2025', sortKey: '2025-11',
    placement: 'Champion', tier: 'champion',
    story: "A 20-hour competition to build tech for real-world problems; this edition's theme was real-time alert systems. Our real-time earthquake alert system, Alertify, won after the final pitch to industry judges.",
    projectSlug: 'alertify', image: img('alertify') },
  { id: 'hackercup-dlsu-2025', name: 'HackerCup 2025 — De La Salle University', date: '2025', sortKey: '2025-09b',
    placement: 'Participant', tier: 'participant',
    story: 'We built Work Hive, a job-matching app that gathers postings, tracks applications and recommends roles from your résumé, to take the frustration out of hopping between job sites.',
    projectSlug: 'work-hive', image: img('work-hive') },
  { id: 'inventi-2025', name: 'Inventi Hackathon', date: 'Sep 2025', sortKey: '2025-09a',
    placement: 'Participant', tier: 'participant', story: 'Participated.' },
  { id: 'hack-the-flood-2025', name: 'UP Diliman — Hack The Flood', date: '2025', sortKey: '2025-08',
    placement: 'Top 10', tier: 'top10', story: "A top-ten finish at UP Diliman's flood-response hackathon." },
  { id: 'openit-jul-2025', name: 'OpenIT Hackathon — July', date: 'Jul 2025', sortKey: '2025-07',
    placement: 'Participant', tier: 'participant',
    story: 'We built Bayanimo, a gamified project-management app that brings barangay and municipal initiatives into one place and gets citizens involved.',
    projectSlug: 'bayanimo', image: img('bayanimo') },
  { id: 'feu-2025', name: 'FEU Create & Conquer 2025', date: 'Jun 2025', sortKey: '2025-06',
    placement: '2nd Runner-Up · Best in Working Prototype · Finalist', tier: 'podium',
    story: 'We built PrepTalk AI, a platform that helps freelancers and microentrepreneurs rehearse interviews and pitches with resume parsing, custom mock interviews and AI feedback. It placed third and won Best in Working Prototype.',
    projectSlug: 'preptalk-ai', image: img('preptalk-ai') },
];

export const hackathons: Hackathon[] = [...raw].sort((a, b) =>
  a.sortKey < b.sortKey ? 1 : a.sortKey > b.sortKey ? -1 : 0,
);
