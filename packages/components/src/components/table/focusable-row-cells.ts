type FocusableCell = HTMLElement & {
  numberCell?: boolean;
  selectionCell?: boolean;
};

type FocusableRow = HTMLElement & {
  shadowRoot: ShadowRoot | null;
};

export function getFocusableRowCells(row: FocusableRow): FocusableCell[] {
  const slottedCells = Array.from(row.querySelectorAll<FocusableCell>("calcite-table-cell, calcite-table-header"));

  const renderedCells = Array.from(
    row.shadowRoot?.querySelectorAll<FocusableCell>("calcite-table-header, calcite-table-cell") || [],
  ).filter((cell) => cell.numberCell || cell.selectionCell);

  return renderedCells.concat(slottedCells);
}

export function getFocusableRowCell(row: FocusableRow, position: number, lastCell?: boolean): FocusableCell | null {
  const cells = getFocusableRowCells(row);

  if (!cells.length) {
    return null;
  }

  return lastCell ? cells[cells.length - 1] : cells[position - 1] || null;
}
