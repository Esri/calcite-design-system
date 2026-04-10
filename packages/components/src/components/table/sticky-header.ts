import { getTableScrollContainer, getTableTop } from "./scroll-container";

type TableHost = HTMLElement & {
  shadowRoot: ShadowRoot | null;
  stickyHeader?: boolean;
};

type FocusableTablePart = HTMLElement & {
  shadowRoot: ShadowRoot | null;
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

export function isStickyHeaderActive(table: HTMLElement): boolean {
  return getComputedStyle(table).getPropertyValue("--calcite-internal-table-header-active").trim() === "1";
}

export function ensureFocusedTableCellVisible(
  table: TableHost,
  cell: FocusableTablePart,
  isFirstVisibleBodyRow: boolean,
): void {
  const scrollContainer = getTableScrollContainer(table);
  const cellElement = getFocusableCellElement(cell);

  if (!scrollContainer || !cellElement) {
    return;
  }

  const { stickyHeaderHeight, stickyHeaderPosition } = getStickyHeaderState(table);

  const ensureFocusedBodyCellVisible = (): void => {
    const targetTop = getStickyAdjustedTargetTop(table, scrollContainer, stickyHeaderHeight, stickyHeaderPosition);

    if (targetTop == null) {
      return;
    }

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

  const retryEnsureFocusedBodyCellVisible = (remainingFrames = 5): void => {
    ensureFocusedBodyCellVisible();

    if (remainingFrames > 1) {
      requestAnimationFrame(() => retryEnsureFocusedBodyCellVisible(remainingFrames - 1));
    }
  };

  if (isFirstVisibleBodyRow && table.stickyHeader && stickyHeaderPosition === "sticky") {
    const correctFirstBodyRowPosition = (): void => {
      const targetTop = getStickyAdjustedTargetTop(table, scrollContainer, stickyHeaderHeight, stickyHeaderPosition);

      if (targetTop == null) {
        return;
      }

      const cellTop = cellElement.getBoundingClientRect().top;
      const scrollDelta = cellTop - targetTop;

      if (Math.abs(scrollDelta) > 0.5) {
        scrollContainer.scrollTop += scrollDelta;
      }
    };

    const retryCorrectFirstBodyRowPosition = (remainingFrames = 5): void => {
      correctFirstBodyRowPosition();

      if (remainingFrames > 1) {
        requestAnimationFrame(() => retryCorrectFirstBodyRowPosition(remainingFrames - 1));
      }
    };

    retryCorrectFirstBodyRowPosition();
    return;
  }

  retryEnsureFocusedBodyCellVisible();
}

export function ensureFirstVisibleTableCellBelowStickyHeader(table: TableHost, cell: FocusableTablePart | null): void {
  if (!table.stickyHeader || !cell) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const scrollContainer = getTableScrollContainer(table);
      const cellElement = getFocusableCellElement(cell);

      if (!scrollContainer || !cellElement) {
        return;
      }

      const { stickyHeaderHeight, stickyHeaderPosition } = getStickyHeaderState(table);

      if (stickyHeaderPosition !== "sticky" || !stickyHeaderHeight) {
        return;
      }

      const scrollContainerTop = scrollContainer.getBoundingClientRect().top;
      const tableTop = getTableTop(table, scrollContainer);

      if (tableTop == null) {
        return;
      }

      const targetTop = Math.max(scrollContainerTop, tableTop) + stickyHeaderHeight;
      const cellTop = cellElement.getBoundingClientRect().top;

      if (cellTop < targetTop) {
        scrollContainer.scrollTop += cellTop - targetTop;
      }
    });
  });
}
