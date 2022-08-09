import { initThemeChangeEvent } from "./theme";

/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript}
 */
export default function (): void {
  if (isBrowser()) {
    initThemeChangeEvent();
  }
}

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
