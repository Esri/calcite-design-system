import { camelCase } from "change-case";
import type { PascalCase } from "type-fest";

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
 * Waits for a specific event to be emitted from the given event target.
 *
 * @example
 *
 * const event = waitForEvent(myElement, "myEvent");
 * // trigger event
 * await event;
 */
export function waitForEvent(el: EventTarget, eventName: string): Promise<void> {
  return new Promise<void>((resolve) => {
    el.addEventListener(eventName, () => resolve(), { once: true });
  });
}
