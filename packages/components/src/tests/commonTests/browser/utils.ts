import { locators } from "@vitest/browser/context";

locators.extend({
  locator(selector: string): string {
    return selector;
  },
});

declare module "@vitest/browser/context" {
  interface LocatorSelectors {
    /**
     * Selects an element using a standard CSS selector.
     *
     * Note: prefer using more specific locators when possible for better test reliability.
     */
    locator: (selector: string) => Locator;
  }
}

export function shadowQuery(el: HTMLElement, selector: string): HTMLElement {
  return el.shadowRoot!.querySelector(selector)!;
}
