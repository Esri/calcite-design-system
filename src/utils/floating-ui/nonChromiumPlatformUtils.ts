/**
 * This module provides utils to fix positioning across shadow DOM in non-Chromium browsers
 */

/**
 * Polyfills the old offsetParent behavior from before the spec was changed:
 * https://github.com/w3c/csswg-drafts/issues/159
 *
 * @param element
 */
function getWindow(node) {
  return node.ownerDocument?.defaultView || window;
}

function isShadowRoot(node) {
  return node instanceof getWindow(node).ShadowRoot;
}

/**
 * Polyfills the old offsetParent behavior from before the spec was changed:
 * https://github.com/w3c/csswg-drafts/issues/159
 */
function composedOffsetParent(element: HTMLElement): HTMLElement {
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

export { composedOffsetParent };
