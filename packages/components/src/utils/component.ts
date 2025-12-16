import type { LitElement } from "@arcgis/lumina";
import { Scale } from "../components/interfaces";
import { ComboboxChildElement } from "../components/combobox/interfaces";
import { StepperItem } from "../components/stepper-item/stepper-item";
import { TableRow } from "../components/table-row/table-row";
import { logger } from "./logger";

export function getIconScale(componentScale: Scale): Extract<Scale, "s" | "m"> {
  return componentScale === "l" ? "m" : "s";
}

/**
 * This utility logs a warning message when a required property is missing.
 *
 * Note: this should only be used for cases where using the @required JSDoc tag is not possible, such as:
 * - when a required property is being deprecated
 * - when a required property can be computed from another property
 *
 * @param component the component that requires the property
 * @param newProp the new property that is required
 * @param deprecatedProp the deprecated property that is required
 */
export function warnIfMissingRequiredProp<C extends LitElement>(
  component: C,
  newProp: keyof C,
  deprecatedProp: keyof C,
): void {
  if (!component[newProp] && !component[deprecatedProp]) {
    logger.warn(`[${component.el.localName}] "${newProp.toString()}" or "${deprecatedProp.toString()}" is required.`);
  }
}

export function isHidden<C extends ComboboxChildElement | StepperItem["el"] | TableRow["el"]>(el: C): boolean {
  return el.hidden || el.itemHidden;
}

/**
 * This helper util can be used to ensuring the component is loaded and rendered by the browser (The "componentOnReady" lifecycle method has been called and any internal elements are focusable).
 *
 * A component developer can await this method before proceeding with any logic that requires a component to be loaded first and then an internal element be focused.
 *
 * @example
 * async focusPart(): Promise<void> {
 *   await componentFocusable(this);
 *   this.internalElement?.focus();
 * }
 *
 * @param component
 * @returns Promise<void>
 */
export async function componentFocusable(component: LitElement): Promise<void> {
  await component.componentOnReady();
  await component.updateComplete;
}
