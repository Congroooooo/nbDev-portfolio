import type { Award, EventItem } from './types';

export const awards: Award[] = [
  { title: 'Service Awardee', detail: 'STI College Lucena, Class of 2026' },
  { title: 'Excellence in CS Thesis', detail: 'STI College Lucena, 2026' },
];

export const events: EventItem[] = [
  { title: 'Thesis Symposium 2025', date: 'December 2025', badge: 'Thesis award',
    body: "Our team's system was one of the projects selected for presentation at STI College Lucena's Thesis Symposium, where we presented its goals and technical implementation to students and faculty.",
    image: { src: '/images/events/thesis-symposium.jpg', alt: 'Our team at the STI College Lucena Thesis Symposium' } },
  { title: 'ICT Code Camp, Java Workshop', date: 'October 2025', badge: 'Mentor',
    body: 'Selected as a mentor to teach Java fundamentals to lower-year ICT students: led hands-on coding sessions and built the learning materials.',
    image: { src: '/images/events/ict-code-camp.jpg', alt: 'Mentoring at the ICT Code Camp Java Workshop' } },
  { title: 'Final Project Website', date: '2023', badge: 'Best in Database Management',
    body: 'Best in Database Management for NailsByKheley.', projectSlug: 'nailsbykheley' },
];
