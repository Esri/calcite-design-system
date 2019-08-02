// turn a domNodeList into an array
export function nodeListToArray(domNodeList): Element[] {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

export function getElementDir(el: HTMLElement) {
  return (el.closest("[dir='rtl']") && "rtl") || "ltr";
}

export function getElementTheme(el: HTMLElement) {
  return (el.closest("[theme='dark']") && "dark") || "light";
}

export function hasSlottedContent(el: HTMLSlotElement) {
  const assignedNodes = el && el.assignedNodes();
  return assignedNodes && assignedNodes.length > 0;
}