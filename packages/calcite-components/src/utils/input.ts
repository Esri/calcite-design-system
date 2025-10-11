/**
 * Determines if all the text typed into an input is currently selected or not.
 *
 * @param inputEl HTMLInputElement
 * @returns boolean
 */
export function allTextSelected(inputEl: HTMLInputElement): boolean {
  if (!inputEl) {
    return false;
  }
  const selectionIndexStart = inputEl.selectionStart;
  const selectionIndexEnd = inputEl.selectionEnd;
  const valueLength = inputEl.value.length;
  if (
    typeof selectionIndexStart !== "number" ||
    typeof selectionIndexEnd !== "number" ||
    typeof valueLength !== "number"
  ) {
    return false;
  }
  return valueLength === Math.abs(selectionIndexEnd - selectionIndexStart);
}
