export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}

export type Direction = "ltr" | "rtl";

export function getAttributes(el: HTMLElement, blockList: string[]): Record<string, any> {
  return Array.from(el.attributes)
    .filter((a) => a && !blockList.includes(a.name))
    .reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
}

export function getElementDir(el: HTMLElement): Direction {
  return getElementProp(el, "dir", "ltr", true) as Direction;
}

export function getElementProp(el: Element, prop: string, fallbackValue: any, crossShadowBoundary = false): any {
  const selector = `[${prop}]`;
  const closest = crossShadowBoundary ? closestElementCrossShadowBoundary(selector, el) : el.closest(selector);
  return closest ? closest.getAttribute(prop) : fallbackValue;
}

function closestElementCrossShadowBoundary<E extends Element = Element>(
  selector: string,
  base: Element = this
): E | null {
  // based on https://stackoverflow.com/q/54520554/194216
  function closestFrom(el): E | null {
    if (!el || el === document || el === window) {
      return null;
    }
    const found = el.closest(selector);
    return found ? found : closestFrom(el.getRootNode().host);
  }

  return closestFrom(base);
}

export interface CalciteFocusableElement extends HTMLElement {
  setFocus?: () => void;
}

export async function focusElement(el: CalciteFocusableElement): Promise<void> {
  if (!el) {
    return;
  }

  typeof el.setFocus === "function" ? el.setFocus() : el.focus();
}

interface GetSlottedOptions {
  all?: boolean;
  direct?: boolean;
  selector?: string;
}

export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName: string,
  options: GetSlottedOptions & { all: true }
): T[];
export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName: string,
  options?: GetSlottedOptions
): T | null;
export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName: string,
  options?: GetSlottedOptions
): (T | null) | T[] {
  const slotSelector = `[slot="${slotName}"]`;

  if (options?.all) {
    return queryMultiple<T>(element, slotSelector, options);
  }

  return querySingle<T>(element, slotSelector, options);
}

function queryMultiple<T extends Element = Element>(
  element: Element,
  slotSelector: string,
  options?: GetSlottedOptions
): T[] {
  let matches = Array.from(element.querySelectorAll<T>(slotSelector));
  matches = options && options.direct === false ? matches : matches.filter((el) => el.parentElement === element);

  const selector = options?.selector;
  return selector
    ? matches
        .map((item) => Array.from(item.querySelectorAll<T>(selector)))
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
        .filter((match) => !!match)
    : matches;
}

function querySingle<T extends Element = Element>(
  element: Element,
  slotSelector: string,
  options?: GetSlottedOptions
): T | null {
  let match = element.querySelector<T>(slotSelector);
  match = options && options.direct === false ? match : match?.parentElement === element ? match : null;

  const selector = options?.selector;
  return selector ? match.querySelector<T>(selector) : match;
}

export function filterDirectChildren<T extends Element>(el: Element, selector: string): T[] {
  return Array.from(el.children).filter((child): child is T => child.matches(selector));
}

export function getRootNode(element: HTMLElement): HTMLDocument | ShadowRoot {
  return element.getRootNode() as HTMLDocument | ShadowRoot;
}

export function getElementById(rootNode: HTMLDocument | ShadowRoot, id: string): HTMLElement {
  return id
    ? rootNode instanceof ShadowRoot
      ? rootNode.host.querySelector(`#${id}`)
      : rootNode.getElementById(id)
    : null;
}

export function hasLabel(labelEl: HTMLCalciteLabelElement, el: HTMLElement): boolean {
  return labelEl.contains(el);
}

// set a default icon from a defined set or allow an override with an icon name string
export function setRequestedIcon(
  iconObject: Record<string, string>,
  iconValue: string | boolean,
  matchedValue: string
): string {
  if (typeof iconValue === "string" && iconValue !== "") {
    return iconValue;
  } else if (iconValue === "") {
    return iconObject[matchedValue];
  }
}
