type TableHost = HTMLElement & {
  stickyHeader?: boolean;
};

type FocusableTablePart = HTMLElement & {
  getCellElement?: () => HTMLElement | null;
};

export type StickyTableMeasurements = {
  table: TableHost;
  getScrollContainer: () => HTMLElement | null;
  getTableTop: (scrollContainer?: HTMLElement | null) => number | null;
};

type StickyMeasurementContext = {
  cellElement: HTMLElement;
  scrollContainer: HTMLElement;
  targetTop: number;
};

function getStickyHeaderState(table: HTMLElement): {
  stickyHeaderHeight: number;
  stickyHeaderPosition: string;
} {
  const tableStyles = getComputedStyle(table);
  const stickyHeaderPosition = tableStyles.getPropertyValue("--calcite-internal-table-header-position").trim();
  const stickyHeaderHeight = parseFloat(
    tableStyles.getPropertyValue("--calcite-internal-table-sticky-header-total-height"),
  );

  return {
    stickyHeaderHeight: Number.isFinite(stickyHeaderHeight) ? stickyHeaderHeight : 0,
    stickyHeaderPosition,
  };
}

function getFocusableCellElement(cell: FocusableTablePart | null): HTMLElement | null {
  return cell?.getCellElement() || null;
}

function getStickyAdjustedTargetTop(
  tableState: StickyTableMeasurements,
  scrollContainer: HTMLElement,
  stickyHeaderHeight: number,
  stickyHeaderPosition: string,
): number | null {
  const scrollContainerTop = scrollContainer.getBoundingClientRect().top + scrollContainer.clientTop;
  const tableTop = tableState.getTableTop(scrollContainer);
  const stickyHeaderOffset =
    tableState.table.stickyHeader && stickyHeaderPosition === "sticky" ? stickyHeaderHeight : 0;

  if (tableTop == null) {
    return scrollContainerTop + stickyHeaderOffset;
  }

  return Math.max(scrollContainerTop, tableTop) + stickyHeaderOffset;
}

function getMeasurementContext(
  tableState: StickyTableMeasurements,
  cell: FocusableTablePart | null,
): StickyMeasurementContext | null {
  const scrollContainer = tableState.getScrollContainer();
  const cellElement = getFocusableCellElement(cell);

  if (!scrollContainer || !cellElement || !tableState.table.isConnected || !cellElement.isConnected) {
    return null;
  }

  const { stickyHeaderHeight, stickyHeaderPosition } = getStickyHeaderState(tableState.table);

  const targetTop = getStickyAdjustedTargetTop(tableState, scrollContainer, stickyHeaderHeight, stickyHeaderPosition);

  if (targetTop == null) {
    return null;
  }

  return {
    cellElement,
    scrollContainer,
    targetTop,
  };
}

function getStickyMeasurementContext(
  tableState: StickyTableMeasurements,
  cell: FocusableTablePart | null,
): StickyMeasurementContext | null {
  const context = getMeasurementContext(tableState, cell);

  if (!context) {
    return null;
  }

  const { stickyHeaderHeight, stickyHeaderPosition } = getStickyHeaderState(tableState.table);

  if (stickyHeaderPosition !== "sticky" || !stickyHeaderHeight) {
    return null;
  }

  return context;
}

function retryWithMeasurements(
  tableState: StickyTableMeasurements,
  cell: FocusableTablePart | null,
  callback: (context: StickyMeasurementContext) => void,
  remainingFrames = 5,
): void {
  const context = getMeasurementContext(tableState, cell);

  if (context) {
    callback(context);
  }

  if (remainingFrames > 1) {
    requestAnimationFrame(() => {
      retryWithMeasurements(tableState, cell, callback, remainingFrames - 1);
    });
  }
}

function retryWithStickyMeasurements(
  tableState: StickyTableMeasurements,
  cell: FocusableTablePart | null,
  callback: (context: StickyMeasurementContext) => void,
  remainingFrames = 5,
): void {
  const context = getStickyMeasurementContext(tableState, cell);

  if (context) {
    callback(context);
  }

  if (remainingFrames > 1) {
    requestAnimationFrame(() => {
      retryWithStickyMeasurements(tableState, cell, callback, remainingFrames - 1);
    });
  }
}

export function ensureFocusedTableCellVisible(tableState: StickyTableMeasurements, cell: FocusableTablePart): void {
  const ensureFocusedBodyCellVisible = ({
    cellElement,
    scrollContainer,
    targetTop,
  }: StickyMeasurementContext): void => {
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const cellRect = cellElement.getBoundingClientRect();
    const visibleViewportBottom = scrollContainerRect.top + scrollContainer.clientTop + scrollContainer.clientHeight;

    if (cellRect.top < targetTop) {
      scrollContainer.scrollTop += cellRect.top - targetTop;
      return;
    }

    if (cellRect.bottom > visibleViewportBottom) {
      scrollContainer.scrollTop += cellRect.bottom - visibleViewportBottom;
    }
  };

  retryWithMeasurements(tableState, cell, ensureFocusedBodyCellVisible);
}

export function ensureFirstVisibleTableCellBelowStickyHeader(
  tableState: StickyTableMeasurements,
  cell: FocusableTablePart | null,
): void {
  if (!tableState.table.stickyHeader || !cell) {
    return;
  }

  retryWithStickyMeasurements(
    tableState,
    cell,
    ({ cellElement, scrollContainer, targetTop }: StickyMeasurementContext) => {
      const cellTop = cellElement.getBoundingClientRect().top;

      if (cellTop < targetTop) {
        scrollContainer.scrollTop += cellTop - targetTop;
      }
    },
    5,
  );
}
