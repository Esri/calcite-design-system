// @ts-strict-ignore
import { type CSSResultOrNative } from "lit";
import { LitElement, noShadowRoot } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-icon": Icon;
  }
}

export class Icon extends LitElement {
  // #region Static Members

  // Disabling shadow root fixes the leak:
  // static override shadowRootOptions = noShadowRoot;

  // Removing styles fixes the leak:
  static get styles(): CSSResultOrNative {
    const style = new CSSStyleSheet();
    // The following style strings fix the issue:
    // ``
    // `a{}`
    // `/** */`
    // `:host{width:1em;height:1em}`
    style.replaceSync(`:host{display:inline-block}`);
    // return undefined;
    return style;
  }

  // #endregion
}
