import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import { ComponentTag } from "./interfaces";

/**
 * Helper for testing cancelable behavior in components (debounced or throttled).
 *
 * @example
 * describe("cancelable behavior", () => {
 *   cancelable("calcite-action-bar");
 * });
 *
 * @param {ComponentTag} componentTag - The tag name of the component to test.
 */
export function cancelable(componentTag: ComponentTag): void {
  describe(`cancelable behavior`, () => {
    mockConsole("warn");

    it(`should cancel all added cancelable methods on disconnect`, async () => {
      const { component, el } = await mount<typeof componentTag>(componentTag);

      const addSpy = vi.spyOn(component.cancelableResource, "add");

      const mockResource1 = { cancel: vi.fn() };
      const mockResource2 = { cancel: vi.fn() };

      component.cancelableResource.add([mockResource1, mockResource2]);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith([mockResource1, mockResource2]);

      const cancelSpies = [mockResource1, mockResource2].map((resource) => vi.spyOn(resource, "cancel"));

      el.remove();

      cancelSpies.forEach((cancelSpy) => {
        expect(cancelSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
}
