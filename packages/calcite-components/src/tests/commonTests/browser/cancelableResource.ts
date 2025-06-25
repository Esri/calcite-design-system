import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { mockConsole } from "../../../tests/utils/logging";
import { ComponentTag, CancelableResourceComponent } from "../interfaces";

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

    it(`should cancel all resources added by the component during connectedCallback on disconnect`, async () => {
      const { component, el } = await mount<typeof componentTag>(componentTag);

      if (!hasCancelableResourceController(component)) {
        throw new Error("Component does not have a cancelableResource");
      }

      const { resources } = component.cancelableResource;

      expect(resources.size).toBeGreaterThan(0);

      const cancelSpies = Array.from(resources).map((resource) => vi.spyOn(resource, "cancel"));

      el.remove();

      cancelSpies.forEach((cancelSpy) => {
        expect(cancelSpy).toHaveBeenCalledTimes(1);
      });

      expect(resources.size).toBe(0);
    });
  });
}

function hasCancelableResourceController(component: unknown): component is CancelableResourceComponent {
  return (
    "cancelableResource" in component &&
    typeof (component as CancelableResourceComponent).cancelableResource.add === "function" &&
    (component as CancelableResourceComponent).cancelableResource.resources instanceof Set
  );
}
