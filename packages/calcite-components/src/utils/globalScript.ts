import { isServer } from "lit";
import { initModeChangeEvent } from "./mode";
import { stampVersion } from "./config";

/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see [Stencil's globalScript](https://stenciljs.com/docs/config#globalscript).
 */
export default function (): void {
  if (!isServer) {
    if (document.readyState === "interactive") {
      initModeChangeEvent();
    } else {
      document.addEventListener("DOMContentLoaded", () => initModeChangeEvent(), { once: true });
    }
  }

  stampVersion();
}
