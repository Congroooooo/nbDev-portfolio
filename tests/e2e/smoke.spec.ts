import { expect, test } from "@playwright/test";

const routes = ["/work", "/work/alertify", "/hackathons", "/about"];

for (const route of routes) {
  test(`${route} renders with one h1`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("/ renders with one h1", async ({ page }) => {
  const res = await page.goto("/");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("unknown slug shows 404 copy", async ({ page }) => {
  await page.goto("/work/nope");
  await expect(page.getByText("This page didn't ship.")).toBeVisible();
});
