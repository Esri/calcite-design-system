import { createFocusTrap, FocusTrap as _FocusTrap, Options as FocusTrapOptions } from "focus-trap";
import { FocusableElement, focusElement, tabbableOptions } from "./dom";

const trapStack: _FocusTrap[] = [];

/**
 * Defines interface for components with a focus trap.
 */
export interface FocusTrapComponent {
  /**
   * The focus trap element.
   */
  el: HTMLElement;

  /**
   * When `true`, prevents focus trapping.
   */
  focusTrapDisabled: boolean;

  /**
   * The focus trap instance.
   */
  focusTrap: FocusTrap;

  /**
   * Method to update the element(s) that are used within the FocusTrap component.
   */
  updateFocusTrapElements: () => Promise<void>;
}

export type FocusTrap = _FocusTrap;

/**
 * Helper to set up the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 */
export function connectFocusTrap(component: FocusTrapComponent): void {
  const { el } = component;

  if (!el) {
    return;
  }

  const focusTrapOptions: FocusTrapOptions = {
    clickOutsideDeactivates: true,
    document: el.ownerDocument,
    escapeDeactivates: false,
    fallbackFocus: el,
    setReturnFocus: (el) => {
      focusElement(el as FocusableElement);
      return false;
    },
    tabbableOptions,
    trapStack
  };

  component.focusTrap = createFocusTrap(el, focusTrapOptions);
}

/**
 * Helper to activate the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 */
export function activateFocusTrap(component: FocusTrapComponent): void {
  if (!component.focusTrapDisabled) {
    component.focusTrap?.activate();
  }
}

/**
 * Helper to deactivate the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 */
export function deactivateFocusTrap(component: FocusTrapComponent): void {
  component.focusTrap?.deactivate();
}

/**
 * Helper to update the element(s) that are used within the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 * @example
 * const modal = document.querySelector("calcite-modal");
 * const input = document.createElement("calcite-input");
 * content.appendChild(input);
 * await input.componentOnReady();
 * await modal.updateFocusTrapElements();
 * requestAnimationFrame(() => input.setFocus());
 */
export function updateFocusTrapElements(component: FocusTrapComponent): void {
  component.focusTrap?.updateContainerElements(component.el);
}
