import { expect, test } from "@playwright/test";

const routes = ["/", "/work", "/work/alertify", "/work/sti-gwa-calculator", "/hackathons", "/about"];

test.describe("mobile 390px", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  for (const route of routes) {
    test(`no horizontal scroll on ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sw).toBeLessThanOrEqual(390);
    });
  }
});

for (const route of routes) {
  test(`no phone number and no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(route);
    await page.waitForLoadState("networkidle");
    const html = await page.content();
    expect(html).not.toMatch(/963 ?490|09634902175/);
    expect(errors).toEqual([]);
  });
}

test("route round-trip keeps scroll working", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await page.getByRole("link", { name: "Nicko Balmes home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.mouse.move(700, 450);
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
  await expect(page.getByTestId("story-counter")).toBeAttached();
});
