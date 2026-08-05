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
   * Cancels a managed resource.
   *
   * @param resource - Resource with a `cancel` method.
   */
  cancelResource: (resource: Cancelable) => void;

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

    const cancelManagedResource = (resource: Cancelable): void => {
      // eslint-disable-next-line no-restricted-properties -- this controller manages cancel calls
      resource.cancel();
    };

    controller.onDisconnected(() => {
      resources.forEach((resource) => cancelManagedResource(resource));
    });

    return {
      add: (resourceOrResources) => {
        [resourceOrResources].flat().forEach((resource) => resources.add(resource));
      },
      cancelResource: (resource) => {
        if (!resources.has(resource)) {
          return;
        }

        resources.delete(resource);
        cancelManagedResource(resource);
      },
      resources,
    };
  });
};
