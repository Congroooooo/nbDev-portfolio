import type { Social } from './types';

export const site = {
  name: 'Nicko Balmes',
  brand: '<nbDev/>',
  role: 'Junior Software Engineer',
  email: 'nckoblms@gmail.com',
  location: 'Mauban, Quezon, Philippines',
  locationShort: 'Mauban, PH',
  timezone: 'Asia/Manila',
  cv: '/Nicko_Balmes_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Congroooooo' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nicko-balmes-088770343/' },
    { label: 'Facebook', href: 'https://www.facebook.com/congrooo' },
    { label: 'Instagram', href: 'https://www.instagram.com/congroooooooo/' },
  ] as Social[],
  footerLine: '© 2026 Nicko Balmes · Prototyped in Mauban, shipped on Vercel',
};
