# nbDev Portfolio — Design

Date: 2026-11-16 · Owner: Nicko Balmes · Status: draft for approval

Companion file: `2026-11-16-nbdev-portfolio-content.md` (all page copy and structured data).

---

## 1. Intent

A new personal portfolio for Nicko Balmes, Junior Software Engineer (BSCS 2026, STI College Lucena). Purpose: **personal online presence** — one home base that represents him as a whole, not a sales page aimed at one audience. It replaces the old site (`balmesnicko.vercel.app`, Vite/React SPA).

- **Content source of truth:** resume `Nicko_Balmes_Resume_Refined.pdf` + the old site (projects, hackathon/event stories, certificates, team photos). Where they conflict, the owner's answer wins (see §11).
- **Design/motion reference:** `dennypratama.com`. We adopt its *design language* (ink/bone alternating sections, single hot accent, oversized grotesk display type, Lenis smooth scroll, pinned WebGL scroll story, hover-reveal work list, auto-advancing quote carousel, count-up stats, huge-email footer). We do **not** copy its logo, 3D mark, copy text, or site-specific concepts (the "dp" monogram, "the slash", 23.6° angle, blueprint-vs-live scrubber).

## 2. Goals / non-goals / anti-goals

**Goals**
1. Hero states identity in one glance: engineer who prototypes fast (hackathons) and ships to production (3 roles).
2. Signature moment: a 3D `<nbDev/>` mark that evolves wireframe → solid across a pinned four-frame scroll story with an hours counter.
3. Hackathons are a first-class section, not a footnote.
4. Every project and hackathon from the old site survives, rewritten tighter and outcome-first, with no invented facts.
5. Feels as smooth and premium as the reference on desktop; stays fast and readable on mobile.
6. Static, server-rendered HTML for every route so SEO can be added later without restructuring.

**Non-goals (v1)**
- SEO metadata, OG images, sitemap, structured data (explicitly deferred by owner — do after build).
- AI chatbot (old "NixAI") — dropped for now.
- Blog, CMS, contact form, analytics, i18n, light/dark toggle.
- Portrait photo of Nicko.
- "View Code" buttons (owner: hide them; repos are private/placeholder).
- Testimonials (none exist; replaced by hackathon wins carousel).

**Anti-goals (failure even if it "works")**
- Reads as a reskin/clone of dennypratama.com (same copy rhythm word-for-word, same mark, same accent color).
- Any invented metric, feature, award, or date.
- Janky scroll / dropped frames on a mid-range phone; WebGL that blocks first paint.
- Text illegible against the 3D mark (blend modes must keep contrast).
- Phone number displayed on the site.

## 3. Constraints

- Owner's resume email is public contact: `nckoblms@gmail.com`. Phone number never rendered in HTML.
- Location: Mauban, Quezon, Philippines · timezone `Asia/Manila` (GMT+8).
- Deploy target: Vercel (owner already uses it). Old site domain `balmesnicko.vercel.app`; new project gets a new Vercel project — domain decision deferred to deploy time.
- Assets limited to what exists on the old site (team photos, certificate images). No project screenshots.
- `prefers-reduced-motion` must be honored everywhere.

## 4. Approaches considered

| | Approach | Trade-off | Verdict |
|---|---|---|---|
| **A** | **Next.js 16 App Router + React Three Fiber + GSAP/Lenis** | Heaviest JS; mitigated by lazy 3D + static fallback. Matches reference's real stack; Next/React are on resume so site doubles as skill proof; static HTML per route. | **Chosen by owner** |
| B | Astro + React island for 3D | Least JS, best default SEO; persistent canvas across page transitions and GSAP-pinned story are fiddlier; Astro not on resume. | Rejected |
| C | Vite React SPA (like old site) | Familiar; weak SEO without prerender, no per-route HTML. Works against deploy goal. | Rejected |

