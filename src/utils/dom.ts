import { tabbable } from "tabbable";
import { guid } from "./guid";
import { CSS_UTILITY } from "./resources";

export const tabbableOptions = {
  getShadowRoot: true
};
/**
 * This helper will guarantee an ID on the provided element.
 *
 * If it already has an ID, it will be preserved, otherwise a unique one will be generated and assigned.
 *
 * @param el
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

export function getModeName(el: HTMLElement): "light" | "dark" {
  const closestElWithMode = closestElementCrossShadowBoundary(
    el,
    `.${CSS_UTILITY.darkMode}, .${CSS_UTILITY.lightMode}`
  );
  return closestElWithMode?.classList.contains("calcite-mode-dark") ? "dark" : "light";
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

export function getRootNode(el: Element): Document | ShadowRoot {
  return el.getRootNode() as Document | ShadowRoot;
}

export function getHost(root: Document | ShadowRoot): Element | null {
  return (root as ShadowRoot).host || null;
}

/**
 * This helper queries an element's rootNode and any ancestor rootNodes.
 *
 * If both an 'id' and 'selector' are supplied, 'id' will take precedence over 'selector'.
 *
 * @param element
 * @param root0
 * @param root0.selector
 * @param root0.id
 * @returns {Element} The element.
 */
export function queryElementRoots<T extends Element = Element>(
  element: Element,
  {
    selector,
    id
  }: {
    selector?: string;
    id?: string;
  }
): T | null {
  // Gets the rootNode and any ancestor rootNodes (shadowRoot or document) of an element and queries them for a selector.
  // Based on: https://stackoverflow.com/q/54520554/194216
  function queryFrom<T extends Element = Element>(el: Element): T | null {
    if (!el) {
      return null;
    }

    if ((el as Slottable).assignedSlot) {
      el = (el as Slottable).assignedSlot;
    }

    const rootNode = getRootNode(el);

    const found = id
      ? "getElementById" in rootNode
        ? /*
          Check to make sure 'getElementById' exists in cases where element is no longer connected to the DOM and getRootNode() returns the element.
          https://github.com/Esri/calcite-components/pull/4280
           */
          (rootNode.getElementById(id) as Element as T)
        : null
      : selector
      ? (rootNode.querySelector(selector) as T)
      : null;

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

/**
 * This utility helps invoke a callback as it traverses a node and its ancestors until reaching the root document.
 *
 * Returning early or undefined in `onVisit` will continue traversing up the DOM tree. Otherwise, traversal will halt with the returned value as the result of the function
 *
 * @param element
 * @param onVisit
 */
export function walkUpAncestry<T = any>(element: Element, onVisit: (node: Node) => T): T {
  return visit(element, onVisit);
}

function visit<T = any>(node: Node, onVisit: (node: Node) => T): T {
  if (!node) {
    return;
  }

  const result = onVisit(node);
  if (result !== undefined) {
    return result;
  }

  const { parentNode } = node;

  return visit(parentNode instanceof ShadowRoot ? parentNode.host : parentNode, onVisit);
}

export function containsCrossShadowBoundary(element: Element, maybeDescendant: Element): boolean {
  return !!walkUpAncestry(maybeDescendant, (node) => (node === element ? true : undefined));
}

export interface FocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}

export function isCalciteFocusable(el: FocusableElement): boolean {
  return typeof el?.setFocus === "function";
}

export async function focusElement(el: FocusableElement): Promise<void> {
  if (!el) {
    return;
  }

  return isCalciteFocusable(el) ? el.setFocus() : el.focus();
}

/**
 * Helper to focus the first tabbable element.
 *
 * @param {HTMLElement} element The html element containing tabbable elements.
 */
export function focusFirstTabbable(element: HTMLElement): void {
  if (!element) {
    return;
  }

  (tabbable(element, tabbableOptions)[0] || element).focus();
}

interface GetSlottedOptions {
  all?: boolean;
  direct?: boolean;
  matches?: string;
  selector?: string;
}

const defaultSlotSelector = ":not([slot])";

/**
 * Gets slotted elements for a named slot.
 *
 * @param element
 * @param slotName
 * @param options
 * @deprecated Use `onSlotchange` event instead.
 *
 * ```
 * <slot onSlotchange={(event) => this.myElements = slotChangeGetAssignedElements(event)} />}
 * ```
 */
export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName: string | string[] | (GetSlottedOptions & { all: true }),
  options: GetSlottedOptions & { all: true }
): T[];
export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName?: string | string[] | GetSlottedOptions,
  options?: GetSlottedOptions
): T | null;
export function getSlotted<T extends Element = Element>(
  element: Element,
  slotName?: string | string[] | GetSlottedOptions,
  options?: GetSlottedOptions
): (T | null) | T[] {
  if (slotName && !Array.isArray(slotName) && typeof slotName !== "string") {
    options = slotName;
    slotName = null;
  }

  const slotSelector = slotName
    ? Array.isArray(slotName)
      ? slotName.map((name) => `[slot="${name}"]`).join(",")
      : `[slot="${slotName}"]`
    : defaultSlotSelector;

  if (options?.all) {
    return queryMultiple<T>(element, slotSelector, options);
  }

  return querySingle<T>(element, slotSelector, options);
}

