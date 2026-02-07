export function getAriaValue(
  isBlockPosition: boolean,
  blockValue: number | null,
  inlineValue: number | null,
): string | undefined {
  if (isBlockPosition && blockValue != null) {
    return String(blockValue);
  }
  if (!isBlockPosition && inlineValue != null) {
    return String(inlineValue);
  }
  return undefined;
}
