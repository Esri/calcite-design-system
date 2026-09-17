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

type AriaFalseValue = "false" | undefined | null;
type AriaBoolean<FalseValue extends AriaFalseValue = "false"> = "true" | FalseValue;

/**
 * Converts a boolean to a valid string value for a boolean ARIA attribute.
 *
 * By default, `false` is converted to `"false"`. A custom false value can be provided when the
 * attribute should instead be omitted: use `null` for DOM ARIA properties or `undefined` for JSX.
 * The custom false value does not affect `true`, which is always converted to `"true"`.
 *
 * @param value The boolean value to convert.
 * @param falseValue The value returned when `value` is `false`.
 * @returns A valid ARIA boolean string value: `"true"` or the provided `falseValue`.
 */
export function toAriaBoolean(value: boolean): AriaBoolean;
export function toAriaBoolean<FalseValue extends AriaFalseValue>(
  value: boolean,
  falseValue: FalseValue,
): AriaBoolean<FalseValue>;
export function toAriaBoolean(value: boolean, ...falseValues: [] | [AriaFalseValue]): AriaBoolean<AriaFalseValue> {
  const falseValue = falseValues.length === 0 ? "false" : falseValues[0];
  return value ? "true" : falseValue;
}
