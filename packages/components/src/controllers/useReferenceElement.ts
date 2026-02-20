import { makeGenericController } from "@arcgis/lumina/controllers";
import { ReferenceElement } from "../utils/floating-ui";
import { ReferenceElementComponentManager } from "./referenceElementManager";

/**
 * TODO
 */
export interface ReferenceElementComponent extends HTMLElement {
  autoClose?: boolean;
  closeOnClick?: boolean;
  el: HTMLElement;
  open: boolean;
  referenceEl?: ReferenceElement;
  referenceElementOptions: {
    click?: boolean;
    hover?: boolean;
  };
  triggerDisabled?: boolean;
}

/**
 * A controller for managing reference elements.
 *
 * Note: reference elements will be managed automatically when the component is disconnected.
 */
export const useReferenceElement = <T extends ReferenceElementComponent>(
  manager: ReferenceElementComponentManager,
): ReturnType<typeof makeGenericController<void, T>> => {
  return makeGenericController<void, T>((component, controller) => {
    controller.onConnected(() => {
      manager.registerElement(component);
    });

    controller.onLoaded(() => {
      manager.registerElement(component);
    });

    controller.onUpdate((changes) => {
      if (!component.hasUpdated) {
        return;
      }

      if (changes.has("referenceEl") || changes.has("referenceElementOptions")) {
        manager.unregisterElement(component);
        manager.registerElement(component);
      } else if (changes.has("open")) {
        manager.setExpanded(component);
      }
    });

    controller.onDisconnected(() => {
      manager.unregisterElement(component);
    });
  });
};
