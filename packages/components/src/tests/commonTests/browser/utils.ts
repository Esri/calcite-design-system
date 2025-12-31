import { type Locator, locators } from "vitest/browser";

locators.extend({
  getBySelector(selector: string): string {
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
    getBySelector: (selector: string) => Locator;
  }
}
