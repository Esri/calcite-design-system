import { setCSSVariables } from "../../tests/utils/cssTokenValues";

/**
 *
 * @example
 * <demo-theme tokens="
 *     --calcite-button-background-color,
 *     --calcite-button-border-color,
 *     --calcite-button-corner-radius,
 *     --calcite-button-corner-radius-start-start,
 *     --calcite-button-corner-radius-start-end,
 *     --calcite-button-corner-radius-end-start,
 *     --calcite-button-corner-radius-end-end,
 *     --calcite-button-loader-color,
 *     --calcite-button-shadow,
 *     --calcite-button-text-color,
 *     --calcite-button-icon-color"
 * ><calcite-button kind="inverse" scale="l"> Button </calcite-button></demo-theme>
 */
export class DemoTheme extends HTMLElement {
  _slot: HTMLSlotElement;

  _el: HTMLElement;

  static observedAttributes = ["tokens"];

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");
    shadow.append(slot);
    this._slot = slot;
    if (this._slot.assignedNodes().length === 1 && this._slot.assignedNodes()[0].nodeName.includes("calcite")) {
      this._el = this._slot.assignedNodes()[0] as HTMLElement;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (newValue !== oldValue && name === "tokens") {
      this.updateTheme(newValue);
    }
  }

  updateTheme(tokens: string): void {
    const tokensList = tokens
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (Array.isArray(tokensList)) {
      const stringifiedTheme = setCSSVariables(tokensList);

      if (this._el) {
        this._el.style.cssText = stringifiedTheme;
      } else {
        this.setAttribute("style", stringifiedTheme);
      }
    }
  }
}

customElements.define("demo-theme", DemoTheme);
