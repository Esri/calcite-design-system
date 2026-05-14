import { mount } from "@arcgis/lumina-compiler/testing";
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { isCalciteFocusable } from "../../../utils/dom";

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
 */
export function focusable(setup: () => ReturnType<typeof mount>, options?: FocusableOptions): void {
  beforeEach(() => {
    vi.doMock("focus-trap");
  });

  afterEach(() => {
    vi.doUnmock("focus-trap");
    vi.restoreAllMocks();
  });

  it("is focusable", async () => {
    const { el } = await setup();

    if (!isCalciteFocusable(el)) {
      // eslint-disable-next-line vitest/no-conditional-expect -- we want to fail the test if the component is not focusable
      expect.fail("Element does not implement `setFocus` method from CalciteFocusable interface.");
    }

    // FIXME: avoid this delay needed for flow
    await new Promise((resolve) => setTimeout(resolve, 10));
    await el.setFocus(); // assumes element is FocusableElement

    const focusTargetSelector = options?.focusTargetSelector || el.tagName;

    if (options?.shadowFocusTargetSelector) {
      // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test helper config
      expect(el.shadowRoot.activeElement?.matches(options.shadowFocusTargetSelector)).toBe(true);
    }

    expect(document.activeElement?.matches(focusTargetSelector)).toBe(true);

    // we use a fake to assert that the focus options are passed correctly to the target element
    const fakeFocusOptions = { __id__: "fake-focus-options" } as const;
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

    const receivedFocusOptions: FocusOptions[] = [];
    const originalFocus = HTMLElement.prototype.focus;
    vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(function (
      this: HTMLElement,
      options?: FocusOptions,
    ): void {
      if (options) {
        receivedFocusOptions.push(options);
      }

      originalFocus.call(this, options);
    });

    await el.setFocus(fakeFocusOptions as FocusOptions);

    const testScopeFocusOptions = receivedFocusOptions.filter(
      (focusOptions) => (focusOptions as typeof fakeFocusOptions)?.__id__ === "fake-focus-options",
    );

    expect(testScopeFocusOptions).toContainEqual(fakeFocusOptions);
    expect(testScopeFocusOptions.length).toBe(1);
  });
}
