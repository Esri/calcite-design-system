/**
 * This module allows custom configuration for components.
 */

import { FocusTrap } from "./focusTrapComponent";

export interface CalciteConfig {
  /**
   * Defines the global trap stack to use for focus-trapping components.
   *
   * This is useful if your application uses its own instance of `focus-trap` and both need to be aware of each other.
   *
   * @see https://github.com/focus-trap/focus-trap#createoptions
   */
  focusTrapStack: FocusTrap[];

  /**
   * Contains the version of the Calcite components.
   *
   * @readonly
   */
  version?: string;
}

const customConfig: CalciteConfig = globalThis["calciteConfig"];

export const focusTrapStack: FocusTrap[] = customConfig?.focusTrapStack || [];

const version = "__CALCITE_VERSION__"; // version number is set by build

/**
 * Stamp the version onto the global config.
 */
export function stampVersion(): void {
  if (customConfig && customConfig.version) {
    console.warn(
      customConfig.version === version
        ? `[calcite-components] while initializing v${version}, an existing configuration with the same version was found. This may be caused by the initialization script running more than once.`
        : `[calcite-components] while initializing v${version}, an existing configuration with version "${customConfig.version}" was found. This may cause unexpected behavior. The version will not be added to the existing global configuration.`,
    );
    return;
  }

  const target = customConfig || globalThis["calciteConfig"] || {};

  Object.defineProperty(target, "version", {
    value: version,
    writable: false,
  });

  globalThis["calciteConfig"] = target;
}
