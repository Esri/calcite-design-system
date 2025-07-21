// @ts-strict-ignore
import { expect, it } from "vitest";
import { GlobalTestProps } from "../utils/puppeteer";
import { getTagAndPage } from "./utils";
import { ComponentTestSetup } from "./interfaces";

export interface FocusableOptions {
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
 *
 * @param componentTestSetup
 * @param {FocusableOptions} [options] - additional options for asserting focus
 */
export function focusable(componentTestSetup: ComponentTestSetup, options?: FocusableOptions): void {
  it("is focusable", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);
    const focusTargetSelector = options?.focusTargetSelector || tag;
    await element.callMethod("setFocus"); // assumes element is FocusableElement
    await page.waitForChanges();

    if (options?.shadowFocusTargetSelector) {
      expect(
        await page.$eval(
          tag,
          (element: HTMLElement, selector: string) => element.shadowRoot.activeElement?.matches(selector),
          options?.shadowFocusTargetSelector,
        ),
      ).toBe(true);
    }

    expect(await page.evaluate((selector) => document.activeElement?.matches(selector), focusTargetSelector)).toBe(
      true,
    );

    // we use a fake to assert that the focus options are passed correctly to the target element
    const fakeFocusOptions = { __id__: "fake-focus-options" } as FocusOptions;

    type TestWindow = GlobalTestProps<{
      receivedFocusOptions: FocusOptions[];
    }>;

    await page.evaluate(() => {
      const activeElement = document.activeElement;

      if (activeElement) {
        let elementToBlur: Element | null = activeElement;
        while (elementToBlur) {
          if (elementToBlur.shadowRoot && elementToBlur.shadowRoot.activeElement) {
            elementToBlur = elementToBlur.shadowRoot.activeElement;
          } else {
            (elementToBlur as HTMLElement).blur?.();
            break;
          }
        }
      }

      const originalFocus = HTMLElement.prototype.focus;
      HTMLElement.prototype.focus = function (this: HTMLElement, options?: FocusOptions) {
        const testWindow = window as TestWindow;
        testWindow.receivedFocusOptions = testWindow.receivedFocusOptions
          ? [...testWindow.receivedFocusOptions, options]
          : [options];
        originalFocus.call(this, options);
      };
    });
    await page.waitForChanges();

    await element.callMethod("setFocus", fakeFocusOptions);
    await page.waitForChanges();

    const receivedFocusOptions = await page.evaluate(() => {
      const testWindow = window as TestWindow;
      return testWindow.receivedFocusOptions;
    });

    expect(receivedFocusOptions).toContainEqual(fakeFocusOptions);
    expect(receivedFocusOptions.length).toBe(1);
  });
}
