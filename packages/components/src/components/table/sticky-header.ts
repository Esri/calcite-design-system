type TableHost = HTMLElement & {
  shadowRoot: ShadowRoot | null;
};

export const stickyHeaderScrollContainerSelector = "[data-scroll-container]";

export function getStickyHeaderScrollContainer(table: TableHost): HTMLDivElement | null {
  return table.shadowRoot?.querySelector(stickyHeaderScrollContainerSelector) as HTMLDivElement | null;
}

export function getStickyHeaderTableTop(table: TableHost, scrollContainer?: HTMLElement | null): number | null {
  const tableElement = table.shadowRoot?.querySelector("table");

  if (tableElement instanceof HTMLElement) {
    return tableElement.getBoundingClientRect().top;
  }

  return scrollContainer?.getBoundingClientRect().top ?? null;
}
