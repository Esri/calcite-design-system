/**
 * This module provides utils to fix positioning across shadow DOM in browsers that follow the updated offsetParent spec https://github.com/w3c/csswg-drafts/issues/159
 */

export function offsetParent(element: HTMLElement): HTMLElement | null {
  // Do an initial walk to check for display:none ancestors.
  for (let ancestor: ReturnType<typeof flatTreeParent> = element; ancestor; ancestor = flatTreeParent(ancestor)) {
    if (!(ancestor instanceof Element)) {
      continue;
    }

    if (getComputedStyle(ancestor).display === "none") {
      return null;
    }
  }

  for (let ancestor = flatTreeParent(element); ancestor; ancestor = flatTreeParent(ancestor)) {
    if (!(ancestor instanceof Element)) {
      continue;
    }

    const style = getComputedStyle(ancestor);
    // Display:contents nodes aren't in the layout tree so they should be skipped.
    if (style.display === "contents") {
      continue;
    }

    if (style.position !== "static" || style.filter !== "none") {
      return ancestor;
    }

    if (ancestor.tagName === "BODY") {
      return ancestor;
    }
  }

  return null;
}

function flatTreeParent(element: Element): HTMLElement | null {
  if (element.assignedSlot) {
    return element.assignedSlot;
  }

  if (element.parentNode instanceof ShadowRoot) {
    return element.parentNode.host as HTMLElement;
  }

  return element.parentNode as HTMLElement;
}
