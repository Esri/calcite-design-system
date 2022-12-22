import { HTMLStencilElement } from "@stencil/core/internal";

/**
 * This helper util can be used to ensure a component has been loaded
 *
 * A component developer can await this method before proceeding with any logic that requires a component to be loaded first.
 *
 * See: https://github.com/ionic-team/stencil/blob/main/src/runtime/readme.md#lifecycle-process
 *
 * ```
 * async setFocus(): Promise<void> {
 *   const { el } = this;
 *   await componentLoaded(el);
 *   el.focus();
 * }
 * ```
 *
 * @param {HTMLStencilElement} el the stencil component element.
 * @returns {Promise<void>}
 */
export async function componentLoaded(el: HTMLStencilElement): Promise<void> {
  await el.componentOnReady();
  //await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}
