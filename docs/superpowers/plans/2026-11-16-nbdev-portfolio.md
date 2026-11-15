# nbDev Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Nicko Balmes' statically generated portfolio (Home, /work, /work/[slug], /hackathons, /about, 404) with a continuous 3D `<nbDev/>` scroll story, per the approved design.

**Architecture:** Next.js 16 App Router; Server Components read typed content from `src/content`; small client leaves handle motion (Lenis + GSAP ScrollTrigger + Motion) and one R3F canvas on Home. Task 1 lays the foundation and **stub files for every component with final props**, so Wave 2 tasks run in parallel, each replacing only its own files.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind v4, lenis, gsap (+ScrollTrigger, SplitText), motion, three, @react-three/fiber v9, @react-three/drei, Vitest, Playwright, pnpm, Node 24.

**Spec:** `docs/superpowers/specs/2026-11-16-nbdev-portfolio-design.md` + `docs/superpowers/specs/2026-11-16-nbdev-portfolio-content.md` (read both; content file is the source of all copy).

## Global Constraints

- Copy comes verbatim from the content spec. Never invent facts, metrics, dates; omit every `[TBC]` / "inferred; confirm" value.
- FEU Create & Conquer 2025 = "2nd Runner-Up · Best in Working Prototype". Never "1st Place".
- Phone number (`963 490 2175`) never appears in any rendered HTML or content file.
- No "View code" buttons anywhere. Only "Live demo ↗" when `liveUrl` exists.
- Tokens (exact): `--ink #0b0c0c`, `--ink-2 #141615`, `--ink-3 #1d201f`, `--bone #ecebe6`, `--bone-2 #d2d0c9`, `--mute #8a8c88`, `--accent #2ee6a6`, `--accent-ink #0a8f63`, `--e-out cubic-bezier(.16,1,.3,1)`, `--e-io cubic-bezier(.83,0,.17,1)`.
- Fonts: Geist (display/body), Geist Mono (labels/counters) via `next/font/google`.
- Every animation respects `prefers-reduced-motion` (use `useReducedMotion` from `@/components/motion`).
- Timezone `Asia/Manila`, display "Mauban, PH · HH:MM GMT+8".
- All routes static; no env vars, no API routes.
- Wave-2 workers: edit only files listed in your task. Do not run `pnpm build`/`pnpm dev`, do not commit, do not add dependencies. Verify with `pnpm typecheck` and `pnpm lint` (and `pnpm test:unit` where listed). The coordinator builds, runs e2e, and commits.

## Review Focus

1. **Reduced motion / no WebGL:** home must show the static SVG mark (`data-testid="mark-fallback"`) and all four story sentences, unpinned and readable. → test in Task 3.
2. **390px viewport:** no horizontal scroll on any route; giant footer email and display type must fit-scale. → test in Task 2 (footer) and Task 7 (all routes).
3. **Route changes with Lenis/ScrollTrigger:** home → /work → home must not leave stale pins or a frozen scroll. → test in Task 7.
4. **Hydration of the live clock:** server HTML renders a placeholder; no hydration error in console. → test in Task 2.
5. **Keyboard:** menu overlay, carousel tabs, lightbox open/close with keyboard; Esc closes overlays. → tests in Tasks 2, 5, 6.

---

## File map

```
src/app/layout.tsx, globals.css, page.tsx, not-found.tsx              T1 (layout/globals/page), T2 (not-found)
src/app/work/page.tsx, src/app/work/[slug]/page.tsx                    T4
src/app/hackathons/page.tsx, src/app/about/page.tsx                    T6
src/content/*.ts                                                       T1 (content worker)
src/lib/gsap.ts, cn.ts, time.ts                                        T1
src/components/motion/*                                                T1
src/components/ui/*                                                    T1
src/components/layout/SmoothScroll.tsx                                 T1
src/components/layout/{Nav,MenuOverlay,Footer,PageTransition,LiveClock}.tsx   T2
src/components/three/*, src/components/home/{HomeScene,Hero,BuildStory}.tsx   T3
src/components/work/*, src/components/home/SelectedWork.tsx           T4
src/components/home/{StackColumns,WinsCarousel,Stats}.tsx              T5
src/components/hackathons/*, src/components/about/*                    T6
tests/unit/*, tests/e2e/*                                              per task as listed
public/images/**, public/Nicko_Balmes_Resume.pdf                       T1
```

