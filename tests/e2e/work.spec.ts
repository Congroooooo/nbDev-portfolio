import { expect, test } from "@playwright/test";

test("home selected work lists 5 featured in order", async ({ page }) => {
  await page.goto("/");
  const rows = page.locator("#work [data-testid=work-row]");
  await expect(rows).toHaveCount(5);
  const names = ["Alertify", "PrepTalk AI", "PAMO", "Work Hive", "Bayanimo"];
  for (let i = 0; i < names.length; i++) await expect(rows.nth(i)).toContainText(names[i]);
  await expect(page.getByRole("link", { name: "See all work" })).toHaveAttribute("href", "/work");
});

test("work index lists 7 and filters", async ({ page }) => {
  await page.goto("/work");
  const rows = page.locator("[data-testid=work-row]");
  await expect(rows).toHaveCount(7);
  await page.getByRole("button", { name: "Client" }).click();
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText("NailsByKheley");
  await page.getByRole("button", { name: "All" }).click();
  await expect(rows).toHaveCount(7);
});

test("project page meta & links", async ({ page }) => {
  await page.goto("/work/preptalk-ai");
  await expect(page.locator("h1")).toHaveText("PrepTalk AI");
  await expect(page.getByText("2nd Runner-Up").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Live demo" })).toHaveAttribute(
    "href",
    "https://preptalkai-ruddy.vercel.app/",
  );
  await expect(page.getByText(/view code/i)).toHaveCount(0);
});

test("project without liveUrl has no Live demo", async ({ page }) => {
  await page.goto("/work/alertify");
  await expect(page.getByText("Live demo")).toHaveCount(0);
});

test("GWA uses typographic cover", async ({ page }) => {
  await page.goto("/work/sti-gwa-calculator");
  const cover = page.locator('[data-testid="type-cover"]');
  await expect(cover).toHaveCount(1);
  await expect(cover.locator("img")).toHaveCount(0);
});

test("next project wraps", async ({ page }) => {
  await page.goto("/work/sti-gwa-calculator");
  await expect(page.locator('a[href="/work/alertify"]').filter({ hasText: /Next/ })).toBeVisible();
});

test("hackathon callout", async ({ page }) => {
  await page.goto("/work/alertify");
  await expect(page.locator('a[href="/hackathons#openit-nov-2025"]')).toBeVisible();
});
