import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";
import { CancelableResource } from "../tests/commonTests/interfaces";

/**
 * Interface for the CancelableResourceController.
 */
export interface useCancelable {
  /**
   * Adds a cancelable resource to the controller.
   *
   * @param resource - Resource with a `cancel` method.
   */
  add: (resource: CancelableResource | CancelableResource[]) => void;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  resources: Set<CancelableResource>;
}

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 */
export const useCancelable = <T extends LitElement>(): ReturnType<typeof makeGenericController<useCancelable, T>> => {
  return makeGenericController<useCancelable, T>((component, controller) => {
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

    const utils: useCancelable = {
      add: (resourceOrResources) => {
        const resourceArray = Array.isArray(resourceOrResources) ? resourceOrResources : [resourceOrResources];
        resourceArray.forEach((resource) => resources.add(resource));
      },
      resources,
    };

    return utils;
  });
};
