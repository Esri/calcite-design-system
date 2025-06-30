import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { ComponentTag } from "../interfaces";
import { UseCancelable } from "../../../controllers/useCancelable";

/**
 * Helper for testing cancelable behavior in components e.g., debounced or throttled methods.
 *
 * @example
 * describe("cancelable", () => {
 *   cancelable("calcite-action-bar");
 * });
 *
 * @param {ComponentTag} componentTag - The tag name of the component to test.
 */
export function cancelable(componentTag: ComponentTag): void {
  describe(`cancelable behavior`, () => {
    it(`should cancel all resources added by the component during connectedCallback on disconnect`, async () => {
      const { component, el } = await mount<typeof componentTag>(componentTag);

      if (!hasCancelableController(component)) {
        throw new Error("Component does not have a cancelable");
      }

      const { resources } = component.cancelable;

      expect(resources.size).toBeGreaterThan(0);

      const cancelSpies = Array.from(resources).map((resource) => vi.spyOn(resource, "cancel"));

      el.remove();

      cancelSpies.forEach((cancelSpy) => {
        expect(cancelSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
}

interface CancelableComponent {
  cancelable: UseCancelable;
}

function hasCancelableController(component: any): component is CancelableComponent {
  return (
    "cancelable" in component &&
    typeof component.cancelable?.add === "function" &&
    component.cancelable?.resources instanceof Set
  );
}
