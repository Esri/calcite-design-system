import { getTableScrollContainer, getTableTop } from "./scroll-container";

type TableHost = HTMLElement & {
  shadowRoot: ShadowRoot | null;
  stickyHeader?: boolean;
};

type FocusableTablePart = HTMLElement & {
  shadowRoot: ShadowRoot | null;
};

type StickyMeasurementContext = {
  cellElement: HTMLElement;
  scrollContainer: HTMLElement;
  stickyHeaderHeight: number;
  stickyHeaderPosition: string;
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
  return (cell?.shadowRoot?.querySelector("td, th") as HTMLElement) || null;
}

function getStickyAdjustedTargetTop(
  table: TableHost,
  scrollContainer: HTMLElement,
  stickyHeaderHeight: number,
  stickyHeaderPosition: string,
): number | null {
  const scrollContainerTop = scrollContainer.getBoundingClientRect().top + scrollContainer.clientTop;
  const tableTop = getTableTop(table, scrollContainer);
  const stickyHeaderOffset = table.stickyHeader && stickyHeaderPosition === "sticky" ? stickyHeaderHeight : 0;

  if (tableTop == null) {
    return scrollContainerTop + stickyHeaderOffset;
  }

  return Math.max(scrollContainerTop, tableTop) + stickyHeaderOffset;
}

function getStickyMeasurementContext(
  table: TableHost,
  cell: FocusableTablePart | null,
  requireStickyHeader = false,
): StickyMeasurementContext | null {
  const scrollContainer = getTableScrollContainer(table);
  const cellElement = getFocusableCellElement(cell);

  if (!scrollContainer || !cellElement || !table.isConnected || !cellElement.isConnected) {
    return null;
  }

  const { stickyHeaderHeight, stickyHeaderPosition } = getStickyHeaderState(table);

  if (requireStickyHeader && (stickyHeaderPosition !== "sticky" || !stickyHeaderHeight)) {
    return null;
  }

  const targetTop = getStickyAdjustedTargetTop(table, scrollContainer, stickyHeaderHeight, stickyHeaderPosition);

  if (targetTop == null) {
    return null;
  }

  return {
    cellElement,
    scrollContainer,
    stickyHeaderHeight,
    stickyHeaderPosition,
    targetTop,
  };
}

function retryWithStickyMeasurements(
  table: TableHost,
  cell: FocusableTablePart | null,
  callback: (context: StickyMeasurementContext) => void,
  remainingFrames = 5,
  requireStickyHeader = false,
): void {
  const context = getStickyMeasurementContext(table, cell, requireStickyHeader);

  if (context) {
    callback(context);
  }

  if (remainingFrames > 1) {
    requestAnimationFrame(() => {
      retryWithStickyMeasurements(table, cell, callback, remainingFrames - 1, requireStickyHeader);
    });
  }
}

export function ensureFocusedTableCellVisible(
  table: TableHost,
  cell: FocusableTablePart,
  isFirstVisibleBodyRow: boolean,
): void {
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

  if (isFirstVisibleBodyRow && table.stickyHeader) {
    const correctFirstBodyRowPosition = ({
      cellElement,
      scrollContainer,
      targetTop,
    }: StickyMeasurementContext): void => {
      const cellTop = cellElement.getBoundingClientRect().top;
      const scrollDelta = cellTop - targetTop;

      if (Math.abs(scrollDelta) > 0.5) {
        scrollContainer.scrollTop += scrollDelta;
      }
    };

    retryWithStickyMeasurements(table, cell, correctFirstBodyRowPosition, 5, true);
    return;
  }

  retryWithStickyMeasurements(table, cell, ensureFocusedBodyCellVisible);
}

export function ensureFirstVisibleTableCellBelowStickyHeader(table: TableHost, cell: FocusableTablePart | null): void {
  if (!table.stickyHeader || !cell) {
    return;
  }

  retryWithStickyMeasurements(
    table,
    cell,
    ({ cellElement, scrollContainer, targetTop }: StickyMeasurementContext) => {
      const cellTop = cellElement.getBoundingClientRect().top;

      if (cellTop < targetTop) {
        scrollContainer.scrollTop += cellTop - targetTop;
      }
    },
    5,
    true,
  );
}