---

## Wave 1 (serial foundation)

### Task 1: Scaffold, tokens, content, primitives, stubs

**Files:**
- Create: project scaffold (create-next-app), `src/app/{layout.tsx,globals.css,page.tsx}`, `src/lib/{gsap.ts,cn.ts,time.ts}`, `src/content/{types.ts,site.ts,projects.ts,hackathons.ts,experience.ts,skills.ts,recognition.ts,certificates.ts,home.ts,index.ts}`, `src/components/motion/{index.ts,RevealText.tsx,FadeUp.tsx,DrawLine.tsx,CountUp.tsx}`, `src/components/ui/{PillButton.tsx,ArrowLink.tsx,Chip.tsx,SectionLabel.tsx,Section.tsx,index.ts}`, `src/components/layout/SmoothScroll.tsx`, stub files for every T2–T6 component, `vitest.config.ts`, `playwright.config.ts`, `tests/unit/content.test.ts`, `tests/unit/time.test.ts`, `tests/e2e/smoke.spec.ts`, `public/images/**`, `public/Nicko_Balmes_Resume.pdf`
- Scripts in package.json: `typecheck` (`tsc --noEmit`), `lint`, `test:unit` (`vitest run`), `test:e2e` (`playwright test`).

**Interfaces (Produces — every later task relies on these exact names):**

```ts
// src/content/types.ts
export type Img = { src: string; alt: string };
export type Project = {
  slug: string; name: string; year?: string;
  category: 'Hackathon' | 'Client' | 'Academic';
  tagline: string; summary: string;
  problem: string; built: string; role?: string; outcome: string;
  features: string[]; stack?: string[];
  award?: string; hackathonId?: string; liveUrl?: string;
  image?: Img; featured: boolean;
};
export type HackathonTier = 'champion' | 'podium' | 'top10' | 'participant';
export type Hackathon = { id: string; name: string; date: string; sortKey: string;
  placement: string; tier: HackathonTier; story: string; projectSlug?: string; image?: Img };
export type Experience = { role: string; company: string; location: string; dates: string; bullets: string[] };
export type SkillGroup = { title: string; items: string[] };
export type Award = { title: string; detail: string };
export type EventItem = { title: string; date: string; badge: string; body: string; image?: Img; projectSlug?: string };
export type Certificate = { title: string; date: string; image: Img };
export type Social = { label: string; href: string };
export type StoryFrame = { index: string; sentence: string; counter: string; caption: string };
export type Win = { headline: string; body: string; initials: string; event: string; meta: string; hackathonId: string };
export type Stat = { value: number; label: string; sub: string; format?: 'plain' | 'year' };
// src/content/index.ts re-exports:
export { site } from './site';            // { name, brand, role, email, location, locationShort, timezone, cv, socials: Social[], footerLine }
export { projects, getProject, featuredProjects } from './projects'; // getProject(slug): Project | undefined; featuredProjects(): Project[]
export { hackathons } from './hackathons'; // sorted newest first by sortKey
export { experience } from './experience';
export { skillGroups } from './skills';
export { awards, events } from './recognition';
export { certificates } from './certificates';
export { hero, storyFrames, selectedWork, stack, wins, stats, contact, workPage, hackathonsPage, aboutPage, notFound } from './home';
```

