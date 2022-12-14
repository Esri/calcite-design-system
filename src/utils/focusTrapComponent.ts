import {
  FocusTrap as _FocusTrap,
  Options as FocusTrapOptions,
  createFocusTrap,
  FocusTrapTabbableOptions
} from "focus-trap";
import { FocusableElement, focusElement } from "./dom";
import { tabbable } from "tabbable";

const tabbableOptions: FocusTrapTabbableOptions = {
  getShadowRoot: true
};

const trapStack: _FocusTrap[] = [];

/**
 * Defines interface for components with a focus trap.
 */
export interface FocusTrapComponent {
  /**
   * When `true`, prevents focus trapping.
   */
  focusTrapDisabled: boolean;

  /**
   * The focus trap instance.
   */
  focusTrap: FocusTrap;

  /**
   * The focus trap element.
   */
  focusTrapEl: HTMLElement;
}

export type FocusTrap = _FocusTrap;

/**
 * Helper to set up the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 */
export function connectFocusTrap(component: FocusTrapComponent): void {
  const { focusTrapEl } = component;

  if (!focusTrapEl) {
    return;
  }

  if (focusTrapEl.tabIndex == null) {
    focusTrapEl.tabIndex = -1;
  }

  const focusTrapOptions: FocusTrapOptions = {
    clickOutsideDeactivates: true,
    document: focusTrapEl.ownerDocument,
    escapeDeactivates: false,
    fallbackFocus: focusTrapEl,
    setReturnFocus: (el) => {
      focusElement(el as FocusableElement);
      return false;
    },
    tabbableOptions,
    trapStack
  };

  component.focusTrap = createFocusTrap(focusTrapEl, focusTrapOptions);
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
 * Helper to focus the first tabbable element within the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 */
export function focusFirstTabbable(component: FocusTrapComponent): void {
  tabbable(component.focusTrapEl, tabbableOptions)[0]?.focus();
}
