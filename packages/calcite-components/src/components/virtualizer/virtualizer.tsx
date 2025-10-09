import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { html } from "lit";
import { virtualize } from "@lit-labs/virtualizer/virtualize.js";
import { styles } from "./virtualizer.scss";

declare global {
  interface DeclareElements {
    "calcite-virtualizer": Virtualizer;
  }
}

/**
 * @slot - A slot for adding content.
 */
export class Virtualizer extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  /** When `true`, the content will be scrollable. */
  @property({ reflect: true }) scroller = false;

  /** When `true`, the content will be scrollable. */
  @property({ reflect: true }) items = [];

  /**
   * Specifies a function to handle rendering items.
   *
   * @param item
   */
  @property() renderItem: (item) => HTMLElement = (item) => {
    const el = document.createElement("div");
    el.textContent = `${item}`;
    return el;
  };

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <div>
        {virtualize({
          scroller: this.scroller,
          items: this.items,
          renderItem: (item) => html`${this.renderItem(item)}`,
        })}
      </div>
    );
  }

  //#endregion
}
