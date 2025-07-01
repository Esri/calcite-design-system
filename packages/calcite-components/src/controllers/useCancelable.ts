import { makeGenericController } from "@arcgis/lumina/controllers";
import type { Arrayable } from "type-fest";
import { LitElement } from "@arcgis/lumina";

/**
 * Interface for the CancelableController.
 */
export interface UseCancelable {
  /**
   * Adds a cancelable resource to the controller.
   *
   * @param resource - Resource with a `cancel` method.
   */
  add: (resource: Arrayable<Cancelable>) => void;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  resources: Set<Cancelable>;
}

interface Cancelable {
  cancel: () => void;
}

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 */
export const useCancelable = <T extends LitElement>(): ReturnType<typeof makeGenericController<UseCancelable, T>> => {
  return makeGenericController<UseCancelable, T>((_, controller) => {
    const resources = new Set<Cancelable>();

    controller.onDisconnected(() => {
      resources.forEach((resource) => resource.cancel());
    });

    return {
      add: (resourceOrResources) => {
        [resourceOrResources].flat().forEach((resource) => resources.add(resource));
      },
      resources,
    };
  });
};
