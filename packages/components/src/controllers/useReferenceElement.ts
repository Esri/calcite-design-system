import { makeGenericController } from "@arcgis/lumina/controllers";
import { ReferenceElement } from "../utils/floating-ui";
import { queryElementRoots } from "../utils/dom";
import { ReferenceElementComponentManager } from "./referenceElementManager";

export type ReferenceElementType = "click" | "hover";

/**
 * TODO
 */
export interface ReferenceElementComponent extends HTMLElement {
  autoClose?: boolean;
  closeOnClick?: boolean;
  el: HTMLElement;
  open: boolean;
  referenceEl: ReferenceElement;
  referenceElement: string | ReferenceElement;
  referenceElementType: ReferenceElementType;
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
    let hasLoaded = false;

    const getReferenceElement = (component: ReferenceElementComponent): ReferenceElement => {
      const { referenceElement, el } = component;

      return (
        (typeof referenceElement === "string" ? queryElementRoots(el, { id: referenceElement }) : referenceElement) ||
        null
      );
    };

    const setUpReferenceElement = (warn = true): void => {
      component.referenceEl = getReferenceElement(component);

      const { el, referenceElement, referenceEl } = component;
      if (warn && referenceElement && !referenceEl) {
        console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
          el,
        });
      }
    };

    controller.onConnected(() => {
      // we set up the ref element in the next frame to ensure PopoverManager
      // event handlers are invoked after connect (mainly for `components` output target)
      requestAnimationFrame(() => setUpReferenceElement(hasLoaded));

      manager.registerElement(component);
    });

    controller.onLoaded(() => {
      hasLoaded = true;

      if (component.referenceElement && !component.referenceEl) {
        setUpReferenceElement();
      }

      manager.registerElement(component);
    });

    controller.onUpdate((changes) => {
      if (!component.hasUpdated) {
        return;
      }

      if (changes.has("referenceElement")) {
        setUpReferenceElement();
      }

      if (changes.has("referenceEl")) {
        manager.unregisterElement(component);
        manager.registerElement(component);
      } else if (changes.has("open")) {
        manager.updateElement(component);
      }
    });

    controller.onDisconnected(() => {
      manager.unregisterElement(component);
    });
  });
};
