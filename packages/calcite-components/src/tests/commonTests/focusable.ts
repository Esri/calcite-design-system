// @ts-strict-ignore
import {} from "../utils/puppeteer";
import { expect, it } from "vitest";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup } from "./interfaces";

export interface FocusableOptions {
  /**
   * use this to pass an ID to setFocus()
   *
   * @deprecated components should no longer use a focusId parameter for setFocus()
   */
  focusId?: string;

  /** selector used to assert the focused DOM element */
  focusTargetSelector?: string;

  /** selector used to assert the focused shadow DOM element */
  shadowFocusTargetSelector?: string;
}

/**
 * Helper for asserting that a component is focusable
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("is focusable", () => {
 *    focusable(`calcite-input-number`, { shadowFocusTargetSelector: "input" })
 * });
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param componentTestSetup
 * @param {FocusableOptions} [options] - additional options for asserting focus
 */
export function focusable(componentTestSetup: ComponentTestSetup, options?: FocusableOptions): void {
  it("is focusable", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);
    const focusTargetSelector = options?.focusTargetSelector || tag;
    await element.callMethod("setFocus", options?.focusId); // assumes element is FocusableElement

    if (options?.shadowFocusTargetSelector) {
      expect(
        await page.$eval(
          tag,
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement?.matches(selector),
          options?.shadowFocusTargetSelector,
        ),
      ).toBe(true);
    }

    // wait for next frame before checking focus
    await page.waitForChanges();

    expect(await page.evaluate((selector) => document.activeElement?.matches(selector), focusTargetSelector)).toBe(
      true,
    );
  });
}
