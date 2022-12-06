import { FocusTrap as _FocusTrap, Options as FocusTrapOptions, createFocusTrap } from "focus-trap";
import { FocusableElement, focusElement } from "./dom";

const trapStack: _FocusTrap[] = [];

/**
 * Defines interface for components with a focus trap.
 */
export interface FocusTrapComponent {
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
 * @param component
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
    tabbableOptions: {
      getShadowRoot: true
    },
    trapStack
  };

  component.focusTrap = createFocusTrap(focusTrapEl, focusTrapOptions);
}

/**
 * Helper to activate focus trap component.
 *
 * @param component
 */
export function activateFocusTrap(component: FocusTrapComponent): void {
  component.focusTrap?.activate();
}

/**
 * Helper to tear deactivate focus trap component.
 *
 * @param component
 */
export function deactivateFocusTrap(component: FocusTrapComponent): void {
  component.focusTrap?.deactivate();
}
