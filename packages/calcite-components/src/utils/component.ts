import { Build, forceUpdate } from "@stencil/core";
import { HTMLStencilElement } from "@stencil/core/internal";
import { Scale } from "../components/interfaces";

export function getIconScale(componentScale: Scale): Extract<Scale, "s" | "m"> {
  return componentScale === "l" ? "m" : "s";
}

/**
 * This util helps us wait for a component to be ready for both lazy-loading (`dist` output) and non-lazy-loading (`components` output) components.
 *
 * Based on https://github.com/ionic-team/ionic-framework/blob/1a8bd6d/core/src/utils/helpers.ts#L60C1-L79C3
 *
 * @param el - the host element to wait for
 */
export async function componentOnReady(el: HTMLElement): Promise<void> {
  await (isStencilEl(el)
    ? el.componentOnReady()
    : new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
}

function isStencilEl(el: HTMLElement): el is HTMLStencilElement {
  return typeof (el as HTMLStencilElement).componentOnReady === "function";
}

/**
 * This helper util can be used to ensuring the component is loaded and rendered by the browser (The "componentDidLoad" Stencil lifecycle method has been called and any internal elements are focusable).
 *
 * A component developer can await this method before proceeding with any logic that requires a component to be loaded first and then an internal element be focused.
 *
 * ```
 * async setFocus(): Promise<void> {
 *   await componentFocusable(this);
 *   this.internalElement?.focus();
 * }
 * ```
 *
 * @param el the component's host element
 * @returns Promise<void>
 */
export async function componentFocusable(el: HTMLElement): Promise<void> {
  await componentOnReady(el);

  if (!Build.isBrowser) {
    return;
  }

  forceUpdate(el);
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
