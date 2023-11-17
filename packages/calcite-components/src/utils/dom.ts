import { tabbable } from "tabbable";
import { guid } from "./guid";
import { CSS_UTILITY } from "./resources";

/**
 * The default `focus-trap/tabbable` options.
 *
 * See https://github.com/focus-trap/tabbable#tabbable
 */
export const tabbableOptions = {
  getShadowRoot: true,
};

/**
 * This helper will guarantee an ID on the provided element.
 *
 * If it already has an ID, it will be preserved, otherwise a unique one will be generated and assigned.
 *
 * @param {Element} el An element.
 * @returns {string} The element's ID.
 */
export function ensureId(el: Element): string {
  if (!el) {
    return "";
  }

  return (el.id = el.id || `${el.tagName.toLowerCase()}-${guid()}`);
}

/**
 * This helper returns an array from a NodeList.
 *
 * @param {NodeList} nodeList A NodeList.
 * @returns {Element[]} An array of elements.
 */
export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}

export type Direction = "ltr" | "rtl";

/**
 * This helper returns the Calcite "mode" of an element.
 *
 * @param {HTMLElement} el An element.
 * @returns {"light"|"dark"} The Calcite mode.
 */
export function getModeName(el: HTMLElement): "light" | "dark" {
  const closestElWithMode = closestElementCrossShadowBoundary(
    el,
    `.${CSS_UTILITY.darkMode}, .${CSS_UTILITY.lightMode}`
  );
  return closestElWithMode?.classList.contains("calcite-mode-dark") ? "dark" : "light";
}

/**
 * This helper returns the direction of a HTML element.
 *
 * @param {HTMLElement} el An element.
 * @returns {Direction} The direction.
 */
export function getElementDir(el: HTMLElement): Direction {
  const prop = "dir";
  const selector = `[${prop}]`;
  const closest = closestElementCrossShadowBoundary(el, selector);
  return closest ? (closest.getAttribute(prop) as Direction) : "ltr";
}

/**
 * This helper returns the value of an attribute on an element.
 *
 * @param {HTMLElement} el An element.
 * @param {string} attribute An attribute name.
 * @param {any} fallbackValue A fallback value.
 * @returns {any} The value.
 * @deprecated
 */
export function getElementProp(el: Element, attribute: string, fallbackValue: any): any {
  const selector = `[${attribute}]`;
  const closest = el.closest(selector);
  return closest ? closest.getAttribute(attribute) : fallbackValue;
}

/**
 * This helper returns the computed width in pixels of a rendered HTMLElement.
 *
 * @param {HTMLElement} el An element.
 * @returns {number} The element's width.
 */
export function getElementWidth(el: HTMLElement): number {
  if (!el) {
    return 0;
  }
  return parseFloat(getComputedStyle(el).inlineSize);
}

/**
 * This helper returns the rootNode of an element.
 *
 * @param {Element} el An element.
 * @returns {Document|ShadowRoot} The element's root node.
 */
export function getRootNode(el: Element): Document | ShadowRoot {
  return el.getRootNode() as Document | ShadowRoot;
}

/**
 * This helper returns the node's shadowRoot root node if it exists.
 *
 * @param {Element} el The element.
 * @returns {ShadowRoot|null} The element's root node ShadowRoot.
 */
export function getShadowRootNode(el: Element): ShadowRoot | null {
  const rootNode = getRootNode(el);
  return "host" in rootNode ? rootNode : null;
}

/**
 * This helper returns the computed width in pixels a given text string takes up on screen.
 *
 * See https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
 *
 * @param {string} text The string of text to measure.
 * @param {string} font The CSS font attribute's value, which should include size and face, e.g. "12px Arial".
 */
export function getTextWidth(text: string, font: string): number {
  if (!text) {
    return 0;
  }
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  return Math.ceil(context.measureText(text).width);
}
/**
 * This helper returns the host of a ShadowRoot.
 *
 * @param {Document | ShadowRoot} root A root element.
 * @returns {Element | null} The host element.
 */
export function getHost(root: Document | ShadowRoot): Element | null {
  return (root as ShadowRoot).host || null;
}

