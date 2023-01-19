/**
 * This module provides utils to fix positioning across shadow DOM in non-Chromium browsers
 *
 * It is based on floating-ui's distributable
 */

/**
 * 👇 the following are needed to fix shadow DOM positioning 👇️
 *
 * @param element
 */
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }

  return composedOffsetParent(element);
}

/**
 * Polyfills the old offsetParent behavior from before the spec was changed:
 * https://github.com/w3c/csswg-drafts/issues/159
 *
 * @param element
 */
function composedOffsetParent(element) {
  let { offsetParent } = element;
  let ancestor = element;
  let foundInsideSlot = false;

  while (ancestor && ancestor !== offsetParent) {
    const { assignedSlot } = ancestor;

    if (assignedSlot) {
      let newOffsetParent = assignedSlot.offsetParent;

      if (getComputedStyle(assignedSlot).display === "contents") {
        const hadStyleAttribute = assignedSlot.hasAttribute("style");
        const oldDisplay = assignedSlot.style.display;
        assignedSlot.style.display = getComputedStyle(ancestor).display;
        newOffsetParent = assignedSlot.offsetParent;
        assignedSlot.style.display = oldDisplay;

        if (!hadStyleAttribute) {
          assignedSlot.removeAttribute("style");
        }
      }

      ancestor = assignedSlot;

      if (offsetParent !== newOffsetParent) {
        offsetParent = newOffsetParent;
        foundInsideSlot = true;
      }
    } else if (isShadowRoot(ancestor) && ancestor.host && foundInsideSlot) {
      break;
    }

    ancestor = (isShadowRoot(ancestor) && ancestor.host) || ancestor.parentNode;
  }

  return offsetParent;
}

export { getOffsetParent };

/**
 * ☝️ the following are needed to fix shadow DOM positioning ☝️
 */

/**
 * 👇 the following are taken directly from floating-ui's ESM distributable to support the exports above 👇️
 *
 * **Notes**:
 * unused functions are removed
 * ESLint is disabled
 * TS-warnings are suppressed
 */
/* eslint-disable */

function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}

function getUAString() {
  // @ts-ignore
  const uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
  }

  return navigator.userAgent;
}

function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}

function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support
  if (typeof ShadowRoot === "undefined") {
    return false;
  }

  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  // TODO: Try and use feature detection here instead
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle(element); // This is non-exhaustive but covers the most common CSS properties that
  // create a containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

  return (
    css.transform !== "none" ||
    css.perspective !== "none" ||
    (isFirefox && css.willChange === "filter") ||
    (isFirefox && (css.filter ? css.filter !== "none" : false)) ||
    ["transform", "perspective"].some((value) => css.willChange.includes(value)) ||
    ["paint", "layout", "strict", "content"].some(
      // TS 4.1 compat
      (value) => {
        const contain = css.contain;
        return contain != null ? contain.includes(value) : false;
      }
    )
  );
}

function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }

  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || // DOM Element detected
    (isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node) // fallback
  );
}

function getContainingBlock(element: Element) {
  let currentNode: Node | null = getParentNode(element);

  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }

  return null;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element: Element): Element | Window {
  const window = getWindow(element);

  let offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (
    offsetParent &&
    (getNodeName(offsetParent) === "html" ||
      (getNodeName(offsetParent) === "body" &&
        getComputedStyle(offsetParent).position === "static" &&
        !isContainingBlock(offsetParent)))
  ) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}
