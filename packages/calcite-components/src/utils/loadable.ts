// @ts-strict-ignore
import { LitElement } from "@arcgis/lumina";
import { isBrowser } from "./browser";

/**
 * This helper adds support for knowing when a component has been loaded.
 *
 * @deprecated this interface is no longer needed, and you can use LitElement.componentOnReady instead
 *
 * Implementing
 *
 * ```
 * export class MyComponent implements LoadableComponent { }
 * ```
 *
 * ```
 *  //--------------------------------------------------------------------------
 *  //
 *  //  Lifecycle
 *  //
 *  //--------------------------------------------------------------------------
 *
 *  load(): void {
 *    setUpLoadableComponent(this);
 *  }
 *
 *  loaded(): void {
 *    setComponentLoaded(this);
 *  }
 *
 *  // --------------------------------------------------------------------------
 *  //
 *  //  Methods
 *  //
 *  // --------------------------------------------------------------------------
 *
 *  async myMethod(): Promise<void> {
 *    await componentLoaded(this);
 *  }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- this interface is deprecated, and we allow it to be empty for incremental migration
export interface LoadableComponent {}

/**
 * This helper util sets up the component for the ability to know when the component has been loaded.
 *
 * This should be used in the `load` lifecycle hook.
 *
 * @deprecated this method is no longer needed, and you can use LitElement.componentOnReady instead
 *
 * @example
 * load(): void {
 *   setUpLoadableComponent(this);
 * }
 *
 * @param _component
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- this method is deprecated, and we allow it to be empty for incremental migration
export function setUpLoadableComponent(_component: LoadableComponent): void {
  // intentionally empty
}

/**
 * This helper util lets the loadable component know that it is now loaded.
 *
 * This should be used in the `loaded` lifecycle hook.
 *
 * @deprecated this method is no longer needed, and you can use LitElement.componentOnReady instead
 *
 * @example
 * loaded(): void {
 *   setComponentLoaded(this);
 * }
 *
 * @param _component
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- this method is deprecated, and we allow it to be empty for incremental migration
export function setComponentLoaded(_component: LoadableComponent): void {
  // intentionally empty
}

/**
 * This helper util can be used to ensure a component has been loaded (The "componentOnReady" lifecycle method has been called).
 *
 * A component developer can await this method before proceeding with any logic that requires a component to be loaded first.
 *
 * @deprecated use LitElement.componentOnReady instead
 *
 * @example
 * async myMethod(): Promise<void> {
 *   await componentLoaded(this);
 * }
 *
 * @param component
 * @returns Promise<void>
 */
export async function componentLoaded(component: LitElement): Promise<void> {
  await component.componentOnReady();
}

/**
 * This helper util can be used to ensuring the component is loaded and rendered by the browser (The "componentOnReady" lifecycle method has been called and any internal elements are focusable).
 *
 * A component developer can await this method before proceeding with any logic that requires a component to be loaded first and then an internal element be focused.
 *
 * @example
 * async setFocus(): Promise<void> {
 *   await componentFocusable(this);
 *   this.internalElement?.focus();
 * }
 *
 * @param component
 * @returns Promise<void>
 */
export async function componentFocusable(component: LitElement): Promise<void> {
  await component.componentOnReady();

  if (!isBrowser()) {
    return;
  }

  component.requestUpdate();
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
