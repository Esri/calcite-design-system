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
}

const customConfig: CalciteConfig = globalThis["calciteConfig"];

export const focusTrapStack: FocusTrap[] = customConfig?.focusTrapStack || [];
