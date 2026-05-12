export type FocusableCell = HTMLElement & {
  getCellElement?: () => HTMLElement | null;
  numberCell?: boolean;
  selectionCell?: boolean;
};

export function createFocusableRowCells(
  renderedCells: FocusableCell[],
  slottedCells: FocusableCell[],
): FocusableCell[] {
  return renderedCells.concat(slottedCells);
}

export function getFocusableRowCell(
  cells: FocusableCell[],
  position: number,
  lastCell?: boolean,
): FocusableCell | null {
  if (!cells.length) {
    return null;
  }

  return lastCell ? cells[cells.length - 1] : cells[position - 1] || null;
}