function getDirectChildren<T extends Element = Element>(el: Element, selector: string): T[] {
  return el ? (Array.from(el.children || []) as T[]).filter((child) => child?.matches(selector)) : [];
}

function queryMultiple<T extends Element = Element>(
  element: Element,
  slotSelector: string,
  options?: GetSlottedOptions
): T[] {
  let matches =
    slotSelector === defaultSlotSelector
      ? getDirectChildren<T>(element, defaultSlotSelector)
      : Array.from(element.querySelectorAll<T>(slotSelector));

  matches = options && options.direct === false ? matches : matches.filter((el) => el.parentElement === element);

  matches = options?.matches ? matches.filter((el) => el?.matches(options.matches)) : matches;

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
  let match =
    slotSelector === defaultSlotSelector
      ? getDirectChildren<T>(element, defaultSlotSelector)[0] || null
      : element.querySelector<T>(slotSelector);

  match = options && options.direct === false ? match : match?.parentElement === element ? match : null;

  match = options?.matches ? (match?.matches(options.matches) ? match : null) : match;

  const selector = options?.selector;
  return selector ? match?.querySelector<T>(selector) : match;
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

/**
 * This helper makes sure that boolean aria attributes are properly converted to a string.
 *
 * It should only be used for aria attributes that require a string value of "true" or "false".
 *
 * @param value
 * @returns {string} The string conversion of a boolean value ("true" | "false").
 */
export function toAriaBoolean(value: boolean): string {
  return Boolean(value).toString();
}

/**
 * This helper returns `true` if the target `slot` element from the `onSlotchange` event has an assigned element.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasElement = slotChangeHasAssignedElement(event)} />}
 * ```
 *
 * @param event
 * @returns {boolean} Whether the slot has any assigned elements.
 */
export function slotChangeHasAssignedElement(event: Event): boolean {
  return !!slotChangeGetAssignedElements(event).length;
}

/**
 * This helper returns the assigned elements on a `slot` element from the `onSlotchange` event.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotElements = slotChangeGetAssignedElements(event)} />}
 * ```
 *
 * @param event
 * @returns {boolean} Whether the slot has any assigned elements.
 */
export function slotChangeGetAssignedElements(event: Event): Element[] {
  return (event.target as HTMLSlotElement).assignedElements({
    flatten: true
  });
}

/**
 * This helper returns true if the pointer event fired from the primary button of the device.
 *
 * See https://www.w3.org/TR/pointerevents/#the-button-property.
 *
 * @param event
 * @returns {boolean}
 */
export function isPrimaryPointerButton(event: PointerEvent): boolean {
  return !!(event.isPrimary && event.button === 0);
}

/**
 * This helper sets focus on and returns a destination element from within a group of provided elements.
 *
 * @param elements An array of elements
 * @param currentElement The current element
 * @param destination The target destination element to focus
 * @returns {Element} The focused element
 */

export type FocusElementInGroupDestination = "first" | "last" | "next" | "previous" | "current";

export const focusElementInGroup = (
  elements: Element[],
  currentElement: Element,
  destination: FocusElementInGroupDestination
): Element => {
  const currentIndex = elements.indexOf(currentElement);
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === elements.length - 1;
  destination =
    (destination === "previous" && isFirstItem) || (destination === "next" && isLastItem) ? "current" : destination;

  let focusTarget;
  switch (destination) {
    case "first":
      focusTarget = elements[0];
      break;
    case "last":
      focusTarget = elements[elements.length - 1];
      break;
    case "next":
      focusTarget = elements[currentIndex + 1];
      break;
    case "previous":
      focusTarget = elements[currentIndex - 1];
      break;
    case "current":
      focusTarget = elements[currentIndex];
  }

  focusElement(focusTarget);
  return focusTarget;
};