```ts
// src/lib/time.ts
export function formatClock(d: Date, tz = 'Asia/Manila'): string; // 24h "HH:MM"
// src/lib/gsap.ts  ('use client' consumers only)
export { gsap, ScrollTrigger, SplitText }; // plugins registered once, guarded by typeof window
// src/lib/cn.ts
export function cn(...c: (string | false | null | undefined)[]): string;
// src/components/motion/index.ts
export function useReducedMotion(): boolean;           // re-export of motion/react's hook (null → false)
export function RevealText(p: { as?: 'h1'|'h2'|'h3'|'p'|'span'; children: string; className?: string; delay?: number }): JSX.Element; // per-word blur(8px)+y20+opacity reveal at 80% viewport, once
export function FadeUp(p: { children: React.ReactNode; className?: string; delay?: number }): JSX.Element;
export function DrawLine(p: { className?: string; tone?: 'ink' | 'bone' }): JSX.Element; // hairline scaleX 0→1
export function CountUp(p: { to: number; from?: number; className?: string; duration?: number }): JSX.Element;
// src/components/ui/index.ts
export function PillButton(p: { href: string; children: React.ReactNode; tone?: 'bone'|'ink'|'outline'; size?: 'md'|'lg'; external?: boolean; download?: boolean }): JSX.Element; // trailing ↗
export function ArrowLink(p: { href: string; children: React.ReactNode; className?: string; external?: boolean; arrow?: '↗'|'→'|'↑' }): JSX.Element; // underline draws on hover
export function Chip(p: { children: React.ReactNode; className?: string }): JSX.Element; // Geist Mono pill
export function SectionLabel(p: { children: React.ReactNode; className?: string }): JSX.Element; // mono 14/20
export function Section(p: { tone: 'ink'|'bone'; id?: string; className?: string; children: React.ReactNode }): JSX.Element; // <section data-tone> with bg/fg + wrap/pad
// src/components/layout/SmoothScroll.tsx
export function SmoothScroll(p: { children: React.ReactNode }): JSX.Element; // Lenis on gsap.ticker, ScrollTrigger.update on scroll; native scroll under reduced motion
export function useLenis(): import('lenis').default | null;
```

Component stubs created in Task 1 (each returns a `<div data-stub="Name" />` and has its final props signature; owners replace bodies):

```ts
// layout (T2): Nav(), MenuOverlay({ open: boolean; onClose: () => void }), Footer(), PageTransition({ children }), LiveClock({ className?: string })
// home (T3): HomeScene()  — renders Hero + BuildStory over the fixed canvas
// home (T4): SelectedWork()
// home (T5): StackColumns(), WinsCarousel(), Stats()
// work (T4): WorkList({ projects: Project[]; tone: 'ink'|'bone' }), WorkFilter(), ProjectHero({ project }), ProjectBody({ project }), NextProject({ project }), TypeCover({ name })
// hackathons (T6): Timeline({ items: Hackathon[] }), PlacementBadge({ tier, children })
// about (T6): ExperienceList(), SkillsGrid(), Recognition(), CertificatesGrid(), Lightbox({ images: Img[]; index: number | null; onClose: () => void; onIndex: (i: number) => void })
```

`src/app/layout.tsx`: html/body with font variables, skip link `<a href="#main">Skip to content</a>`, `<SmoothScroll><Nav/><PageTransition><main id="main">{children}</main></PageTransition><Footer/></SmoothScroll>`.
`src/app/page.tsx`: `<HomeScene/><SelectedWork/><StackColumns/><WinsCarousel/><Stats/>` and a visually hidden `<h1>` is NOT added here — Hero owns the page h1.
Stub pages for `/work`, `/work/[slug]` (with `generateStaticParams` + `notFound()`), `/hackathons`, `/about` each render an `<h1>` with the page title so smoke tests pass before Wave 2.

