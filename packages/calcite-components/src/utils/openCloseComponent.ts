// @ts-strict-ignore
import { KebabCase } from "type-fest";
import type { Ref } from "lit/directives/ref.js";
import { whenTransitionDone } from "./dom";

/**
 * Defines interface for components with open/close public emitter.
 * All implementations of this interface must handle the following events: `beforeOpen`, `open`, `beforeClose`, `close`.
 */
export interface OpenCloseComponent {
  /**
   * Specifies property on which active transition is watched for.
   *
   * This should be used if the component uses a property other than `open` to trigger a transition.
   */
  openProp?: string;

  /** Specifies the name of CSS transition property. */
  transitionProp: KebabCase<Extract<keyof CSSStyleDeclaration, string>>;

  /** Specifies element that the transition is allowed to emit on. */
  transitionEl: HTMLElement | Ref<HTMLElement>;

  /** Defines method for `beforeOpen` event handler. */
  onBeforeOpen: () => void;

  /** Defines method for `open` event handler: */
  onOpen: () => void;

  /** Defines method for `beforeClose` event handler: */
  onBeforeClose: () => void;

  /** Defines method for `close` event handler: */
  onClose: () => void;
}

function isOpen(component: OpenCloseComponent): boolean {
  return component[component.openProp || "open"];
}

/**
 * This util helps emit (before)open/close events consistently based on the associated CSS transition property.
 *
 * Note: this should be called whenever the component's toggling property changes and would trigger a transition.
 *
 * @example
 * @param override
 * import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
 *
 * override willUpdate(changes: PropertyValues<this>): void {
 *   if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
 *     onToggleOpenCloseComponent(this);
 *   }
 *   // ...
 * }
 * @param component - OpenCloseComponent uses `open` prop to emit (before)open/close.
 */
export function onToggleOpenCloseComponent(component: OpenCloseComponent, override?: any): void {
  requestAnimationFrame((): void => {
    if (!component.transitionEl) {
      return;
    }

    const c = override || component;

    whenTransitionDone(
      "tagName" in component.transitionEl ? component.transitionEl : component.transitionEl.value,
      component.transitionProp,
      () => {
        if (isOpen(c)) {
          component.onBeforeOpen();
        } else {
          component.onBeforeClose();
        }
      },
      () => {
        if (isOpen(c)) {
          component.onOpen();
        } else {
          component.onClose();
        }
      },
    );
  });
}
