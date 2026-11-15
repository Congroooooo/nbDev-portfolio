import { expect, test } from "@playwright/test";

test("hackathons timeline", async ({ page }) => {
  await page.goto("/hackathons");
  await expect(page.locator("h1")).toHaveText("Hackathons");
  const entries = page.locator("ol > li");
  await expect(entries).toHaveCount(7);
  await expect(entries.first()).toContainText("Innolympics");
  await expect(entries.last()).toContainText("FEU");
  const openit = page.locator("#openit-nov-2025");
  await expect(openit).toContainText("Champion");
  await expect(openit.locator('a[href="/work/alertify"]')).toBeVisible();
  await expect(page.getByText("7 hackathons · 1 championship · 1 podium · 2 top-ten finishes")).toBeVisible();
});

test("about sections", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("h1")).toHaveText("About");
  const roles = page.locator("#experience h3");
  await expect(roles).toHaveCount(3);
  await expect(roles.nth(0)).toContainText("Kodecraft");
  await expect(roles.nth(1)).toContainText("Protocode");
  await expect(roles.nth(2)).toContainText("Mega Cellular");
  await expect(page.locator("#skills")).toContainText("Laravel");
  const cv = page.locator("#main").getByRole("link", { name: /Download CV/ });
  await expect(cv).toHaveAttribute("href", "/Nicko_Balmes_Resume.pdf");
  await expect(cv).toHaveAttribute("download", "");
});

test("certificate lightbox keyboard", async ({ page }) => {
  await page.goto("/about");
  const buttons = page.locator("#certificates button");
  await expect(buttons).toHaveCount(11);
  await buttons.first().focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByTestId("lightbox-title")).toHaveText("OpenIT Hackathon November — Champion");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(buttons.first()).toBeFocused();
});
