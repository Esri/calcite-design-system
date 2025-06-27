import { makeGenericController } from "@arcgis/lumina/controllers";
import type { Arrayable } from "type-fest";
import { LitElement } from "@arcgis/lumina";
import { Cancelable } from "../tests/commonTests/interfaces";

/**
 * Interface for the CancelableController.
 */
export interface useCancelable {
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

/**
 * A controller for managing cancelable resources.
 *
 * Note: resources will be canceled automatically when the component is disconnected.
 */
export const useCancelable = <T extends LitElement>(): ReturnType<typeof makeGenericController<useCancelable, T>> => {
  return makeGenericController<useCancelable, T>((component, controller) => {
    const args = { component, controller };
    const { controller: adaptedController } = args;
    const resources = new Set<Cancelable>();

    adaptedController.onDisconnected(() => {
      resources.forEach((resource) => resource.cancel());
    });

    const utils: useCancelable = {
      add: (resourceOrResources) => {
        [resourceOrResources].flat().forEach((resource) => resources.add(resource));
      },
      resources,
    };

    return utils;
  });
};
