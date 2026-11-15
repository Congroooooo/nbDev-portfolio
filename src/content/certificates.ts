import type { Certificate } from './types';

const c = (title: string, date: string, file: string): Certificate => ({
  title, date, image: { src: `/images/certs/${file}`, alt: `Certificate: ${title}` },
});

export const certificates: Certificate[] = [
  c('Thesis Symposium Participation', 'Dec 2025', 'thesis-symposium.jpg'),
  c('OpenIT Hackathon November — Champion', 'Nov 2025', 'openit-nov-2025.jpg'),
  c('ICT Code Camp Mentorship', 'Oct 2025', 'ict-code-camp.jpg'),
  c('Inventi Hackathon Participation', 'Sep 2025', 'inventi-2025.png'),
  c('HackerCup 2025 — DLSU', '2025', 'hackercup-dlsu-2025.jpg'),
  c('OpenIT Hackathon July Participation', 'Jul 2025', 'openit-jul-2025.jpg'),
  c('FEU Create & Conquer — Finalist', 'Jun 2025', 'feu-finalist.jpg'),
  c('FEU Create & Conquer — 2nd Runner-Up', 'Jun 2025', 'feu-2nd-runner-up.jpg'),
  c('FEU Create & Conquer — Best in Working Prototype', 'Jun 2025', 'feu-best-prototype.jpg'),
  c('NailsByKheley — Best in Database Management', 'Sep 2023', 'nailsbykheley-db.jpg'),
  c('Java Fundamentals', 'Jun 2023', 'java-fundamentals.jpg'),
];
