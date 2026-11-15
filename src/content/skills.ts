import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Vite', 'Tailwind CSS', 'Vue.js'] },
  { title: 'Backend & data', items: ['PHP', 'Laravel', 'Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'SQLite', 'Prisma', 'SQL', 'REST APIs'] },
  { title: 'Testing & delivery', items: ['Playwright', 'Postman', 'Manual / functional / regression testing', 'Git', 'GitHub', 'GitLab', 'Agentic Development Driven', 'Jira', 'Slack', 'Mattermost'] },
  { title: 'Design & deployment', items: ['Figma', 'Wireframing', 'Prototyping', 'Design systems', 'Responsive UI', 'Vercel', 'Namecheap cPanel', 'Docker'] },
  { title: 'AI-assisted engineering', items: ['Claude Code', 'OpenCode', 'Orca', 'MCP', 'Agentic QA', 'Multi-agent workflows', 'Reusable agent instructions'] },
  { title: 'Other', items: ['Python', 'Java', 'C++', 'WordPress', 'Notion'] },
];
