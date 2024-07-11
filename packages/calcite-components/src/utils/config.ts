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

const existingConfig: CalciteConfig = globalThis["calciteConfig"];

export const focusTrapStack: FocusTrap[] = existingConfig?.focusTrapStack || [];

// the following placeholders are replaced by the build
const version = "__CALCITE_VERSION__";
const buildDate = "__CALCITE_BUILD_DATE__";
const revision = "__CALCITE_REVISION__";

/**
 * Stamp the version onto the global config.
 */
export function stampVersion(): void {
  if (existingConfig && existingConfig.version) {
    return;
  }

  console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);

  const target = existingConfig || globalThis["calciteConfig"] || {};

  Object.defineProperty(target, "version", {
    value: version,
    writable: false,
  });

  globalThis["calciteConfig"] = target;
}