/**
 * This helper queries an element's rootNode and any ancestor rootNodes.
 *
 * If both an 'id' and 'selector' are supplied, 'id' will take precedence over 'selector'.
 *
 * @param {Element} element An element.
 * @param root0
 * @param root0.selector
 * @param root0.id
 * @returns {Element} An element.
 */
export function queryElementRoots<T extends Element = Element>(
  element: Element,
  {
    selector,
    id,
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
          https://github.com/Esri/calcite-design-system/pull/4280
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

/**
 * This helper returns the closest element matching the selector by crossing he shadow boundary if necessary.
 *
 * @param {Element} element The starting element.
 * @param {string} selector The selector.
 * @returns {Element} The targeted element.
 */
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
 * @param {Element} element An element.
 * @param {(node: Node) => Element} onVisit The callback.
 * @returns {Element} The result.
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

/**
 * This helper returns true when an element has the descendant in question.
 *
 * @param {Element} element The starting element.
 * @param {Element} maybeDescendant The descendant.
 * @returns {boolean} The result.
 */
export function containsCrossShadowBoundary(element: Element, maybeDescendant: Element): boolean {
  return !!walkUpAncestry(maybeDescendant, (node) => (node === element ? true : undefined));
}

/**
 * An element which may contain a `setFocus` method.
 */
export interface FocusableElement extends HTMLElement {
  setFocus?: () => Promise<void>;
}

/**
 * This helper returns true when an element has a setFocus method.
 *
 * @param {Element} el An element.
 * @returns {boolean} The result.
 */
export function isCalciteFocusable(el: FocusableElement): boolean {
  return typeof el?.setFocus === "function";
}

/**
 * This helper focuses an element using the `setFocus` method if available and falls back to using the `focus` method if not available.
 *
 * @param {Element} el An element.
 */
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
 * @param {Element} element An element.
 * @param {string} slotName The slot name.
 * @param {GetSlottedOptions & { all: true }} options The options.
 * @returns {Element | Element[] | null} returns element(s) or null.
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

/**
 * Filters direct children.
 *
 * @param {Element} el An element.
 * @param {string} selector The selector.
 * @returns {Element[]} An array of elements.
 */
export function filterDirectChildren<T extends Element>(el: Element, selector: string): T[] {
  return Array.from(el.children).filter((child): child is T => child.matches(selector));
}

/**
 * Set a default icon from a defined set or allow an override with an icon name string
 *
 * @param {Record<string, string>} iconObject The icon object.
 * @param {string | boolean} iconValue The icon value.
 * @param {string} matchedValue The matched value.
 * @returns {string|undefined} The resulting icon value.
 */
export function setRequestedIcon(
  iconObject: Record<string, string>,
  iconValue: string | boolean,
  matchedValue: string
): string | undefined {
  if (typeof iconValue === "string" && iconValue !== "") {
    return iconValue;
  } else if (iconValue === "") {
    return iconObject[matchedValue];
  }
}

/**
 * This helper returns true when two rectangles intersect.
 *
 * @param {DOMRect} rect1 The first rectangle.
 * @param {DOMRect} rect2 The second rectangle.
 * @returns {boolean} The result.
 */
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
 * @param {boolean} value The value.
 * @returns {string} The string conversion of a boolean value ("true" | "false").
 */
export function toAriaBoolean(value: boolean): string {
  return Boolean(value).toString();
}

/**
 * This helper returns `true` if the target `slot` element from the `onSlotchange` event has any content (text or elements).
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasContent = slotChangeHasContent(event)} />}
 * ```
 *
 * @param {Event} event The event.
 * @returns {boolean} Whether the slot has any content.
 */
export function slotChangeHasContent(event: Event): boolean {
  return slotChangeHasAssignedElement(event) || slotChangeHasTextContent(event);
}

/**
 * This helper returns a string of textContent if the target `slot` element from the `onSlotchange` event has any text content.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotText = slotChangeGetTextContent(event)} />}
 * ```
 *
 * @param {Event} event The event.
 * @returns {string} The slots text.
 */
export function slotChangeGetTextContent(event: Event): string {
  return slotChangeGetAssignedNodes(event)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent)
    .join("")
    .trim();
}

/**
 * This helper returns `true` if the target `slot` element from the `onSlotchange` event has any text content.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasTextContent = slotChangeHasTextContent(event)} />}
 * ```
 *
 * @param {Event} event The event.
 * @returns {boolean} Whether the slot has any text content.
 */
export function slotChangeHasTextContent(event: Event): boolean {
  return !!slotChangeGetTextContent(event);
}

/**
 * This helper returns `true` if the target `slot` element from the `onSlotchange` event has an assigned node.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasNode = slotChangeHasAssignedNode(event)} />}
 * ```
 *
 * @param {Event} event The event.
 * @returns {boolean} Whether the slot has any assigned nodes.
 */
export function slotChangeHasAssignedNode(event: Event): boolean {
  return !!slotChangeGetAssignedNodes(event).length;
}

/**
 * This helper returns the assigned nodes on a `slot` element from the `onSlotchange` event.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotNodes = slotChangeGetAssignedNodes(event)} />}
 * ```
 *
 * @param {Event} event The event.
 * @returns {boolean} Whether the slot has any assigned nodes.
 */
export function slotChangeGetAssignedNodes(event: Event): Node[] {
  return (event.target as HTMLSlotElement).assignedNodes({
    flatten: true,
  });
}

/**
 * This helper returns `true` if the target `slot` element from the `onSlotchange` event has an assigned element.
 *
 * ```
 * <slot onSlotchange={(event) => this.mySlotHasElement = slotChangeHasAssignedElement(event)} />}
 * ```
 *
 * @param {Event} event The event.
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
 * @param {Event} event The event.
 * @returns {boolean} Whether the slot has any assigned elements.
 */
export function slotChangeGetAssignedElements(event: Event): Element[] {
  return (event.target as HTMLSlotElement).assignedElements({
    flatten: true,
  });
}

/**
 * This helper returns true if the pointer event fired from the primary button of the device.
 *
 * See https://www.w3.org/TR/pointerevents/#the-button-property.
 *
 * @param {PointerEvent} event The pointer event.
 * @returns {boolean} The value.
 */
export function isPrimaryPointerButton(event: PointerEvent): boolean {
  return !!(event.isPrimary && event.button === 0);
}

export type FocusElementInGroupDestination = "first" | "last" | "next" | "previous";

/**
 * This helper sets focus on and returns a destination element from within a group of provided elements.
 *
 * @param {Element[]} elements An array of elements.
 * @param {Element} currentElement The current element.
 * @param {FocusElementInGroupDestination} destination The target destination element to focus.
 * @param {boolean} cycle Should navigation cycle through elements or stop at extent - defaults to true.
 * @returns {Element} The focused element
 */
export const focusElementInGroup = (
  elements: Element[],
  currentElement: Element,
  destination: FocusElementInGroupDestination,
  cycle = true
): Element => {
  const currentIndex = elements.indexOf(currentElement);
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === elements.length - 1;
  if (cycle) {
    destination =
      destination === "previous" && isFirstItem ? "last" : destination === "next" && isLastItem ? "first" : destination;
  }

  let focusTarget;
  if (destination === "previous") {
    focusTarget = elements[currentIndex - 1] || elements[cycle ? elements.length - 1 : currentIndex];
  } else if (destination === "next") {
    focusTarget = elements[currentIndex + 1] || elements[cycle ? 0 : currentIndex];
  } else if (destination === "last") {
    focusTarget = elements[elements.length - 1];
  } else {
    focusTarget = elements[0];
  }

  focusElement(focusTarget);
  return focusTarget;
};

/**
 * This helper determines if an element is before another element in the DOM.
 *
 * @param a the reference element to compare
 * @param b the element to compare against
 *
 * @returns true when a is before b in the DOM
 */
export function isBefore(a: HTMLElement, b: HTMLElement): boolean {
  if (a.parentNode !== b.parentNode) {
    return false;
  }

  const children = Array.from(a.parentNode.children);
  return children.indexOf(a) < children.indexOf(b);
}
