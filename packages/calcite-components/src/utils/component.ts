import { Scale } from "../components/interfaces";
import { HTMLStencilElement } from "@stencil/core/internal";

export function getIconScale(componentScale: Scale): Extract<Scale, "s" | "m"> {
  return componentScale === "l" ? "m" : "s";
}

/**
 * This util helps us wait for a component to be ready for both lazy-loading (`dist` output) and non-lazy-loading (`components` output) components.
 *
 * Based on https://github.com/ionic-team/ionic-framework/blob/1a8bd6d/core/src/utils/helpers.ts#L60C1-L79C3
 *
 * @param el - the host element to wait for
 */
export async function componentOnReady(el: HTMLElement): Promise<void> {
  await (isStencilEl(el)
    ? el.componentOnReady()
    : new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
}

function isStencilEl(el: HTMLElement): el is HTMLStencilElement {
  return typeof (el as HTMLStencilElement).componentOnReady === "function";
}
