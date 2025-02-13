import { initModeChangeEvent } from "./mode";
import { stampVersion } from "./config";
import { isBrowser } from "./browser";

/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see [Stencil's globalScript](https://stenciljs.com/docs/config#globalscript).
 */
export default function (): void {
  if (isBrowser()) {
    if (document.readyState === "interactive") {
      initModeChangeEvent();
    } else {
      document.addEventListener("DOMContentLoaded", () => initModeChangeEvent(), { once: true });
    }
  }

  stampVersion();
}
