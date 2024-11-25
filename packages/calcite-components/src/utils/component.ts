import type { LitElement, PublicLitElement } from "@arcgis/lumina";
import { Scale } from "../components/interfaces";
import { logger } from "./logger";

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

function isStencilEl(el: HTMLElement): el is PublicLitElement {
  return typeof (el as PublicLitElement).componentOnReady === "function";
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
