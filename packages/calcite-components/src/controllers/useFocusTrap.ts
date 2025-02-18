import { makeGenericController } from "@arcgis/components-controllers";
import { createFocusTrap, FocusTrap, Options as Options } from "focus-trap";
import { LitElement } from "@arcgis/lumina";
import { createFocusTrapOptions } from "../utils/focusTrapComponent";

export interface UseFocusTrap {
  /**
   * Activates the focus trap.
   */
  activate: () => void;

  /**
   * Deactivates the focus trap.
   */
  deactivate: () => void;

  /**
   * By default, the host element will be used as the focus-trap element, but if the focus-trap element needs to be a different element, use this method prior to activating to set the focus-trap element.
   */
  overrideFocusTrapEl: (el: HTMLElement) => void;

  /**
   * Sets the extra containers to be used in the focus trap.
   *
   * @see https://github.com/focus-trap/focus-trap#trapupdatecontainerelements
   */
  setExtraContainers: (extraContainers?: FocusTrapOptions["extraContainers"]) => void;

  /**
   * Updates focusable elements within the trap.
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
  focusTrapOptions?: Options;
}

interface FocusTrapComponent extends LitElement {
  /*
   * When `true` prevents focus trapping.
   */
  focusTrapDisabled?: boolean;

  /**
   * When defined, provides a condition to disable focus trapping. When `true`, prevents focus trapping.
   */
  focusTrapDisabledOverride?: () => boolean;

  /**
   * Additional options to configure the focus trap.
   */
  focusTrapOptions?: Partial<FocusTrapOptions>;
}

export type FocusTrapOptions =
  /**
   * @see https://github.com/focus-trap/focus-trap#createoptions
   */
  Pick<Options, "allowOutsideClick" | "initialFocus" | "returnFocusOnDeactivate"> & {
    /**
     * Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus-trap element.
     */
    extraContainers: Parameters<FocusTrap["updateContainerElements"]>[0];
  };

function getEffectiveContainerElements(
  targetEl: HTMLElement,
  { focusTrapOptions }: FocusTrapComponent,
  extraContainers?: FocusTrapOptions["extraContainers"],
) {
  if (!focusTrapOptions?.extraContainers && !extraContainers) {
    return targetEl;
  }

  return [targetEl, ...toContainerArray(focusTrapOptions?.extraContainers), ...toContainerArray(extraContainers)];
}

function toContainerArray(containers: FocusTrapOptions["extraContainers"] = []) {
  return Array.isArray(containers) ? containers : [containers];
}

/**
 * A controller for managing focus traps.
 *
 * Note: traps will be deactivated automatically when the component is disconnected.
 *
 * @param options
 */
export const useFocusTrap = <T extends FocusTrapComponent>(
  options: UseFocusTrapOptions<T>,
): ReturnType<typeof makeGenericController<UseFocusTrap, T>> => {
  return makeGenericController<UseFocusTrap, T>((component, controller) => {
    let focusTrap: FocusTrap;
    let focusTrapEl: HTMLElement;
    let effectiveContainers: FocusTrapOptions["extraContainers"];
    const internalFocusTrapOptions = options.focusTrapOptions;

    controller.onConnected(() => {
      if (component[options.triggerProp] && focusTrap) {
        utils.activate();
      }
    });

    controller.onUpdate((changes) => {
      if (changes.has("focusTrapDisabled")) {
        if (component.focusTrapDisabled) {
          utils.deactivate();
        } else {
          utils.activate();
        }
      }
    });

    controller.onDisconnected(() => utils.deactivate());

    const utils: UseFocusTrap = {
      activate: () => {
        const targetEl = focusTrapEl || component.el;

        if (!targetEl.isConnected) {
          return;
        }

        if (!focusTrap) {
          const effectiveFocusTrapOptions = {
            ...internalFocusTrapOptions,
            ...component.focusTrapOptions,
          };
          effectiveContainers ||= getEffectiveContainerElements(targetEl, component);

          focusTrap = createFocusTrap(effectiveContainers, createFocusTrapOptions(targetEl, effectiveFocusTrapOptions));
        }

        if (
          typeof component.focusTrapDisabledOverride === "function"
            ? !component.focusTrapDisabledOverride()
            : !component.focusTrapDisabled
        ) {
          focusTrap.activate();
        }
      },
      deactivate: () => focusTrap?.deactivate(),
      overrideFocusTrapEl: (el: HTMLElement) => {
        if (focusTrap) {
          throw new Error("Focus trap already created");
        }

        focusTrapEl = el;
      },
      setExtraContainers: (extraContainers?: FocusTrapOptions["extraContainers"]) => {
        const targetEl = focusTrapEl || component.el;
        effectiveContainers = getEffectiveContainerElements(targetEl, component, extraContainers);
      },
      updateContainerElements: () => {
        return focusTrap?.updateContainerElements(effectiveContainers);
      },
    };

    return utils;
  });
};
