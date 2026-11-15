import { expect, test } from "@playwright/test";

test("stack shows both columns and agents row", async ({ page }) => {
  await page.goto("/");
  for (const t of ["Front of the stack", "Back of the stack", "Agents in the loop", "Claude Code"]) {
    await expect(page.getByText(t, { exact: true }).first()).toBeAttached();
  }
  await expect(page.getByRole("link", { name: /See the full toolset/ })).toHaveAttribute("href", "/about#skills");
});

test("carousel tabs switch slides via keyboard", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist").getByRole("tab");
  await expect(tabs).toHaveCount(4);
  await tabs.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "2nd Runner-Up." })).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});

test("carousel pauses on hover", async ({ page }) => {
  await page.goto("/");
  const panel = page.locator("#wins-panel");
  await panel.scrollIntoViewIfNeeded();
  const before = await panel.getByRole("heading").textContent();
  await panel.hover();
  await page.waitForTimeout(8000);
  await expect(panel.getByRole("heading")).toHaveText(before ?? "");
});

test("stats count to final values", async ({ page }) => {
  await page.goto("/");
  const stats = page.locator("#stats");
  await stats.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  for (const v of ["7", "3", "11", "2026"]) {
    await expect(stats.getByText(v, { exact: true })).toBeVisible();
  }
});
