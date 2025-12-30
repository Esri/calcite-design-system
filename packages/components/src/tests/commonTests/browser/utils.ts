import { type Locator, locators } from "vitest/browser";

locators.extend({
  locator(selector: string): string {
    return selector;
  },
});

declare module "vitest/browser" {
  interface LocatorSelectors {
    /**
     * Selects an element using a standard CSS selector.
     *
     * Note: prefer using more specific locators when possible for better test reliability.
     */
    locator: (selector: string) => Locator;
  }
}
