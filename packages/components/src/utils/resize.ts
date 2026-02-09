/**
 * Returns the appropriate ARIA value for a resizable component based on its orientation.
 *
 * This utility is used to provide accessible value text for ARIA attributes (such as `aria-valuenow`)
 * in components that support both block (vertical) and inline (horizontal) resizing.
 */
export function ariaValueFromSize(
  isBlockPosition: boolean,
  blockValue: number | null,
  inlineValue: number | null,
): string | undefined {
  const selectedValue = isBlockPosition ? blockValue : inlineValue;
  return selectedValue != null ? `${selectedValue}` : undefined;
}
