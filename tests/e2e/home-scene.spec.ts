import { expect, test } from "@playwright/test";

const sentences = [
  "Every build starts as a problem worth solving.",
  "Twenty hours later, it has to work in front of judges.",
  "Then it has to work for real people, not just the demo.",
  "I stay for that part. That's where software earns its keep.",
];

test("hero renders h1 with both lines", async ({ page }) => {
  await page.goto("/");
  const h1 = page.locator("h1");
  await expect(h1).toHaveCount(1);
  await expect(h1).toContainText("I prototype it.");
  await expect(h1).toContainText("I ship it.");
});

test("reduced motion fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator('[data-testid="home-scene"]')).toHaveAttribute("data-scene-mode", "static");
  await expect(page.locator('[data-testid="mark-fallback"]').first()).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);

  const story = page.locator('[data-testid="build-story"]');
  for (const s of sentences) {
    const el = story.getByText(s, { exact: true });
    await el.scrollIntoViewIfNeeded();
    await expect(el).toBeVisible();
  }

  const { height, vh, position } = await story.evaluate((el) => ({
    height: el.getBoundingClientRect().height,
    vh: window.innerHeight,
    position: getComputedStyle(el).position,
  }));
  expect(position).not.toMatch(/fixed|sticky/);
  expect(height).toBeLessThan(4.5 * vh);
  await expect(story.locator('[data-story-panel]')).toHaveCount(0);
});

test("story pins with motion", async ({ page }) => {
  await page.goto("/");
  const scene = page.locator('[data-testid="home-scene"]');
  await expect(scene).not.toHaveAttribute("data-scene-mode", "pending");
  test.skip((await scene.getAttribute("data-scene-mode")) !== "webgl", "browser has no WebGL2; static path covered above");

  // the canvas chunk mounts and paints
  await expect(page.locator("canvas")).toHaveCount(1, { timeout: 15_000 });

  const story = page.locator('[data-testid="build-story"]');
  const { top, vh } = await story.evaluate((el) => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    vh: window.innerHeight,
  }));

  await page.evaluate((y) => window.scrollTo(0, y), top + 1.5 * vh);
  await page.waitForTimeout(400);

  // the panel is pinned to the viewport while the story scrolls
  const panelTop = await story.locator("[data-story-panel]").evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.abs(panelTop)).toBeLessThan(2);

  await expect(story.getByText("Twenty hours later", { exact: false })).toBeVisible();
  await expect(page.locator('[data-testid="story-counter"]')).toHaveText("20h");
  await expect(story.getByText("Every build starts")).toBeHidden();
});
