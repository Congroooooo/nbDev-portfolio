import { expect, test, type Page } from "@playwright/test";

const inViewport = (page: Page, sel: string) =>
  page.locator(sel).evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.top >= -2 && r.top < window.innerHeight * 0.6;
  });

test("direct load with hash lands on the hackathon entry", async ({ page }) => {
  await page.goto("/hackathons#feu-2025");
  await page.waitForLoadState("networkidle");
  await expect.poll(() => inViewport(page, "#feu-2025"), { timeout: 5000 }).toBe(true);
  await page.waitForTimeout(800);
  expect(await inViewport(page, "#feu-2025")).toBe(true);
});

test("direct load /about#certificates lands on certificates", async ({ page }) => {
  await page.goto("/about#certificates");
  await page.waitForLoadState("networkidle");
  await expect.poll(() => inViewport(page, "#certificates"), { timeout: 5000 }).toBe(true);
  await page.waitForTimeout(800);
  expect(await inViewport(page, "#certificates")).toBe(true);
});

test("project hackathon callout navigates to the entry", async ({ page }) => {
  await page.goto("/work/preptalk-ai");
  await page.waitForLoadState("networkidle");
  const link = page.locator('a[href="/hackathons#feu-2025"]');
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/hackathons#feu-2025$/);
  await expect.poll(() => inViewport(page, "#feu-2025"), { timeout: 5000 }).toBe(true);
  await page.waitForTimeout(800);
  expect(await inViewport(page, "#feu-2025")).toBe(true);
});

test("plain route change still starts at the top", async ({ page }) => {
  await page.goto("/about");
  await page.waitForLoadState("networkidle");
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  await page.getByRole("banner").getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test("lightbox locks Lenis scroll", async ({ page }) => {
  await page.goto("/about");
  await page.waitForLoadState("networkidle");
  const first = page.locator("#certificates button").first();
  await first.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await first.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.move(700, 450);
  for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -500);
  await page.waitForTimeout(1200);
  const after = await page.evaluate(() => window.scrollY);
  expect(Math.abs(after - before)).toBeLessThanOrEqual(5);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

test.describe("menu across md", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("widening past 768px closes the menu and releases scroll", async ({ page }) => {
    await page.goto("/about");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
    await page.mouse.move(500, 400);
    await page.mouse.wheel(0, 1200);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  });
});