- [ ] **Step 1:** Scaffold: `pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --turbopack --import-alias "@/*" --use-pnpm --yes`; `git init`; add deps `lenis gsap motion three @react-three/fiber @react-three/drei`, dev deps `@types/three vitest @playwright/test prettier`; `pnpm exec playwright install chromium`.
- [ ] **Step 2:** Download assets from `https://balmesnicko.vercel.app/assets/<file>` into `public/images/projects`, `public/images/events`, `public/images/certs` using the mapping in the content spec (certs keep slugified names, e.g. `openit-nov-2025.jpg`); view each team photo to confirm the event mapping; copy resume to `public/Nicko_Balmes_Resume.pdf`.
- [ ] **Step 3: Write failing unit tests**

```ts
// tests/unit/content.test.ts
test('project slugs unique', ...)                       // new Set(slugs).size === projects.length
test('exactly 5 featured: alertify, preptalk-ai, pamo, work-hive, bayanimo', ...)
test('7 projects, 7 hackathons, 11 certificates, 3 experience entries', ...)
test('hackathonId / projectSlug cross-references resolve', ...)
test('FEU is podium and says 2nd Runner-Up, never 1st Place', ...) // JSON.stringify(all content) !~ /1st Place/
test('no [TBC], "inferred", or phone digits in content', ...)      // !~ /\[TBC\]|inferred|963 ?490|09634902175/
test('every image src exists under public/', ...)                  // fs.existsSync(path.join('public', src))
test('hackathons sorted newest first by sortKey', ...)
test('no project has a code/repo URL field', ...)                   // Object.keys never includes 'codeUrl'|'repo'
// tests/unit/time.test.ts
test('formatClock renders Manila time', () => expect(formatClock(new Date('2026-11-16T06:05:00Z'))).toBe('14:05'));
```

- [ ] **Step 4:** Run `pnpm test:unit` → FAIL (modules missing).
- [ ] **Step 5:** Write `src/content/*` from the content spec, `src/lib/*`, tokens in `globals.css` (`@theme` with colors, fonts, type scale as `clamp()` per spec §6, radii, easings; `body` ink bg), motion + ui primitives, SmoothScroll, all stubs, layout, stub pages.
- [ ] **Step 6:** Run `pnpm test:unit` → PASS; `pnpm typecheck && pnpm lint` → clean.
- [ ] **Step 7: Smoke e2e** — `tests/e2e/smoke.spec.ts`: for `/`, `/work`, `/work/alertify`, `/hackathons`, `/about`: status 200 and exactly one `h1` (home h1 arrives in T3; mark home as `test.fixme` until T3). `/work/nope` shows text "This page didn't ship." (fixme until T2). `playwright.config.ts` uses `webServer: pnpm build && pnpm start`, port 3100.
- [ ] **Step 8:** `pnpm build` → success; `pnpm test:e2e` → pass (fixmes skipped).
- [ ] **Step 9:** Commit `chore: scaffold nbDev portfolio foundation`.

---

## Wave 2 (parallel — Tasks 2–6 run concurrently; disjoint files)

### Task 2: Global chrome — Nav, MenuOverlay, Footer, LiveClock, PageTransition, 404

**Files:** `src/components/layout/{Nav,MenuOverlay,Footer,PageTransition,LiveClock}.tsx`, `src/app/not-found.tsx`, `tests/e2e/chrome.spec.ts`
**Interfaces:** Consumes `site`, `contact`, `notFound` from `@/content`; `formatClock`; ui primitives; `useLenis`. Produces the stubbed signatures above.

- [ ] **Step 1: Write failing e2e tests** (`tests/e2e/chrome.spec.ts`):
  - `nav links navigate`: click "Work" → URL `/work`, h1 "Work".
  - `mobile menu opens, Esc closes, focus returns` at 390×844: click "Menu" → dialog role visible with links "Home","Work","Hackathons","About"; press Escape → dialog hidden, focus on Menu button.
  - `footer email is mailto and fits at 390px`: `a[href="mailto:nckoblms@gmail.com"]` boundingBox.width ≤ 390 and `document.documentElement.scrollWidth <= 390`.
  - `live clock has no hydration error`: collect console errors on `/`, expect none matching /hydrat/i; clock text matches `/Mauban, PH · \d{2}:\d{2} GMT\+8/` after load.
  - `404 copy`: `/work/nope` shows "This page didn't ship." and link "Back home".
