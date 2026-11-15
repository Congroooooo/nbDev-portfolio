import type { StoryFrame, Win, Stat } from './types';

export const hero = {
  label: 'Junior Software Engineer',
  line1: 'I prototype it.',
  line2: 'I ship it.',
  lead: 'Computer Science graduate building full-stack products with React, Angular and Laravel. I win hackathons on twenty-hour clocks, then ship the real thing with AI agents in the loop.',
  meta: 'BSCS 2026 · 3 engineering roles · 7 hackathons',
  cta: { label: 'Get in touch', href: 'mailto:nckoblms@gmail.com' },
  scrollHint: 'Scroll to run the build',
};

export const storyFrames: StoryFrame[] = [
  { index: '01 · idea', sentence: 'Every build starts as a problem worth solving.', counter: '00h', caption: 'idea' },
  { index: '02 · prototype', sentence: 'Twenty hours later, it has to work in front of judges.', counter: '20h', caption: 'prototype' },
  { index: '03 · shipped', sentence: 'Then it has to work for real people, not just the demo.', counter: 'v1', caption: 'shipped' },
  { index: '04 · production', sentence: "I stay for that part. That's where software earns its keep.", counter: '∞', caption: 'production' },
];
export const storyFrameTag = (n: number) => `The build · frame ${n} of 4`;

export const selectedWork = {
  title: 'Prototyped, then shipped.',
  intro: 'Hackathon builds, client work and a school system people actually used. Point at a name to see the team behind it.',
  footerNote: 'Seven projects on the work page',
  footerLink: 'See all work',
};

export const stack = {
  front: { title: 'Front of the stack', meta: 'Interfaces · 05', items: [
    { key: 'f.1', label: 'React and Next.js' },
    { key: 'f.2', label: 'Angular and Ionic' },
    { key: 'f.3', label: 'Tailwind and design systems' },
    { key: 'f.4', label: 'Figma to responsive UI' },
    { key: 'f.5', label: 'Vue.js and Vite' },
  ] },
  back: { title: 'Back of the stack', meta: '05 · Systems', items: [
    { key: 'b.1', label: 'Laravel and PHP' },
    { key: 'b.2', label: 'Node.js and REST APIs' },
    { key: 'b.3', label: 'MySQL, PostgreSQL, MongoDB' },
    { key: 'b.4', label: 'Prisma and SQLite' },
    { key: 'b.5', label: 'Docker and Vercel' },
  ] },
  agents: { title: 'Agents in the loop', items: ['Claude Code', 'OpenCode', 'Orca', 'MCP', 'Agentic QA', 'Multi-agent workflows'] },
  link: 'See the full toolset',
};

export const wins: Win[] = [
  { headline: 'Champion.', initials: 'OI', event: 'OpenIT Hackathon', meta: 'November 2025 · Alertify', hackathonId: 'openit-nov-2025',
    body: 'Twenty hours to build a real-time alert system. Our team shipped Alertify, an earthquake alert app on live USGS data with SMS warnings and AI-suggested next steps, and took the title after the final pitch to industry judges.' },
  { headline: '2nd Runner-Up.', initials: 'FEU', event: 'FEU Create & Conquer', meta: 'June 2025 · PrepTalk AI', hackathonId: 'feu-2025',
    body: 'PrepTalk AI helps freelancers and microentrepreneurs rehearse interviews and pitches, from resume parsing to custom mock sessions. It placed third overall and won Best in Working Prototype.' },
  { headline: 'Top 10.', initials: 'UP', event: 'Hack The Flood', meta: '2025 · UP Diliman', hackathonId: 'hack-the-flood-2025',
    body: "A top-ten finish at the University of the Philippines Diliman's flood-response hackathon." },
  { headline: 'Top 10.', initials: 'IN', event: 'Innolympics', meta: '2026 · Track finalist', hackathonId: 'innolympics-2026',
    body: 'A top-ten finish in our track at Innolympics 2026.' },
];

export const stats: Stat[] = [
  { value: 7, label: 'Hackathons', sub: 'Since 2025' },
  { value: 3, label: 'Engineering roles', sub: 'Intern to full-stack' },
  { value: 11, label: 'Certificates', sub: 'Since 2023' },
  { value: 2026, label: 'BSCS graduate', sub: 'STI College Lucena', format: 'year' },
];

export const contact = {
  label: 'Open to new work and collaborations',
  headline: 'Something worth shipping?',
  email: 'nckoblms@gmail.com',
};

export const workPage = {
  title: 'Work',
  intro: "Seven projects, from twenty-hour hackathon builds to client sites and a campus system. Each one started as somebody's problem.",
  filters: ['All', 'Hackathon', 'Client', 'Academic'] as const,
};

export const hackathonsPage = {
  title: 'Hackathons',
  intro: 'Twenty-hour clocks, strangers for judges and a demo that has to work. Seven times since 2025.',
  summary: '7 hackathons · 1 championship · 1 podium · 2 top-ten finishes',
  certificatesLink: 'See the certificates',
};

export const aboutPage = {
  title: 'About',
  summary: 'Junior Software Engineer and Computer Science graduate working across full-stack web development, responsive UI, backend APIs and software delivery. I build with modern JavaScript frameworks, Laravel, databases and cloud deployment, and work with engineering teams on AI-integrated applications. Recognized for leadership, academic excellence and competitive hackathon results.',
  meta: 'Mauban, Quezon · BSCS 2026 · Open to collaborations',
  cvLabel: 'Download CV',
  interests: ['Full-stack application engineering', 'AI-enhanced software development', 'Agent orchestration', 'Software architecture', 'Developer tooling', 'UI/UX engineering'],
};

export const notFound = {
  headline: "This page didn't ship.",
  body: 'The link is broken or the page moved.',
  button: 'Back home',
};
