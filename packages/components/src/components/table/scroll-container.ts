export function getTableTop(tableElement?: HTMLElement | null, scrollContainer?: HTMLElement | null): number | null {
  if (tableElement) {
    return tableElement.getBoundingClientRect().top;
  }

  return scrollContainer?.getBoundingClientRect().top ?? null;
}