- [ ] **Step 2:** Implement per spec §7 global chrome: Nav fixed, `mix-blend-mode: difference`, wordmark `<nbDev/>` in Geist Mono → `/`, center links Work · Hackathons · About, right `PillButton tone="outline"` "Get in touch" → `#contact`; below 768px wordmark + "Menu" button. MenuOverlay: motion clip-path reveal, `role="dialog" aria-modal`, numbered links (Home 01…About 04), socials, LiveClock, "Get in touch"; focus trap; Esc closes; body scroll locked (`lenis.stop()`). Footer `id="contact"`: label, giant headline, giant email auto-fit (font-size via `clamp()` + `vw` sized so `nckoblms@gmail.com` fits container at all widths), 3 columns, CV `download`, footer line, "Back to top ↑" (`lenis.scrollTo(0)`), radial accent glow. LiveClock: renders `Mauban, PH · --:-- GMT+8` on server, updates on mount and every 60s. PageTransition: motion `AnimatePresence` keyed on pathname, ink curtain wipe 600ms `--e-io`; on route change `lenis.scrollTo(0, { immediate: true })` and `ScrollTrigger.refresh()`. not-found: copy from content.
- [ ] **Step 3:** `pnpm typecheck && pnpm lint` → clean. (Coordinator runs e2e.)

### Task 3: 3D mark + Hero + BuildStory (continuous scene)

**Files:** `src/components/three/{mark-path.ts,MarkScene.tsx,MarkCanvas.tsx,MarkFallback.tsx}`, `src/components/home/{HomeScene,Hero,BuildStory}.tsx`, `tests/e2e/home-scene.spec.ts`, `tests/unit/mark-path.test.ts`
**Interfaces:** Consumes `hero`, `storyFrames`, `site` from content; `gsap`, `ScrollTrigger`; `useReducedMotion`; `LiveClock` (T2 stub signature), `PillButton`, `RevealText`. Produces `HomeScene()`. Internal: `markShapes(): THREE.Shape[]` (glyphs `<`, `/`, `>` as filled outlines, centered, unit height 1); `MarkFallback({ variant: 'solid' | 'wire'; className? })` SVG built from the same point data (export `MARK_POINTS` from mark-path.ts so SVG and 3D share geometry).

- [ ] **Step 1: Write failing tests**
  - unit `markShapes returns 3 shapes, bbox height ≈ 1, centered at x≈0` (`new THREE.ShapeGeometry(shapes).computeBoundingBox()`).
  - e2e `hero renders h1 with both lines`: `h1` contains "I prototype it." and "I ship it."
  - e2e `reduced motion fallback` (`page.emulateMedia({ reducedMotion: 'reduce' })`): `[data-testid="mark-fallback"]` visible, no `canvas`, all four story sentences visible after scrolling each into view, and story section has no `position: fixed/sticky` pin (`[data-testid="build-story"]` computed height < 4.5 × viewport).
  - e2e `story pins with motion`: default motion, scroll to story start + 1.5 viewports → text "Twenty hours later" visible and `[data-testid="story-counter"]` text is "20h" after scrolling to frame 2.