## 5. Tech stack (decided)

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 + CSS custom properties for tokens (`@theme`) |
| Smooth scroll | `lenis` (synced to GSAP ticker) |
| Scroll animation | `gsap` + `ScrollTrigger` (+ `SplitText` for word/line reveals — free since GSAP 3.13) |
| Page transitions / UI motion | `motion` (Framer Motion successor) for route transitions, menu overlay, hover states |
| 3D | `three`, `@react-three/fiber` v9, `@react-three/drei` (only what's needed) |
| Fonts | `next/font/google`: **Geist** (display + body) and **Geist Mono** (labels, counters, code marks) |
| Images | `next/image`, local files in `public/images` |
| Content | Typed TS modules in `src/content/` (no CMS, no MDX) |
| Lint/format | ESLint (next config) + Prettier |
| Testing | Playwright smoke tests (every route renders, nav works, reduced-motion path renders) |
| Package manager | pnpm |
| Hosting | Vercel, all routes statically generated (`generateStaticParams` for `/work/[slug]`) |
| Node | 24 LTS |

Rationale for Geist over the reference's Archivo: distinct identity, and the mono cut fits the `<nbDev/>` code brand.

## 6. Visual system

### Color tokens

```
--ink:    #0b0c0c   /* dark section bg */
--ink-2:  #141615   /* raised dark surface */
--ink-3:  #1d201f
--bone:   #ecebe6   /* light section bg */
--bone-2: #d2d0c9
--mute:   #8a8c88   /* secondary text on both */
--line:   rgb(236 235 230 / 0.14)   /* hairlines on ink */
--line-l: rgb(11 12 12 / 0.14)      /* hairlines on bone */
--accent: #2ee6a6   /* electric teal-green: counters, progress bars, active states on ink */
--accent-ink: #0a8f63 /* accent on bone (AA contrast for text ≥ 24px; use for bars/marks) */
```

Accent is used sparingly: hours counter, carousel progress bars, active nav dot, quote glyph, focus rings. Never for body text.

### Type scale (desktop → mobile via `clamp`)

| Token | Desktop | Use |
|---|---|---|
| giga | 192/160 | footer email, contact headline |
| mega | 160/136 | stats numbers |
| d1 | 112/104 | hero lines |
| d2 | 96/88 | carousel headline |
| d3 | 80/72 | section titles, work list names |
| h1 | 64/64 | page titles |
| h2 | 48/52 | |
| h3 | 32/36 | |
| lead | 20/28 | intros |
| body | 16/24 | |
| label | 14/20 Geist Mono | section indexes "01 · idea", meta lines |
| sm | 12/16 | |

Display type: tight tracking (`-0.04em`), weight 400. Mobile floor for d1 ≈ 56px.

### Layout tokens
`--wrap: 1680px; --pad: 48px (mobile 20px); --gut: 24px; --sec: 160px (mobile 96px); --nav-h: 80px`. Radii: 4/8/16/999. Easing: `--e-out: cubic-bezier(.16,1,.3,1)`, `--e-io: cubic-bezier(.83,0,.17,1)`.

### Section rhythm (home)
ink (hero + story) → bone (selected work) → ink (stack) → bone (wins carousel + stats) → ink (contact/footer).

## 7. Pages & behaviour

Global chrome on every page:
- **Nav** (fixed, `mix-blend-mode: difference` so it reads on ink and bone): `<nbDev/>` wordmark left → `/`; center links Work · Hackathons · About; right pill button "Get in touch ↗" → scrolls to/links `#contact`. Mobile: wordmark + "Menu" → full-screen overlay (ink) with numbered links (Home 01, Work 02, Hackathons 03, About 04), socials, location + live clock, "Get in touch".
- **Footer/contact** (ink): giant headline, giant mailto email, 3 columns (Explore / Connect / Contact), CV download, copyright, "Back to top". Subtle radial accent glow at bottom.
- **Live clock**: "Mauban, PH · HH:MM GMT+8", `Intl.DateTimeFormat` with `Asia/Manila`, updates each minute, client-only (render placeholder on server to avoid hydration mismatch).
- **Route transitions**: ink curtain wipe (motion), ~600ms, `--e-io`. Lenis resets to top on route change.
- **Reveal primitives**: headings reveal per word with blur(8px)→0 + y 20→0 + opacity; paragraphs fade-up; hairlines draw left→right (scaleX). Triggered once at 80% viewport.

### 7.1 Home `/`

1. **Hero** (ink, 100svh). Top row: label "Junior Software Engineer" left, live clock right. Display line 1 top-left, line 2 bottom-right; 3D mark centered behind/between, with soft accent-tinted point light glow. Bottom-left: lead paragraph + mono meta line. Bottom-right: large bone pill CTA "Get in touch ↗". Hero mark is **solid** (bone material, lit). Idle state: slow auto-rotate (≈0.1 rad/s) + pointer parallax (±8°). It is the **same object** as the story mark (see §8: one continuous scene).
2. **Scroll story "The build"** (ink, pinned, 4 frames, ~400vh scroll length). Canvas pinned full-viewport; each frame = index label ("01 · idea"), display sentence bottom-left, "The build · frame n of 4" top-right, centered counter in accent ("00h"/"20h"/"v1"/"∞"; numeric tween only 00h→20h, then text swaps with blur crossfade) with caption. Mark morph per frame:
   - f1 idea: wireframe edges only, faint grid floor.
   - f2 prototype: wireframe + partially filled faces (opacity ramp), camera dolly-in.
   - f3 shipped: solid bone-white material, camera passes close through the slash.
   - f4 production: solid, lit, rotated to rest pose with accent rim light.
   Story text uses `mix-blend-mode: difference` over the bright solid. Counter tweens numerically between frames.
3. **Selected work** (bone). Header: H2 left, intro right. List of 5 rows (index, huge name, right column: category · short line · "Open the project ↗"). Hover a row → other names dim to `--bone-2`, a cursor-following preview card (team photo, 16:10, rounded 8) fades/scales in, tilted slightly by velocity. Click → `/work/[slug]`. Footer row: "Seven projects on the work page" + "See all work ↗".
4. **Stack** (ink). Two columns split by a vertical hairline: "Front of the stack" (f.1–f.5) and "Back of the stack" (b.1–b.5), items in d-size text, revealed staggered. Beneath: one full-width row "Agents in the loop" with mono chips (Claude Code · OpenCode · Orca · MCP · agentic QA). Link "See the full toolset ↗" → `/about#skills`.
5. **Wins carousel** (bone). Accent quote glyph, huge headline left (e.g. "Champion."), right: paragraph with read-progress word highlighting (words go from `--bone-2` to ink as progress advances), divider, avatar-circle with event initials + event name + meta. Bottom: 4 tabs with progress bars (accent-ink), auto-advance every 7s, pause on hover/focus, click to jump. Crossfade + blur between slides.
6. **Stats** (bone). Four full-width rows separated by hairlines, alternating number left / right; numbers count up on enter (mega size, ghosted `--bone-2` → ink fill as it counts).
7. **Contact** (ink) — global footer.

### 7.2 Work index `/work`
Ink hero: page title + intro. Then the same hover-preview list as home but all 7 projects, plus a filter row of mono pills: All · Hackathon · Client · Academic (client-side filter, animated layout). Ends with contact footer.

### 7.3 Project page `/work/[slug]`
- Hero (ink): breadcrumb "Work / {name}", name in d1, one-line summary, meta grid (Year · Context · Role · Stack · Award), buttons: "Live demo ↗" only if `liveUrl` exists. No "View code".
- Cover: team photo full-width, rounded 16, parallax 10%. GWA Calculator has no photo → generated typographic cover (ink panel, project name in giga Geist Mono, accent underline).
- Body (bone): sections "The problem", "What we built", "My part", "Outcome" — from content file. Feature bullets as numbered rows.
- If tied to a hackathon: a callout linking to `/hackathons#{eventSlug}`.
- Next-project footer: big "Next — {name} →" row linking to next slug (wraps).

### 7.4 Hackathons `/hackathons`
- Hero (ink): title + intro + mono summary ("7 hackathons · 1 championship · 1 podium · 2 top-10s").
- Timeline (ink → bone): vertical list newest → oldest. Each entry: date (mono), event name (d3), placement badge (accent for Champion/podium, outline for Top 10, muted for Participant), story paragraph, team photo if available (hover zoom), link to project page if one exists. Entries have `id` anchors.
- Certificates strip at bottom linking to `/about#certificates`.

### 7.5 About `/about`
- Hero (ink): title, summary paragraph from content, mono meta, CV download button (`/Nicko_Balmes_Resume.pdf`).
- **Experience** (bone): timeline rows — role, company, mode/location, dates, bullets.
- **Skills** (`#skills`, ink): grouped grid (Frontend, Backend & data, Testing & delivery, Design & deployment, AI-assisted engineering, Other) as mono chips.
- **Recognition** (bone): academic awards + other events (Thesis Symposium, ICT Code Camp mentor, NailsByKheley award).
- **Education** (bone): BSCS + SHS.
- **Certificates** (`#certificates`, ink): grid of 11 certificate images, click → lightbox (motion, Esc/arrow keys, focus-trapped).
- **Interests**: single mono line.

## 8. The `<nbDev/>` 3D mark — spec

- Geometry: build a 2D SVG path of the glyphs `<`, `/`, `>` (the brand core; "nbDev" text stays 2D in the nav wordmark). Draw them as bold geometric strokes converted to filled outlines (constructed in code or an SVG authored once in `src/components/three/mark-path.ts`). Extrude with `THREE.ExtrudeGeometry` (depth ≈ 0.35 of glyph height, small bevel). Center and group: `<` left, `/` center slightly forward in z, `>` right.
- Materials: `wire` = `LineSegments` from `EdgesGeometry` + inner grid lines (bone, opacity 0.6); `solid` = `MeshStandardMaterial` bone `#ecebe6`, roughness 0.5. Uniform `uProgress` (0–1 across story) controls wire opacity, solid opacity, camera position, rotation — all from a single GSAP ScrollTrigger timeline scrubbed to the story section.
- Lighting: ambient low + one point light near the slash (accent-tinted bloom-ish sprite, no postprocessing package needed — additive sprite).
- **One continuous scene (owner decision A):** a single `<Canvas>` fixed full-viewport behind the hero *and* the pinned story (home only). Scroll timeline phases:
  - `hero` (scroll 0 → end of hero): solid mark, idle rotation + parallax active.
  - `dissolve` (hero exit → frame 1): solid fades out, wireframe fades in — the mark "breaks down" to the idea.
  - frames 1→4: wireframe → partial fill → solid → lit solid, as above.
  - after story: canvas fades out and stops rendering (`frameloop="demand"`, no invalidation) as the bone "Selected work" section scrolls over it.
  Control ownership: the GSAP-scrubbed timeline owns `uProgress`, camera and base rotation; idle rotation + pointer parallax are an additive offset whose weight lerps 1 → 0 across `dissolve`, so the two never fight.
- `dpr={[1, 1.75]}`.
- Loading: canvas component imported with `next/dynamic` (`ssr: false`); until ready, render a static **solid-style** SVG of the mark in the hero position (this is the LCP-safe first paint and the permanent fallback). Crossfade SVG → canvas on first rendered frame.
- Fallbacks: `prefers-reduced-motion` → static SVG mark, story frames become stacked non-pinned sections with fade-ins only. No WebGL support → same static path. Mobile (<768px): 3D kept but `dpr` 1, no pointer parallax, simpler pin (shorter scroll length ~250vh).

## 9. System architecture

```
nbDev-portfolio/
├─ public/
│  ├─ images/projects/   alertify.jpg, preptalk-ai.jpg, pamo.jpg, work-hive.jpeg, bayanimo.jpg, nailsbykheley.jpg
│  ├─ images/events/     ict-code-camp.jpg (+ reuse project photos)
│  ├─ images/certs/      11 certificate images
│  └─ Nicko_Balmes_Resume.pdf
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          fonts, <SmoothScroll>, <Nav>, <PageTransition>, <Footer>
│  │  ├─ globals.css         Tailwind v4 @import + @theme tokens + base styles
│  │  ├─ page.tsx            Home
│  │  ├─ work/page.tsx
│  │  ├─ work/[slug]/page.tsx   generateStaticParams from content; notFound() for unknown
│  │  ├─ hackathons/page.tsx
│  │  ├─ about/page.tsx
│  │  └─ not-found.tsx       on-brand 404
│  ├─ components/
│  │  ├─ layout/   Nav, MenuOverlay, Footer, PageTransition, SmoothScroll, LiveClock
│  │  ├─ motion/   RevealText, FadeUp, DrawLine, CountUp, useReducedMotion
│  │  ├─ three/    MarkCanvas (dynamic), MarkScene, mark-path.ts, MarkFallback (SVG)
│  │  ├─ home/     Hero, BuildStory, SelectedWork, StackColumns, WinsCarousel, Stats
│  │  ├─ work/     WorkList (hover preview), WorkFilter, ProjectHero, ProjectBody, NextProject, TypeCover
│  │  ├─ hackathons/ Timeline, PlacementBadge
│  │  ├─ about/    ExperienceList, SkillsGrid, Recognition, CertificatesGrid, Lightbox
│  │  └─ ui/       PillButton, ArrowLink, Chip, SectionLabel
│  ├─ content/
│  │  ├─ types.ts        Project, Hackathon, Experience, Certificate, SkillGroup, Award, Site
│  │  ├─ site.ts         name, role, email, socials, location, tz, cv path
│  │  ├─ projects.ts
│  │  ├─ hackathons.ts
│  │  ├─ experience.ts
│  │  ├─ skills.ts
│  │  ├─ recognition.ts  awards + non-hackathon events
│  │  ├─ certificates.ts
│  │  └─ home.ts         hero copy, story frames, stack columns, wins, stats
│  └─ lib/   gsap.ts (register plugins once, client-only), cn.ts
├─ tests/smoke.spec.ts
└─ docs/superpowers/specs/
```

Rendering model: all pages are Server Components that read `src/content`; interactive pieces are small `"use client"` leaves (SmoothScroll, Nav state, MarkCanvas, BuildStory, WorkList, WinsCarousel, CountUp, Lightbox, LiveClock). No API routes, no runtime data, no env vars. Output is fully static.

Scroll plumbing: `SmoothScroll` creates one Lenis instance, drives it from `gsap.ticker`, calls `ScrollTrigger.update` on Lenis scroll, exposes it via context; destroyed/recreated cleanly on route change; disabled under reduced motion (native scroll).

Content types (sketch):
```ts
type Project = {
  slug: string; name: string; year: string;
  category: 'Hackathon' | 'Client' | 'Academic';
  tagline: string;            // one line for lists
  summary: string;            // hero line
  problem: string; built: string; role: string; outcome: string;
  features: string[];
  stack: string[];
  award?: string;
  hackathonId?: string;
  liveUrl?: string;
  image?: { src: string; alt: string };
  featured: boolean;          // shows on home (5 of 7)
};
type Hackathon = {
  id: string; name: string; date: string; sortKey: string;
  placement: string; tier: 'champion' | 'podium' | 'top10' | 'participant';
  story: string; projectSlug?: string; image?: { src: string; alt: string };
};
```

## 10. Accessibility & performance budgets

- WCAG AA contrast for all text; blend-mode text verified over both the bright solid and the dark background.
- All motion behind `useReducedMotion`; carousel pausable; lightbox focus-trapped, Esc closes.
- Semantic landmarks, one `h1` per page, visible focus rings (accent), skip-to-content link.
- Targets (Vercel/Lighthouse mobile): LCP < 2.5s, CLS < 0.05, 3D chunk lazy and excluded from initial JS of non-home pages.
- Images: `next/image` with explicit sizes; team photos converted to WebP/AVIF by Next.

## 11. Decisions log (owner)

- Purpose: personal online presence.
- Centrepiece: option 1 — 3D `<nbDev/>` mark with four-frame story (idea → 20h prototype → shipped → production) and hours counter.
- FEU Create & Conquer 2025: **2nd Runner-Up + Best Working Prototype** (resume's "1st Place" is wrong; do not use).
- Structure: Home + `/work` + `/work/[slug]` + `/hackathons` + `/about`.
- Project content: existing descriptions + team photos, enhanced copy allowed (no invented facts).
- SEO: later, after build.
- Code buttons: hidden. Chatbot: dropped. Portrait: none.
- Stack: approach A.
- Hero ↔ story: one continuous 3D object (solid in hero → dissolves to wireframe → rebuilds to solid by frame 4).
- Optional gaps (per-project stack/role, PAMO/GWA years, Innolympics/Hack The Flood/thesis details): skipped — omitted from the site.

## 12. Builder's calls (made by Claude — owner may override)

- Accent `#2ee6a6` / `#0a8f63`; fonts Geist + Geist Mono.
- Hero lines "I prototype it." / "I ship it."; footer headline "Something worth shipping?".
- Innolympics 2026 and Hack The Flood 2025 appear with placement + year only (no project details provided).
- Thesis award listed under Recognition without naming the thesis project. (Old-site photo for Thesis Symposium is named `TeamPamo`, suggesting PAMO — not asserted until owner confirms.)
- Featured on home (5): Alertify, PrepTalk AI, PAMO, Work Hive, Bayanimo. Work page adds NailsByKheley, STI GWA Calculator.
- CV download uses the refined resume PDF (owner's own document; it contains phone number — owner already published a CV on the old site).
- Socials: GitHub, LinkedIn, Facebook, Instagram (from old site).
- HackerCup DLSU date shown as "2025" only (sources disagree: Aug vs Sep).
- Story counter "00h → 20h → v1 → ∞" (no invented 48h metric); certificates stat sub-label "Since 2023" (not "Verified").
- Hackathon count "7": OpenIT Nov 2025, HackerCup DLSU 2025, Inventi 2025, OpenIT Jul 2025, FEU Create & Conquer 2025, UP Diliman Hack The Flood 2025, Innolympics 2026.

## 13. Left to the builder

Exact SVG construction of the mark glyphs, camera paths per frame, animation durations within the given easing system, component internals, responsive breakpoints beyond the stated ones, image crops, and test details — within the constraints above.

## 14. Done when

- `pnpm build` passes with zero type/lint errors; all 5 route types statically generated.
- Playwright smoke: every route returns 200 and renders its `h1`; nav links navigate; reduced-motion emulation renders fallback mark and unpinned story; unknown slug → 404.
- Manual pass at 1440px and 390px: no horizontal scroll, story pins/unpins correctly, carousel auto-advances and pauses, lightbox works with keyboard.
- No phone number in built HTML (grep check).
