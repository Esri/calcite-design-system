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
  if (customConfig) {
    if (customConfig.version) {
      console.warn(
        `Calcite config version "${customConfig.version}" will be set by global script. This may cause unexpected behavior.`,
      );
      return;
    }

    customConfig.version = version;
    return;
  }

  globalThis["calciteConfig"] = {
    version,
  };
}
