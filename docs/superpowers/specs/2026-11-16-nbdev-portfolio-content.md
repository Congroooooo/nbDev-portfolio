# nbDev Portfolio — Content

Companion to `2026-11-16-nbdev-portfolio-design.md`. This is the copy the builder puts into `src/content/*.ts`. Facts come only from the resume and the old site; rewrites change wording, never facts. Items marked **[TBC]** need owner input; if unanswered, the builder omits that field.

**Resolved 2026-11-16:** owner chose to skip all [TBC] items. Builder omits every [TBC] field and every value marked "inferred; confirm" (e.g. PAMO and NailsByKheley stacks). Where a line mixes confirmed text and [TBC], keep only the confirmed text. Project meta grid shows only fields that have values (no "Stack" row when empty; PAMO and GWA show no year).

---

## site.ts

- name: Nicko Balmes
- brand: `<nbDev/>`
- role: Junior Software Engineer
- email: nckoblms@gmail.com
- location: Mauban, Quezon, Philippines (display "Mauban, PH")
- timezone: Asia/Manila (GMT+8)
- cv: `/Nicko_Balmes_Resume.pdf` (copy of `Nicko_Balmes_Resume_Refined.pdf`)
- socials:
  - GitHub — https://github.com/Congroooooo
  - LinkedIn — https://www.linkedin.com/in/nicko-balmes-088770343/
  - Facebook — https://www.facebook.com/congrooo
  - Instagram — https://www.instagram.com/congroooooooo/
- footer line: "© 2026 Nicko Balmes · Prototyped in Mauban, shipped on Vercel"

---

## Home

### Hero
- label left: Junior Software Engineer
- clock right: Mauban, PH · {HH:MM} GMT+8
- line 1: I prototype it.
- line 2: I ship it.
- lead: Computer Science graduate building full-stack products with React, Angular and Laravel. I win hackathons on twenty-hour clocks, then ship the real thing with AI agents in the loop.
- meta (mono): BSCS 2026 · 3 engineering roles · 7 hackathons
- CTA: Get in touch ↗

### The build (scroll story)
| # | index label | sentence | counter | caption |
|---|---|---|---|---|
| 1 | 01 · idea | Every build starts as a problem worth solving. | 00h | idea |
| 2 | 02 · prototype | Twenty hours later, it has to work in front of judges. | 20h | prototype |
| 3 | 03 · shipped | Then it has to work for real people, not just the demo. | v1 | shipped |
| 4 | 04 · production | I stay for that part. That's where software earns its keep. | ∞ | production |
- frame tag: "The build · frame {n} of 4"
- scroll hint under hero counter: "Scroll to run the build"