- [ ] **Step 2:** Implement per spec §7.1 (items 1–2) and §8: `HomeScene` = wrapper with fixed full-viewport canvas layer (`MarkCanvas` via `next/dynamic` ssr:false, `MarkFallback variant="solid"` shown until first frame, then crossfade), `Hero` (100svh, page `h1` containing both lines as block spans; label, LiveClock, lead, mono meta, CTA), `BuildStory` (`data-testid="build-story"`, pinned ~400vh desktop / ~250vh <768px, four frames, `data-testid="story-counter"` with 00h→20h numeric tween then text swap "v1", "∞", frame tag "The build · frame n of 4", text `mix-blend-mode: difference`). One GSAP timeline scrubbed from hero start to story end drives `uProgress` (phases hero → dissolve → f1..f4 → fade-out), camera, base rotation; idle rotation + pointer parallax as additive offset with weight lerped 1→0 across dissolve. Canvas `dpr={[1,1.75]}` (1 on <768px), `frameloop="demand"` with `invalidate()` from ticker only while section in view; canvas opacity 0 and stopped after story. Reduced motion or no WebGL (`!document.createElement('canvas').getContext('webgl2')`): no canvas, fallback SVG in hero, story frames stacked unpinned with FadeUp, counters static. Kill all ScrollTriggers on unmount (`gsap.context().revert()`).
- [ ] **Step 3:** `pnpm typecheck && pnpm lint && pnpm test:unit` → clean.

### Task 4: Work — list with hover preview, /work, /work/[slug], SelectedWork

**Files:** `src/components/work/{WorkList,WorkFilter,ProjectHero,ProjectBody,NextProject,TypeCover}.tsx`, `src/components/home/SelectedWork.tsx`, `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`, `tests/e2e/work.spec.ts`
**Interfaces:** Consumes `projects`, `getProject`, `featuredProjects`, `selectedWork`, `workPage` from content; ui + motion primitives. Produces the stubbed signatures. `WorkFilter` is a client component that owns filter state and renders `WorkList` with the filtered projects (`/work` page renders `<WorkFilter/>`).

- [ ] **Step 1: Write failing e2e tests** (`tests/e2e/work.spec.ts`):
  - `home selected work lists 5 featured in order`: names Alertify, PrepTalk AI, PAMO, Work Hive, Bayanimo; link "See all work" → `/work`.
  - `work index lists 7 and filters`: 7 rows; click "Client" → only "NailsByKheley"; click "All" → 7.
  - `project page meta & links`: `/work/preptalk-ai` h1 "PrepTalk AI", text "2nd Runner-Up", link "Live demo" href `https://preptalkai-ruddy.vercel.app/`; no element with text /view code/i anywhere.
  - `project without liveUrl has no Live demo`: `/work/alertify` has no "Live demo".
  - `GWA uses typographic cover`: `/work/sti-gwa-calculator` has `[data-testid="type-cover"]`, no `img` in cover.
  - `next project wraps`: last project page (`/work/sti-gwa-calculator`) next link → `/work/alertify`.
  - `hackathon callout`: `/work/alertify` link to `/hackathons#openit-nov-2025`.
- [ ] **Step 2:** Implement per spec §7.1 item 3, §7.2, §7.3. WorkList rows: index (01…), huge name (d3), right column `category · tagline` + "Open the project ↗"; whole row is a `Link`. Hover (pointer: fine only): siblings dim to `--bone-2`/mute, cursor-following preview card (team photo or TypeCover, 16:10, radius 8) with motion spring + velocity tilt; touch devices: no preview. Project page: `generateStaticParams` from `projects`, `notFound()` for unknown; ProjectHero meta grid shows only present fields (Year, Context=category, Role, Stack, Award); cover image `next/image` priority with 10% parallax (off under reduced motion); ProjectBody sections "The problem", "What we built", "My part" (only if role), "Outcome", numbered features; hackathon callout; NextProject wraps to first.
- [ ] **Step 3:** `pnpm typecheck && pnpm lint` → clean.

### Task 5: Home lower sections — StackColumns, WinsCarousel, Stats

**Files:** `src/components/home/{StackColumns,WinsCarousel,Stats}.tsx`, `tests/e2e/home-sections.spec.ts`
**Interfaces:** Consumes `stack`, `wins`, `stats` from content; `Section`, `Chip`, `ArrowLink`, `RevealText`, `CountUp`, `DrawLine`, `useReducedMotion`.

