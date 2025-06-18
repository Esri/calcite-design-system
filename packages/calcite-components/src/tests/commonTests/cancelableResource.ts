import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { mockConsole } from "../../tests/utils/logging";

/**
 * Helper for testing cancelable behavior in components (debounced or throttled).
 *
 * @example
 * describe("cancelable behavior", () => {
 *   cancelableBehavior("<calcite-action-bar>", "resize"");
 *   cancelableBehavior("<calcite-color-picker>", "drawColorControls");
 * });
 *
 * @param {string} componentTag - The tag name of the component to test.
 * @param {string} cancelableMethod - The name of the debounced or throttled method to test.
 */
export function cancelableBehavior(componentTag: string, cancelableMethod: string): void {
  describe(`${cancelableMethod} behavior`, () => {
    mockConsole("warn");

    it(`should cancel pending ${cancelableMethod} on disconnect`, async () => {
      const componentElement = componentTag.replace(/<|>/g, "");

      const { component, el } = await mount<`${componentTag}`>(componentElement);

      const cancelSpy = vi.spyOn(component[cancelableMethod], "cancel");
      const methodSpy = vi.spyOn(component, cancelableMethod);

      el.remove();

      expect(cancelSpy.mock.calls.length).toBe(1);
      expect(methodSpy.mock.calls.length).toBe(0);
    });
  });
}
