/**
 * A controller to manage preventing document scroll when a component is opened.
 * This utility ensures that the document's scroll behavior is disabled when a component
 * with `preventDocumentScroll` set to `true` is opened, and restores the scroll behavior
 * when the component is closed or disconnected.
 *
 * @module usePreventDocumentScroll
 */

import { makeGenericController } from "@arcgis/components-controllers";
import { LitElement } from "@arcgis/lumina";

let openedComponentCount: number = 0;
let initialDocumentOverflowStyle: string = "";

/**
 * Interface representing a component that can prevent document scrolling.
 */
export interface PreventDocumentScrollComponent extends LitElement {
  /**
   * Indicates whether the component is currently opened.
   */
  opened: boolean;

  /**
   * Indicates whether the component should prevent document scrolling when opened.
   */
  preventDocumentScroll: boolean;
}

/**
 * Creates a controller to manage document scroll prevention for a component.
 *
 * This controller tracks the number of components requesting scroll prevention
 * and ensures that the document's scroll behavior is only modified when necessary.
 */
export const usePreventDocumentScroll = (): ReturnType<
  typeof makeGenericController<void, PreventDocumentScrollComponent>
> => {
  /**
   * Adds a scroll prevention lock. If this is the first lock, the document's
   * overflow style is set to "hidden".
   */
  function addOpenedComponent() {
    openedComponentCount++;
    if (openedComponentCount === 1) {
      initialDocumentOverflowStyle = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
  }

  /**
   * Removes a scroll prevention lock. If this is the last lock, the document's
   * overflow style is restored to its initial value.
   */
  function removeOpenedComponent() {
    openedComponentCount--;
    if (openedComponentCount === 0) {
      document.documentElement.style.overflow = initialDocumentOverflowStyle;
    }
  }

  return makeGenericController<void, PreventDocumentScrollComponent>((component, controller) => {
    /**
     * Handles the component being connected to the DOM.
     * Adds a scroll prevention lock if the component is opened and
     * `preventDocumentScroll` is `true`.
     */
    controller.onConnected(() => {
      if (component.opened && component.preventDocumentScroll) {
        addOpenedComponent();
      }
    });

    /**
     * Handles updates to the component's properties.
     * Adds or removes a scroll prevention lock based on changes to
     * `opened` or `preventDocumentScroll`.
     *
     * @param changes - A map of changed properties.
     */
    controller.onUpdate((changes) => {
      if (!component.hasUpdated) {
        return;
      }

      if (changes.has("opened") && component.preventDocumentScroll) {
        if (component.opened) {
          addOpenedComponent();
        } else {
          removeOpenedComponent();
        }
      } else if (changes.has("preventDocumentScroll") && component.opened) {
        if (component.preventDocumentScroll) {
          addOpenedComponent();
        } else {
          removeOpenedComponent();
        }
      }
    });

    /**
     * Handles the component being disconnected from the DOM.
     * Removes a scroll prevention lock if the component is opened and
     * `preventDocumentScroll` is `true`.
     */
    controller.onDisconnected(() => {
      if (component.opened && component.preventDocumentScroll) {
        removeOpenedComponent();
      }
    });
  });
};
