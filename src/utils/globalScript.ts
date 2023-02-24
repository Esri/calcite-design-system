import { initModeChangeEvent } from "./mode";

/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript}
 */
export default function (): void {
  const isBrowser =
    typeof window !== "undefined" &&
    typeof location !== "undefined" &&
    typeof document !== "undefined" &&
    window.location === location &&
    window.document === document;

  if (isBrowser) {
    if (document.readyState === "interactive") {
      initModeChangeEvent();
    } else {
      document.addEventListener("DOMContentLoaded", () => initModeChangeEvent(), { once: true });
    }
  }
}