### Selected work
- H2: Prototyped, then shipped.
- intro: Hackathon builds, client work and a school system people actually used. Point at a name to see the team behind it.
- rows: Alertify, PrepTalk AI, PAMO, Work Hive, Bayanimo (uses each project's `category · tagline`)
- footer: "Seven projects on the work page" · "See all work ↗"

### Stack
- left title: Front of the stack · right meta "Interfaces · 05"
  - f.1 React and Next.js
  - f.2 Angular and Ionic
  - f.3 Tailwind and design systems
  - f.4 Figma to responsive UI
  - f.5 Vue.js and Vite
- right title: Back of the stack · left meta "05 · Systems"
  - b.1 Laravel and PHP
  - b.2 Node.js and REST APIs
  - b.3 MySQL, PostgreSQL, MongoDB
  - b.4 Prisma and SQLite
  - b.5 Docker and Vercel
- row: Agents in the loop — Claude Code · OpenCode · Orca · MCP · Agentic QA · Multi-agent workflows
- link: See the full toolset ↗

### Wins carousel
| tab | headline | body | badge initials | event | meta |
|---|---|---|---|---|---|
| 01/04 | Champion. | Twenty hours to build a real-time alert system. Our team shipped Alertify, an earthquake alert app on live USGS data with SMS warnings and AI-suggested next steps, and took the title after the final pitch to industry judges. | OI | OpenIT Hackathon | November 2025 · Alertify |
| 02/04 | 2nd Runner-Up. | PrepTalk AI helps freelancers and microentrepreneurs rehearse interviews and pitches, from resume parsing to custom mock sessions. It placed third overall and won Best in Working Prototype. | FEU | FEU Create & Conquer | June 2025 · PrepTalk AI |
| 03/04 | Top 10. | A top-ten finish at the University of the Philippines Diliman's flood-response hackathon. | UP | Hack The Flood | 2025 · UP Diliman |
| 04/04 | Top 10. | A top-ten finish in our track at Innolympics 2026. | IN | Innolympics | 2026 · Track finalist |

### Stats
| number | label | sub |
|---|---|---|
| 7 | Hackathons | Since 2025 |
| 3 | Engineering roles | Intern to full-stack |
| 11 | Certificates | Since 2023 |
| 2026 | BSCS graduate | STI College Lucena |

### Contact (footer, all pages)
- label: Open to new work and collaborations
- headline: Something worth shipping?
- email: nckoblms@gmail.com
- columns: Explore (Home, Work, Hackathons, About) · Connect (GitHub, LinkedIn, Facebook, Instagram) · Contact (email, "Mauban, Quezon · GMT+8", "Download CV ↗")

---

## Work `/work`
- title: Work
- intro: Seven projects, from twenty-hour hackathon builds to client sites and a campus system. Each one started as somebody's problem.
- filters: All · Hackathon · Client · Academic

## Projects (projects.ts)

Order = display order. `featured` = shown on home.

### 1. Alertify — `alertify` · featured
- category: Hackathon · year: 2025
- tagline: Real-time earthquake alerts with AI guidance
- summary: An earthquake alert system that warns people the moment the ground moves, and tells them what to do next.
- problem: In an earthquake the first minutes matter most, and most people don't learn about a quake or what to do until it's already over.
- built: Alertify watches live seismic data from the USGS API and sends SMS alerts as soon as an earthquake is detected. An AI suggestion engine reads each quake's location and severity and returns recommended actions, so the alert says what to do, not just what happened.
- role: Member of the hackathon development team. [TBC: specific part]
- outcome: Champion, OpenIT Hackathon, November 2025.
- features: Live USGS seismic feed · Instant SMS alerts · AI-recommended actions by location and severity
- stack: [TBC]
- award: Champion — OpenIT Hackathon 2025
- hackathonId: openit-nov-2025
- liveUrl: none
- image: /images/projects/alertify.jpg (old-site `team-VF7Ucz2a.jpg`) — alt "The Alertify team at OpenIT Hackathon"

### 2. PrepTalk AI — `preptalk-ai` · featured
- category: Hackathon · year: 2025
- tagline: AI rehearsal room for interviews and pitches
- summary: A full-stack platform that helps freelancers and microentrepreneurs rehearse job interviews and business pitches.
- problem: Freelancers and small business owners rarely get a safe place to practise the interview or pitch that decides their next client.
- built: PrepTalk AI parses a user's resume and builds customizable mock interviews around it, with AI-driven feedback. It was built for scale from day one, and AI persona simulation was the next feature in development.
- role: Member of the development team.
- outcome: 2nd Runner-Up and Best in Working Prototype, FEU Create & Conquer 2025. Live demo still online.
- features: Resume parsing · Customizable mock interviews · AI feedback · Persona simulation (in development)
- stack: [TBC]
- award: 2nd Runner-Up · Best in Working Prototype — FEU Create & Conquer 2025
- hackathonId: feu-2025
- liveUrl: https://preptalkai-ruddy.vercel.app/
- image: /images/projects/preptalk-ai.jpg (old-site `FEU_Team-CKFbrcMs.jpg`)

### 3. PAMO — `pamo` · featured
- category: Academic · year: [TBC, ~2025]
- tagline: Inventory and ordering for the school's asset office
- summary: A responsive inventory system built for our school's Purchasing Asset and Management Officer.
- problem: The school's asset office tracked stock from delivery to sale by hand, and students had no easy way to see what was available.
- built: PAMO tracks every item from delivery through to sale, and gives students a storefront to browse stock and place orders or pre-orders.
- role: [TBC]
- outcome: Deployed for the school's asset office. Live at onlineedu.shop.
- features: Delivery-to-sale stock tracking · Student browsing and ordering · Pre-orders · Responsive on any device
- stack: PHP [inferred from live URL; confirm] [TBC rest]
- liveUrl: https://www.onlineedu.shop/Pages/home.php
- image: /images/projects/pamo.jpg (old-site `TeamPamo-CZBZbsyz.jpg`)

### 4. Work Hive — `work-hive` · featured
- category: Hackathon · year: 2025
- tagline: Every job application in one place
- summary: A job-tracking and job-matching web app that keeps a whole search organized in one place.
- problem: Job hunting means juggling postings and application statuses across a dozen sites, and things get lost.
- built: Work Hive gathers job postings, tracks the status of every application, and recommends roles based on the user's résumé.
- role: Member of the hackathon team.
- outcome: Built at HackerCup 2025, De La Salle University.
- features: Aggregated job postings · Application status tracking · Résumé-based recommendations
- stack: [TBC]
- hackathonId: hackercup-dlsu-2025
- image: /images/projects/work-hive.jpeg (old-site `dlsu_team-CmYzSmAl.jpeg`)

### 5. Bayanimo — `bayanimo` · featured
- category: Hackathon · year: 2025
- tagline: Gamified community projects, barangay to municipality
- summary: A gamified project-management app that gets citizens involved in local initiatives.
- problem: Community projects are scattered across barangay and municipal offices, and citizens rarely see them, let alone join in.
- built: Bayanimo puts local initiatives from the barangay level up to the municipal level in one place, and uses game-inspired progress and participation to keep people tracking and collaborating on them.
- role: Member of the hackathon team.
- outcome: Built at OpenIT Hackathon, July 2025.
- features: Barangay-to-municipal project hub · Gamified participation · Progress tracking · Collaboration
- stack: [TBC]
- hackathonId: openit-jul-2025
- image: /images/projects/bayanimo.jpg (old-site `team2-BcOwB6--.jpg`)

### 6. NailsByKheley — `nailsbykheley`
- category: Client · year: 2023
- tagline: Online storefront and booking for a nail studio
- summary: A website that gave a local nail artist an online presence and a way to take bookings.
- problem: The client relied on word of mouth and had no place online to show her work or let customers book.
- built: A site showcasing her nail products and services, with built-in appointment booking so customers can schedule a session without messaging back and forth.
- role: Part of the development team (final project).
- outcome: Best in Database Management, 2023.
- features: Product and service showcase · Integrated appointment booking
- stack: PHP, MySQL [inferred; confirm]
- award: Best in Database Management — 2023
- liveUrl: https://nailsbykheleydev.byethost11.com/public/pages/index.php?i=1
- image: /images/projects/nailsbykheley.jpg (old-site `group1-D7vxuIsb.jpg`)

### 7. STI GWA Calculator — `sti-gwa-calculator`
- category: Academic · year: [TBC]
- tagline: Grade average calculator for STI students
- summary: A small web app that calculates a student's General Weighted Average from their grades and units.
- problem: Working out a GWA by hand is slow and easy to get wrong, and students want to plan their grades ahead.
- built: A clean calculator that takes grades and units and returns the GWA instantly, so students can track performance and plan their semester.
- role: [TBC]
- outcome: Live and free to use.
- features: Grade and unit input · Instant GWA · Built for STI's grading system
- stack: [TBC]
- liveUrl: https://sti-gwa-calculator-rho.vercel.app/
- image: none → typographic cover

---

## Hackathons `/hackathons`
- title: Hackathons
- intro: Twenty-hour clocks, strangers for judges and a demo that has to work. Seven times since 2025.
- summary line (mono): 7 hackathons · 1 championship · 1 podium · 2 top-ten finishes

Timeline (newest first):

| id | date | event | placement / tier | story | project | photo |
|---|---|---|---|---|---|---|
| innolympics-2026 | 2026 | Innolympics 2026 | Top 10 (Track) / top10 | A top-ten finish in our track. | — | — |
| openit-nov-2025 | Nov 2025 | OpenIT Hackathon — November | Champion / champion | A 20-hour competition to build tech for real-world problems; this edition's theme was real-time alert systems. Our real-time earthquake alert system, Alertify, won after the final pitch to industry judges. | alertify | alertify.jpg |
| hackercup-dlsu-2025 | 2025 | HackerCup 2025 — De La Salle University | Participant / participant | We built Work Hive, a job-matching app that gathers postings, tracks applications and recommends roles from your résumé, to take the frustration out of hopping between job sites. | work-hive | work-hive.jpeg |
| inventi-2025 | Sep 2025 | Inventi Hackathon | Participant / participant | Participated. | — | — |
| hack-the-flood-2025 | 2025 | UP Diliman — Hack The Flood | Top 10 / top10 | A top-ten finish at UP Diliman's flood-response hackathon. | — | — |
| openit-jul-2025 | Jul 2025 | OpenIT Hackathon — July | Participant / participant | We built Bayanimo, a gamified project-management app that brings barangay and municipal initiatives into one place and gets citizens involved. | bayanimo | bayanimo.jpg |
| feu-2025 | Jun 2025 | FEU Create & Conquer 2025 | 2nd Runner-Up · Best in Working Prototype · Finalist / podium | We built PrepTalk AI, a platform that helps freelancers and microentrepreneurs rehearse interviews and pitches with resume parsing, custom mock interviews and AI feedback. It placed third and won Best in Working Prototype. | preptalk-ai | preptalk-ai.jpg |

---

## About `/about`
- title: About
- summary: Junior Software Engineer and Computer Science graduate working across full-stack web development, responsive UI, backend APIs and software delivery. I build with modern JavaScript frameworks, Laravel, databases and cloud deployment, and work with engineering teams on AI-integrated applications. Recognized for leadership, academic excellence and competitive hackathon results.
- meta (mono): Mauban, Quezon · BSCS 2026 · Open to collaborations
- button: Download CV ↗

### Experience (experience.ts)
1. **Junior Software Engineer** — Kodecraft Technologies OPC · Tayabas, Quezon · Hybrid · May 2026 – Present
   - Turn product requirements and interface designs into working frontend features.
   - Work on AI-assisted workflows, agent collaboration and research into app-wide AI integration, including the Vercel AI SDK for SelfView.
   - Support software quality through testing, debugging and verification of shipped features.
   - Collaborate through an Agentic Development Driven SDLC, technical discussions, design implementation and engineering documentation in Git-based workflows.
2. **Full Stack Developer** — Protocode Digital Solutions Inc. · Remote · Apr 2026 – Present
   - Develop internal business applications with Ionic, Angular and Laravel for company workflows and operations.
   - Build and maintain full-stack features across web and mobile interfaces, backend services and database integrations.
   - Collaborate on application design, integration, testing and deployment of internal systems.
3. **Software Development Intern** — Mega Cellular Network Inc. · Onsite · Jan – Apr 2026
   - Built responsive Angular and Tailwind CSS pages for the MegaPay website, including service, promotional and FAQ experiences.
   - Worked through tickets, validations, code reviews, API testing, sprints and cross-functional feedback in an Agile team.

### Skills (skills.ts)
- Frontend: HTML, CSS, JavaScript, TypeScript, React, Angular, Next.js, Vite, Tailwind CSS, Vue.js
- Backend & data: PHP, Laravel, Node.js, MySQL, MongoDB, PostgreSQL, SQLite, Prisma, SQL, REST APIs
- Testing & delivery: Playwright, Postman, Manual / functional / regression testing, Git, GitHub, GitLab, Agentic Development Driven, Jira, Slack, Mattermost
- Design & deployment: Figma, Wireframing, Prototyping, Design systems, Responsive UI, Vercel, Namecheap cPanel, Docker
- AI-assisted engineering: Claude Code, OpenCode, Orca, MCP, Agentic QA, Multi-agent workflows, Reusable agent instructions
- Other: Python, Java, C++, WordPress, Notion

### Recognition (recognition.ts)
Academic:
- Service Awardee — STI College Lucena, Class of 2026
- Excellence in CS Thesis — STI College Lucena, 2026

Events:
- Thesis Symposium 2025 — December 2025 — Thesis award. Our team's system was one of the projects selected for presentation at STI College Lucena's Thesis Symposium, where we presented its goals and technical implementation to students and faculty. (photo: old-site `TeamPamo-CZBZbsyz.jpg`)
- ICT Code Camp, Java Workshop — October 2025 — Mentor. Selected as a mentor to teach Java fundamentals to lower-year ICT students: led hands-on coding sessions and built the learning materials. (photo: old-site `image2-uT6fPnAh.jpg`)
- Final Project Website — 2023 — Best in Database Management for NailsByKheley. (links to project)

### Education
- Bachelor of Science in Computer Science — STI College Lucena · 2022 – July 2026
- Senior High School (STEM) — Dr. Maria D. Pastrana National High School · 2022

### Certificates (certificates.ts) — old-site asset → new path
| title | date | source file |
|---|---|---|
| Thesis Symposium Participation | Dec 2025 | ThesisCerti-Dd5ale7L.jpg |
| OpenIT Hackathon November — Champion | Nov 2025 | 1st place - Nicko Balmes-CK7OSIcT.jpg |
| ICT Code Camp Mentorship | Oct 2025 | ICTCodeCampCerti-DJtFpBo2.jpg |
| Inventi Hackathon Participation | Sep 2025 | Inventi Certi-CLJCyROC.png |
| HackerCup 2025 — DLSU | 2025 | Pawgrammers 411-D0aCle3p.jpg |
| OpenIT Hackathon July Participation | Jul 2025 | openITcerti-doFFpGMh.jpg |
| FEU Create & Conquer — Finalist | Jun 2025 | PrepTalkAI_Finalist-C7H3XQNC.jpg |
| FEU Create & Conquer — 2nd Runner-Up | Jun 2025 | PrepTalkAI_2ndPlace-BUgZ64s3.jpg |
| FEU Create & Conquer — Best in Working Prototype | Jun 2025 | PrepTalkAI_BestPrototype-BLmxx0Mx.jpg |
| NailsByKheley — Best in Database Management | Sep 2023 | NailsByKheleyCerti-DYDTxPBG.jpg |
| Java Fundamentals | Jun 2023 | JavaCerti-CYZUEims.jpg |

All source files at `https://balmesnicko.vercel.app/assets/<file>`. Photo → event mapping was inferred from DOM order on the old site; builder views each image to confirm before wiring.

### Interests
Full-stack application engineering · AI-enhanced software development · Agent orchestration · Software architecture · Developer tooling · UI/UX engineering

---

## 404
- headline: This page didn't ship.
- body: The link is broken or the page moved.
- button: Back home ↗
