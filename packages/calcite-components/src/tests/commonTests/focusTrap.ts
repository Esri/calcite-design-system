import { E2EPage, E2EElement } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { camelCase, pascalCase } from "change-case";
import { isElementFocused, skipAnimations } from "../utils/puppeteer";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup } from "./interfaces";

interface FocusTrapOptions {
  /**
   * The property that toggles the opening of the component.
   */
  toggleProp: string;
}

/**
 * Helper for testing focus-trapping behavior in components.
 *
 * Note: this assumes the component under test is closed and will be opened before running assertions.
 *
 * @example
 * describe("focus-trap", () => {
 *   focusTrap("calcite-modal", {
 *    toggleProp: "open"
 *   });
 * });
 *
 * @param {string} componentTestSetup
 * @param options
 */
export function focusTrap(componentTestSetup: ComponentTestSetup, options: FocusTrapOptions): void {
  describe(`initialFocus`, () => {
    let page: E2EPage;
    let tag: string;
    let element: E2EElement;

    let openEvent: ReturnType<typeof page.waitForEvent>;

    async function toggleComponent(page: E2EPage, element: E2EElement, options: FocusTrapOptions): Promise<void> {
      element.setProperty(options.toggleProp, true);
      await page.waitForChanges();
      await openEvent;
      await page.waitForChanges();
    }

    beforeEach(async () => {
      ({ tag, page } = await getTagAndPage(componentTestSetup));
      await skipAnimations(page);
      element = await page.find(tag);
      const openEventName = `${camelCase(`${tag}${pascalCase(options.toggleProp)}`)}`;
      openEvent = page.waitForEvent(openEventName);
    });

    it("does not focus when false", async () => {
      expect(await isElementFocused(page, tag)).toBe(false);

      element.setProperty("focusTrapOptions", { initialFocus: false });
      await page.waitForChanges();
      await toggleComponent(page, element, options);

      expect(await isElementFocused(page, tag)).toBe(false);
    });

    it("focuses by default", async () => {
      expect(await isElementFocused(page, tag)).toBe(false);

      await toggleComponent(page, element, options);

      expect(await isElementFocused(page, tag)).toBe(true);
    });

    it("focuses when true", async () => {
      expect(await isElementFocused(page, tag)).toBe(false);

      element.setProperty("focusTrapOptions", { initialFocus: true });
      await page.waitForChanges();
      await toggleComponent(page, element, options);

      expect(await isElementFocused(page, tag)).toBe(true);
    });

    describe("when focusTrapDisabled = true", () => {
      beforeEach(async () => {
        element.setProperty("focusTrapDisabled", true);
        await page.waitForChanges();
      });

      it("focuses when false", async () => {
        expect(await isElementFocused(page, tag)).toBe(false);

        element.setProperty("focusTrapOptions", { initialFocus: false });
        await page.waitForChanges();
        await toggleComponent(page, element, options);

        expect(await isElementFocused(page, tag)).toBe(true);
      });

      it("focuses by default", async () => {
        expect(await isElementFocused(page, tag)).toBe(false);

        await toggleComponent(page, element, options);

        expect(await isElementFocused(page, tag)).toBe(true);
      });

      it("focuses when true", async () => {
        expect(await isElementFocused(page, tag)).toBe(false);

        element.setProperty("focusTrapOptions", { initialFocus: true });
        await page.waitForChanges();
        await toggleComponent(page, element, options);

        expect(await isElementFocused(page, tag)).toBe(true);
      });
    });
  });
}
