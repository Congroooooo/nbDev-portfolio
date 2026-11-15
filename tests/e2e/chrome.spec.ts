import { expect, test } from "@playwright/test";

test("nav links navigate", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("banner").getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator("h1")).toHaveText(/Work/);
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu opens, Esc closes, focus returns", async ({ page }) => {
    await page.goto("/work");
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    for (const name of ["Home", "Work", "Hackathons", "About"]) {
      await expect(dialog.getByRole("link", { name })).toBeVisible();
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(menu).toBeFocused();
  });

  test("footer email is mailto and fits at 390px", async ({ page }) => {
    await page.goto("/work");
    const email = page.locator('a[href="mailto:nckoblms@gmail.com"]').first();
    await email.scrollIntoViewIfNeeded();
    const box = await email.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(390);
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(sw).toBeLessThanOrEqual(390);
  });
});

test("live clock has no hydration error", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/about");
  await expect(page.getByText(/Mauban, PH · \d{2}:\d{2} GMT\+8/).first()).toBeVisible();
  expect(errors.filter((e) => /hydrat/i.test(e))).toEqual([]);
});

test("404 copy", async ({ page }) => {
  await page.goto("/work/nope");
  await expect(page.getByText("This page didn't ship.")).toBeVisible();
  await expect(page.getByRole("link", { name: /Back home/ })).toBeVisible();
});

test("footer columns: Explore / Connect / Contact", async ({ page }) => {
  await page.goto("/work");
  const footer = page.locator("footer#contact");
  for (const label of ["Explore", "Connect", "Contact"]) {
    await expect(footer.getByText(label, { exact: true })).toBeVisible();
  }
  await expect(footer.locator('a[href="mailto:nckoblms@gmail.com"]')).toHaveCount(2);
  await expect(footer.getByText("Mauban, Quezon · GMT+8", { exact: true })).toBeVisible();
  await expect(footer.getByRole("link", { name: /Download CV/ })).toHaveAttribute("href", "/Nicko_Balmes_Resume.pdf");
});
