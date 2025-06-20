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

  /**
   * Cancels all tracked resources and clears the controller.
   */
  cancelAll: () => void;

  /**
   * Removes a specific resource from the controller without canceling it.
   *
   * @param resource - The resource to remove.
   */
  remove: (resource: CancelableResource) => void;
}

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 *
 * @param options
 * @param options.autoCancelOnDisconnect
 */
export const useCancelableResource = <T extends LitElement>(options?: {
  autoCancelOnDisconnect?: boolean;
}): ReturnType<typeof makeGenericController<UseCancelableResource, T>> => {
  const { autoCancelOnDisconnect = true } = options || {};

  return makeGenericController<UseCancelableResource, T>((component, controller) => {
    const args = { component, controller };
    const { controller: adaptedController } = args;
    const resources = new Set<CancelableResource>();

    adaptedController.onDisconnected(() => {
      if (autoCancelOnDisconnect) {
        utils.cancelAll();
      }
    });

    const utils: UseCancelableResource = {
      add: (resource) => {
        resources.add(resource);
      },
      cancelAll: () => {
        resources.forEach((resource) => resource.cancel());
        resources.clear();
      },
      remove: (resource) => {
        resources.delete(resource);
      },
    };

    return utils;
  });
};
