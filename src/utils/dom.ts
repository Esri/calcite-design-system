import { CSS_UTILITY } from "./resources";
import { guid } from "./guid";

/**
 * This helper will guarantee an ID on the provided element.
 *
 * If it already has an ID, it will be preserved, otherwise a unique one will be generated and assigned.
 *
 * @returns {string} The element's ID.
 */
export function ensureId(el: Element): string {
  if (!el) {
    return "";
  }

  return (el.id = el.id || `${el.tagName.toLowerCase()}-${guid()}`);
}

export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}

export type Direction = "ltr" | "rtl";

export function getThemeName(el: HTMLElement): "light" | "dark" {
  return closestElementCrossShadowBoundary(el, `.${CSS_UTILITY.darkTheme}`) ? "dark" : "light";
}

export function getElementDir(el: HTMLElement): Direction {
  const prop = "dir";
  const selector = `[${prop}]`;
  const closest = closestElementCrossShadowBoundary(el, selector);
  return closest ? (closest.getAttribute(prop) as Direction) : "ltr";
}

export function getElementProp(el: Element, prop: string, fallbackValue: any): any {
  const selector = `[${prop}]`;
  const closest = el.closest(selector);
  return closest ? closest.getAttribute(prop) : fallbackValue;
}

export function getRootNode(el: Element): HTMLDocument | ShadowRoot {
  return el.getRootNode() as HTMLDocument | ShadowRoot;
}

export function getHost(root: HTMLDocument | ShadowRoot): Element | null {
  return (root as ShadowRoot).host || null;
}

// Queries an element's rootNode and any ancestor rootNodes.
// based on https://stackoverflow.com/q/54520554/194216
export function queryElementsRoots<T extends Element = Element>(element: Element, selector: string): T[] {
  // Gets the rootNode and any ancestor rootNodes (shadowRoot or document) of an element and queries them for a selector.
  function queryFromAll<T extends Element = Element>(el: Element, allResults: T[]): T[] {
    if (!el) {
      return allResults;
    }

    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }

    const rootNode = getRootNode(el);

    const results = Array.from(rootNode.querySelectorAll(selector)) as T[];

    const uniqueResults = results.filter((result) => !allResults.includes(result));

    allResults = [...allResults, ...uniqueResults];

    const host = getHost(rootNode);

    return host ? queryFromAll(host, allResults) : allResults;
  }

  return queryFromAll(element, []);
}

// Queries an element's rootNode and any ancestor rootNodes.
// based on https://stackoverflow.com/q/54520554/194216
export function queryElementRoots<T extends Element = Element>(element: Element, selector: string): T | null {
  // Gets the rootNode and any ancestor rootNodes (shadowRoot or document) of an element and queries them for a selector.
  function queryFrom<T extends Element = Element>(el: Element): T | null {
    if (!el) {
      return null;
    }

    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }

    const rootNode = getRootNode(el);

    const found = rootNode.querySelector(selector) as T;

    const host = getHost(rootNode);

    return found ? found : host ? queryFrom(host) : null;
  }

  return queryFrom(element);
}

export function closestElementCrossShadowBoundary<T extends Element = Element>(
  element: Element,
  selector: string
): T | null {
  // based on https://stackoverflow.com/q/54520554/194216
  function closestFrom<T extends Element = Element>(el: Element): T | null {
    return el ? el.closest(selector) || closestFrom(getHost(getRootNode(el))) : null;
  }

  return closestFrom(element);
}

export interface CalciteFocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}

export function isCalciteFocusable(el: CalciteFocusableElement): boolean {
  return typeof el?.setFocus === "function";
}

export async function focusElement(el: CalciteFocusableElement): Promise<void> {
  if (!el) {
    return;
  }

  return isCalciteFocusable(el) ? el.setFocus() : el.focus();
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

export function intersects(rect1: DOMRect, rect2: DOMRect): boolean {
  return !(
    rect2.left > rect1.right ||
    rect2.right < rect1.left ||
    rect2.top > rect1.bottom ||
    rect2.bottom < rect1.top
  );
}
