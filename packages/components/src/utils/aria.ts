/**
 * Returns the appropriate ARIA value for a resizable component based on its orientation.
 *
 * This utility is used to provide accessible value text for ARIA attributes (such as `aria-valuenow`)
 * in components that support both block (vertical) and inline (horizontal) resizing.
 */
export function ariaValueFromSize(
  axis: "block" | "inline",
  blockValue: number | null,
  inlineValue: number | null,
): string | undefined {
  const selectedValue = axis === "block" ? blockValue : inlineValue;
  return selectedValue != null ? `${selectedValue}` : undefined;
}

/**
 * This helper makes sure that boolean aria attributes are properly converted to a string.
 *
 * It should only be used for aria attributes that require a string value of "true" or "false".
 *
 * @param value The value.
 * @returns The string conversion of a boolean value ("true" | "false").
 */
export function toAriaBoolean(value: boolean): string {
  return Boolean(value).toString();
}
