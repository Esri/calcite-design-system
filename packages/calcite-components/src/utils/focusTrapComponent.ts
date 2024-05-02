import { createFocusTrap, FocusTrap as _FocusTrap, Options as FocusTrapOptions } from "focus-trap";
import { FocusableElement, focusElement, tabbableOptions } from "./dom";
import { focusTrapStack } from "./config";

/**
 * Defines interface for components with a focus trap. Focusable content is required for components implementing focus trapping with this interface.
 */
export interface FocusTrapComponent {
  /**
   * The focus trap element.
   */
  el: HTMLElement;

  /** When `true`, disables the default close on escape behavior. */
  escapeDisabled?: boolean;

  /** When `true`, disables the closing of the component when clicked outside. */
  outsideCloseDisabled?: boolean;

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
   *
   * This should be implemented for components that allow user content and/or have conditionally-rendered focusable elements within the trap.
   */
  updateFocusTrapElements?: () => Promise<void>;

  /**
   * Method that will be called before returning focus to the node that had focus prior to activation upon deactivation.
   */
  onFocusTrapDeactivate?(): void;
}

export type FocusTrap = _FocusTrap;

interface ConnectFocusTrapOptions {
  /**
   * This option allows the focus trap to be created on a different element that's not the host (e.g., a supporting popup component).
   */
  focusTrapEl?: HTMLElement;

  /**
   * This allows specifying overrides to ConnectFocusTrap options.
   */
  focusTrapOptions?: Omit<FocusTrapOptions, "document" | "tabbableOptions" | "trapStack">;
}

/**
 * Helper to set up the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 * @param options
 */
export function connectFocusTrap(component: FocusTrapComponent, options?: ConnectFocusTrapOptions): void {
  const { el } = component;
  const focusTrapNode = options?.focusTrapEl || el;

  if (!focusTrapNode) {
    return;
  }

  const focusTrapOptions: FocusTrapOptions = {
    clickOutsideDeactivates: !component.outsideCloseDisabled ?? true,
    escapeDeactivates: !component.escapeDisabled ?? true,
    fallbackFocus: focusTrapNode,
    onDeactivate: () => component.onFocusTrapDeactivate(),
    setReturnFocus: (el) => {
      focusElement(el as FocusableElement);
      return false;
    },
    ...options?.focusTrapOptions,

    // the following options are not overridable
    document: el.ownerDocument,
    tabbableOptions,
    trapStack: focusTrapStack,
  };

  component.focusTrap = createFocusTrap(focusTrapNode, focusTrapOptions);
}

/**
 * Helper to activate the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 * @param [options] The FocusTrap activate options.
 */
export function activateFocusTrap(
  component: FocusTrapComponent,
  options?: Parameters<_FocusTrap["activate"]>[0],
): void {
  if (!component.focusTrapDisabled) {
    component.focusTrap?.activate(options);
  }
}

/**
 * Helper to deactivate the FocusTrap component.
 *
 * @param {FocusTrapComponent} component The FocusTrap component.
 * @param [options] The FocusTrap deactivate options.
 */
export function deactivateFocusTrap(
  component: FocusTrapComponent,
  options?: Parameters<_FocusTrap["deactivate"]>[0],
): void {
  component.focusTrap?.deactivate(options);
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
