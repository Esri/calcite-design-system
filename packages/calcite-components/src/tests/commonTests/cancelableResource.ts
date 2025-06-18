import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { DEBOUNCE } from "../../utils/resources";
import { mockConsole } from "../../tests/utils/logging";

/**
 * Helper for testing debounced behavior in components.
 *
 * @example
 * describe("debounce behavior", () => {
 *   debounceBehavior("<calcite-action-bar>", "resize");
 * });
 *
 * @param {string} componentTag - The tag name of the component to test.
 * @param {string} debouncedMethod - The name of the debounced method to test.
 */
export function debounceBehavior(componentTag: string, debouncedMethod: string): void {
  describe(`debounced ${debouncedMethod} behavior`, () => {
    mockConsole("warn");

    it(`should cancel pending ${debouncedMethod} operations on disconnect`, async () => {
      const componentElement = componentTag.replace(/<|>/g, "");

      const { component, el } = await mount<componentTag>(componentElement);

      const cancelSpy = vi.spyOn(component[debouncedMethod], "cancel");
      const methodSpy = vi.spyOn(component, debouncedMethod);

      el.remove();
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE[debouncedMethod]));

      expect(cancelSpy.mock.calls.length).toBe(1);
      expect(methodSpy.mock.calls.length).toBe(0);
    });
  });
}
