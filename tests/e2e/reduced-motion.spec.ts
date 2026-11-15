import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/work", "/work/alertify", "/hackathons", "/about"];

/** Effective opacity: product of computed opacity over the element and its ancestors. */
const effectiveOpacity = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => {
    let o = 1;
    for (let n: Element | null = el; n; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
    return o;
  });

test.describe("reduced motion", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  for (const route of routes) {
    test(`${route}: visible content, no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(route);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(300);

      expect(await effectiveOpacity(page, "#main h1")).toBe(1);
      const firstText = "#main section:first-of-type :is(p, h2, h3, li, dd)";
      await expect(page.locator(firstText).first()).toBeVisible();
      expect(await effectiveOpacity(page, firstText)).toBe(1);

      // Nothing readable in main is stuck at opacity 0 (the SSR'd motion initial state).
      const hidden = await page.locator("#main").evaluate((main) =>
        Array.from(main.querySelectorAll<HTMLElement>("*"))
          .filter((el) => !el.closest("[aria-hidden='true']") && el.textContent?.trim())
          .filter((el) => getComputedStyle(el).opacity === "0")
          .map((el) => el.outerHTML.slice(0, 120)),
      );
      expect(hidden).toEqual([]);

      expect(errors).toEqual([]);
    });
  }
});
