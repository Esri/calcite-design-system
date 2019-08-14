// turn a domNodeList into an array
export function nodeListToArray(domNodeList): Element[] {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

export function getElementDir(el: HTMLElement) {
  return getElementProp(el, "dir", "ltr");
}

export function getElementTheme(el: HTMLElement) {
  return getElementProp(el, "theme", "light");
}

export function getElementProp(el: HTMLElement, prop, value) {
  const closestWithProp = el.closest(`[${prop}]`);
  return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}

export function hasSlottedContent(el: HTMLSlotElement) {
  const assignedNodes = el && el.assignedNodes();
  return assignedNodes && assignedNodes.length > 0;
}
