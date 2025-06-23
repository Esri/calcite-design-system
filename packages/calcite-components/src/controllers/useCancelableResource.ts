import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";

/**
 * Interface for cancelable resources.
 */
export interface CancelableResource {
  cancel: () => void;
}

/**
 * Interface for the CancelableResourceController.
 */
export interface UseCancelableResource {
  /**
   * Adds a cancelable resource to the controller.
   *
   * @param resource - A resource with a `cancel` method.
   */
  add: (resource: CancelableResource) => void;
}

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 */
export const useCancelableResource = <T extends LitElement>(): ReturnType<
  typeof makeGenericController<UseCancelableResource, T>
> => {
  return makeGenericController<UseCancelableResource, T>((component, controller) => {
    const args = { component, controller };
    const { controller: adaptedController } = args;
    const resources = new Set<CancelableResource>();

    const cancelAll = () => {
      resources.forEach((resource) => resource.cancel());
      resources.clear();
    };

    adaptedController.onDisconnected(() => {
      cancelAll();
    });

    const utils: UseCancelableResource = {
      add: (resource) => {
        resources.add(resource);
      },
    };

    return utils;
  });
};
