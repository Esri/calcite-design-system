type TableHost = HTMLElement & {
  shadowRoot: ShadowRoot | null;
};

export const tableScrollContainerSelector = "[data-scroll-container]";

export function getTableScrollContainer(table: TableHost): HTMLDivElement | null {
  return table.shadowRoot?.querySelector(tableScrollContainerSelector) as HTMLDivElement | null;
}

export function getTableTop(table: TableHost, scrollContainer?: HTMLElement | null): number | null {
  const tableElement = table.shadowRoot?.querySelector("table");

  if (tableElement instanceof HTMLElement) {
    return tableElement.getBoundingClientRect().top;
  }

  return scrollContainer?.getBoundingClientRect().top ?? null;
}
