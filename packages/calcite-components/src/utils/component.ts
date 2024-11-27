import type { LitElement } from "@arcgis/lumina";
import { Scale } from "../components/interfaces";
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

/**
 * This utility logs a warning message when a property is missing and allows for a custom message to be provided.
 *
 * Note: this should only be used for cases where missing property or properties affects the component's functionality but is not required.
 *
 * @param component the component with the missing property
 * @param prop the property that is missing
 * @param message the custom message about functionality impact
 * @param prop2 the second property that is missing
 */
export function warnIfMissingProps<C extends LitElement>(
  component: C,
  prop: keyof C,
  message?: string,
  prop2?: keyof C,
): void {
  const isSecondPropMissing = prop2 && !component[prop2];

  if (!component[prop]) {
    logger.warn(
      `[${component.el.localName}] is missing "${prop.toString()}" ${isSecondPropMissing ? `& "${prop2.toString()}" properties` : "property"}. ${message || ""}`,
    );
  }
}
