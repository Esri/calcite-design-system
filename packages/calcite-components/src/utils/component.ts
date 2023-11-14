import { Scale } from "../components/interfaces";
import { Build } from "@stencil/core";

export function getIconScale(componentScale: Scale): Extract<Scale, "s" | "m"> {
  return componentScale === "l" ? "m" : "s";
}

/**
 * This util is used to create an object to spread data attributes used in E2E or unit tests.
 *
 * Attributes used for testing will get removed when the components are built for production.
 *
 * @example
 *
 * <calcite-icon
 *         class={{
 *           [CSS.chevron]: true,
 *           [CSS_UTILITY.rtl]: rtl,
 *         }}
 *         icon={ICONS.chevronRight}
 *         onClick={this.iconClickHandler}
 *         scale={getIconScale(this.scale)}
 *         {...toTestObject("id", "icon")}
 *       />
 *
 * @param id – the id to use for the data-test attribute
 * @param value – the value to use for the data-test attribute
 */
export function toTestObject(id: string, value: string): object {
  if (!Build.isTesting) {
    return null;
  }

  return {
    [`data-test-${id}`]: value,
  };
}
