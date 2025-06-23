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
   * Adds an array of cancelable resources to the controller.
   *
   * @param resources - Resources with a `cancel` method.
   */
  add: (resources: CancelableResource[]) => void;
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
    const resources: CancelableResource[] = [];

    const cancelAll = () => {
      resources.forEach((resource) => resource.cancel());
      resources.length = 0;
    };

    adaptedController.onDisconnected(() => {
      cancelAll();
    });

    const utils: UseCancelableResource = {
      add: (newResources) => {
        resources.length = 0;
        resources.push(...newResources);
      },
    };

    return utils;
  });
};
