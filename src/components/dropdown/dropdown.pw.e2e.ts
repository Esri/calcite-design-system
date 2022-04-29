// my-component.e2e.ts
import { expect } from "@playwright/test";

import { test, matchers } from "stencil-playwright";

expect.extend(matchers);

test.describe("calcite-dropdown", async () => {
  test("renders", async ({ page }) => {
    await page.goto("/src/components/dropdown/test/basic.html");

    const element = page.locator("calcite-dropdown");
    expect(element).toBeDefined();
    expect(await element.getAttribute("calcite-hydrated")).toBe("");
  });
});
