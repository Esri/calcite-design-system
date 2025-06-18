import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { DEBOUNCE, THROTTLE } from "../../utils/resources";
import { mockConsole } from "../../tests/utils/logging";

/**
 * Helper for testing cancelable behavior in components (debounced or throttled).
 *
 * @example
 * describe("cancelable behavior", () => {
 *   cancelableBehavior("<calcite-action-bar>", "resize", "debounced", "resize");
 *   cancelableBehavior("<calcite-color-picker>", "drawColorControls", "throttled", "canvas");
 * });
 *
 * @param {string} componentTag - The tag name of the component to test.
 * @param {string} cancelableMethod - The name of the debounced or throttled method to test.
 * @param {"debounced" | "throttled"} type - The type of cancelable method. Defaults is "debounced".
 * @param {string} delayKey - The key in the DEBOUNCE or THROTTLE object that specifies the delay for the method.
 */
export function cancelableBehavior(
  componentTag: string,
  cancelableMethod: string,
  type: "debounced" | "throttled" = "debounced",
  delayKey: string,
): void {
  describe(`${type} ${cancelableMethod} behavior`, () => {
    mockConsole("warn");

    it(`should cancel pending ${type} ${cancelableMethod} on disconnect`, async () => {
      const componentElement = componentTag.replace(/<|>/g, "");

      const { component, el } = await mount<componentTag>(componentElement);

      const cancelSpy = vi.spyOn(component[cancelableMethod], "cancel");
      const methodSpy = vi.spyOn(component, cancelableMethod);

      el.remove();
      await new Promise((resolve) => {
        const delay = type === "debounced" ? DEBOUNCE[delayKey] : THROTTLE[delayKey];
        resolve(setTimeout(resolve, delay || 250));
      });

      expect(cancelSpy.mock.calls.length).toBe(1);
      expect(methodSpy.mock.calls.length).toBe(0);
    });
  });
}
