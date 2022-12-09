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
  disableFocusTrap: boolean;

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
 * Helper to set up focus trap component.
 *
 * @param {FocusTrapComponent} component The focus trap component.
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
    allowOutsideClick: true,
    clickOutsideDeactivates: false,
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
 * Helper to activate focus trap component.
 *
 * @param {FocusTrapComponent} component The focus trap component.
 */
export function activateFocusTrap(component: FocusTrapComponent): void {
  if (!component.disableFocusTrap) {
    component.focusTrap?.activate();
  }
}

/**
 * Helper to tear deactivate focus trap component.
 *
 * @param {FocusTrapComponent} component The focus trap component.
 */
export function deactivateFocusTrap(component: FocusTrapComponent): void {
  component.focusTrap?.deactivate();
}

/**
 * Helper to focus the first tabbable element within the "focusTrapEl".
 *
 * @param {FocusTrapComponent} component The focus trap component.
 */
export function focusFirstTabbable(component: FocusTrapComponent): void {
  tabbable(component.focusTrapEl, tabbableOptions)[0]?.focus();
}

/**
 * Helper to toggle activation of the focus trap component.
 *
 * @param {FocusTrapComponent} component The focus trap component.
 * @param {boolean} value Whether to activate the focus trap.
 */
export function toggleFocusTrap(component: FocusTrapComponent, value = false): void {
  value ? activateFocusTrap(component) : deactivateFocusTrap(component);
}
