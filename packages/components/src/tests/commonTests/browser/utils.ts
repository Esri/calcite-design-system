import { camelCase } from "change-case";
import { PascalCase } from "type-fest";
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

type CalciteEventNamePrefix = `calcite${PascalCase<string>}`;

/**
 * Generates the event name prefix for a component based on its tag name.
 */
export function getEventPrefix(el: HTMLElement): CalciteEventNamePrefix {
  if (!el.tagName.startsWith("CALCITE-")) {
    throw new Error("Element is not a Calcite component.");
  }

  return `${camelCase(el.tagName)}` as CalciteEventNamePrefix;
}

/**
 * Waits for a specific event to be emitted from the given element.
 *
 * @example
 *
 * const event = waitForEvent(myElement, "myEvent");
 * // trigger event
 * await event;
 */
export function waitForEvent(el: HTMLElement, eventName: string): Promise<void> {
  return new Promise<void>((resolve) => {
    el.addEventListener(eventName, () => resolve(), { once: true });
  });
}

export function shadowQuery(el: HTMLElement, selector: string): HTMLElement {
  return el.shadowRoot!.querySelector(selector)!;
}
