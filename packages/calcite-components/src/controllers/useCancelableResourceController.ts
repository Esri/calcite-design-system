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
export interface UseCancelableResourceController {
  /**
   * Adds a cancelable resource to the controller.
   *
   * @param resource - A resource with a `cancel` method.
   */
  addResource: (resource: CancelableResource) => void;

  /**
   * Cancels all tracked resources and clears the controller.
   */
  cancelAllResources: () => void;

  /**
   * Removes a specific resource from the controller without canceling it.
   *
   * @param resource - The resource to remove.
   */
  removeResource: (resource: CancelableResource) => void;
}

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 *
 * @param options
 * @param options.autoCancelOnDisconnect
 */
export const useCancelableResourceController = <T extends LitElement>(options?: {
  autoCancelOnDisconnect?: boolean;
}): ReturnType<typeof makeGenericController<UseCancelableResourceController, T>> => {
  const { autoCancelOnDisconnect = true } = options || {};

  return makeGenericController<UseCancelableResourceController, T>((_, controller) => {
    const resources = new Set<CancelableResource>();

    controller.onDisconnected(() => {
      if (autoCancelOnDisconnect) {
        utils.cancelAllResources();
      }
    });

    const utils: UseCancelableResourceController = {
      addResource: (resource) => {
        resources.add(resource);
      },
      cancelAllResources: () => {
        resources.forEach((resource) => resource.cancel());
        resources.clear();
      },
      removeResource: (resource) => {
        resources.delete(resource);
      },
    };

    return utils;
  });
};
