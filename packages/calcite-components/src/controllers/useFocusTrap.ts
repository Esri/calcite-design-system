import { makeGenericController } from "@arcgis/components-controllers";
import { createFocusTrap, FocusTrap, Options as FocusTrapOptions } from "focus-trap";
import { LitElement } from "@arcgis/lumina";
import { createFocusTrapOptions } from "../utils/focusTrapComponent";

export interface UseFocusTrap {
  /**
   * Activates the focus trap.
   *
   * @see https://github.com/focus-trap/focus-trap#trapactivate
   */
  activate: (options?: Parameters<FocusTrap["activate"]>[0]) => void;

  /**
   * Deactivates the focus trap.
   *
   * @see https://github.com/focus-trap/focus-trap#trapdeactivate
   */
  deactivate: (options?: Parameters<FocusTrap["deactivate"]>[0]) => void;

  /**
   * By default, the host element will be used as the focus-trap element, but if the focus-trap element needs to be a different element, use this method prior to activating to set the focus-trap element.
   */
  overrideFocusTrapEl: (el: HTMLElement) => void;

  /**
   * Updates focusable elements within the trap.
   *
   * @see https://github.com/focus-trap/focus-trap#trapupdatecontainerelements
   */
  updateContainerElements: () => void;
}

interface UseFocusTrapOptions<T extends LitElement = LitElement> {
  /**
   * The name of the prop that will trigger the focus trap to activate.
   */
  triggerProp: keyof T;

  /**
   * Options to pass to the focus-trap library.
   */
  focusTrapOptions?: FocusTrapOptions;
}

/**
 * A controller for managing focus traps.
 *
 * Note: traps will be deactivated automatically when the component is disconnected.
 *
 * @param options
 */
export const useFocusTrap = <T extends LitElement>(
  options: UseFocusTrapOptions<T>,
): ReturnType<typeof makeGenericController<UseFocusTrap, T>> => {
  return makeGenericController<UseFocusTrap, T>((component, controller) => {
    let focusTrap: FocusTrap;
    let focusTrapEl: HTMLElement;
    const { focusTrapOptions } = options;

    controller.onConnected(() => {
      if (component[options.triggerProp] && focusTrap) {
        focusTrap.activate();
      }
    });
    controller.onDisconnected(() => focusTrap?.deactivate());

    return {
      activate: (options?: Parameters<FocusTrap["activate"]>[0]) => {
        const targetEl = focusTrapEl || component.el;

        if (!targetEl.isConnected) {
          return;
        }

        if (!focusTrap) {
          focusTrap = createFocusTrap(targetEl, createFocusTrapOptions(targetEl, focusTrapOptions));
        }

        focusTrap.activate(options);
      },
      deactivate: (options?: Parameters<FocusTrap["deactivate"]>[0]) => focusTrap?.deactivate(options),
      overrideFocusTrapEl: (el: HTMLElement) => {
        if (focusTrap) {
          throw new Error("Focus trap already created");
        }

        focusTrapEl = el;
      },
      updateContainerElements: () => {
        const targetEl = focusTrapEl || component.el;
        return focusTrap?.updateContainerElements(targetEl);
      },
    };
  });
};
