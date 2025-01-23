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