- [ ] **Step 1: Write failing e2e tests**:
  - `stack shows both columns and agents row`: texts "Front of the stack", "Back of the stack", "Agents in the loop", "Claude Code"; link "See the full toolset" → `/about#skills`.
  - `carousel tabs switch slides via keyboard`: tablist with 4 tabs; focus tab 2 + Enter → headline "2nd Runner-Up." visible; ArrowRight moves to tab 3.
  - `carousel pauses on hover`: hover carousel, wait 8s → headline unchanged.
  - `stats count to final values`: scroll into view, wait → texts "7", "3", "11", "2026".
- [ ] **Step 2:** Implement per spec §7.1 items 4–6. Carousel: `role="tablist"` tabs with progress bars (accent-ink, 7s auto-advance, paused on hover/focus or reduced motion), blur crossfade, body words colored by progress from `--bone-2` → ink, badge circle with initials, event + meta. Stats: four rows, alternating alignment, `CountUp` (2026 counts from 2022), ghost → ink fill.
- [ ] **Step 3:** `pnpm typecheck && pnpm lint` → clean.

### Task 6: /hackathons and /about (incl. lightbox)

**Files:** `src/components/hackathons/{Timeline,PlacementBadge}.tsx`, `src/components/about/{ExperienceList,SkillsGrid,Recognition,CertificatesGrid,Lightbox}.tsx`, `src/app/hackathons/page.tsx`, `src/app/about/page.tsx`, `tests/e2e/pages.spec.ts`
**Interfaces:** Consumes `hackathons`, `hackathonsPage`, `experience`, `skillGroups`, `awards`, `events`, `certificates`, `aboutPage`, `site` from content; primitives.

- [ ] **Step 1: Write failing e2e tests**:
  - `hackathons timeline`: h1 "Hackathons"; 7 entries in order Innolympics first, FEU last; `#openit-nov-2025` contains "Champion" and link to `/work/alertify`; summary "7 hackathons · 1 championship · 1 podium · 2 top-ten finishes".
  - `about sections`: h1 "About"; 3 experience roles in order Kodecraft, Protocode, Mega Cellular; `#skills` contains "Laravel"; "Download CV" link href `/Nicko_Balmes_Resume.pdf` with `download`.
  - `certificate lightbox keyboard`: 11 cert buttons in `#certificates`; Enter on first → dialog with image; ArrowRight → second title; Escape → closed, focus back on first button.
- [ ] **Step 2:** Implement per spec §7.4, §7.5. PlacementBadge styles: champion/podium = accent fill (ink text), top10 = outline, participant = muted. Timeline entries `id={h.id}`, photo hover zoom, link to project when present; certificates strip → `/about#certificates`. Lightbox: motion, `role="dialog" aria-modal`, focus trap, Esc/←/→, `next/image` contain.
- [ ] **Step 3:** `pnpm typecheck && pnpm lint` → clean.

---

## Wave 3 (serial integration)

### Task 7: Integrate, verify, polish

**Files:** any (coordinator), `tests/e2e/smoke.spec.ts`, `tests/e2e/integration.spec.ts`

- [ ] **Step 1:** Remove `fixme`s from smoke tests. Add `integration.spec.ts`:
  - `no horizontal scroll at 390px on every route` (`scrollWidth <= 390`).
  - `route round-trip keeps scroll working`: `/` → click Work → click wordmark → wheel down 2000px → `window.scrollY > 1000` and story counter present.
  - `no phone number in any page HTML`: for each route, `content()` !~ /963 ?490/.
  - `no console errors` on each route.
- [ ] **Step 2:** `pnpm build` → success, all routes `○ (Static)`/`● (SSG)`.
- [ ] **Step 3:** `pnpm test:unit && pnpm test:e2e` → all pass; fix failures (systematic-debugging).
- [ ] **Step 4:** Visual pass with screenshots at 1440×900 and 390×844 for every route; compare against the spec's section rhythm; fix contrast/overflow issues.
- [ ] **Step 5:** Commit `feat: nbDev portfolio v1`.
- [ ] **Step 6:** Whole-branch review by fresh reviewer; apply fixes; re-run tests; commit.
